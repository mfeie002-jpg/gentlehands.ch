import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Clock, Heart, Sparkles, Lock, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

import { FloatingElements } from "@/components/shared/FloatingElements";
import { ScrollIndicator } from "@/components/shared/ScrollIndicator";
import heroImage from "@/assets/massage-hands-back.jpg";

// A/B Test Variants
const heroVariants = [
  {
    id: "emotional",
    headline: ["Ein geschützter Raum", "für tiefe Entspannung"],
    subline: "Für Frauen, die täglich alles geben – und endlich einen Ort verdienen, an dem sie sich vollständig fallen lassen können.",
  },
  {
    id: "benefit",
    headline: ["Stress loslassen.", "Kraft zurückgewinnen."],
    subline: "Professionelle Erlebnismassagen in atmosphärischen Themenräumen. Nur für Frauen. 100% diskret.",
  },
  {
    id: "exclusive",
    headline: ["Exklusive Wellness", "nur für Sie"],
    subline: "Limitierte Termine, handverlesene Therapeut:innen, sechs einzigartige Themenräume in Zürich.",
  },
  {
    id: "safety",
    headline: ["Ihre Sicherheit.", "Unsere Priorität."],
    subline: "Diskreter Standort, keine Kameras, absolute Vertraulichkeit. Sie bestimmen jederzeit Ihre Grenzen – wir respektieren sie.",
  },
];

const trustBadges = [
  { icon: Shield, label: "Nur für Frauen", sublabel: "Geschützter Raum" },
  { icon: Lock, label: "100% Diskret", sublabel: "Keine Datensammlung" },
  { icon: Clock, label: "Limitierte Termine", sublabel: "Exklusive Verfügbarkeit" },
  { icon: Heart, label: "Professionell", sublabel: "Diplomierte Therapeut:innen" },
];

const getActiveVariant = () => {
  if (typeof window !== "undefined") {
    const urlParams = new URLSearchParams(window.location.search);
    const urlVariant = urlParams.get("hero");
    if (urlVariant && heroVariants.some(v => v.id === urlVariant)) {
      return heroVariants.find(v => v.id === urlVariant)!;
    }
    
    const storedVariant = localStorage.getItem("hero_variant");
    if (storedVariant && heroVariants.some(v => v.id === storedVariant)) {
      return heroVariants.find(v => v.id === storedVariant)!;
    }
  }
  return heroVariants[0];
};

// Check if device is mobile
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  
  return isMobile;
};

