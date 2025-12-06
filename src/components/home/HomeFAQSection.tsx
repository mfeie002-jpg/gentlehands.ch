import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { ArrowRight, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const homeFaqs = [
  {
    question: "Ist GentleHands ein Erotikstudio?",
    answer:
      "Nein, absolut nicht. GentleHands bietet ausschliesslich professionelle Entspannungs- und Wohlfühlmassagen an. «Sinnlich» bedeutet bei uns atmosphärisch und auf die Sinne bezogen (Licht, Düfte, Musik) – nicht erotisch. Wir legen grössten Wert auf Professionalität, Respekt und klare Grenzen.",
  },
  {
    question: "Warum ist GentleHands nur für Frauen?",
    answer:
      "Wir möchten einen Raum maximaler Sicherheit und Entspannung schaffen. Viele Frauen können sich in einem geschützten, frauenorientierten Umfeld leichter fallen lassen. Die gesamte Atmosphäre und Herangehensweise ist auf weibliche Bedürfnisse ausgerichtet.",
  },
  {
    question: "Was trage ich während der Massage?",
    answer:
      "Sie entkleiden sich so weit, wie Sie sich wohl fühlen. Während der gesamten Session sind Sie professionell abgedeckt – nur der gerade bearbeitete Bereich wird freigelegt. Bereiche, die Sie nicht berührt haben möchten, teilen Sie uns einfach mit.",
  },
  {
    question: "Wie diskret ist der Standort?",
    answer:
      "Sehr diskret. Unser Studio befindet sich an einer ruhigen Adresse in Zürich, ohne auffällige Beschilderung. Der Eingang ist so gestaltet, dass Sie unauffällig kommen und gehen können. Ihre Privatsphäre ist uns sehr wichtig.",
  },
];

export const HomeFAQSection = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Ambient effects */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-copper/3 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-petrol/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="container-narrow relative">
        {/* Header */}
        <ScrollReveal className="text-center mb-12">
          <motion.div className="flex items-center justify-center gap-4 mb-6">
            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-copper to-transparent w-12"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
            <span className="text-copper font-medium tracking-[0.2em] uppercase text-xs">
              Häufige Fragen
            </span>
            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-copper to-transparent w-12"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
          </motion.div>

          <h2 className="text-foreground text-3xl md:text-4xl lg:text-5xl mb-4">
            Das <span className="text-gradient-copper">Wichtigste</span> auf einen Blick
          </h2>
        </ScrollReveal>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4 mb-10">
          {homeFaqs.map((faq, index) => (
            <ScrollReveal key={index} direction="up" delay={index * 0.1}>
              <motion.div whileHover={{ scale: 1.01 }}>
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-xl px-6 hover:border-copper/20 transition-colors overflow-hidden"
                >
                  <AccordionTrigger className="text-left font-display text-base md:text-lg text-foreground hover:text-copper py-5 [&[data-state=open]>svg]:rotate-180">
                    <div className="flex items-center gap-3 pr-4">
                      <div className="w-8 h-8 rounded-full bg-copper/10 flex items-center justify-center shrink-0">
                        <HelpCircle size={16} className="text-copper" />
                      </div>
                      <span>{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 pl-11 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            </ScrollReveal>
          ))}
        </Accordion>

        {/* CTA */}
        <ScrollReveal className="text-center">
          <Button variant="ghost" size="lg" asChild className="group text-muted-foreground hover:text-foreground">
            <Link to="/faq">
              Alle FAQ ansehen
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
};
