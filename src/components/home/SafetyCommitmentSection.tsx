import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { LazyImage } from "@/components/shared/LazyImage";
import { Shield, AlertCircle } from "lucide-react";

// Import emotional images
import controlImage from "@/assets/safety-control.jpg";
import communicationImage from "@/assets/safety-communication.jpg";
import trustImage from "@/assets/safety-trust.jpg";
import careImage from "@/assets/safety-care.jpg";

const commitments = [
  {
    image: controlImage,
    title: "Jederzeit stoppen",
    description: "Sie können die Session jederzeit unterbrechen oder beenden – ohne Erklärung.",
  },
  {
    image: communicationImage,
    title: "Offene Kommunikation",
    description: "Sagen Sie uns, was sich gut anfühlt und was nicht. Wir hören zu.",
  },
  {
    image: trustImage,
    title: "Keine-Fragen-Garantie",
    description: "Wenn Sie abbrechen möchten, respektieren wir das ohne Nachfragen.",
  },
  {
    image: careImage,
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
                className="group rounded-xl overflow-hidden border border-petrol/20 hover:border-petrol/40 transition-all h-full bg-card/50"
                whileHover={{ y: -4 }}
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  <LazyImage
                    src={commitment.image}
                    alt={commitment.title}
                    className="group-hover:scale-110 transition-transform duration-500"
                    aspectRatio="auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                </div>
                
                {/* Content */}
                <div className="p-5 -mt-6 relative">
                  <h3 className="text-foreground font-medium text-sm mb-2">{commitment.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{commitment.description}</p>
                </div>
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
