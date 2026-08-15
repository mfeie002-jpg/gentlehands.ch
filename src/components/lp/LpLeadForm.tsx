import { useRef, useState } from "react";
import { z } from "zod";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { campaignConfig } from "@/config/campaign";
import { getUtmParams, trackLpEvent } from "@/lib/lpTracking";

const leadSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, { message: "Bitte gib deinen Vornamen an (mind. 2 Zeichen)." })
    .max(60, { message: "Vorname ist zu lang." }),
  phone: z
    .string()
    .trim()
    .regex(/^[+0-9][0-9 /().-]{6,24}$/, { message: "Bitte gib eine gültige Mobilnummer an." }),
  postalCode: z
    .string()
    .trim()
    .regex(/^\d{4}$/, { message: "Bitte gib eine vierstellige Postleitzahl an." }),
  preferredDate: z.string().trim().min(1, { message: "Bitte wähle einen gewünschten Tag." }),
  preferredTimeslot: z.string().trim().min(1, { message: "Bitte wähle ein Zeitfenster." }),
  contactChannel: z.enum(["phone", "whatsapp"], { message: "Bitte wähle einen Kontaktweg." }),
  ageConfirmed: z.literal(true, { message: "Bitte bestätige, dass du mindestens 18 Jahre alt bist." }),
  privacyAccepted: z.literal(true, { message: "Bitte bestätige die Datenschutzerklärung." }),
});

type FieldErrors = Partial<Record<string, string>>;

const inputClass =
  "min-h-[44px] w-full rounded-xl border border-copper/25 bg-background px-4 py-3 text-base text-foreground outline-none focus-visible:ring-2 focus-visible:ring-copper";
const labelClass = "mb-1.5 block text-sm font-medium text-foreground";

