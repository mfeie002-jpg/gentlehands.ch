import { motion } from "framer-motion";
import { GlowCard } from "@/components/shared/GlowCard";

import massageBack from "@/assets/massage-hands-back.jpg";
import massageShoulders from "@/assets/massage-hands-shoulders.jpg";
import massageNeck from "@/assets/massage-hands-neck.jpg";
import massageLowerBack from "@/assets/massage-hands-lower-back.jpg";
import massageDeepRelease from "@/assets/massage-deep-release.jpg";
import massageStressReset from "@/assets/massage-stress-reset.jpg";

const benefits = [
  {
    image: massageBack,
    title: "Absolute Diskretion",
    description: "Ein geschützter Raum nur für Sie – ohne Blicke, ohne Urteile.",
  },
  {
    image: massageShoulders,
    title: "Ganzheitliche Entspannung",
    description: "Körper, Geist und Seele kommen gleichermassen zur Ruhe.",
  },
  {
    image: massageNeck,
    title: "Premium Erlebnis",
    description: "Hochwertigste Öle, Düfte und Atmosphären für alle Sinne.",
  },
  {
    image: massageLowerBack,
    title: "Keine Eile",
    description: "Jede Behandlung hat ihren eigenen Rhythmus – ohne Zeitdruck.",
  },
  {
    image: massageDeepRelease,
    title: "Persönliche Betreuung",
    description: "Ihre Therapeutin kennt Ihre Präferenzen und Bedürfnisse.",
  },
  {
    image: massageStressReset,
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
              <GlowCard className="h-full overflow-hidden">
                <div className="h-full">
                  <div className="relative h-48 overflow-hidden">
                    <motion.img
                      src={benefit.image}
                      alt={benefit.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-display text-foreground mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
