import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { X, Check } from "lucide-react";

const comparisons = [
  {
    others: "Warteraum mit anderen Kunden",
    gentlehands: "Private Empfangslounge nur für Sie",
  },
  {
    others: "Standardisierte 50-Minuten-Slots",
    gentlehands: "Flexible Sessions ohne Zeitdruck",
  },
  {
    others: "Wechselndes Personal ohne Auswahl",
    gentlehands: "Ihre Wahl der Therapeutin/des Therapeuten",
  },
  {
    others: "Neutrale, klinische Räume",
    gentlehands: "Atmosphärische Themenräume",
  },
  {
    others: "Massenabfertigung",
    gentlehands: "Limitierte Termine, volle Aufmerksamkeit",
  },
];

export const DifferentiatorSection = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Ambient effects */}
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-destructive/3 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-80 h-80 bg-copper/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container-wide relative">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <motion.div className="flex items-center justify-center gap-4 mb-6">
            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-copper to-transparent w-12"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
            <span className="text-copper font-medium tracking-[0.2em] uppercase text-xs">
              Der Unterschied
            </span>
            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-copper to-transparent w-12"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
          </motion.div>

          <h2 className="text-foreground text-3xl md:text-4xl lg:text-5xl mb-6">
            Warum <span className="text-gradient-copper">GentleHands</span>?
          </h2>
        </ScrollReveal>

        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto">
          {/* Headers */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Anderswo
              </span>
            </div>
            <div className="text-center">
              <span className="text-sm font-medium text-copper uppercase tracking-wider">
                Bei GentleHands
              </span>
            </div>
          </div>

          {/* Rows */}
          <div className="space-y-4">
            {comparisons.map((item, index) => (
              <ScrollReveal key={index} direction="up" delay={index * 0.08}>
                <motion.div
                  className="grid grid-cols-2 gap-4"
                  whileHover={{ scale: 1.01 }}
                >
                  {/* Others */}
                  <div className="p-4 rounded-xl bg-muted/50 border border-border flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                      <X size={16} className="text-destructive" />
                    </div>
                    <span className="text-muted-foreground text-sm">
                      {item.others}
                    </span>
                  </div>

                  {/* GentleHands */}
                  <div className="p-4 rounded-xl bg-copper/5 border border-copper/20 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-copper/15 flex items-center justify-center shrink-0">
                      <Check size={16} className="text-copper" />
                    </div>
                    <span className="text-foreground text-sm font-medium">
                      {item.gentlehands}
                    </span>
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
