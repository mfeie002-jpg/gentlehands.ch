import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Snowflake, Gift, Sparkles } from "lucide-react";
import seasonalImage from "@/assets/seasonal-winter.jpg";

export const SeasonalHighlightSection = () => {
  return (
    <section className="section-padding-sm bg-gradient-to-r from-petrol/5 via-background to-petrol/5 relative overflow-hidden">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Content */}
          <ScrollReveal direction="left">
            <div>
              <div className="inline-flex items-center gap-2 bg-petrol/10 px-4 py-2 rounded-full mb-4">
                <Snowflake size={14} className="text-petrol" />
                <span className="text-petrol text-sm font-medium">Winter-Special</span>
              </div>

              <h2 className="text-foreground text-3xl md:text-4xl mb-4">
                Die <span className="text-gradient-copper">Winterauszeit</span>
              </h2>

              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Wenn draussen die Kälte herrscht, schenken wir Ihnen Wärme. 
                Unser Winter-Special kombiniert wärmende Öle, heiße Steine und 
                intensives Loslassen in besonderer Atmosphäre.
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-6 h-6 rounded-full bg-copper/20 flex items-center justify-center">
                    <Sparkles size={12} className="text-copper" />
                  </div>
                  <span>90 Min Hot Stone Massage im Alpine-Raum</span>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-6 h-6 rounded-full bg-copper/20 flex items-center justify-center">
                    <Sparkles size={12} className="text-copper" />
                  </div>
                  <span>Wärmender Zimt-Orangen-Tee inklusive</span>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-6 h-6 rounded-full bg-copper/20 flex items-center justify-center">
                    <Gift size={12} className="text-copper" />
                  </div>
                  <span>CHF 20 Rabatt auf Gutscheine bis 24.12.</span>
                </li>
              </ul>

              <div className="flex flex-wrap gap-4">
                <Button variant="copper" size="lg" asChild>
                  <Link to="/saisonal">
                    <Snowflake size={16} className="mr-2" />
                    Winter-Special buchen
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="border-copper/30 hover:border-copper">
                  <Link to="/gutscheine">
                    <Gift size={16} className="mr-2" />
                    Gutschein schenken
                  </Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>

          {/* Image */}
          <ScrollReveal direction="right">
            <motion.div
              className="relative rounded-2xl overflow-hidden aspect-[4/3]"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={seasonalImage}
                alt="Winter Spa Erlebnis"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
              
              {/* Price Badge */}
              <motion.div
                className="absolute top-6 right-6 bg-copper text-accent-foreground px-4 py-2 rounded-xl"
                animate={{ rotate: [0, 2, -2, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <p className="text-xs font-medium">ab</p>
                <p className="text-2xl font-display">CHF 189</p>
              </motion.div>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
