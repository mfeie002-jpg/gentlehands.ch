-- =====================================================
-- THERAPIST MANAGEMENT SYSTEM
-- =====================================================

-- Therapist application/approval status
CREATE TYPE public.therapist_status AS ENUM ('pending', 'approved', 'rejected', 'suspended');

-- Therapists table (for registration and profiles)
CREATE TABLE public.therapists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Profile information
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  photo_url TEXT,
  specialty TEXT[], -- Array of specialties
  qualifications TEXT[],
  bio TEXT,
  experience_years INTEGER DEFAULT 0,
  
  -- Availability and preferences
  available_days TEXT[] DEFAULT ARRAY['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
  working_hours_start TIME DEFAULT '09:00',
  working_hours_end TIME DEFAULT '20:00',
  
  -- Status and approval
  status therapist_status DEFAULT 'pending',
  approved_at TIMESTAMP WITH TIME ZONE,
  approved_by UUID,
  rejection_reason TEXT,
  
  -- Display settings
  display_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  color TEXT DEFAULT '#9F7F6F', -- For calendar display
  
  -- Stats
  total_bookings INTEGER DEFAULT 0,
  average_rating DECIMAL(3,2) DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Experience Themes (replacing hardcoded themes)
CREATE TABLE public.experience_themes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  short_description TEXT,
  
  -- Visual settings
  image_url TEXT,
  background_gradient TEXT,
  icon TEXT,
  color TEXT,
  
  -- Content
  atmosphere_tags TEXT[],
  music_style TEXT,
  scent_profile TEXT,
  
  -- Display settings
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Massage Types (replacing hardcoded massages)
CREATE TABLE public.massage_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  short_description TEXT,
  
  -- Pricing and duration
  durations JSONB DEFAULT '[]', -- [{duration: "60", price: 150}, {duration: "90", price: 200}]
  base_price DECIMAL(10,2),
  
  -- Details
  benefits TEXT[],
  techniques TEXT[],
  ideal_for TEXT,
  
  -- Visual
  image_url TEXT,
  icon TEXT,
  
  -- Display settings
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  
  -- Which therapists can perform this
  requires_specialty TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Therapist Earnings tracking
CREATE TABLE public.therapist_earnings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id UUID REFERENCES public.therapists(id) ON DELETE CASCADE NOT NULL,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
  
  amount DECIMAL(10,2) NOT NULL,
  commission_rate DECIMAL(5,2) DEFAULT 70.00, -- Therapist gets 70%
  net_amount DECIMAL(10,2) NOT NULL,
  
  status TEXT DEFAULT 'pending', -- pending, paid
  paid_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Booking Feedback
CREATE TABLE public.booking_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE NOT NULL UNIQUE,
  therapist_id UUID REFERENCES public.therapists(id) ON DELETE SET NULL,
  
  -- Ratings
  overall_rating INTEGER CHECK (overall_rating >= 1 AND overall_rating <= 5),
  atmosphere_rating INTEGER CHECK (atmosphere_rating >= 1 AND atmosphere_rating <= 5),
  therapist_rating INTEGER CHECK (therapist_rating >= 1 AND therapist_rating <= 5),
  
  -- Feedback content
  comment TEXT,
  would_recommend BOOLEAN,
  
  -- For testimonials
  allow_public_display BOOLEAN DEFAULT false,
  is_approved_for_display BOOLEAN DEFAULT false,
  
  feedback_token UUID DEFAULT gen_random_uuid() UNIQUE,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add therapist_id to bookings table
ALTER TABLE public.bookings 
ADD COLUMN IF NOT EXISTS therapist_id UUID REFERENCES public.therapists(id) ON DELETE SET NULL;

-- Add payment method column
ALTER TABLE public.bookings
ADD COLUMN IF NOT EXISTS payment_method TEXT DEFAULT 'on_site', -- 'online', 'on_site'
ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending', -- 'pending', 'paid', 'refunded'
ADD COLUMN IF NOT EXISTS payment_intent_id TEXT, -- Stripe payment intent
ADD COLUMN IF NOT EXISTS amount_paid DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS feedback_requested_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS reminder_sent_at TIMESTAMP WITH TIME ZONE;

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE public.therapists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience_themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.massage_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.therapist_earnings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_feedback ENABLE ROW LEVEL SECURITY;

-- Therapists policies
CREATE POLICY "Anyone can view approved therapists"
ON public.therapists FOR SELECT
USING (status = 'approved');

CREATE POLICY "Therapists can view own profile"
ON public.therapists FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Therapists can update own profile"
ON public.therapists FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can apply as therapist"
ON public.therapists FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can manage all therapists"
ON public.therapists FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Experience themes policies
CREATE POLICY "Anyone can view active themes"
ON public.experience_themes FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage themes"
ON public.experience_themes FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Massage types policies
CREATE POLICY "Anyone can view active massage types"
ON public.massage_types FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage massage types"
ON public.massage_types FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Therapist earnings policies
CREATE POLICY "Therapists can view own earnings"
ON public.therapist_earnings FOR SELECT
USING (
  therapist_id IN (SELECT id FROM public.therapists WHERE user_id = auth.uid())
);

CREATE POLICY "Admins can manage all earnings"
ON public.therapist_earnings FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Booking feedback policies
CREATE POLICY "Anyone can submit feedback with valid token"
ON public.booking_feedback FOR INSERT
WITH CHECK (true);

CREATE POLICY "Therapists can view feedback for their bookings"
ON public.booking_feedback FOR SELECT
USING (
  therapist_id IN (SELECT id FROM public.therapists WHERE user_id = auth.uid())
  OR public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Public can view approved feedback"
ON public.booking_feedback FOR SELECT
USING (is_approved_for_display = true AND allow_public_display = true);

CREATE POLICY "Admins can manage all feedback"
ON public.booking_feedback FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- =====================================================
-- SEED DATA: Themes and Massage Types
-- =====================================================

-- Insert experience themes
INSERT INTO public.experience_themes (name, description, short_description, background_gradient, color, atmosphere_tags, music_style, scent_profile, display_order, is_featured) VALUES
('Ozean & Palmen', 'Tauchen Sie ein in die Leichtigkeit eines tropischen Strandes. Meeresrauschen, der Duft von Kokos und die Wärme der Sonne umhüllen Sie.', 'Tropische Leichtigkeit und Urlaubsfeeling', 'from-cyan-50 to-blue-100', '#0891B2', ARRAY['Strand', 'Leichtigkeit', 'Wärme'], 'Ocean Waves', 'Kokos & Meersalz', 1, true),
('Alpine Stille', 'Die Ruhe der Berge schenkt Ihnen Geborgenheit. Klare Luft, Holzduft und die zeitlose Stille der Alpen lassen Sie zur Ruhe kommen.', 'Bergige Geborgenheit und natürliche Klarheit', 'from-emerald-50 to-green-100', '#059669', ARRAY['Berge', 'Klarheit', 'Sicherheit'], 'Alpine Ambient', 'Zirbenholz & Bergkräuter', 2, true),
('Deep Dark Relax', 'Vollkommene Dunkelheit ermöglicht tiefste Entspannung. Ihre Sinne fokussieren sich ganz auf die Berührung.', 'Sensorische Tiefenentspannung im Dunkeln', 'from-gray-800 to-black', '#1F2937', ARRAY['Dunkelheit', 'Tiefe', 'Fokus'], 'Deep Ambient', 'Sandelholz & Weihrauch', 3, true),
('Urban Loft', 'Moderner Rückzugsort für Selbstfürsorge. Industrieller Charme trifft auf Wärme und zeitgemässe Entspannung.', 'Moderne Selbstfürsorge mit urbanem Flair', 'from-zinc-100 to-stone-200', '#78716C', ARRAY['Modern', 'Urban', 'Selbstfürsorge'], 'Lo-Fi Beats', 'Bergamotte & Zeder', 4, false),
('Zen Garden', 'Japanische Ästhetik und Minimalismus schaffen einen Raum der Achtsamkeit und meditativen Stille.', 'Japanische Achtsamkeit und Minimalismus', 'from-stone-100 to-amber-50', '#A16207', ARRAY['Japan', 'Meditation', 'Minimalismus'], 'Japanese Ambient', 'Grüntee & Bambus', 5, false),
('Surprise Experience', 'Überlassen Sie sich unserem Team. Wir gestalten Ihr Erlebnis intuitiv und persönlich – eine Überraschung für Ihre Sinne.', 'Lassen Sie sich überraschen', 'from-rose-50 to-purple-100', '#9F7F6F', ARRAY['Überraschung', 'Intuition', 'Vertrauen'], 'Curated Selection', 'Intuitiv gewählt', 6, true);

-- Insert massage types
INSERT INTO public.massage_types (name, description, short_description, durations, benefits, techniques, ideal_for, display_order, is_featured) VALUES
('Entspannungsmassage', 'Sanfte, fliessende Bewegungen lösen Verspannungen und führen Sie in tiefe Entspannung. Ideal zum Abschalten und Loslassen.', 'Sanfte Entspannung für Körper und Geist', '[{"duration": "60", "price": 150}, {"duration": "90", "price": 200}, {"duration": "120", "price": 250}]', ARRAY['Stressabbau', 'Muskelentspannung', 'Besserer Schlaf'], ARRAY['Effleurage', 'Sanfte Streichungen', 'Rhythmische Bewegungen'], 'Stressgeplagte, die abschalten möchten', 1, true),
('Tiefengewebe-Massage', 'Intensive Techniken erreichen tieferliegende Muskelschichten. Für nachhaltige Linderung bei chronischen Verspannungen.', 'Intensive Lösung tiefer Verspannungen', '[{"duration": "60", "price": 170}, {"duration": "90", "price": 230}]', ARRAY['Chronische Schmerzen', 'Tiefe Verspannungen', 'Verbesserte Mobilität'], ARRAY['Tiefenarbeit', 'Triggerpunkte', 'Myofasziale Techniken'], 'Menschen mit chronischen Verspannungen', 2, true),
('Hot Stone Massage', 'Warme Basaltsteine schmelzen Verspannungen und spenden wohltuende Wärme, die tief in die Muskulatur eindringt.', 'Wohltuende Wärme für tiefe Entspannung', '[{"duration": "75", "price": 190}, {"duration": "90", "price": 230}]', ARRAY['Tiefenentspannung', 'Wärmebehandlung', 'Durchblutung'], ARRAY['Hot Stones', 'Wärmetherapie', 'Sanfte Massage'], 'Wärmeliebende, die Luxus schätzen', 3, true),
('Aromatherapie-Massage', 'Ätherische Öle und sanfte Berührungen vereinen sich zu einem ganzheitlichen Sinneserlebnis.', 'Heilende Düfte und sanfte Berührung', '[{"duration": "60", "price": 160}, {"duration": "90", "price": 210}]', ARRAY['Emotionale Balance', 'Stimmungsverbesserung', 'Hautpflege'], ARRAY['Aromatherapie', 'Sanfte Streichungen', 'Reflexzonen'], 'Sinnesfreudige Menschen', 4, false),
('Stress-Reset', 'Speziell entwickelt für hochbelastete Frauen. Fokussiert auf Nacken, Schultern und den unteren Rücken.', 'Gezielte Entlastung für Stresszonen', '[{"duration": "45", "price": 120}, {"duration": "60", "price": 150}]', ARRAY['Schnelle Entlastung', 'Fokussierte Behandlung', 'Spannungsabbau'], ARRAY['Gezielte Behandlung', 'Druckpunkte', 'Dehnung'], 'Beschäftigte Frauen mit wenig Zeit', 5, true),
('Ganzkörper-Ritual', 'Das umfassende Verwöhnprogramm: Eine Reise durch verschiedene Techniken für vollkommenes Wohlbefinden.', 'Das ultimative Verwöhnprogramm', '[{"duration": "120", "price": 280}, {"duration": "150", "price": 350}]', ARRAY['Ganzheitliche Entspannung', 'Verwöhnung', 'Regeneration'], ARRAY['Kombination verschiedener Techniken', 'Körperpeeling', 'Ölmassage'], 'Für besondere Anlässe', 6, true);

-- Insert initial therapists (converted from hardcoded)
INSERT INTO public.therapists (name, email, specialty, bio, experience_years, status, color, display_order, is_featured) VALUES
('Morris', 'morris@gentlehands.ch', ARRAY['Tiefengewebe-Massage', 'Stress-Reset'], 'Erfahrener Therapeut mit Fokus auf gezielte Tiefenarbeit und nachhaltige Entspannung.', 8, 'approved', '#4A5568', 1, true),
('Anna', 'anna@gentlehands.ch', ARRAY['Entspannungsmassage', 'Aromatherapie-Massage'], 'Spezialistin für sanfte, intuitive Massagen, die Körper und Seele in Einklang bringen.', 6, 'approved', '#9F7F6F', 2, true),
('Luca', 'luca@gentlehands.ch', ARRAY['Hot Stone Massage', 'Ganzkörper-Ritual'], 'Experte für wärmebasierte Behandlungen und ganzheitliche Wellness-Rituale.', 5, 'approved', '#2D5A47', 3, true);

-- =====================================================
-- FUNCTIONS
-- =====================================================

-- Function to auto-assign therapist based on availability and specialty
CREATE OR REPLACE FUNCTION public.auto_assign_therapist(
  p_massage_type TEXT,
  p_appointment_date DATE,
  p_appointment_time TEXT
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_therapist_id UUID;
BEGIN
  -- Find available therapist with matching specialty, ordered by least bookings
  SELECT t.id INTO v_therapist_id
  FROM public.therapists t
  WHERE t.status = 'approved'
    AND (p_massage_type = ANY(t.specialty) OR array_length(t.specialty, 1) IS NULL)
    AND NOT EXISTS (
      SELECT 1 FROM public.bookings b
      WHERE b.therapist_id = t.id
        AND b.appointment_date = p_appointment_date
        AND b.appointment_time = p_appointment_time
        AND b.status NOT IN ('cancelled', 'rejected')
    )
  ORDER BY t.total_bookings ASC, RANDOM()
  LIMIT 1;
  
  RETURN v_therapist_id;
END;
$$;

-- Trigger to update therapist stats
CREATE OR REPLACE FUNCTION public.update_therapist_stats()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.status = 'confirmed' THEN
    UPDATE public.therapists
    SET total_bookings = total_bookings + 1
    WHERE id = NEW.therapist_id;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_update_therapist_stats
AFTER INSERT OR UPDATE ON public.bookings
FOR EACH ROW
EXECUTE FUNCTION public.update_therapist_stats();

-- Enable realtime for therapists
ALTER PUBLICATION supabase_realtime ADD TABLE public.therapists;
ALTER PUBLICATION supabase_realtime ADD TABLE public.booking_feedback;