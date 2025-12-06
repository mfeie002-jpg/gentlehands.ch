import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Clock, Heart, MapPin, Shield } from "lucide-react";

const quickFacts = [
  { icon: MapPin, label: "Standort", value: "Zürich City" },
  { icon: Clock, label: "Öffnungszeiten", value: "Mo–Sa 10–21 Uhr" },
  { icon: Heart, label: "Zielgruppe", value: "Nur für Frauen" },
  { icon: Shield, label: "Qualität", value: "Diplomierte Therapeut:innen" },
];

export const QuickFactsBar = () => {
  return (
    <section className="py-8 bg-card border-y border-border/50">
      <div className="container-wide">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {quickFacts.map((fact, index) => (
            <ScrollReveal key={fact.label} direction="up" delay={index * 0.05}>
              <motion.div
                className="flex items-center gap-3 justify-center md:justify-start"
                whileHover={{ x: 4 }}
              >
                <div className="w-10 h-10 rounded-lg bg-copper/10 flex items-center justify-center shrink-0">
                  <fact.icon size={18} className="text-copper" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    {fact.label}
                  </p>
                  <p className="font-medium text-foreground text-sm">
                    {fact.value}
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
