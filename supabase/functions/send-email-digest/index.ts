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
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      console.error('RESEND_API_KEY not configured');
      return new Response(JSON.stringify({ error: 'Email service not configured' }), {
        status: 503,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { digest_type = 'daily' } = await req.json();

    // Get date range based on digest type
    const now = new Date();
    let startDate: Date;
    
    if (digest_type === 'weekly') {
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    } else {
      startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    }

    // Get all active providers with their leads
    const { data: providers, error: providersError } = await supabase
      .from('service_providers')
      .select('id, email, contact_person_name, company_name')
      .eq('account_status', 'active')
      .eq('verification_status', 'approved');

    if (providersError) {
      throw new Error(`Failed to fetch providers: ${providersError.message}`);
    }

    console.log(`Processing digest for ${providers?.length || 0} providers`);

    const emailsSent: string[] = [];
    const errors: string[] = [];

    for (const provider of providers || []) {
      try {
        // Get new leads for this provider
        const { data: leads } = await supabase
          .from('leads_umzug')
          .select('*')
          .contains('assigned_provider_ids', [provider.id])
          .gte('created_at', startDate.toISOString())
          .order('created_at', { ascending: false });

        // Get transactions
        const { data: transactions } = await supabase
          .from('lead_transactions')
          .select('*')
          .eq('provider_id', provider.id)
          .gte('created_at', startDate.toISOString());

        // Get performance metrics
        const { data: metrics } = await supabase
          .from('provider_performance_metrics')
          .select('*')
          .eq('provider_id', provider.id)
          .gte('metric_date', startDate.toISOString().split('T')[0])
          .order('metric_date', { ascending: false })
          .limit(1);

        const newLeadsCount = leads?.length || 0;
        const purchasedLeadsCount = transactions?.filter(t => t.status === 'completed')?.length || 0;
        const totalSpent = transactions?.reduce((sum, t) => sum + (t.amount || 0), 0) || 0;
        const conversionRate = metrics?.[0]?.conversion_rate || 0;

        // Only send if there's something to report
        if (newLeadsCount === 0 && purchasedLeadsCount === 0) {
          console.log(`Skipping ${provider.email} - no activity`);
          continue;
        }

        const periodLabel = digest_type === 'weekly' ? 'diese Woche' : 'heute';
        
        const emailHtml = `
          <h1>${digest_type === 'weekly' ? 'Wöchentlicher' : 'Täglicher'} Bericht</h1>
          <p>Hallo ${provider.contact_person_name},</p>
          <p>Hier ist Ihre Zusammenfassung für ${periodLabel}:</p>
          
          <h2>📊 Übersicht</h2>
          <table style="border-collapse: collapse; width: 100%; max-width: 400px;">
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;">Neue Leads</td>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">${newLeadsCount}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;">Gekaufte Leads</td>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">${purchasedLeadsCount}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;">Ausgaben</td>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">CHF ${totalSpent.toFixed(2)}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;">Konversionsrate</td>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">${conversionRate.toFixed(1)}%</td>
            </tr>
          </table>
          
          ${newLeadsCount > 0 ? `
            <h2>🆕 Neue Leads</h2>
            <ul>
              ${leads?.slice(0, 5).map(l => `
                <li>
                  <strong>${l.from_city} → ${l.to_city}</strong><br>
                  Geschätzt: CHF ${(l.calculator_output as Record<string, unknown>)?.priceMin || 'N/A'}
                </li>
              `).join('')}
              ${newLeadsCount > 5 ? `<li>...und ${newLeadsCount - 5} weitere</li>` : ''}
            </ul>
          ` : ''}
          
          <p><a href="https://umzugscheck.ch/partner/dashboard">Zum Dashboard</a></p>
          
          <p>Freundliche Grüsse,<br>Das Umzugscheck.ch Team</p>
        `;

        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Umzugscheck.ch <noreply@umzugscheck.ch>',
            to: [provider.email],
            subject: `${digest_type === 'weekly' ? 'Wöchentlicher' : 'Täglicher'} Bericht - ${provider.company_name}`,
            html: emailHtml,
          }),
        });

        if (response.ok) {
          emailsSent.push(provider.email);
          console.log(`Digest sent to ${provider.email}`);
        } else {
          const errorText = await response.text();
          errors.push(`${provider.email}: ${errorText}`);
        }
      } catch (providerError: unknown) {
        errors.push(`${provider.email}: ${providerError instanceof Error ? providerError.message : 'Unknown error'}`);
      }
    }

    return new Response(JSON.stringify({ 
      success: true,
      digest_type,
      emails_sent: emailsSent.length,
      recipients: emailsSent,
      errors: errors.length > 0 ? errors : undefined
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    console.error('Error in send-email-digest:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
