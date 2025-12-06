import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Users, GraduationCap, Heart, Award, Check } from "lucide-react";

const qualifications = [
  "Eidgenössisch diplomiert",
  "Regelmässige Weiterbildung",
  "Trauma-sensibilisiert",
  "Mindestens 3 Jahre Berufserfahrung",
];

export const TeamPhilosophySection = () => {
  return (
    <section className="section-padding-sm bg-secondary/30 border-y border-border">
      <div className="container-wide">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <ScrollReveal direction="left" className="lg:w-1/2">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-copper/15 flex items-center justify-center">
                <Users className="w-6 h-6 text-copper" />
              </div>
              <div>
                <span className="text-copper text-xs font-medium uppercase tracking-wider">Unser Team</span>
                <h3 className="text-xl font-display text-foreground">Handverlesene Expert:innen</h3>
              </div>
            </div>
            <p className="text-muted-foreground mb-6">
              Jede Therapeutin und jeder Therapeut bei GentleHands wurde sorgfältig ausgewählt. 
              Wir legen Wert auf fachliche Exzellenz, Empathie und die Fähigkeit, einen sicheren Raum zu schaffen.
            </p>
            <ul className="space-y-2">
              {qualifications.map((qual) => (
                <li key={qual} className="flex items-center gap-2 text-muted-foreground text-sm">
                  <div className="w-5 h-5 rounded-full bg-copper/20 flex items-center justify-center">
                    <Check size={12} className="text-copper" />
                  </div>
                  {qual}
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal direction="right" className="lg:w-1/2">
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: GraduationCap, value: "100%", label: "Diplomiert" },
                { icon: Heart, value: "4.9", label: "Bewertung" },
                { icon: Award, value: "8+", label: "Jahre Erfahrung" },
                { icon: Users, value: "4", label: "Expert:innen" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="bg-card rounded-xl p-5 border border-border text-center"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <stat.icon size={24} className="text-copper mx-auto mb-2" />
                  <p className="text-2xl font-display text-foreground">{stat.value}</p>
                  <p className="text-muted-foreground text-xs">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
