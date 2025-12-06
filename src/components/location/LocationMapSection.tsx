import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { MapPin, Clock, Car, Train, Phone } from "lucide-react";

import zurichMap from "@/assets/zurich-map.jpg";

const transportOptions = [
  { icon: Train, label: "5 Min vom HB", description: "Tram 4, 15 oder S-Bahn" },
  { icon: Car, label: "Parkhaus nebenan", description: "Globus Parkhaus, 3 Min Fussweg" },
];

const openingHours = [
  { day: "Mo–Fr", hours: "09:00 – 20:00" },
  { day: "Sa", hours: "10:00 – 18:00" },
  { day: "So", hours: "Geschlossen" },
];

export const LocationMapSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="left">
            <span className="text-copper text-sm font-medium uppercase tracking-wider mb-4 block">
              Standort
            </span>
            <h2 className="text-foreground text-3xl md:text-4xl mb-6">
              Finden Sie uns im <span className="text-gradient-copper">Herzen Zürichs</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Unser Studio befindet sich diskret an bester Lage – einfach erreichbar und 
              dennoch ein Rückzugsort vom Trubel der Stadt.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-copper/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-copper" />
                </div>
                <div>
                  <p className="text-foreground font-medium">Adresse</p>
                  <p className="text-muted-foreground">Bahnhofstrasse 42, 8001 Zürich</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-copper/10 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-copper" />
                </div>
                <div>
                  <p className="text-foreground font-medium mb-2">Öffnungszeiten</p>
                  <div className="space-y-1">
                    {openingHours.map((item) => (
                      <div key={item.day} className="flex justify-between text-sm max-w-[200px]">
                        <span className="text-muted-foreground">{item.day}</span>
                        <span className="text-foreground">{item.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              {transportOptions.map((option) => (
                <div
                  key={option.label}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary/50 border border-border/50"
                >
                  <option.icon size={18} className="text-copper" />
                  <div>
                    <p className="text-foreground text-sm font-medium">{option.label}</p>
                    <p className="text-muted-foreground text-xs">{option.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <motion.div
              className="relative rounded-2xl overflow-hidden"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={zurichMap}
                alt="Standort GentleHands Zürich"
                className="w-full aspect-square object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent pointer-events-none" />
              
              {/* Map pin */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-copper flex items-center justify-center shadow-lg shadow-copper/30">
                    <MapPin className="w-6 h-6 text-background" />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-copper rotate-45" />
                </div>
              </motion.div>

              {/* Overlay card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-background/95 backdrop-blur-sm rounded-xl">
                <p className="text-foreground font-medium">GentleHands Zürich</p>
                <p className="text-muted-foreground text-sm">Bahnhofstrasse 42</p>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
