import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Clock, Sparkles, Heart, Zap, Moon, Sun, Star, ArrowRight, Filter, Check } from "lucide-react";
import { FloatingElements } from "@/components/shared/FloatingElements";
import { GlowCard } from "@/components/shared/GlowCard";
import { MassageComparisonTable } from "@/components/massagen/MassageComparisonTable";
import { MassageBenefitsGrid } from "@/components/massagen/MassageBenefitsGrid";
import { MassageProcessSection } from "@/components/massagen/MassageProcessSection";

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
    category: "intensiv",
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
    category: "schnell",
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
    category: "sanft",
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
    category: "premium",
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
    category: "sanft",
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
    category: "premium",
  },
];

const categories = [
  { id: "all", label: "Alle" },
  { id: "sanft", label: "Sanft" },
  { id: "intensiv", label: "Intensiv" },
  { id: "schnell", label: "Express" },
  { id: "premium", label: "Premium" },
];

const Massagen = () => {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredMassage, setHoveredMassage] = useState<string | null>(null);

  const filteredMassages = activeCategory === "all" 
    ? massages 
    : massages.filter(m => m.category === activeCategory);

  return (
    <Layout>
      <Helmet>
        <title>Professionelle Entspannungsmassagen | GentleHands Zürich</title>
        <meta
          name="description"
          content="Entdecken Sie unsere professionellen Entspannungsmassagen: Deep Release, Stress Reset, Emotional Grounding und mehr. Jede Massage kombinierbar mit unseren Themenräumen."
        />
      </Helmet>

      {/* Hero with Parallax */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <img src={massageBack} alt="GentleHands Massagen" className="w-full h-full object-cover scale-110" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        </motion.div>
        
        {/* Ambient Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-copper/10 blur-[100px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-primary/10 blur-[80px]"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>
        
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-copper/10 border border-copper/20 mb-6 backdrop-blur-sm"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={16} className="text-copper" />
              </motion.div>
              <span className="text-copper text-sm font-medium">6 einzigartige Massagen</span>
            </motion.div>
            
            <motion.h1 
              className="text-foreground mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="block">Finden Sie</span>
              <span className="bg-gradient-to-r from-copper via-copper-light to-copper bg-clip-text text-transparent">
                Ihre Massage
              </span>
            </motion.h1>
            <motion.p 
              className="text-muted-foreground text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Jede unserer Massagen lässt sich mit jedem Theme kombinieren.
              Gemeinsam finden wir die perfekte Abstimmung für Ihre Bedürfnisse.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-6 border-b border-border/50 sticky top-16 z-30 bg-background/80 backdrop-blur-md">
        <div className="container-wide">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <Filter size={18} className="text-muted-foreground mr-2" />
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? "bg-copper text-accent-foreground shadow-lg shadow-copper/20"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Massages Grid */}
      <section className="section-padding-sm relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="container-wide relative">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {filteredMassages.map((massage, index) => (
                <motion.div
                  key={massage.id}
                  id={massage.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="scroll-mt-32"
                  onMouseEnter={() => setHoveredMassage(massage.id)}
                  onMouseLeave={() => setHoveredMassage(null)}
                >
                  <GlowCard className="h-full overflow-hidden group">
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <motion.img
                        src={massage.image}
                        alt={massage.title}
                        className="w-full h-full object-cover"
                        animate={{ 
                          scale: hoveredMassage === massage.id ? 1.1 : 1 
                        }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                      
                      {/* Shimmer Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
                        animate={hoveredMassage === massage.id ? { translateX: '100%' } : {}}
                        transition={{ duration: 0.8 }}
                      />
                      
                      {massage.highlight && (
                        <motion.span 
                          className="absolute top-4 right-4 px-3 py-1 text-xs font-medium bg-copper text-accent-foreground rounded-full shadow-lg"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          {massage.highlight}
                        </motion.span>
                      )}
                      
                      {/* Icon Overlay */}
                      <motion.div 
                        className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-background/80 backdrop-blur-sm flex items-center justify-center"
                        animate={{ 
                          scale: hoveredMassage === massage.id ? 1.1 : 1,
                          rotate: hoveredMassage === massage.id ? 5 : 0
                        }}
                      >
                        <massage.icon size={24} className="text-copper" />
                      </motion.div>
                    </div>

                    <div className="p-8">
                      {/* Header */}
                      <div className="mb-6">
                        <motion.h3 
                          className="font-display text-xl text-foreground mb-1"
                          animate={{ x: hoveredMassage === massage.id ? 4 : 0 }}
                        >
                          {massage.title}
                        </motion.h3>
                        <p className="text-sm text-copper">{massage.subtitle}</p>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground mb-6 line-clamp-3">
                        {massage.description}
                      </p>

                      {/* Details */}
                      <ul className="space-y-2 mb-6">
                        {massage.details.map((detail, i) => (
                          <motion.li 
                            key={detail} 
                            className="flex items-start gap-3 text-sm"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                          >
                            <Check size={14} className="text-copper mt-1 shrink-0" />
                            <span className="text-muted-foreground">{detail}</span>
                          </motion.li>
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
                            <motion.span
                              key={theme}
                              whileHover={{ scale: 1.05 }}
                              className="px-3 py-1 text-xs bg-secondary rounded-full text-secondary-foreground cursor-default"
                            >
                              {theme}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* CTA */}
                      <Button variant="copper" className="w-full group relative overflow-hidden" asChild>
                        <Link to={`/buchung?massage=${massage.id}`}>
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            Diese Massage buchen
                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                          </span>
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-copper-light to-copper opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                        </Link>
                      </Button>
                    </div>
                  </GlowCard>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Info Section */}
      <section className="section-padding bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-copper/5 blur-[60px]"
            animate={{ y: [0, 30, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>
        
        <div className="container-narrow relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-copper/20 to-primary/20 flex items-center justify-center"
            >
              <Sparkles size={32} className="text-copper" />
            </motion.div>
            
            <h2 className="text-foreground mb-6">
              Kombinieren Sie frei
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Bei GentleHands wählen Sie Massage und Theme unabhängig
              voneinander. So entsteht ein Erlebnis, das genau zu Ihren
              aktuellen Bedürfnissen passt.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="copper" size="lg" className="group" asChild>
                <Link to="/buchung">
                  Jetzt buchen
                  <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
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