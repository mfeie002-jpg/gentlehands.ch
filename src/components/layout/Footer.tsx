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
    <footer className="relative bg-gradient-to-b from-secondary/30 to-secondary/60 border-t border-border overflow-hidden" role="contentinfo">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-petrol/5 rounded-full blur-[100px] sm:blur-[150px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] bg-copper/5 rounded-full blur-[80px] sm:blur-[120px] translate-y-1/2 -translate-x-1/2" />
      
      {/* Main Footer */}
      <div className="container-wide section-padding-sm relative">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-8">
          {/* Brand Column */}
          <ScrollReveal direction="up" className="col-span-2 lg:col-span-2">
            <Link to="/" className="inline-block mb-4 sm:mb-6">
              <Logo size="md" />
            </Link>
            <p className="text-muted-foreground mb-4 sm:mb-6 max-w-sm leading-relaxed text-sm sm:text-base">
              Exklusive Erlebnismassagen für Frauen. Ein geschützter Raum für
              tiefe Entspannung und bewusstes Loslassen.
            </p>
            <div className="space-y-2 sm:space-y-3">
              <motion.a
                href="mailto:kontakt@gentlehands.ch"
                className="flex items-center gap-2 sm:gap-3 text-muted-foreground hover:text-copper transition-colors group py-1"
                whileHover={{ x: 4 }}
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-copper/10 flex items-center justify-center group-hover:bg-copper/20 transition-colors flex-shrink-0">
                  <Mail size={14} className="sm:w-4 sm:h-4 text-copper" />
                </div>
                <span className="text-xs sm:text-sm truncate">kontakt@gentlehands.ch</span>
              </motion.a>
              <motion.a
                href="tel:+41000000000"
                className="flex items-center gap-2 sm:gap-3 text-muted-foreground hover:text-copper transition-colors group py-1"
                whileHover={{ x: 4 }}
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-copper/10 flex items-center justify-center group-hover:bg-copper/20 transition-colors flex-shrink-0">
                  <Phone size={14} className="sm:w-4 sm:h-4 text-copper" />
                </div>
                <span className="text-xs sm:text-sm">+41 00 000 00 00</span>
              </motion.a>
              <motion.div 
                className="flex items-center gap-2 sm:gap-3 text-muted-foreground py-1"
                whileHover={{ x: 4 }}
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-petrol/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={14} className="sm:w-4 sm:h-4 text-petrol" />
                </div>
                <span className="text-xs sm:text-sm">Diskrete Lage in Zürich</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2 sm:gap-3 text-muted-foreground py-1"
                whileHover={{ x: 4 }}
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-forest/10 flex items-center justify-center flex-shrink-0">
                  <Clock size={14} className="sm:w-4 sm:h-4 text-forest" />
                </div>
                <span className="text-xs sm:text-sm">Mo–Sa 10:00–21:00</span>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* Erlebnisse */}
          <ScrollReveal direction="up" delay={0.1}>
            <h4 className="font-display text-base sm:text-lg mb-3 sm:mb-4 text-foreground">Erlebnisse</h4>
            <ul className="space-y-2 sm:space-y-2.5">
              {footerLinks.erlebnisse.map((link) => (
                <FooterLink key={link.href} {...link} />
              ))}
            </ul>
          </ScrollReveal>

          {/* Angebote */}
          <ScrollReveal direction="up" delay={0.2}>
            <h4 className="font-display text-base sm:text-lg mb-3 sm:mb-4 text-foreground">Angebote</h4>
            <ul className="space-y-2 sm:space-y-2.5">
              {footerLinks.angebote.map((link) => (
                <FooterLink key={link.href} {...link} />
              ))}
            </ul>
          </ScrollReveal>

          {/* Information & Rechtliches */}
          <ScrollReveal direction="up" delay={0.3} className="col-span-2 sm:col-span-1">
            <h4 className="font-display text-base sm:text-lg mb-3 sm:mb-4 text-foreground">Information</h4>
            <ul className="space-y-2 sm:space-y-2.5 mb-4 sm:mb-6">
              {footerLinks.information.map((link) => (
                <FooterLink key={link.href} {...link} />
              ))}
            </ul>
            <h4 className="font-display text-base sm:text-lg mb-3 sm:mb-4 text-foreground">Rechtliches</h4>
            <ul className="space-y-2 sm:space-y-2.5">
              {footerLinks.rechtliches.map((link) => (
                <FooterLink key={link.href} {...link} />
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/50 relative bg-secondary/30">
        <div className="container-wide py-4 sm:py-6 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
          <motion.p 
            className="text-xs sm:text-sm text-muted-foreground text-center md:text-left flex items-center gap-1.5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            © {new Date().getFullYear()} GentleHands. Mit{" "}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            >
              <Heart size={12} className="sm:w-[14px] sm:h-[14px] text-copper fill-copper" />
            </motion.span>
            {" "}in Zürich.
          </motion.p>
          <p className="text-[10px] sm:text-xs text-muted-foreground text-center md:text-right max-w-sm sm:max-w-md opacity-80 px-4 sm:px-0">
            GentleHands bietet ausschliesslich professionelle Entspannungsmassagen an. Wir sind kein Erotikstudio.
          </p>
        </div>
      </div>
    </footer>
  );
};
