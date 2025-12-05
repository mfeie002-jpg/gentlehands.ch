-- Create user profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  preferred_therapist TEXT,
  preferred_theme TEXT,
  newsletter_subscribed BOOLEAN DEFAULT false,
  loyalty_points INTEGER DEFAULT 0,
  total_bookings INTEGER DEFAULT 0,
  member_since TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Create favorites table
CREATE TABLE IF NOT EXISTS public.favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  experience_id TEXT NOT NULL,
  massage_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, experience_id)
);

ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own favorites" ON public.favorites FOR ALL USING (auth.uid() = user_id);

-- Create session_notes table for personal journal
CREATE TABLE IF NOT EXISTS public.session_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
  note_date DATE DEFAULT CURRENT_DATE,
  mood_before TEXT,
  mood_after TEXT,
  notes TEXT,
  private_reflection TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.session_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own notes" ON public.session_notes FOR ALL USING (auth.uid() = user_id);

-- Create testimonials submission table
CREATE TABLE IF NOT EXISTS public.testimonial_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  location TEXT,
  theme TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  content TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT false,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.testimonial_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit testimonials" ON public.testimonial_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view own submissions" ON public.testimonial_submissions FOR SELECT USING (auth.uid() = user_id OR is_approved = true);

-- Create referrals table
CREATE TABLE IF NOT EXISTS public.referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  referral_code TEXT UNIQUE NOT NULL,
  referred_email TEXT,
  status TEXT DEFAULT 'pending',
  reward_claimed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own referrals" ON public.referrals FOR ALL USING (auth.uid() = referrer_id);

-- Create gift_cards table
CREATE TABLE IF NOT EXISTS public.gift_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  value DECIMAL(10,2) NOT NULL,
  remaining_balance DECIMAL(10,2) NOT NULL,
  purchaser_email TEXT,
  recipient_email TEXT,
  recipient_name TEXT,
  message TEXT,
  is_redeemed BOOLEAN DEFAULT false,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.gift_cards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can check gift card balance" ON public.gift_cards FOR SELECT USING (true);

-- Create health_questionnaire table
CREATE TABLE IF NOT EXISTS public.health_questionnaires (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
  allergies TEXT,
  medical_conditions TEXT,
  current_medications TEXT,
  pregnancy_status TEXT,
  pain_areas TEXT[],
  stress_level INTEGER CHECK (stress_level >= 1 AND stress_level <= 10),
  sleep_quality INTEGER CHECK (sleep_quality >= 1 AND sleep_quality <= 10),
  consent_given BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.health_questionnaires ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own questionnaires" ON public.health_questionnaires FOR ALL USING (auth.uid() = user_id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, new.raw_user_meta_data ->> 'full_name');
  RETURN new;
END;
$$;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Add availability column to bookings if not exists (for calendar view)
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS is_available BOOLEAN DEFAULT true;