import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Clock, Sparkles, Heart, Zap, Moon, Sun, Star, ArrowRight } from "lucide-react";
import { FloatingElements } from "@/components/shared/FloatingElements";
import { GlowCard } from "@/components/shared/GlowCard";

import massageDeepRelease from "@/assets/massage-deep-release.jpg";
import massageStressReset from "@/assets/massage-stress-reset.jpg";
import massageNeck from "@/assets/massage-hands-neck.jpg";
import massageLowerBack from "@/assets/massage-hands-lower-back.jpg";
import massageHotStones from "@/assets/massage-hot-stones.jpg";
import massageOverhead from "@/assets/massage-overhead-view.jpg";
import massageBack from "@/assets/massage-hands-back.jpg";

const massages = [
  {
    id: "deep-release",
    title: "Deep Release Session",
    subtitle: "Tiefe körperliche Entspannung",
    image: massageDeepRelease,
    durations: ["90 Min", "120 Min"],
    description:
      "Unsere intensivste Massage für maximales körperliches und mentales Loslassen. Perfekt bei starken Verspannungen, chronischer Anspannung oder wenn Sie einfach das Gefühl haben, alles festzuhalten.",
    details: [
      "Tiefe, langsame Drucktechniken",
      "Fokus auf Problemzonen nach Absprache",
      "Lange Ausstreichungen für Nervensystem-Beruhigung",
      "Optional: Integration von Atemübungen",
    ],
    intensity: "Mittel bis Tief",
    recommendedThemes: ["Deep Dark Relax", "Alpine Stille"],
    highlight: "Beliebt",
    icon: Heart,
  },
  {
    id: "stress-reset",
    title: "Stress Reset",
    subtitle: "Gezielte Entlastung",
    image: massageStressReset,
    durations: ["60 Min", "90 Min"],
    description:
      "Die perfekte Massage für berufstätige Frauen mit wenig Zeit. Gezielt, effektiv und trotzdem entspannend. Ideal als regelmässige «Wartung» für Ihren Körper.",
    details: [
      "Fokus auf Nacken, Schultern, Rücken",
      "Mittlere Intensität",
      "Schneller Einstieg in Entspannung",
      "Perfekt für Mittagspause oder nach der Arbeit",
    ],
    intensity: "Leicht bis Mittel",
    recommendedThemes: ["Urban Loft", "Zen Garden"],
    highlight: null,
    icon: Zap,
  },
  {
    id: "emotional-grounding",
    title: "Emotional Grounding",
    subtitle: "Zurück ins Körpergefühl",
    image: massageNeck,
    durations: ["90 Min"],
    description:
      "Wenn Sie sich «neben sich» fühlen, ständig im Kopf kreisen oder emotional aufgewühlt sind. Diese Massage hilft Ihrem Nervensystem, wieder ins Gleichgewicht zu finden.",
    details: [
      "Sanfte, haltende Berührungen",
      "Viel Präsenz und Langsamkeit",
      "Erdende Techniken an Füssen und Beinen",
      "Raum für emotionales Loslassen",
    ],
    intensity: "Sanft bis Mittel",
    recommendedThemes: ["Deep Dark Relax", "Zen Garden", "Alpine Stille"],
    highlight: "Transformativ",
    icon: Moon,
  },
  {
    id: "ganzkoerper",
    title: "Ganzkörper Tiefenentspannung",
    subtitle: "Das vollständige Erlebnis",
    image: massageLowerBack,
    durations: ["120 Min"],
    description:
      "Unser Flaggschiff-Erlebnis: Eine vollständige Reise durch Ihren ganzen Körper. Von Kopf bis Fuss werden alle Bereiche mit Aufmerksamkeit bedacht – das ultimative Loslassen.",
    details: [
      "Kopf-, Gesichts- und Nackenmassage",
      "Vollständige Rücken- und Beinmassage",
      "Hand- und Fussmassage inklusive",
      "Sehr ruhiges, meditatives Tempo",
    ],
    intensity: "Individuell anpassbar",
    recommendedThemes: ["Ozean & Palmen", "Alpine Stille", "Surprise"],
    highlight: "Premium",
    icon: Star,
  },
  {
    id: "feierabend",
    title: "Feierabend-Ritual",
    subtitle: "Nur abends verfügbar",
    image: massageHotStones,
    durations: ["75 Min"],
    description:
      "Ein besonderes Angebot für den Tagesabschluss. Nur in den Abendstunden buchbar, perfekt um den Tag loszulassen und entspannt in den Feierabend zu gleiten.",
    details: [
      "Beginn mit kurzer Ankommens-Meditation",
      "Entspannende Ganzkörpermassage",
      "Abschluss mit warmem Tee",
      "Ideal nach stressigen Arbeitstagen",
    ],
    intensity: "Sanft bis Mittel",
    recommendedThemes: ["Deep Dark Relax", "Zen Garden"],
    highlight: "Limitiert",
    icon: Sun,
  },
  {
    id: "massgeschneidert",
    title: "Massgeschneidertes Erlebnis",
    subtitle: "Komplett individuell",
    image: massageOverhead,
    durations: ["Nach Absprache"],
    description:
      "Für besondere Wünsche oder komplexe Bedürfnisse. In einem kurzen Vorgespräch klären wir, was Sie brauchen, und designen ein Erlebnis nur für Sie.",
    details: [
      "Persönliches Vorgespräch",
      "Individuelles Massage-Design",
      "Kombination verschiedener Techniken",
      "Flexibel in Dauer und Fokus",
    ],
    intensity: "Nach Wunsch",
    recommendedThemes: ["Alle Themes möglich"],
    highlight: "Individuell",
    icon: Sparkles,
  },
];

