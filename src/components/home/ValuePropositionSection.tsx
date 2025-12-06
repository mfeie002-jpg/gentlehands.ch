import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Check, X } from "lucide-react";

const comparisons = [
  {
    label: "Personalisiertes Erlebnis",
    gentleHands: true,
    others: false,
  },
  {
    label: "Themenräume mit Atmosphäre",
    gentleHands: true,
    others: false,
  },
  {
    label: "Wahl der Therapeut:in",
    gentleHands: true,
    others: false,
  },
  {
    label: "Exklusiv für Frauen",
    gentleHands: true,
    others: false,
  },
  {
    label: "Limitierte Termine",
    gentleHands: true,
    others: false,
  },
  {
    label: "Professionelle Qualifikation",
    gentleHands: true,
    others: true,
  },
];

export const ValuePropositionSection = () => {
  return (
    <section className="section-padding-sm bg-gradient-to-b from-background to-secondary/10 relative overflow-hidden">
      <div className="container-narrow relative">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-foreground text-2xl md:text-3xl mb-4">
            Warum <span className="text-gradient-copper">GentleHands</span> wählen?
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Der Unterschied liegt im Detail – und in unserem Engagement für Ihr Wohlbefinden.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 bg-secondary/50 border-b border-border">
              <div className="p-4" />
              <div className="p-4 text-center border-l border-border">
                <span className="text-copper font-display font-medium">GentleHands</span>
              </div>
              <div className="p-4 text-center border-l border-border">
                <span className="text-muted-foreground text-sm">Andere Studios</span>
              </div>
            </div>

            {/* Rows */}
            {comparisons.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`grid grid-cols-3 ${index < comparisons.length - 1 ? 'border-b border-border' : ''}`}
              >
                <div className="p-4 text-sm text-foreground">
                  {item.label}
                </div>
                <div className="p-4 flex justify-center border-l border-border">
                  {item.gentleHands ? (
                    <div className="w-6 h-6 rounded-full bg-copper/20 flex items-center justify-center">
                      <Check size={14} className="text-copper" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                      <X size={14} className="text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="p-4 flex justify-center border-l border-border">
                  {item.others ? (
                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                      <Check size={14} className="text-muted-foreground" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                      <X size={14} className="text-muted-foreground/50" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
