import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WaitlistNotification {
  waitlistId: string;
  customerEmail: string;
  customerName: string;
  preferredDate: string;
  preferredTime?: string;
  therapistName?: string;
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

    // Get all waitlist entries that need notification
    const { data: waitlistEntries, error: fetchError } = await supabase
      .from("booking_waitlist")
      .select(`
        id,
        customer_email,
        customer_name,
        preferred_date,
        preferred_time,
        preferred_therapist_id
      `)
      .eq("status", "notified")
      .is("notification_sent_at", null);

    if (fetchError) {
      console.error("Error fetching waitlist entries:", fetchError);
      throw fetchError;
    }

    console.log(`Found ${waitlistEntries?.length || 0} waitlist entries to notify`);

    const notifications: WaitlistNotification[] = [];

    for (const entry of waitlistEntries || []) {
      // Get therapist name if ID exists
      let therapistName = "Verfügbare:r Therapeut:in";
      if (entry.preferred_therapist_id) {
        const { data: therapist } = await supabase
          .from("therapists")
          .select("name")
          .eq("id", entry.preferred_therapist_id)
          .single();
        
        if (therapist?.name) {
          therapistName = therapist.name;
        }
      }
      
      notifications.push({
        waitlistId: entry.id,
        customerEmail: entry.customer_email,
        customerName: entry.customer_name,
        preferredDate: entry.preferred_date,
        preferredTime: entry.preferred_time,
        therapistName,
      });

      // Log the notification (in production, send via email service)
      console.log(`📧 Notification queued for ${entry.customer_name} (${entry.customer_email})`);
      console.log(`   Slot available: ${entry.preferred_date} ${entry.preferred_time || 'flexible'}`);
      console.log(`   Therapist: ${therapistName}`);

      // Update the entry to mark notification as processed
      await supabase
        .from("booking_waitlist")
        .update({ 
          notification_sent_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq("id", entry.id);
    }

    return new Response(
      JSON.stringify({
        success: true,
        notified: notifications.length,
        entries: notifications,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in notify-waitlist function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
