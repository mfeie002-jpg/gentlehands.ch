import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Brain, Battery, Heart, Smile, Moon, Zap } from "lucide-react";

const benefits = [
  {
    icon: Brain,
    title: "Gedankenkarussell stoppen",
    description: "Finden Sie Ruhe vor den ständigen Anforderungen des Alltags.",
    color: "petrol",
  },
  {
    icon: Battery,
    title: "Energie auftanken",
    description: "Verlassen Sie uns mit neuer Kraft und Leichtigkeit.",
    color: "copper",
  },
  {
    icon: Heart,
    title: "Bei sich ankommen",
    description: "Spüren Sie wieder, was Ihr Körper wirklich braucht.",
    color: "petrol",
  },
  {
    icon: Smile,
    title: "Wohlbefinden steigern",
    description: "Regelmässige Massage verbessert nachweislich die Lebensqualität.",
    color: "copper",
  },
  {
    icon: Moon,
    title: "Besser schlafen",
    description: "Tiefe Entspannung fördert erholsamen Schlaf.",
    color: "petrol",
  },
  {
    icon: Zap,
    title: "Stress abbauen",
    description: "Senken Sie Ihr Cortisol-Level und aktivieren Sie Ihr Nervensystem.",
    color: "copper",
  },
];

export const EmotionalBenefitsSection = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-background to-secondary/10 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-copper/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />

      <div className="container-wide relative">
        <ScrollReveal className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-copper to-transparent w-12" />
            <span className="text-copper font-medium tracking-[0.2em] uppercase text-xs">
              Wirkung
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-copper to-transparent w-12" />
          </div>
          <h2 className="text-foreground mb-4">
            Was Sie bei uns <span className="text-gradient-copper">erwartet</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Mehr als nur Entspannung – eine Investition in Ihr ganzheitliches Wohlbefinden.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <ScrollReveal key={benefit.title} delay={index * 0.08}>
              <motion.div
                className="group relative p-6 rounded-2xl bg-card border border-border hover:border-copper/30 transition-all duration-500"
                whileHover={{ y: -4 }}
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl ${benefit.color === 'copper' ? 'bg-copper/10' : 'bg-petrol/10'} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <benefit.icon className={`w-6 h-6 ${benefit.color === 'copper' ? 'text-copper' : 'text-petrol'}`} />
                </div>

                <h3 className="text-lg font-display text-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>

                {/* Decorative line */}
                <div className={`absolute bottom-0 left-6 right-6 h-px ${benefit.color === 'copper' ? 'bg-copper/0 group-hover:bg-copper/30' : 'bg-petrol/0 group-hover:bg-petrol/30'} transition-colors duration-500`} />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
