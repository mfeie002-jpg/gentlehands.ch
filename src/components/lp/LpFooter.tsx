import { Link } from "react-router-dom";
import { campaignConfig, isSet } from "@/config/campaign";

/** Kompakter Footer: Impressum, Datenschutz, Kontakt (nur wenn bestätigt). */
export const LpFooter = () => (
  <footer className="border-t border-copper/15 bg-cream px-4 py-8 pb-28 text-center">
    <p className="font-display text-lg text-foreground">GentleHands</p>
    <p className="mt-2 text-sm text-muted-foreground">
      Mobile Wellnessmassage für Frauen ab 18 Jahren. Keine erotischen oder sexuellen Dienstleistungen.
    </p>
    <nav aria-label="Rechtliches" className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
      <Link className="text-copper underline underline-offset-4" to="/rechtliches#impressum">
        Impressum
      </Link>
      <Link className="text-copper underline underline-offset-4" to="/rechtliches#datenschutz">
        Datenschutz
      </Link>
      {isSet(campaignConfig.contactEmail) && (
        <a className="text-copper underline underline-offset-4" href={`mailto:${campaignConfig.contactEmail}`}>
          {campaignConfig.contactEmail}
        </a>
      )}
    </nav>
    <p className="mt-4 text-xs text-muted-foreground">
      © {new Date().getFullYear()} GentleHands
    </p>
  </footer>
);
