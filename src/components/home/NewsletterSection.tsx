import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Mail, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setEmail("");
    toast.success("Vielen Dank! Sie erhalten bald Neuigkeiten von uns.");
  };

  return (
    <section className="py-20 bg-gradient-to-r from-petrol/5 via-card to-copper/5 border-y border-border/30 relative overflow-hidden">
      {/* Decorative sparkle */}
      <motion.div
        className="absolute top-8 right-1/4 text-copper/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Sparkles size={32} />
      </motion.div>

      <div className="container-narrow relative">
        <ScrollReveal className="text-center">
          <motion.div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-copper/10 flex items-center justify-center">
              <Mail size={20} className="text-copper" />
            </div>
          </motion.div>

          <h2 className="text-foreground text-2xl md:text-3xl lg:text-4xl font-display mb-4">
            Bleiben Sie <span className="text-gradient-copper">informiert</span>
          </h2>

          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Erhalten Sie exklusive Angebote, neue Theme-Ankündigungen und 
            Wellness-Tipps direkt in Ihr Postfach. Kein Spam, versprochen.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ihre E-Mail-Adresse"
              className="flex-1 px-4 py-3 rounded-xl bg-card border border-border focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/20 text-foreground placeholder:text-muted-foreground transition-colors"
              required
            />
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button type="submit" variant="copper" disabled={isLoading} className="shadow-copper">
                {isLoading ? "..." : "Anmelden"}
                <ArrowRight size={16} className="ml-1" />
              </Button>
            </motion.div>
          </form>

          <p className="text-xs text-muted-foreground mt-4">
            Mit der Anmeldung akzeptieren Sie unsere Datenschutzbestimmungen.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};
