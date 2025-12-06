import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Volume2, Droplets, Sun, Wind } from "lucide-react";

import roomOzean from "@/assets/room-ozean.jpg";

const atmosphereElements = [
  { icon: Sun, label: "Stimmungslicht", description: "Warmes, dimmbares Licht" },
  { icon: Volume2, label: "Klangwelten", description: "Kuratierte Playlists" },
  { icon: Droplets, label: "Aromatherapie", description: "Premium Düfte" },
  { icon: Wind, label: "Raumklima", description: "Optimale Temperatur" },
];

export const AtmosphereSection = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Ambient effects */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-petrol/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="container-wide relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <ScrollReveal className="order-2 lg:order-1">
            <div className="relative">
              <motion.div
                className="aspect-[4/3] rounded-3xl overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={roomOzean}
                  alt="GentleHands Themenraum Ozean"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
              </motion.div>

              {/* Floating badges */}
              <motion.div
                className="absolute -bottom-4 -right-4 bg-card rounded-2xl p-4 shadow-lg border border-border"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-2xl font-display text-foreground">6</p>
                <p className="text-xs text-muted-foreground">Einzigartige Themes</p>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* Content */}
          <ScrollReveal className="order-1 lg:order-2" delay={0.1}>
            <motion.div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-copper" />
              <span className="text-copper font-medium tracking-[0.2em] uppercase text-xs">
                Alle Sinne ansprechen
              </span>
            </motion.div>

            <h2 className="text-foreground text-3xl md:text-4xl lg:text-5xl mb-6">
              Atmosphäre, die <span className="text-gradient-copper">berührt</span>
            </h2>

            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Jeder Raum bei GentleHands ist ein Gesamtkunstwerk. 
              Licht, Klänge, Düfte und Temperatur sind perfekt aufeinander abgestimmt, 
              um Sie vom ersten Moment an in eine andere Welt zu entführen.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {atmosphereElements.map((element, index) => (
                <motion.div
                  key={element.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50 border border-border/50 group hover:border-copper/20 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-copper/10 flex items-center justify-center group-hover:bg-copper/20 transition-colors">
                    <element.icon size={20} className="text-copper" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{element.label}</p>
                    <p className="text-xs text-muted-foreground">{element.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
