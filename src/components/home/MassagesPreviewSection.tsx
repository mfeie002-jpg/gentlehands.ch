import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Star, Sparkles } from "lucide-react";
import spaRoom from "@/assets/spa-massage-room.jpg";

const massages = [
  {
    id: "deep-release",
    title: "Deep Release Session",
    duration: "90 / 120 Min",
    description:
      "Intensive Tiefenentspannung für körperliches und mentales Loslassen.",
    highlight: "Beliebt",
    highlightColor: "bg-copper/10 text-copper",
  },
  {
    id: "stress-reset",
    title: "Stress Reset",
    duration: "60 / 90 Min",
    description:
      "Gezielte Entlastung für berufstätige Frauen mit wenig Zeit.",
    highlight: null,
    highlightColor: "",
  },
  {
    id: "emotional-grounding",
    title: "Emotional Grounding",
    duration: "90 Min",
    description:
      "Beruhigung des Nervensystems und Rückkehr ins körperliche Wohlgefühl.",
    highlight: null,
    highlightColor: "",
  },
  {
    id: "ganzkoerper",
    title: "Ganzkörper Tiefenentspannung",
    duration: "120 Min",
    description:
      "Das vollständige Programm für maximale Entspannung von Kopf bis Fuss.",
    highlight: "Premium",
    highlightColor: "bg-petrol/10 text-petrol",
  },
];

export const MassagesPreviewSection = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-secondary/30 via-muted/20 to-background relative overflow-hidden">
      {/* Ambient effects */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-copper/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-petrol/5 rounded-full blur-[120px]" />
      
      <div className="container-wide relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center px-4 sm:px-0">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <motion.div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-copper" />
              <span className="text-copper font-medium tracking-[0.2em] uppercase text-xs">
                Unsere Massagen
              </span>
            </motion.div>
            
            <h2 className="text-foreground text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6">
              Individuell auf Sie <span className="text-gradient-copper">abgestimmt</span>
            </h2>
            <p className="text-muted-foreground mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
              Jede Massage lässt sich mit jedem unserer Themes kombinieren.
              Gemeinsam finden wir die perfekte Kombination für Ihre
              Bedürfnisse.
            </p>

            {/* Massages List */}
            <div className="space-y-3 mb-6 sm:mb-8">
              {massages.map((massage, index) => (
                <motion.div
                  key={massage.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link
                    to={`/massagen#${massage.id}`}
                    className="group block p-4 sm:p-5 rounded-xl bg-card border border-border hover:border-copper/30 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-display text-base sm:text-lg text-foreground group-hover:text-copper transition-colors">
                            {massage.title}
                          </h4>
                          {massage.highlight && (
                            <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${massage.highlightColor}`}>
                              {massage.highlight}
                            </span>
                          )}
                        </div>
                        <p className="text-muted-foreground text-sm">
                          {massage.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground text-xs sm:text-sm shrink-0 bg-secondary/50 px-2.5 sm:px-3 py-1 rounded-full w-fit">
                        <Clock size={14} className="text-copper" />
                        <span>{massage.duration}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button variant="copper" size="lg" asChild className="group shadow-copper">
                <Link to="/massagen">
                  Alle Massagen ansehen
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden relative group">
              <img 
                src={spaRoom}
                alt="GentleHands Massageraum mit warmem Licht"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
              
              {/* Decorative sparkle */}
              <motion.div
                className="absolute top-6 right-6 text-copper/60"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={24} />
              </motion.div>
            </div>

            {/* Floating Badge */}
            <motion.div 
              className="absolute -bottom-4 -left-4 bg-card rounded-2xl p-5 shadow-lg border border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Star size={18} className="text-copper fill-copper" />
                <p className="text-2xl font-display text-foreground">4.9/5</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Kundenzufriedenheit
              </p>
            </motion.div>
            
            {/* Decorative ring */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-copper/20 rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
