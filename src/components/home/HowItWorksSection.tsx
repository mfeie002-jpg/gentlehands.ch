import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Sparkles, User, Settings, Calendar } from "lucide-react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    icon: Sparkles,
    step: "01",
    title: "Erlebnis wählen",
    description:
      "Wählen Sie Ihr atmosphärisches Theme – von Ozean-Ambiente bis Alpine Stille.",
    color: "from-petrol/20 to-petrol/5",
  },
  {
    icon: User,
    step: "02",
    title: "Masseur:in auswählen",
    description:
      "Entscheiden Sie sich für eine Person oder lassen Sie uns intuitiv wählen.",
    color: "from-copper/20 to-copper/5",
  },
  {
    icon: Settings,
    step: "03",
    title: "Präferenzen definieren",
    description:
      "Musik, Berührungsintensität, Gesprächswunsch – oder alles als Überraschung.",
    color: "from-forest/20 to-forest/5",
  },
  {
    icon: Calendar,
    step: "04",
    title: "Termin bestätigen",
    description:
      "Wählen Sie Ihren Wunschtermin und tauchen Sie ein in Ihr Erlebnis.",
    color: "from-petrol/20 to-petrol/5",
  },
];

const StepCard = ({ step, index }: { step: typeof steps[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <ScrollReveal direction="up" delay={index * 0.15}>
      <motion.div
        ref={ref}
        className="relative"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Connector Line (hidden on mobile, last item) */}
        {index < steps.length - 1 && (
          <div className="hidden lg:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-copper/50 to-primary/50"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
              style={{ originX: 0 }}
            />
          </div>
        )}

        <div className="text-center group">
          {/* Icon Container */}
          <motion.div 
            className="relative inline-flex items-center justify-center w-20 h-20 mb-6"
            animate={isHovered ? { y: -4 } : { y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.div 
              className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-2xl`}
              animate={isHovered ? { rotate: 12, scale: 1.1 } : { rotate: 6, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
            <motion.div 
              className="relative bg-card rounded-2xl w-full h-full flex items-center justify-center shadow-sm border border-border overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              <step.icon size={28} className="text-primary relative z-10" />
              {/* Shimmer on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                initial={{ x: "-100%" }}
                animate={isHovered ? { x: "100%" } : { x: "-100%" }}
                transition={{ duration: 0.6 }}
              />
            </motion.div>
            {/* Step Number */}
            <motion.span 
              className="absolute -top-2 -right-2 w-7 h-7 bg-copper text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center shadow-copper"
              whileHover={{ scale: 1.1, rotate: 12 }}
            >
              {step.step}
            </motion.span>
          </motion.div>

          {/* Content */}
          <motion.h3 
            className="text-xl font-display mb-3 text-foreground"
            animate={isHovered ? { color: "hsl(var(--primary))" } : {}}
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
  return (
    <section className="section-padding bg-secondary/30 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-petrol/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-copper/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      
      <div className="container-wide relative">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <motion.div className="flex items-center justify-center gap-4 mb-6">
            <motion.div 
              className="h-px bg-copper/30 w-16"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
            <p className="text-copper font-medium tracking-[0.2em] uppercase text-xs">
              Ihr Weg zur Entspannung
            </p>
            <motion.div 
              className="h-px bg-copper/30 w-16"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step, index) => (
            <StepCard key={step.step} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
