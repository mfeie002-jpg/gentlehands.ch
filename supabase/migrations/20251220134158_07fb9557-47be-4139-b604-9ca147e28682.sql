-- =============================================
-- PART 4: DATABASE FUNCTIONS
-- =============================================

-- =============================================
-- GET CANTON FROM POSTAL CODE
-- =============================================
CREATE OR REPLACE FUNCTION public.get_canton_from_postal(postal_code TEXT)
RETURNS TEXT
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Swiss postal code to canton mapping
  CASE 
    WHEN postal_code ~ '^1[0-2]' THEN RETURN 'VD'; -- Waadt
    WHEN postal_code ~ '^12[0-9][0-9]$' AND postal_code::int >= 1200 AND postal_code::int <= 1299 THEN RETURN 'GE'; -- Genf
    WHEN postal_code ~ '^13' THEN RETURN 'VD';
    WHEN postal_code ~ '^14' THEN RETURN 'VD';
    WHEN postal_code ~ '^15' THEN RETURN 'FR'; -- Fribourg
    WHEN postal_code ~ '^16' THEN RETURN 'FR';
    WHEN postal_code ~ '^17' THEN RETURN 'FR';
    WHEN postal_code ~ '^18' THEN RETURN 'VS'; -- Wallis
    WHEN postal_code ~ '^19' THEN RETURN 'VS';
    WHEN postal_code ~ '^2[0-3]' THEN RETURN 'NE'; -- Neuenburg
    WHEN postal_code ~ '^25' THEN RETURN 'BE'; -- Bern
    WHEN postal_code ~ '^26' THEN RETURN 'JU'; -- Jura
    WHEN postal_code ~ '^27' THEN RETURN 'BE';
    WHEN postal_code ~ '^28' THEN RETURN 'BE';
    WHEN postal_code ~ '^29' THEN RETURN 'BE';
    WHEN postal_code ~ '^3[0-9]' THEN RETURN 'BE'; -- Bern
    WHEN postal_code ~ '^39' THEN RETURN 'VS'; -- Wallis
    WHEN postal_code ~ '^4[0-4]' THEN RETURN 'BS'; -- Basel-Stadt / Baselland
    WHEN postal_code ~ '^45' THEN RETURN 'SO'; -- Solothurn
    WHEN postal_code ~ '^46' THEN RETURN 'SO';
    WHEN postal_code ~ '^47' THEN RETURN 'SO';
    WHEN postal_code ~ '^48' THEN RETURN 'SO';
    WHEN postal_code ~ '^49' THEN RETURN 'AG'; -- Aargau
    WHEN postal_code ~ '^5[0-6]' THEN RETURN 'AG'; -- Aargau
    WHEN postal_code ~ '^6[0-3]' THEN RETURN 'LU'; -- Luzern
    WHEN postal_code ~ '^64' THEN RETURN 'OW'; -- Obwalden/Nidwalden
    WHEN postal_code ~ '^65' THEN RETURN 'TI'; -- Tessin
    WHEN postal_code ~ '^66' THEN RETURN 'TI';
    WHEN postal_code ~ '^67' THEN RETURN 'TI';
    WHEN postal_code ~ '^68' THEN RETURN 'TI';
    WHEN postal_code ~ '^69' THEN RETURN 'TI';
    WHEN postal_code ~ '^7[0-4]' THEN RETURN 'GR'; -- Graubünden
    WHEN postal_code ~ '^75' THEN RETURN 'GR';
    WHEN postal_code ~ '^76' THEN RETURN 'GR';
    WHEN postal_code ~ '^8[0-1]' THEN RETURN 'ZH'; -- Zürich
    WHEN postal_code ~ '^82' THEN RETURN 'ZH';
    WHEN postal_code ~ '^83' THEN RETURN 'ZH';
    WHEN postal_code ~ '^84' THEN RETURN 'SH'; -- Schaffhausen
    WHEN postal_code ~ '^85' THEN RETURN 'TG'; -- Thurgau
    WHEN postal_code ~ '^86' THEN RETURN 'ZH';
    WHEN postal_code ~ '^87' THEN RETURN 'ZH';
    WHEN postal_code ~ '^88' THEN RETURN 'SG'; -- St. Gallen
    WHEN postal_code ~ '^89' THEN RETURN 'SG';
    WHEN postal_code ~ '^9[0-3]' THEN RETURN 'SG'; -- St. Gallen
    WHEN postal_code ~ '^94' THEN RETURN 'AR'; -- Appenzell
    WHEN postal_code ~ '^95' THEN RETURN 'TG'; -- Thurgau
    WHEN postal_code ~ '^96' THEN RETURN 'TG';
    ELSE RETURN NULL;
  END CASE;
