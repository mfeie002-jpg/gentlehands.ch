import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { LazyImage } from "@/components/shared/LazyImage";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock, ChevronRight } from "lucide-react";

// Import step images
import arrivalImage from "@/assets/visit-step-arrival.jpg";
import preparationImage from "@/assets/visit-step-preparation.jpg";
import consultationImage from "@/assets/visit-step-consultation.jpg";
import massageImage from "@/assets/visit-step-massage.jpg";

const steps = [
  {
    image: arrivalImage,
    title: "Ankunft",
    description: "Kommen Sie 10 Minuten vor Ihrem Termin an. Wir empfangen Sie persönlich.",
  },
  {
    image: preparationImage,
    title: "Umziehen",
    description: "Ein privater Raum steht bereit. Roben und Handtücher sind vorhanden.",
  },
  {
    image: consultationImage,
    title: "Vorgespräch",
    description: "Kurzes Gespräch über Ihre Wünsche, Grenzen und Erwartungen.",
  },
  {
    image: massageImage,
    title: "Geniessen",
    description: "Entspannen Sie sich. Wir kümmern uns um alles.",
  },
];

export const FirstVisitGuideSection = () => {
  return (
    <section className="section-padding-sm bg-gradient-to-r from-copper/5 via-background to-copper/5">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="left">
            <div>
              <div className="inline-flex items-center gap-2 bg-copper/10 px-4 py-2 rounded-full mb-4">
                <Clock size={14} className="text-copper" />
                <span className="text-copper text-sm font-medium">Erster Besuch?</span>
              </div>

              <h2 className="text-foreground text-3xl md:text-4xl mb-6">
                So läuft Ihr <span className="text-gradient-copper">erster Termin</span> ab
              </h2>

              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Wir verstehen, dass der erste Besuch aufregend sein kann. 
                Hier erfahren Sie, was Sie erwartet – damit Sie sich voll und ganz entspannen können.
              </p>

              <Button variant="outline" size="lg" asChild className="border-copper/30 hover:border-copper">
                <Link to="/vorbereitung" className="flex items-center gap-2">
                  Zur Vorbereitung
                  <ChevronRight size={16} />
                </Link>
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="grid grid-cols-2 gap-4">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  className="group relative rounded-xl overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <LazyImage
                      src={step.image}
                      alt={step.title}
                      className="group-hover:scale-110 transition-transform duration-500"
                      aspectRatio="square"
                    />
                    {/* Dark overlay with gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                    
                    {/* Step number */}
                    <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-copper/90 flex items-center justify-center">
                      <span className="text-sm font-display text-white">{index + 1}</span>
                    </div>
                  </div>
                  
                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-foreground font-display text-base mb-1">{step.title}</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
