import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Shield, Award, Lock, UserCheck, MapPin, Clock } from "lucide-react";

const trustIndicators = [
  {
    icon: Shield,
    title: "Nur für Frauen",
    description: "Ein geschützter Raum, in dem Sie sich vollständig entspannen können.",
  },
  {
    icon: Award,
    title: "Zertifizierte Therapeut:innen",
    description: "Professionell ausgebildet mit jahrelanger Erfahrung in Körperarbeit.",
  },
  {
    icon: Lock,
    title: "Absolute Diskretion",
    description: "Diskreter Standort, keine Kameras, vollständige Vertraulichkeit.",
  },
  {
    icon: UserCheck,
    title: "Sie wählen, wer Sie berührt",
    description: "Freie Wahl der Therapeutin oder des Therapeuten – ganz nach Ihrem Wohlbefinden.",
  },
  {
    icon: MapPin,
    title: "Diskrete Lage in Zürich",
    description: "Unauffälliger Eingang ohne Beschilderung, ruhige Umgebung.",
  },
  {
    icon: Clock,
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {trustIndicators.map((indicator, index) => (
            <ScrollReveal key={indicator.title} direction="up" delay={index * 0.05}>
              <motion.div
                className="text-center p-4 rounded-xl group cursor-default"
                whileHover={{ y: -4 }}
              >
                <motion.div
                  className="w-12 h-12 mx-auto mb-4 rounded-xl bg-copper/10 flex items-center justify-center group-hover:bg-copper/20 group-hover:scale-110 transition-all duration-300"
                  whileHover={{ rotate: 5 }}
                >
                  <indicator.icon size={24} className="text-copper" />
                </motion.div>
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
