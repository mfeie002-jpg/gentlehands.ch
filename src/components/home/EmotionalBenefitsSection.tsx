import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Brain, Battery, Heart, Smile, Moon, Zap, Flower2, Wind } from "lucide-react";

const benefits = [
  {
    icon: Brain,
    title: "Gedankenkarussell stoppen",
    description: "Endlich Ruhe im Kopf. Die ständigen To-Dos, Sorgen und Grübeleien verstummen.",
    feeling: "Wie ein Reset-Knopf für den Geist",
    color: "petrol",
  },
  {
    icon: Battery,
    title: "Energie auftanken",
    description: "Nicht die erschöpfte Müdigkeit – sondern echte, lebendige Kraft zurückbekommen.",
    feeling: "Wie aufwachen nach tiefstem Schlaf",
    color: "copper",
  },
  {
    icon: Heart,
    title: "Bei sich ankommen",
    description: "Spüren Sie wieder, was Ihr Körper braucht. Verbinden Sie sich mit sich selbst.",
    feeling: "Endlich wieder ganz bei mir",
    color: "petrol",
  },
  {
    icon: Smile,
    title: "Leichtigkeit spüren",
    description: "Die Last fällt von den Schultern. Für einen Moment ist alles gut, so wie es ist.",
    feeling: "Wie Schweben auf Wolken",
    color: "copper",
  },
  {
    icon: Moon,
    title: "Tief schlafen",
    description: "Abends einschlafen, morgens erholt aufwachen. So wie es sein sollte.",
    feeling: "Endlich wieder durchschlafen",
    color: "petrol",
  },
  {
    icon: Wind,
    title: "Frei atmen",
    description: "Die Enge in der Brust löst sich. Jeder Atemzug wird tiefer und freier.",
    feeling: "Wie zum ersten Mal richtig atmen",
    color: "copper",
  },
  {
    icon: Flower2,
    title: "Weiblichkeit feiern",
    description: "In einer Welt, die Stärke fordert: Weichheit als Kraft wiederentdecken.",
    feeling: "Sich als Frau wertgeschätzt fühlen",
    color: "petrol",
  },
  {
    icon: Zap,
    title: "Nervensystem regulieren",
    description: "Vom Kampf-oder-Flucht-Modus zurück in Balance. Ruhe, die von innen kommt.",
    feeling: "Tiefe Entspannung auf Zellebene",
    color: "copper",
  },
];

export const EmotionalBenefitsSection = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-background to-secondary/10 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-copper/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/3 left-0 w-[300px] h-[300px] bg-rose-500/3 rounded-full blur-[100px] -translate-x-1/2" />

      <div className="container-wide relative">
        <ScrollReveal className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-copper to-transparent w-12" />
            <span className="text-copper font-medium tracking-[0.2em] uppercase text-xs">
              Was Sie erwartet
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-copper to-transparent w-12" />
          </div>
          <h2 className="text-foreground mb-4">
            Mehr als nur <span className="text-gradient-copper">Entspannung</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Eine Investition in Ihr Wohlbefinden, die Sie auf allen Ebenen spüren werden.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <ScrollReveal key={benefit.title} delay={index * 0.06}>
              <motion.div
                className="group relative h-full p-6 rounded-2xl bg-card border border-border hover:border-copper/30 transition-all duration-500"
                whileHover={{ y: -4 }}
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl ${benefit.color === 'copper' ? 'bg-copper/10' : 'bg-petrol/10'} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <benefit.icon className={`w-6 h-6 ${benefit.color === 'copper' ? 'text-copper' : 'text-petrol'}`} />
                </div>

                <h3 className="text-lg font-display text-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">{benefit.description}</p>
                
                {/* Emotional feeling tag */}
                <p className="text-xs text-copper/80 italic">«{benefit.feeling}»</p>

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
