import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Phone, Calendar, Sparkles, Heart, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Phone,
    title: "Kontakt aufnehmen",
    description: "Kontaktieren Sie uns für eine unverbindliche Beratung. Wir nehmen uns Zeit für Ihre Fragen.",
  },
  {
    number: "02",
    icon: Calendar,
    title: "Termin vereinbaren",
    description: "Wählen Sie Ihr Erlebnis, Ihre Therapeut:in und einen passenden Termin.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Ankommen & Entspannen",
    description: "Lassen Sie sich von der Atmosphäre einhüllen und den Alltag hinter sich.",
  },
  {
    number: "04",
    icon: Heart,
    title: "Tiefenentspannung erleben",
    description: "Geniessen Sie Ihr personalisiertes Erlebnis in sicherer, professioneller Umgebung.",
  },
];

export const WellnessJourneySection = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-secondary/20 to-background relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-petrol/5 rounded-full blur-[150px]" />

      <div className="container-wide relative">
        <ScrollReveal className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-copper to-transparent w-12" />
            <span className="text-copper font-medium tracking-[0.2em] uppercase text-xs">
              Ihre Reise
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-copper to-transparent w-12" />
          </div>
          <h2 className="text-foreground mb-4">
            Der Weg zu Ihrer <span className="text-gradient-copper">Entspannung</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            In vier einfachen Schritten zu Ihrem persönlichen Wellness-Erlebnis.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <ScrollReveal key={step.number} delay={index * 0.15}>
              <motion.div
                className="relative group"
                whileHover={{ y: -4 }}
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-px">
                    <div className="w-full h-full bg-gradient-to-r from-copper/30 via-copper/20 to-transparent" />
                    <motion.div
                      className="absolute top-1/2 right-0 -translate-y-1/2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ArrowRight size={14} className="text-copper/40" />
                    </motion.div>
                  </div>
                )}

                <div className="bg-card rounded-2xl p-6 border border-border hover:border-copper/30 transition-all duration-500 h-full">
                  {/* Number Badge */}
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl font-display text-copper/20 group-hover:text-copper/40 transition-colors">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-copper/10 flex items-center justify-center group-hover:bg-copper/20 transition-colors">
                      <step.icon className="w-5 h-5 text-copper" />
                    </div>
                  </div>

                  <h3 className="text-lg font-display text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
