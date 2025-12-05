import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Heart, Shield, Eye, Sparkles, Star } from "lucide-react";
import spaMassageRoom from "@/assets/spa-massage-room.jpg";
import wellnessLounge from "@/assets/wellness-lounge.jpg";

const values = [
  {
    icon: Shield,
    title: "Vertrauen",
    description:
      "Alles beginnt mit Vertrauen. Wir schaffen einen Raum, in dem Sie sich vollständig sicher fühlen können.",
  },
  {
    icon: Eye,
    title: "Präsenz",
    description:
      "Vollständige Aufmerksamkeit für Sie. Keine Ablenkungen, keine Eile – nur Sie und dieser Moment.",
  },
  {
    icon: Heart,
    title: "Achtsamkeit",
    description:
      "Jede Berührung ist bewusst. Wir spüren, was Ihr Körper braucht, und passen uns an.",
  },
  {
    icon: Sparkles,
    title: "Diskretion",
    description:
      "Ihre Privatsphäre ist uns heilig. Diskreter Standort, vertraulicher Umgang, keine Kompromisse.",
  },
  {
    icon: Star,
    title: "Qualität",
    description:
      "Keine Massenabfertigung. Limitierte Termine, sorgfältige Vorbereitung, höchste Ansprüche.",
  },
];

const UeberUns = () => {
  return (
    <Layout>
      <Helmet>
        <title>Über uns | GentleHands Zürich</title>
        <meta
          name="description"
          content="Erfahren Sie mehr über GentleHands: Unsere Vision, unsere Werte und warum wir exklusive Erlebnismassagen nur für Frauen anbieten."
        />
      </Helmet>

      {/* Hero with Image */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={wellnessLounge} alt="GentleHands Wellness Lounge" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>
        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-copper font-medium tracking-wide uppercase text-sm mb-4">
              Über GentleHands
            </p>
            <h1 className="text-foreground mb-6">
              Ein Ort für tiefe Entspannung
            </h1>
            <p className="text-muted-foreground text-lg">
              GentleHands ist mehr als ein Massage-Studio. Es ist ein
              geschützter Raum, in dem Frauen sich erlauben dürfen, vollständig
              loszulassen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding-sm">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-foreground mb-6 text-center">Unsere Geschichte</h2>
            <div className="divider-copper mx-auto mb-10" />
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p>
                GentleHands entstand aus einer einfachen Beobachtung: Viele
                Frauen tragen eine enorme Last – beruflich, familiär, emotional.
                Sie funktionieren, kümmern sich um andere, halten zusammen, was
                zusammengehalten werden muss. Aber wann dürfen sie selbst
                loslassen?
              </p>
              <p>
                Die Idee war, einen Ort zu schaffen, an dem Frauen nicht
                funktionieren müssen. Keinen Spa mit Massenabfertigung, keine
                Wellness-Fabrik, kein Ort, an dem man zwischen Terminen
                durchgeschleust wird. Sondern ein Raum der vollständigen Präsenz
                und Aufmerksamkeit.
              </p>
              <p>
                GentleHands wurde gegründet, um genau das zu sein: Eine private
                Suite, in der jede Frau für die Dauer ihrer Session im
                Mittelpunkt steht. Wo das Ambiente nicht Standard ist, sondern
                individuell gewählt werden kann. Wo die Berührung nicht
                mechanisch ist, sondern bewusst und achtsam.
              </p>
              <p>
                Der Fokus auf Frauen ist bewusst gewählt. Es geht darum, einen
                Raum zu schaffen, in dem Vertrauen die Grundlage ist. In dem
                sich Frauen vollständig sicher fühlen können, ohne erklären zu
                müssen, was sie brauchen oder sich rechtfertigen zu müssen, dass
                sie sich Zeit für sich nehmen.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-copper-light font-medium tracking-wide uppercase text-sm mb-4">
              Unsere Vision
            </p>
            <h2 className="text-primary-foreground mb-8">
              „Ein Raum, in dem Frauen sich gehalten, gesehen und entspannt
              fühlen dürfen."
            </h2>
            <p className="text-primary-foreground/80 text-lg">
              Wir glauben, dass echte Entspannung nur in einem Zustand von
              Sicherheit und Vertrauen möglich ist. Deshalb investieren wir in
              Atmosphäre, Qualität und Beziehung – nicht in Quantität.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-copper font-medium tracking-wide uppercase text-sm mb-4">
              Unsere Werte
            </p>
            <h2 className="text-foreground mb-4">Wofür wir stehen</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <value.icon size={32} className="text-primary" />
                </div>
                <h3 className="font-display text-xl text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="section-padding-sm bg-secondary/30">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="aspect-square rounded-3xl overflow-hidden">
                <img 
                  src={spaMassageRoom} 
                  alt="GentleHands Massageraum" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-copper font-medium tracking-wide uppercase text-sm mb-4">
                Der Gründer
              </p>
              <h2 className="text-foreground mb-6">Morris</h2>
              <div className="divider-copper mb-6" />
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Mit über 12 Jahren Erfahrung in ganzheitlicher Körperarbeit
                  gründete Morris GentleHands aus der Vision heraus, einen
                  wirklich einzigartigen Ort für Frauen zu schaffen.
                </p>
                <p>
                  Nach Ausbildungen in klassischer Massage, Craniosacral-Arbeit
                  und trauma-sensitiver Körperarbeit entwickelte er einen
                  eigenen Stil, der technische Kompetenz mit tiefer Präsenz
                  verbindet.
                </p>
                <p>
                  „Ich habe gesehen, wie viele Frauen in klassischen
                  Massage-Settings nie wirklich loslassen können. GentleHands
                  ist meine Antwort darauf – ein Raum, in dem das endlich
                  möglich ist."
                </p>
              </div>
              <div className="mt-8">
                <Button variant="petrol-outline" asChild>
                  <Link to="/team">Das ganze Team kennenlernen</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-foreground mb-6">
              Bereit für Ihr Erlebnis?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Erleben Sie selbst, was es bedeutet, in einem wirklich
              geschützten Raum vollständig loszulassen.
            </p>
            <Button variant="copper" size="lg" asChild>
              <Link to="/buchung">Erlebnis anfragen</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default UeberUns;
