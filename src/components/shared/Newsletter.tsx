import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Check } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { trackNewsletterSignup } = useAnalytics();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      trackNewsletterSignup();
    }
  };

  return (
    <section className="section-padding bg-primary text-primary-foreground">
      <div className="container-narrow text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-16 rounded-2xl bg-copper/20 flex items-center justify-center mx-auto mb-6">
            <Mail size={32} className="text-copper" />
          </div>
          
          <h2 className="text-primary-foreground mb-4">
            Bleiben Sie informiert
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
            Erhalten Sie exklusive Angebote, neue Theme-Vorstellungen und 
            Wellness-Tipps direkt in Ihr Postfach.
          </p>

          {isSubmitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center justify-center gap-3 text-copper"
            >
              <Check size={24} />
              <span className="text-lg">Vielen Dank für Ihre Anmeldung!</span>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <Input
                type="email"
                placeholder="Ihre E-Mail-Adresse"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                required
              />
              <Button variant="copper" type="submit">
                Anmelden
                <ArrowRight size={16} />
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};
