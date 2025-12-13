import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limiting storage (in-memory for edge function)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // requests per minute
const RATE_WINDOW = 60000; // 1 minute in ms

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
  const [local, domain] = email.split('@');
  if (!domain) return '***';
  const maskedLocal = local.length > 2 ? local.substring(0, 2) + '***' : '***';
  return `${maskedLocal}@${domain}`;
}

function maskPhone(phone: string): string {
  if (!phone || phone.length < 6) return '***';
  return phone.substring(0, 3) + '***' + phone.substring(phone.length - 2);
}

interface BookingNotification {
  booking_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  masseur?: string;
  theme?: string;
  massage_type?: string;
  duration?: number;
  appointment_date?: string;
  appointment_time?: string;
  special_notes?: string;
  honeypot?: string; // For server-side honeypot validation
}

// Additional spam detection patterns
function detectSpamPatterns(booking: BookingNotification): boolean {
  // Check for honeypot
  if (booking.honeypot && booking.honeypot.trim() !== '') {
    console.warn('Server-side honeypot triggered');
    return true;
  }
  
  // Check for suspicious email patterns
  const suspiciousEmailPatterns = [
    /test@test\.com$/i,
    /admin@admin\.com$/i,
    /^[a-z]{20,}@/i, // Very long random local part
  ];
  
  if (suspiciousEmailPatterns.some(p => p.test(booking.customer_email))) {
    console.warn('Suspicious email pattern detected');
    return true;
  }
  
  // Check for gibberish names (all consonants or very short)
  const name = booking.customer_name?.trim() || '';
  if (name.length < 2 || !/[aeiouäöü]/i.test(name)) {
    console.warn('Suspicious name pattern detected');
    return true;
  }
  
  return false;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Extract client IP for rate limiting
    const clientIP = req.headers.get('x-forwarded-for') || 'unknown';
    
    if (!checkRateLimit(clientIP)) {
      console.warn(`Rate limit exceeded for booking notification from: ${clientIP.substring(0, 8)}***`);
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const booking: BookingNotification = await req.json();

    // Server-side spam detection
    if (detectSpamPatterns(booking)) {
      console.warn(`Spam detected for booking: ${booking.booking_number}`);
      // Return success to avoid revealing detection to bots
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Buchungsbenachrichtigung verarbeitet',
          booking_number: booking.booking_number
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Log with masked PII for debugging (GDPR compliant)
    console.log('=== Neue Buchungsanfrage erhalten ===');
    console.log(`Buchungsnummer: ${booking.booking_number}`);
    console.log(`Kunde: [MASKED]`);
    console.log(`E-Mail: ${maskEmail(booking.customer_email)}`);
    console.log(`Telefon: ${maskPhone(booking.customer_phone || '')}`);
    console.log(`Massage: ${booking.massage_type || 'N/A'}`);
    console.log(`Thema: ${booking.theme || 'N/A'}`);
    console.log(`Therapeut:in: ${booking.masseur || 'N/A'}`);
    console.log(`Dauer: ${booking.duration ? `${booking.duration} Min.` : 'N/A'}`);
    console.log(`Termin: ${booking.appointment_date || 'N/A'} um ${booking.appointment_time || 'N/A'}`);
    console.log(`Notizen: ${booking.special_notes ? '[vorhanden]' : '[keine]'}`);
    console.log('=====================================');

    // TODO: Integrate with Resend API for actual email sending
    // The booking data is stored in database, this function only processes notifications

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Buchungsbenachrichtigung verarbeitet',
        booking_number: booking.booking_number
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing booking notification:', error instanceof Error ? error.message : 'Unknown error');
    return new Response(
      JSON.stringify({ error: 'Failed to process booking notification' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
