import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Ist GentleHands ein Erotikstudio?",
    answer: "Nein, absolut nicht. GentleHands bietet ausschliesslich professionelle Entspannungsmassagen an. Wir legen grossen Wert auf Professionalität, Respekt und klare Grenzen.",
  },
  {
    question: "Wer darf buchen?",
    answer: "Unser Angebot richtet sich ausschliesslich an Frauen ab 18 Jahren. Dies ermöglicht uns, einen besonders geschützten Raum zu schaffen.",
  },
  {
    question: "Kann ich die Therapeut:in selbst wählen?",
    answer: "Ja, Sie können bei der Buchung Ihre bevorzugte Therapeutin oder Ihren bevorzugten Therapeuten auswählen. Alle unsere Fachkräfte sind diplomiert und professionell.",
  },
  {
    question: "Wie läuft eine Session ab?",
    answer: "Sie werden empfangen, können sich in Ruhe umziehen und besprechen kurz Ihre Wünsche. Danach geniessen Sie Ihre Massage im gewählten Themenraum. Zum Abschluss haben Sie Zeit zum Nachruhen.",
  },
];

export const FAQPreviewSection = () => {
  return (
    <section className="section-padding-sm bg-gradient-to-b from-secondary/10 to-background">
      <div className="container-narrow">
        <ScrollReveal className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-petrol/10 px-4 py-2 rounded-full mb-4">
            <HelpCircle size={14} className="text-petrol" />
            <span className="text-petrol text-sm font-medium">Häufige Fragen</span>
          </div>
          <h2 className="text-foreground text-2xl md:text-3xl">
            Das fragen uns <span className="text-gradient-copper">Kundinnen</span> oft
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <Accordion type="single" collapsible className="mb-8">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border">
                <AccordionTrigger className="text-left text-foreground hover:text-copper">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>

        <ScrollReveal className="text-center">
          <Button variant="outline" asChild className="border-copper/30 hover:border-copper">
            <Link to="/faq" className="flex items-center gap-2">
              Alle Fragen ansehen
              <ChevronRight size={16} />
            </Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
};
