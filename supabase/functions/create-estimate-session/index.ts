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
    console.log('Creating estimate session:', body);

    const { move_details, estimate, funnel_variant } = body;

    if (!move_details || !estimate) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: move_details and estimate' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Find matching companies based on move details
    const fromPostal = move_details.from_postal || move_details.fromPostal;
    const toPostal = move_details.to_postal || move_details.toPostal;

    const { data: matchingProviders } = await supabase
      .rpc('find_matching_providers', {
        lead_from_postal: fromPostal,
        lead_to_postal: toPostal,
        estimated_value: estimate.priceMin || null
      });

    // Create session
    const { data: session, error } = await supabase
      .from('estimate_sessions')
      .insert({
        move_details,
        estimate,
        matching_company_ids: matchingProviders || [],
        funnel_variant,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating session:', error);
      throw error;
    }

    console.log('Session created:', session.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        session_id: session.id,
        matching_providers_count: matchingProviders?.length || 0
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Error in create-estimate-session:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
