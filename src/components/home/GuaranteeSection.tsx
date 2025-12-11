import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { LazyImage } from "@/components/shared/LazyImage";

import safetyTrust from "@/assets/safety-trust.jpg";
import bookingFlexible from "@/assets/booking-flexible.jpg";
import safetyCare from "@/assets/safety-care.jpg";

const guarantees = [
  {
    image: safetyTrust,
    title: "100% Zufriedenheit",
    description: "Sollten Sie sich während der Session unwohl fühlen, brechen wir sofort ab – ohne Fragen, ohne Kosten.",
  },
  {
    image: bookingFlexible,
    title: "Flexible Stornierung",
    description: "Termine können bis 24 Stunden vorher kostenfrei verschoben oder storniert werden.",
  },
  {
    image: safetyCare,
    title: "Qualitätsversprechen",
    description: "Nur diplomierte, geprüfte Therapeut:innen mit nachgewiesener Erfahrung arbeiten bei uns.",
  },
];

export const GuaranteeSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-petrol/5 via-background to-copper/5 border-y border-border/30 relative overflow-hidden">
      <div className="container-wide relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guarantees.map((guarantee, index) => (
            <ScrollReveal key={guarantee.title} direction="up" delay={index * 0.1}>
              <motion.div
                className="group rounded-2xl bg-card border border-border overflow-hidden hover:border-copper/30 transition-all"
                whileHover={{ y: -4 }}
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <LazyImage
                    src={guarantee.image}
                    alt={guarantee.title}
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-display text-foreground mb-2 group-hover:text-copper transition-colors">
                    {guarantee.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {guarantee.description}
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