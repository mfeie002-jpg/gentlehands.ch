import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Shield, Award, Lock, Heart, Users, Star, Clock, Leaf } from "lucide-react";

const factors = [
  { icon: Shield, label: "Nur für Frauen", color: "copper" },
  { icon: Award, label: "Zertifiziert", color: "petrol" },
  { icon: Lock, label: "100% Diskret", color: "copper" },
  { icon: Heart, label: "Achtsam", color: "petrol" },
  { icon: Users, label: "2000+ Kundinnen", color: "copper" },
  { icon: Star, label: "4.9 Bewertung", color: "petrol" },
  { icon: Clock, label: "8 Jahre Erfahrung", color: "copper" },
  { icon: Leaf, label: "Nachhaltig", color: "petrol" },
];

export const TrustFactorsGrid = () => {
  return (
    <section className="py-8 bg-background">
      <div className="container-wide">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {factors.map((factor, index) => (
            <motion.div
              key={factor.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -2 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border ${
                factor.color === 'copper' 
                  ? 'bg-copper/5 border-copper/20 hover:border-copper/40' 
                  : 'bg-petrol/5 border-petrol/20 hover:border-petrol/40'
              } transition-all cursor-default`}
            >
              <factor.icon size={14} className={factor.color === 'copper' ? 'text-copper' : 'text-petrol'} />
              <span className="text-foreground text-sm">{factor.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
