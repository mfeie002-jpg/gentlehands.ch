import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Gift, Sparkles, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAnalytics } from "@/hooks/useAnalytics";

export const NewsletterPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const hasShownRef = useRef(false);
  const { trackNewsletterSignup } = useAnalytics();

  useEffect(() => {
    const dismissed = localStorage.getItem("newsletter-dismissed");
    const subscribed = localStorage.getItem("newsletter-subscribed");
    
    // Don't show if already dismissed or subscribed
    if (dismissed || subscribed) {
      return;
    }

    // Show after 30 seconds (only once)
    const timer = setTimeout(() => {
      if (!hasShownRef.current) {
        hasShownRef.current = true;
        setIsVisible(true);
      }
    }, 30000);
    
    // Show on exit intent (only once)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShownRef.current) {
        hasShownRef.current = true;
        setIsVisible(true);
      }
    };
    
    document.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      localStorage.setItem("newsletter-subscribed", "true");
      setIsSubmitting(false);
      setIsSuccess(true);
      trackNewsletterSignup();
      
      toast({
        title: "Willkommen!",
        description: "Sie erhalten in Kürze Ihren 10% Gutscheincode per E-Mail.",
      });
      
      setTimeout(() => {
        setIsVisible(false);
      }, 2000);
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-md"
          onClick={handleDismiss}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card rounded-3xl shadow-2xl max-w-md w-full p-8 relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-copper/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-petrol/10 rounded-full blur-3xl" />
            
            {/* Floating particles */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-copper/30 rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${20 + (i % 3) * 25}%`,
                }}
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 2 + i * 0.3,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
            
            <motion.button
              onClick={handleDismiss}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} />
            </motion.button>

            <div className="relative">
              {/* Icon */}
              <motion.div 
                className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-copper/20 to-copper/5 mb-6 mx-auto border border-copper/20"
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.02, 1],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Gift size={36} className="text-copper" />
                <motion.div
                  className="absolute -top-1 -right-1"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Sparkles size={16} className="text-copper" />
                </motion.div>
              </motion.div>

              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
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
                          className="pl-10 bg-secondary/50"
                          required
                        />
                      </div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button 
                          variant="copper" 
                          className="w-full relative overflow-hidden" 
                          type="submit"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <motion.div
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                          ) : (
                            <>
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                animate={{ x: ["-100%", "200%"] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                              />
                              <span className="relative">Gutschein erhalten</span>
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </form>

                    <p className="text-xs text-muted-foreground text-center mt-4">
                      Kein Spam. Jederzeit abbestellbar. Datenschutz wird respektiert.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-4"
                  >
                    <motion.div
                      className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.1 }}
                    >
                      <Check size={32} className="text-green-500" />
                    </motion.div>
                    <h3 className="font-display text-xl text-foreground mb-2">
                      Vielen Dank!
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Ihr Gutscheincode ist unterwegs.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
