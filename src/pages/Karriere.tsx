import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SEOHead } from "@/components/shared/SEOHead";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { GlowCard } from "@/components/shared/GlowCard";
import { Heart, Users, Sparkles, Clock, Award, MapPin, Mail, Briefcase, ArrowRight, CheckCircle } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Flexible Arbeitszeiten",
    description: "Gestalten Sie Ihre Arbeitszeit flexibel nach Ihren Bedürfnissen.",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: Award,
    title: "Weiterbildung",
    description: "Regelmässige Schulungen und Workshops auf unsere Kosten.",
    color: "from-amber-500/20 to-orange-500/20",
  },
  {
    icon: Heart,
    title: "Wertschätzung",
    description: "Faire Bezahlung und ein Team, das sich gegenseitig unterstützt.",
    color: "from-rose-500/20 to-pink-500/20",
  },
  {
    icon: Sparkles,
    title: "Premium-Umgebung",
    description: "Arbeiten Sie in einer wunderschönen, professionellen Umgebung.",
    color: "from-purple-500/20 to-indigo-500/20",
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
    urgent: true,
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
    urgent: false,
  },
];

const cultureValues = [
  "Respektvoller, wertschätzender Umgang",
  "Raum für persönliche Entwicklung",
  "Faire und transparente Vergütung",
  "Work-Life-Balance, die diesen Namen verdient",
];

const Karriere = () => {
  return (
    <Layout>
      <SEOHead
        title="Karriere | Jobs bei GentleHands Zürich"
        description="Werden Sie Teil des GentleHands-Teams. Wir suchen Menschen mit Leidenschaft für Wellness und Wohlbefinden."
        canonical="/karriere"
      />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 rounded-full bg-copper/10"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
            />
          ))}
        </div>

        <div className="container-wide relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-copper/20 to-copper/5 flex items-center justify-center"
            >
              <Briefcase size={40} className="text-copper" />
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-copper font-medium tracking-wide uppercase text-sm mb-4"
            >
              Karriere
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-foreground mb-6"
            >
              Arbeiten bei{" "}
              <span className="bg-gradient-to-r from-foreground via-copper to-foreground bg-clip-text text-transparent">
                GentleHands
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground text-lg"
            >
              Wir suchen Menschen, die unsere Leidenschaft für Qualität, Achtsamkeit
              und echte Entspannung teilen. Werden Sie Teil unseres Teams.
            </motion.p>
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
                <GlowCard className="h-full" glowColor="copper">
                  <motion.div 
                    className="h-full p-6 text-center"
                    whileHover={{ y: -5 }}
                  >
                    <motion.div 
                      className={`w-16 h-16 mx-auto rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-4`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <benefit.icon size={28} className="text-copper" />
                    </motion.div>
                    <h3 className="font-display text-lg text-foreground mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {benefit.description}
                    </p>
                  </motion.div>
                </GlowCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="section-padding bg-secondary/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,hsl(var(--copper)/0.05),transparent_50%)]" />
        
        <div className="container-narrow relative">
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
              
              <GlowCard glowColor="copper">
                <div className="p-8">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Users size={48} className="text-copper mb-6" />
                  </motion.div>
                  <h3 className="font-display text-xl text-foreground mb-4">
                    Unser Versprechen
                  </h3>
                  <ul className="space-y-3">
                    {cultureValues.map((value, index) => (
                      <motion.li 
                        key={value}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 text-muted-foreground"
                      >
                        <CheckCircle size={18} className="text-copper mt-0.5 shrink-0" />
                        <span>{value}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </GlowCard>
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
                <GlowCard glowColor="copper">
                  <motion.div 
                    className="p-8"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <h3 className="font-display text-2xl text-foreground">
                            {position.title}
                          </h3>
                          <motion.span 
                            className="px-3 py-1 text-xs font-medium bg-copper/10 text-copper rounded-full"
                            whileHover={{ scale: 1.05 }}
                          >
                            {position.type}
                          </motion.span>
                          {position.urgent && (
                            <motion.span 
                              className="px-3 py-1 text-xs font-medium bg-rose-500/10 text-rose-500 rounded-full"
                              animate={{ scale: [1, 1.05, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              Dringend gesucht
                            </motion.span>
                          )}
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
                            {position.requirements.map((req, reqIndex) => (
                              <motion.li 
                                key={req}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: reqIndex * 0.1 }}
                                className="flex items-start gap-2 text-sm text-muted-foreground"
                              >
                                <CheckCircle size={14} className="text-copper mt-1 shrink-0" />
                                {req}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="copper" size="lg" className="shrink-0">
                          Jetzt bewerben
                          <ArrowRight size={16} className="ml-2" />
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                </GlowCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Speculative Application */}
      <section className="section-padding-sm bg-gradient-to-br from-petrol to-petrol-dark relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-copper-light/20"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
            />
          ))}
        </div>
        
        <div className="container-narrow text-center relative">
          <ScrollReveal>
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Mail size={48} className="mx-auto text-copper-light mb-6" />
            </motion.div>
            <h2 className="text-primary-foreground mb-6">
              Initiativbewerbung
            </h2>
            <p className="text-primary-foreground/80 mb-4">
              Keine passende Stelle dabei? Wir freuen uns immer über 
              Initiativbewerbungen von talentierten Menschen.
            </p>
            <motion.a
              href="mailto:jobs@gentlehands.ch"
              className="text-copper-light hover:text-copper transition-colors text-xl font-display block"
              whileHover={{ scale: 1.05 }}
            >
              jobs@gentlehands.ch
            </motion.a>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Karriere;