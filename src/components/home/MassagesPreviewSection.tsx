import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";

const massages = [
  {
    id: "deep-release",
    title: "Deep Release Session",
    duration: "90 / 120 Min",
    description:
      "Intensive Tiefenentspannung für körperliches und mentales Loslassen.",
    highlight: "Beliebt",
  },
  {
    id: "stress-reset",
    title: "Stress Reset",
    duration: "60 / 90 Min",
    description:
      "Gezielte Entlastung für berufstätige Frauen mit wenig Zeit.",
    highlight: null,
  },
  {
    id: "emotional-grounding",
    title: "Emotional Grounding",
    duration: "90 Min",
    description:
      "Beruhigung des Nervensystems und Rückkehr ins körperliche Wohlgefühl.",
    highlight: null,
  },
  {
    id: "ganzkoerper",
    title: "Ganzkörper Tiefenentspannung",
    duration: "120 Min",
    description:
      "Das vollständige Programm für maximale Entspannung von Kopf bis Fuss.",
    highlight: "Premium",
  },
];

export const MassagesPreviewSection = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-copper font-medium tracking-wide uppercase text-sm mb-4">
              Unsere Massagen
            </p>
            <h2 className="text-foreground mb-6">
              Individuell auf Sie abgestimmt
            </h2>
            <p className="text-muted-foreground mb-8">
              Jede Massage lässt sich mit jedem unserer Themes kombinieren.
              Gemeinsam finden wir die perfekte Kombination für Ihre
              Bedürfnisse.
            </p>

            {/* Massages List */}
            <div className="space-y-4 mb-8">
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
                    className="group block p-5 rounded-xl bg-card border border-border hover:border-copper/30 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-display text-lg text-foreground group-hover:text-primary transition-colors">
                            {massage.title}
                          </h4>
                          {massage.highlight && (
                            <span className="px-2 py-0.5 text-xs font-medium bg-copper/10 text-copper rounded-full">
                              {massage.highlight}
                            </span>
                          )}
                        </div>
                        <p className="text-muted-foreground text-sm">
                          {massage.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground text-sm shrink-0">
                        <Clock size={14} />
                        <span>{massage.duration}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <Button variant="copper" size="lg" asChild>
              <Link to="/massagen">
                Alle Massagen ansehen
                <ArrowRight size={18} />
              </Link>
            </Button>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-sand to-sand-dark overflow-hidden relative">
              {/* Placeholder for actual image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-copper/20 flex items-center justify-center">
                    <span className="text-copper text-4xl">✧</span>
                  </div>
                  <p className="text-warm-gray text-sm">
                    [Platzhalter: Bild eines ruhigen Massageraums mit warmem Licht]
                  </p>
                </div>
              </div>
              {/* Decorative overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-sand-dark/80 to-transparent" />
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-4 -left-4 bg-card rounded-2xl p-5 shadow-lg border border-border">
              <p className="text-2xl font-display text-foreground mb-1">4.9/5</p>
              <p className="text-sm text-muted-foreground">
                Kundenzufriedenheit
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
