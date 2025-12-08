import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface FeatureIconProps {
  icon: LucideIcon;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "copper" | "petrol" | "gradient";
  animated?: boolean;
  className?: string;
}

export const FeatureIcon = ({
  icon: Icon,
  size = "md",
  variant = "default",
  animated = true,
  className,
}: FeatureIconProps) => {
  const sizeStyles = {
    sm: "w-10 h-10",
    md: "w-12 h-12 sm:w-14 sm:h-14",
    lg: "w-16 h-16 sm:w-20 sm:h-20",
    xl: "w-20 h-20 sm:w-24 sm:h-24",
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 28,
    xl: 36,
  };

  const variantStyles = {
    default: "bg-secondary text-foreground",
    copper: "bg-copper/10 text-copper",
    petrol: "bg-primary/10 text-primary",
    gradient: "bg-gradient-to-br from-copper/20 to-primary/10 text-copper",
  };

  const baseClasses = cn(
    "rounded-xl sm:rounded-2xl flex items-center justify-center",
    sizeStyles[size],
    variantStyles[variant],
    className
  );

  if (animated) {
    return (
      <motion.div
        className={baseClasses}
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring" as const, stiffness: 300 }}
      >
        <Icon size={iconSizes[size]} className="sm:scale-110" />
      </motion.div>
    );
  }

  return (
    <div className={baseClasses}>
      <Icon size={iconSizes[size]} className="sm:scale-110" />
    </div>
  );
};
