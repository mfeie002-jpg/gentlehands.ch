import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Sparkles, Leaf, Moon, Sun, Wind, Droplets, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Moon,
    title: "Deep Dark Relax",
    description: "Sinnesentspannung in völliger Dunkelheit – für maximale Tiefenentspannung.",
    duration: "90–120 Min",
    highlight: "Bestseller",
    benefit: "Nervensystem-Reset",
  },
  {
    icon: Droplets,
    title: "Ocean & Palmen",
    description: "Meeresrauschen und warme Düfte – Ihr persönlicher Kurzurlaub.",
    duration: "60–120 Min",
    benefit: "Urlaubsfeeling",
  },
  {
    icon: Wind,
    title: "Alpine Stille",
    description: "Bergluft und Geborgenheit – inspiriert von der Kraft der Alpen.",
    duration: "60–120 Min",
    benefit: "Erdung & Kraft",
  },
  {
    icon: Leaf,
    title: "Zen Garden",
    description: "Japanische Ästhetik und Harmonie – Meditation durch Berührung.",
    duration: "60–90 Min",
    highlight: "Neu",
    benefit: "Innere Ruhe",
  },
  {
    icon: Sun,
    title: "Urban Loft",
    description: "Modernes Spa-Erlebnis mit industriellem Charme.",
    duration: "60–90 Min",
    benefit: "Selbstfürsorge",
  },
  {
    icon: Sparkles,
    title: "Surprise Experience",
    description: "Vertrauen Sie uns – wir gestalten Ihr Erlebnis intuitiv.",
    duration: "90 Min",
    highlight: "Exklusiv",
    benefit: "Pure Überraschung",
  },
];

export const ExclusiveServicesSection = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-background via-secondary/10 to-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-copper/5 rounded-full blur-[120px] -translate-x-1/2" />
      <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-petrol/5 rounded-full blur-[100px] translate-x-1/2" />

      <div className="container-wide relative">
        <ScrollReveal className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-copper to-transparent w-12" />
            <span className="text-copper font-medium tracking-[0.2em] uppercase text-xs">
              6 Themenräume
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-copper to-transparent w-12" />
          </div>
          <h2 className="text-foreground mb-4">
            Welche <span className="text-gradient-copper">Atmosphäre</span><br className="hidden sm:block" />
            ruft nach Ihnen?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Jeder Raum wurde für ein einzigartiges Sinneserlebnis gestaltet. 
            Wählen Sie nach Stimmung, nicht nach Behandlung.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-12 px-4 sm:px-0">
          {services.map((service, index) => (
            <ScrollReveal key={service.title} delay={index * 0.08}>
              <motion.div
                className="group relative bg-card rounded-2xl p-5 sm:p-6 border border-border hover:border-copper/30 transition-all duration-500 h-full"
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

                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-copper/10 flex items-center justify-center group-hover:bg-copper/20 transition-colors shrink-0">
                    <service.icon className="w-6 h-6 text-copper" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-display text-foreground mb-1">{service.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      {service.description}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs text-muted-foreground">{service.duration}</span>
                      <span className="text-xs text-copper font-medium px-2 py-1 rounded-full bg-copper/10">
                        {service.benefit}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-copper/0 group-hover:bg-copper/3 rounded-2xl transition-colors duration-500 -z-10" />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="copper" size="lg" asChild className="group">
              <Link to="/erlebnisse">
                <Sparkles size={16} className="mr-2" />
                Alle Räume erkunden
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="group border-copper/30 hover:border-copper">
              <Link to="/buchung">
                Direkt buchen
                <ArrowRight size={16} className="ml-2 opacity-50 group-hover:opacity-100 transition-opacity" />
              </Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
