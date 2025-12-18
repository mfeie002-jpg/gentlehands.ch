import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { FloatingElements } from "./FloatingElements";
import { ScrollIndicator } from "./ScrollIndicator";

interface PageHeroSectionProps {
  icon?: LucideIcon;
  badge?: string;
  title: string;
  highlightedTitle?: string;
  description: string;
  children?: React.ReactNode;
  showScrollIndicator?: boolean;
}

export const PageHeroSection = ({
  icon: Icon,
  badge,
  title,
  highlightedTitle,
  description,
  children,
  showScrollIndicator = true,
}: PageHeroSectionProps) => {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
      {/* Ambient Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-copper/10 blur-[100px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-primary/10 blur-[80px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <FloatingElements variant="dots" />

      <div className="container-wide relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          {Icon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-copper/20 to-primary/10 flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Icon size={40} className="text-copper" />
              </motion.div>
            </motion.div>
          )}

          {badge && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-copper/10 border border-copper/20 mb-6 backdrop-blur-sm"
            >
              <span className="text-copper text-sm font-medium">{badge}</span>
            </motion.div>
          )}

          <h1 className="text-foreground mb-6">
            {title}
            {highlightedTitle && (
              <>
                {" "}
                <span className="bg-gradient-to-r from-copper via-copper-light to-copper bg-clip-text text-transparent">
                  {highlightedTitle}
                </span>
              </>
            )}
          </h1>

          <motion.p
            className="text-foreground/70 text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {description}
          </motion.p>

          {children}
        </motion.div>
        
        {showScrollIndicator && (
          <div className="mt-12 flex justify-center">
            <ScrollIndicator variant="chevron" text="Mehr erfahren" />
          </div>
        )}
      </div>
    </section>
  );
};
