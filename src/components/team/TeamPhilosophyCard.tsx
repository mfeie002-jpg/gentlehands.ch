import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Heart, Shield, Sparkles, Users } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Mit Herz",
    description: "Jede Berührung ist eine Form von Zuwendung"
  },
  {
    icon: Shield,
    title: "Mit Respekt",
    description: "Ihre Grenzen sind unsere Grenzen"
  },
  {
    icon: Sparkles,
    title: "Mit Expertise",
    description: "Jahre der Ausbildung und Erfahrung"
  },
  {
    icon: Users,
    title: "Mit Verständnis",
    description: "Wir hören zu, bevor wir handeln"
  },
];

export const TeamPhilosophyCard = () => {
  return (
    <ScrollReveal>
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-petrol to-petrol-dark p-10 text-background">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }} />
        </div>

        <div className="relative">
          <span className="text-copper text-sm font-medium uppercase tracking-wider mb-4 block">
            Unsere Philosophie
          </span>
          <h2 className="text-3xl font-display mb-6">
            Was uns antreibt
          </h2>
          <p className="text-background/80 text-lg mb-10 max-w-2xl">
            Bei GentleHands sind wir mehr als ein Team – wir sind eine Familie mit einer 
            gemeinsamen Mission: Frauen einen Raum zu geben, in dem sie sich fallen lassen können.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-background/10 flex items-center justify-center mb-4">
                  <value.icon className="w-7 h-7 text-copper" />
                </div>
                <h3 className="text-background font-medium text-lg mb-1">{value.title}</h3>
                <p className="text-background/70 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};
