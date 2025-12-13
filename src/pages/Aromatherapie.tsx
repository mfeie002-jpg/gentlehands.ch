import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SEOHead } from "@/components/shared/SEOHead";
import { ScentGuide } from "@/components/shared/ScentGuide";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { GlowCard } from "@/components/shared/GlowCard";
import { Droplets, Leaf, Heart, Brain, Wind, Sparkles, Flower2, Sun, Moon, TreePine, ArrowRight, Check } from "lucide-react";

const benefits = [
  {
    icon: Brain,
    title: "Stressreduktion",
    description: "Düfte wie Lavendel und Bergamotte aktivieren das parasympathische Nervensystem und fördern tiefe Entspannung.",
    color: "from-purple-500/20 to-indigo-500/20",
  },
  {
    icon: Heart,
    title: "Emotionale Balance",
    description: "Bestimmte Aromen können emotionale Blockaden lösen und das Wohlbefinden steigern.",
    color: "from-rose-500/20 to-pink-500/20",
  },
  {
    icon: Wind,
    title: "Atemvertiefung",
    description: "Eukalyptus und Minze öffnen die Atemwege und fördern bewusstes, tiefes Atmen.",
    color: "from-cyan-500/20 to-teal-500/20",
  },
  {
    icon: Leaf,
    title: "Natürliche Wirkung",
    description: "Wir verwenden ausschliesslich 100% reine, therapeutische ätherische Öle höchster Qualität.",
    color: "from-emerald-500/20 to-green-500/20",
  },
];

const scents = [
  { id: "lavendel", name: "Lavendel", icon: Flower2, effect: "Beruhigend", color: "#9B7EC8", description: "Fördert tiefen Schlaf und innere Ruhe" },
  { id: "orange", name: "Orange", icon: Sun, effect: "Aufhellend", color: "#F5A623", description: "Hebt die Stimmung und bringt Wärme" },
  { id: "eukalyptus", name: "Eukalyptus", icon: TreePine, effect: "Befreiend", color: "#4A9F4A", description: "Öffnet die Atemwege und klärt den Geist" },
  { id: "ylang", name: "Ylang-Ylang", icon: Flower2, effect: "Sinnlich", color: "#E8B4D8", description: "Wirkt harmonisierend und entspannend" },
  { id: "zedernholz", name: "Zedernholz", icon: TreePine, effect: "Erdend", color: "#8B5A2B", description: "Schenkt Stabilität und innere Stärke" },
  { id: "rose", name: "Rose", icon: Flower2, effect: "Herzöffnend", color: "#E8A4B8", description: "Fördert Selbstliebe und emotionale Heilung" },
];

const steps = [
  {
    step: "01",
    title: "Duftwahl vor der Session",
    description: "Beim Buchungsprozess oder vor Ort wählen Sie Ihren Wunschduft – oder lassen sich überraschen.",
    icon: Sparkles,
  },
  {
    step: "02",
    title: "Raumbeduftung",
    description: "Der Raum wird sanft mit Ihrem gewählten Duft beduftet, noch bevor Sie eintreten.",
    icon: Wind,
  },
  {
    step: "03",
    title: "Massageöl",
    description: "Auf Wunsch mischen wir Ihr Massageöl mit den entsprechenden ätherischen Ölen.",
    icon: Droplets,
  },
  {
    step: "04",
    title: "Take-Home",
    description: "Optional: Nehmen Sie eine kleine Duftprobe mit nach Hause, um das Gefühl zu verlängern.",
    icon: Heart,
  },
];

