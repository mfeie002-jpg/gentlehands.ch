import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ComparisonTable } from "@/components/shared/ComparisonTable";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { GlowCard } from "@/components/shared/GlowCard";
import { TrustBadges } from "@/components/shared/TrustBadges";
import { Crown, Target, Shield, Heart, ArrowRight, X, Check, Sparkles } from "lucide-react";

const differences = [
  {
    icon: Crown,
    title: "Exklusiv für Frauen",
    description: "Bei uns gibt es keine gemischten Wartebereiche, keine zufälligen Begegnungen. Ein komplett geschützter Raum.",
    color: "from-amber-500/20 to-orange-500/20",
  },
  {
    icon: Target,
    title: "Masseur:in-Wahl",
    description: "Sie wählen, wer Sie massiert – basierend auf Stil, Erfahrung und persönlicher Präferenz.",
    color: "from-purple-500/20 to-indigo-500/20",
  },
  {
    icon: Shield,
    title: "Trauma-sensitiv",
    description: "Alle unsere Teammitglieder sind in trauma-sensibler Körperarbeit geschult.",
    color: "from-cyan-500/20 to-blue-500/20",
  },
  {
    icon: Heart,
    title: "Atmosphäre nach Wahl",
    description: "Sechs verschiedene Themes von Ozean bis Deep Dark – Sie bestimmen die Stimmung.",
    color: "from-rose-500/20 to-pink-500/20",
  },
];

const notUs = [
  {
    title: "Kein Erotikstudio",
    description: "GentleHands bietet keine sexuellen Dienstleistungen. Unser Fokus liegt auf professioneller Körperarbeit, Entspannung und Wohlbefinden. Jede Anfrage in diese Richtung führt zum sofortigen Ausschluss.",
  },
  {
    title: "Keine Massenabfertigung",
    description: "Wir nehmen nur eine begrenzte Anzahl an Terminen pro Tag an. Keine überfüllten Wartebereiche, keine Hektik, keine durchgetakteten 30-Minuten-Slots.",
  },
  {
    title: "Kein Wellness-Hotel",
    description: "Bei uns gibt es keine Sauna, keinen Pool, kein Restaurant. Wir sind spezialisiert auf eines: die bestmögliche Massage-Erfahrung in einer perfekt gestalteten Atmosphäre.",
  },
  {
    title: "Keine Therapiepraxis",
    description: "Wir sind keine Physiotherapie und ersetzen keine medizinische Behandlung. Bei gesundheitlichen Beschwerden empfehlen wir immer zuerst den Arztbesuch.",
  },
];

const Vergleich = () => {
  return (
    <Layout>
      <Helmet>
        <title>GentleHands vs. Traditionelle Massage | Der Unterschied</title>
        <meta
          name="description"
          content="Was unterscheidet GentleHands von traditionellen Massage-Studios und Hotel-Spas? Entdecken Sie unseren einzigartigen Ansatz."
        />
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {/* Animated comparison lines */}
          <svg className="w-full h-full opacity-10">
            <motion.line
              x1="0"
              y1="50%"
              x2="100%"
              y2="50%"
              stroke="hsl(var(--copper))"
              strokeWidth="2"
              strokeDasharray="10 5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </svg>
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
              <Sparkles size={40} className="text-copper" />
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-copper font-medium tracking-wide uppercase text-sm mb-4"
            >
              Der Unterschied
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-foreground mb-6"
            >
              Warum{" "}
              <span className="bg-gradient-to-r from-foreground via-copper to-foreground bg-clip-text text-transparent">
                GentleHands
              </span>{" "}
              anders ist
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground text-lg"
            >
              GentleHands ist kein klassisches Massage-Studio und auch kein Hotel-Spa.
              Wir sind ein exklusiver Raum für Frauen, die mehr wollen als nur eine Massage.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Key Differences */}
      <section className="section-padding-sm">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {differences.map((diff, index) => (
              <ScrollReveal key={diff.title} delay={index * 0.1}>
                <GlowCard className="h-full" glowColor="copper">
                  <motion.div 
                    className="h-full p-6"
                    whileHover={{ y: -5 }}
                  >
                    <motion.div 
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${diff.color} flex items-center justify-center mb-4`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <diff.icon size={24} className="text-copper" />
                    </motion.div>
                    <h3 className="font-display text-lg text-foreground mb-2">
                      {diff.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {diff.description}
                    </p>
                  </motion.div>
                </GlowCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-padding bg-secondary/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--copper)/0.03),transparent_50%)]" />
        
        <div className="container-wide relative">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-foreground mb-6">
                Der direkte Vergleich
              </h2>
              <p className="text-muted-foreground">
                Sehen Sie selbst, wie sich GentleHands von anderen Angeboten unterscheidet.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <GlowCard glowColor="copper">
              <div className="p-6 md:p-8">
                <ComparisonTable />
              </div>
            </GlowCard>
          </ScrollReveal>
        </div>
      </section>

      {/* What We're Not */}
      <section className="section-padding relative">
        <div className="absolute inset-0">
          <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100">
            <pattern id="compare-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="currentColor" className="text-copper" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#compare-dots)" />
          </svg>
        </div>
        
        <div className="container-narrow relative">
          <ScrollReveal>
            <div className="text-center mb-12">
              <X size={32} className="mx-auto text-destructive mb-4" />
              <h2 className="text-foreground mb-6">
                Was wir NICHT sind
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {notUs.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 0.1}>
                <motion.div 
                  className="p-6 rounded-2xl bg-destructive/5 border border-destructive/20 hover:border-destructive/40 transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start gap-3">
                    <motion.div
                      className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center shrink-0"
                      whileHover={{ rotate: 90 }}
                    >
                      <X size={16} className="text-destructive" />
                    </motion.div>
                    <div>
                      <h3 className="font-display text-lg text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="section-padding-sm bg-secondary/30">
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center mb-12">
              <Check size={32} className="mx-auto text-copper mb-4" />
              <h2 className="text-foreground mb-6">
                Wofür wir stehen
              </h2>
            </div>
          </ScrollReveal>

          <TrustBadges />
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-narrow text-center">
          <ScrollReveal>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Crown size={48} className="mx-auto text-copper mb-6" />
            </motion.div>
            <h2 className="text-foreground mb-6">
              Bereit für etwas anderes?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Erleben Sie selbst den Unterschied. Buchen Sie Ihr erstes 
              GentleHands-Erlebnis und entdecken Sie, wie Massage sein kann.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="copper" size="lg" asChild>
                  <Link to="/buchung">
                    Erlebnis buchen
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="petrol-outline" size="lg" asChild>
                  <Link to="/erlebnisse">Erlebnisse entdecken</Link>
                </Button>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Vergleich;