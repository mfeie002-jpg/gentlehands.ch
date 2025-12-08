import { ReactNode } from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { FloatingElements } from "./FloatingElements";

interface PageHeroProps {
  badge?: {
    icon: LucideIcon;
    text: string;
  };
  title: string | ReactNode;
  subtitle?: string;
  children?: ReactNode;
  variant?: "default" | "gradient" | "image";
  backgroundImage?: string;
  className?: string;
}

export const PageHero = ({
  badge,
  title,
  subtitle,
  children,
  variant = "default",
  backgroundImage,
  className = "",
}: PageHeroProps) => {
  return (
    <section 
      className={`pt-24 sm:pt-32 pb-12 sm:pb-20 relative overflow-hidden ${
        variant === "gradient" ? "bg-gradient-to-b from-secondary/30 to-background" : ""
      } ${className}`}
    >
      {/* Background Image */}
      {variant === "image" && backgroundImage && (
        <motion.div 
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <img 
            src={backgroundImage} 
            alt="" 
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </motion.div>
      )}

      {/* Ambient Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 -left-20 w-48 sm:w-80 h-48 sm:h-80 rounded-full bg-copper/10 blur-[60px] sm:blur-[100px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/4 -right-20 w-32 sm:w-64 h-32 sm:h-64 rounded-full bg-primary/10 blur-[50px] sm:blur-[80px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>
      
      <FloatingElements variant="dots" />
      
      <div className="container-wide relative z-10 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Badge */}
          {badge && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-copper/10 border border-copper/20 mb-4 sm:mb-6 backdrop-blur-sm"
            >
              <badge.icon size={14} className="sm:w-4 sm:h-4 text-copper" />
              <span className="text-copper text-xs sm:text-sm font-medium">{badge.text}</span>
            </motion.div>
          )}
          
          {/* Title */}
          <motion.h1 
            className="text-foreground mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {title}
          </motion.h1>
          
          {/* Subtitle */}
          {subtitle && (
            <motion.p 
              className="text-muted-foreground text-sm sm:text-base md:text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {subtitle}
            </motion.p>
          )}
          
          {/* Additional Content */}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6"
            >
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
