import { motion } from "framer-motion";
import { Brain, Heart, Moon, Zap, Sparkles, Shield } from "lucide-react";

const benefits = [
  {
    icon: Brain,
    title: "Mentale Klarheit",
    description: "Gedankenkarussell stoppen und zur Ruhe kommen",
  },
  {
    icon: Heart,
    title: "Emotionale Balance",
    description: "Stress abbauen und innere Ruhe finden",
  },
  {
    icon: Moon,
    title: "Besserer Schlaf",
    description: "Tiefere Erholung durch Nervensystem-Regulation",
  },
  {
    icon: Zap,
    title: "Mehr Energie",
    description: "Verspannungen lösen, Lebenskraft aktivieren",
  },
  {
    icon: Sparkles,
    title: "Körperbewusstsein",
    description: "Wieder Zugang zum eigenen Körper finden",
  },
  {
    icon: Shield,
    title: "Immunstärkung",
    description: "Ganzheitliche Unterstützung Ihres Wohlbefindens",
  },
];

export const MassageBenefitsGrid = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-foreground mb-4">Was unsere Massagen bewirken</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Jede Session ist eine Investition in Ihr Wohlbefinden
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-secondary/50 to-secondary/30 border border-border/50 group"
            >
              <motion.div
                className="w-14 h-14 mb-4 rounded-2xl bg-copper/10 flex items-center justify-center group-hover:bg-copper/20 transition-colors"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <benefit.icon size={28} className="text-copper" />
              </motion.div>
              <h3 className="font-display text-lg text-foreground mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
