import { motion } from "framer-motion";
import { Sparkles, User, Settings, Calendar } from "lucide-react";

const steps = [
  {
    icon: Sparkles,
    step: "01",
    title: "Erlebnis wählen",
    description:
      "Wählen Sie Ihr atmosphärisches Theme – von Ozean-Ambiente bis Alpine Stille.",
  },
  {
    icon: User,
    step: "02",
    title: "Masseur:in auswählen",
    description:
      "Entscheiden Sie sich für eine Person oder lassen Sie uns intuitiv wählen.",
  },
  {
    icon: Settings,
    step: "03",
    title: "Präferenzen definieren",
    description:
      "Musik, Berührungsintensität, Gesprächswunsch – oder alles als Überraschung.",
  },
  {
    icon: Calendar,
    step: "04",
    title: "Termin bestätigen",
    description:
      "Wählen Sie Ihren Wunschtermin und tauchen Sie ein in Ihr Erlebnis.",
  },
];

export const HowItWorksSection = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-copper font-medium tracking-wide uppercase text-sm mb-4">
            Ihr Weg zur Entspannung
          </p>
          <h2 className="text-foreground mb-4">So funktioniert GentleHands</h2>
          <div className="divider-copper mx-auto" />
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {/* Connector Line (hidden on mobile, last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-border" />
              )}

              <div className="text-center">
                {/* Icon Container */}
                <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
                  <div className="absolute inset-0 bg-primary/10 rounded-2xl rotate-6" />
                  <div className="relative bg-card rounded-2xl w-full h-full flex items-center justify-center shadow-sm border border-border">
                    <step.icon size={28} className="text-primary" />
                  </div>
                  {/* Step Number */}
                  <span className="absolute -top-2 -right-2 w-7 h-7 bg-copper text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
                    {step.step}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-display mb-3 text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
