import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const body = await req.json();
    console.log('Provider signup request:', { ...body, password: '[REDACTED]' });

    const {
      email,
      password,
      company_name,
      contact_person_name,
      phone,
      street,
      zip,
      city,
      services_offered,
      cantons_served,
    } = body;

    // Validate required fields
    if (!email || !password || !company_name || !contact_person_name || !phone || !street || !zip || !city) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if email already exists
    const { data: existingProvider } = await supabase
      .from('service_providers')
      .select('id')
      .eq('email', email)
      .single();

    if (existingProvider) {
      return new Response(
        JSON.stringify({ error: 'Email already registered' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (authError) {
      console.error('Auth error:', authError);
      throw authError;
    }

    // Generate slug from company name
    const slug = company_name
      .toLowerCase()
      .replace(/[äöüß]/g, (c: string) => ({ 'ä': 'ae', 'ö': 'oe', 'ü': 'ue', 'ß': 'ss' }[c] || c))
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    // Create service provider
    const { data: provider, error: providerError } = await supabase
      .from('service_providers')
      .insert({
        user_id: authData.user.id,
        email,
        company_name,
        slug,
        contact_person_name,
        phone,
        street,
        zip,
        city,
        services_offered: services_offered || [],
        cantons_served: cantons_served || [],
        verification_status: 'pending',
        account_status: 'active',
        profile_completeness: 30,
      })
      .select()
      .single();

    if (providerError) {
      console.error('Provider creation error:', providerError);
      // Cleanup: delete auth user if provider creation fails
      await supabase.auth.admin.deleteUser(authData.user.id);
      throw providerError;
    }

    console.log('Provider created successfully:', provider.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        provider_id: provider.id,
        message: 'Registration successful. Your account is pending verification.'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Error in provider-signup:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
