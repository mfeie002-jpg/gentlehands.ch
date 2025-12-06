import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const combinations = [
  {
    theme: "Ozean & Palmen",
    massage: "Ganzkörper Tiefenentspannung",
    duration: "120 Min",
    tag: "Beliebteste Kombination",
  },
  {
    theme: "Deep Dark Relax",
    massage: "Deep Release Session",
    duration: "90 Min",
    tag: "Für Tiefenentspannung",
  },
  {
    theme: "Zen Garden",
    massage: "Emotional Grounding",
    duration: "90 Min",
    tag: "Für innere Ruhe",
  },
];

export const ThemeCombinationsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-foreground mb-4">Beliebte Kombinationen</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Perfekt abgestimmte Theme + Massage Paarungen
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {combinations.map((combo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-card border border-border/50 relative overflow-hidden group"
            >
              {/* Tag */}
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-copper/10 text-copper rounded-full">
                  <Star size={12} fill="currentColor" />
                  {combo.tag}
                </span>
              </div>

              <div className="mt-8 space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Theme</p>
                  <p className="font-display text-lg text-foreground">{combo.theme}</p>
                </div>
                <div className="flex items-center gap-2 text-copper">
                  <span className="text-lg">+</span>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Massage</p>
                  <p className="font-display text-lg text-foreground">{combo.massage}</p>
                </div>
                <div className="pt-4 border-t border-border/50">
                  <p className="text-sm text-muted-foreground">{combo.duration}</p>
                </div>
              </div>

              <Button variant="copper" className="w-full mt-6 group" asChild>
                <Link to="/buchung">
                  Diese Kombination buchen
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
