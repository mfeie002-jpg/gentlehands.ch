import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Crown, Check, Sparkles } from "lucide-react";

const benefits = [
  "Bevorzugte Terminvergabe",
  "Exklusive Rabatte",
  "Kostenlose Upgrades",
  "Persönliche Betreuung",
];

export const MembershipTeaser = () => {
  return (
    <section className="section-padding-sm bg-gradient-to-r from-foreground via-foreground/95 to-foreground relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-copper/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-petrol/20 rounded-full blur-[100px]" />

      <div className="container-wide relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <ScrollReveal direction="left" className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-copper/20 flex items-center justify-center">
                <Crown className="w-6 h-6 text-copper" />
              </div>
              <div>
                <span className="text-copper text-xs font-medium uppercase tracking-wider">Exklusiv</span>
                <h3 className="text-xl font-display text-background">GentleHands Membership</h3>
              </div>
            </div>
            <p className="text-background/80 text-lg mb-6 max-w-md">
              Werden Sie Teil unseres exklusiven Kreises und geniessen Sie besondere Vorteile.
            </p>
            <ul className="space-y-3 mb-6">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3 text-background/70">
                  <div className="w-5 h-5 rounded-full bg-copper/20 flex items-center justify-center">
                    <Check size={12} className="text-copper" />
                  </div>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <motion.div
              className="bg-card/10 backdrop-blur-sm rounded-2xl p-8 border border-background/10 text-center"
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-background/60 text-sm mb-2">Ab</p>
              <p className="text-4xl font-display text-copper mb-2">CHF 99</p>
              <p className="text-background/60 text-sm mb-6">pro Monat</p>
              <Button variant="copper" size="lg" asChild>
                <Link to="/membership">
                  <Sparkles size={16} className="mr-2" />
                  Mehr erfahren
                </Link>
              </Button>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
