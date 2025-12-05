import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { GlowCard } from "@/components/shared/GlowCard";
import { Leaf, Droplets, Recycle, Heart, Sun, TreePine, ArrowRight, Target } from "lucide-react";
import { NumberCounter } from "@/components/shared/NumberCounter";

const initiatives = [
  {
    icon: Leaf,
    title: "Bio-Produkte",
    description: "Wir verwenden ausschliesslich zertifizierte Bio-Öle und natürliche Produkte ohne synthetische Zusätze.",
    color: "from-emerald-500/20 to-green-500/20",
    iconColor: "#10B981",
  },
  {
    icon: Droplets,
    title: "Wassersparen",
    description: "Effiziente Wassersysteme und bewusster Umgang mit dieser kostbaren Ressource.",
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "#3B82F6",
  },
  {
    icon: Recycle,
    title: "Zero Waste",
    description: "Wiederverwendbare Materialien, Recycling und Vermeidung von Einwegprodukten.",
    color: "from-amber-500/20 to-yellow-500/20",
    iconColor: "#F59E0B",
  },
  {
    icon: Sun,
    title: "Erneuerbare Energie",
    description: "100% Ökostrom und energieeffiziente Beleuchtung in allen Räumen.",
    color: "from-orange-500/20 to-red-500/20",
    iconColor: "#F97316",
  },
  {
    icon: TreePine,
    title: "Kompensation",
    description: "Wir kompensieren unseren CO2-Fussabdruck durch Aufforstungsprojekte.",
    color: "from-green-500/20 to-emerald-500/20",
    iconColor: "#22C55E",
  },
  {
    icon: Heart,
    title: "Lokale Partner",
    description: "Zusammenarbeit mit lokalen Lieferanten und Schweizer Produzenten.",
    color: "from-rose-500/20 to-pink-500/20",
    iconColor: "#F43F5E",
  },
];

const goals = [
  { target: 100, suffix: "%", description: "Plastikfreie Verpackungen", progress: 75 },
  { target: 50, suffix: "%", description: "Reduzierung Wasserverbrauch", progress: 40 },
  { target: "CO2", suffix: "-neutral", description: "Vollständige Klimaneutralität", progress: 85 },
  { target: 10000, prefix: "CHF ", description: "Jährliche Spende an Frauenprojekte", progress: 100 },
];

