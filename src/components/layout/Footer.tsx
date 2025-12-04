import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Heart, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

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

const FooterLink = ({ href, label }: { href: string; label: string }) => (
  <li>
    <Link
      to={href}
      className="group inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors text-sm"
    >
      <span className="animated-underline">{label}</span>
      <ArrowUpRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
    </Link>
  </li>
);

export const Footer = () => {
  return (
    <footer className="relative bg-secondary/50 border-t border-border overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-petrol/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-copper/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      {/* Main Footer */}
      <div className="container-wide section-padding-sm relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Column */}
          <ScrollReveal direction="up" className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6 group">
              <motion.span 
                className="font-display text-2xl tracking-tight text-foreground"
                whileHover={{ scale: 1.02 }}
              >
                Gentle<span className="text-copper group-hover:text-copper-light transition-colors">Hands</span>
              </motion.span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm leading-relaxed">
              Exklusive Erlebnismassagen für Frauen. Ein geschützter Raum für
              tiefe Entspannung und bewusstes Loslassen.
            </p>
            <div className="space-y-3">
              <motion.a
                href="mailto:kontakt@gentlehands.ch"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                whileHover={{ x: 4 }}
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail size={16} className="text-primary" />
                </div>
                <span>kontakt@gentlehands.ch</span>
              </motion.a>
              <motion.a
                href="tel:+41000000000"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                whileHover={{ x: 4 }}
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Phone size={16} className="text-primary" />
                </div>
                <span>+41 00 000 00 00</span>
              </motion.a>
              <motion.div 
                className="flex items-center gap-3 text-muted-foreground"
                whileHover={{ x: 4 }}
              >
                <div className="w-8 h-8 rounded-lg bg-copper/10 flex items-center justify-center">
                  <MapPin size={16} className="text-copper" />
                </div>
                <span>Diskrete Lage in Zürich</span>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* Erlebnisse */}
          <ScrollReveal direction="up" delay={0.1}>
            <h4 className="font-display text-lg mb-4 text-foreground">Erlebnisse</h4>
            <ul className="space-y-2">
              {footerLinks.erlebnisse.map((link) => (
                <FooterLink key={link.href} {...link} />
              ))}
            </ul>
          </ScrollReveal>

          {/* Angebote */}
          <ScrollReveal direction="up" delay={0.2}>
            <h4 className="font-display text-lg mb-4 text-foreground">Angebote</h4>
            <ul className="space-y-2">
              {footerLinks.angebote.map((link) => (
                <FooterLink key={link.href} {...link} />
              ))}
            </ul>
          </ScrollReveal>

          {/* Information & Rechtliches */}
          <ScrollReveal direction="up" delay={0.3}>
            <h4 className="font-display text-lg mb-4 text-foreground">Information</h4>
            <ul className="space-y-2 mb-6">
              {footerLinks.information.map((link) => (
                <FooterLink key={link.href} {...link} />
              ))}
            </ul>
            <h4 className="font-display text-lg mb-4 text-foreground">Rechtliches</h4>
            <ul className="space-y-2">
              {footerLinks.rechtliches.map((link) => (
                <FooterLink key={link.href} {...link} />
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border relative">
        <div className="container-wide py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.p 
            className="text-sm text-muted-foreground text-center md:text-left flex items-center gap-1"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            © {new Date().getFullYear()} GentleHands. Mit{" "}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            >
              <Heart size={14} className="text-copper fill-copper" />
            </motion.span>
            {" "}in Zürich.
          </motion.p>
          <p className="text-xs text-muted-foreground text-center md:text-right max-w-md opacity-70">
            GentleHands ist kein Erotikstudio. Wir bieten ausschliesslich
            professionelle Entspannungsmassagen an.
          </p>
        </div>
      </div>
    </footer>
  );
};
