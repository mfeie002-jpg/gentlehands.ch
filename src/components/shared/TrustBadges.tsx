import { motion } from "framer-motion";
import { Shield, Award, Heart, Lock, Star, Users } from "lucide-react";

const badges = [
  {
    icon: Shield,
    title: "100% Sicher",
    description: "Geschützter Raum nur für Frauen",
  },
  {
    icon: Award,
    title: "Zertifiziert",
    description: "Alle Masseur:innen diplomiert",
  },
  {
    icon: Heart,
    title: "Achtsam",
    description: "Trauma-sensitiver Ansatz",
  },
  {
    icon: Lock,
    title: "Diskret",
    description: "Absolute Vertraulichkeit",
  },
  {
    icon: Star,
    title: "Premium",
    description: "Höchste Qualitätsstandards",
  },
  {
    icon: Users,
    title: "Persönlich",
    description: "Individuelle Betreuung",
  },
];

export const TrustBadges = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
      {badges.map((badge, index) => (
        <motion.div
          key={badge.title}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="flex items-center gap-3 px-4 py-3 bg-card border border-border rounded-xl"
        >
          <badge.icon size={20} className="text-copper shrink-0" />
          <div>
            <p className="font-medium text-foreground text-sm">{badge.title}</p>
            <p className="text-xs text-muted-foreground">{badge.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
