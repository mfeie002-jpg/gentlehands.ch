import { motion } from "framer-motion";
import { ChevronDown, MousePointer2 } from "lucide-react";

interface ScrollIndicatorProps {
  className?: string;
  variant?: "mouse" | "chevron" | "minimal";
  text?: string;
}

export const ScrollIndicator = ({ 
  className = "", 
  variant = "mouse",
  text = "Entdecken"
}: ScrollIndicatorProps) => {
  const handleClick = () => {
    window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
  };

  if (variant === "minimal") {
    return (
      <motion.button
        onClick={handleClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className={`flex flex-col items-center gap-2 cursor-pointer group ${className}`}
        aria-label="Nach unten scrollen"
      >
        <motion.span 
          className="text-xs tracking-[0.2em] uppercase font-medium text-muted-foreground group-hover:text-copper transition-colors"
        >
          {text}
        </motion.span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-copper/60 group-hover:text-copper transition-colors" />
        </motion.div>
      </motion.button>
    );
  }

  if (variant === "chevron") {
    return (
      <motion.button
        onClick={handleClick}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className={`flex flex-col items-center gap-3 cursor-pointer group ${className}`}
        aria-label="Nach unten scrollen"
      >
        <motion.span 
          className="text-xs tracking-[0.2em] uppercase font-medium text-muted-foreground group-hover:text-copper transition-colors"
        >
          {text}
        </motion.span>
        <div className="relative">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-6 h-6 text-copper/70 group-hover:text-copper transition-colors" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
            className="absolute top-2"
          >
            <ChevronDown className="w-6 h-6 text-copper/40 group-hover:text-copper/60 transition-colors" />
          </motion.div>
        </div>
      </motion.button>
    );
  }

  // Mouse variant (default)
  return (
    <motion.button
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8, duration: 1 }}
      className={`flex flex-col items-center gap-3 cursor-pointer group ${className}`}
      aria-label="Nach unten scrollen"
    >
      <motion.span 
        className="text-xs tracking-[0.2em] uppercase font-medium text-muted-foreground group-hover:text-copper transition-colors duration-300"
      >
        {text}
      </motion.span>
      
      {/* Mouse Icon */}
      <div className="relative">
        <motion.div
          className="w-7 h-11 border-2 border-copper/40 group-hover:border-copper/70 rounded-full flex items-start justify-center p-1.5 transition-colors duration-300"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-3 bg-copper/70 group-hover:bg-copper rounded-full transition-colors duration-300"
          />
        </motion.div>
        
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-full bg-copper/0 group-hover:bg-copper/10 blur-md transition-all duration-300"
        />
      </div>
      
      {/* Pulsing ring */}
      <motion.div
        className="absolute w-14 h-14 rounded-full border border-copper/20"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.3, 0, 0.3]
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
        style={{ top: '50%', transform: 'translateY(-50%)' }}
      />
    </motion.button>
  );
};
