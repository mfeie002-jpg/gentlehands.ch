import { motion } from "framer-motion";
import { Shield, Heart, Sparkles, Clock, Users, Leaf } from "lucide-react";
import { GlowCard } from "@/components/shared/GlowCard";

const benefits = [
  {
    icon: Shield,
    title: "Absolute Diskretion",
    description: "Ein geschützter Raum nur für Sie – ohne Blicke, ohne Urteile.",
  },
  {
    icon: Heart,
    title: "Ganzheitliche Entspannung",
    description: "Körper, Geist und Seele kommen gleichermassen zur Ruhe.",
  },
  {
    icon: Sparkles,
    title: "Premium Erlebnis",
    description: "Hochwertigste Öle, Düfte und Atmosphären für alle Sinne.",
  },
  {
    icon: Clock,
    title: "Keine Eile",
    description: "Jede Behandlung hat ihren eigenen Rhythmus – ohne Zeitdruck.",
  },
  {
    icon: Users,
    title: "Persönliche Betreuung",
    description: "Ihre Therapeutin kennt Ihre Präferenzen und Bedürfnisse.",
  },
  {
    icon: Leaf,
    title: "Natürliche Produkte",
    description: "Bio-zertifizierte, nachhaltige Produkte für Ihre Haut.",
  },
];

export const BenefitsSection = () => {
  return (
    <section className="py-24 bg-background relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-copper uppercase tracking-[0.3em] text-sm font-medium">
            Warum GentleHands
          </span>
          <h2 className="text-3xl md:text-4xl font-display text-foreground mt-4 mb-6">
            Ihr Wohlbefinden, unsere Priorität
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Entdecken Sie, was GentleHands von gewöhnlichen Massagepraxen unterscheidet.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlowCard className="h-full">
                <div className="p-8 h-full">
                  <div className="w-14 h-14 rounded-full bg-copper/10 flex items-center justify-center mb-6 group-hover:bg-copper/20 transition-colors">
                    <benefit.icon className="w-7 h-7 text-copper" />
                  </div>
                  <h3 className="text-xl font-display text-foreground mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
