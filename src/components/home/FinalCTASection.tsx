import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Phone, ArrowRight } from "lucide-react";
import heroImage from "@/assets/massage-hands-shoulders.jpg";

export const FinalCTASection = () => {
  return (
    <section className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center justify-center overflow-hidden">
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
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
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

            {/* Trust Note */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-background/60 text-xs sm:text-sm mt-6 sm:mt-8 px-4"
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
