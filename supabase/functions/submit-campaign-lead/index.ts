import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const hash = async (value: string) => {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  try {
    const body = await req.json().catch(() => null);
    if (!body) return json({ error: "Ungültige Anfrage." }, 400);

    // Honeypot – Bots füllen dieses Feld
    if (typeof body.company === "string" && body.company.trim() !== "") {
      return json({ success: true });
    }

    const firstName = String(body.firstName ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const postalCode = String(body.postalCode ?? "").trim();
    const preferredDate = String(body.preferredDate ?? "").trim();
    const preferredTimeslot = String(body.preferredTimeslot ?? "").trim();
    const contactChannel = String(body.contactChannel ?? "").trim();
    const ageConfirmed = body.ageConfirmed === true;
    const privacyAccepted = body.privacyAccepted === true;
    const utm = typeof body.utm === "object" && body.utm !== null ? body.utm : {};

    const errors: Record<string, string> = {};
    if (firstName.length < 2 || firstName.length > 60) errors.firstName = "Bitte gib deinen Vornamen an.";
    if (!/^[+0-9][0-9 /().-]{6,24}$/.test(phone)) errors.phone = "Bitte gib eine gültige Mobilnummer an.";
    if (!/^\d{4}$/.test(postalCode)) errors.postalCode = "Bitte gib eine vierstellige Postleitzahl an.";
    if (preferredDate && !/^\d{4}-\d{2}-\d{2}$/.test(preferredDate)) errors.preferredDate = "Ungültiges Datum.";
    if (preferredTimeslot.length > 60) errors.preferredTimeslot = "Ungültiges Zeitfenster.";
    if (!["phone", "whatsapp"].includes(contactChannel)) errors.contactChannel = "Bitte wähle einen Kontaktweg.";
    if (!ageConfirmed) errors.ageConfirmed = "Bitte bestätige, dass du mindestens 18 Jahre alt bist.";
    if (!privacyAccepted) errors.privacyAccepted = "Bitte bestätige die Datenschutzerklärung.";

    if (Object.keys(errors).length > 0) {
      return json({ error: "Bitte prüfe deine Angaben.", fieldErrors: errors }, 400);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("cf-connecting-ip") ||
      "unknown";
    const ipHash = await hash(ip + "|gh-lp-salt");

    // Rate limiting: max. 3 Anfragen pro IP in 15 Minuten
    const since = new Date(Date.now() - 15 * 60 * 1000).toISOString();
    const { count } = await supabase
      .from("campaign_leads")
      .select("id", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("created_at", since);

    if ((count ?? 0) >= 3) {
      return json({ error: "Zu viele Anfragen. Bitte versuche es später erneut." }, 429);
    }

    const safeUtm: Record<string, string> = {};
    for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
      const v = (utm as Record<string, unknown>)[key];
      if (typeof v === "string") safeUtm[key] = v.slice(0, 100);
    }

    const { error } = await supabase.from("campaign_leads").insert({
      campaign: String(body.campaign ?? "lp-mobile-wellnessmassage-zuerich").slice(0, 80),
      first_name: firstName,
      phone,
      postal_code: postalCode,
      preferred_date: preferredDate || null,
      preferred_timeslot: preferredTimeslot || null,
      contact_channel: contactChannel,
      age_confirmed: ageConfirmed,
      privacy_accepted: privacyAccepted,
      utm: safeUtm,
      ip_hash: ipHash,
    });

    if (error) {
      // Keine personenbezogenen Daten loggen
      console.error("campaign_leads insert failed:", error.message);
      return json({ error: "Anfrage konnte nicht gespeichert werden." }, 500);
    }

    return json({ success: true });
  } catch (e) {
    console.error("submit-campaign-lead error:", (e as Error).message);
    return json({ error: "Unerwarteter Fehler." }, 500);
  }
});
