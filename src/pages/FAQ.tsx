import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Was ist GentleHands genau?",
    answer:
      "GentleHands ist ein exklusiver Ort für Erlebnismassagen – ausschliesslich für Frauen. Wir bieten professionelle Entspannungsmassagen in atmosphärisch gestalteten Räumen an. Jedes Erlebnis wird durch ein wählbares «Theme» geprägt: Licht, Düfte, Klänge und Ambiente sind perfekt auf Ihre Entspannung abgestimmt. Es ist kein klassisches Massage-Studio, sondern ein privater Raum für tiefe Entspannung.",
  },
  {
    question: "Für wen eignet sich GentleHands?",
    answer:
      "GentleHands ist ideal für Frauen, die sich eine Auszeit vom Alltag wünschen, unter Stress oder Anspannung leiden, sich etwas Besonderes gönnen möchten, oder einen sicheren Raum suchen, in dem sie vollständig loslassen können. Ob nach einer intensiven Arbeitsphase, als regelmässiges Ritual oder als einmaliges Erlebnis – GentleHands passt sich Ihren Bedürfnissen an.",
  },
  {
    question: "Warum ist GentleHands nur für Frauen?",
    answer:
      "Die Entscheidung, GentleHands ausschliesslich für Frauen anzubieten, basiert auf dem Wunsch, einen Raum maximaler Sicherheit und Entspannung zu schaffen. Viele Frauen können sich in einem geschützten, frauenorientierten Umfeld leichter fallen lassen. Die gesamte Atmosphäre, Kommunikation und Herangehensweise ist auf weibliche Bedürfnisse ausgerichtet.",
  },
  {
    question: "Ist GentleHands ein Erotikstudio?",
    answer:
      "Nein, absolut nicht. GentleHands bietet ausschliesslich professionelle Entspannungs- und Wohlfühlmassagen an. Es gibt keine sexuellen Dienstleistungen. «Sinnlich» bedeutet bei uns atmosphärisch und auf die Sinne bezogen (Sehen, Hören, Riechen, Fühlen) – nicht erotisch. Wir legen grossen Wert auf Professionalität, Respekt und klare Grenzen.",
  },
  {
    question: "Was trage ich während der Massage?",
    answer:
      "Sie entkleiden sich so weit, wie Sie sich wohl fühlen. Die meisten Kundinnen werden vollständig massiert, sind aber während der gesamten Session professionell abgedeckt – nur der gerade bearbeitete Bereich wird freigelegt. Wenn Sie bestimmte Bereiche nicht berührt haben möchten, teilen Sie uns das einfach mit.",
  },
  {
    question: "Wie bereite ich mich vor?",
    answer:
      "Kommen Sie am besten entspannt an. Vermeiden Sie direkt vor der Session grosse Mahlzeiten. Schalten Sie Ihr Handy aus oder auf lautlos. Alles andere übernehmen wir – Sie müssen nichts mitbringen. Handtücher, Öle und alles Notwendige stellen wir bereit. Kommen Sie etwa 10 Minuten vor Ihrem Termin.",
  },
  {
    question: "Was, wenn ich mich während der Session unwohl fühle?",
    answer:
      "Sie haben jederzeit die volle Kontrolle. Wenn Ihnen etwas unangenehm ist – sei es die Musik, der Druck, ein bestimmter Bereich oder irgendetwas anderes – sagen Sie es einfach. Wir passen uns sofort an. Sie können die Session auch jederzeit abbrechen, ohne Erklärung. Ihr Wohlbefinden hat oberste Priorität.",
  },
  {
    question: "Kann ich meine Präferenzen später ändern?",
    answer:
      "Ja, natürlich. Die im Buchungsprozess angegebenen Präferenzen sind ein Ausgangspunkt. Vor der Session haben Sie nochmals Gelegenheit, Wünsche anzupassen. Und auch während der Massage können Sie jederzeit Feedback geben.",
  },
  {
    question: "Wie kurzfristig kann ich stornieren?",
    answer:
      "Wir bitten um Stornierung oder Verschiebung mindestens 24 Stunden im Voraus. Bei späteren Absagen oder Nichterscheinen behalten wir uns vor, einen Teil der Kosten zu berechnen. Im Krankheitsfall finden wir in der Regel eine kulante Lösung.",
  },
  {
    question: "Wie diskret ist der Standort?",
    answer:
      "Sehr diskret. Unser Studio befindet sich an einer ruhigen Adresse in Zürich, ohne auffällige Beschilderung. Der Eingang ist so gestaltet, dass Sie unauffällig kommen und gehen können. Ihre Privatsphäre ist uns sehr wichtig.",
  },
  {
    question: "Was kostet eine Session?",
    answer:
      "Die Preise variieren je nach Massage-Typ und Dauer. Eine 60-minütige Session beginnt bei CHF [Platzhalter]. Detaillierte Preise erhalten Sie nach Ihrer Anfrage. Wir bieten auch Pakete und Gutscheine an.",
  },
  {
    question: "Wie kann ich bezahlen?",
    answer:
      "Wir akzeptieren Barzahlung, Kreditkarten (Visa, Mastercard), sowie TWINT. Die Bezahlung erfolgt nach der Session.",
  },
];

const FAQ = () => {
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
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-copper font-medium tracking-wide uppercase text-sm mb-4">
              Häufige Fragen
            </p>
            <h1 className="text-foreground mb-6">
              Alles, was Sie wissen möchten
            </h1>
            <p className="text-muted-foreground text-lg">
              Hier finden Sie Antworten auf die häufigsten Fragen zu
              GentleHands. Sollte Ihre Frage nicht dabei sein, kontaktieren
              Sie uns gerne direkt.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="section-padding-sm">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="card-elevated px-6 border-none"
                >
                  <AccordionTrigger className="text-left font-display text-lg text-foreground hover:text-primary py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-secondary/30">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
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
