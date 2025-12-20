-- =============================================
-- UMZUGSCHECK.CH BACKEND - PART 1: ENUMS & CORE TABLES
-- =============================================

-- Create new enums (app_role already exists, skip it)
CREATE TYPE public.account_status AS ENUM ('active', 'inactive');
CREATE TYPE public.verification_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE public.price_level AS ENUM ('günstig', 'fair', 'premium');

-- Extend profiles table with additional fields
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT;

-- =============================================
-- LEADS TABLE - Core lead management
-- =============================================
CREATE TABLE public.leads_umzug (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  from_city TEXT NOT NULL,
  from_postal TEXT NOT NULL,
  to_city TEXT NOT NULL,
  to_postal TEXT NOT NULL,
  move_date DATE,
  calculator_type TEXT NOT NULL,
  calculator_input JSONB NOT NULL DEFAULT '{}'::jsonb,
  calculator_output JSONB NOT NULL DEFAULT '{}'::jsonb,
  comments TEXT,
  status TEXT DEFAULT 'new',
  lead_source TEXT,
  selected_company_ids UUID[],
  assigned_provider_ids UUID[],
  estimate_session_id UUID,
  bundled_estimate_id UUID,
  -- Bidding fields
  bidding_enabled BOOLEAN DEFAULT false,
  starting_bid NUMERIC,
  current_highest_bid NUMERIC,
  bid_count INTEGER DEFAULT 0,
  bidding_closes_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- SERVICE PROVIDERS TABLE - Moving companies
-- =============================================
CREATE TABLE public.service_providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  company_name TEXT NOT NULL,
  slug TEXT UNIQUE,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  street TEXT NOT NULL,
  zip TEXT NOT NULL,
  city TEXT NOT NULL,
  country TEXT DEFAULT 'CH',
  contact_person_name TEXT NOT NULL,
  description TEXT,
  short_description TEXT,
  long_description TEXT,
  logo_url TEXT,
  website TEXT,
  services_offered TEXT[] DEFAULT '{}',
  cantons_served TEXT[] DEFAULT '{}',
  cities_served TEXT[],
  preferred_regions TEXT[],
  price_level public.price_level,
  verification_status public.verification_status DEFAULT 'pending',
  account_status public.account_status DEFAULT 'active',
  -- Ranking & Monetization
  is_featured BOOLEAN DEFAULT false,
  featured_position INTEGER,
  ranking_position INTEGER,
  sponsored_tier INTEGER,
  quality_score NUMERIC DEFAULT 0,
  -- Pricing Models
  billing_model TEXT,
  lead_price_chf NUMERIC,
  click_price_chf NUMERIC,
  call_price_chf NUMERIC,
  monthly_fee_chf NUMERIC,
  cpl_enabled BOOLEAN DEFAULT false,
  cpc_enabled BOOLEAN DEFAULT false,
  cpl_price_chf NUMERIC,
  cpc_price_chf NUMERIC,
  daily_budget_chf NUMERIC,
  daily_budget_remaining_chf NUMERIC,
  max_leads_per_month INTEGER,
  min_job_value NUMERIC,
  -- Bidding
  bidding_active BOOLEAN DEFAULT false,
  max_bid_chf NUMERIC,
  -- Call Tracking
  call_tracking_enabled BOOLEAN DEFAULT false,
  phone_tracking_number TEXT,
  -- Profile
  profile_completeness INTEGER DEFAULT 0,
  profile_gallery TEXT[],
  team_members JSONB,
  working_hours JSONB,
  certifications TEXT[],
  employees_count INTEGER,
  fleet_size INTEGER,
  avg_completion_time_hours INTEGER,
  response_time_minutes INTEGER,
  success_rate NUMERIC,
  discount_offer TEXT,
  booking_calendar_url TEXT,
  subscription_plan TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- ESTIMATE SESSIONS TABLE - Calculator sessions
-- =============================================
CREATE TABLE public.estimate_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  move_details JSONB NOT NULL DEFAULT '{}'::jsonb,
  estimate JSONB NOT NULL DEFAULT '{}'::jsonb,
  matching_company_ids UUID[],
  funnel_variant TEXT,
  viewed_companies BOOLEAN DEFAULT false,
  selected_companies INTEGER DEFAULT 0,
  submitted_lead BOOLEAN DEFAULT false,
  expires_at TIMESTAMPTZ DEFAULT (now() + interval '7 days'),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- SUBSCRIPTION PLANS TABLE
-- =============================================
CREATE TABLE public.subscription_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  tier_name TEXT,
  description TEXT,
  price_monthly NUMERIC NOT NULL,
  price_yearly NUMERIC,
  max_leads_per_month INTEGER,
  priority_level INTEGER DEFAULT 0,
  advanced_analytics BOOLEAN DEFAULT false,
  auto_bidding BOOLEAN DEFAULT false,
  competitor_insights BOOLEAN DEFAULT false,
  features JSONB DEFAULT '[]'::jsonb,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Add foreign key from leads_umzug to estimate_sessions
ALTER TABLE public.leads_umzug 
ADD CONSTRAINT fk_leads_estimate_session 
FOREIGN KEY (estimate_session_id) REFERENCES public.estimate_sessions(id) ON DELETE SET NULL;

-- Create indexes for performance
CREATE INDEX idx_leads_umzug_status ON public.leads_umzug(status);
CREATE INDEX idx_leads_umzug_created_at ON public.leads_umzug(created_at DESC);
CREATE INDEX idx_leads_umzug_from_postal ON public.leads_umzug(from_postal);
CREATE INDEX idx_leads_umzug_to_postal ON public.leads_umzug(to_postal);
CREATE INDEX idx_service_providers_verification ON public.service_providers(verification_status);
CREATE INDEX idx_service_providers_account ON public.service_providers(account_status);
CREATE INDEX idx_service_providers_cantons ON public.service_providers USING GIN(cantons_served);
CREATE INDEX idx_service_providers_slug ON public.service_providers(slug);

-- Updated at trigger for leads_umzug
CREATE TRIGGER update_leads_umzug_updated_at
  BEFORE UPDATE ON public.leads_umzug
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Updated at trigger for service_providers
CREATE TRIGGER update_service_providers_updated_at
  BEFORE UPDATE ON public.service_providers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();