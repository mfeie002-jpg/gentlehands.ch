import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { token } = await req.json();

    if (!token) {
      return new Response(
        JSON.stringify({ success: false, error: "Kein Verifizierungstoken angegeben" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Verifying booking with token: ${token.substring(0, 8)}...`);

    // Find booking by verification token
    const { data: booking, error: fetchError } = await supabase
      .from("bookings")
      .select("id, booking_number, customer_name, customer_email, is_verified, verification_sent_at, created_at")
      .eq("verification_token", token)
      .single();

    if (fetchError || !booking) {
      console.error("Booking not found for token:", fetchError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Ungültiger oder abgelaufener Verifizierungslink" 
        }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if already verified
    if (booking.is_verified) {
      console.log(`Booking ${booking.booking_number} already verified`);
      return new Response(
        JSON.stringify({ 
          success: true, 
          already_verified: true,
          booking_number: booking.booking_number,
          customer_name: booking.customer_name
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if verification link is expired (24 hours)
    const verificationSentAt = new Date(booking.verification_sent_at || booking.created_at);
    const now = new Date();
    const hoursDiff = (now.getTime() - verificationSentAt.getTime()) / (1000 * 60 * 60);

    if (hoursDiff > 24) {
      console.warn(`Verification link expired for booking ${booking.booking_number}`);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Der Verifizierungslink ist abgelaufen. Bitte kontaktieren Sie uns.",
          expired: true
        }),
        { status: 410, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Verify the booking
    const { error: updateError } = await supabase
      .from("bookings")
      .update({ 
        is_verified: true,
        status: "pending" // Move from unverified to pending confirmation
      })
      .eq("id", booking.id);

    if (updateError) {
      console.error("Failed to verify booking:", updateError);
      return new Response(
        JSON.stringify({ success: false, error: "Verifizierung fehlgeschlagen" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Booking ${booking.booking_number} verified successfully`);

    // Trigger admin notification (the booking is now confirmed)
    try {
      await supabase.functions.invoke("notify-admin", {
        body: {
          booking_number: booking.booking_number,
          customer_name: booking.customer_name,
          customer_email: booking.customer_email,
          event: "booking_verified"
        }
      });
    } catch (notifyError) {
      console.warn("Failed to notify admin:", notifyError);
      // Don't fail the verification if admin notification fails
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        booking_number: booking.booking_number,
        customer_name: booking.customer_name
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Verification error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
