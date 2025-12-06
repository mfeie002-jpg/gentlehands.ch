import { motion } from "framer-motion";
import { Users, Award, Heart, Shield } from "lucide-react";

const stats = [
  { icon: Users, value: "3", label: "Expert:innen" },
  { icon: Award, value: "26+", label: "Jahre Erfahrung" },
  { icon: Heart, value: "1500+", label: "Zufriedene Kundinnen" },
  { icon: Shield, value: "100%", label: "Ausgebildet" },
];

export const TeamHeroEnhanced = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 + index * 0.1 }}
          whileHover={{ scale: 1.05, y: -5 }}
          className="p-4 rounded-2xl bg-background/60 backdrop-blur-sm border border-border/50 text-center group"
        >
          <motion.div
            className="w-10 h-10 mx-auto mb-2 rounded-xl bg-copper/10 flex items-center justify-center group-hover:bg-copper/20 transition-colors"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <stat.icon size={20} className="text-copper" />
          </motion.div>
          <p className="text-2xl font-display text-foreground mb-1">{stat.value}</p>
          <p className="text-xs text-muted-foreground">{stat.label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};
