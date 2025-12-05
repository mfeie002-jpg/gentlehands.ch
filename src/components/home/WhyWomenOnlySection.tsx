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
    <section className="section-padding bg-gradient-to-br from-primary via-petrol-dark to-primary relative overflow-hidden">
      {/* Ambient glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-copper/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-petrol-light/10 rounded-full blur-[150px]" />
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      
      <div className="container-wide relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="flex items-center gap-3 mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="h-px w-8 bg-copper" />
              <span className="text-copper font-medium tracking-[0.2em] uppercase text-xs">
                Unser Fokus
              </span>
            </motion.div>
            
            <h2 className="text-primary-foreground text-4xl md:text-5xl mb-6">
              Warum nur für Frauen?
            </h2>
            
            <motion.div 
              className="w-20 h-1 bg-gradient-to-r from-copper to-copper-light rounded-full mb-8"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
            
            <div className="space-y-5 text-primary-foreground/85 text-lg leading-relaxed">
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
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/10 hover:border-copper/30 transition-all duration-300 group"
              >
                <motion.div 
                  className="w-14 h-14 rounded-xl bg-copper/20 flex items-center justify-center mb-4 group-hover:bg-copper/30 transition-colors"
                  whileHover={{ rotate: 5, scale: 1.05 }}
                >
                  <reason.icon size={26} className="text-copper" />
                </motion.div>
                <h4 className="font-display text-xl text-primary-foreground mb-2">
                  {reason.title}
                </h4>
                <p className="text-primary-foreground/70 text-sm leading-relaxed">
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
