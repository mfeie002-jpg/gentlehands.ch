import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 20;
const RATE_WINDOW = 60000;

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const existing = rateLimitMap.get(identifier);
  
  if (!existing || now > existing.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }
  
  if (existing.count >= RATE_LIMIT) {
    return false;
  }
  
  existing.count++;
  return true;
}

function maskEmail(email: string): string {
  if (!email) return '***';
  const [local, domain] = email.split('@');
  if (!domain) return '***';
  const maskedLocal = local.length > 2 ? local.substring(0, 2) + '***' : '***';
  return `${maskedLocal}@${domain}`;
}

interface NotificationPayload {
  type: 'booking' | 'testimonial' | 'gift_card' | 'contact';
  data: Record<string, unknown>;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const clientIP = req.headers.get('x-forwarded-for') || 'unknown';
    
    if (!checkRateLimit(clientIP)) {
      console.warn(`Rate limit exceeded for admin notification from: ${clientIP.substring(0, 8)}***`);
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const payload: NotificationPayload = await req.json();

    let subject = '';
    let logMessage = '';

    switch (payload.type) {
      case 'booking':
        subject = 'Neue Buchungsanfrage';
        logMessage = `Neue Buchung: ${payload.data.booking_number || 'N/A'}`;
        break;
      case 'testimonial':
        subject = 'Neue Bewertung eingegangen';
        logMessage = `Neue Bewertung - Rating: ${payload.data.rating || 'N/A'}/5`;
        break;
      case 'gift_card':
        subject = 'Gutschein-Kauf';
        logMessage = `Gutschein erstellt: Wert ${payload.data.value || 'N/A'} CHF`;
        break;
      case 'contact':
        subject = 'Neue Kontaktanfrage';
        const email = payload.data.email as string;
        logMessage = `Kontaktanfrage von: ${email ? maskEmail(email) : '[MASKED]'}`;
        break;
      default:
        subject = 'Neue Benachrichtigung';
        logMessage = `Typ: ${payload.type}`;
    }

    // Log with masked PII only
    console.log('=== Admin Notification ===');
    console.log(`Type: ${payload.type}`);
    console.log(`Subject: ${subject}`);
    console.log(`Info: ${logMessage}`);
    console.log('==========================');

    // TODO: Integrate with email service for actual notifications

    return new Response(
      JSON.stringify({ success: true, subject, message: `Notification for ${payload.type} processed` }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Admin notification error:', error instanceof Error ? error.message : 'Unknown error');
    return new Response(
      JSON.stringify({ error: 'Failed to process notification' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
