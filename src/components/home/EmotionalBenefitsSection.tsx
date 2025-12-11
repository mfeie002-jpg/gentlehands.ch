import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { LazyImage } from "@/components/shared/LazyImage";

// Import emotional images
import stressReleaseImage from "@/assets/emotional-stress-release.jpg";
import mentalClarityImage from "@/assets/emotional-mental-clarity.jpg";
import bodyAwarenessImage from "@/assets/emotional-body-awareness.jpg";
import freedomImage from "@/assets/emotional-freedom.jpg";
import innerPeaceImage from "@/assets/emotional-inner-peace.jpg";
import deepRestImage from "@/assets/emotional-deep-rest.jpg";
import relaxedFaceImage from "@/assets/emotional-relaxed-face.jpg";
import therapistHandsImage from "@/assets/emotional-therapist-hands.jpg";

const benefits = [
  {
    image: stressReleaseImage,
    title: "Gedankenkarussell stoppen",
    description: "Endlich Ruhe im Kopf. Die ständigen To-Dos, Sorgen und Grübeleien verstummen.",
    feeling: "Wie ein Reset-Knopf für den Geist",
  },
  {
    image: mentalClarityImage,
    title: "Energie auftanken",
    description: "Nicht die erschöpfte Müdigkeit – sondern echte, lebendige Kraft zurückbekommen.",
    feeling: "Wie aufwachen nach tiefstem Schlaf",
  },
  {
    image: bodyAwarenessImage,
    title: "Bei sich ankommen",
    description: "Spüren Sie wieder, was Ihr Körper braucht. Verbinden Sie sich mit sich selbst.",
    feeling: "Endlich wieder ganz bei mir",
  },
  {
    image: freedomImage,
    title: "Leichtigkeit spüren",
    description: "Die Last fällt von den Schultern. Für einen Moment ist alles gut, so wie es ist.",
    feeling: "Wie Schweben auf Wolken",
  },
  {
    image: deepRestImage,
    title: "Tief schlafen",
    description: "Abends einschlafen, morgens erholt aufwachen. So wie es sein sollte.",
    feeling: "Endlich wieder durchschlafen",
  },
  {
    image: relaxedFaceImage,
    title: "Frei atmen",
    description: "Die Enge in der Brust löst sich. Jeder Atemzug wird tiefer und freier.",
    feeling: "Wie zum ersten Mal richtig atmen",
  },
  {
    image: innerPeaceImage,
    title: "Weiblichkeit feiern",
    description: "In einer Welt, die Stärke fordert: Weichheit als Kraft wiederentdecken.",
    feeling: "Sich als Frau wertgeschätzt fühlen",
  },
  {
    image: therapistHandsImage,
    title: "Nervensystem regulieren",
    description: "Vom Kampf-oder-Flucht-Modus zurück in Balance. Ruhe, die von innen kommt.",
    feeling: "Tiefe Entspannung auf Zellebene",
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
                className="group relative h-full rounded-2xl overflow-hidden bg-card border border-border hover:border-copper/30 transition-all duration-500"
                whileHover={{ y: -4 }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <LazyImage
                    src={benefit.image}
                    alt={benefit.title}
                    className="group-hover:scale-110 transition-transform duration-700"
                    aspectRatio="auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 -mt-8 relative">
                  <h3 className="text-lg font-display text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">{benefit.description}</p>
                  
                  {/* Emotional feeling tag */}
                  <p className="text-xs text-copper/80 italic">«{benefit.feeling}»</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
