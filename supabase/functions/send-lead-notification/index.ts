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
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const body = await req.json();
    const { lead_id } = body;

    if (!lead_id) {
      return new Response(
        JSON.stringify({ error: 'lead_id is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get lead with assigned providers
    const { data: lead, error: leadError } = await supabaseAdmin
      .from('leads_umzug')
      .select('*')
      .eq('id', lead_id)
      .single();

    if (leadError || !lead) {
      return new Response(
        JSON.stringify({ error: 'Lead not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!lead.assigned_provider_ids || lead.assigned_provider_ids.length === 0) {
      console.log('No providers assigned to this lead');
      return new Response(
        JSON.stringify({ success: true, notifications_sent: 0 }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get assigned providers
    const { data: providers, error: providersError } = await supabaseAdmin
      .from('service_providers')
      .select('id, email, company_name, contact_person_name')
      .in('id', lead.assigned_provider_ids)
      .eq('account_status', 'active');

    if (providersError) {
      throw providersError;
    }

    // In a real implementation, you would send emails here
    // For now, we'll just log the notifications
    console.log(`Sending notifications to ${providers?.length || 0} providers for lead ${lead_id}`);

    for (const provider of providers || []) {
      console.log(`Notification would be sent to ${provider.email} (${provider.company_name})`);
      // Here you would integrate with an email service like Resend, SendGrid, etc.
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        notifications_sent: providers?.length || 0,
        providers_notified: providers?.map(p => p.company_name) || []
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Error in send-lead-notification:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
