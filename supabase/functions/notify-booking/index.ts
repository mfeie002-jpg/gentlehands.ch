import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const booking: BookingNotification = await req.json();

    console.log("=== NEUE BUCHUNG EINGEGANGEN ===");
    console.log(`Buchungsnummer: ${booking.booking_number}`);
    console.log(`Kunde: ${booking.customer_name}`);
    console.log(`E-Mail: ${booking.customer_email}`);
    console.log(`Telefon: ${booking.customer_phone || "Nicht angegeben"}`);
    console.log(`Masseur:in: ${booking.masseur || "Noch nicht gewählt"}`);
    console.log(`Thema: ${booking.theme || "Nicht gewählt"}`);
    console.log(`Massage: ${booking.massage_type || "Nicht gewählt"}`);
    console.log(`Dauer: ${booking.duration ? `${booking.duration} Min.` : "Nicht angegeben"}`);
    console.log(`Datum: ${booking.appointment_date || "Nicht angegeben"}`);
    console.log(`Uhrzeit: ${booking.appointment_time || "Nicht angegeben"}`);
    if (booking.special_notes) {
      console.log(`Hinweise: ${booking.special_notes}`);
    }
    console.log("================================");

    // Here you could add email sending via Resend, SendGrid, etc.
    // For now, the booking is logged and stored in the database

    return new Response(
      JSON.stringify({
        success: true,
        message: "Buchungsbenachrichtigung verarbeitet",
        booking_number: booking.booking_number,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error processing booking notification:", error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
