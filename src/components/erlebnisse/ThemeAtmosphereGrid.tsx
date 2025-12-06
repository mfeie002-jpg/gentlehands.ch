import { motion } from "framer-motion";
import { Palette, Music, Wind, Lightbulb } from "lucide-react";

const elements = [
  {
    icon: Palette,
    title: "Visuelle Gestaltung",
    description: "Jeder Raum ist bis ins Detail gestaltet – von der Farbgebung bis zur Dekoration.",
  },
  {
    icon: Music,
    title: "Sounddesign",
    description: "Passende Ambient-Klänge oder Naturgeräusche für jedes Theme.",
  },
  {
    icon: Wind,
    title: "Duftkonzept",
    description: "Sorgfältig ausgewählte ätherische Öle und Düfte für jede Atmosphäre.",
  },
  {
    icon: Lightbulb,
    title: "Lichtdesign",
    description: "Von warmem Kerzenlicht bis zu beruhigenden Projektionen.",
  },
];

export const ThemeAtmosphereGrid = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-foreground mb-4">Die Elemente unserer Welten</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Jedes Theme ist eine durchdachte Komposition aller Sinne
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {elements.map((element, index) => (
            <motion.div
              key={element.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-card border border-border/50 text-center group"
            >
              <motion.div
                className="w-14 h-14 mx-auto mb-4 rounded-full bg-copper/10 flex items-center justify-center group-hover:bg-copper/20 transition-colors"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <element.icon size={28} className="text-copper" />
              </motion.div>
              <h3 className="font-display text-lg text-foreground mb-2">{element.title}</h3>
              <p className="text-sm text-muted-foreground">{element.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
