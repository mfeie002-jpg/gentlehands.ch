import { motion } from "framer-motion";
import { Shield, Award, Lock, Heart } from "lucide-react";

const badges = [
  { icon: Shield, label: "100% Sicher" },
  { icon: Award, label: "Zertifiziert" },
  { icon: Lock, label: "Diskret" },
  { icon: Heart, label: "Achtsam" },
];

export const TrustBadgesFloat = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5 }}
      className="fixed bottom-4 left-4 z-40 hidden lg:flex items-center gap-2 bg-card/90 backdrop-blur-sm px-4 py-2 rounded-full border border-border shadow-lg"
    >
      {badges.map((badge, index) => (
        <motion.div
          key={badge.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6 + index * 0.1 }}
          className="flex items-center gap-1.5"
        >
          <badge.icon size={14} className="text-copper" />
          <span className="text-xs text-muted-foreground">{badge.label}</span>
          {index < badges.length - 1 && <span className="text-border mx-1">•</span>}
        </motion.div>
      ))}
    </motion.div>
  );
};
