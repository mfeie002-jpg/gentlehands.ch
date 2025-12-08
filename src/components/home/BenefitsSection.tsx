import { motion } from "framer-motion";
import { GlowCard } from "@/components/shared/GlowCard";
import { Shield, Sparkles, Gem, Clock, Heart, Leaf } from "lucide-react";

import massageBack from "@/assets/massage-hands-back.jpg";
import massageShoulders from "@/assets/massage-hands-shoulders.jpg";
import massageNeck from "@/assets/massage-hands-neck.jpg";
import massageLowerBack from "@/assets/massage-hands-lower-back.jpg";
import massageDeepRelease from "@/assets/massage-deep-release.jpg";
import massageStressReset from "@/assets/massage-stress-reset.jpg";

const benefits = [
  {
    image: massageBack,
    icon: Shield,
    title: "Absolute Diskretion",
    description: "Ein geschützter Raum nur für Sie – ohne Blicke, ohne Urteile.",
    color: "from-petrol/20 to-petrol/5",
  },
  {
    image: massageShoulders,
    icon: Sparkles,
    title: "Ganzheitliche Entspannung",
    description: "Körper, Geist und Seele kommen gleichermassen zur Ruhe.",
    color: "from-copper/20 to-copper/5",
  },
  {
    image: massageNeck,
    icon: Gem,
    title: "Premium Erlebnis",
    description: "Hochwertigste Öle, Düfte und Atmosphären für alle Sinne.",
    color: "from-copper/20 to-copper/5",
  },
  {
    image: massageLowerBack,
    icon: Clock,
    title: "Keine Eile",
    description: "Jede Behandlung hat ihren eigenen Rhythmus – ohne Zeitdruck.",
    color: "from-forest/20 to-forest/5",
  },
  {
    image: massageDeepRelease,
    icon: Heart,
    title: "Persönliche Betreuung",
    description: "Ihre Therapeutin kennt Ihre Präferenzen und Bedürfnisse.",
    color: "from-petrol/20 to-petrol/5",
  },
  {
    image: massageStressReset,
    icon: Leaf,
    title: "Natürliche Produkte",
    description: "Bio-zertifizierte, nachhaltige Produkte für Ihre Haut.",
    color: "from-forest/20 to-forest/5",
  },
];

export const BenefitsSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Ambient effects */}
      <div className="absolute top-0 left-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-copper/3 rounded-full blur-[100px] sm:blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-petrol/3 rounded-full blur-[100px] sm:blur-[150px]" />
      
      <div className="container-wide relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16 px-4 sm:px-0"
        >
          <motion.div className="flex items-center justify-center gap-2 sm:gap-4 mb-3 sm:mb-4">
            <motion.div 
              className="h-px bg-gradient-to-r from-transparent via-copper to-transparent w-8 sm:w-12"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
            <span className="text-copper uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-xs font-medium">
              Warum GentleHands
            </span>
            <motion.div 
              className="h-px bg-gradient-to-r from-transparent via-copper to-transparent w-8 sm:w-12"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
          </motion.div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display text-foreground mb-3 sm:mb-4 md:mb-6">
            Ihr Wohlbefinden, unsere Priorität
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            Entdecken Sie, was GentleHands von gewöhnlichen Massagepraxen unterscheidet.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-0">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <GlowCard className="h-full overflow-hidden group">
                <div className="h-full">
                  <div className="relative h-40 sm:h-48 md:h-52 overflow-hidden">
                    <motion.img
                      src={benefit.image}
                      alt={benefit.title}
                      className="w-full h-full object-cover transition-transform duration-700"
                      whileHover={{ scale: 1.08 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                    
                    {/* Icon overlay */}
                    <motion.div 
                      className={`absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${benefit.color} backdrop-blur-sm flex items-center justify-center border border-white/10`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <benefit.icon size={18} className="sm:w-[22px] sm:h-[22px] text-foreground" />
                    </motion.div>
                  </div>
                  <div className="p-4 sm:p-5 md:p-6">
                    <h3 className="text-base sm:text-lg md:text-xl font-display text-foreground mb-2 sm:mb-3 group-hover:text-copper transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
