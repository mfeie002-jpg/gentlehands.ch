-- Fix the waitlist notification trigger to not set notification_sent_at
-- This allows the edge function to properly pick up entries that need notification

CREATE OR REPLACE FUNCTION public.check_waitlist_on_cancellation()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Only trigger on status change to cancelled
  IF NEW.status = 'cancelled' AND OLD.status != 'cancelled' THEN
    -- Update waitlist entries for matching date/time
    -- Set status to 'notified' but DON'T set notification_sent_at
    -- The edge function will set notification_sent_at when it actually sends the notification
    UPDATE public.booking_waitlist
    SET 
      status = 'notified',
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
$function$;