const Nachhaltigkeit = () => {
  return (
    <Layout>
      <Helmet>
        <title>Nachhaltigkeit | GentleHands Zürich</title>
        <meta
          name="description"
          content="Unser Engagement für Nachhaltigkeit. Erfahren Sie, wie GentleHands Verantwortung für Umwelt und Gesellschaft übernimmt."
        />
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-forest/10 to-background relative overflow-hidden">
        {/* Floating leaves */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, 30, 0],
                rotate: [0, 20, -20, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            >
              🍃
            </motion.div>
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
              className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-forest/20 to-forest/5 flex items-center justify-center"
            >
              <Leaf size={40} className="text-forest" />
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-forest font-medium tracking-wide uppercase text-sm mb-4"
            >
              Verantwortung
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-foreground mb-6"
            >
              <span className="bg-gradient-to-r from-foreground via-forest to-foreground bg-clip-text text-transparent">
                Nachhaltigkeit
              </span>{" "}
              bei GentleHands
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground text-lg"
            >
              Wir glauben, dass echtes Wohlbefinden nur in Harmonie mit unserer 
              Umwelt entstehen kann. Deshalb setzen wir auf nachhaltige Praktiken.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Initiatives */}
      <section className="section-padding-sm">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {initiatives.map((initiative, index) => (
              <ScrollReveal key={initiative.title} delay={index * 0.1}>
                <GlowCard className="h-full" glowColor="forest">
                  <motion.div 
                    className="h-full p-6"
                    whileHover={{ y: -5 }}
                  >
                    <motion.div 
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${initiative.color} flex items-center justify-center mb-4`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <initiative.icon size={28} style={{ color: initiative.iconColor }} />
                    </motion.div>
                    <h3 className="font-display text-xl text-foreground mb-3">
                      {initiative.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {initiative.description}
                    </p>
                  </motion.div>
                </GlowCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding bg-secondary/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,hsl(var(--forest)/0.05),transparent_50%)]" />
        
        <div className="container-narrow relative">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-foreground mb-6">
                Unsere Philosophie
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-6">
            {[
              {
                title: "Qualität vor Quantität",
                content: "Wir bevorzugen hochwertige, langlebige Produkte gegenüber billigen Einweg-Alternativen. Unsere Massagetücher sind aus Bio-Baumwolle, unsere Öle aus kontrolliertem Anbau. Das kostet mehr, ist aber für uns, unsere Kundinnen und die Umwelt besser.",
                icon: "✨",
              },
              {
                title: "Transparenz",
                content: "Wir kommunizieren offen über unsere Praktiken – auch dort, wo wir noch Verbesserungspotential sehen. Nachhaltigkeit ist für uns eine Reise, kein Ziel.",
                icon: "🔍",
              },
              {
                title: "Soziale Verantwortung",
                content: "Nachhaltigkeit bedeutet für uns auch faire Arbeitsbedingungen, respektvoller Umgang und Unterstützung lokaler Gemeinschaften. Ein Teil unseres Gewinns fliesst in soziale Projekte für Frauen.",
                icon: "💚",
              },
            ].map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 0.1}>
                <GlowCard glowColor="forest">
                  <motion.div 
                    className="p-8"
                    whileHover={{ x: 10 }}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">{item.icon}</span>
                      <div>
                        <h3 className="font-display text-xl text-foreground mb-4">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </GlowCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Goals */}
      <section className="section-padding relative">
        <div className="absolute inset-0">
          <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100">
            <pattern id="eco-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="currentColor" className="text-forest" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#eco-dots)" />
          </svg>
        </div>
        
        <div className="container-narrow relative">
          <ScrollReveal>
            <div className="text-center mb-12">
              <Target size={32} className="mx-auto text-forest mb-4" />
              <h2 className="text-foreground mb-4">
                Unsere Ziele bis 2026
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {goals.map((goal, index) => (
              <ScrollReveal key={goal.description} delay={index * 0.1}>
                <GlowCard glowColor="forest">
                  <motion.div 
                    className="p-6 text-center"
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="font-display text-4xl text-forest mb-2">
                      {typeof goal.target === 'number' ? (
                        <>
                          {goal.prefix}
                          <NumberCounter value={goal.target} suffix={goal.suffix} className="text-forest" />
                        </>
                      ) : (
                        <span>{goal.target}{goal.suffix}</span>
                      )}
                    </p>
                    <p className="text-muted-foreground mb-4">
                      {goal.description}
                    </p>
                    {/* Progress bar */}
                    <div className="w-full h-2 bg-forest/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-forest to-forest-light rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${goal.progress}%` }}
                        transition={{ duration: 1.5, delay: index * 0.2 }}
                      />
                    </div>
                    <p className="text-xs text-forest mt-2">{goal.progress}% erreicht</p>
                  </motion.div>
                </GlowCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding-sm bg-gradient-to-br from-forest to-forest-light relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary-foreground/10"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
            />
          ))}
        </div>
        
        <div className="container-narrow text-center relative">
          <ScrollReveal>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Leaf size={48} className="mx-auto text-primary-foreground/80 mb-6" />
            </motion.div>
            <h2 className="text-primary-foreground mb-6">
              Gemeinsam für eine bessere Zukunft
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Haben Sie Ideen oder Feedback zu unserem Nachhaltigkeitsengagement?
              Wir freuen uns über Ihre Nachricht.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="secondary" size="lg" asChild>
                <Link to="/kontakt">
                  Kontakt aufnehmen
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

export default Nachhaltigkeit;