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
          
          {/* Mobile floating bar - enhanced visibility */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
            style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
          >
            {/* Gradient fade effect above the bar */}
            <div className="absolute bottom-full left-0 right-0 h-8 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
            
            <div className="bg-background/98 backdrop-blur-xl border-t border-copper/20 shadow-[0_-4px_20px_rgba(181,120,79,0.15)]">
              <div className="px-4 py-3">
                <div className="flex items-center gap-3 max-w-lg mx-auto">
                  {/* Main CTA Button */}
                  <motion.div 
                    className="flex-1 relative"
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Subtle glow behind button */}
                    <div className="absolute inset-0 bg-copper/20 rounded-xl blur-md" />
                    
                    <Button
                      variant="copper"
                      className="w-full relative overflow-hidden h-14 text-base font-semibold shadow-lg shadow-copper/25"
                      asChild
                    >
                      <Link to="/buchung">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                          animate={{ x: ["-100%", "200%"] }}
                          transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
                        />
                        <Calendar size={20} className="mr-2" />
                        <span className="relative">Jetzt Termin buchen</span>
                        <Sparkles size={16} className="ml-2 opacity-80" />
                      </Link>
                    </Button>
                  </motion.div>
                  
                  {/* Dismiss button */}
                  <motion.button
                    onClick={() => setIsDismissed(true)}
                    className="w-14 h-14 bg-muted hover:bg-muted/80 text-muted-foreground rounded-xl flex items-center justify-center active:scale-95 transition-all touch-manipulation flex-shrink-0 border border-border/50"
                    whileTap={{ scale: 0.9 }}
                    aria-label="Schließen"
                  >
                    <X size={20} />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
