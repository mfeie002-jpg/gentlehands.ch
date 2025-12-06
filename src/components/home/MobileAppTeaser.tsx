import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Smartphone, Calendar, Bell, Gift } from "lucide-react";

const features = [
  { icon: Calendar, label: "Einfache Buchung" },
  { icon: Bell, label: "Termin-Erinnerungen" },
  { icon: Gift, label: "Exklusive Angebote" },
];

export const MobileAppTeaser = () => {
  return (
    <section className="section-padding-sm bg-gradient-to-r from-copper/5 via-background to-petrol/5">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <ScrollReveal direction="left" className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-copper/10 flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-copper" />
              </div>
              <div>
                <span className="text-copper text-xs font-medium uppercase tracking-wider">Bald verfügbar</span>
                <h3 className="text-xl font-display text-foreground">GentleHands App</h3>
              </div>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Buchen Sie Ihre Termine noch einfacher, erhalten Sie exklusive Angebote und verwalten Sie Ihre Wellness-Reise.
            </p>
            <div className="flex flex-wrap gap-4">
              {features.map((feature) => (
                <div key={feature.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <feature.icon size={14} className="text-copper" />
                  <span>{feature.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="bg-card border border-border rounded-xl px-6 py-3 flex items-center gap-3 opacity-50">
                <div className="w-8 h-8 bg-muted rounded-lg" />
                <div>
                  <p className="text-xs text-muted-foreground">Bald im</p>
                  <p className="text-sm font-medium text-foreground">App Store</p>
                </div>
              </div>
              <div className="bg-card border border-border rounded-xl px-6 py-3 flex items-center gap-3 opacity-50">
                <div className="w-8 h-8 bg-muted rounded-lg" />
                <div>
                  <p className="text-xs text-muted-foreground">Bald bei</p>
                  <p className="text-sm font-medium text-foreground">Google Play</p>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
