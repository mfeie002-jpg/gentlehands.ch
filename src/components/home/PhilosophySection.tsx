import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Shield, Heart, Eye, Hand, Sparkles } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Absolute Sicherheit",
    description:
      "Ein geschützter Raum, in dem Sie sich vollständig fallen lassen können. Ohne Urteile, ohne Erwartungen.",
  },
  {
    icon: Heart,
    title: "Achtsame Berührung",
    description:
      "Jede Berührung erfolgt mit höchster Präsenz und Respekt. Ihre Grenzen werden jederzeit gewahrt.",
  },
  {
    icon: Eye,
    title: "Vollkommene Diskretion",
    description:
      "Ihre Privatsphäre ist uns heilig. Diskreter Standort, keine Datensammlung, absolute Vertraulichkeit.",
  },
  {
    icon: Hand,
    title: "Professionelle Qualität",
    description:
      "Alle Therapeut:innen sind umfassend ausgebildet und bringen jahrelange Erfahrung mit.",
  },
];

export const PhilosophySection = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-background via-secondary/20 to-background relative overflow-hidden">
      {/* Subtle ambient effects */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-copper/3 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-petrol/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="container-wide relative">
        {/* Header */}
        <ScrollReveal className="max-w-3xl mx-auto text-center mb-16">
          <motion.div className="flex items-center justify-center gap-4 mb-6">
            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-copper to-transparent w-16"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
            <span className="text-copper font-medium tracking-[0.2em] uppercase text-xs">
              Unsere Philosophie
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
            Ein Ort, an dem Sie <span className="text-gradient-copper">wirklich loslassen</span> können
          </h2>

          <p className="text-muted-foreground text-lg leading-relaxed">
            GentleHands ist mehr als ein Massage-Studio. Es ist ein Rückzugsort, 
            an dem gestresste Frauen zur Ruhe kommen – in einer Atmosphäre, 
            die auf Vertrauen, Respekt und höchste Professionalität gebaut ist.
          </p>
        </ScrollReveal>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {values.map((value, index) => (
            <ScrollReveal key={value.title} direction="up" delay={index * 0.1}>
              <motion.div
                className="group h-full p-6 rounded-2xl bg-card border border-border hover:border-copper/30 transition-all duration-300"
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <motion.div
                  className="w-14 h-14 rounded-xl bg-gradient-to-br from-copper/15 to-copper/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: 5 }}
                >
                  <value.icon size={26} className="text-copper" />
                </motion.div>
                <h3 className="text-lg font-display text-foreground mb-3 group-hover:text-copper transition-colors">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Important Clarification */}
        <ScrollReveal>
          <motion.div
            className="max-w-3xl mx-auto text-center p-8 rounded-2xl bg-secondary/50 border border-border"
            whileHover={{ scale: 1.01 }}
          >
            <motion.div
              className="w-12 h-12 mx-auto mb-4 rounded-full bg-petrol/10 flex items-center justify-center"
              whileHover={{ rotate: 12 }}
            >
              <Sparkles size={24} className="text-petrol" />
            </motion.div>
            <h3 className="text-xl font-display text-foreground mb-3">
              Ein klares Versprechen
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              GentleHands bietet ausschliesslich professionelle Entspannungsmassagen an. 
              «Sinnlich» bedeutet bei uns: auf die Sinne bezogen – Licht, Klänge, Düfte, Atmosphäre. 
              Wir sind kein Erotikstudio. Bei uns stehen Ihr Wohlbefinden, Ihre Grenzen und 
              Ihre Entspannung im Mittelpunkt – nichts anderes.
            </p>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
};
