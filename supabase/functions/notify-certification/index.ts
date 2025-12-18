import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CertificationNotificationRequest {
  therapistEmail: string;
  therapistName: string;
  massageTypeName: string;
  quizScore: number;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { therapistEmail, therapistName, massageTypeName, quizScore }: CertificationNotificationRequest = await req.json();

    // Validate required fields
    if (!therapistEmail || !therapistName || !massageTypeName) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Log the notification (placeholder for actual email sending)
    console.log("=== CERTIFICATION NOTIFICATION ===");
    console.log(`Therapist: ${therapistName} (${therapistEmail})`);
    console.log(`Massage Type: ${massageTypeName}`);
    console.log(`Quiz Score: ${quizScore}%`);
    console.log("==================================");

    // Email content that would be sent
    const emailContent = {
      to: therapistEmail,
      subject: `🎉 Zertifizierung abgeschlossen: ${massageTypeName}`,
      html: `
        <div style="font-family: 'DM Sans', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="font-family: 'Playfair Display', serif; color: #1a1a1a; margin-bottom: 10px;">
              Herzlichen Glückwunsch, ${therapistName}!
            </h1>
          </div>
          
          <div style="background: linear-gradient(135deg, #f8f7f4 0%, #fff 100%); border-radius: 16px; padding: 30px; margin-bottom: 30px;">
            <h2 style="color: #1a1a1a; margin-bottom: 15px;">Zertifizierung erfolgreich</h2>
            <p style="color: #666; line-height: 1.6;">
              Sie haben die Schulung für <strong>${massageTypeName}</strong> erfolgreich abgeschlossen 
              und sind nun zertifiziert, diese Massage bei GentleHands anzubieten.
            </p>
            <div style="background: #e8f5e9; border-radius: 8px; padding: 15px; margin-top: 20px;">
              <p style="margin: 0; color: #2e7d32; font-weight: 600;">
                ✓ Quiz-Ergebnis: ${quizScore}%
              </p>
            </div>
          </div>
          
          <div style="text-align: center;">
            <a href="https://gentlehands.ch/therapeut/dashboard" 
               style="display: inline-block; background: #1a1a1a; color: #fff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 500;">
              Zum Dashboard
            </a>
          </div>
          
          <p style="color: #999; font-size: 12px; text-align: center; margin-top: 40px;">
            GentleHands – Premium Wellness für Frauen
          </p>
        </div>
      `
    };

    console.log("Email content prepared:", JSON.stringify(emailContent, null, 2));

    // TODO: When RESEND_API_KEY is configured, send actual email:
    // const resendApiKey = Deno.env.get("RESEND_API_KEY");
    // if (resendApiKey) {
    //   const res = await fetch("https://api.resend.com/emails", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${resendApiKey}`,
    //     },
    //     body: JSON.stringify({
    //       from: "GentleHands <noreply@gentlehands.ch>",
    //       ...emailContent
    //     }),
    //   });
    // }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Certification notification logged (email sending disabled - configure RESEND_API_KEY to enable)" 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: unknown) {
    console.error("Error in notify-certification:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
