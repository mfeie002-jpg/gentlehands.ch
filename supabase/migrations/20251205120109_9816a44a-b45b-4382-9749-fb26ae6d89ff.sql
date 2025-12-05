-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policy: Users can view their own roles
CREATE POLICY "Users can view own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

-- RLS policy: Only admins can manage roles
CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create activity_logs table for audit trail
CREATE TABLE public.activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  action text NOT NULL,
  entity_type text NOT NULL,
  entity_id uuid,
  details jsonb,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view activity logs"
ON public.activity_logs
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "System can insert activity logs"
ON public.activity_logs
FOR INSERT
WITH CHECK (true);

-- Add admin update policies for existing tables
CREATE POLICY "Admins can update bookings"
ON public.bookings
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete bookings"
ON public.bookings
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage gift cards"
ON public.gift_cards
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update testimonials"
ON public.testimonial_submissions
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete testimonials"
ON public.testimonial_submissions
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Enable realtime for admin tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.bookings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.testimonial_submissions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.gift_cards;
ALTER PUBLICATION supabase_realtime ADD TABLE public.activity_logs;