END;
$$;

-- =============================================
-- FIND MATCHING PROVIDERS FOR A LEAD
-- =============================================
CREATE OR REPLACE FUNCTION public.find_matching_providers(
  lead_from_postal TEXT,
  lead_to_postal TEXT,
  estimated_value NUMERIC DEFAULT NULL
)
RETURNS UUID[]
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  from_canton TEXT;
  to_canton TEXT;
  matching_ids UUID[];
BEGIN
  from_canton := public.get_canton_from_postal(lead_from_postal);
  to_canton := public.get_canton_from_postal(lead_to_postal);
  
  SELECT ARRAY_AGG(id) INTO matching_ids
  FROM public.service_providers
  WHERE verification_status = 'approved'
    AND account_status = 'active'
    AND (
      from_canton = ANY(cantons_served) 
      OR to_canton = ANY(cantons_served)
      OR array_length(cantons_served, 1) IS NULL
    )
    AND (
      estimated_value IS NULL 
      OR min_job_value IS NULL 
      OR estimated_value >= min_job_value
    );
  
  RETURN COALESCE(matching_ids, ARRAY[]::UUID[]);
END;
$$;

-- =============================================
-- AUTO ASSIGN PROVIDERS TO LEAD (Trigger Function)
-- =============================================
CREATE OR REPLACE FUNCTION public.auto_assign_providers_to_lead()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  matched_providers UUID[];
  estimated_value NUMERIC;
BEGIN
  -- Extract estimated value from calculator output
  estimated_value := (NEW.calculator_output->>'priceMin')::NUMERIC;
  
  -- Find matching providers
  matched_providers := public.find_matching_providers(
    NEW.from_postal,
    NEW.to_postal,
    estimated_value
  );
  
  NEW.assigned_provider_ids := matched_providers;
  RETURN NEW;
END;
$$;

-- Create trigger for auto-assignment
CREATE TRIGGER auto_assign_providers_on_lead_insert
  BEFORE INSERT ON public.leads_umzug
  FOR EACH ROW
  EXECUTE FUNCTION public.auto_assign_providers_to_lead();

-- =============================================
-- CALCULATE LEAD QUALITY (Trigger Function)
-- =============================================
CREATE OR REPLACE FUNCTION public.calculate_lead_quality_on_insert()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  quality_score INTEGER := 0;
  value_score INTEGER := 0;
  completeness_score INTEGER := 0;
  urgency_score INTEGER := 0;
  estimated_value NUMERIC;
BEGIN
  estimated_value := (NEW.calculator_output->>'priceMin')::NUMERIC;
  
  -- Value score based on estimated price
  IF estimated_value > 5000 THEN value_score := 30;
  ELSIF estimated_value > 3000 THEN value_score := 25;
  ELSIF estimated_value > 1500 THEN value_score := 20;
  ELSE value_score := 10;
  END IF;
  
  -- Completeness score
  IF NEW.phone IS NOT NULL THEN completeness_score := completeness_score + 10; END IF;
  IF NEW.move_date IS NOT NULL THEN completeness_score := completeness_score + 10; END IF;
  IF NEW.comments IS NOT NULL AND length(NEW.comments) > 20 THEN completeness_score := completeness_score + 5; END IF;
  
  -- Urgency score based on move date
  IF NEW.move_date IS NOT NULL THEN
    IF NEW.move_date <= CURRENT_DATE + interval '7 days' THEN urgency_score := 15;
    ELSIF NEW.move_date <= CURRENT_DATE + interval '14 days' THEN urgency_score := 10;
    ELSIF NEW.move_date <= CURRENT_DATE + interval '30 days' THEN urgency_score := 5;
    END IF;
  END IF;
  
  quality_score := value_score + completeness_score + urgency_score;
  
  -- Insert quality factors
  INSERT INTO public.lead_quality_factors (lead_id, quality_score, value_score, completeness_score, urgency_score)
  VALUES (NEW.id, quality_score, value_score, completeness_score, urgency_score);
  
  RETURN NEW;
END;
$$;

-- Create trigger for quality calculation
CREATE TRIGGER calculate_quality_on_lead_insert
  AFTER INSERT ON public.leads_umzug
  FOR EACH ROW
  EXECUTE FUNCTION public.calculate_lead_quality_on_insert();

