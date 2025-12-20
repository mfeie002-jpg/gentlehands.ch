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
    // Verify authorization
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Authorization required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid session' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const body = await req.json();
    const { lead_id, bid_amount } = body;

    if (!lead_id || !bid_amount) {
      return new Response(
        JSON.stringify({ error: 'lead_id and bid_amount are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get provider ID for this user
    const { data: provider, error: providerError } = await supabaseAdmin
      .from('service_providers')
      .select('id, max_bid_chf, bidding_active')
      .eq('user_id', user.id)
      .single();

    if (providerError || !provider) {
      return new Response(
        JSON.stringify({ error: 'Provider not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!provider.bidding_active) {
      return new Response(
        JSON.stringify({ error: 'Bidding is not active for your account' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (provider.max_bid_chf && bid_amount > provider.max_bid_chf) {
      return new Response(
        JSON.stringify({ error: `Bid exceeds your maximum bid limit of ${provider.max_bid_chf} CHF` }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Call the place_bid function
    const { data: result, error: bidError } = await supabaseAdmin
      .rpc('place_bid', {
        p_lead_id: lead_id,
        p_provider_id: provider.id,
        p_bid_amount: bid_amount
      });

    if (bidError) {
      console.error('Bid error:', bidError);
      throw bidError;
    }

    console.log('Bid placed:', result);

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Error in place-bid:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
