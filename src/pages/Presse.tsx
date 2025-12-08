import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SEOHead } from "@/components/shared/SEOHead";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { GlowCard } from "@/components/shared/GlowCard";
import { Download, FileText, Image, Mail, Quote, ExternalLink, Newspaper, ArrowRight, Calendar } from "lucide-react";

const pressReleases = [
  {
    date: "November 2024",
    title: "GentleHands eröffnet exklusiven Wellness-Raum für Frauen in Zürich",
    excerpt: "Ein neues Konzept für Erlebnismassagen setzt auf Individualität, Atmosphäre und höchste Qualität.",
    tag: "Neueröffnung",
  },
  {
    date: "September 2024",
    title: "Studie zeigt: 87% der Frauen wünschen sich geschützte Wellness-Räume",
    excerpt: "GentleHands-Gründer Morris über die Motivation hinter dem Frauen-exklusiven Konzept.",
    tag: "Studie",
  },
  {
    date: "Juli 2024",
    title: "Theme-basierte Massagen: Der neue Wellness-Trend",
    excerpt: "Wie atmosphärische Erlebnisse das Massage-Erlebnis auf ein neues Level heben.",
    tag: "Trend",
  },
];

const mediaCoverage = [
  {
    outlet: "Tagesanzeiger",
    title: "Wellness neu gedacht",
    date: "Oktober 2024",
    logo: "📰",
  },
  {
    outlet: "Annabelle",
    title: "Die besten Entspannungsorte für Frauen",
    date: "September 2024",
    logo: "💄",
  },
  {
    outlet: "20 Minuten",
    title: "Massage-Boom in Zürich",
    date: "August 2024",
    logo: "📱",
  },
];

const pressKitItems = [
  {
    icon: Image,
    title: "Logos & Bilder",
    description: "Hochauflösende Logos und Pressebilder.",
    size: "45 MB",
  },
  {
    icon: FileText,
    title: "Fact Sheet",
    description: "Alle wichtigen Fakten auf einen Blick.",
    size: "2 MB",
  },
  {
    icon: Quote,
    title: "Zitate & Bio",
    description: "Gründer-Bio und freigegebene Zitate.",
    size: "500 KB",
  },
];

const Presse = () => {
  return (
    <Layout>
      <SEOHead
        title="Presse & Medien | GentleHands Zürich"
        description="Presseinformationen, Medienkontakt und Downloads für Journalist:innen. Erfahren Sie mehr über GentleHands."
        canonical="/presse"
      />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-32 h-0.5 bg-gradient-to-r from-transparent via-copper/20 to-transparent"
              style={{ left: `${i * 20}%`, top: `${30 + i * 10}%` }}
              animate={{ x: [-100, 100], opacity: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
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
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-copper/20 to-copper/5 flex items-center justify-center"
            >
              <Newspaper size={40} className="text-copper" />
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-copper font-medium tracking-wide uppercase text-sm mb-4"
            >
              Medien & Presse
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-foreground mb-6"
            >
              <span className="bg-gradient-to-r from-foreground via-copper to-foreground bg-clip-text text-transparent">
                Presseinformationen
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground text-lg"
            >
              Hier finden Sie alle Informationen für Ihre Berichterstattung über GentleHands.
              Für Interviewanfragen kontaktieren Sie uns gerne direkt.
            </motion.p>
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
                <GlowCard glowColor="copper">
                  <motion.div 
                    className="p-6"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <motion.span 
                            className="inline-flex items-center gap-1 text-xs text-copper font-medium bg-copper/10 px-2 py-1 rounded-full"
                            whileHover={{ scale: 1.05 }}
                          >
                            <Calendar size={12} />
                            {release.date}
                          </motion.span>
                          <span className="text-xs px-2 py-1 bg-petrol/10 text-petrol rounded-full">
                            {release.tag}
                          </span>
                        </div>
                        <h3 className="font-display text-xl text-foreground mt-2 mb-3 hover:text-copper transition-colors">
                          {release.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {release.excerpt}
                        </p>
                      </div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="petrol-outline" size="sm" className="shrink-0">
                          <Download size={16} className="mr-2" />
                          PDF Download
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

      {/* Media Coverage */}
      <section className="section-padding bg-secondary/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--copper)/0.03),transparent_50%)]" />
        
        <div className="container-wide relative">
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
                <GlowCard className="h-full" glowColor="copper">
                  <motion.div 
                    className="p-6 cursor-pointer group"
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{item.logo}</span>
                        <span className="font-medium text-foreground">{item.outlet}</span>
                      </div>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        className="group-hover:opacity-100 opacity-0 transition-opacity"
                      >
                        <ExternalLink size={16} className="text-copper" />
                      </motion.div>
                    </div>
                    <h3 className="font-display text-lg text-foreground group-hover:text-copper transition-colors mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{item.date}</p>
                  </motion.div>
                </GlowCard>
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
            {pressKitItems.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 0.1}>
                <GlowCard className="h-full" glowColor="copper">
                  <motion.div 
                    className="p-6 text-center"
                    whileHover={{ y: -5 }}
                  >
                    <motion.div 
                      className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-copper/20 to-copper/5 flex items-center justify-center mb-4"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <item.icon size={28} className="text-copper" />
                    </motion.div>
                    <h3 className="font-display text-lg text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      {item.description}
                    </p>
                    <p className="text-xs text-copper mb-4">{item.size}</p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button variant="petrol-outline" size="sm" className="w-full">
                        <Download size={16} className="mr-2" />
                        Download
                      </Button>
                    </motion.div>
                  </motion.div>
                </GlowCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
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
              Pressekontakt
            </h2>
            <p className="text-primary-foreground/80 mb-4">
              Für Interviewanfragen, Presseanfragen und weitere Informationen:
            </p>
            <motion.a
              href="mailto:presse@gentlehands.ch"
              className="text-copper-light hover:text-copper transition-colors text-xl font-display block mb-4"
              whileHover={{ scale: 1.05 }}
            >
              presse@gentlehands.ch
            </motion.a>
            <p className="text-primary-foreground/60 text-sm">
              Wir antworten in der Regel innerhalb von 24 Stunden.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Presse;