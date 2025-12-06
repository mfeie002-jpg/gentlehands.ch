import { motion } from "framer-motion";
import { Shield, Info } from "lucide-react";

interface TrustNoteProps {
  variant?: "default" | "compact";
  className?: string;
}

export const TrustNote = ({ variant = "default", className = "" }: TrustNoteProps) => {
  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`flex items-center gap-2 text-xs text-muted-foreground ${className}`}
      >
        <Shield size={12} className="text-copper" />
        <span>Professionelle Entspannungsmassagen • Keine erotischen Dienstleistungen</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-xl bg-petrol/5 border border-petrol/10 ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-petrol/10 flex items-center justify-center shrink-0 mt-0.5">
          <Info size={16} className="text-petrol" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground mb-1">
            Wichtiger Hinweis
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            GentleHands bietet ausschliesslich professionelle Entspannungsmassagen an. 
            Wir sind kein Erotikstudio. Bei uns stehen Ihr Wohlbefinden, Ihre Grenzen 
            und Ihre Entspannung im Mittelpunkt.
          </p>
        </div>
      </div>
    </motion.div>
  );
};
