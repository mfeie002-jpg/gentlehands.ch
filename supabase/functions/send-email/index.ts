import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
      return new Response(JSON.stringify({ 
        error: 'Email service not configured',
        sent: false 
      }), {
        status: 503,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { to, subject, html, text, from, reply_to, template, template_data } = await req.json();

    if (!to || !subject) {
      return new Response(JSON.stringify({ error: 'to and subject are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Generate HTML from template if provided
    let emailHtml = html;
    if (template && template_data) {
      emailHtml = generateEmailFromTemplate(template, template_data);
    }

    if (!emailHtml && !text) {
      return new Response(JSON.stringify({ error: 'html, text, or template is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const emailPayload: Record<string, unknown> = {
      from: from || 'Umzugscheck.ch <noreply@umzugscheck.ch>',
      to: Array.isArray(to) ? to : [to],
      subject,
    };

    if (emailHtml) emailPayload.html = emailHtml;
    if (text) emailPayload.text = text;
    if (reply_to) emailPayload.reply_to = reply_to;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Resend API error:', result);
      return new Response(JSON.stringify({ 
        error: 'Failed to send email',
        details: result,
        sent: false 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Email sent successfully:', result);
    return new Response(JSON.stringify({ 
      success: true,
      sent: true,
      message_id: result.id
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    console.error('Error in send-email:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error', sent: false }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function generateEmailFromTemplate(template: string, data: Record<string, unknown>): string {
  const templates: Record<string, (data: Record<string, unknown>) => string> = {
    'new-lead': (d) => `
      <h1>Neue Anfrage erhalten!</h1>
      <p>Sie haben eine neue Umzugsanfrage erhalten.</p>
      <h2>Details:</h2>
      <ul>
        <li><strong>Name:</strong> ${d.name}</li>
        <li><strong>Von:</strong> ${d.from_city} (${d.from_postal})</li>
        <li><strong>Nach:</strong> ${d.to_city} (${d.to_postal})</li>
        <li><strong>Umzugsdatum:</strong> ${d.move_date || 'Nicht angegeben'}</li>
        <li><strong>Geschätzter Wert:</strong> CHF ${d.estimated_value || 'N/A'}</li>
      </ul>
      <p><a href="${d.dashboard_url}">Im Dashboard ansehen</a></p>
    `,
    'lead-purchased': (d) => `
      <h1>Lead erfolgreich gekauft!</h1>
      <p>Sie haben einen Lead für CHF ${d.amount} erworben.</p>
      <h2>Kontaktdaten:</h2>
      <ul>
        <li><strong>Name:</strong> ${d.name}</li>
        <li><strong>Email:</strong> ${d.email}</li>
        <li><strong>Telefon:</strong> ${d.phone || 'Nicht angegeben'}</li>
      </ul>
      <p>Kontaktieren Sie den Kunden so schnell wie möglich!</p>
    `,
    'provider-approved': (d) => `
      <h1>Willkommen bei Umzugscheck.ch!</h1>
      <p>Hallo ${d.contact_name},</p>
      <p>Ihr Firmenkonto <strong>${d.company_name}</strong> wurde erfolgreich verifiziert.</p>
      <p>Sie können sich jetzt im Partner-Portal anmelden und Leads empfangen.</p>
      <p><a href="${d.login_url}">Jetzt anmelden</a></p>
    `,
    'bid-outbid': (d) => `
      <h1>Sie wurden überboten!</h1>
      <p>Ein anderer Anbieter hat ein höheres Gebot für den Lead "${d.lead_summary}" abgegeben.</p>
      <p><strong>Aktuelles Höchstgebot:</strong> CHF ${d.current_bid}</p>
      <p><strong>Bieten endet:</strong> ${d.closes_at}</p>
      <p><a href="${d.bid_url}">Jetzt höher bieten</a></p>
    `,
    'welcome': (d) => `
      <h1>Willkommen bei Umzugscheck.ch!</h1>
      <p>Hallo ${d.name},</p>
      <p>Vielen Dank für Ihre Registrierung. Wir prüfen Ihre Angaben und melden uns in Kürze bei Ihnen.</p>
      <p>Bei Fragen stehen wir Ihnen gerne zur Verfügung.</p>
      <p>Freundliche Grüsse,<br>Das Umzugscheck.ch Team</p>
    `,
  };

  const templateFn = templates[template];
  if (!templateFn) {
    throw new Error(`Unknown template: ${template}`);
  }

  return templateFn(data);
}
