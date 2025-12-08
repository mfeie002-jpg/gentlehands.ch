import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Heart, Shield, Sparkles, Moon, Flower2, Hand } from "lucide-react";

const emotionalNeeds = [
  {
    icon: Heart,
    title: "Endlich loslassen dürfen",
    feeling: "Ich trage so viel mit mir. Für alle bin ich stark.",
    relief: "Hier dürfen Sie schwach sein. Hier trägt jemand Sie.",
    gradient: "from-rose-500/20 to-copper/20",
  },
  {
    icon: Shield,
    title: "Sich sicher fühlen",
    feeling: "Ich bin ständig auf der Hut. Immer angespannt.",
    relief: "Ein geschützter Raum nur für Sie. Grenzen werden respektiert.",
    gradient: "from-petrol/20 to-petrol/10",
  },
  {
    icon: Moon,
    title: "Wieder spüren lernen",
    feeling: "Ich funktioniere nur noch. Mein Körper ist fremd.",
    relief: "Sanfte Berührung bringt Sie zurück zu sich selbst.",
    gradient: "from-purple-500/20 to-petrol/20",
  },
  {
    icon: Flower2,
    title: "Zeit nur für mich",
    feeling: "Alle brauchen etwas von mir. Ich selbst komme zu kurz.",
    relief: "Diese Zeit gehört nur Ihnen. Keine Erwartungen.",
    gradient: "from-copper/20 to-rose-500/20",
  },
];

export const EmotionalReliefSection = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-background via-secondary/30 to-background relative overflow-hidden">
      {/* Soft ambient glows */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-rose-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[350px] h-[350px] bg-copper/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-wide relative">
        <ScrollReveal className="text-center mb-16">
          <motion.div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-copper to-transparent w-12" />
            <span className="text-copper font-medium tracking-[0.2em] uppercase text-xs">
              Wir verstehen Sie
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-copper to-transparent w-12" />
          </motion.div>

          <h2 className="text-foreground text-2xl sm:text-3xl md:text-4xl mb-4">
            Wenn der Alltag <span className="text-gradient-copper">zu viel wird</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Sie geben jeden Tag alles. Für die Familie, den Job, für alle anderen. 
            Aber wann haben Sie zuletzt etwas nur für sich getan?
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {emotionalNeeds.map((need, index) => (
            <ScrollReveal key={need.title} delay={index * 0.1}>
              <motion.div
                className="group relative p-6 sm:p-8 rounded-2xl bg-card border border-border hover:border-copper/40 transition-all duration-500"
                whileHover={{ y: -4 }}
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${need.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-copper/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <need.icon size={28} className="text-copper" />
                  </div>

                  <h3 className="text-xl font-display text-foreground mb-4">{need.title}</h3>

                  {/* The feeling - italic, softer */}
                  <p className="text-muted-foreground italic text-sm mb-4 border-l-2 border-copper/30 pl-4">
                    «{need.feeling}»
                  </p>

                  {/* The relief - stronger */}
                  <p className="text-foreground/90 text-sm leading-relaxed flex items-start gap-2">
                    <Sparkles size={16} className="text-copper mt-1 flex-shrink-0" />
                    {need.relief}
                  </p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Emotional affirmation */}
        <ScrollReveal>
          <motion.div
            className="max-w-3xl mx-auto text-center p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-copper/5 via-card to-petrol/5 border border-copper/20"
            whileHover={{ scale: 1.01 }}
          >
            <Hand size={32} className="text-copper mx-auto mb-4" />
            <h3 className="text-xl sm:text-2xl font-display text-foreground mb-4">
              Sie verdienen diese Auszeit
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Es ist kein Luxus, sondern Selbstfürsorge. 
              Sich Gutes zu tun ist keine Schwäche – es ist Stärke. 
              Denn nur wer für sich selbst sorgt, kann auch für andere da sein.
            </p>
            <p className="text-copper font-medium text-sm">
              Erlauben Sie sich, wieder zu atmen.
            </p>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
};
