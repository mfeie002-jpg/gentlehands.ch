import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LazyImage } from "@/components/shared/LazyImage";

import safetyControl from "@/assets/safety-control.jpg";
import emotionalTherapistHands from "@/assets/emotional-therapist-hands.jpg";
import privacyDiscreet from "@/assets/privacy-discreet.jpg";
import philosophyCaringTherapist from "@/assets/philosophy-caring-therapist.jpg";

const values = [
  {
    image: safetyControl,
    title: "Absolute Sicherheit",
    description:
      "Ein geschützter Raum, in dem Sie sich vollständig fallen lassen können. Ohne Urteile, ohne Erwartungen.",
  },
  {
    image: emotionalTherapistHands,
    title: "Achtsame Berührung",
    description:
      "Jede Berührung erfolgt mit höchster Präsenz und Respekt. Ihre Grenzen werden jederzeit gewahrt.",
  },
  {
    image: privacyDiscreet,
    title: "Vollkommene Diskretion",
    description:
      "Ihre Privatsphäre ist uns heilig. Diskreter Standort, keine Datensammlung, absolute Vertraulichkeit.",
  },
  {
    image: philosophyCaringTherapist,
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
        <ScrollReveal className="max-w-3xl mx-auto text-center mb-10 sm:mb-16 px-4 sm:px-0">
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

          <h2 className="text-foreground text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6">
            Ein Ort, an dem Sie <span className="text-gradient-copper">wirklich loslassen</span> können
          </h2>

          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            GentleHands ist mehr als ein Massage-Studio. Es ist ein Rückzugsort, 
            an dem gestresste Frauen zur Ruhe kommen – in einer Atmosphäre, 
            die auf Vertrauen, Respekt und höchste Professionalität gebaut ist.
          </p>
        </ScrollReveal>

        {/* Values Grid with Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-16 px-4 sm:px-0">
          {values.map((value, index) => (
            <ScrollReveal key={value.title} direction="up" delay={index * 0.1}>
              <motion.div
                className="group h-full rounded-2xl bg-card border border-border hover:border-copper/30 transition-all duration-300 overflow-hidden"
                whileHover={{ y: -4 }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <LazyImage
                    src={value.image}
                    alt={value.title}
                    className="transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-display text-foreground mb-2 group-hover:text-copper transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Important Clarification */}
        <ScrollReveal className="px-4 sm:px-0">
          <motion.div
            className="max-w-3xl mx-auto text-center p-6 sm:p-8 rounded-2xl bg-secondary/50 border border-border"
            whileHover={{ scale: 1.01 }}
          >
            <motion.div
              className="w-12 h-12 mx-auto mb-4 rounded-full bg-petrol/10 flex items-center justify-center"
              whileHover={{ rotate: 12 }}
            >
              <Sparkles size={24} className="text-petrol" />
            </motion.div>
            <h3 className="text-lg sm:text-xl font-display text-foreground mb-2 sm:mb-3">
              Ein klares Versprechen
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
              GentleHands bietet ausschliesslich professionelle Entspannungsmassagen an. 
              «Sinnlich» bedeutet bei uns: auf die Sinne bezogen – Licht, Klänge, Düfte, Atmosphäre. 
              Wir sind kein Erotikstudio. Bei uns stehen Ihr Wohlbefinden, Ihre Grenzen und 
              Ihre Entspannung im Mittelpunkt – nichts anderes.
            </p>
            <Button variant="ghost" size="sm" asChild className="group">
              <Link to="/philosophie">
                Mehr über unsere Philosophie
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
};