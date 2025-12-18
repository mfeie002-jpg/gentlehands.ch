-- Create waitlist table for booking slots
CREATE TABLE public.booking_waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  preferred_date DATE NOT NULL,
  preferred_time TEXT,
  preferred_therapist_id UUID REFERENCES public.therapists(id),
  massage_type TEXT,
  theme TEXT,
  duration TEXT,
  status TEXT NOT NULL DEFAULT 'waiting' CHECK (status IN ('waiting', 'notified', 'booked', 'expired', 'cancelled')),
  notification_sent_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (now() + interval '30 days'),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.booking_waitlist ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Anyone can join waitlist" ON public.booking_waitlist
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view own waitlist entries" ON public.booking_waitlist
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage all waitlist entries" ON public.booking_waitlist
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users can cancel own waitlist entries" ON public.booking_waitlist
  FOR UPDATE USING (true);

-- Create index for efficient queries
CREATE INDEX idx_waitlist_date_status ON public.booking_waitlist(preferred_date, status);
CREATE INDEX idx_waitlist_therapist ON public.booking_waitlist(preferred_therapist_id) WHERE preferred_therapist_id IS NOT NULL;

-- Create function to check waitlist when booking is cancelled
CREATE OR REPLACE FUNCTION public.check_waitlist_on_cancellation()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Only trigger on status change to cancelled
  IF NEW.status = 'cancelled' AND OLD.status != 'cancelled' THEN
    -- Update waitlist entries for matching date/time
    UPDATE public.booking_waitlist
    SET 
      status = 'notified',
      notification_sent_at = now(),
      updated_at = now()
    WHERE 
      status = 'waiting'
      AND preferred_date = OLD.appointment_date
      AND (preferred_time IS NULL OR preferred_time = OLD.appointment_time)
      AND (preferred_therapist_id IS NULL OR preferred_therapist_id = OLD.therapist_id)
      AND expires_at > now();
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger on bookings table
CREATE TRIGGER trigger_check_waitlist_on_cancel
  AFTER UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.check_waitlist_on_cancellation();

-- Function to get waitlist entries for a specific slot
CREATE OR REPLACE FUNCTION public.get_waitlist_for_slot(
  p_date DATE,
  p_time TEXT DEFAULT NULL,
  p_therapist_id UUID DEFAULT NULL
)
RETURNS TABLE(
  id UUID,
  customer_email TEXT,
  customer_name TEXT,
  customer_phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    w.id,
    w.customer_email,
    w.customer_name,
    w.customer_phone,
    w.created_at
  FROM public.booking_waitlist w
  WHERE 
    w.status = 'waiting'
    AND w.preferred_date = p_date
    AND (p_time IS NULL OR w.preferred_time IS NULL OR w.preferred_time = p_time)
    AND (p_therapist_id IS NULL OR w.preferred_therapist_id IS NULL OR w.preferred_therapist_id = p_therapist_id)
    AND w.expires_at > now()
  ORDER BY w.created_at ASC;
END;
$$;