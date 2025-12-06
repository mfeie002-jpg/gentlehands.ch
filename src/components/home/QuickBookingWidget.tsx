import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, ChevronRight } from "lucide-react";

const quickOptions = [
  { label: "60 Min Entspannung", price: "ab CHF 120", link: "/buchung" },
  { label: "90 Min Tiefenentspannung", price: "ab CHF 175", link: "/buchung", popular: true },
  { label: "120 Min Premium", price: "ab CHF 230", link: "/buchung" },
];

export const QuickBookingWidget = () => {
  return (
    <section className="section-padding-sm bg-card border-y border-border">
      <div className="container-wide">
        <ScrollReveal className="text-center mb-10">
          <h2 className="text-foreground text-2xl md:text-3xl mb-2">
            Schnell & einfach <span className="text-gradient-copper">buchen</span>
          </h2>
          <p className="text-muted-foreground">Wählen Sie Ihre bevorzugte Dauer</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {quickOptions.map((option, index) => (
            <ScrollReveal key={option.label} delay={index * 0.1}>
              <motion.div
                className={`relative p-6 rounded-2xl border ${option.popular ? 'border-copper bg-copper/5' : 'border-border bg-background'} hover:border-copper/50 transition-all`}
                whileHover={{ y: -4 }}
              >
                {option.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-copper text-accent-foreground text-xs font-medium px-3 py-1 rounded-full">
                      Beliebt
                    </span>
                  </div>
                )}
                <div className="text-center">
                  <p className="text-foreground font-display font-medium mb-1">{option.label}</p>
                  <p className="text-copper text-lg font-medium mb-4">{option.price}</p>
                  <Button variant={option.popular ? "copper" : "outline"} size="sm" asChild className="w-full">
                    <Link to={option.link} className="flex items-center justify-center gap-2">
                      Auswählen
                      <ChevronRight size={14} />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
