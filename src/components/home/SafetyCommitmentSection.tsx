import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Shield, AlertCircle, Hand, MessageCircle, Lock, Heart } from "lucide-react";

const commitments = [
  {
    icon: Hand,
    title: "Jederzeit stoppen",
    description: "Sie können die Session jederzeit unterbrechen oder beenden – ohne Erklärung.",
  },
  {
    icon: MessageCircle,
    title: "Offene Kommunikation",
    description: "Sagen Sie uns, was sich gut anfühlt und was nicht. Wir hören zu.",
  },
  {
    icon: Lock,
    title: "Keine-Fragen-Garantie",
    description: "Wenn Sie abbrechen möchten, respektieren wir das ohne Nachfragen.",
  },
  {
    icon: Heart,
    title: "Trauma-informiert",
    description: "Unser Team ist im achtsamen Umgang mit Grenzen geschult.",
  },
];

export const SafetyCommitmentSection = () => {
  return (
    <section className="section-padding-sm bg-petrol/5 border-y border-petrol/10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-petrol/5 rounded-full blur-[120px]" />
      
      <div className="container-wide relative">
        <ScrollReveal className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-petrol/10 px-4 py-2 rounded-full mb-4">
            <Shield size={14} className="text-petrol" />
            <span className="text-petrol text-sm font-medium">Ihre Sicherheit</span>
          </div>
          <h2 className="text-foreground text-2xl md:text-3xl mb-4">
            Sie haben immer die <span className="text-gradient-copper">Kontrolle</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Wir verstehen, dass tiefe Entspannung nur möglich ist, wenn Sie sich vollkommen sicher fühlen.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {commitments.map((commitment, index) => (
            <ScrollReveal key={commitment.title} delay={index * 0.08}>
              <motion.div
                className="bg-card/50 rounded-xl p-5 border border-petrol/20 hover:border-petrol/40 transition-all h-full"
                whileHover={{ y: -4 }}
              >
                <div className="w-10 h-10 rounded-lg bg-petrol/15 flex items-center justify-center mb-4">
                  <commitment.icon size={18} className="text-petrol" />
                </div>
                <h3 className="text-foreground font-medium text-sm mb-2">{commitment.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{commitment.description}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Important Note */}
        <ScrollReveal className="mt-8">
          <div className="flex items-start gap-3 max-w-2xl mx-auto p-4 rounded-xl bg-card border border-border">
            <AlertCircle size={20} className="text-copper shrink-0 mt-0.5" />
            <p className="text-muted-foreground text-sm">
              <span className="text-foreground font-medium">Wichtig:</span> GentleHands bietet ausschliesslich 
              professionelle Entspannungsmassagen an. Wir sind kein Erotikstudio. Sollten Sie sich je unwohl 
              fühlen, teilen Sie es uns mit – wir sind für Sie da.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
