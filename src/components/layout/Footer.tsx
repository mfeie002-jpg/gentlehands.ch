import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  erlebnisse: [
    { href: "/erlebnisse", label: "Alle Erlebnisse" },
    { href: "/quiz", label: "Erlebnis-Finder Quiz" },
    { href: "/galerie", label: "Galerie" },
    { href: "/preise", label: "Preise" },
  ],
  angebote: [
    { href: "/massagen", label: "Alle Massagen" },
    { href: "/team", label: "Unser Team" },
    { href: "/buchung", label: "Termin buchen" },
    { href: "/gutscheine", label: "Gutscheine" },
    { href: "/membership", label: "Membership" },
  ],
  information: [
    { href: "/ueber-uns", label: "Über uns" },
    { href: "/erfahrungen", label: "Erfahrungen" },
    { href: "/vorbereitung", label: "Vorbereitung" },
    { href: "/faq", label: "FAQ" },
    { href: "/business", label: "Corporate Wellness" },
  ],
  rechtliches: [
    { href: "/rechtliches", label: "Impressum" },
    { href: "/rechtliches#agb", label: "AGB" },
    { href: "/rechtliches#datenschutz", label: "Datenschutz" },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t border-border">
      {/* Main Footer */}
      <div className="container-wide section-padding-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <span className="font-display text-2xl tracking-tight text-foreground">
                Gentle<span className="text-copper">Hands</span>
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Exklusive Erlebnismassagen für Frauen. Ein geschützter Raum für
              tiefe Entspannung und bewusstes Loslassen.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:kontakt@gentlehands.ch"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail size={18} />
                <span>kontakt@gentlehands.ch</span>
              </a>
              <a
                href="tel:+41000000000"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone size={18} />
                <span>+41 00 000 00 00</span>
              </a>
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin size={18} className="mt-0.5" />
                <span>Diskrete Lage in Zürich</span>
              </div>
            </div>
          </div>

          {/* Erlebnisse */}
          <div>
            <h4 className="font-display text-lg mb-4 text-foreground">Erlebnisse</h4>
            <ul className="space-y-2">
              {footerLinks.erlebnisse.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Angebote */}
          <div>
            <h4 className="font-display text-lg mb-4 text-foreground">Angebote</h4>
            <ul className="space-y-2">
              {footerLinks.angebote.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information & Rechtliches */}
          <div>
            <h4 className="font-display text-lg mb-4 text-foreground">Information</h4>
            <ul className="space-y-2 mb-6">
              {footerLinks.information.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="font-display text-lg mb-4 text-foreground">Rechtliches</h4>
            <ul className="space-y-2">
              {footerLinks.rechtliches.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container-wide py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} GentleHands. Alle Rechte vorbehalten.
          </p>
          <p className="text-xs text-muted-foreground text-center md:text-right max-w-md">
            GentleHands ist kein Erotikstudio. Wir bieten ausschliesslich
            professionelle Entspannungsmassagen an.
          </p>
        </div>
      </div>
    </footer>
  );
};
