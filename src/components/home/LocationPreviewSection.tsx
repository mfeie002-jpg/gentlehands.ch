import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { MapPin, Clock, Car, Train } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import locationImage from "@/assets/room-empfang.jpg";

export const LocationPreviewSection = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-secondary/20 to-background relative overflow-hidden">
      <div className="container-wide relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <ScrollReveal direction="left">
            <motion.div
              className="relative rounded-2xl overflow-hidden aspect-[4/3]"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={locationImage}
                alt="GentleHands Empfang"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
              
              {/* Floating Badge */}
              <motion.div
                className="absolute bottom-6 left-6 bg-card/90 backdrop-blur-sm px-4 py-3 rounded-xl border border-border"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-3">
                  <MapPin className="text-copper" size={20} />
                  <div>
                    <p className="text-foreground font-medium text-sm">Zürich Zentrum</p>
                    <p className="text-muted-foreground text-xs">Diskrete Lage</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </ScrollReveal>

          {/* Content */}
          <ScrollReveal direction="right">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px bg-gradient-to-r from-copper to-transparent w-8" />
                <span className="text-copper font-medium tracking-[0.2em] uppercase text-xs">
                  Standort
                </span>
              </div>

              <h2 className="text-foreground text-3xl md:text-4xl mb-6">
                Ihr <span className="text-gradient-copper">Rückzugsort</span> mitten in Zürich
              </h2>

              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Zentral gelegen und dennoch diskret – unser Studio ist Ihr privater Rückzugsort 
                vom hektischen Stadtleben. Leicht erreichbar, aber abseits des Trubels.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-copper/10 flex items-center justify-center">
                    <Train size={18} className="text-copper" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium text-sm">5 Min vom HB Zürich</p>
                    <p className="text-muted-foreground text-xs">Öffentliche Verkehrsmittel</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-copper/10 flex items-center justify-center">
                    <Car size={18} className="text-copper" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium text-sm">Parkplätze verfügbar</p>
                    <p className="text-muted-foreground text-xs">Öffentliches Parkhaus in der Nähe</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-copper/10 flex items-center justify-center">
                    <Clock size={18} className="text-copper" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium text-sm">Mo–Sa, 10–21 Uhr</p>
                    <p className="text-muted-foreground text-xs">Termine nach Vereinbarung</p>
                  </div>
                </div>
              </div>

              <Button variant="outline" size="lg" asChild className="border-copper/30 hover:border-copper">
                <Link to="/kontakt">Anfahrt & Kontakt</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
