import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Lock, Eye, Shield, UserX, FileX, Server } from "lucide-react";

const promises = [
  {
    icon: Lock,
    title: "Verschlüsselte Kommunikation",
    description: "Alle Ihre Daten werden SSL-verschlüsselt übertragen.",
  },
  {
    icon: Eye,
    title: "Keine Überwachung",
    description: "Wir tracken Sie nicht und verkaufen keine Daten.",
  },
  {
    icon: UserX,
    title: "Anonyme Buchung möglich",
    description: "Sie können unter Pseudonym buchen, wenn Sie möchten.",
  },
  {
    icon: FileX,
    title: "Datenlöschung auf Wunsch",
    description: "Ihre Daten werden auf Anfrage vollständig gelöscht.",
  },
  {
    icon: Shield,
    title: "Diskreter Eingang",
    description: "Unser Studio ist unauffällig und ohne auffällige Beschilderung.",
  },
  {
    icon: Server,
    title: "Schweizer Server",
    description: "Alle Daten werden in der Schweiz gespeichert.",
  },
];

export const PrivacyPromiseSection = () => {
  return (
    <section className="section-padding-sm bg-petrol/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-petrol/3 to-transparent" />
      
      <div className="container-wide relative">
        <ScrollReveal className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-petrol/10 px-4 py-2 rounded-full mb-4">
            <Lock size={14} className="text-petrol" />
            <span className="text-petrol text-sm font-medium">Diskretion & Datenschutz</span>
          </div>
          <h2 className="text-foreground text-2xl md:text-3xl mb-4">
            Ihre <span className="text-gradient-copper">Privatsphäre</span> ist uns heilig
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Absolute Vertraulichkeit – vor, während und nach Ihrem Besuch.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {promises.map((promise, index) => (
            <ScrollReveal key={promise.title} delay={index * 0.05}>
              <motion.div
                className="flex items-start gap-4 p-4 bg-card/50 rounded-xl border border-border/50 hover:border-petrol/30 transition-colors"
                whileHover={{ x: 4 }}
              >
                <div className="w-10 h-10 rounded-lg bg-petrol/10 flex items-center justify-center shrink-0">
                  <promise.icon size={18} className="text-petrol" />
                </div>
                <div>
                  <h3 className="text-foreground font-medium text-sm mb-1">{promise.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{promise.description}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
