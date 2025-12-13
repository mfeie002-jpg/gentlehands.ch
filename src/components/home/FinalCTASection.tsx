import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Phone, ArrowRight, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import heroImage from "@/assets/massage-hands-shoulders.jpg";

export const FinalCTASection = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setEmail("");
    toast.success("Vielen Dank! Sie erhalten bald Neuigkeiten von uns.");
  };

  return (
    <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Entspannende Massage"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-transparent to-foreground/50" />
      </div>

      <div className="container-narrow relative z-10 py-12 sm:py-20 px-4 sm:px-6">
        <ScrollReveal>
          <div className="text-center">
            {/* Overline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <span className="text-copper font-medium tracking-[0.2em] uppercase text-sm">
                Bereit für Ihre Auszeit?
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-background text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6"
            >
              Schenken Sie sich
              <br />
              <span className="text-copper">Momente der Ruhe</span>
            </motion.h2>

            {/* Subline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-background/80 text-base sm:text-lg max-w-xl mx-auto mb-8 sm:mb-10"
            >
              Vereinbaren Sie jetzt Ihr persönliches Erlebnis – wir freuen uns auf Sie.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-12"
            >
              <Button variant="copper" size="xl" asChild className="min-w-[180px] sm:min-w-[200px] w-full sm:w-auto">
                <Link to="/buchung">
                  <Sparkles size={18} className="mr-2" />
                  Erlebnis anfragen
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="xl" 
                asChild 
                className="min-w-[180px] sm:min-w-[200px] w-full sm:w-auto border-background/30 text-background hover:bg-background/10 hover:border-background/50"
              >
                <Link to="/kontakt">
                  <Phone size={18} className="mr-2" />
                  Kontakt aufnehmen
                </Link>
              </Button>
            </motion.div>

            {/* Newsletter Integration */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="border-t border-background/20 pt-8 sm:pt-10"
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <Mail size={18} className="text-copper" />
                <span className="text-background/80 text-sm font-medium">Newsletter</span>
              </div>
              <p className="text-background/60 text-sm mb-4 max-w-md mx-auto">
                Exklusive Angebote und Wellness-Tipps direkt in Ihr Postfach.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ihre E-Mail-Adresse"
                  className="flex-1 px-4 py-3 rounded-xl bg-background/10 border border-background/20 focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/20 text-background placeholder:text-background/50 transition-colors backdrop-blur-sm"
                  required
                />
                <Button type="submit" variant="copper" disabled={isLoading} className="whitespace-nowrap">
                  {isLoading ? "..." : "Anmelden"}
                  <ArrowRight size={16} className="ml-1" />
                </Button>
              </form>
              <p className="text-background/40 text-xs mt-3">
                Mit der Anmeldung akzeptieren Sie unsere Datenschutzbestimmungen.
              </p>
            </motion.div>

            {/* Trust Note */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-background/60 text-xs sm:text-sm mt-8 sm:mt-10 px-4"
            >
              <span className="block sm:inline">Professionelle Entspannungsmassagen</span>
              <span className="hidden sm:inline"> • </span>
              <span className="block sm:inline">Absolute Diskretion • Nur für Frauen</span>
            </motion.p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
