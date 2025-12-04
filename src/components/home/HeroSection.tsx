import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Clock, Heart, ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { FloatingElements } from "@/components/shared/FloatingElements";
import { AnimatedGradient } from "@/components/shared/AnimatedGradient";
import heroImage from "@/assets/hero-spa-room.jpg";

const trustBadges = [
  { icon: Shield, label: "Nur für Frauen" },
  { icon: Clock, label: "Limitierte Termine" },
  { icon: Heart, label: "Diskrete Lage" },
];

export const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <img src={heroImage} alt="GentleHands Spa" className="w-full h-full object-cover scale-110" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </motion.div>
      
      {/* Animated Gradient Overlay */}
      <AnimatedGradient className="pointer-events-none opacity-50" />
      
      {/* Floating Elements */}
      <FloatingElements variant="dots" />
      
      {/* Decorative Blurs */}
      <motion.div 
        className="absolute top-1/4 -right-32 w-96 h-96 bg-copper/15 rounded-full blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.2, 0.15] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-1/4 -left-32 w-96 h-96 bg-petrol/15 rounded-full blur-3xl"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.15, 0.2, 0.15] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <motion.div 
        className="container-wide relative z-10 pt-32 pb-20"
        style={{ opacity }}
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Overline with Line */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <motion.div 
              className="h-px bg-copper/50 w-12"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <span className="text-copper font-medium tracking-[0.2em] uppercase text-xs">
              Exklusive Erlebnismassagen für Frauen
            </span>
            <motion.div 
              className="h-px bg-copper/50 w-12"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.div>

          {/* Main Headline with Split Animation */}
          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-foreground"
            >
              Die intensivste Entspannung
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-primary"
            >
              Ihres Lebens.
            </motion.h1>
          </div>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Erleben Sie tiefe Entspannung in einer atmosphärischen Umgebung –
            mit persönlich abgestimmten Themen und der freien Wahl Ihrer
            Masseurin oder Ihres Masseurs.
          </motion.p>

          {/* CTA Buttons with Magnetic Effect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <MagneticButton>
              <Button variant="hero" size="xl" asChild className="group">
                <Link to="/buchung">
                  <span className="relative z-10">Erlebnis anfragen</span>
                  <motion.div
                    className="absolute inset-0 bg-copper rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    layoutId="hero-btn-bg"
                  />
                </Link>
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button variant="hero-secondary" size="xl" asChild>
                <Link to="/erlebnisse">Erlebnisse entdecken</Link>
              </Button>
            </MagneticButton>
          </motion.div>

          {/* Trust Badges with Stagger */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
          >
            {trustBadges.map((badge, index) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="flex items-center gap-3 text-muted-foreground group"
              >
                <div className="relative">
                  <badge.icon size={18} className="text-copper transition-transform group-hover:scale-110" />
                  <motion.div
                    className="absolute inset-0 bg-copper/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                  />
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
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-muted-foreground/60"
          >
            <span className="text-xs tracking-widest uppercase">Entdecken</span>
            <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-1.5">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-copper rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