const Aromatherapie = () => {
  const [selectedScent, setSelectedScent] = useState<string | null>(null);
  const [hoveredScent, setHoveredScent] = useState<string | null>(null);

  return (
    <Layout>
      <SEOHead 
        title="Aromatherapie – Düfte für Ihre Massage | GentleHands Zürich"
        description="Verstärken Sie Ihre Tiefenentspannung mit therapeutischen Düften. Lavendel, Rose, Zedernholz und mehr – passend zu Ihrem Themenraum."
        canonical="https://gentlehands.ch/aromatherapie"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Aromatherapie",
          "provider": {
            "@type": "HealthAndBeautyBusiness",
            "name": "GentleHands",
            "address": { "@type": "PostalAddress", "addressLocality": "Zürich", "addressCountry": "CH" }
          },
          "description": "Aromatherapie-Behandlung mit 100% reinen ätherischen Ölen zur Verstärkung der Massage-Wirkung"
        }}
      />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                background: `radial-gradient(circle, ${scents[i % scents.length]?.color}40, transparent)`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -200],
                opacity: [0, 0.6, 0],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
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
              <Droplets size={40} className="text-copper" />
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-copper font-medium tracking-wide uppercase text-sm mb-4"
            >
              Die Kraft der Düfte
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-foreground mb-6"
            >
              <span className="bg-gradient-to-r from-foreground via-copper to-foreground bg-clip-text text-transparent">
                Aromatherapie
              </span>{" "}
              bei GentleHands
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground text-lg"
            >
              Düfte haben eine direkte Verbindung zu unserem emotionalen Zentrum.
              Mit sorgfältig ausgewählten ätherischen Ölen verstärken wir Ihr
              Massage-Erlebnis auf einer tieferen Ebene.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding-sm relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--copper)/0.03),transparent_50%)]" />
        <div className="container-wide relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <ScrollReveal key={benefit.title} delay={index * 0.1}>
                <GlowCard className="h-full" glowColor="copper">
                  <motion.div 
                    className="h-full p-6"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div 
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-4`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
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

      {/* Interactive Scent Selector */}
      <section className="section-padding bg-gradient-to-br from-secondary/50 via-background to-secondary/30 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-copper/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-petrol/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container-wide relative">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-copper font-medium tracking-wide uppercase text-sm mb-4">
                Interaktive Duftauswahl
              </p>
              <h2 className="text-foreground mb-6">
                Entdecken Sie Ihren Duft
              </h2>
              <p className="text-muted-foreground">
                Erkunden Sie unsere Duftpalette und finden Sie den perfekten Begleiter für Ihre Session.
              </p>
            </div>
          </ScrollReveal>

          {/* Scent Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {scents.map((scent, index) => (
              <motion.div
                key={scent.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedScent(selectedScent === scent.id ? null : scent.id)}
                onMouseEnter={() => setHoveredScent(scent.id)}
                onMouseLeave={() => setHoveredScent(null)}
                className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                  selectedScent === scent.id 
                    ? "bg-card ring-2 ring-copper shadow-lg shadow-copper/20" 
                    : "bg-card/50 hover:bg-card border border-border/50"
                }`}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0"
                  style={{ background: `radial-gradient(circle at center, ${scent.color}30, transparent 70%)` }}
                  animate={{ opacity: hoveredScent === scent.id || selectedScent === scent.id ? 1 : 0 }}
                />
                
                <div className="relative text-center">
                  <motion.div
                    className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-3"
                    style={{ background: `${scent.color}20` }}
                    animate={{ 
                      scale: hoveredScent === scent.id ? 1.1 : 1,
                      rotate: hoveredScent === scent.id ? [0, 5, -5, 0] : 0
                    }}
                  >
                    <scent.icon size={24} style={{ color: scent.color }} />
                  </motion.div>
                  <h4 className="font-display text-sm text-foreground mb-1">{scent.name}</h4>
                  <span className="text-xs text-copper">{scent.effect}</span>
                  
                  {selectedScent === scent.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-copper rounded-full flex items-center justify-center"
                    >
                      <Check size={14} className="text-accent-foreground" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Selected Scent Details */}
          <AnimatePresence mode="wait">
            {selectedScent && (
              <motion.div
                key={selectedScent}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-2xl mx-auto"
              >
                {scents.filter(s => s.id === selectedScent).map(scent => (
                  <div 
                    key={scent.id}
                    className="p-6 rounded-2xl bg-card border border-copper/30 text-center"
                  >
                    <motion.div
                      className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4"
                      style={{ background: `${scent.color}20` }}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <scent.icon size={32} style={{ color: scent.color }} />
                    </motion.div>
                    <h3 className="font-display text-2xl text-foreground mb-2">{scent.name}</h3>
                    <p className="text-copper font-medium mb-3">{scent.effect}</p>
                    <p className="text-muted-foreground mb-6">{scent.description}</p>
                    <Button variant="copper" asChild>
                      <Link to="/buchung">
                        Mit {scent.name} buchen
                        <ArrowRight size={16} className="ml-2" />
                      </Link>
                    </Button>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Full Scent Guide */}
      <section className="section-padding">
        <div className="container-wide">
          <ScentGuide />
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding bg-secondary/30 relative overflow-hidden">
        <div className="absolute inset-0">
          <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100">
            <pattern id="aroma-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="currentColor" className="text-copper" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#aroma-pattern)" />
          </svg>
        </div>
        
        <div className="container-narrow relative">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-foreground mb-6">
                So integrieren wir Aromatherapie
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-6">
            {steps.map((item, index) => (
              <ScrollReveal key={item.step} delay={index * 0.15}>
                <motion.div 
                  className="flex gap-6 p-6 rounded-2xl bg-card border border-border hover:border-copper/30 transition-all group"
                  whileHover={{ x: 10, boxShadow: "0 10px 40px -10px hsl(var(--copper) / 0.2)" }}
                >
                  <motion.div 
                    className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-copper/20 to-copper/5 flex items-center justify-center relative"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <item.icon size={24} className="text-copper" />
                    <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-copper text-accent-foreground text-xs font-bold flex items-center justify-center">
                      {item.step}
                    </span>
                  </motion.div>
                  <div>
                    <h3 className="font-display text-xl text-foreground mb-2 group-hover:text-copper transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-petrol to-petrol-dark relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-copper-light/20"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        <div className="container-narrow text-center relative">
          <ScrollReveal>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Droplets size={48} className="mx-auto text-copper-light mb-6" />
            </motion.div>
            <h2 className="text-primary-foreground mb-6">
              Aromatherapie als Gratis-Upgrade
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Aromatherapie ist bei allen unseren Massagen als Gratis-Upgrade
              verfügbar. Wählen Sie einfach bei der Buchung Ihren Wunschduft.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="secondary" size="lg" asChild>
                <Link to="/buchung">
                  Jetzt buchen mit Aromatherapie
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Aromatherapie;