-- =============================================
-- PART 3: RLS POLICIES FOR ALL TABLES
-- =============================================

-- =============================================
-- LEADS_UMZUG POLICIES
-- =============================================
CREATE POLICY "Admins can manage all leads" ON public.leads_umzug
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can insert leads" ON public.leads_umzug
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Providers can view assigned leads" ON public.leads_umzug
  FOR SELECT USING (
    id = ANY(
      SELECT unnest(assigned_provider_ids) 
      FROM public.leads_umzug l2 
      WHERE l2.id = leads_umzug.id
    )
    OR public.has_role(auth.uid(), 'admin')
  );

-- =============================================
-- SERVICE_PROVIDERS POLICIES
-- =============================================
CREATE POLICY "Admins can manage all providers" ON public.service_providers
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can view approved providers" ON public.service_providers
  FOR SELECT USING (verification_status = 'approved' AND account_status = 'active');

CREATE POLICY "Providers can view own profile" ON public.service_providers
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Providers can update own profile" ON public.service_providers
  FOR UPDATE USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Anyone can register as provider" ON public.service_providers
  FOR INSERT WITH CHECK (true);

-- =============================================
-- ESTIMATE_SESSIONS POLICIES
-- =============================================
CREATE POLICY "Anyone can view estimate sessions" ON public.estimate_sessions
  FOR SELECT USING (true);

CREATE POLICY "Anyone can create estimate sessions" ON public.estimate_sessions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update estimate sessions" ON public.estimate_sessions
  FOR UPDATE USING (true);

CREATE POLICY "Admins can delete estimate sessions" ON public.estimate_sessions
  FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- =============================================
-- SUBSCRIPTION_PLANS POLICIES
-- =============================================
CREATE POLICY "Anyone can view active plans" ON public.subscription_plans
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage plans" ON public.subscription_plans
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- =============================================
-- LEAD_TRANSACTIONS POLICIES
-- =============================================
CREATE POLICY "Admins can manage all transactions" ON public.lead_transactions
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Providers can view own transactions" ON public.lead_transactions
  FOR SELECT USING (
    provider_id IN (
      SELECT id FROM public.service_providers WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Providers can create transactions" ON public.lead_transactions
  FOR INSERT WITH CHECK (
    provider_id IN (
      SELECT id FROM public.service_providers WHERE user_id = auth.uid()
    )
  );

-- =============================================
-- LEAD_BIDS POLICIES
-- =============================================
CREATE POLICY "Admins can manage all bids" ON public.lead_bids
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Providers can view own bids" ON public.lead_bids
  FOR SELECT USING (
    provider_id IN (
      SELECT id FROM public.service_providers WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Providers can create bids" ON public.lead_bids
  FOR INSERT WITH CHECK (
    provider_id IN (
      SELECT id FROM public.service_providers WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Providers can update own bids" ON public.lead_bids
  FOR UPDATE USING (
    provider_id IN (
      SELECT id FROM public.service_providers WHERE user_id = auth.uid()
    )
  );

-- =============================================
-- PROVIDER_REVIEWS POLICIES
-- =============================================
CREATE POLICY "Anyone can view verified reviews" ON public.provider_reviews
  FOR SELECT USING (verified = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Authenticated users can create reviews" ON public.provider_reviews
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update own reviews" ON public.provider_reviews
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all reviews" ON public.provider_reviews
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- =============================================
-- PROVIDER_SUBSCRIPTIONS POLICIES
-- =============================================
CREATE POLICY "Admins can manage all subscriptions" ON public.provider_subscriptions
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Providers can view own subscriptions" ON public.provider_subscriptions
  FOR SELECT USING (
    provider_id IN (
      SELECT id FROM public.service_providers WHERE user_id = auth.uid()
    )
  );

-- =============================================
-- BILLING_RECORDS POLICIES
-- =============================================
CREATE POLICY "Admins can manage all billing" ON public.billing_records
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Providers can view own billing" ON public.billing_records
  FOR SELECT USING (
    provider_id IN (
      SELECT id FROM public.service_providers WHERE user_id = auth.uid()
    )
  );

-- =============================================
-- PROVIDER_PERFORMANCE_METRICS POLICIES
-- =============================================
CREATE POLICY "Admins can manage all metrics" ON public.provider_performance_metrics
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Providers can view own metrics" ON public.provider_performance_metrics
  FOR SELECT USING (
    provider_id IN (
      SELECT id FROM public.service_providers WHERE user_id = auth.uid()
    )
  );

-- =============================================
-- LEAD_QUALITY_FACTORS POLICIES
-- =============================================
CREATE POLICY "Admins can manage lead quality" ON public.lead_quality_factors
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Providers can view lead quality for assigned leads" ON public.lead_quality_factors
  FOR SELECT USING (
    lead_id IN (
      SELECT id FROM public.leads_umzug 
      WHERE assigned_provider_ids && ARRAY(
        SELECT id FROM public.service_providers WHERE user_id = auth.uid()
      )
    )
    OR public.has_role(auth.uid(), 'admin')
  );

-- =============================================
-- UMZUG_AB_TESTS POLICIES
-- =============================================
CREATE POLICY "Admins can manage AB tests" ON public.umzug_ab_tests
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can view active tests" ON public.umzug_ab_tests
  FOR SELECT USING (status = 'active');