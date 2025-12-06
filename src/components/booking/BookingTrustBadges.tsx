import { motion } from "framer-motion";
import { Shield, Lock, Clock, Heart } from "lucide-react";

const badges = [
  { icon: Shield, label: "SSL-verschlüsselt" },
  { icon: Lock, label: "Daten sicher" },
  { icon: Clock, label: "Sofortige Bestätigung" },
  { icon: Heart, label: "Kostenlose Stornierung 24h" },
];

export const BookingTrustBadges = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="flex flex-wrap justify-center gap-4 mb-8"
    >
      {badges.map((badge, index) => (
        <motion.div
          key={badge.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 + index * 0.1 }}
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-secondary/50 border border-border/50"
        >
          <badge.icon size={14} className="text-copper" />
          <span className="text-xs text-muted-foreground">{badge.label}</span>
        </motion.div>
      ))}
    </motion.div>
  );
};
