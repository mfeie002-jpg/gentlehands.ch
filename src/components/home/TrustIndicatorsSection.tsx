import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { LazyImage } from "@/components/shared/LazyImage";
import { Shield, Heart, Eye, Users, MapPin, Clock } from "lucide-react";

// Import emotional images
import womenOnlyImage from "@/assets/emotional-private-moment.jpg";
import certifiedImage from "@/assets/emotional-therapist-hands.jpg";
import discretionImage from "@/assets/emotional-discreet-entrance.jpg";
import choiceImage from "@/assets/emotional-content-smile.jpg";
import locationImage from "@/assets/emotional-relaxed-face.jpg";
import noRushImage from "@/assets/emotional-no-rush.jpg";

const trustIndicators = [
  {
    image: womenOnlyImage,
    icon: Shield,
    title: "Nur für Frauen",
    description: "Geschützter Raum für vollständige Entspannung.",
  },
  {
    image: certifiedImage,
    icon: Heart,
    title: "Zertifiziert",
    description: "Professionell ausgebildete Therapeut:innen.",
  },
  {
    image: discretionImage,
    icon: Eye,
    title: "100% Diskret",
    description: "Keine Kameras, vollständige Vertraulichkeit.",
  },
  {
    image: choiceImage,
    icon: Users,
    title: "Ihre Wahl",
    description: "Freie Wahl der Therapeut:in.",
  },
  {
    image: locationImage,
    icon: MapPin,
    title: "Diskrete Lage",
    description: "Unauffälliger Eingang in Zürich.",
  },
  {
    image: noRushImage,
    icon: Clock,
    title: "Ohne Zeitdruck",
    description: "Jede Session hat ihren eigenen Rhythmus.",
  },
];

export const TrustIndicatorsSection = () => {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-secondary/30 to-background border-y border-border/30 relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-copper/5 via-transparent to-copper/5 pointer-events-none" />

      <div className="container-wide relative px-4 sm:px-6">
        <ScrollReveal className="text-center mb-8 sm:mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-copper/10 border border-copper/20 text-copper text-xs font-medium mb-3">
            <Shield size={14} />
            Vertrauen & Sicherheit
          </span>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-display text-foreground">
            Bei uns sind Sie in guten Händen
          </h3>
        </ScrollReveal>

        {/* Mobile: 2 columns, Tablet: 3 columns, Desktop: 6 columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
          {trustIndicators.map((indicator, index) => (
            <ScrollReveal key={indicator.title} direction="up" delay={index * 0.03}>
              <motion.div
                className="group cursor-default h-full"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-card/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-border/50 hover:border-copper/30 hover:bg-card transition-all duration-300 h-full">
                  {/* Image with icon overlay */}
                  <div className="relative w-full aspect-square mb-3 rounded-lg sm:rounded-xl overflow-hidden">
                    <LazyImage
                      src={indicator.image}
                      alt={indicator.title}
                      className="group-hover:scale-105 transition-transform duration-500"
                      aspectRatio="square"
                    />
                    {/* Icon overlay */}
                    <div className="absolute bottom-2 right-2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center border border-border/50 shadow-sm">
                      <indicator.icon size={14} className="sm:w-4 sm:h-4 text-copper" />
                    </div>
                  </div>
                  
                  <h4 className="text-xs sm:text-sm font-display font-medium text-foreground mb-1 group-hover:text-copper transition-colors leading-tight">
                    {indicator.title}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {indicator.description}
                  </p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
