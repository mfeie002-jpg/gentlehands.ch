import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface AnimatedBadgeProps {
  icon?: LucideIcon;
  text: string;
  variant?: "copper" | "primary" | "success" | "warning";
}

export const AnimatedBadge = ({ icon: Icon, text, variant = "copper" }: AnimatedBadgeProps) => {
  const variants = {
    copper: "bg-copper/10 border-copper/20 text-copper",
    primary: "bg-primary/10 border-primary/20 text-primary",
    success: "bg-green-500/10 border-green-500/20 text-green-600",
    warning: "bg-amber-500/10 border-amber-500/20 text-amber-600",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm ${variants[variant]}`}
    >
      {Icon && (
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Icon size={16} />
        </motion.div>
      )}
      <span className="text-sm font-medium">{text}</span>
    </motion.div>
  );
};
