import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface VerificationRequest {
  booking_id: string;
  customer_email: string;
  customer_name: string;
  booking_number: string;
  verification_token: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { booking_id, customer_email, customer_name, booking_number, verification_token }: VerificationRequest = await req.json();

    console.log("=== Sending Booking Verification Email ===");
    console.log(`Booking: ${booking_number}`);
    console.log(`Customer: ${customer_name}`);
    console.log(`Email: ${customer_email.replace(/(.{2})(.*)(@.*)/, "$1***$3")}`); // Masked email

    // Build verification URL
    const siteUrl = Deno.env.get("SITE_URL") || "https://hrindypsfxbiijxgtdmi.lovableproject.com";
    const verificationUrl = `${siteUrl}/buchung/verifizieren?token=${verification_token}`;

    console.log(`Verification URL: ${verificationUrl}`);

    // Log email content for development (Resend integration can be added later)
    {
      // Log email content for development (no API key configured)
      console.log("=== VERIFICATION EMAIL ===");
      console.log(`To: ${customer_email}`);
      console.log(`Subject: Bitte bestätigen Sie Ihre Buchung bei GentleHands`);
      console.log(`Verification Link: ${verificationUrl}`);
      console.log("=== END EMAIL ===");
    }

    // Update booking with verification sent timestamp
    const { error: updateError } = await supabase
      .from("bookings")
      .update({ verification_sent_at: new Date().toISOString() })
      .eq("id", booking_id);

    if (updateError) {
      console.error("Failed to update verification_sent_at:", updateError);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Verification email processed",
        verification_url: verificationUrl // Include for testing
      }),
      { 
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error: any) {
    console.error("Error sending verification email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
