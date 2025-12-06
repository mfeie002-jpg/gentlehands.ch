import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Droplets, Leaf, Flower2, Wind, Sun, Sparkles } from "lucide-react";

const scents = [
  { icon: Droplets, name: "Meersalz & Kokos", theme: "Ocean & Palmen", mood: "Urlaubsfeeling" },
  { icon: Leaf, name: "Zirbe & Bergluft", theme: "Alpine Stille", mood: "Erdung" },
  { icon: Sparkles, name: "Sandelholz & Weihrauch", theme: "Deep Dark", mood: "Tiefenentspannung" },
  { icon: Flower2, name: "Bambus & Grüntee", theme: "Zen Garden", mood: "Harmonie" },
  { icon: Wind, name: "Zedernholz & Amber", theme: "Urban Loft", mood: "Klarheit" },
  { icon: Sun, name: "Überraschung", theme: "Surprise", mood: "Intuition" },
];

export const ScentPreviewSection = () => {
  return (
    <section className="section-padding-sm bg-gradient-to-r from-copper/5 via-background to-petrol/5">
      <div className="container-wide">
        <ScrollReveal className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-copper/10 px-4 py-2 rounded-full mb-4">
            <Droplets size={14} className="text-copper" />
            <span className="text-copper text-sm font-medium">Aromatherapie</span>
          </div>
          <h2 className="text-foreground text-2xl md:text-3xl mb-4">
            Düfte, die Ihre <span className="text-gradient-copper">Sinne</span> verwöhnen
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Jeder Themenraum hat seinen eigenen, sorgfältig komponierten Duft.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {scents.map((scent, index) => (
            <ScrollReveal key={scent.name} delay={index * 0.05}>
              <motion.div
                className="text-center p-4 rounded-xl bg-card/50 border border-border/50 hover:border-copper/30 transition-all group"
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <motion.div
                  className="w-12 h-12 rounded-xl bg-copper/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-copper/20 transition-colors"
                  whileHover={{ rotate: 12 }}
                >
                  <scent.icon size={22} className="text-copper" />
                </motion.div>
                <p className="text-foreground font-medium text-sm mb-1">{scent.name}</p>
                <p className="text-copper text-xs mb-1">{scent.theme}</p>
                <p className="text-muted-foreground text-xs">{scent.mood}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
