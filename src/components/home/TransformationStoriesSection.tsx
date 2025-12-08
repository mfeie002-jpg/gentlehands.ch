import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Quote, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const stories = [
  {
    name: "Sabine",
    age: 42,
    role: "Führungskraft & Mutter",
    before: "Ich habe jahrelang nur funktioniert. Für die Firma, für die Kinder, für alle. Irgendwann konnte ich nicht mehr weinen, nicht mehr lachen – ich war einfach nur noch taub.",
    after: "Schon nach der ersten Session spürte ich wieder meinen Körper. Nach regelmässigen Besuchen habe ich gelernt, mir selbst wieder zu erlauben, Gefühle zu haben. Das hat mein Leben verändert.",
    sessions: 12,
  },
  {
    name: "Claudia",
    age: 35,
    role: "Ärztin",
    before: "Als Ärztin sorge ich den ganzen Tag für andere. Abends war ich so erschöpft, dass ich nicht mal mehr die Energie hatte, etwas für mich zu tun.",
    after: "GentleHands ist mein Ritual geworden. Einmal im Monat lasse ich mich komplett fallen. Es ist der einzige Ort, wo ich nicht funktionieren muss.",
    sessions: 8,
  },
  {
    name: "Nina",
    age: 29,
    role: "Unternehmerin",
    before: "Ich hatte vergessen, wie sich Entspannung anfühlt. Mein Körper war ein einziger Knoten. Nachts lag ich wach und grübelte.",
    after: "Die Kombination aus Atmosphäre, Musik und professioneller Massage – das gibt es nirgendwo sonst. Ich schlafe wieder, ich fühle mich wieder.",
    sessions: 6,
  },
];

export const TransformationStoriesSection = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-secondary/20 via-background to-secondary/10 relative overflow-hidden">
      {/* Ambient effects */}
      <div className="absolute top-1/3 left-0 w-[350px] h-[350px] bg-copper/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-[300px] h-[300px] bg-petrol/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-wide relative">
        <ScrollReveal className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-copper to-transparent w-12" />
            <span className="text-copper font-medium tracking-[0.2em] uppercase text-xs">
              Echte Geschichten
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-copper to-transparent w-12" />
          </div>

          <h2 className="text-foreground text-2xl sm:text-3xl md:text-4xl mb-4">
            Frauen wie Sie haben <span className="text-gradient-copper">zurück zu sich gefunden</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Jede Geschichte ist anders – und doch verbindet sie alle dasselbe: 
            der Wunsch nach Ruhe, Regeneration und einem Moment nur für sich.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {stories.map((story, index) => (
            <ScrollReveal key={story.name} delay={index * 0.1}>
              <motion.div
                className="h-full flex flex-col p-6 sm:p-8 rounded-2xl bg-card border border-border hover:border-copper/30 transition-all duration-300"
                whileHover={{ y: -4 }}
              >
                {/* Quote icon */}
                <div className="w-10 h-10 rounded-lg bg-copper/10 flex items-center justify-center mb-4">
                  <Quote size={20} className="text-copper" />
                </div>

                {/* Before */}
                <div className="mb-4">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Vorher</span>
                  <p className="text-muted-foreground/80 text-sm italic mt-1 leading-relaxed">
                    «{story.before}»
                  </p>
                </div>

                {/* After */}
                <div className="mb-6 flex-grow">
                  <span className="text-xs text-copper uppercase tracking-wider">Nachher</span>
                  <p className="text-foreground/90 text-sm mt-1 leading-relaxed">
                    «{story.after}»
                  </p>
                </div>

                {/* Author */}
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-foreground font-medium">{story.name}, {story.age}</p>
                      <p className="text-muted-foreground text-sm">{story.role}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex gap-0.5 justify-end">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} className="text-copper fill-copper" />
                        ))}
                      </div>
                      <p className="text-muted-foreground text-xs mt-1">{story.sessions} Sessions</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="text-center">
            <Button variant="outline" size="lg" asChild className="border-copper/30 hover:border-copper hover:bg-copper/5">
              <Link to="/erfahrungen">
                Mehr Erfahrungen lesen
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
