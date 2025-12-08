import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, X, Sparkles } from "lucide-react";

export const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const location = useLocation();

  // Don't show on booking page
  const shouldShow = !location.pathname.includes("/buchung") && !isDismissed;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!shouldShow) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Desktop version */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 right-6 z-40 hidden md:block"
          >
            <div className="relative group">
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 bg-copper/30 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Pulse rings */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-copper/30"
                animate={{
                  scale: [1, 1.5],
                  opacity: [0.5, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-copper/30"
                animate={{
                  scale: [1, 1.5],
                  opacity: [0.5, 0],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="copper"
                  size="lg"
                  className="shadow-copper pr-10 relative overflow-hidden"
                  asChild
                >
                  <Link to="/buchung">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    />
                    <Calendar size={18} />
                    <span className="relative">Jetzt buchen</span>
                    <Sparkles size={14} className="ml-1 opacity-70" />
                  </Link>
                </Button>
              </motion.div>
              
              <motion.button
                onClick={() => setIsDismissed(true)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-foreground text-background rounded-full flex items-center justify-center hover:bg-foreground/80 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={12} />
              </motion.button>
            </div>
          </motion.div>
          
          {/* Mobile floating bar */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-40 md:hidden safe-area-bottom"
          >
            <div className="bg-background/95 backdrop-blur-xl border-t border-border/50 px-4 py-3">
              <div className="flex items-center gap-3">
                <Button
                  variant="copper"
                  className="flex-1 shadow-copper relative overflow-hidden h-12 text-base font-medium"
                  asChild
                >
                  <Link to="/buchung">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    />
                    <Calendar size={18} className="mr-2" />
                    <span className="relative">Erlebnis anfragen</span>
                  </Link>
                </Button>
                <motion.button
                  onClick={() => setIsDismissed(true)}
                  className="w-12 h-12 bg-secondary text-foreground rounded-xl flex items-center justify-center active:scale-95 transition-transform touch-manipulation"
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={20} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
