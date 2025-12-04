import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const NewsletterPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const dismissed = localStorage.getItem("newsletter-dismissed");
    const subscribed = localStorage.getItem("newsletter-subscribed");
    
    if (!dismissed && !subscribed) {
      // Show after 30 seconds or on exit intent
      const timer = setTimeout(() => setIsVisible(true), 30000);
      
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0) {
          setIsVisible(true);
        }
      };
      
      document.addEventListener("mouseleave", handleMouseLeave);
      
      return () => {
        clearTimeout(timer);
        document.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      localStorage.setItem("newsletter-subscribed", "true");
      toast({
        title: "Willkommen!",
        description: "Sie erhalten in Kürze Ihren 10% Gutscheincode per E-Mail.",
      });
      setIsVisible(false);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem("newsletter-dismissed", Date.now().toString());
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm"
          onClick={handleDismiss}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card rounded-3xl shadow-lg max-w-md w-full p-8 relative overflow-hidden"
          >
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-copper/10 rounded-full blur-2xl" />
            
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X size={24} />
            </button>

            <div className="relative">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-copper/10 mb-6 mx-auto">
                <Gift size={32} className="text-copper" />
              </div>

              <h3 className="font-display text-2xl text-foreground text-center mb-2">
                10% Willkommensrabatt
              </h3>
              <p className="text-muted-foreground text-center mb-6">
                Melden Sie sich für unseren Newsletter an und erhalten Sie 10% 
                Rabatt auf Ihre erste Buchung.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    type="email"
                    placeholder="Ihre E-Mail-Adresse"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
                <Button variant="copper" className="w-full" type="submit">
                  Gutschein erhalten
                </Button>
              </form>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Kein Spam. Jederzeit abbestellbar. Datenschutz wird respektiert.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
