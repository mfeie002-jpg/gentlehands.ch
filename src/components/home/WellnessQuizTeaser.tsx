import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Brain } from "lucide-react";
import quizImage from "@/assets/quiz-concept.jpg";

export const WellnessQuizTeaser = () => {
  return (
    <section className="section-padding-sm bg-gradient-to-r from-copper/5 via-background to-petrol/5 relative overflow-hidden">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <ScrollReveal direction="left">
            <motion.div
              className="relative rounded-2xl overflow-hidden aspect-[4/3]"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={quizImage}
                alt="Wellness Quiz"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
              
              {/* Floating Badge */}
              <motion.div
                className="absolute top-6 right-6 bg-copper text-accent-foreground px-4 py-2 rounded-xl"
                animate={{ rotate: [0, 2, -2, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="flex items-center gap-2">
                  <Brain size={16} />
                  <span className="text-sm font-medium">2 Min Quiz</span>
                </div>
              </motion.div>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div>
              <div className="inline-flex items-center gap-2 bg-copper/10 px-4 py-2 rounded-full mb-4">
                <Sparkles size={14} className="text-copper" />
                <span className="text-copper text-sm font-medium">Persönliche Empfehlung</span>
              </div>

              <h2 className="text-foreground text-3xl md:text-4xl mb-6">
                Welches <span className="text-gradient-copper">Erlebnis</span> passt zu Ihnen?
              </h2>

              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Beantworten Sie ein paar kurze Fragen und wir empfehlen Ihnen den 
                perfekten Themenraum und die passende Massageart.
              </p>

              <ul className="space-y-3 mb-8">
                {["5 einfache Fragen", "Sofortige Empfehlung", "Unverbindlich & kostenlos"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-copper" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Button variant="copper" size="lg" asChild>
                <Link to="/quiz" className="flex items-center gap-2">
                  Quiz starten
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
