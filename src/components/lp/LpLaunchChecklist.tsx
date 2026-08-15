import { Check, X } from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdmin";
import { campaignConfig, missingRequiredFields, isSet, campaignIsLaunchReady } from "@/config/campaign";

const checklist = () => [
  { label: "Echtes Impressum vollständig", ok: isSet(campaignConfig.providerFullName) },
  { label: "Reale Telefon-/WhatsApp-Nummer hinterlegt", ok: isSet(campaignConfig.whatsappNumber) },
  {
    label: "Angebot und Einsatzgebiet bestätigt",
    ok: isSet(campaignConfig.serviceAreaText) && campaignConfig.servicePostcodes.length > 0,
  },
  { label: "Echtes Portrait oder Video mit Einwilligung vorhanden", ok: isSet(campaignConfig.media.portraitImage) },
  { label: "Qualifikationen überprüft (oder bewusst leer)", ok: true },
  { label: "Formularzustellung getestet", ok: false },
  { label: "Datenschutzerklärung nennt alle verwendeten Dienste", ok: false },
  { label: "Pixel-Consent getestet", ok: isSet(campaignConfig.metaPixelId) },
  { label: "Alle Platzhalter entfernt", ok: missingRequiredFields.length === 0 },
  { label: "Keine erfundenen Vertrauenselemente auf der Seite", ok: true },
];

/** Nur für eingeloggte Administratoren sichtbar. */
export const LpLaunchChecklist = () => {
  const { isAdmin } = useAdminAuth();
  if (!isAdmin) return null;

  const items = checklist();

  return (
    <section className="mx-auto my-10 max-w-2xl rounded-2xl border border-copper/30 bg-sand/30 p-5">
      <h2 className="font-display text-xl text-foreground">Launch-Checkliste (nur für Admins sichtbar)</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Status: {campaignIsLaunchReady ? "startbereit" : "NICHT startbereit – nur Preview"}
      </p>
      <ul className="mt-4 space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.label} className="flex items-start gap-2">
            {item.ok ? (
              <Check size={18} className="mt-0.5 shrink-0 text-forest" aria-hidden="true" />
            ) : (
              <X size={18} className="mt-0.5 shrink-0 text-destructive" aria-hidden="true" />
            )}
            <span className={item.ok ? "text-foreground" : "text-muted-foreground"}>{item.label}</span>
          </li>
        ))}
      </ul>
      {missingRequiredFields.length > 0 && (
        <div className="mt-4 rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm">
          <p className="font-medium text-foreground">Fehlende Pflichtwerte in der Campaign-Config:</p>
          <ul className="mt-1 list-inside list-disc text-muted-foreground">
            {missingRequiredFields.map((f) => (
              <li key={f.key}>
                {f.label} <code className="text-xs">({f.key})</code>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};
