import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Clock, Users, CalendarCheck } from "lucide-react";

export const ExclusivitySection = () => {
  return (
    <section className="section-padding">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center bg-gradient-to-br from-sand to-secondary rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-copper/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-petrol/5 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-8 mb-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock size={18} className="text-copper" />
                <span className="text-sm">Limitierte Termine</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users size={18} className="text-copper" />
                <span className="text-sm">1:1 Betreuung</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CalendarCheck size={18} className="text-copper" />
                <span className="text-sm">Teilweise Warteliste</span>
              </div>
            </div>

            <h2 className="text-foreground mb-6">
              Exklusivität hat ihren Grund
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Um höchste Qualität zu garantieren, begrenzen wir die Anzahl
              unserer Termine. Sollten aktuell keine Termine verfügbar sein,
              können Sie sich auf unsere Warteliste setzen lassen.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="copper" size="lg" asChild>
                <Link to="/buchung">Verfügbarkeit prüfen</Link>
              </Button>
              <Button variant="petrol-outline" size="lg" asChild>
                <Link to="/warteliste">Auf Warteliste setzen</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
