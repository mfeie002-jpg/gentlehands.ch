import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Leaf, Droplets, Recycle, Heart } from "lucide-react";

const practices = [
  { icon: Leaf, title: "Bio-Produkte", description: "Nur natürliche, biologische Öle und Pflegeprodukte" },
  { icon: Droplets, title: "Wassersparend", description: "Effiziente Wassernutzung in allen Bereichen" },
  { icon: Recycle, title: "Zero Waste", description: "Minimaler Abfall durch Recycling und Mehrweg" },
  { icon: Heart, title: "Fair Trade", description: "Ethisch beschaffte Materialien und Produkte" },
];

export const SustainabilitySection = () => {
  return (
    <section className="py-12 bg-forest/5 border-y border-forest/10">
      <div className="container-wide">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <ScrollReveal direction="left" className="lg:w-1/3">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-forest/15 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-forest" />
              </div>
              <span className="text-forest font-medium">Nachhaltigkeit</span>
            </div>
            <h3 className="text-xl font-display text-foreground mb-2">
              Wellness mit Verantwortung
            </h3>
            <p className="text-muted-foreground text-sm">
              Wir achten auf Nachhaltigkeit – für Ihr Wohlbefinden und das unseres Planeten.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="right" className="lg:w-2/3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {practices.map((practice, index) => (
                <motion.div
                  key={practice.title}
                  className="text-center p-4 rounded-xl bg-card/50 border border-forest/20 hover:border-forest/40 transition-all"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <practice.icon size={20} className="text-forest mx-auto mb-2" />
                  <p className="text-foreground text-sm font-medium">{practice.title}</p>
                  <p className="text-muted-foreground text-xs">{practice.description}</p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
