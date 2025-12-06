import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Calendar, Clock, CreditCard, RefreshCcw, Shield, Gift } from "lucide-react";

const benefits = [
  { icon: Calendar, title: "Flexible Termine", description: "Mo–Sa, 10–21 Uhr" },
  { icon: Clock, title: "Pünktlicher Start", description: "Keine Wartezeiten" },
  { icon: CreditCard, title: "Einfache Zahlung", description: "Bar, Karte, TWINT" },
  { icon: RefreshCcw, title: "Kostenlose Stornierung", description: "Bis 24h vorher" },
  { icon: Shield, title: "Zufriedenheitsgarantie", description: "Oder Geld zurück" },
  { icon: Gift, title: "Gutscheine verfügbar", description: "Das perfekte Geschenk" },
];

export const BookingBenefitsSection = () => {
  return (
    <section className="py-10 bg-card border-y border-border">
      <div className="container-wide">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {benefits.map((benefit, index) => (
            <ScrollReveal key={benefit.title} delay={index * 0.05}>
              <motion.div
                className="text-center group"
                whileHover={{ y: -2 }}
              >
                <div className="w-10 h-10 rounded-lg bg-copper/10 flex items-center justify-center mx-auto mb-2 group-hover:bg-copper/20 transition-colors">
                  <benefit.icon size={18} className="text-copper" />
                </div>
                <p className="text-foreground text-sm font-medium">{benefit.title}</p>
                <p className="text-muted-foreground text-xs">{benefit.description}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