-- =============================================
-- UPDATE PROVIDER QUALITY SCORE
-- =============================================
CREATE OR REPLACE FUNCTION public.update_provider_quality_score(p_provider_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  avg_rating NUMERIC;
  review_count INTEGER;
  conversion_rate NUMERIC;
  response_score NUMERIC;
  final_score NUMERIC;
BEGIN
  -- Get average rating
  SELECT AVG(rating), COUNT(*) INTO avg_rating, review_count
  FROM public.provider_reviews
  WHERE provider_id = p_provider_id AND verified = true;
  
  -- Get conversion rate from metrics
  SELECT AVG(pm.conversion_rate) INTO conversion_rate
  FROM public.provider_performance_metrics pm
  WHERE pm.provider_id = p_provider_id
    AND pm.metric_date >= CURRENT_DATE - interval '30 days';
  
  -- Calculate response score (faster = higher)
  SELECT 
    CASE 
      WHEN response_time_minutes <= 30 THEN 100
      WHEN response_time_minutes <= 60 THEN 80
      WHEN response_time_minutes <= 120 THEN 60
      ELSE 40
    END INTO response_score
  FROM public.service_providers
  WHERE id = p_provider_id;
  
  -- Calculate final quality score (weighted)
  final_score := (
    COALESCE(avg_rating * 20, 0) +  -- Max 100 (5 * 20)
    COALESCE(conversion_rate, 0) +   -- Max 100
    COALESCE(response_score, 50)     -- Max 100
  ) / 3;
  
  -- Update provider
  UPDATE public.service_providers
  SET quality_score = final_score,
      updated_at = now()
  WHERE id = p_provider_id;
END;
$$;

-- =============================================
-- PLACE BID FUNCTION
-- =============================================
CREATE OR REPLACE FUNCTION public.place_bid(
  p_lead_id UUID,
  p_provider_id UUID,
  p_bid_amount NUMERIC
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  lead_record RECORD;
  existing_bid RECORD;
  result JSONB;
BEGIN
  -- Get lead details
  SELECT * INTO lead_record FROM public.leads_umzug WHERE id = p_lead_id;
  
  IF lead_record IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'Lead not found');
  END IF;
  
  IF NOT lead_record.bidding_enabled THEN
    RETURN jsonb_build_object('success', false, 'error', 'Bidding not enabled for this lead');
  END IF;
  
  IF lead_record.bidding_closes_at < now() THEN
    RETURN jsonb_build_object('success', false, 'error', 'Bidding has closed');
  END IF;
  
  -- Check if bid is higher than current
  IF lead_record.current_highest_bid IS NOT NULL AND p_bid_amount <= lead_record.current_highest_bid THEN
    RETURN jsonb_build_object('success', false, 'error', 'Bid must be higher than current highest bid');
  END IF;
  
  -- Check for existing bid from this provider
  SELECT * INTO existing_bid 
  FROM public.lead_bids 
  WHERE lead_id = p_lead_id AND provider_id = p_provider_id AND status = 'active';
  
  IF existing_bid IS NOT NULL THEN
    -- Update existing bid
    UPDATE public.lead_bids
    SET bid_amount = p_bid_amount, updated_at = now()
    WHERE id = existing_bid.id;
  ELSE
    -- Create new bid
    INSERT INTO public.lead_bids (lead_id, provider_id, bid_amount)
    VALUES (p_lead_id, p_provider_id, p_bid_amount);
    
    -- Increment bid count
    UPDATE public.leads_umzug
    SET bid_count = bid_count + 1
    WHERE id = p_lead_id;
  END IF;
  
  -- Update highest bid
  UPDATE public.leads_umzug
  SET current_highest_bid = p_bid_amount, updated_at = now()
  WHERE id = p_lead_id;
  
  RETURN jsonb_build_object('success', true, 'new_highest_bid', p_bid_amount);
END;
$$;

-- =============================================
-- PURCHASE LEAD FUNCTION
-- =============================================
CREATE OR REPLACE FUNCTION public.purchase_lead(
  p_lead_id UUID,
  p_provider_id UUID,
  p_amount NUMERIC
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  transaction_id UUID;
BEGIN
  -- Create transaction
  INSERT INTO public.lead_transactions (lead_id, provider_id, amount, status, purchased_at)
  VALUES (p_lead_id, p_provider_id, p_amount, 'completed', now())
  RETURNING id INTO transaction_id;
  
  -- Update lead status
  UPDATE public.leads_umzug
  SET status = 'purchased', updated_at = now()
  WHERE id = p_lead_id;
  
  -- Update provider metrics
  INSERT INTO public.provider_performance_metrics (provider_id, leads_received)
  VALUES (p_provider_id, 1)
  ON CONFLICT (provider_id, metric_date)
  DO UPDATE SET leads_received = provider_performance_metrics.leads_received + 1;
  
  RETURN jsonb_build_object(
    'success', true, 
    'transaction_id', transaction_id,
    'amount', p_amount
  );
END;
$$;