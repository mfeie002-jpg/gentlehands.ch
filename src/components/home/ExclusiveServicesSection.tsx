import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Sparkles, Leaf, Moon, Sun, Wind, Droplets } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Moon,
    title: "Deep Dark Relax",
    description: "Sinnesentspannung in völliger Dunkelheit – für maximale Tiefenentspannung und sensorische Ruhe.",
    duration: "90–120 Min",
    highlight: "Bestseller",
  },
  {
    icon: Droplets,
    title: "Ocean & Palmen",
    description: "Meeresrauschen, warme Düfte und sanfte Wellen – Ihr persönlicher Kurzurlaub mitten in Zürich.",
    duration: "60–120 Min",
    highlight: null,
  },
  {
    icon: Wind,
    title: "Alpine Stille",
    description: "Bergluft und Geborgenheit – eine erdende Erfahrung inspiriert von der Kraft der Schweizer Alpen.",
    duration: "60–120 Min",
    highlight: null,
  },
  {
    icon: Leaf,
    title: "Zen Garden",
    description: "Japanische Ästhetik, Bambus und Harmonie – Meditation durch Berührung in minimalistischem Ambiente.",
    duration: "60–90 Min",
    highlight: "Neu",
  },
  {
    icon: Sun,
    title: "Urban Loft",
    description: "Modernes Spa-Erlebnis mit industriellem Charme – für die Frau von heute.",
    duration: "60–90 Min",
    highlight: null,
  },
  {
    icon: Sparkles,
    title: "Surprise Experience",
    description: "Vertrauen Sie uns – wir gestalten Ihr Erlebnis intuitiv basierend auf Ihren Bedürfnissen.",
    duration: "90 Min",
    highlight: "Exklusiv",
  },
];

export const ExclusiveServicesSection = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-background via-secondary/10 to-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-copper/5 rounded-full blur-[120px] -translate-x-1/2" />
      <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-petrol/5 rounded-full blur-[100px] translate-x-1/2" />

      <div className="container-wide relative">
        <ScrollReveal className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-copper to-transparent w-12" />
            <span className="text-copper font-medium tracking-[0.2em] uppercase text-xs">
              Exklusive Erlebnisse
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-copper to-transparent w-12" />
          </div>
          <h2 className="text-foreground mb-4">
            Sechs <span className="text-gradient-copper">Atmosphären</span>,<br className="hidden sm:block" />
            unendliche Entspannung
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Jeder Themenraum wurde sorgfältig gestaltet, um ein einzigartiges Sinneserlebnis zu schaffen.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <ScrollReveal key={service.title} delay={index * 0.1}>
              <motion.div
                className="group relative bg-card rounded-2xl p-6 border border-border hover:border-copper/30 transition-all duration-500 h-full"
                whileHover={{ y: -4 }}
              >
                {/* Highlight Badge */}
                {service.highlight && (
                  <div className="absolute -top-3 right-4">
                    <span className="bg-copper text-accent-foreground text-xs font-medium px-3 py-1 rounded-full">
                      {service.highlight}
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-copper/10 flex items-center justify-center mb-4 group-hover:bg-copper/20 transition-colors">
                  <service.icon className="w-6 h-6 text-copper" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-display text-foreground mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Duration */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-copper font-medium">{service.duration}</span>
                  <motion.div
                    className="w-8 h-8 rounded-full bg-copper/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Sparkles className="w-4 h-4 text-copper" />
                  </motion.div>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-copper/0 group-hover:bg-copper/3 rounded-2xl transition-colors duration-500 -z-10" />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center">
          <Button variant="copper" size="lg" asChild>
            <Link to="/erlebnisse">
              <Sparkles size={16} className="mr-2" />
              Alle Erlebnisse entdecken
            </Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
};
