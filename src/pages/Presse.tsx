import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Download, FileText, Image, Mail, Quote, ExternalLink } from "lucide-react";

const pressReleases = [
  {
    date: "November 2024",
    title: "GentleHands eröffnet exklusiven Wellness-Raum für Frauen in Zürich",
    excerpt: "Ein neues Konzept für Erlebnismassagen setzt auf Individualität, Atmosphäre und höchste Qualität.",
  },
  {
    date: "September 2024",
    title: "Studie zeigt: 87% der Frauen wünschen sich geschützte Wellness-Räume",
    excerpt: "GentleHands-Gründer Morris über die Motivation hinter dem Frauen-exklusiven Konzept.",
  },
  {
    date: "Juli 2024",
    title: "Theme-basierte Massagen: Der neue Wellness-Trend",
    excerpt: "Wie atmosphärische Erlebnisse das Massage-Erlebnis auf ein neues Level heben.",
  },
];

const mediaCoverage = [
  {
    outlet: "Tagesanzeiger",
    title: "Wellness neu gedacht",
    date: "Oktober 2024",
  },
  {
    outlet: "Annabelle",
    title: "Die besten Entspannungsorte für Frauen",
    date: "September 2024",
  },
  {
    outlet: "20 Minuten",
    title: "Massage-Boom in Zürich",
    date: "August 2024",
  },
];

const Presse = () => {
  return (
    <Layout>
      <Helmet>
        <title>Presse & Medien | GentleHands Zürich</title>
        <meta
          name="description"
          content="Presseinformationen, Medienkontakt und Downloads für Journalist:innen. Erfahren Sie mehr über GentleHands."
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
              Medien & Presse
            </p>
            <h1 className="text-foreground mb-6">
              Presseinformationen
            </h1>
            <p className="text-muted-foreground text-lg">
              Hier finden Sie alle Informationen für Ihre Berichterstattung über GentleHands.
              Für Interviewanfragen kontaktieren Sie uns gerne direkt.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="section-padding-sm">
        <div className="container-wide">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-foreground">Pressemitteilungen</h2>
            </div>
          </ScrollReveal>

          <div className="space-y-6">
            {pressReleases.map((release, index) => (
              <ScrollReveal key={release.title} delay={index * 0.1}>
                <div className="p-6 rounded-2xl bg-card border border-border hover:border-copper/30 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <span className="text-xs text-copper font-medium">
                        {release.date}
                      </span>
                      <h3 className="font-display text-xl text-foreground mt-2 mb-3">
                        {release.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {release.excerpt}
                      </p>
                    </div>
                    <Button variant="petrol-outline" size="sm" className="shrink-0">
                      <Download size={16} />
                      PDF Download
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Media Coverage */}
      <section className="section-padding bg-secondary/30">
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-foreground mb-4">
                Medienberichte
              </h2>
              <p className="text-muted-foreground">
                Ausgewählte Artikel und Berichte über GentleHands.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mediaCoverage.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 0.1}>
                <div className="p-6 rounded-2xl bg-card border border-border hover:border-copper/30 transition-colors group cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium text-foreground">{item.outlet}</span>
                    <ExternalLink size={16} className="text-muted-foreground group-hover:text-copper transition-colors" />
                  </div>
                  <h3 className="font-display text-lg text-foreground group-hover:text-copper transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">{item.date}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Press Kit */}
      <section className="section-padding">
        <div className="container-narrow">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-foreground mb-4">
                Pressekit
              </h2>
              <p className="text-muted-foreground">
                Laden Sie Logos, Bilder und Informationen für Ihre Berichterstattung herunter.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScrollReveal delay={0.1}>
              <div className="p-6 rounded-2xl bg-card border border-border hover:border-copper/30 transition-colors text-center">
                <div className="w-14 h-14 mx-auto rounded-xl bg-copper/10 flex items-center justify-center mb-4">
                  <Image size={28} className="text-copper" />
                </div>
                <h3 className="font-display text-lg text-foreground mb-2">
                  Logos & Bilder
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Hochauflösende Logos und Pressebilder.
                </p>
                <Button variant="petrol-outline" size="sm" className="w-full">
                  <Download size={16} />
                  Download
                </Button>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="p-6 rounded-2xl bg-card border border-border hover:border-copper/30 transition-colors text-center">
                <div className="w-14 h-14 mx-auto rounded-xl bg-copper/10 flex items-center justify-center mb-4">
                  <FileText size={28} className="text-copper" />
                </div>
                <h3 className="font-display text-lg text-foreground mb-2">
                  Fact Sheet
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Alle wichtigen Fakten auf einen Blick.
                </p>
                <Button variant="petrol-outline" size="sm" className="w-full">
                  <Download size={16} />
                  Download
                </Button>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="p-6 rounded-2xl bg-card border border-border hover:border-copper/30 transition-colors text-center">
                <div className="w-14 h-14 mx-auto rounded-xl bg-copper/10 flex items-center justify-center mb-4">
                  <Quote size={28} className="text-copper" />
                </div>
                <h3 className="font-display text-lg text-foreground mb-2">
                  Zitate & Bio
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Gründer-Bio und freigegebene Zitate.
                </p>
                <Button variant="petrol-outline" size="sm" className="w-full">
                  <Download size={16} />
                  Download
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section-padding-sm bg-gradient-to-br from-petrol to-petrol-dark">
        <div className="container-narrow text-center">
          <ScrollReveal>
            <Mail size={48} className="mx-auto text-copper-light mb-6" />
            <h2 className="text-primary-foreground mb-6">
              Pressekontakt
            </h2>
            <p className="text-primary-foreground/80 mb-4">
              Für Interviewanfragen, Presseanfragen und weitere Informationen:
            </p>
            <a
              href="mailto:presse@gentlehands.ch"
              className="text-copper-light hover:text-copper transition-colors text-xl font-display"
            >
              presse@gentlehands.ch
            </a>
            <p className="text-primary-foreground/60 mt-4 text-sm">
              Wir antworten in der Regel innerhalb von 24 Stunden.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Presse;
