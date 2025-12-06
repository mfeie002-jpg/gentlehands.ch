import { motion } from "framer-motion";
import { Coffee, MessageCircle, Sparkles, Heart } from "lucide-react";

const steps = [
  {
    icon: Coffee,
    step: "01",
    title: "Ankommen",
    description: "Sie werden empfangen, erhalten einen Tee und können in Ruhe ankommen.",
  },
  {
    icon: MessageCircle,
    step: "02",
    title: "Kurzes Gespräch",
    description: "Wir besprechen Ihre Wünsche, Präferenzen und eventuelle Vorsichtsmassnahmen.",
  },
  {
    icon: Sparkles,
    step: "03",
    title: "Ihre Massage",
    description: "Im gewählten Themenraum erleben Sie Ihre individuelle Massage.",
  },
  {
    icon: Heart,
    step: "04",
    title: "Nachklingen",
    description: "Zeit zum Aufwachen, ein Glas Wasser und sanfter Abschluss.",
  },
];

export const MassageProcessSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-foreground mb-4">Ihr Erlebnis bei uns</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Von der Ankunft bis zum entspannten Nachhausegehen
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative"
            >
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-copper/50 to-transparent z-0" />
              )}

              <div className="relative z-10 text-center">
                <motion.div
                  className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-copper/10 flex items-center justify-center relative"
                  whileHover={{ scale: 1.1 }}
                >
                  <step.icon size={32} className="text-copper" />
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-copper text-accent-foreground text-sm font-bold flex items-center justify-center">
                    {step.step}
                  </span>
                </motion.div>
                <h3 className="font-display text-lg text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
