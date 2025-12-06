import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Shield, RefreshCcw, CheckCircle } from "lucide-react";

const guarantees = [
  {
    icon: Shield,
    title: "100% Zufriedenheit",
    description: "Sollten Sie sich während der Session unwohl fühlen, brechen wir sofort ab – ohne Fragen, ohne Kosten.",
  },
  {
    icon: RefreshCcw,
    title: "Flexible Stornierung",
    description: "Termine können bis 24 Stunden vorher kostenfrei verschoben oder storniert werden.",
  },
  {
    icon: CheckCircle,
    title: "Qualitätsversprechen",
    description: "Nur diplomierte, geprüfte Therapeut:innen mit nachgewiesener Erfahrung arbeiten bei uns.",
  },
];

export const GuaranteeSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-petrol/5 via-background to-copper/5 border-y border-border/30 relative overflow-hidden">
      <div className="container-wide relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {guarantees.map((guarantee, index) => (
            <ScrollReveal key={guarantee.title} direction="up" delay={index * 0.1}>
              <motion.div
                className="flex items-start gap-4 text-center md:text-left md:flex-row flex-col md:items-start items-center"
                whileHover={{ x: 4 }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-copper/15 to-petrol/10 flex items-center justify-center shrink-0">
                  <guarantee.icon size={26} className="text-copper" />
                </div>
                <div>
                  <h3 className="text-lg font-display text-foreground mb-1">
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
