import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Shield, Hand, MessageCircle, Heart, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const boundaries = [
  {
    icon: Hand,
    title: "Ihre Grenzen werden respektiert",
    description:
      "Sie bestimmen, welche Bereiche berührt werden dürfen. Sagen Sie vor oder während der Session, was Sie nicht möchten – wir halten uns daran, ohne nachzufragen.",
  },
  {
    icon: MessageCircle,
    title: "Jederzeit Feedback geben",
    description:
      "Zu viel Druck? Zu leise Musik? Kalt? Sagen Sie es einfach. Wir passen uns sofort an. Sie müssen sich niemals rechtfertigen.",
  },
  {
    icon: Shield,
    title: "Session jederzeit beenden",
    description:
      "Wenn Sie sich unwohl fühlen, können Sie die Session jederzeit abbrechen – ohne Erklärung, ohne Konsequenzen. Ihr Wohlbefinden geht vor.",
  },
  {
    icon: Heart,
    title: "Professionelle Distanz",
    description:
      "Alle unsere Therapeut:innen sind geschult darin, eine respektvolle, professionelle Atmosphäre zu wahren. GentleHands ist kein Ort für unangemessene Anfragen.",
  },
];

const commitments = [
  "Keine erotischen oder sexuellen Dienstleistungen",
  "Alle Therapeut:innen sind zertifiziert und geschult",
  "Professionelle Abdeckung während der gesamten Session",
  "Vertrauliche Behandlung aller Kundendaten",
  "Diskreter Standort ohne auffällige Beschilderung",
];

export const SafetyBoundariesSection = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-primary via-petrol-dark to-primary relative overflow-hidden">
      {/* Ambient effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-copper/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-petrol-light/10 rounded-full blur-[150px]" />

      <div className="container-wide relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <motion.div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-copper" />
              <span className="text-copper font-medium tracking-[0.2em] uppercase text-xs">
                Sicherheit & Grenzen
              </span>
            </motion.div>

            <h2 className="text-primary-foreground text-3xl md:text-4xl lg:text-5xl mb-6">
              Sie haben die <span className="text-copper-light">volle Kontrolle</span>
            </h2>

            <motion.div
              className="w-20 h-1 bg-gradient-to-r from-copper to-copper-light rounded-full mb-8"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />

            <div className="space-y-5 text-primary-foreground/85 text-lg leading-relaxed mb-8">
              <p>
                Bei GentleHands sind Ihre Grenzen nicht verhandelbar. 
                Wir schaffen einen Raum, in dem Sie sich vollständig sicher fühlen können – 
                ohne Druck, ohne Erwartungen, ohne Kompromisse.
              </p>
            </div>

            {/* Commitments List */}
            <div className="space-y-3 mb-8">
              {commitments.map((commitment, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-copper/20 flex items-center justify-center shrink-0">
                    <Check size={14} className="text-copper" />
                  </div>
                  <span className="text-primary-foreground/80 text-sm">
                    {commitment}
                  </span>
                </motion.div>
              ))}
            </div>

            <Button variant="outline" className="border-copper/30 text-primary-foreground hover:bg-copper/10" asChild>
              <Link to="/faq">Mehr über unsere Richtlinien</Link>
            </Button>
          </motion.div>

          {/* Right - Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {boundaries.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/10 hover:border-copper/30 transition-all duration-300 group"
              >
                <motion.div
                  className="w-12 h-12 rounded-xl bg-copper/20 flex items-center justify-center mb-4 group-hover:bg-copper/30 transition-colors"
                  whileHover={{ rotate: 5, scale: 1.05 }}
                >
                  <item.icon size={24} className="text-copper" />
                </motion.div>
                <h4 className="font-display text-lg text-primary-foreground mb-2">
                  {item.title}
                </h4>
                <p className="text-primary-foreground/70 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
