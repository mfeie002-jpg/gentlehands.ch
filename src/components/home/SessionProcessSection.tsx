import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { MessageCircle, Coffee, Sparkles, Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const processSteps = [
  {
    icon: MessageCircle,
    number: "01",
    title: "Ankommen & Begrüssung",
    duration: "ca. 10 Min",
    description:
      "Sie werden persönlich empfangen. In ruhiger Atmosphäre besprechen wir kurz Ihre Wünsche, Präferenzen und eventuelle Bereiche, die Sie aussparen möchten.",
  },
  {
    icon: Sparkles,
    number: "02",
    title: "Eintauchen ins Erlebnis",
    duration: "60–120 Min",
    description:
      "In Ihrem gewählten Themenraum beginnt die Massage. Die Atmosphäre – Licht, Düfte, Musik – ist perfekt auf Ihr Erlebnis abgestimmt. Sie kontrollieren jederzeit Intensität und Tempo.",
  },
  {
    icon: Coffee,
    number: "03",
    title: "Sanftes Ausklingen",
    duration: "ca. 10 Min",
    description:
      "Nach der Massage dürfen Sie in Ruhe nachspüren. Ein warmes Getränk und Stille helfen beim sanften Übergang zurück in den Alltag.",
  },
  {
    icon: Heart,
    number: "04",
    title: "Auf Wiedersehen",
    duration: "ca. 5 Min",
    description:
      "Diskrete Abwicklung und bei Interesse direkte Buchung eines Folgetermins. Sie verlassen uns entspannt und gestärkt.",
  },
];

export const SessionProcessSection = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-secondary/30 via-muted/20 to-background relative overflow-hidden">
      {/* Ambient effects */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-copper/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-petrol/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-wide relative">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <motion.div className="flex items-center justify-center gap-4 mb-6">
            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-copper to-transparent w-16"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
            <span className="text-copper font-medium tracking-[0.2em] uppercase text-xs">
              Was Sie erwartet
            </span>
            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-copper to-transparent w-16"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
          </motion.div>

          <h2 className="text-foreground text-3xl md:text-4xl lg:text-5xl mb-6">
            So läuft Ihre <span className="text-gradient-copper">Session</span> ab
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Transparenz schafft Vertrauen. Hier erfahren Sie genau, 
            was Sie bei Ihrem Besuch bei GentleHands erwartet.
          </p>
        </ScrollReveal>

        {/* Process Timeline */}
        <div className="max-w-4xl mx-auto">
          {processSteps.map((step, index) => (
            <ScrollReveal key={step.number} direction="up" delay={index * 0.1}>
              <div className="relative flex gap-6 md:gap-8 pb-12 last:pb-0">
                {/* Timeline Line */}
                {index < processSteps.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-0 w-px bg-gradient-to-b from-copper/30 to-border hidden md:block" />
                )}

                {/* Number Badge */}
                <motion.div
                  className="relative shrink-0"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-copper to-copper-dark flex items-center justify-center text-accent-foreground font-bold text-sm shadow-copper">
                    {step.number}
                  </div>
                </motion.div>

                {/* Content Card */}
                <motion.div
                  className="flex-1 p-6 rounded-2xl bg-card border border-border hover:border-copper/20 transition-all duration-300 group"
                  whileHover={{ y: -2, scale: 1.01 }}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-copper/10 flex items-center justify-center group-hover:bg-copper/20 transition-colors">
                      <step.icon size={20} className="text-copper" />
                    </div>
                    <h3 className="text-lg font-display text-foreground group-hover:text-copper transition-colors">
                      {step.title}
                    </h3>
                    <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Reassurance & CTA */}
        <ScrollReveal className="mt-16">
          <motion.div
            className="max-w-2xl mx-auto text-center p-8 rounded-2xl bg-gradient-to-br from-copper/5 via-secondary/30 to-petrol/5 border border-copper/10"
            whileHover={{ scale: 1.01 }}
          >
            <h3 className="text-xl font-display text-foreground mb-4">
              Sie haben jederzeit die volle Kontrolle
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Wenn Ihnen etwas unangenehm ist – Musik, Druck, ein Bereich – 
              sagen Sie es einfach. Wir passen uns sofort an. 
              Ihr Wohlbefinden hat oberste Priorität.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="copper" size="lg" asChild className="group shadow-copper">
                <Link to="/buchung">
                  Erlebnis anfragen
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-copper/30 hover:border-copper hover:bg-copper/5">
                <Link to="/vorbereitung">
                  Vorbereitungstipps
                </Link>
              </Button>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
};
