import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Clock, Users, CalendarCheck, Sparkles } from "lucide-react";

const features = [
  { icon: Clock, label: "Limitierte Termine" },
  { icon: Users, label: "1:1 Betreuung" },
  { icon: CalendarCheck, label: "Teilweise Warteliste" },
];

export const ExclusivitySection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background ambient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-sand/30 to-background" />
      
      <div className="container-narrow relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center bg-gradient-to-br from-sand via-secondary/80 to-sand-dark/50 rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden border border-copper/10"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-copper/8 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-petrol/8 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
          
          {/* Sparkle decorations */}
          <motion.div
            className="absolute top-8 right-12 text-copper/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles size={20} />
          </motion.div>
          <motion.div
            className="absolute bottom-12 left-8 text-petrol/30"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles size={16} />
          </motion.div>

          <div className="relative z-10">
            {/* Feature badges */}
            <motion.div 
              className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {features.map((feature, index) => (
                <motion.div 
                  key={feature.label}
                  className="flex items-center gap-2 text-muted-foreground bg-background/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50"
                  whileHover={{ scale: 1.05, borderColor: "hsl(var(--copper) / 0.3)" }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <feature.icon size={16} className="text-copper" />
                  <span className="text-sm font-medium">{feature.label}</span>
                </motion.div>
              ))}
            </motion.div>

            <h2 className="text-foreground text-3xl md:text-4xl lg:text-5xl mb-6">
              Exklusivität hat <span className="text-gradient-copper">ihren Grund</span>
            </h2>
            
            <p className="text-muted-foreground max-w-xl mx-auto mb-10 text-lg leading-relaxed">
              Um höchste Qualität zu garantieren, begrenzen wir die Anzahl
              unserer Termine. Sollten aktuell keine Termine verfügbar sein,
              können Sie sich auf unsere Warteliste setzen lassen.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Button variant="copper" size="lg" asChild className="min-w-[200px] shadow-copper">
                  <Link to="/buchung">Verfügbarkeit prüfen</Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Button variant="outline" size="lg" asChild className="min-w-[200px] border-copper/30 hover:border-copper hover:bg-copper/5">
                  <Link to="/warteliste">Auf Warteliste setzen</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
