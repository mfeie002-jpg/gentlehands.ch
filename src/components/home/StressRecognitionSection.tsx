import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { AlertCircle, Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LazyImage } from "@/components/shared/LazyImage";

import emotionalStressRelease from "@/assets/emotional-stress-release.jpg";

const stressSigns = [
  { sign: "Schlafen Sie schlecht oder liegen nachts wach?", common: true },
  { sign: "Fühlen Sie sich auch nach dem Wochenende nicht erholt?", common: true },
  { sign: "Haben Sie Nacken- oder Rückenverspannungen?", common: true },
  { sign: "Fällt es Ihnen schwer, abzuschalten?", common: true },
  { sign: "Funktionieren Sie mehr, als dass Sie leben?", common: true },
  { sign: "Vermissen Sie das Gefühl, einfach mal nichts tun zu müssen?", common: true },
];

export const StressRecognitionSection = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-background to-secondary/20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-copper/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-wide relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Recognition */}
          <ScrollReveal>
            <div>
              <motion.div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-border mb-6"
              >
                <AlertCircle size={14} className="text-copper" />
                <span className="text-muted-foreground text-xs uppercase tracking-wider">Selbst-Check</span>
              </motion.div>

              <h2 className="text-foreground text-2xl sm:text-3xl md:text-4xl mb-6">
                Erkennen Sie sich <span className="text-gradient-copper">wieder?</span>
              </h2>

              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Viele Frauen kommen erst zu uns, wenn sie bereits am Limit sind. 
                Dabei wäre Prävention so viel wertvoller. 
                Hören Sie auf Ihren Körper – er sendet Signale.
              </p>

              <div className="space-y-3">
                {stressSigns.map((item, index) => (
                  <motion.div
                    key={item.sign}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-card/50 border border-border group hover:border-copper/30 transition-colors"
                  >
                    <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:border-copper group-hover:bg-copper/10 transition-colors">
                      <Check size={12} className="text-transparent group-hover:text-copper transition-colors" />
                    </div>
                    <span className="text-foreground/90 text-sm">{item.sign}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right - Solution with Image */}
          <ScrollReveal delay={0.2}>
            <motion.div
              className="rounded-2xl overflow-hidden bg-card border border-border"
              whileHover={{ scale: 1.01 }}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <LazyImage
                  src={emotionalStressRelease}
                  alt="Stress loslassen"
                  className="transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
              </div>
              
              <div className="p-8">
                <h3 className="text-xl sm:text-2xl font-display text-foreground mb-4">
                  Wenn Sie auch nur einen Punkt angekreuzt haben...
                </h3>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  ...dann ist es Zeit, etwas für sich zu tun. Nicht morgen. Nicht «irgendwann». 
                  Jetzt. Ihr Körper und Ihre Seele brauchen Regeneration – und Sie verdienen es, 
                  sich diese zu gönnen.
                </p>

                <div className="p-4 rounded-xl bg-secondary/50 border border-border mb-6">
                  <p className="text-foreground/90 text-sm italic">
                    «Nach meiner ersten Session bei GentleHands habe ich zum ersten Mal seit Monaten 
                    wieder durchgeschlafen. Ich wusste nicht, wie sehr ich das gebraucht habe.»
                  </p>
                  <p className="text-muted-foreground text-xs mt-2">— Marina, 38</p>
                </div>

                <Button variant="copper" size="lg" className="w-full" asChild>
                  <Link to="/buchung">
                    Meine erste Session buchen
                    <ArrowRight size={18} className="ml-2" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};