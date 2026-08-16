import { useEffect, useState } from "react";
import { ShieldCheck, Check, X } from "lucide-react";
import {
  getMarketingConsent,
  setMarketingConsent,
  type MarketingConsent,
} from "@/lib/lpTracking";

/**
 * Inline-Einwilligung für Marketing-Cookies (Meta Pixel).
 * Bewusst KEIN Popup/Overlay: fest im Seitenfluss, jederzeit widerrufbar.
 * Ohne "granted" wird der Meta Pixel nicht geladen.
 */
export const LpMarketingConsent = () => {
  const [consent, setConsent] = useState<MarketingConsent>(null);

  useEffect(() => {
    setConsent(getMarketingConsent());
  }, []);

  const decide = (granted: boolean) => {
    setMarketingConsent(granted);
    setConsent(granted ? "granted" : "denied");
  };

  return (
    <section
      id="marketing-einwilligung"
      aria-labelledby="consent-heading"
      className="rounded-2xl border border-copper/20 bg-card/70 p-5"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-copper/20 bg-copper/10">
          <ShieldCheck size={18} className="text-copper" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h2 id="consent-heading" className="font-display text-lg text-foreground">
            Marketing-Cookies
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Für den Betrieb dieser Seite sind keine Marketing-Cookies nötig. Nur mit deiner
            ausdrücklichen Zustimmung laden wir den Meta-Pixel, um die Werbewirkung zu messen.
            Es werden keine Gesundheitsdaten und keine Formularinhalte übermittelt. Du kannst
            deine Entscheidung hier jederzeit ändern.
          </p>

          {consent === null ? (
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => decide(true)}
                className="min-h-[48px] flex-1 rounded-xl bg-copper px-4 text-sm font-medium text-primary-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-copper/40"
              >
                Marketing erlauben
              </button>
              <button
                type="button"
                onClick={() => decide(false)}
                className="min-h-[48px] flex-1 rounded-xl border border-copper/30 px-4 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-copper/40"
              >
                Ablehnen
              </button>
            </div>
          ) : (
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <p className="flex items-center gap-2 text-sm text-foreground" role="status">
                {consent === "granted" ? (
                  <Check size={16} className="text-copper" aria-hidden="true" />
                ) : (
                  <X size={16} className="text-muted-foreground" aria-hidden="true" />
                )}
                {consent === "granted"
                  ? "Marketing-Cookies sind erlaubt."
                  : "Marketing-Cookies sind abgelehnt."}
              </p>
              <button
                type="button"
                onClick={() => decide(consent !== "granted")}
                className="min-h-[44px] rounded-xl border border-copper/30 px-4 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-copper/40"
              >
                {consent === "granted" ? "Einwilligung widerrufen" : "Doch erlauben"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
