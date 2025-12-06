import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock, Sparkles, ChevronRight, Star } from "lucide-react";

const packages = [
  {
    duration: "60 Min",
    name: "Entspannung",
    price: 120,
    description: "Perfekt für den Einstieg oder als regelmässige Auszeit.",
    popular: false,
  },
  {
    duration: "90 Min",
    name: "Tiefenentspannung",
    price: 175,
    description: "Unser beliebtestes Format für nachhaltige Erholung.",
    popular: true,
  },
  {
    duration: "120 Min",
    name: "Premium",
    price: 230,
    description: "Das ultimative Erlebnis für vollständige Regeneration.",
    popular: false,
  },
];

export const PricePreviewSection = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-background to-secondary/10">
      <div className="container-wide">
        <ScrollReveal className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-copper to-transparent w-12" />
            <span className="text-copper font-medium tracking-[0.2em] uppercase text-xs">
              Investition in Ihr Wohlbefinden
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-copper to-transparent w-12" />
          </div>
          <h2 className="text-foreground mb-4">
            Transparente <span className="text-gradient-copper">Preise</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Alle Massagearten zum gleichen Preis – Sie wählen nur die Dauer.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
          {packages.map((pkg, index) => (
            <ScrollReveal key={pkg.name} delay={index * 0.1}>
              <motion.div
                className={`relative rounded-2xl p-6 border ${
                  pkg.popular 
                    ? 'bg-copper/5 border-copper' 
                    : 'bg-card border-border hover:border-copper/30'
                } transition-all h-full`}
                whileHover={{ y: -4 }}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1 bg-copper text-accent-foreground px-3 py-1 rounded-full text-xs font-medium">
                      <Star size={12} className="fill-current" />
                      <span>Beliebt</span>
                    </div>
                  </div>
                )}

                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock size={14} className="text-copper" />
                    <span className="text-muted-foreground text-sm">{pkg.duration}</span>
                  </div>
                  <h3 className="text-xl font-display text-foreground mb-2">{pkg.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-display text-copper">CHF {pkg.price}</span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-6">{pkg.description}</p>
                  <Button 
                    variant={pkg.popular ? "copper" : "outline"} 
                    size="sm" 
                    asChild 
                    className="w-full"
                  >
                    <Link to="/buchung">
                      Auswählen
                      <ChevronRight size={14} className="ml-1" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center">
          <Button variant="link" asChild className="text-copper hover:text-copper-dark">
            <Link to="/preise" className="flex items-center gap-2">
              Alle Preise & Pakete ansehen
              <ChevronRight size={16} />
            </Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
};
