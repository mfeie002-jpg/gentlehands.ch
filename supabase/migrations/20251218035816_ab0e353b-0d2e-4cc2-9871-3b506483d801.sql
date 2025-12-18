-- Add video_url column to therapists for video intros
ALTER TABLE public.therapists 
ADD COLUMN IF NOT EXISTS video_url text;

-- Add comment
COMMENT ON COLUMN public.therapists.video_url IS 'URL to therapist introduction video';

-- Create function to get available time slots for a therapist on a specific date
CREATE OR REPLACE FUNCTION public.get_therapist_availability(
  p_therapist_id uuid,
  p_date date
)
RETURNS TABLE(
  time_slot text,
  is_available boolean
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_therapist RECORD;
  v_day_name text;
  v_slot_time time;
  v_slot_text text;
BEGIN
  -- Get therapist details
  SELECT * INTO v_therapist FROM therapists WHERE id = p_therapist_id AND status = 'approved';
  
  IF v_therapist.id IS NULL THEN
    RETURN;
  END IF;
  
  -- Get day name in German
  v_day_name := to_char(p_date, 'TMDay');
  v_day_name := CASE 
    WHEN extract(dow from p_date) = 0 THEN 'Sonntag'
    WHEN extract(dow from p_date) = 1 THEN 'Montag'
    WHEN extract(dow from p_date) = 2 THEN 'Dienstag'
    WHEN extract(dow from p_date) = 3 THEN 'Mittwoch'
    WHEN extract(dow from p_date) = 4 THEN 'Donnerstag'
    WHEN extract(dow from p_date) = 5 THEN 'Freitag'
    WHEN extract(dow from p_date) = 6 THEN 'Samstag'
  END;
  
  -- Check if therapist works on this day
  IF NOT (v_day_name = ANY(v_therapist.available_days)) THEN
    RETURN;
  END IF;
  
  -- Generate time slots based on working hours
  v_slot_time := v_therapist.working_hours_start;
  
  WHILE v_slot_time < v_therapist.working_hours_end LOOP
    v_slot_text := to_char(v_slot_time, 'HH24:MI');
    
    -- Check if slot is booked
    RETURN QUERY
    SELECT 
      v_slot_text,
      NOT EXISTS (
        SELECT 1 FROM bookings b
        WHERE b.therapist_id = p_therapist_id
          AND b.appointment_date = p_date
          AND b.appointment_time = v_slot_text
          AND b.status NOT IN ('cancelled', 'rejected')
      );
    
    v_slot_time := v_slot_time + interval '1 hour';
  END LOOP;
END;
$$;

-- Create function to get all therapist availability for a date range
CREATE OR REPLACE FUNCTION public.get_all_availability(
  p_start_date date,
  p_end_date date
)
RETURNS TABLE(
  therapist_id uuid,
  therapist_name text,
  date date,
  time_slot text,
  is_available boolean
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_therapist RECORD;
  v_current_date date;
  v_slot RECORD;
BEGIN
  -- Loop through all approved therapists
  FOR v_therapist IN 
    SELECT t.id, t.name FROM therapists t WHERE t.status = 'approved'
  LOOP
    -- Loop through date range
    v_current_date := p_start_date;
    WHILE v_current_date <= p_end_date LOOP
      -- Get availability for this therapist on this date
      FOR v_slot IN 
        SELECT * FROM get_therapist_availability(v_therapist.id, v_current_date)
      LOOP
        RETURN QUERY SELECT 
          v_therapist.id,
          v_therapist.name,
          v_current_date,
          v_slot.time_slot,
          v_slot.is_available;
      END LOOP;
      
      v_current_date := v_current_date + interval '1 day';
    END LOOP;
  END LOOP;
END;
$$;

-- Create function to get smart recommendations for a user
CREATE OR REPLACE FUNCTION public.get_booking_recommendations(
  p_user_id uuid DEFAULT NULL
)
RETURNS TABLE(
  recommendation_type text,
  item_id uuid,
  item_name text,
  reason text,
  score integer
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_profile RECORD;
  v_last_booking RECORD;
BEGIN
  -- Get user profile if exists
  IF p_user_id IS NOT NULL THEN
    SELECT * INTO v_profile FROM profiles WHERE id = p_user_id;
    
    -- Get last booking for this user (by email from profile)
    SELECT b.* INTO v_last_booking 
    FROM bookings b
    JOIN profiles p ON lower(b.customer_email) = lower(p.full_name) -- This is a simplified match
    WHERE p.id = p_user_id
    ORDER BY b.created_at DESC
    LIMIT 1;
  END IF;
  
  -- Recommend featured therapists
  RETURN QUERY
  SELECT 
    'therapist'::text,
    t.id,
    t.name,
    'Beliebt bei unseren Kundinnen'::text,
    90
  FROM therapists t
  WHERE t.status = 'approved' AND t.is_featured = true
  ORDER BY t.average_rating DESC, t.total_bookings DESC
  LIMIT 2;
  
  -- Recommend featured themes
  RETURN QUERY
  SELECT 
    'theme'::text,
    et.id,
    et.name,
    'Unser beliebtestes Erlebnis'::text,
    85
  FROM experience_themes et
  WHERE et.is_active = true AND et.is_featured = true
  ORDER BY et.display_order
  LIMIT 2;
  
  -- Recommend featured massages
  RETURN QUERY
  SELECT 
    'massage'::text,
    mt.id,
    mt.name,
    'Perfekt für Erstkunden'::text,
    80
  FROM massage_types mt
  WHERE mt.is_active = true AND mt.is_featured = true
  ORDER BY mt.display_order
  LIMIT 2;
  
  -- If user has preferred therapist, recommend them
  IF v_profile.preferred_therapist IS NOT NULL THEN
    RETURN QUERY
    SELECT 
      'therapist'::text,
      t.id,
      t.name,
      'Ihre bevorzugte Therapeut:in'::text,
      100
    FROM therapists t
    WHERE t.name = v_profile.preferred_therapist AND t.status = 'approved'
    LIMIT 1;
  END IF;
  
  -- If user has preferred theme, recommend it
  IF v_profile.preferred_theme IS NOT NULL THEN
    RETURN QUERY
    SELECT 
      'theme'::text,
      et.id,
      et.name,
      'Ihr Lieblingsthema'::text,
      95
    FROM experience_themes et
    WHERE et.name = v_profile.preferred_theme AND et.is_active = true
    LIMIT 1;
  END IF;
END;
$$;