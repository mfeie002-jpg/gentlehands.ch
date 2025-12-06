import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Briefcase, Heart, Baby, Sparkles, Users, Flame } from "lucide-react";

const audiences = [
  {
    icon: Briefcase,
    title: "Berufstätige Frauen",
    description: "Die im Alltag alles geben und endlich abschalten möchten.",
  },
  {
    icon: Heart,
    title: "Selbstfürsorge-Bewusste",
    description: "Die wissen, dass regelmässige Auszeiten keine Verschwendung sind.",
  },
  {
    icon: Baby,
    title: "Mütter",
    description: "Die sich Zeit für sich selbst verdient haben – ohne schlechtes Gewissen.",
  },
  {
    icon: Flame,
    title: "Burnout-Betroffene",
    description: "Die einen sicheren Ort zum Regenerieren suchen.",
  },
  {
    icon: Users,
    title: "Seniorinnen",
    description: "Die achtsame Berührung und Entspannung schätzen.",
  },
  {
    icon: Sparkles,
    title: "Wellness-Liebhaberinnen",
    description: "Die das Besondere suchen und Premium-Qualität erwarten.",
  },
];

export const TargetAudienceSection = () => {
  return (
    <section className="section-padding-sm bg-gradient-to-b from-background to-secondary/10">
      <div className="container-wide">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-foreground text-2xl md:text-3xl mb-4">
            Für <span className="text-gradient-copper">Frauen</span>, die…
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            GentleHands ist der richtige Ort für Sie, wenn Sie sich in einer dieser Situationen wiedererkennen.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {audiences.map((audience, index) => (
            <ScrollReveal key={audience.title} delay={index * 0.05}>
              <motion.div
                className="flex items-start gap-4 p-4 rounded-xl bg-card/50 border border-border/50 hover:border-copper/30 transition-colors"
                whileHover={{ x: 4 }}
              >
                <div className="w-10 h-10 rounded-lg bg-copper/10 flex items-center justify-center shrink-0">
                  <audience.icon size={18} className="text-copper" />
                </div>
                <div>
                  <h3 className="text-foreground font-medium text-sm mb-1">{audience.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{audience.description}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
