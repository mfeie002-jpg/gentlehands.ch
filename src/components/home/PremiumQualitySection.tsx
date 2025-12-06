import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Award, Leaf, Heart, GraduationCap, Shield, Sparkles } from "lucide-react";

const qualities = [
  {
    icon: GraduationCap,
    title: "Diplomierte Fachkräfte",
    description: "Alle Therapeut:innen sind staatlich anerkannt und regelmässig weitergebildet.",
  },
  {
    icon: Leaf,
    title: "Premium-Produkte",
    description: "Nur hochwertige, natürliche Öle und Pflegeprodukte aus nachhaltiger Produktion.",
  },
  {
    icon: Shield,
    title: "Höchste Hygienestandards",
    description: "Medizinische Hygieneanforderungen für Ihre Sicherheit und Ihr Wohlbefinden.",
  },
  {
    icon: Heart,
    title: "Traumasensible Ausbildung",
    description: "Unser Team ist im achtsamen Umgang mit sensiblen Situationen geschult.",
  },
];

export const PremiumQualitySection = () => {
  return (
    <section className="section-padding-sm bg-card border-y border-border relative">
      <div className="container-wide">
        <ScrollReveal className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-copper/10 px-4 py-2 rounded-full mb-4">
            <Award size={14} className="text-copper" />
            <span className="text-copper text-sm font-medium">Premium-Qualität</span>
          </div>
          <h2 className="text-foreground text-2xl md:text-3xl">
            Höchste Standards für Ihr <span className="text-gradient-copper">Wohlbefinden</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {qualities.map((quality, index) => (
            <ScrollReveal key={quality.title} delay={index * 0.1}>
              <motion.div
                className="text-center group"
                whileHover={{ y: -4 }}
              >
                <div className="w-14 h-14 rounded-2xl bg-copper/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-copper/20 transition-colors">
                  <quality.icon className="w-7 h-7 text-copper" />
                </div>
                <h3 className="text-foreground font-display font-medium mb-2">{quality.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{quality.description}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
