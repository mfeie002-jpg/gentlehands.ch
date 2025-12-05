import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      
      setScrollProgress(progress);
      setIsVisible(scrollTop > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full flex items-center justify-center group"
          aria-label="Nach oben scrollen"
        >
          {/* Progress ring */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 48 48"
          >
            {/* Background ring */}
            <circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              strokeWidth="2"
              className="stroke-border"
            />
            {/* Progress ring */}
            <motion.circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              strokeWidth="2"
              className="stroke-copper"
              strokeLinecap="round"
              strokeDasharray={138.23}
              strokeDashoffset={138.23 - (138.23 * scrollProgress) / 100}
            />
          </svg>
          
          {/* Background */}
          <div className="absolute inset-1 rounded-full bg-secondary border border-border group-hover:bg-copper group-hover:border-copper transition-colors" />
          
          {/* Glow effect on hover */}
          <motion.div
            className="absolute inset-0 rounded-full bg-copper/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity"
          />
          
          {/* Icon */}
          <motion.div
            className="relative z-10 text-foreground group-hover:text-accent-foreground transition-colors"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowUp size={20} />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
