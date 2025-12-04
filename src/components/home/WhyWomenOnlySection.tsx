import { motion } from "framer-motion";
import { Shield, Heart, Lock, Eye } from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "Sicherer Raum",
    description:
      "Ein Umfeld, in dem Sie sich vollständig geschützt und wohl fühlen können.",
  },
  {
    icon: Heart,
    title: "Emotionale Freiheit",
    description:
      "Raum für tiefes Loslassen ohne Druck oder gesellschaftliche Erwartungen.",
  },
  {
    icon: Lock,
    title: "Absolute Diskretion",
    description:
      "Ihre Privatsphäre und Anonymität haben bei uns höchste Priorität.",
  },
  {
    icon: Eye,
    title: "Bewusste Präsenz",
    description:
      "Achtsame Begleitung, die auf weibliche Bedürfnisse abgestimmt ist.",
  },
];

export const WhyWomenOnlySection = () => {
  return (
    <section className="section-padding bg-primary text-primary-foreground">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-copper-light font-medium tracking-wide uppercase text-sm mb-4">
              Unser Fokus
            </p>
            <h2 className="text-primary-foreground mb-6">
              Warum nur für Frauen?
            </h2>
            <div className="w-16 h-0.5 bg-copper mb-8" />
            <div className="space-y-4 text-primary-foreground/80">
              <p>
                GentleHands wurde aus der Überzeugung gegründet, dass Frauen
                einen geschützten Raum verdienen, in dem sie ohne Vorbehalte
                entspannen können.
              </p>
              <p>
                Die Atmosphäre, die Berührungsqualität und das gesamte Erlebnis
                sind auf die spezifischen Bedürfnisse von Frauen ausgerichtet –
                von der Raumgestaltung bis zur Art der Kommunikation.
              </p>
              <p>
                Bei uns steht Ihr Wohlbefinden im Mittelpunkt. Keine
                Kompromisse, keine Ablenkungen – nur Sie und Ihre Entspannung.
              </p>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-copper/20 flex items-center justify-center mb-4">
                  <reason.icon size={24} className="text-copper" />
                </div>
                <h4 className="font-display text-lg text-primary-foreground mb-2">
                  {reason.title}
                </h4>
                <p className="text-primary-foreground/70 text-sm">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
