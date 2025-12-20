import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const body = await req.json();
    console.log('Creating funnel lead:', body);

    const {
      name,
      email,
      phone,
      from_city,
      from_postal,
      to_city,
      to_postal,
      move_date,
      calculator_type,
      calculator_input,
      calculator_output,
      comments,
      lead_source,
      estimate_session_id,
    } = body;

    // Validate required fields
    if (!name || !email || !from_city || !from_postal || !to_city || !to_postal || !calculator_type) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Insert lead
    const { data: lead, error: leadError } = await supabase
      .from('leads_umzug')
      .insert({
        name,
        email,
        phone,
        from_city,
        from_postal,
        to_city,
        to_postal,
        move_date,
        calculator_type,
        calculator_input: calculator_input || {},
        calculator_output: calculator_output || {},
        comments,
        lead_source: lead_source || 'website',
        estimate_session_id,
        status: 'new',
      })
      .select()
      .single();

    if (leadError) {
      console.error('Error creating lead:', leadError);
      throw leadError;
    }

    console.log('Lead created successfully:', lead.id);

    // Update estimate session if provided
    if (estimate_session_id) {
      await supabase
        .from('estimate_sessions')
        .update({ submitted_lead: true })
        .eq('id', estimate_session_id);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        lead_id: lead.id,
        assigned_providers: lead.assigned_provider_ids?.length || 0
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Error in create-funnel-lead:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
