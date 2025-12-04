import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Clock, Heart } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-spa-room.jpg";

const trustBadges = [
  { icon: Shield, label: "Nur für Frauen" },
  { icon: Clock, label: "Limitierte Termine" },
  { icon: Heart, label: "Diskrete Lage" },
];

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="GentleHands Spa" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-copper/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-petrol/10 rounded-full blur-3xl" />

      <div className="container-wide relative z-10 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Overline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-copper font-medium tracking-wide uppercase text-sm mb-6"
          >
            Exklusive Erlebnismassagen für Frauen
          </motion.p>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-foreground mb-6"
          >
            Die intensivste Entspannung
            <br />
            <span className="text-primary">Ihres Lebens.</span>
          </motion.h1>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Erleben Sie tiefe Entspannung in einer atmosphärischen Umgebung –
            mit persönlich abgestimmten Themen und der freien Wahl Ihrer
            Masseurin oder Ihres Masseurs.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button variant="hero" size="xl" asChild>
              <Link to="/buchung">Erlebnis anfragen</Link>
            </Button>
            <Button variant="hero-secondary" size="xl" asChild>
              <Link to="/erlebnisse">Erlebnisse entdecken</Link>
            </Button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-8"
          >
            {trustBadges.map((badge, index) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 text-muted-foreground"
              >
                <badge.icon size={18} className="text-copper" />
                <span className="text-sm font-medium">{badge.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-copper rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
