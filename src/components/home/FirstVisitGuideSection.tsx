import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Shirt, MessageCircle, Sparkles, ChevronRight } from "lucide-react";

const steps = [
  {
    icon: MapPin,
    title: "Ankunft",
    description: "Kommen Sie 10 Minuten vor Ihrem Termin an. Wir empfangen Sie persönlich.",
  },
  {
    icon: Shirt,
    title: "Umziehen",
    description: "Ein privater Raum steht bereit. Roben und Handtücher sind vorhanden.",
  },
  {
    icon: MessageCircle,
    title: "Vorgespräch",
    description: "Kurzes Gespräch über Ihre Wünsche, Grenzen und Erwartungen.",
  },
  {
    icon: Sparkles,
    title: "Geniessen",
    description: "Entspannen Sie sich. Wir kümmern uns um alles.",
  },
];

export const FirstVisitGuideSection = () => {
  return (
    <section className="section-padding-sm bg-gradient-to-r from-copper/5 via-background to-copper/5">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="left">
            <div>
              <div className="inline-flex items-center gap-2 bg-copper/10 px-4 py-2 rounded-full mb-4">
                <Clock size={14} className="text-copper" />
                <span className="text-copper text-sm font-medium">Erster Besuch?</span>
              </div>

              <h2 className="text-foreground text-3xl md:text-4xl mb-6">
                So läuft Ihr <span className="text-gradient-copper">erster Termin</span> ab
              </h2>

              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Wir verstehen, dass der erste Besuch aufregend sein kann. 
                Hier erfahren Sie, was Sie erwartet – damit Sie sich voll und ganz entspannen können.
              </p>

              <Button variant="outline" size="lg" asChild className="border-copper/30 hover:border-copper">
                <Link to="/vorbereitung" className="flex items-center gap-2">
                  Zur Vorbereitung
                  <ChevronRight size={16} />
                </Link>
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="space-y-4">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  className="flex items-start gap-4 p-4 rounded-xl bg-card/50 border border-border/50 hover:border-copper/30 transition-all"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-display text-copper/30">{index + 1}</span>
                    <div className="w-10 h-10 rounded-lg bg-copper/10 flex items-center justify-center">
                      <step.icon size={18} className="text-copper" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-foreground font-medium text-sm mb-1">{step.title}</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