const Massagen = () => {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <Layout>
      <Helmet>
        <title>Massagen & Angebote | GentleHands Zürich</title>
        <meta
          name="description"
          content="Entdecken Sie unsere Massagen: Deep Release, Stress Reset, Emotional Grounding und mehr. Jede Massage kombinierbar mit unseren atmosphärischen Themes."
        />
      </Helmet>

      {/* Hero with Parallax */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <img src={massageBack} alt="GentleHands Massagen" className="w-full h-full object-cover scale-110" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        </motion.div>
        
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-copper/10 border border-copper/20 mb-6"
            >
              <Sparkles size={16} className="text-copper" />
              <span className="text-copper text-sm font-medium">6 einzigartige Massagen</span>
            </motion.div>
            
            <h1 className="text-foreground mb-6">
              Finden Sie Ihre Massage
            </h1>
            <p className="text-muted-foreground text-lg">
              Jede unserer Massagen lässt sich mit jedem Theme kombinieren.
              Gemeinsam finden wir die perfekte Abstimmung für Ihre Bedürfnisse.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Massages Grid */}
      <section className="section-padding-sm">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {massages.map((massage, index) => (
              <motion.div
                key={massage.id}
                id={massage.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="scroll-mt-32"
              >
                <GlowCard className="h-full overflow-hidden">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <motion.img
                      src={massage.image}
                      alt={massage.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                    {massage.highlight && (
                      <span className="absolute top-4 right-4 px-3 py-1 text-xs font-medium bg-copper text-accent-foreground rounded-full">
                        {massage.highlight}
                      </span>
                    )}
                  </div>

                  <div className="p-8">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <massage.icon size={28} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl text-foreground">
                          {massage.title}
                        </h3>
                        <p className="text-sm text-copper">{massage.subtitle}</p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-6">
                      {massage.description}
                    </p>

                    {/* Details */}
                    <ul className="space-y-2 mb-6">
                      {massage.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-3 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-copper mt-2 shrink-0" />
                          <span className="text-muted-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-4 mb-6 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock size={16} className="text-primary" />
                        <span>{massage.durations.join(" / ")}</span>
                      </div>
                      <div className="text-muted-foreground">
                        <span className="text-foreground">Intensität:</span>{" "}
                        {massage.intensity}
                      </div>
                    </div>

                    {/* Recommended Themes */}
                    <div className="mb-6">
                      <p className="text-sm text-muted-foreground mb-2">
                        Empfohlene Themes:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {massage.recommendedThemes.map((theme) => (
                          <span
                            key={theme}
                            className="px-3 py-1 text-xs bg-secondary rounded-full text-secondary-foreground"
                          >
                            {theme}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <Button variant="copper" className="w-full group" asChild>
                      <Link to={`/buchung?massage=${massage.id}`}>
                        Diese Massage buchen
                        <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-foreground mb-6">
              Kombinieren Sie frei
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Bei GentleHands wählen Sie Massage und Theme unabhängig
              voneinander. So entsteht ein Erlebnis, das genau zu Ihren
              aktuellen Bedürfnissen passt.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="copper" size="lg" asChild>
                <Link to="/buchung">Jetzt buchen</Link>
              </Button>
              <Button variant="petrol-outline" size="lg" asChild>
                <Link to="/erlebnisse">Themes entdecken</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Massagen;
