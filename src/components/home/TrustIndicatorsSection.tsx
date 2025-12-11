import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { LazyImage } from "@/components/shared/LazyImage";

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
    title: "Nur für Frauen",
    description: "Ein geschützter Raum, in dem Sie sich vollständig entspannen können.",
  },
  {
    image: certifiedImage,
    title: "Zertifizierte Therapeut:innen",
    description: "Professionell ausgebildet mit jahrelanger Erfahrung in Körperarbeit.",
  },
  {
    image: discretionImage,
    title: "Absolute Diskretion",
    description: "Diskreter Standort, keine Kameras, vollständige Vertraulichkeit.",
  },
  {
    image: choiceImage,
    title: "Sie wählen, wer Sie berührt",
    description: "Freie Wahl der Therapeutin oder des Therapeuten – ganz nach Ihrem Wohlbefinden.",
  },
  {
    image: locationImage,
    title: "Diskrete Lage in Zürich",
    description: "Unauffälliger Eingang ohne Beschilderung, ruhige Umgebung.",
  },
  {
    image: noRushImage,
    title: "Ohne Zeitdruck",
    description: "Jede Session hat ihren eigenen Rhythmus – keine Hektik, keine Eile.",
  },
];

export const TrustIndicatorsSection = () => {
  return (
    <section className="py-16 bg-secondary/20 border-y border-border/50 relative overflow-hidden">
      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container-wide relative">
        <ScrollReveal className="text-center mb-10">
          <p className="text-copper font-medium tracking-[0.2em] uppercase text-xs mb-3">
            Vertrauen & Sicherheit
          </p>
          <h3 className="text-2xl md:text-3xl font-display text-foreground">
            Bei uns sind Sie in guten Händen
          </h3>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {trustIndicators.map((indicator, index) => (
            <ScrollReveal key={indicator.title} direction="up" delay={index * 0.05}>
              <motion.div
                className="text-center group cursor-default"
                whileHover={{ y: -4 }}
              >
                {/* Image container */}
                <div className="relative w-full aspect-square mb-4 rounded-xl overflow-hidden">
                  <LazyImage
                    src={indicator.image}
                    alt={indicator.title}
                    className="group-hover:scale-110 transition-transform duration-500"
                    aspectRatio="square"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <h4 className="text-sm font-display text-foreground mb-2 group-hover:text-copper transition-colors">
                  {indicator.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed hidden lg:block">
                  {indicator.description}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
