-- Drop the overly permissive SELECT policies
DROP POLICY IF EXISTS "Anyone can read bookings by booking number" ON public.bookings;
DROP POLICY IF EXISTS "Anyone can check gift card balance" ON public.gift_cards;

-- Create secure function for booking lookup by booking number (public access with specific code only)
CREATE OR REPLACE FUNCTION public.lookup_booking_by_number(p_booking_number text)
RETURNS TABLE(
  booking_number text,
  masseur text,
  theme text,
  massage text,
  duration text,
  appointment_date date,
  appointment_time text,
  customer_name text,
  status text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    b.booking_number,
    b.masseur,
    b.theme,
    b.massage,
    b.duration,
    b.appointment_date,
    b.appointment_time,
    b.customer_name,
    b.status
  FROM public.bookings b
  WHERE b.booking_number = p_booking_number
  LIMIT 1;
$$;

-- Create secure function for gift card validation (public access with specific code only)
CREATE OR REPLACE FUNCTION public.check_gift_card_balance(p_code text)
RETURNS TABLE(
  valid boolean,
  remaining_balance numeric,
  expires_at timestamp with time zone,
  is_redeemed boolean
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    true AS valid,
    gc.remaining_balance,
    gc.expires_at,
    gc.is_redeemed
  FROM public.gift_cards gc
  WHERE gc.code = p_code
  LIMIT 1;
$$;

-- Create restrictive SELECT policy for bookings: Only admins can browse all
CREATE POLICY "Admins can read all bookings"
ON public.bookings
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

-- Create restrictive SELECT policy for gift_cards: Only admins can browse all
CREATE POLICY "Admins can read all gift cards"
ON public.gift_cards
FOR SELECT
USING (has_role(auth.uid(), 'admin'));