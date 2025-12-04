import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

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
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
        >
          <div className="container-wide">
            <div className="bg-card border border-border rounded-2xl shadow-lg p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 rounded-xl bg-copper/10 flex items-center justify-center shrink-0">
                    <Cookie size={24} className="text-copper" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-foreground mb-2">
                      Wir verwenden Cookies
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten, 
                      verwenden wir Cookies. Sie können wählen, welche Cookies Sie zulassen möchten.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <Button variant="outline" onClick={acceptNecessary}>
                    Nur notwendige
                  </Button>
                  <Button variant="copper" onClick={acceptAll}>
                    Alle akzeptieren
                  </Button>
                </div>
                <button
                  onClick={() => setIsVisible(false)}
                  className="absolute top-4 right-4 md:relative md:top-0 md:right-0 text-muted-foreground hover:text-foreground"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
