import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="p-6 rounded-2xl bg-gradient-to-br from-secondary/50 to-secondary/30 border border-border/50 group"
    >
      <motion.div
        className="w-14 h-14 mb-4 rounded-2xl bg-copper/10 flex items-center justify-center group-hover:bg-copper/20 transition-colors"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        <Icon size={28} className="text-copper" />
      </motion.div>
      <h3 className="font-display text-lg text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  );
};
