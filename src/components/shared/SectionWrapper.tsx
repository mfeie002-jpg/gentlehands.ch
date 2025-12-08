import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "secondary" | "primary" | "gradient";
  padding?: "default" | "sm" | "lg" | "none";
  containerWidth?: "narrow" | "wide" | "full";
  withPattern?: boolean;
  withAmbient?: boolean;
}

export const SectionWrapper = ({
  children,
  className,
  variant = "default",
  padding = "default",
  containerWidth = "wide",
  withPattern = false,
  withAmbient = false,
}: SectionWrapperProps) => {
  const variantStyles = {
    default: "bg-background",
    secondary: "bg-secondary/30",
    primary: "bg-primary text-primary-foreground",
    gradient: "bg-gradient-to-b from-secondary/30 to-background",
  };

  const paddingStyles = {
    default: "section-padding",
    sm: "section-padding-sm",
    lg: "py-24 md:py-32 lg:py-40",
    none: "",
  };

  const containerStyles = {
    narrow: "container-narrow",
    wide: "container-wide",
    full: "w-full px-4 sm:px-6",
  };

  return (
    <section className={cn("relative overflow-hidden", variantStyles[variant], paddingStyles[padding], className)}>
      {/* Background Pattern */}
      {withPattern && (
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 1px)`,
              backgroundSize: '32px 32px'
            }} 
          />
        </div>
      )}

      {/* Ambient Effects */}
      {withAmbient && (
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute top-1/4 -left-20 w-48 sm:w-80 h-48 sm:h-80 rounded-full bg-copper/5 blur-[60px] sm:blur-[100px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-1/4 -right-20 w-32 sm:w-64 h-32 sm:h-64 rounded-full bg-primary/5 blur-[50px] sm:blur-[80px]"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>
      )}

      <div className={cn(containerStyles[containerWidth], "relative z-10")}>
        {children}
      </div>
    </section>
  );
};
