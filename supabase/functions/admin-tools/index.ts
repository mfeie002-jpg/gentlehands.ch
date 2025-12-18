import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type Action = "link_therapist" | "grant_admin" | "link_therapist_admin";

interface RequestBody {
  action: Action;
  target_email?: string;
  therapist_email?: string;
}

async function getAuthedUser(req: Request, supabaseUrl: string, anonKey: string) {
  const authHeader = req.headers.get("Authorization") ?? "";
  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authHeader } },
  });

  const { data, error } = await userClient.auth.getUser();
  if (error || !data?.user) return { user: null, error: error ?? new Error("Unauthorized") };
  return { user: data.user, error: null };
}

async function isAdmin(adminClient: any, userId: string): Promise<boolean> {
  const { data, error } = await adminClient.rpc("has_role", {
    _user_id: userId,
    _role: "admin",
  });
  return !error && data === true;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    const body: RequestBody = await req.json();
    const action = body?.action;

    if (!action) {
      return new Response(
        JSON.stringify({ error: "Missing action" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const { user, error: authError } = await getAuthedUser(req, supabaseUrl, anonKey);
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const adminClient = createClient(supabaseUrl, serviceRoleKey);

    // Self-linking for therapists
    if (action === "link_therapist") {
      if (!user.email) {
        return new Response(
          JSON.stringify({ error: "User has no email" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }

      const email = user.email.toLowerCase();
      console.log(`Link therapist profile request for: ${email}`);

      const { data: therapist, error: therapistError } = await adminClient
        .from("therapists")
        .select("id, user_id, email")
        .ilike("email", email)
        .maybeSingle();

      if (therapistError) {
        console.error("Failed to fetch therapist:", therapistError);
        return new Response(
          JSON.stringify({ error: "Failed to fetch therapist" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }

      if (!therapist) {
        return new Response(
          JSON.stringify({ linked: false, reason: "no_therapist_profile" }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }

      if (therapist.user_id === user.id) {
        return new Response(
          JSON.stringify({ linked: false, alreadyLinked: true, therapist_id: therapist.id }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }

      if (therapist.user_id && therapist.user_id !== user.id) {
        return new Response(
          JSON.stringify({ linked: false, reason: "profile_already_claimed" }),
          { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }

      const { error: updateError } = await adminClient
        .from("therapists")
        .update({ user_id: user.id })
        .eq("id", therapist.id);

      if (updateError) {
        console.error("Failed to link therapist profile:", updateError);
        return new Response(
          JSON.stringify({ error: "Failed to link profile" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }

      console.log(`Linked therapist ${therapist.id} -> user ${user.id}`);
      return new Response(
        JSON.stringify({ linked: true, therapist_id: therapist.id }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Admin-initiated therapist linking
    if (action === "link_therapist_admin") {
      if (!await isAdmin(adminClient, user.id)) {
        return new Response(
          JSON.stringify({ error: "Forbidden" }),
          { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }

      const therapistEmail = (body.therapist_email ?? "").trim().toLowerCase();
      if (!therapistEmail) {
        return new Response(
          JSON.stringify({ error: "Missing therapist_email" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }

      console.log(`Admin ${user.email} linking therapist: ${therapistEmail}`);

      // Find therapist profile
      const { data: therapist, error: therapistError } = await adminClient
        .from("therapists")
        .select("id, user_id, email, name")
        .ilike("email", therapistEmail)
        .maybeSingle();

      if (therapistError) {
        return new Response(
          JSON.stringify({ error: "Failed to fetch therapist" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }

      if (!therapist) {
        return new Response(
          JSON.stringify({ error: "Kein Therapeut:in-Profil mit dieser E-Mail gefunden" }),
          { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }

      // Find user by email
      let foundUserId: string | null = null;
      for (let page = 1; page <= 10; page++) {
        const { data, error } = await adminClient.auth.admin.listUsers({ page, perPage: 200 });
        if (error) break;
        const match = data.users.find((u) => (u.email ?? "").toLowerCase() === therapistEmail);
        if (match?.id) {
          foundUserId = match.id;
          break;
        }
        if (data.users.length < 200) break;
      }

      if (!foundUserId) {
        return new Response(
          JSON.stringify({ error: "Kein registrierter Benutzer mit dieser E-Mail gefunden" }),
          { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }

      // Link
      const { error: updateError } = await adminClient
        .from("therapists")
        .update({ user_id: foundUserId })
        .eq("id", therapist.id);

      if (updateError) {
        return new Response(
          JSON.stringify({ error: "Failed to link profile" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }

      console.log(`Admin linked therapist ${therapist.id} -> user ${foundUserId}`);
      return new Response(
        JSON.stringify({ success: true, therapist_id: therapist.id, therapist_name: therapist.name }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Grant admin role
    if (action === "grant_admin") {
      const targetEmail = (body.target_email ?? "").trim().toLowerCase();
      if (!targetEmail) {
        return new Response(
          JSON.stringify({ error: "Missing target_email" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }

      if (!await isAdmin(adminClient, user.id)) {
        return new Response(
          JSON.stringify({ error: "Forbidden - Sie sind kein Admin" }),
          { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }

      console.log(`Grant admin requested by ${user.email} for ${targetEmail}`);

      // Find user by email
      let foundUserId: string | null = null;
      for (let page = 1; page <= 10; page++) {
        const { data, error } = await adminClient.auth.admin.listUsers({ page, perPage: 200 });
        if (error) {
          console.error("Error listing users:", error);
          break;
        }
        const match = data.users.find((u) => (u.email ?? "").toLowerCase() === targetEmail);
        if (match?.id) {
          foundUserId = match.id;
          break;
        }
        if (data.users.length < 200) break;
      }

      if (!foundUserId) {
        return new Response(
          JSON.stringify({ error: `Benutzer mit E-Mail "${targetEmail}" nicht gefunden. Bitte registrieren Sie sich zuerst.` }),
          { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }

      console.log(`Found user ${foundUserId} for email ${targetEmail}`);

      // Check if user already has admin role
      const { data: existingRole } = await adminClient
        .from("user_roles")
        .select("id, role")
        .eq("user_id", foundUserId)
        .maybeSingle();

      if (existingRole?.role === "admin") {
        return new Response(
          JSON.stringify({ success: true, user_id: foundUserId, role: "admin", message: "Benutzer ist bereits Admin" }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }

      // Update or insert role
      if (existingRole) {
        const { error: updateError } = await adminClient
          .from("user_roles")
          .update({ role: "admin" })
          .eq("user_id", foundUserId);

        if (updateError) {
          console.error("Error updating role:", updateError);
          return new Response(
            JSON.stringify({ error: `Fehler beim Aktualisieren der Rolle: ${updateError.message}` }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
          );
        }
      } else {
        const { error: insertError } = await adminClient
          .from("user_roles")
          .insert({ user_id: foundUserId, role: "admin" });

        if (insertError) {
          console.error("Error inserting role:", insertError);
          return new Response(
            JSON.stringify({ error: `Fehler beim Erstellen der Rolle: ${insertError.message}` }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
          );
        }
      }

      console.log(`Successfully granted admin role to ${foundUserId}`);
      return new Response(
        JSON.stringify({ success: true, user_id: foundUserId, role: "admin" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({ error: "Unsupported action" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("admin-tools error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});