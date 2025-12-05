import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Shield, Settings } from "lucide-react";

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", "all");
    setIsVisible(false);
  };

  const acceptNecessary = () => {
    localStorage.setItem("cookie-consent", "necessary");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
        >
          <div className="container-wide">
            <motion.div 
              className="relative bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl p-6 md:p-8 overflow-hidden"
              layoutId="cookie-container"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-copper/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-petrol/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="flex items-start gap-4 flex-1">
                  <motion.div 
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-copper/20 to-copper/5 flex items-center justify-center shrink-0 border border-copper/20"
                    whileHover={{ rotate: 12 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Cookie size={24} className="text-copper" />
                  </motion.div>
                  <div>
                    <h3 className="font-display text-lg text-foreground mb-2 flex items-center gap-2">
                      Wir verwenden Cookies
                      <Shield size={14} className="text-copper" />
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten, 
                      verwenden wir Cookies. Sie können wählen, welche Cookies Sie zulassen möchten.
                    </p>
                    
                    {/* Cookie details */}
                    <AnimatePresence>
                      {showDetails && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="mt-4 overflow-hidden"
                        >
                          <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                              <div className="w-2 h-2 rounded-full bg-green-500" />
                              <div>
                                <span className="font-medium text-foreground">Notwendige Cookies</span>
                                <p className="text-muted-foreground text-xs">Erforderlich für grundlegende Funktionen</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                              <div className="w-2 h-2 rounded-full bg-copper" />
                              <div>
                                <span className="font-medium text-foreground">Analyse Cookies</span>
                                <p className="text-muted-foreground text-xs">Helfen uns, die Website zu verbessern</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    <button
                      onClick={() => setShowDetails(!showDetails)}
                      className="flex items-center gap-1 text-copper text-sm mt-3 hover:underline"
                    >
                      <Settings size={14} />
                      {showDetails ? "Weniger anzeigen" : "Details anzeigen"}
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="outline" onClick={acceptNecessary} className="w-full sm:w-auto">
                      Nur notwendige
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="copper" onClick={acceptAll} className="w-full sm:w-auto">
                      Alle akzeptieren
                    </Button>
                  </motion.div>
                </div>
                
                <motion.button
                  onClick={() => setIsVisible(false)}
                  className="absolute top-4 right-4 md:relative md:top-0 md:right-0 text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={20} />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
