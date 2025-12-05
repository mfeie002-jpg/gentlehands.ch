import { motion, useInView } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { useState, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import massageBack from "@/assets/massage-hands-back.jpg";
import massageShoulders from "@/assets/massage-hands-shoulders.jpg";
import massageNeck from "@/assets/massage-hands-neck.jpg";
import massageLowerBack from "@/assets/massage-hands-lower-back.jpg";

const steps = [
  {
    image: massageBack,
    step: "01",
    title: "Erlebnis wählen",
    description:
      "Wählen Sie Ihr atmosphärisches Theme – von Ozean-Ambiente bis Alpine Stille.",
    color: "petrol",
    gradient: "from-petrol/20 to-petrol/5",
  },
  {
    image: massageShoulders,
    step: "02",
    title: "Masseur:in auswählen",
    description:
      "Entscheiden Sie sich für eine Person oder lassen Sie uns intuitiv wählen.",
    color: "copper",
    gradient: "from-copper/20 to-copper/5",
  },
  {
    image: massageNeck,
    step: "03",
    title: "Präferenzen definieren",
    description:
      "Musik, Berührungsintensität, Gesprächswunsch – oder alles als Überraschung.",
    color: "forest",
    gradient: "from-forest/20 to-forest/5",
  },
  {
    image: massageLowerBack,
    step: "04",
    title: "Termin bestätigen",
    description:
      "Wählen Sie Ihren Wunschtermin und tauchen Sie ein in Ihr Erlebnis.",
    color: "petrol",
    gradient: "from-petrol/20 to-petrol/5",
  },
];

const StepCard = ({ step, index }: { step: typeof steps[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <ScrollReveal direction="up" delay={index * 0.15}>
      <motion.div
        ref={cardRef}
        className="relative"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Connector Line (hidden on mobile, last item) */}
        {index < steps.length - 1 && (
          <div className="hidden lg:block absolute top-24 left-[calc(50%+60px)] w-[calc(100%-120px)] h-px overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r from-${step.color}/50 to-primary/50`}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
              style={{ originX: 0 }}
            />
            {/* Animated dot */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-copper"
              initial={{ left: "0%", opacity: 0 }}
              animate={isInView ? { left: "100%", opacity: [0, 1, 1, 0] } : {}}
              transition={{ duration: 1.5, delay: 0.5 + index * 0.2 }}
            />
          </div>
        )}

        <div className="text-center group">
          {/* Image Container */}
          <motion.div 
            className="relative inline-flex items-center justify-center w-36 h-36 mb-6"
            animate={isHovered ? { y: -8 } : { y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Background glow */}
            <motion.div
              className={`absolute inset-0 bg-${step.color}/20 rounded-2xl blur-xl`}
              animate={isHovered ? { scale: 1.3, opacity: 0.6 } : { scale: 1, opacity: 0.3 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Rotating background */}
            <motion.div 
              className={`absolute inset-0 bg-gradient-to-br ${step.gradient} rounded-2xl`}
              animate={isHovered ? { rotate: 12, scale: 1.1 } : { rotate: 6, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
            
            {/* Image container */}
            <motion.div 
              className="relative bg-card rounded-2xl w-full h-full flex items-center justify-center shadow-md border border-border overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src={step.image} 
                alt={step.title}
                className="w-full h-full object-cover"
              />
              
              {/* Shimmer on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: "-100%" }}
                animate={isHovered ? { x: "100%" } : { x: "-100%" }}
                transition={{ duration: 0.6 }}
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
            
            {/* Step Number */}
            <motion.span 
              className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-copper to-copper-dark text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center shadow-copper"
              animate={isHovered ? { scale: 1.15, rotate: 12 } : { scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {step.step}
            </motion.span>
          </motion.div>

          {/* Content */}
          <motion.h3 
            className="text-xl font-display mb-3 text-foreground transition-colors duration-300"
            animate={isHovered ? { color: "hsl(var(--copper))" } : {}}
          >
            {step.title}
          </motion.h3>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
            {step.description}
          </p>
        </div>
      </motion.div>
    </ScrollReveal>
  );
};

export const HowItWorksSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="section-padding bg-secondary/30 relative overflow-hidden">
      {/* Decorative Elements */}
      <motion.div 
        className="absolute top-1/2 left-0 w-80 h-80 bg-petrol/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"
        animate={isInView ? { scale: [0.8, 1, 0.8], opacity: [0.3, 0.5, 0.3] } : {}}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div 
        className="absolute top-1/2 right-0 w-80 h-80 bg-copper/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"
        animate={isInView ? { scale: [1, 0.8, 1], opacity: [0.5, 0.3, 0.5] } : {}}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
      />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }} />
      
      <div className="container-wide relative">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <motion.div 
            className="flex items-center justify-center gap-4 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="h-px bg-gradient-to-r from-transparent to-copper/50 w-16"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
            <p className="text-copper font-medium tracking-[0.2em] uppercase text-xs">
              Ihr Weg zur Entspannung
            </p>
            <motion.div 
              className="h-px bg-gradient-to-l from-transparent to-copper/50 w-16"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
          </motion.div>
          <h2 className="text-foreground mb-6">So funktioniert GentleHands</h2>
          <motion.div 
            className="divider-copper mx-auto"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
        </ScrollReveal>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 mb-12">
          {steps.map((step, index) => (
            <StepCard key={step.step} step={step} index={index} />
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal className="text-center">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button variant="copper" size="lg" asChild>
              <Link to="/buchung">
                Jetzt Erlebnis anfragen
                <ArrowRight size={16} />
              </Link>
            </Button>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
};
