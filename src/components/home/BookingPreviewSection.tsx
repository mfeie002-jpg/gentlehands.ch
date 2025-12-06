import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Palette, User, Settings, Calendar, CheckCircle } from "lucide-react";

const bookingSteps = [
  { icon: Palette, label: "Theme wählen", color: "from-petrol/20 to-petrol/5" },
  { icon: User, label: "Therapeut:in", color: "from-copper/20 to-copper/5" },
  { icon: Settings, label: "Präferenzen", color: "from-forest/20 to-forest/5" },
  { icon: Clock, label: "Dauer", color: "from-copper/20 to-copper/5" },
  { icon: Calendar, label: "Termin", color: "from-petrol/20 to-petrol/5" },
  { icon: CheckCircle, label: "Bestätigung", color: "from-forest/20 to-forest/5" },
];

export const BookingPreviewSection = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-secondary/20 to-background relative overflow-hidden">
      {/* Ambient effects */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-copper/3 rounded-full blur-[180px] pointer-events-none" />

      <div className="container-wide relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <ScrollReveal>
            <motion.div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-copper" />
              <span className="text-copper font-medium tracking-[0.2em] uppercase text-xs">
                Einfache Buchung
              </span>
            </motion.div>

            <h2 className="text-foreground text-3xl md:text-4xl lg:text-5xl mb-6">
              Ihr Erlebnis, <span className="text-gradient-copper">Schritt für Schritt</span>
            </h2>

            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Unser Online-Buchungssystem führt Sie in wenigen Minuten durch alle Optionen. 
              Wählen Sie Atmosphäre, Therapeut:in, Dauer und Ihre persönlichen Präferenzen – 
              alles übersichtlich und ohne Zeitdruck.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-muted-foreground">
                <CheckCircle size={18} className="text-copper" />
                <span>Keine Registrierung erforderlich</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <CheckCircle size={18} className="text-copper" />
                <span>Persönliche Bestätigung innerhalb von 24h</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <CheckCircle size={18} className="text-copper" />
                <span>Kostenlose Stornierung bis 24h vorher</span>
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button variant="copper" size="lg" asChild className="group shadow-copper">
                <Link to="/buchung">
                  Jetzt Buchung starten
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </ScrollReveal>

          {/* Visual - Booking Steps Preview */}
          <ScrollReveal direction="up" delay={0.2}>
            <div className="relative">
              {/* Decorative background */}
              <div className="absolute inset-0 bg-gradient-to-br from-copper/5 via-secondary/30 to-petrol/5 rounded-3xl -rotate-2" />
              
              <div className="relative bg-card rounded-3xl p-8 border border-border shadow-xl">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-amber-400/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  <span className="ml-3 text-xs text-muted-foreground">gentlehands.ch/buchung</span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {bookingSteps.map((step, index) => (
                    <motion.div
                      key={step.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="text-center p-4 rounded-xl bg-secondary/50 border border-border/50 group hover:border-copper/30 transition-colors"
                    >
                      <div className={`w-10 h-10 mx-auto rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                        <step.icon size={18} className="text-foreground" />
                      </div>
                      <span className="text-xs text-muted-foreground">{step.label}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className={`w-8 h-1 rounded-full ${i <= 3 ? 'bg-copper' : 'bg-border'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