export const HeroSection = () => {
  const [activeVariant, setActiveVariant] = useState(heroVariants[0]);
  const isMobile = useIsMobile();
  const { scrollY } = useScroll();
  
  // Disable parallax on mobile for performance
  const y = useTransform(scrollY, [0, 1000], [0, isMobile ? 0 : 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 1000], [1, isMobile ? 1 : 1.2]);

  useEffect(() => {
    setActiveVariant(getActiveVariant());
  }, []);

  return (
    <section 
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
      aria-label="Willkommen bei GentleHands"
      data-hero-variant={activeVariant.id}
    >
      {/* Background Image - Simplified for mobile */}
      <motion.div 
        className="absolute inset-0 origin-center" 
        style={{ 
          y: isMobile ? 0 : y, 
          scale: isMobile ? 1 : scale
        }}
      >
        <img 
          src={heroImage} 
          alt="GentleHands Massage - Sanfte, professionelle Hände auf einem entspannten Rücken" 
          className="w-full h-[120%] object-cover object-center"
          loading="eager"
          // @ts-ignore
          fetchpriority="high"
          width={1920}
          height={1080}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background/95" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/40 to-background/70" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-br from-copper/5 via-transparent to-petrol/5" aria-hidden="true" />
      </motion.div>
      
      {/* Floating Elements - Desktop only */}
      <div className="hidden md:block">
        <FloatingElements variant="dots" />
      </div>
      
      {/* Ambient glow effects - Desktop only */}
      <div className="hidden md:block">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-copper/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-petrol/8 rounded-full blur-[100px] pointer-events-none" />
      </div>

      <motion.div 
        className="container-wide relative z-10 pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6"
        style={{ opacity }}
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Overline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-6 sm:mb-10"
          >
            <motion.div 
              className="h-px bg-gradient-to-r from-transparent via-copper to-transparent w-8 sm:w-16"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <span className="text-copper font-medium tracking-[0.15em] sm:tracking-[0.25em] uppercase text-[10px] sm:text-xs md:text-sm whitespace-nowrap">
              Erlebnismassagen für Frauen
            </span>
            <motion.div 
              className="h-px bg-gradient-to-r from-transparent via-copper to-transparent w-8 sm:w-16"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.div>

          {/* Headlines - Optimized typography for mobile */}
          <AnimatePresence mode="wait">
            <motion.div key={activeVariant.id}>
              <div className="overflow-hidden mb-1 sm:mb-2">
                <motion.h1
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  className="text-foreground text-[1.75rem] leading-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display"
                >
                  {activeVariant.headline[0]}
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-4 sm:mb-6">
                <motion.h1
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                  className="text-foreground text-[1.75rem] leading-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display"
                >
                  {activeVariant.id === "emotional" ? (
                    <>für <span className="text-gradient-copper">{activeVariant.headline[1].replace("für ", "")}</span></>
                  ) : (
                    <span className="text-gradient-copper">{activeVariant.headline[1]}</span>
                  )}
                </motion.h1>
              </div>

              {/* Subline */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-[15px] leading-relaxed sm:text-lg md:text-xl lg:text-2xl text-foreground/70 max-w-2xl mx-auto mb-4 sm:mb-6 font-light"
              >
                {activeVariant.subline}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* Trust note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xs sm:text-sm text-copper/80 mb-6 sm:mb-10 font-medium"
          >
            Professionelle Körperarbeit • Sicher • Diskret
          </motion.p>

          {/* CTA Buttons - Larger on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-16"
          >
            <Button 
              variant="copper" 
              size="lg" 
              asChild 
              className="w-full sm:w-auto min-w-[220px] shadow-copper group h-14 sm:h-12 text-base font-semibold active:scale-[0.98] transition-transform touch-manipulation"
            >
              <Link to="/buchung">
                <Sparkles size={18} className="mr-2 group-hover:rotate-12 transition-transform" />
                Jetzt Termin buchen
                <ArrowRight size={16} className="ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              asChild 
              className="w-full sm:w-auto min-w-[200px] border-copper/30 hover:border-copper hover:bg-copper/5 group h-12 active:scale-[0.98] transition-transform touch-manipulation"
            >
              <Link to="/erlebnisse">
                6 Themenräume entdecken
                <ArrowRight size={16} className="ml-2 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
            </Button>
          </motion.div>

          {/* Trust Badges - Optimized 2x2 grid on mobile */}
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-3"
            aria-label="Unsere Garantien"
          >
            {trustBadges.map((badge, index) => (
              <motion.li
                key={badge.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.08 }}
                className="flex items-center gap-2 sm:gap-3 text-muted-foreground bg-card/40 backdrop-blur-sm px-3 py-2.5 sm:px-4 sm:py-2.5 rounded-xl border border-border/40 hover:border-copper/30 transition-colors"
              >
                <div className="p-1.5 sm:p-2 rounded-lg bg-copper/15 flex-shrink-0" aria-hidden="true">
                  <badge.icon size={16} className="sm:w-4 sm:h-4 text-copper" />
                </div>
                <div className="text-left min-w-0">
                  <span className="text-xs sm:text-sm font-medium text-foreground block leading-tight">{badge.label}</span>
                  <span className="text-[10px] sm:text-xs text-muted-foreground/80 hidden sm:block">{badge.sublabel}</span>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </motion.div>

      {/* Scroll Indicator - Desktop only */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden lg:block">
        <ScrollIndicator variant="mouse" text="Entdecken" />
      </div>
    </section>
  );
};
