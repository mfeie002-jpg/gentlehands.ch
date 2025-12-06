import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Gift, Heart, Sparkles, ChevronRight } from "lucide-react";
import giftImage from "@/assets/gift-card-presentation.jpg";

export const GiftIdeaSection = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-secondary/20 to-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-copper/5 rounded-full blur-[120px]" />
      
      <div className="container-wide relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="left">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px bg-gradient-to-r from-copper to-transparent w-8" />
                <span className="text-copper font-medium tracking-[0.2em] uppercase text-xs">
                  Das perfekte Geschenk
                </span>
              </div>

              <h2 className="text-foreground text-3xl md:text-4xl mb-6">
                Schenken Sie <span className="text-gradient-copper">Entspannung</span>
              </h2>

              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Ein Gutschein von GentleHands ist mehr als ein Geschenk – 
                es ist eine Einladung zum Loslassen und Auftanken.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  { icon: Gift, text: "Elegant verpackt per Post oder E-Mail" },
                  { icon: Heart, text: "Mit persönlicher Widmung" },
                  { icon: Sparkles, text: "Ab CHF 100 frei wählbar" },
                ].map((item) => (
                  <li key={item.text} className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-8 h-8 rounded-lg bg-copper/10 flex items-center justify-center">
                      <item.icon size={14} className="text-copper" />
                    </div>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4">
                <Button variant="copper" size="lg" asChild>
                  <Link to="/gutscheine">
                    <Gift size={16} className="mr-2" />
                    Gutschein kaufen
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="border-copper/30 hover:border-copper">
                  <Link to="/geschenkideen" className="flex items-center gap-2">
                    Alle Geschenkideen
                    <ChevronRight size={16} />
                  </Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <motion.div
              className="relative rounded-2xl overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={giftImage}
                alt="GentleHands Geschenkgutschein"
                className="w-full h-auto object-cover aspect-[4/3]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
              
              {/* Floating Price Badge */}
              <motion.div
                className="absolute bottom-6 right-6 bg-copper text-accent-foreground px-5 py-3 rounded-xl text-center"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <p className="text-xs font-medium opacity-80">ab</p>
                <p className="text-2xl font-display">CHF 100</p>
              </motion.div>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