export const LpLeadForm = () => {
  const [values, setValues] = useState({
    firstName: "",
    phone: "",
    postalCode: "",
    preferredDate: "",
    preferredTimeslot: "",
    contactChannel: "phone" as "phone" | "whatsapp",
    ageConfirmed: false,
    privacyAccepted: false,
    company: "", // Honeypot
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const startedRef = useRef(false);
  const lastSubmitRef = useRef(0);

  const timeSlots = campaignConfig.availableTimeSlots;

  const onFieldFocus = () => {
    if (!startedRef.current) {
      startedRef.current = true;
      trackLpEvent("lead_form_start");
    }
  };

  const set = (key: keyof typeof values, value: string | boolean) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const parsed = leadSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: FieldErrors = {};
      parsed.error.issues.forEach((issue) => {
        const key = String(issue.path[0]);
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      setStatus("idle");
      return;
    }

    // Client-seitiges Throttling
    const now = Date.now();
    if (now - lastSubmitRef.current < 5000) {
      setFormError("Bitte warte einen Moment, bevor du die Anfrage erneut sendest.");
      return;
    }
    lastSubmitRef.current = now;

    setStatus("loading");
    trackLpEvent("lead_form_submit");

    try {
      const { data, error } = await supabase.functions.invoke("submit-campaign-lead", {
        body: {
          ...parsed.data,
          company: values.company,
          campaign: "lp-mobile-wellnessmassage-zuerich",
          utm: getUtmParams(),
        },
      });

      if (error || (data && (data as any).error)) {
        const fieldErrors = (data as any)?.fieldErrors as FieldErrors | undefined;
        if (fieldErrors) setErrors(fieldErrors);
        setFormError(
          ((data as any)?.error as string) ||
            "Die Anfrage konnte nicht gesendet werden. Bitte versuche es später erneut.",
        );
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setFormError("Die Anfrage konnte nicht gesendet werden. Bitte versuche es später erneut.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-forest/30 bg-forest/5 p-6 text-center"
      >
        <CheckCircle2 className="mx-auto text-forest" size={32} aria-hidden="true" />
        <h3 className="mt-3 font-display text-xl text-foreground">Anfrage gesendet</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Danke für deine Anfrage. {String(campaignConfig.providerFirstName)} prüft das gewünschte Zeitfenster und
          meldet sich persönlich bei dir. Der Termin ist erst nach der Bestätigung verbindlich.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label className={labelClass} htmlFor="lp-firstName">
          Vorname
        </label>
        <input
          id="lp-firstName"
          name="firstName"
          className={inputClass}
          autoComplete="given-name"
          value={values.firstName}
          onFocus={onFieldFocus}
          onChange={(e) => set("firstName", e.target.value)}
          aria-invalid={!!errors.firstName}
          aria-describedby={errors.firstName ? "err-firstName" : undefined}
        />
        {errors.firstName && (
          <p id="err-firstName" className="mt-1 text-sm text-destructive">
            {errors.firstName}
          </p>
        )}
      </div>

      <div>
        <label className={labelClass} htmlFor="lp-phone">
          Mobilnummer
        </label>
        <input
          id="lp-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          className={inputClass}
          autoComplete="tel"
          placeholder="+41 …"
          value={values.phone}
          onFocus={onFieldFocus}
          onChange={(e) => set("phone", e.target.value)}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "err-phone" : undefined}
        />
        {errors.phone && (
          <p id="err-phone" className="mt-1 text-sm text-destructive">
            {errors.phone}
          </p>
        )}
      </div>

      <div>
        <label className={labelClass} htmlFor="lp-plz">
          Postleitzahl
        </label>
        <input
          id="lp-plz"
          name="postalCode"
          inputMode="numeric"
          maxLength={4}
          className={inputClass}
          autoComplete="postal-code"
          value={values.postalCode}
          onFocus={onFieldFocus}
          onChange={(e) => set("postalCode", e.target.value)}
          aria-invalid={!!errors.postalCode}
          aria-describedby={errors.postalCode ? "err-plz" : undefined}
        />
        {errors.postalCode && (
          <p id="err-plz" className="mt-1 text-sm text-destructive">
            {errors.postalCode}
          </p>
        )}
      </div>

      <div>
        <label className={labelClass} htmlFor="lp-date">
          Gewünschter Tag
        </label>
        <input
          id="lp-date"
          name="preferredDate"
          type="date"
          min={new Date().toISOString().slice(0, 10)}
          className={inputClass}
          value={values.preferredDate}
          onFocus={onFieldFocus}
          onChange={(e) => set("preferredDate", e.target.value)}
          aria-invalid={!!errors.preferredDate}
          aria-describedby={errors.preferredDate ? "err-date" : undefined}
        />
        {errors.preferredDate && (
          <p id="err-date" className="mt-1 text-sm text-destructive">
            {errors.preferredDate}
          </p>
        )}
      </div>

      <div>
        <label className={labelClass} htmlFor="lp-slot">
          Bevorzugtes Zeitfenster
        </label>
        {timeSlots.length > 0 ? (
          <select
            id="lp-slot"
            name="preferredTimeslot"
            className={inputClass}
            value={values.preferredTimeslot}
            onFocus={onFieldFocus}
            onChange={(e) => set("preferredTimeslot", e.target.value)}
            aria-invalid={!!errors.preferredTimeslot}
            aria-describedby={errors.preferredTimeslot ? "err-slot" : undefined}
          >
            <option value="">Bitte wählen</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        ) : (
          <p className="rounded-xl border border-copper/25 bg-sand/30 p-3 text-sm text-muted-foreground">
            TODO_REQUIRED: Es sind noch keine freigegebenen Zeitfenster hinterlegt. Trage sie in der Campaign-Config
            unter <code>availableTimeSlots</code> ein.
          </p>
        )}
        {errors.preferredTimeslot && (
          <p id="err-slot" className="mt-1 text-sm text-destructive">
            {errors.preferredTimeslot}
          </p>
        )}
      </div>

      <fieldset>
        <legend className={labelClass}>Wie sollen wir dich kontaktieren?</legend>
        <div className="flex gap-3">
          {(["phone", "whatsapp"] as const).map((channel) => (
            <label
              key={channel}
              className={`flex min-h-[44px] flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 text-sm ${
                values.contactChannel === channel
                  ? "border-copper bg-copper/10 text-foreground"
                  : "border-copper/25 text-muted-foreground"
              }`}
            >
              <input
                type="radio"
                name="contactChannel"
                className="sr-only"
                checked={values.contactChannel === channel}
                onChange={() => set("contactChannel", channel)}
              />
              {channel === "phone" ? "Telefon" : "WhatsApp"}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="space-y-3">
        <label className="flex items-start gap-3 text-sm text-foreground">
          <input
            type="checkbox"
            className="mt-1 h-5 w-5 accent-copper"
            checked={values.ageConfirmed}
            onChange={(e) => set("ageConfirmed", e.target.checked)}
            aria-invalid={!!errors.ageConfirmed}
            aria-describedby={errors.ageConfirmed ? "err-age" : undefined}
          />
          <span>Ich bin mindestens 18 Jahre alt.</span>
        </label>
        {errors.ageConfirmed && (
          <p id="err-age" className="text-sm text-destructive">
            {errors.ageConfirmed}
          </p>
        )}

        <label className="flex items-start gap-3 text-sm text-foreground">
          <input
            type="checkbox"
            className="mt-1 h-5 w-5 accent-copper"
            checked={values.privacyAccepted}
            onChange={(e) => set("privacyAccepted", e.target.checked)}
            aria-invalid={!!errors.privacyAccepted}
            aria-describedby={errors.privacyAccepted ? "err-privacy" : undefined}
          />
          <span>
            Ich habe die{" "}
            <a className="text-copper underline underline-offset-4" href="/rechtliches#datenschutz">
              Datenschutzerklärung
            </a>{" "}
            gelesen und bin mit der Kontaktaufnahme einverstanden.
          </span>
        </label>
        {errors.privacyAccepted && (
          <p id="err-privacy" className="text-sm text-destructive">
            {errors.privacyAccepted}
          </p>
        )}
      </div>

      {/* Honeypot – für Menschen unsichtbar */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="lp-company">Firma</label>
        <input
          id="lp-company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(e) => set("company", e.target.value)}
        />
      </div>

      {formError && (
        <p role="alert" className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
          <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-copper px-6 text-base font-medium text-primary-foreground transition-colors hover:bg-copper-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-copper/40 disabled:opacity-60"
      >
        {status === "loading" && <Loader2 className="animate-spin" size={18} aria-hidden="true" />}
        {status === "loading" ? "Wird gesendet …" : "Anfrage senden"}
      </button>

      <p className="text-center text-xs text-muted-foreground">
        Deine Anfrage ist noch keine feste Buchung. Der Termin wird persönlich bestätigt.
      </p>
    </form>
  );
};
