import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Search, HelpCircle, MessageCircle, ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { FloatingElements } from "@/components/shared/FloatingElements";

const faqCategories = [
  { id: "all", label: "Alle Fragen" },
  { id: "general", label: "Allgemein" },
  { id: "booking", label: "Buchung & Preise" },
  { id: "session", label: "Ihre Session" },
  { id: "privacy", label: "Diskretion" },
];

const faqs = [
  {
    question: "Was ist GentleHands genau?",
    answer:
      "GentleHands ist ein exklusiver Ort für Erlebnismassagen – ausschliesslich für Frauen. Wir bieten professionelle Entspannungsmassagen in atmosphärisch gestalteten Räumen an. Jedes Erlebnis wird durch ein wählbares «Theme» geprägt: Licht, Düfte, Klänge und Ambiente sind perfekt auf Ihre Entspannung abgestimmt. Es ist kein klassisches Massage-Studio, sondern ein privater Raum für tiefe Entspannung.",
    category: "general",
  },
  {
    question: "Für wen eignet sich GentleHands?",
    answer:
      "GentleHands ist ideal für Frauen, die sich eine Auszeit vom Alltag wünschen, unter Stress oder Anspannung leiden, sich etwas Besonderes gönnen möchten, oder einen sicheren Raum suchen, in dem sie vollständig loslassen können. Ob nach einer intensiven Arbeitsphase, als regelmässiges Ritual oder als einmaliges Erlebnis – GentleHands passt sich Ihren Bedürfnissen an.",
    category: "general",
  },
  {
    question: "Warum ist GentleHands nur für Frauen?",
    answer:
      "Die Entscheidung, GentleHands ausschliesslich für Frauen anzubieten, basiert auf dem Wunsch, einen Raum maximaler Sicherheit und Entspannung zu schaffen. Viele Frauen können sich in einem geschützten, frauenorientierten Umfeld leichter fallen lassen. Die gesamte Atmosphäre, Kommunikation und Herangehensweise ist auf weibliche Bedürfnisse ausgerichtet.",
    category: "general",
  },
  {
    question: "Ist GentleHands ein Erotikstudio?",
    answer:
      "Nein, absolut nicht. GentleHands bietet ausschliesslich professionelle Entspannungs- und Wohlfühlmassagen an. Es gibt keine sexuellen Dienstleistungen. «Sinnlich» bedeutet bei uns atmosphärisch und auf die Sinne bezogen (Sehen, Hören, Riechen, Fühlen) – nicht erotisch. Wir legen grossen Wert auf Professionalität, Respekt und klare Grenzen.",
    category: "general",
  },
  {
    question: "Was trage ich während der Massage?",
    answer:
      "Sie entkleiden sich so weit, wie Sie sich wohl fühlen. Die meisten Kundinnen werden vollständig massiert, sind aber während der gesamten Session professionell abgedeckt – nur der gerade bearbeitete Bereich wird freigelegt. Wenn Sie bestimmte Bereiche nicht berührt haben möchten, teilen Sie uns das einfach mit.",
    category: "session",
  },
  {
    question: "Wie bereite ich mich vor?",
    answer:
      "Kommen Sie am besten entspannt an. Vermeiden Sie direkt vor der Session grosse Mahlzeiten. Schalten Sie Ihr Handy aus oder auf lautlos. Alles andere übernehmen wir – Sie müssen nichts mitbringen. Handtücher, Öle und alles Notwendige stellen wir bereit. Kommen Sie etwa 10 Minuten vor Ihrem Termin.",
    category: "session",
  },
  {
    question: "Was, wenn ich mich während der Session unwohl fühle?",
    answer:
      "Sie haben jederzeit die volle Kontrolle. Wenn Ihnen etwas unangenehm ist – sei es die Musik, der Druck, ein bestimmter Bereich oder irgendetwas anderes – sagen Sie es einfach. Wir passen uns sofort an. Sie können die Session auch jederzeit abbrechen, ohne Erklärung. Ihr Wohlbefinden hat oberste Priorität.",
    category: "session",
  },
  {
    question: "Kann ich meine Präferenzen später ändern?",
    answer:
      "Ja, natürlich. Die im Buchungsprozess angegebenen Präferenzen sind ein Ausgangspunkt. Vor der Session haben Sie nochmals Gelegenheit, Wünsche anzupassen. Und auch während der Massage können Sie jederzeit Feedback geben.",
    category: "session",
  },
  {
    question: "Wie kurzfristig kann ich stornieren?",
    answer:
      "Wir bitten um Stornierung oder Verschiebung mindestens 24 Stunden im Voraus. Bei späteren Absagen oder Nichterscheinen behalten wir uns vor, einen Teil der Kosten zu berechnen. Im Krankheitsfall finden wir in der Regel eine kulante Lösung.",
    category: "booking",
  },
  {
    question: "Wie diskret ist der Standort?",
    answer:
      "Sehr diskret. Unser Studio befindet sich an einer ruhigen Adresse in Zürich, ohne auffällige Beschilderung. Der Eingang ist so gestaltet, dass Sie unauffällig kommen und gehen können. Ihre Privatsphäre ist uns sehr wichtig.",
    category: "privacy",
  },
  {
    question: "Was kostet eine Session?",
    answer:
      "Die Preise variieren je nach Massage-Typ und Dauer. Eine 60-minütige Session beginnt bei CHF 180. Eine 90-minütige Session kostet CHF 260, und eine 120-minütige Premium-Session CHF 340. Detaillierte Preise finden Sie auf unserer Preisseite. Wir bieten auch Pakete und Gutscheine an.",
    category: "booking",
  },
  {
    question: "Wie kann ich bezahlen?",
    answer:
      "Wir akzeptieren Barzahlung, Kreditkarten (Visa, Mastercard), sowie TWINT. Die Bezahlung erfolgt nach der Session.",
    category: "booking",
  },
];

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <Helmet>
        <title>FAQ – Häufige Fragen | GentleHands Zürich</title>
        <meta
          name="description"
          content="Antworten auf häufige Fragen zu GentleHands: Was ist das genau? Für wen? Ist es ein Erotikstudio? Alle wichtigen Infos auf einen Blick."
        />
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
        <FloatingElements variant="dots" />
        
        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-copper/10 flex items-center justify-center"
            >
              <HelpCircle size={40} className="text-copper" />
            </motion.div>
            
            <h1 className="text-foreground mb-6">
              Alles, was Sie wissen möchten
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Hier finden Sie Antworten auf die häufigsten Fragen zu
              GentleHands. Sollte Ihre Frage nicht dabei sein, kontaktieren
              Sie uns gerne direkt.
            </p>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-md mx-auto relative"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                type="text"
                placeholder="Frage suchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 rounded-full bg-background border-border/50 text-base"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 border-b border-border/50 sticky top-16 z-30 bg-background/80 backdrop-blur-md">
        <div className="container-wide">
          <div className="flex flex-wrap justify-center gap-2">
            {faqCategories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? "bg-copper text-accent-foreground shadow-md"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {category.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="section-padding-sm">
        <div className="container-narrow">
          <AnimatePresence mode="wait">
            {filteredFaqs.length > 0 ? (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Accordion type="single" collapsible className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <AccordionItem
                        value={`item-${index}`}
                        className="card-elevated px-6 border-none overflow-hidden group"
                      >
                        <AccordionTrigger className="text-left font-display text-lg text-foreground hover:text-primary py-6 [&[data-state=open]>svg]:rotate-180">
                          <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-copper/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-copper/20 transition-colors">
                              <span className="text-copper font-medium text-sm">{index + 1}</span>
                            </div>
                            <span className="pr-4">{faq.question}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pb-6 pl-12">
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            {faq.answer}
                          </motion.div>
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  ))}
                </Accordion>
              </motion.div>
            ) : (
              <motion.div
                key="no-results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-16"
              >
                <Search size={48} className="mx-auto mb-4 text-muted-foreground/30" />
                <h3 className="text-xl font-display text-foreground mb-2">Keine Ergebnisse</h3>
                <p className="text-muted-foreground mb-6">
                  Keine Fragen gefunden für "{searchQuery}"
                </p>
                <Button variant="petrol-outline" onClick={() => setSearchQuery("")}>
                  Suche zurücksetzen
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Count */}
          {searchQuery && filteredFaqs.length > 0 && (
            <motion.p 
              className="text-center text-muted-foreground text-sm mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {filteredFaqs.length} {filteredFaqs.length === 1 ? "Ergebnis" : "Ergebnisse"} gefunden
            </motion.p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-b from-secondary/30 to-background">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <MessageCircle size={32} className="text-primary" />
            </div>
            <h2 className="text-foreground mb-6">
              Noch Fragen?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Wir sind für Sie da. Kontaktieren Sie uns direkt – wir
              beantworten Ihre Fragen gerne persönlich.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="copper" size="lg" asChild>
                <Link to="/kontakt">Kontakt aufnehmen</Link>
              </Button>
              <Button variant="petrol-outline" size="lg" asChild>
                <Link to="/buchung">Direkt buchen</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;