import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Hand, Heart, Brain, Sparkles } from "lucide-react";
import massageImage from "@/assets/massage-hands-lower-back.jpg";

const principles = [
  {
    icon: Hand,
    title: "Präsente Berührung",
    description: "Jede Berührung erfolgt mit voller Aufmerksamkeit und Achtsamkeit.",
  },
  {
    icon: Heart,
    title: "Heilsame Intention",
    description: "Unsere Hände arbeiten mit der Absicht, Wohlbefinden zu fördern.",
  },
  {
    icon: Brain,
    title: "Nervensystem-Regulierung",
    description: "Gezielte Techniken aktivieren Ihr parasympathisches Nervensystem.",
  },
];

export const TouchPhilosophySection = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-background to-secondary/10 relative overflow-hidden">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <ScrollReveal direction="left">
            <motion.div
              className="relative rounded-2xl overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={massageImage}
                alt="Professionelle Massage-Technik"
                className="w-full h-auto object-cover aspect-[4/3]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
              
              {/* Quote Overlay */}
              <motion.div
                className="absolute bottom-6 left-6 right-6 bg-card/90 backdrop-blur-sm p-4 rounded-xl border border-border"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-foreground italic text-sm">
                  „Die Qualität einer Berührung verrät alles über die Absicht dahinter."
                </p>
                <p className="text-copper text-xs mt-2">— Unsere Philosophie</p>
              </motion.div>
            </motion.div>
          </ScrollReveal>

          {/* Content */}
          <ScrollReveal direction="right">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px bg-gradient-to-r from-copper to-transparent w-8" />
                <span className="text-copper font-medium tracking-[0.2em] uppercase text-xs">
                  Die Kunst der Berührung
                </span>
              </div>

              <h2 className="text-foreground text-3xl md:text-4xl mb-6">
                Mehr als nur <span className="text-gradient-copper">Massage</span>
              </h2>

              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Bei GentleHands verstehen wir Berührung als eine Form der Kommunikation – 
                eine Sprache, die Ihr Nervensystem versteht und auf die es mit Entspannung reagiert.
              </p>

              <div className="space-y-6">
                {principles.map((principle, index) => (
                  <motion.div
                    key={principle.title}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-copper/10 flex items-center justify-center shrink-0">
                      <principle.icon size={22} className="text-copper" />
                    </div>
                    <div>
                      <h3 className="text-foreground font-medium mb-1">{principle.title}</h3>
                      <p className="text-muted-foreground text-sm">{principle.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
