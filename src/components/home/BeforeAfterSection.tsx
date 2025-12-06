import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { ArrowRight, Brain, Battery, Heart, Smile } from "lucide-react";

const transformations = [
  {
    before: { icon: Brain, text: "Gedankenkarussell", color: "text-muted-foreground" },
    after: { icon: Brain, text: "Mentale Klarheit", color: "text-copper" },
  },
  {
    before: { icon: Battery, text: "Erschöpfung", color: "text-muted-foreground" },
    after: { icon: Battery, text: "Neue Energie", color: "text-copper" },
  },
  {
    before: { icon: Heart, text: "Anspannung", color: "text-muted-foreground" },
    after: { icon: Heart, text: "Tiefe Entspannung", color: "text-copper" },
  },
  {
    before: { icon: Smile, text: "Stress", color: "text-muted-foreground" },
    after: { icon: Smile, text: "Gelassenheit", color: "text-copper" },
  },
];

export const BeforeAfterSection = () => {
  return (
    <section className="section-padding-sm bg-gradient-to-b from-secondary/20 to-background">
      <div className="container-wide">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-foreground text-2xl md:text-3xl mb-4">
            Von <span className="text-muted-foreground">Anspannung</span> zu <span className="text-gradient-copper">Entspannung</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Erleben Sie die Transformation, die eine Session bei GentleHands bewirken kann.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {transformations.map((item, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <motion.div
                className="bg-card rounded-2xl p-6 border border-border hover:border-copper/30 transition-all"
                whileHover={{ y: -4 }}
              >
                {/* Before */}
                <div className="flex items-center gap-3 mb-4 opacity-60">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <item.before.icon size={18} className={item.before.color} />
                  </div>
                  <span className="text-muted-foreground text-sm">{item.before.text}</span>
                </div>

                {/* Arrow */}
                <div className="flex justify-center mb-4">
                  <motion.div
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ArrowRight size={20} className="text-copper rotate-90" />
                  </motion.div>
                </div>

                {/* After */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-copper/15 flex items-center justify-center">
                    <item.after.icon size={18} className={item.after.color} />
                  </div>
                  <span className="text-foreground font-medium text-sm">{item.after.text}</span>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
