import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Clock, Heart, ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { FloatingElements } from "@/components/shared/FloatingElements";
import heroImage from "@/assets/massage-hands-back.jpg";

const trustBadges = [
  { icon: Shield, label: "Nur für Frauen" },
  { icon: Clock, label: "Limitierte Termine" },
  { icon: Heart, label: "Diskrete Lage" },
];

export const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 800], [1, 1.1]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax & Scale */}
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <img 
          src={heroImage} 
          alt="GentleHands Massage - Sanfte Hände auf einem entspannten Rücken" 
          className="w-full h-full object-cover"
        />
        {/* Multi-layer gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40" />
        {/* Warm copper tint overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-copper/10 via-transparent to-petrol/10" />
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
          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-foreground text-5xl md:text-6xl lg:text-7xl"
            >
              Die intensivste Entspannung
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.h1
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-gradient-copper text-5xl md:text-6xl lg:text-7xl"
            >
              Ihres Lebens.
            </motion.h1>
          </div>

          {/* Subline with fade */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto mb-14 leading-relaxed font-light"
          >
            Erleben Sie tiefe Entspannung in einer atmosphärischen Umgebung –
            mit persönlich abgestimmten Themen und der freien Wahl Ihrer
            Masseurin oder Ihres Masseurs.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16"
          >
            <MagneticButton>
              <Button variant="copper" size="xl" asChild className="min-w-[200px] shadow-copper">
                <Link to="/buchung">Erlebnis anfragen</Link>
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button variant="outline" size="xl" asChild className="min-w-[200px] border-copper/30 hover:border-copper hover:bg-copper/5">
                <Link to="/erlebnisse">Erlebnisse entdecken</Link>
              </Button>
            </MagneticButton>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-10"
          >
            {trustBadges.map((badge, index) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 + index * 0.15 }}
                className="flex items-center gap-3 text-muted-foreground group cursor-default"
              >
                <div className="relative p-2 rounded-full bg-copper/10 group-hover:bg-copper/20 transition-colors duration-300">
                  <badge.icon size={18} className="text-copper transition-transform duration-300 group-hover:scale-110" />
                </div>
                <span className="text-sm font-medium tracking-wide">{badge.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-3 text-muted-foreground/60"
          >
            <span className="text-xs tracking-[0.2em] uppercase font-medium">Entdecken</span>
            <div className="w-7 h-12 border-2 border-copper/40 rounded-full flex items-start justify-center p-2">
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-2 h-2 bg-copper rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
