-- =============================================
-- PART 2: ENABLE RLS & CREATE REMAINING TABLES
-- =============================================

-- Enable RLS on new tables
ALTER TABLE public.leads_umzug ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.estimate_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;

-- =============================================
-- LEAD TRANSACTIONS TABLE
-- =============================================
CREATE TABLE public.lead_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES public.leads_umzug(id) ON DELETE CASCADE,
  provider_id UUID REFERENCES public.service_providers(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  currency TEXT DEFAULT 'CHF',
  status TEXT DEFAULT 'pending',
  stripe_payment_intent_id TEXT,
  purchased_at TIMESTAMPTZ,
  -- Conversion Tracking
  conversion_status TEXT,
  conversion_date TIMESTAMPTZ,
  conversion_notes TEXT,
  actual_job_value NUMERIC,
  lost_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.lead_transactions ENABLE ROW LEVEL SECURITY;

-- =============================================
-- LEAD BIDS TABLE (Auction System)
-- =============================================
CREATE TABLE public.lead_bids (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES public.leads_umzug(id) ON DELETE CASCADE,
  provider_id UUID REFERENCES public.service_providers(id) ON DELETE CASCADE,
  bid_amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.lead_bids ENABLE ROW LEVEL SECURITY;

-- =============================================
-- REVIEWS TABLE
-- =============================================
CREATE TABLE public.provider_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID REFERENCES public.service_providers(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  lead_id UUID REFERENCES public.leads_umzug(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT NOT NULL,
  comment TEXT NOT NULL,
  photos TEXT[],
  service_ratings JSONB,
  verified BOOLEAN DEFAULT false,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.provider_reviews ENABLE ROW LEVEL SECURITY;

-- =============================================
-- PROVIDER SUBSCRIPTIONS TABLE
-- =============================================
CREATE TABLE public.provider_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID REFERENCES public.service_providers(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES public.subscription_plans(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'active',
  stripe_subscription_id TEXT,
  start_date TIMESTAMPTZ DEFAULT now(),
  end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.provider_subscriptions ENABLE ROW LEVEL SECURITY;

-- =============================================
-- BILLING RECORDS TABLE
-- =============================================
CREATE TABLE public.billing_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID REFERENCES public.service_providers(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES public.leads_umzug(id) ON DELETE SET NULL,
  billing_model TEXT NOT NULL,
  price_chf NUMERIC NOT NULL,
  billing_period TEXT,
  invoice_number TEXT,
  status TEXT DEFAULT 'pending',
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.billing_records ENABLE ROW LEVEL SECURITY;

-- =============================================
-- PROVIDER PERFORMANCE METRICS TABLE
-- =============================================
CREATE TABLE public.provider_performance_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID REFERENCES public.service_providers(id) ON DELETE CASCADE,
  metric_date DATE DEFAULT CURRENT_DATE,
  leads_received INTEGER DEFAULT 0,
  leads_viewed INTEGER DEFAULT 0,
  leads_contacted INTEGER DEFAULT 0,
  leads_converted INTEGER DEFAULT 0,
  conversion_rate NUMERIC,
  response_time_avg_hours NUMERIC,
  customer_satisfaction_score NUMERIC,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(provider_id, metric_date)
);

ALTER TABLE public.provider_performance_metrics ENABLE ROW LEVEL SECURITY;

-- =============================================
-- LEAD QUALITY FACTORS TABLE
-- =============================================
CREATE TABLE public.lead_quality_factors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES public.leads_umzug(id) ON DELETE CASCADE UNIQUE,
  quality_score INTEGER DEFAULT 0,
  value_score INTEGER DEFAULT 0,
  completeness_score INTEGER DEFAULT 0,
  urgency_score INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.lead_quality_factors ENABLE ROW LEVEL SECURITY;

-- =============================================
-- UMZUG AB TESTS TABLE (separate from existing)
-- =============================================
CREATE TABLE public.umzug_ab_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'draft',
  variant_a_config JSONB NOT NULL DEFAULT '{}'::jsonb,
  variant_b_config JSONB NOT NULL DEFAULT '{}'::jsonb,
  variant_a_impressions INTEGER DEFAULT 0,
  variant_b_impressions INTEGER DEFAULT 0,
  variant_a_conversions INTEGER DEFAULT 0,
  variant_b_conversions INTEGER DEFAULT 0,
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  created_by TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.umzug_ab_tests ENABLE ROW LEVEL SECURITY;

-- Create indexes for new tables
CREATE INDEX idx_lead_transactions_lead ON public.lead_transactions(lead_id);
CREATE INDEX idx_lead_transactions_provider ON public.lead_transactions(provider_id);
CREATE INDEX idx_lead_bids_lead ON public.lead_bids(lead_id);
CREATE INDEX idx_lead_bids_provider ON public.lead_bids(provider_id);
CREATE INDEX idx_provider_reviews_provider ON public.provider_reviews(provider_id);
CREATE INDEX idx_provider_reviews_rating ON public.provider_reviews(rating);
CREATE INDEX idx_billing_records_provider ON public.billing_records(provider_id);
CREATE INDEX idx_performance_metrics_provider ON public.provider_performance_metrics(provider_id);

-- Updated at triggers
CREATE TRIGGER update_lead_transactions_updated_at
  BEFORE UPDATE ON public.lead_transactions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_lead_bids_updated_at
  BEFORE UPDATE ON public.lead_bids
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_provider_reviews_updated_at
  BEFORE UPDATE ON public.provider_reviews
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_provider_subscriptions_updated_at
  BEFORE UPDATE ON public.provider_subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_performance_metrics_updated_at
  BEFORE UPDATE ON public.provider_performance_metrics
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();