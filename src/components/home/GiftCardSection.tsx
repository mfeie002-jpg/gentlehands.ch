import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { ArrowRight, Gift, Sparkles, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import giftCardImage from "@/assets/gift-card-presentation.jpg";

export const GiftCardSection = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-copper/5 via-background to-petrol/5 relative overflow-hidden">
      {/* Ambient effects */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-copper/8 rounded-full blur-[150px] pointer-events-none -translate-y-1/2" />
      
      <div className="container-wide relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <ScrollReveal>
            <motion.div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-copper" />
              <span className="text-copper font-medium tracking-[0.2em] uppercase text-xs">
                Das perfekte Geschenk
              </span>
            </motion.div>

            <h2 className="text-foreground text-3xl md:text-4xl lg:text-5xl mb-6">
              Entspannung <span className="text-gradient-copper">verschenken</span>
            </h2>

            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Schenken Sie jemandem, der Ihnen am Herzen liegt, eine Auszeit vom Alltag. 
              Unsere eleganten Geschenkgutscheine werden persönlich gestaltet und 
              diskret zugestellt.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Sparkles size={18} className="text-copper" />
                <span className="text-sm">Individuelle Beträge möglich</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Gift size={18} className="text-copper" />
                <span className="text-sm">Elegante Verpackung</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <CreditCard size={18} className="text-copper" />
                <span className="text-sm">3 Jahre gültig</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Gift size={18} className="text-copper" />
                <span className="text-sm">Diskrete Zustellung</span>
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button variant="copper" size="lg" asChild className="group shadow-copper">
                <Link to="/gutscheine">
                  Gutschein gestalten
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </ScrollReveal>

          {/* Image */}
          <ScrollReveal direction="up" delay={0.2}>
            <div className="relative">
              <motion.div
                className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={giftCardImage}
                  alt="GentleHands Geschenkgutschein"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-copper/20 rounded-full" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 border-2 border-petrol/20 rounded-full" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
