-- Customer Journey Tracking Table
CREATE TABLE public.customer_journeys (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  events JSONB NOT NULL DEFAULT '[]'::jsonb,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  conversion_type TEXT,
  source TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  device_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- A/B Test Configurations Table
CREATE TABLE public.ab_tests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  test_type TEXT NOT NULL DEFAULT 'booking_flow',
  variants JSONB NOT NULL DEFAULT '[{"id": "control", "name": "Control", "weight": 50}, {"id": "variant_a", "name": "Variant A", "weight": 50}]'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT true,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- A/B Test Results Table
CREATE TABLE public.ab_test_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  test_id UUID NOT NULL REFERENCES public.ab_tests(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  variant_id TEXT NOT NULL,
  converted BOOLEAN NOT NULL DEFAULT false,
  conversion_value NUMERIC,
  conversion_type TEXT,
  user_id UUID REFERENCES auth.users(id),
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.customer_journeys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ab_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ab_test_results ENABLE ROW LEVEL SECURITY;

-- RLS Policies for customer_journeys
CREATE POLICY "Anyone can insert journey data" ON public.customer_journeys FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update their own journey" ON public.customer_journeys FOR UPDATE USING (true);
CREATE POLICY "Admins can view all journeys" ON public.customer_journeys FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for ab_tests
CREATE POLICY "Anyone can view active tests" ON public.ab_tests FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage tests" ON public.ab_tests FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for ab_test_results
CREATE POLICY "Anyone can insert test results" ON public.ab_test_results FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view test results" ON public.ab_test_results FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

-- Indexes for performance
CREATE INDEX idx_customer_journeys_session ON public.customer_journeys(session_id);
CREATE INDEX idx_customer_journeys_started ON public.customer_journeys(started_at);
CREATE INDEX idx_ab_test_results_test ON public.ab_test_results(test_id);
CREATE INDEX idx_ab_test_results_variant ON public.ab_test_results(variant_id);

-- Insert default A/B test for booking flow
INSERT INTO public.ab_tests (name, description, test_type, variants) VALUES
('Booking Flow V2', 'Test new booking wizard vs classic', 'booking_flow', '[{"id": "control", "name": "Classic Flow", "weight": 50}, {"id": "variant_a", "name": "Streamlined Flow", "weight": 50}]'),
('CTA Button Color', 'Test primary vs accent colored CTA', 'cta_color', '[{"id": "control", "name": "Primary Color", "weight": 50}, {"id": "variant_a", "name": "Accent Color", "weight": 50}]'),
('Hero Section', 'Test hero variants', 'hero_section', '[{"id": "control", "name": "Image Hero", "weight": 33}, {"id": "variant_a", "name": "Video Hero", "weight": 33}, {"id": "variant_b", "name": "Minimal Hero", "weight": 34}]');