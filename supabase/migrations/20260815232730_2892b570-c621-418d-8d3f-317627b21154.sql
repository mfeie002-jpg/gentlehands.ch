CREATE TABLE public.campaign_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  campaign text not null default 'lp-mobile-wellnessmassage-zuerich',
  first_name text not null,
  phone text not null,
  postal_code text not null,
  preferred_date date,
  preferred_timeslot text,
  contact_channel text not null default 'phone',
  age_confirmed boolean not null default false,
  privacy_accepted boolean not null default false,
  utm jsonb not null default '{}'::jsonb,
  ip_hash text,
  status text not null default 'new',
  notes text
);

GRANT ALL ON public.campaign_leads TO service_role;
GRANT SELECT, UPDATE ON public.campaign_leads TO authenticated;

ALTER TABLE public.campaign_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view campaign leads"
ON public.campaign_leads FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update campaign leads"
ON public.campaign_leads FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE INDEX idx_campaign_leads_ip_hash_created ON public.campaign_leads (ip_hash, created_at DESC);