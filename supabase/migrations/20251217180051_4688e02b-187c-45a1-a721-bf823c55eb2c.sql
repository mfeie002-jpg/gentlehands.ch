-- Add hourly_rate column to therapists table
ALTER TABLE public.therapists 
ADD COLUMN hourly_rate numeric DEFAULT 120.00;

-- Add a comment for clarity
COMMENT ON COLUMN public.therapists.hourly_rate IS 'Therapist individual hourly rate in CHF';