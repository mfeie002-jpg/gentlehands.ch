import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NotificationPayload {
  type: 'booking' | 'testimonial' | 'gift_card';
  data: Record<string, unknown>;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload: NotificationPayload = await req.json();
    
    // Log the notification (in production, you'd send actual emails)
    console.log(`New ${payload.type} notification:`, payload.data);

    let subject = '';
    let message = '';

    switch (payload.type) {
      case 'booking':
        subject = `Neue Buchung: ${payload.data.booking_number}`;
        message = `
          Neue Buchung eingegangen!
          
          Buchungsnummer: ${payload.data.booking_number}
          Kunde: ${payload.data.customer_name}
          E-Mail: ${payload.data.customer_email}
          Massage: ${payload.data.massage}
          Termin: ${payload.data.appointment_date} um ${payload.data.appointment_time}
          Therapeut: ${payload.data.masseur}
          Thema: ${payload.data.theme}
        `;
        break;
      
      case 'testimonial':
        subject = `Neues Testimonial von ${payload.data.name}`;
        message = `
          Neues Testimonial eingereicht!
          
          Name: ${payload.data.name}
          Bewertung: ${payload.data.rating}/5 Sterne
          Inhalt: ${payload.data.content}
          
          Bitte im Admin-Dashboard überprüfen und genehmigen.
        `;
        break;
      
      case 'gift_card':
        subject = `Neuer Gutschein erstellt: ${payload.data.code}`;
        message = `
          Neuer Gutschein erstellt!
          
          Code: ${payload.data.code}
          Wert: CHF ${payload.data.value}
          Empfänger: ${payload.data.recipient_name || 'Nicht angegeben'}
        `;
        break;
    }

    // Here you would integrate with your email service (Resend, SendGrid, etc.)
    // For now, we'll just log and return success
    console.log('Email Subject:', subject);
    console.log('Email Message:', message);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Notification for ${payload.type} processed`,
        subject,
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200 
      }
    );
  } catch (error: unknown) {
    console.error("Error processing notification:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500 
      }
    );
  }
});
