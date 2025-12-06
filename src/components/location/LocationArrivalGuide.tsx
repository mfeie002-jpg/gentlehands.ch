import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Train, Car, Footprints, Clock, Coffee, DoorOpen } from "lucide-react";

const arrivalSteps = [
  {
    icon: DoorOpen,
    title: "Ankunft",
    description: "Klingeln Sie an der Tür, wir empfangen Sie persönlich.",
    time: "0 Min"
  },
  {
    icon: Coffee,
    title: "Willkommen",
    description: "Entspannen Sie bei einem Glas Wasser oder Tee in der Lounge.",
    time: "5 Min"
  },
  {
    icon: Clock,
    title: "Vorbereitung",
    description: "Wir besprechen Ihre Wünsche und bereiten alles vor.",
    time: "5-10 Min"
  },
];

export const LocationArrivalGuide = () => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container-wide">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-foreground text-2xl md:text-3xl mb-4">
            Was Sie bei Ihrer Ankunft erwartet
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Kein Stress, keine Hektik – wir nehmen uns Zeit für einen entspannten Start.
          </p>
        </ScrollReveal>

        <div className="relative max-w-3xl mx-auto">
          {/* Connecting line */}
          <div className="absolute top-8 left-8 bottom-8 w-0.5 bg-gradient-to-b from-copper via-copper/50 to-copper/20 hidden md:block" />

          <div className="space-y-8">
            {arrivalSteps.map((step, index) => (
              <ScrollReveal key={step.title} direction="left" delay={index * 0.1}>
                <motion.div
                  className="flex items-start gap-6 relative"
                  whileHover={{ x: 8 }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-copper/10 flex items-center justify-center shrink-0 relative z-10 border-4 border-background">
                    <step.icon className="w-7 h-7 text-copper" />
                  </div>
                  <div className="flex-1 p-6 rounded-2xl bg-card border border-border/50 hover:border-copper/30 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-foreground font-medium text-lg">{step.title}</h3>
                      <span className="text-copper text-sm font-medium bg-copper/10 px-2 py-0.5 rounded-full">
                        {step.time}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
