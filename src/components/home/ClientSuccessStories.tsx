import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Quote, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const stories = [
  {
    before: "Nach Monaten im Burnout konnte ich nicht mehr abschalten. Schlafstörungen, Anspannung, ständige Gedankenkreise.",
    after: "Nach drei Sessions bei GentleHands schlafe ich wieder durch. Ich habe gelernt, meinen Körper wieder zu spüren.",
    name: "Sabine, 47",
    sessions: "3 Sessions",
  },
  {
    before: "Als alleinerziehende Mutter hatte ich jahrelang keine Zeit für mich. Ich funktionierte nur noch.",
    after: "Meine monatliche Auszeit ist jetzt heilig. Ich bin eine bessere Mutter, weil ich auf mich selbst achte.",
    name: "Elena, 39",
    sessions: "Monatliche Kundin",
  },
];

export const ClientSuccessStories = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-secondary/20 to-background">
      <div className="container-wide">
        <ScrollReveal className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-copper to-transparent w-12" />
            <span className="text-copper font-medium tracking-[0.2em] uppercase text-xs">
              Transformationen
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-copper to-transparent w-12" />
          </div>
          <h2 className="text-foreground mb-4">
            Echte <span className="text-gradient-copper">Geschichten</span>, echte Veränderung
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {stories.map((story, index) => (
            <ScrollReveal key={story.name} delay={index * 0.15}>
              <motion.div
                className="bg-card rounded-2xl p-8 border border-border hover:border-copper/30 transition-all"
                whileHover={{ y: -4 }}
              >
                <Quote size={32} className="text-copper/20 mb-6" />
                
                {/* Before */}
                <div className="mb-6">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Vorher</span>
                  <p className="text-foreground/80 mt-2 italic">„{story.before}"</p>
                </div>

                {/* Arrow */}
                <div className="flex justify-center mb-6">
                  <div className="w-10 h-10 rounded-full bg-copper/10 flex items-center justify-center">
                    <ArrowRight size={18} className="text-copper" />
                  </div>
                </div>

                {/* After */}
                <div className="mb-6">
                  <span className="text-xs text-copper uppercase tracking-wider font-medium">Nachher</span>
                  <p className="text-foreground mt-2 font-medium">„{story.after}"</p>
                </div>

                {/* Author */}
                <div className="flex items-center justify-between pt-6 border-t border-border">
                  <div>
                    <p className="text-foreground font-medium">{story.name}</p>
                    <p className="text-muted-foreground text-sm">{story.sessions}</p>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center">
          <Button variant="outline" asChild className="border-copper/30 hover:border-copper">
            <Link to="/erfahrungen">Mehr Erfahrungen lesen</Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
};
