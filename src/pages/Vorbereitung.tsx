import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Check, Clock, MapPin, Shirt, Droplets, Heart, Phone, Coffee, X } from "lucide-react";

const beforeVisit = [
  { icon: Clock, title: "Kommen Sie pünktlich", text: "Planen Sie 10-15 Minuten vor Ihrem Termin ein, um in Ruhe anzukommen." },
  { icon: Coffee, title: "Leichte Mahlzeit", text: "Vermeiden Sie schwere Mahlzeiten 2 Stunden vor der Session." },
  { icon: Droplets, title: "Gut hydriert", text: "Trinken Sie ausreichend Wasser vor Ihrem Besuch." },
  { icon: Phone, title: "Digital Detox", text: "Schalten Sie Ihr Handy aus oder auf lautlos – Sie werden nicht erreichbar sein." },
];

const duringSession = [
  { icon: Shirt, title: "Bekleidung", text: "Sie entkleiden sich so weit, wie Sie sich wohl fühlen. Professionelle Abdeckung ist garantiert." },
  { icon: Heart, title: "Kommunikation", text: "Teilen Sie uns mit, wenn etwas unangenehm ist – Druck, Temperatur, Berührung." },
  { icon: Check, title: "Loslassen", text: "Es gibt kein 'richtig' oder 'falsch'. Erlauben Sie sich einfach zu sein." },
];

const afterSession = [
  { title: "Ruhe gönnen", text: "Planen Sie keine stressigen Aktivitäten direkt nach der Session." },
  { title: "Viel trinken", text: "Wasser hilft dem Körper, gelöste Stoffe auszuspülen." },
  { title: "Leichte Bewegung", text: "Ein kurzer Spaziergang kann das Wohlgefühl verlängern." },
  { title: "Warmhalten", text: "Halten Sie sich warm, besonders in den ersten Stunden danach." },
];

const dontDo = [
  "Direkt vorher Alkohol trinken",
  "Mit vollem Magen kommen",
  "Unter Zeitdruck anreisen",
  "Sofort wieder arbeiten",
];

const Vorbereitung = () => {
  return (
    <Layout>
      <Helmet>
        <title>Vorbereitung | GentleHands Zürich</title>
        <meta
          name="description"
          content="Tipps zur optimalen Vorbereitung auf Ihr GentleHands-Erlebnis. So holen Sie das Maximum aus Ihrer Session."
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
              Vorbereitung
            </p>
            <h1 className="text-foreground mb-6">
              Machen Sie das Beste aus Ihrem Erlebnis
            </h1>
            <p className="text-muted-foreground text-lg">
              Mit ein paar einfachen Vorbereitungen können Sie die Wirkung Ihrer
              GentleHands-Session maximieren.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Before */}
      <section className="section-padding-sm">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-foreground mb-2">Vor Ihrem Besuch</h2>
            <div className="divider-copper" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {beforeVisit.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card-elevated p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon size={24} className="text-primary" />
                </div>
                <h4 className="font-display text-lg text-foreground mb-2">
                  {item.title}
                </h4>
                <p className="text-muted-foreground text-sm">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* During */}
      <section className="section-padding-sm bg-secondary/30">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-foreground mb-2">Während der Session</h2>
            <div className="divider-copper" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {duringSession.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card-elevated p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-copper/10 flex items-center justify-center mb-4">
                  <item.icon size={24} className="text-copper" />
                </div>
                <h4 className="font-display text-lg text-foreground mb-2">
                  {item.title}
                </h4>
                <p className="text-muted-foreground text-sm">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* After */}
      <section className="section-padding-sm">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-foreground mb-2">Nach der Session</h2>
              <div className="divider-copper mb-8" />

              <div className="space-y-4">
                {afterSession.map((item, index) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-copper/20 flex items-center justify-center shrink-0">
                      <Check size={16} className="text-copper" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p className="text-muted-foreground text-sm">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-foreground mb-2">Bitte vermeiden</h2>
              <div className="divider-copper mb-8" />

              <div className="card-bordered p-6 bg-destructive/5">
                <div className="space-y-4">
                  {dontDo.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <X size={18} className="text-destructive" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location Tip */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-narrow text-center">
          <MapPin size={32} className="mx-auto mb-6 text-copper" />
          <h2 className="text-primary-foreground mb-4">Anreise</h2>
          <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
            Unser Studio befindet sich an einer diskreten Adresse in Zürich. Die
            genaue Adresse erhalten Sie nach Ihrer Buchungsbestätigung per E-Mail.
            Planen Sie genug Zeit für die Anreise ein.
          </p>
          <Button variant="copper" asChild>
            <Link to="/kontakt">Mehr zur Lage</Link>
          </Button>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-narrow text-center">
          <h2 className="text-foreground mb-6">Bereit?</h2>
          <Button variant="copper" size="lg" asChild>
            <Link to="/buchung">Jetzt Termin buchen</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Vorbereitung;
