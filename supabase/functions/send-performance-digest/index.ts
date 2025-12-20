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

    const { provider_id } = await req.json();

    // Get date ranges
    const now = new Date();
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const last60Days = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

    // Build query for providers
    let providersQuery = supabase
      .from('service_providers')
      .select('id, email, contact_person_name, company_name')
      .eq('account_status', 'active')
      .eq('verification_status', 'approved');

    if (provider_id) {
      providersQuery = providersQuery.eq('id', provider_id);
    }

    const { data: providers, error: providersError } = await providersQuery;

    if (providersError) {
      throw new Error(`Failed to fetch providers: ${providersError.message}`);
    }

    const emailsSent: string[] = [];
    const errors: string[] = [];

    for (const provider of providers || []) {
      try {
        // Get current period metrics (last 30 days)
        const { data: currentMetrics } = await supabase
          .from('provider_performance_metrics')
          .select('*')
          .eq('provider_id', provider.id)
          .gte('metric_date', last30Days.toISOString().split('T')[0])
          .order('metric_date', { ascending: false });

        // Get previous period metrics (30-60 days ago)
        const { data: previousMetrics } = await supabase
          .from('provider_performance_metrics')
          .select('*')
          .eq('provider_id', provider.id)
          .gte('metric_date', last60Days.toISOString().split('T')[0])
          .lt('metric_date', last30Days.toISOString().split('T')[0]);

        // Calculate aggregates
        const currentStats = aggregateMetrics(currentMetrics || []);
        const previousStats = aggregateMetrics(previousMetrics || []);

        // Get recent reviews
        const { data: recentReviews } = await supabase
          .from('provider_reviews')
          .select('rating, title, created_at')
          .eq('provider_id', provider.id)
          .gte('created_at', last30Days.toISOString())
          .order('created_at', { ascending: false })
          .limit(3);

        // Calculate trends
        const leadsTrend = calculateTrend(currentStats.totalLeads, previousStats.totalLeads);
        const conversionTrend = calculateTrend(currentStats.avgConversion, previousStats.avgConversion);
        const responseTrend = calculateTrend(previousStats.avgResponseTime, currentStats.avgResponseTime); // Reversed - lower is better

        const emailHtml = `
          <h1>📊 Leistungsbericht - ${provider.company_name}</h1>
          <p>Hallo ${provider.contact_person_name},</p>
          <p>Hier ist Ihr monatlicher Leistungsbericht:</p>
          
          <h2>📈 Performance Übersicht (letzte 30 Tage)</h2>
          <table style="border-collapse: collapse; width: 100%; max-width: 500px;">
            <tr style="background: #f5f5f5;">
              <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Metrik</th>
              <th style="padding: 12px; text-align: right; border: 1px solid #ddd;">Wert</th>
              <th style="padding: 12px; text-align: right; border: 1px solid #ddd;">Trend</th>
            </tr>
            <tr>
              <td style="padding: 12px; border: 1px solid #ddd;">Erhaltene Leads</td>
              <td style="padding: 12px; border: 1px solid #ddd; text-align: right; font-weight: bold;">${currentStats.totalLeads}</td>
              <td style="padding: 12px; border: 1px solid #ddd; text-align: right; color: ${leadsTrend.color};">${leadsTrend.icon} ${leadsTrend.text}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border: 1px solid #ddd;">Konversionsrate</td>
              <td style="padding: 12px; border: 1px solid #ddd; text-align: right; font-weight: bold;">${currentStats.avgConversion.toFixed(1)}%</td>
              <td style="padding: 12px; border: 1px solid #ddd; text-align: right; color: ${conversionTrend.color};">${conversionTrend.icon} ${conversionTrend.text}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border: 1px solid #ddd;">Ø Antwortzeit</td>
              <td style="padding: 12px; border: 1px solid #ddd; text-align: right; font-weight: bold;">${currentStats.avgResponseTime.toFixed(1)}h</td>
              <td style="padding: 12px; border: 1px solid #ddd; text-align: right; color: ${responseTrend.color};">${responseTrend.icon} ${responseTrend.text}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border: 1px solid #ddd;">Kontaktierte Leads</td>
              <td style="padding: 12px; border: 1px solid #ddd; text-align: right; font-weight: bold;">${currentStats.totalContacted}</td>
              <td style="padding: 12px; border: 1px solid #ddd; text-align: right;">-</td>
            </tr>
            <tr>
              <td style="padding: 12px; border: 1px solid #ddd;">Abgeschlossene Aufträge</td>
              <td style="padding: 12px; border: 1px solid #ddd; text-align: right; font-weight: bold;">${currentStats.totalConverted}</td>
              <td style="padding: 12px; border: 1px solid #ddd; text-align: right;">-</td>
            </tr>
          </table>
          
          ${recentReviews && recentReviews.length > 0 ? `
            <h2>⭐ Neue Bewertungen</h2>
            <ul>
              ${recentReviews.map(r => `
                <li>
                  <strong>${'⭐'.repeat(r.rating)}</strong> - ${r.title}<br>
                  <small>${new Date(r.created_at).toLocaleDateString('de-CH')}</small>
                </li>
              `).join('')}
            </ul>
          ` : ''}
          
          <h2>💡 Tipps zur Verbesserung</h2>
          <ul>
            ${currentStats.avgResponseTime > 2 ? '<li>Versuchen Sie, schneller auf neue Leads zu reagieren. Leads, die innerhalb einer Stunde kontaktiert werden, haben eine 3x höhere Konversionsrate!</li>' : ''}
            ${currentStats.avgConversion < 20 ? '<li>Ihre Konversionsrate liegt unter dem Durchschnitt. Verbessern Sie Ihre Erstansprache und bieten Sie wettbewerbsfähige Preise.</li>' : ''}
            ${currentStats.totalContacted < currentStats.totalLeads * 0.8 ? '<li>Sie haben nicht alle Leads kontaktiert. Verpassen Sie keine Gelegenheiten!</li>' : ''}
            <li>Bitten Sie zufriedene Kunden um eine Bewertung - das verbessert Ihr Ranking!</li>
          </ul>
          
          <p><a href="https://umzugscheck.ch/partner/analytics" style="background: #0066cc; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Detaillierte Statistiken ansehen</a></p>
          
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
            subject: `📊 Monatlicher Leistungsbericht - ${provider.company_name}`,
            html: emailHtml,
          }),
        });

        if (response.ok) {
          emailsSent.push(provider.email);
          console.log(`Performance digest sent to ${provider.email}`);
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
      emails_sent: emailsSent.length,
      recipients: emailsSent,
      errors: errors.length > 0 ? errors : undefined
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    console.error('Error in send-performance-digest:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

interface MetricRow {
  leads_received?: number;
  leads_contacted?: number;
  leads_converted?: number;
  conversion_rate?: number;
  response_time_avg_hours?: number;
}

function aggregateMetrics(metrics: MetricRow[]) {
  if (!metrics.length) {
    return { totalLeads: 0, totalContacted: 0, totalConverted: 0, avgConversion: 0, avgResponseTime: 0 };
  }

  const totalLeads = metrics.reduce((sum, m) => sum + (m.leads_received || 0), 0);
  const totalContacted = metrics.reduce((sum, m) => sum + (m.leads_contacted || 0), 0);
  const totalConverted = metrics.reduce((sum, m) => sum + (m.leads_converted || 0), 0);
  
  const conversionRates = metrics.filter(m => m.conversion_rate != null).map(m => m.conversion_rate!);
  const avgConversion = conversionRates.length ? conversionRates.reduce((a, b) => a + b, 0) / conversionRates.length : 0;
  
  const responseTimes = metrics.filter(m => m.response_time_avg_hours != null).map(m => m.response_time_avg_hours!);
  const avgResponseTime = responseTimes.length ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length : 0;

  return { totalLeads, totalContacted, totalConverted, avgConversion, avgResponseTime };
}

function calculateTrend(current: number, previous: number) {
  if (previous === 0) {
    return { icon: '➡️', text: 'Keine Daten', color: '#666' };
  }
  
  const change = ((current - previous) / previous) * 100;
  
  if (change > 5) {
    return { icon: '📈', text: `+${change.toFixed(0)}%`, color: '#22c55e' };
  } else if (change < -5) {
    return { icon: '📉', text: `${change.toFixed(0)}%`, color: '#ef4444' };
  } else {
    return { icon: '➡️', text: 'Stabil', color: '#666' };
  }
}
