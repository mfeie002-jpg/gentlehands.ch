import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Heart, Users, Sparkles, Clock, Award, MapPin, Mail } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Flexible Arbeitszeiten",
    description: "Gestalten Sie Ihre Arbeitszeit flexibel nach Ihren Bedürfnissen.",
  },
  {
    icon: Award,
    title: "Weiterbildung",
    description: "Regelmässige Schulungen und Workshops auf unsere Kosten.",
  },
  {
    icon: Heart,
    title: "Wertschätzung",
    description: "Faire Bezahlung und ein Team, das sich gegenseitig unterstützt.",
  },
  {
    icon: Sparkles,
    title: "Premium-Umgebung",
    description: "Arbeiten Sie in einer wunderschönen, professionellen Umgebung.",
  },
];

const openPositions = [
  {
    title: "Masseur:in (m/w/d)",
    type: "Teilzeit / Vollzeit",
    location: "Zürich",
    description: "Wir suchen erfahrene Masseur:innen mit Herz und Professionalität.",
    requirements: [
      "Abgeschlossene Ausbildung als Masseur:in",
      "Mindestens 3 Jahre Berufserfahrung",
      "Einfühlungsvermögen und Präsenz",
      "Fliessende Deutschkenntnisse",
    ],
  },
  {
    title: "Empfang & Administration",
    type: "Teilzeit (50-60%)",
    location: "Zürich",
    description: "Sie sind das erste Gesicht von GentleHands und sorgen für einen reibungslosen Ablauf.",
    requirements: [
      "Erfahrung in Kundenbetreuung",
      "Organisationstalent",
      "Freundliches, professionelles Auftreten",
      "Deutsch und Englisch fliessend",
    ],
  },
];

const Karriere = () => {
  return (
    <Layout>
      <Helmet>
        <title>Karriere | Jobs bei GentleHands Zürich</title>
        <meta
          name="description"
          content="Werden Sie Teil des GentleHands-Teams. Wir suchen Menschen mit Leidenschaft für Wellness und Wohlbefinden."
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
              Karriere
            </p>
            <h1 className="text-foreground mb-6">
              Arbeiten bei GentleHands
            </h1>
            <p className="text-muted-foreground text-lg">
              Wir suchen Menschen, die unsere Leidenschaft für Qualität, Achtsamkeit
              und echte Entspannung teilen. Werden Sie Teil unseres Teams.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Join */}
      <section className="section-padding-sm">
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-foreground mb-4">
                Warum GentleHands?
              </h2>
              <p className="text-muted-foreground">
                Was Sie bei uns erwartet.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <ScrollReveal key={benefit.title} delay={index * 0.1}>
                <div className="h-full p-6 rounded-2xl bg-card border border-border hover:border-copper/30 transition-colors text-center">
                  <div className="w-14 h-14 mx-auto rounded-xl bg-copper/10 flex items-center justify-center mb-4">
                    <benefit.icon size={28} className="text-copper" />
                  </div>
                  <h3 className="font-display text-lg text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {benefit.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="section-padding bg-secondary/30">
        <div className="container-narrow">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-foreground mb-6">
                  Unsere Kultur
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Bei GentleHands glauben wir, dass zufriedene Mitarbeitende den
                    besten Service bieten. Deshalb investieren wir in ein Arbeitsumfeld,
                    das Wertschätzung, Wachstum und Wohlbefinden fördert.
                  </p>
                  <p>
                    Wir sind ein kleines Team mit grossen Ansprüchen. Qualität geht
                    bei uns vor Quantität – sowohl bei unseren Sessions als auch bei
                    unseren Arbeitsbeziehungen.
                  </p>
                  <p>
                    Regelmässige Team-Events, offene Kommunikation und gegenseitige
                    Unterstützung gehören bei uns zum Alltag.
                  </p>
                </div>
              </div>
              <div className="p-8 rounded-2xl bg-card border border-border">
                <Users size={48} className="text-copper mb-6" />
                <h3 className="font-display text-xl text-foreground mb-4">
                  Unser Versprechen
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-copper mt-2 shrink-0" />
                    Respektvoller, wertschätzender Umgang
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-copper mt-2 shrink-0" />
                    Raum für persönliche Entwicklung
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-copper mt-2 shrink-0" />
                    Faire und transparente Vergütung
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-copper mt-2 shrink-0" />
                    Work-Life-Balance, die diesen Namen verdient
                  </li>
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Open Positions */}
      <section className="section-padding">
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-foreground mb-4">
                Offene Stellen
              </h2>
              <p className="text-muted-foreground">
                Aktuelle Möglichkeiten, Teil unseres Teams zu werden.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <ScrollReveal key={position.title} delay={index * 0.1}>
                <div className="p-8 rounded-2xl bg-card border border-border hover:border-copper/30 transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="font-display text-2xl text-foreground">
                          {position.title}
                        </h3>
                        <span className="px-3 py-1 text-xs font-medium bg-copper/10 text-copper rounded-full">
                          {position.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                        <MapPin size={16} />
                        <span>{position.location}</span>
                      </div>
                      <p className="text-muted-foreground mb-6">
                        {position.description}
                      </p>
                      <div>
                        <p className="font-medium text-foreground mb-3">Anforderungen:</p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {position.requirements.map((req) => (
                            <li key={req} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="w-1.5 h-1.5 rounded-full bg-copper mt-2 shrink-0" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <Button variant="copper" size="lg" className="shrink-0">
                      Jetzt bewerben
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Speculative Application */}
      <section className="section-padding-sm bg-gradient-to-br from-petrol to-petrol-dark">
        <div className="container-narrow text-center">
          <ScrollReveal>
            <Mail size={48} className="mx-auto text-copper-light mb-6" />
            <h2 className="text-primary-foreground mb-6">
              Initiativbewerbung
            </h2>
            <p className="text-primary-foreground/80 mb-4">
              Keine passende Stelle dabei? Wir freuen uns immer über 
              Initiativbewerbungen von talentierten Menschen.
            </p>
            <a
              href="mailto:jobs@gentlehands.ch"
              className="text-copper-light hover:text-copper transition-colors text-xl font-display"
            >
              jobs@gentlehands.ch
            </a>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Karriere;
