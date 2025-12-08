import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Clock, Heart, ChevronDown, Sparkles, Lock } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { FloatingElements } from "@/components/shared/FloatingElements";
import heroImage from "@/assets/massage-hands-back.jpg";

const trustBadges = [
  { icon: Shield, label: "Nur für Frauen", sublabel: "Geschützter Raum" },
  { icon: Lock, label: "100% Diskret", sublabel: "Keine Datensammlung" },
  { icon: Clock, label: "Limitierte Termine", sublabel: "Exklusive Verfügbarkeit" },
  { icon: Heart, label: "Professionell", sublabel: "Diplomierte Therapeut:innen" },
];

export const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 800], [1, 1.1]);

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Willkommen bei GentleHands"
    >
      {/* Background Image with Parallax & Scale */}
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <img 
          src={heroImage} 
          alt="GentleHands Massage - Sanfte, professionelle Hände auf einem entspannten Rücken" 
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          width={1920}
          height={1080}
        />
        {/* Multi-layer gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/60 to-background" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" aria-hidden="true" />
        {/* Warm copper tint overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-copper/8 via-transparent to-petrol/8" aria-hidden="true" />
      </motion.div>
      
      {/* Floating Elements */}
      <FloatingElements variant="dots" />
      
      {/* Ambient glow effects */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-copper/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-petrol/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-copper/5 rounded-full blur-[150px] pointer-events-none" />

      <motion.div 
        className="container-wide relative z-10 pt-32 pb-20"
        style={{ opacity }}
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Overline with animated lines */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-4 mb-10"
          >
            <motion.div 
              className="h-px bg-gradient-to-r from-transparent via-copper to-transparent w-16"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <span className="text-copper font-medium tracking-[0.25em] uppercase text-xs md:text-sm">
              Exklusive Erlebnismassagen für Frauen
            </span>
            <motion.div 
              className="h-px bg-gradient-to-r from-transparent via-copper to-transparent w-16"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.div>

          {/* Main Headline with staggered reveal */}
          <div className="overflow-hidden mb-2 sm:mb-4">
            <motion.h1
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-foreground text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl px-4 sm:px-0"
            >
              Ein geschützter Raum
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-4 sm:mb-6">
            <motion.h1
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-foreground text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl px-4 sm:px-0"
            >
              für <span className="text-gradient-copper">tiefe Entspannung</span>
            </motion.h1>
          </div>

          {/* Subline with fade - emotional trigger */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto mb-4 sm:mb-6 leading-relaxed font-light px-4 sm:px-0"
          >
            Für Frauen, die täglich alles geben – und endlich einen Ort verdienen, 
            an dem sie sich vollständig fallen lassen können.
          </motion.p>

          {/* Secondary emotional hook */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="text-sm sm:text-base text-muted-foreground/90 max-w-xl mx-auto mb-3 px-4 sm:px-0"
          >
            Professionelle Massagen in atmosphärischen Themenräumen • 
            Ihre Grenzen werden respektiert • Sie haben die Kontrolle
          </motion.p>

          {/* Trust note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-xs sm:text-sm text-copper/80 mb-8 sm:mb-12 max-w-xl mx-auto px-4 sm:px-0 font-medium"
          >
            Professionelle Körperarbeit • Sicher • Diskret
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-12 sm:mb-16 px-4 sm:px-0"
          >
            <MagneticButton>
              <Button variant="copper" size="lg" asChild className="w-full sm:w-auto min-w-[200px] shadow-copper">
                <Link to="/buchung">
                  <Sparkles size={18} className="mr-2" />
                  Erlebnis anfragen
                </Link>
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button variant="outline" size="lg" asChild className="w-full sm:w-auto min-w-[200px] border-copper/30 hover:border-copper hover:bg-copper/5">
                <Link to="/erlebnisse">Erlebnisse entdecken</Link>
              </Button>
            </MagneticButton>
          </motion.div>

          {/* Trust Badges */}
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-3 md:gap-4 px-2 sm:px-0"
            aria-label="Unsere Garantien"
          >
            {trustBadges.map((badge, index) => (
              <motion.li
                key={badge.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                className="flex items-center gap-2 sm:gap-3 text-muted-foreground group cursor-default bg-card/30 backdrop-blur-sm px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border border-border/30 hover:border-copper/30 transition-all duration-300"
              >
                <div className="relative p-1.5 sm:p-2 rounded-lg bg-copper/15 group-hover:bg-copper/25 transition-colors duration-300 flex-shrink-0" aria-hidden="true">
                  <badge.icon size={14} className="sm:w-4 sm:h-4 text-copper transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="text-left min-w-0">
                  <span className="text-[11px] sm:text-sm font-medium tracking-wide text-foreground block leading-tight truncate">{badge.label}</span>
                  <span className="text-[9px] sm:text-xs text-muted-foreground hidden sm:block truncate">{badge.sublabel}</span>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>

      </motion.div>

      {/* Scroll Indicator - positioned outside the fade container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-foreground/50"
        >
          <span className="text-xs tracking-[0.2em] uppercase font-medium">Entdecken</span>
          <div className="w-6 h-10 border-2 border-copper/30 rounded-full flex items-start justify-center p-1.5">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-copper/70 rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
