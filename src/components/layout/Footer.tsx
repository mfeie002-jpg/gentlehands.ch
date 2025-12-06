import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Heart, ArrowUpRight, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Logo } from "@/components/shared/Logo";

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
      className="group inline-flex items-center gap-1 text-muted-foreground hover:text-copper transition-colors text-sm"
    >
      <span className="animated-underline">{label}</span>
      <ArrowUpRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
    </Link>
  </li>
);

export const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-secondary/30 to-secondary/60 border-t border-border overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-petrol/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-copper/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
      
      {/* Main Footer */}
      <div className="container-wide section-padding-sm relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Column */}
          <ScrollReveal direction="up" className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <Logo size="md" />
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm leading-relaxed">
              Exklusive Erlebnismassagen für Frauen. Ein geschützter Raum für
              tiefe Entspannung und bewusstes Loslassen.
            </p>
            <div className="space-y-3">
              <motion.a
                href="mailto:kontakt@gentlehands.ch"
                className="flex items-center gap-3 text-muted-foreground hover:text-copper transition-colors group"
                whileHover={{ x: 4 }}
              >
                <div className="w-9 h-9 rounded-lg bg-copper/10 flex items-center justify-center group-hover:bg-copper/20 transition-colors">
                  <Mail size={16} className="text-copper" />
                </div>
                <span className="text-sm">kontakt@gentlehands.ch</span>
              </motion.a>
              <motion.a
                href="tel:+41000000000"
                className="flex items-center gap-3 text-muted-foreground hover:text-copper transition-colors group"
                whileHover={{ x: 4 }}
              >
                <div className="w-9 h-9 rounded-lg bg-copper/10 flex items-center justify-center group-hover:bg-copper/20 transition-colors">
                  <Phone size={16} className="text-copper" />
                </div>
                <span className="text-sm">+41 00 000 00 00</span>
              </motion.a>
              <motion.div 
                className="flex items-center gap-3 text-muted-foreground"
                whileHover={{ x: 4 }}
              >
                <div className="w-9 h-9 rounded-lg bg-petrol/10 flex items-center justify-center">
                  <MapPin size={16} className="text-petrol" />
                </div>
                <span className="text-sm">Diskrete Lage in Zürich</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-3 text-muted-foreground"
                whileHover={{ x: 4 }}
              >
                <div className="w-9 h-9 rounded-lg bg-forest/10 flex items-center justify-center">
                  <Clock size={16} className="text-forest" />
                </div>
                <span className="text-sm">Mo–Sa 10:00–21:00</span>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* Erlebnisse */}
          <ScrollReveal direction="up" delay={0.1}>
            <h4 className="font-display text-lg mb-4 text-foreground">Erlebnisse</h4>
            <ul className="space-y-2.5">
              {footerLinks.erlebnisse.map((link) => (
                <FooterLink key={link.href} {...link} />
              ))}
            </ul>
          </ScrollReveal>

          {/* Angebote */}
          <ScrollReveal direction="up" delay={0.2}>
            <h4 className="font-display text-lg mb-4 text-foreground">Angebote</h4>
            <ul className="space-y-2.5">
              {footerLinks.angebote.map((link) => (
                <FooterLink key={link.href} {...link} />
              ))}
            </ul>
          </ScrollReveal>

          {/* Information & Rechtliches */}
          <ScrollReveal direction="up" delay={0.3}>
            <h4 className="font-display text-lg mb-4 text-foreground">Information</h4>
            <ul className="space-y-2.5 mb-6">
              {footerLinks.information.map((link) => (
                <FooterLink key={link.href} {...link} />
              ))}
            </ul>
            <h4 className="font-display text-lg mb-4 text-foreground">Rechtliches</h4>
            <ul className="space-y-2.5">
              {footerLinks.rechtliches.map((link) => (
                <FooterLink key={link.href} {...link} />
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/50 relative bg-secondary/30">
        <div className="container-wide py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.p 
            className="text-sm text-muted-foreground text-center md:text-left flex items-center gap-1.5"
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
          <p className="text-xs text-muted-foreground text-center md:text-right max-w-md opacity-80">
            GentleHands bietet ausschliesslich professionelle Entspannungsmassagen an. Wir sind kein Erotikstudio.
          </p>
        </div>
      </div>
    </footer>
  );
};
