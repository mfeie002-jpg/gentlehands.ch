import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Briefcase, Heart, Baby, Sparkles, Users, Leaf } from "lucide-react";

const clientTypes = [
  {
    icon: Briefcase,
    title: "Berufstätige Frauen",
    description: "Führungskräfte, Selbstständige und Angestellte, die einen Ausgleich zum stressigen Arbeitsalltag suchen.",
  },
  {
    icon: Heart,
    title: "Frauen in Lebensphasen",
    description: "Ob Trennung, Neuanfang oder Übergang – achtsame Berührung kann in schwierigen Zeiten Halt geben.",
  },
  {
    icon: Baby,
    title: "Junge Mütter",
    description: "Eine wohlverdiente Auszeit vom anspruchsvollen Alltag mit Kindern und Familie.",
  },
  {
    icon: Sparkles,
    title: "Self-Care Liebhaberinnen",
    description: "Frauen, die regelmässig in ihr Wohlbefinden investieren und Qualität schätzen.",
  },
  {
    icon: Users,
    title: "Freundinnen-Duos",
    description: "Gemeinsame Wellness-Momente mit der besten Freundin – parallel in separaten Räumen.",
  },
  {
    icon: Leaf,
    title: "Burnout-Prävention",
    description: "Proaktive Frauen, die Erschöpfung vorbeugen, bevor sie zum Problem wird.",
  },
];

export const ClientTypesSection = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-background via-secondary/10 to-background relative overflow-hidden">
      {/* Ambient effects */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-copper/3 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-petrol/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="container-wide relative">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <motion.div className="flex items-center justify-center gap-4 mb-6">
            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-copper to-transparent w-12"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
            <span className="text-copper font-medium tracking-[0.2em] uppercase text-xs">
              Für wen ist GentleHands?
            </span>
            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-copper to-transparent w-12"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
          </motion.div>

          <h2 className="text-foreground text-3xl md:text-4xl lg:text-5xl mb-6">
            Frauen wie <span className="text-gradient-copper">Sie</span>
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Unsere Kundinnen kommen aus allen Lebensbereichen – 
            was sie verbindet, ist der Wunsch nach echter, tiefer Entspannung.
          </p>
        </ScrollReveal>

        {/* Client Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clientTypes.map((type, index) => (
            <ScrollReveal key={type.title} direction="up" delay={index * 0.08}>
              <motion.div
                className="group p-6 rounded-2xl bg-card border border-border hover:border-copper/20 transition-all duration-300 h-full"
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <motion.div
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-copper/10 to-copper/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: 5 }}
                >
                  <type.icon size={24} className="text-copper" />
                </motion.div>
                <h3 className="text-lg font-display text-foreground mb-2 group-hover:text-copper transition-colors">
                  {type.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {type.description}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
