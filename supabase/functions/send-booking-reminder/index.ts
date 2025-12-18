import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BookingReminder {
  id: string;
  booking_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  appointment_date: string;
  appointment_time: string;
  massage: string;
  theme: string;
  masseur: string;
  preferred_contact: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    // Get day after tomorrow for 48h reminders
    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
    const dayAfterTomorrowStr = dayAfterTomorrow.toISOString().split('T')[0];

    // Fetch bookings that need reminders (24h and 48h before)
    const { data: bookings24h, error: error24h } = await supabase
      .from('bookings')
      .select('*')
      .eq('appointment_date', tomorrowStr)
      .eq('status', 'confirmed')
      .is('reminder_sent_at', null);

    const { data: bookings48h, error: error48h } = await supabase
      .from('bookings')
      .select('*')
      .eq('appointment_date', dayAfterTomorrowStr)
      .eq('status', 'confirmed')
      .is('reminder_sent_at', null);

    if (error24h || error48h) {
      throw new Error(`Error fetching bookings: ${error24h?.message || error48h?.message}`);
    }

    const remindersSent: string[] = [];
    const errors: string[] = [];

    // Process 24h reminders
    for (const booking of (bookings24h || [])) {
      try {
        await sendReminder(booking, '24h');
        
        // Update reminder_sent_at
        await supabase
          .from('bookings')
          .update({ reminder_sent_at: new Date().toISOString() })
          .eq('id', booking.id);
        
        remindersSent.push(`24h: ${booking.booking_number}`);
        console.log(`✅ 24h reminder sent for booking ${booking.booking_number}`);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        errors.push(`24h ${booking.booking_number}: ${errorMessage}`);
        console.error(`❌ Failed to send 24h reminder for ${booking.booking_number}:`, err);
      }
    }

    // Process 48h reminders (first reminder)
    for (const booking of (bookings48h || [])) {
      try {
        await sendReminder(booking, '48h');
        console.log(`✅ 48h reminder sent for booking ${booking.booking_number}`);
        remindersSent.push(`48h: ${booking.booking_number}`);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        errors.push(`48h ${booking.booking_number}: ${errorMessage}`);
        console.error(`❌ Failed to send 48h reminder for ${booking.booking_number}:`, err);
      }
    }

    // Log activity
    await supabase.rpc('log_activity', {
      p_action: 'booking_reminders_processed',
      p_entity_type: 'system',
      p_details: {
        reminders_24h: bookings24h?.length || 0,
        reminders_48h: bookings48h?.length || 0,
        sent: remindersSent.length,
        errors: errors.length
      }
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: `Processed ${remindersSent.length} reminders`,
        details: {
          sent: remindersSent,
          errors: errors,
          bookings_24h: bookings24h?.length || 0,
          bookings_48h: bookings48h?.length || 0
        }
      }),
      { 
        status: 200, 
        headers: { "Content-Type": "application/json", ...corsHeaders } 
      }
    );
  } catch (error) {
    console.error("Error in send-booking-reminder:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { 
        status: 500, 
        headers: { "Content-Type": "application/json", ...corsHeaders } 
      }
    );
  }
});

async function sendReminder(booking: BookingReminder, type: '24h' | '48h') {
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  
  const appointmentDate = new Date(booking.appointment_date);
  const formattedDate = appointmentDate.toLocaleDateString('de-CH', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const emailSubject = type === '24h' 
    ? `Morgen ist es soweit! Ihre Massage bei GentleHands` 
    : `Erinnerung: Ihre Massage bei GentleHands in 2 Tagen`;

  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; padding: 30px 0; background: linear-gradient(135deg, #2A5A5A 0%, #1a3a3a 100%); border-radius: 12px 12px 0 0; }
        .header h1 { color: #fff; margin: 0; font-size: 28px; }
        .content { background: #fff; padding: 30px; border: 1px solid #eee; }
        .booking-details { background: #f9f7f4; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
        .detail-row:last-child { border-bottom: none; }
        .detail-label { color: #666; }
        .detail-value { font-weight: 600; color: #2A5A5A; }
        .cta-button { display: inline-block; background: #2A5A5A; color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 8px; margin: 20px 0; }
        .tips { background: #fff7ed; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .tips h3 { color: #c2410c; margin-top: 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>GentleHands</h1>
        </div>
        <div class="content">
          <h2>Liebe/r ${booking.customer_name},</h2>
          
          <p>${type === '24h' 
            ? 'morgen ist es soweit – Ihre Auszeit bei GentleHands steht bevor!' 
            : 'wir freuen uns, Sie in 2 Tagen bei uns begrüssen zu dürfen!'}</p>
          
          <div class="booking-details">
            <h3 style="margin-top: 0; color: #2A5A5A;">Ihre Buchungsdetails</h3>
            <div class="detail-row">
              <span class="detail-label">Buchungsnummer</span>
              <span class="detail-value">${booking.booking_number}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Datum</span>
              <span class="detail-value">${formattedDate}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Uhrzeit</span>
              <span class="detail-value">${booking.appointment_time} Uhr</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Massage</span>
              <span class="detail-value">${booking.massage}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Erlebnis</span>
              <span class="detail-value">${booking.theme}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Therapeut:in</span>
              <span class="detail-value">${booking.masseur}</span>
            </div>
          </div>
          
          <div class="tips">
            <h3>💆‍♀️ Tipps für Ihre Vorbereitung</h3>
            <ul>
              <li>Trinken Sie vorher ausreichend Wasser</li>
              <li>Planen Sie 10-15 Minuten vor dem Termin ein</li>
              <li>Tragen Sie bequeme Kleidung</li>
              <li>Vermeiden Sie schwere Mahlzeiten direkt vor der Massage</li>
            </ul>
          </div>
          
          <p style="text-align: center;">
            <a href="https://gentlehands.ch/vorbereitung" class="cta-button">Vorbereitungstipps ansehen</a>
          </p>
          
          <p>Bei Fragen oder falls Sie Ihren Termin ändern müssen, kontaktieren Sie uns bitte rechtzeitig.</p>
          
          <p>Wir freuen uns auf Sie!</p>
          <p>Herzliche Grüsse,<br>Ihr GentleHands Team</p>
        </div>
        <div class="footer">
          <p>GentleHands | Premium Wellness Massagen</p>
          <p>© ${new Date().getFullYear()} GentleHands. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // Send email via Resend if API key is configured
  if (resendApiKey) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "GentleHands <erinnerung@gentlehands.ch>",
        to: [booking.customer_email],
        subject: emailSubject,
        html: emailHtml,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Resend API error: ${errorData}`);
    }
  } else {
    // Log email details for development
    console.log(`📧 Email reminder (${type}) would be sent to:`, booking.customer_email);
    console.log(`📧 Subject: ${emailSubject}`);
  }

  // TODO: Implement SMS sending via Twilio if preferred_contact is 'phone' or 'both'
  if (booking.preferred_contact === 'phone' || booking.preferred_contact === 'both') {
    console.log(`📱 SMS reminder would be sent to: ${booking.customer_phone}`);
  }
}
