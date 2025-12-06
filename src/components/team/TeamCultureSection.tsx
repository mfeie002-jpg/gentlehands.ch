import { motion } from "framer-motion";
import { Heart, Shield, Star, Sparkles } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Echte Präsenz",
    description: "Jede Berührung ist bewusst und aufmerksam. Wir sind vollständig bei Ihnen.",
  },
  {
    icon: Shield,
    title: "Absolute Sicherheit",
    description: "Ihr Wohlbefinden und Ihre Grenzen haben immer oberste Priorität.",
  },
  {
    icon: Star,
    title: "Kontinuierliches Wachstum",
    description: "Regelmässige Weiterbildungen halten uns auf höchstem Niveau.",
  },
  {
    icon: Sparkles,
    title: "Intuitive Kompetenz",
    description: "Jahrelange Erfahrung ermöglicht uns, genau zu spüren, was Sie brauchen.",
  },
];

export const TeamCultureSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-foreground mb-4">Unsere Werte</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Was uns als Team verbindet und unsere Arbeit prägt
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-card border border-border/50 text-center group"
            >
              <motion.div
                className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-copper/10 flex items-center justify-center group-hover:bg-copper/20 transition-colors"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <value.icon size={28} className="text-copper" />
              </motion.div>
              <h3 className="font-display text-lg text-foreground mb-2">{value.title}</h3>
              <p className="text-sm text-muted-foreground">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
