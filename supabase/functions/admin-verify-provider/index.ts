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
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'No authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check if user is admin
    const adminClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data: roleData } = await adminClient
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .single();

    if (!roleData) {
      return new Response(JSON.stringify({ error: 'Admin access required' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { provider_id, action, rejection_reason } = await req.json();

    if (!provider_id || !action) {
      return new Response(JSON.stringify({ error: 'provider_id and action are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!['approve', 'reject'].includes(action)) {
      return new Response(JSON.stringify({ error: 'Invalid action. Use "approve" or "reject"' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get provider details
    const { data: provider, error: providerError } = await adminClient
      .from('service_providers')
      .select('*')
      .eq('id', provider_id)
      .single();

    if (providerError || !provider) {
      return new Response(JSON.stringify({ error: 'Provider not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Update provider verification status
    const newStatus = action === 'approve' ? 'approved' : 'rejected';
    const { error: updateError } = await adminClient
      .from('service_providers')
      .update({ 
        verification_status: newStatus,
        updated_at: new Date().toISOString()
      })
      .eq('id', provider_id);

    if (updateError) {
      console.error('Error updating provider:', updateError);
      return new Response(JSON.stringify({ error: 'Failed to update provider' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Send email notification
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (resendApiKey) {
      const emailSubject = action === 'approve' 
        ? 'Ihr Konto wurde freigegeben - Umzugscheck.ch'
        : 'Ihr Konto wurde abgelehnt - Umzugscheck.ch';

      const emailHtml = action === 'approve'
        ? `
          <h1>Herzlichen Glückwunsch, ${provider.contact_person_name}!</h1>
          <p>Ihr Firmenkonto <strong>${provider.company_name}</strong> wurde erfolgreich verifiziert und freigeschaltet.</p>
          <p>Sie können sich jetzt im Partner-Portal anmelden und Leads empfangen.</p>
          <p>Bei Fragen stehen wir Ihnen gerne zur Verfügung.</p>
          <p>Freundliche Grüsse,<br>Das Umzugscheck.ch Team</p>
        `
        : `
          <h1>Hallo ${provider.contact_person_name},</h1>
          <p>Leider konnten wir Ihr Firmenkonto <strong>${provider.company_name}</strong> nicht freischalten.</p>
          ${rejection_reason ? `<p><strong>Grund:</strong> ${rejection_reason}</p>` : ''}
          <p>Bitte kontaktieren Sie uns bei Fragen.</p>
          <p>Freundliche Grüsse,<br>Das Umzugscheck.ch Team</p>
        `;

      try {
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Umzugscheck.ch <noreply@umzugscheck.ch>',
            to: [provider.email],
            subject: emailSubject,
            html: emailHtml,
          }),
        });

        if (!emailResponse.ok) {
          console.error('Email send failed:', await emailResponse.text());
        } else {
          console.log('Notification email sent to:', provider.email);
        }
      } catch (emailError) {
        console.error('Email error:', emailError);
      }
    } else {
      console.log('RESEND_API_KEY not configured, skipping email notification');
    }

    return new Response(JSON.stringify({ 
      success: true, 
      provider_id,
      new_status: newStatus,
      email_sent: !!resendApiKey
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    console.error('Error in admin-verify-provider:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
