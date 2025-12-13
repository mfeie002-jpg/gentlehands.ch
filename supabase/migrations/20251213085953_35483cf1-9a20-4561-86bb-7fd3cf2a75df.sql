-- Add verification columns to bookings table
ALTER TABLE public.bookings 
ADD COLUMN IF NOT EXISTS verification_token UUID DEFAULT gen_random_uuid(),
ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS verification_sent_at TIMESTAMP WITH TIME ZONE;

-- Create index for token lookups
CREATE INDEX IF NOT EXISTS idx_bookings_verification_token ON public.bookings(verification_token);

-- Update status to 'pending_verification' for new unverified bookings
COMMENT ON COLUMN public.bookings.verification_token IS 'Token for email verification';
COMMENT ON COLUMN public.bookings.is_verified IS 'Whether the booking email has been verified';