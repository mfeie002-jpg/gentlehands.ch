import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { GlowCard } from "@/components/shared/GlowCard";
import { GiftCard } from "@/components/shared/GiftCard";
import { Gift, Heart, Sparkles, Star, Users, Calendar, ArrowRight, Check } from "lucide-react";

const occasions = [
  { icon: Heart, title: "Valentinstag", description: "Schenken Sie Entspannung statt Blumen.", color: "#F43F5E" },
  { icon: Calendar, title: "Geburtstag", description: "Für die Frau, die schon alles hat.", color: "#8B5CF6" },
  { icon: Star, title: "Muttertag", description: "Das perfekte Geschenk für Mama.", color: "#F59E0B" },
  { icon: Users, title: "Freundinnen", description: "Dankeschön für die beste Freundin.", color: "#10B981" },
  { icon: Sparkles, title: "Einfach so", description: "Die schönsten sind ohne Anlass.", color: "#3B82F6" },
  { icon: Gift, title: "Für sich selbst", description: "Sie haben es verdient.", color: "#EC4899" },
];

const packages = [
  {
    name: "Entspannungsmoment",
    price: "150",
    includes: ["60-Min Stress Reset", "Theme nach Wahl", "Willkommenstee"],
    color: "from-copper/10 to-copper/5",
  },
  {
    name: "Zeit für mich",
    price: "250",
    includes: ["90-Min Deep Release", "Theme nach Wahl", "Aromatherapie", "Geschenkbox"],
    popular: true,
    color: "from-petrol to-petrol-dark",
  },
  {
    name: "Luxus-Retreat",
    price: "400",
    includes: ["120-Min Ganzkörper", "Premium Theme", "Aromatherapie", "Take-Home Öl", "Geschenkbox deluxe"],
    color: "from-copper/10 to-copper/5",
  },
];

const Geschenkideen = () => {
  return (
    <Layout>
      <Helmet>
        <title>Geschenkideen | GentleHands Zürich</title>
        <meta
          name="description"
          content="Das perfekte Geschenk für besondere Frauen. Gutscheine und Geschenkpakete für unvergessliche Entspannungsmomente."
        />
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
        {/* Floating gift particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              🎁
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
              className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-copper/20 to-copper/5 flex items-center justify-center"
            >
              <Gift size={40} className="text-copper" />
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-copper font-medium tracking-wide uppercase text-sm mb-4"
            >
              Schenken
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-foreground mb-6"
            >
              Das{" "}
              <span className="bg-gradient-to-r from-foreground via-copper to-foreground bg-clip-text text-transparent">
                perfekte Geschenk
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground text-lg"
            >
              Verschenken Sie unvergessliche Momente der Entspannung. 
              Unsere Gutscheine kommen in einer wunderschönen Geschenkbox – 
              bereit zum Überreichen.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Occasions */}
      <section className="section-padding-sm">
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-foreground mb-4">
                Für jeden Anlass
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {occasions.map((occasion, index) => (
              <ScrollReveal key={occasion.title} delay={index * 0.05}>
                <motion.div 
                  className="text-center p-5 rounded-xl bg-card border border-border hover:border-copper/30 transition-all cursor-pointer group"
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div 
                    className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-3"
                    style={{ backgroundColor: `${occasion.color}15` }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <occasion.icon size={24} style={{ color: occasion.color }} />
                  </motion.div>
                  <h3 className="font-display text-sm text-foreground mb-1 group-hover:text-copper transition-colors">
                    {occasion.title}
                  </h3>
                  <p className="text-muted-foreground text-xs">
                    {occasion.description}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gift Packages */}
      <section className="section-padding bg-secondary/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,hsl(var(--copper)/0.05),transparent_50%)]" />
        
        <div className="container-wide relative">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-foreground mb-4">
                Geschenkpakete
              </h2>
              <p className="text-muted-foreground">
                Fertig geschnürte Pakete für verschiedene Budgets.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg, index) => (
              <ScrollReveal key={pkg.name} delay={index * 0.1}>
                <GlowCard className="h-full" glowColor={pkg.popular ? "petrol" : "copper"}>
                  <motion.div 
                    className={`relative h-full p-8 ${
                      pkg.popular 
                        ? "bg-gradient-to-br from-petrol to-petrol-dark text-primary-foreground" 
                        : ""
                    }`}
                    whileHover={{ y: -5 }}
                  >
                    {pkg.popular && (
                      <motion.span 
                        className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-copper text-accent-foreground text-xs font-medium rounded-full"
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        Beliebt
                      </motion.span>
                    )}
                    <h3 className={`font-display text-2xl mb-2 ${pkg.popular ? "text-primary-foreground" : "text-foreground"}`}>
                      {pkg.name}
                    </h3>
                    <div className="flex items-baseline gap-1 mb-6">
                      <motion.span 
                        className={`font-display text-5xl ${pkg.popular ? "text-primary-foreground" : "text-foreground"}`}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ type: "spring", delay: index * 0.1 }}
                      >
                        {pkg.price}
                      </motion.span>
                      <span className={pkg.popular ? "text-primary-foreground/70" : "text-muted-foreground"}>
                        CHF
                      </span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {pkg.includes.map((item, i) => (
                        <motion.li 
                          key={item}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className={`flex items-start gap-2 text-sm ${pkg.popular ? "text-primary-foreground/90" : "text-muted-foreground"}`}
                        >
                          <Check size={16} className={`shrink-0 mt-0.5 ${pkg.popular ? "text-copper-light" : "text-copper"}`} />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        variant={pkg.popular ? "secondary" : "copper"} 
                        className="w-full"
                        asChild
                      >
                        <Link to="/gutscheine">
                          Auswählen
                          <ArrowRight size={16} className="ml-2" />
                        </Link>
                      </Button>
                    </motion.div>
                  </motion.div>
                </GlowCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Amount */}
      <section className="section-padding">
        <div className="container-narrow">
          <ScrollReveal>
            <GlowCard glowColor="copper">
              <motion.div 
                className="p-8 md:p-12 text-center"
                whileHover={{ scale: 1.01 }}
              >
                <motion.div
                  animate={{ 
                    y: [0, -5, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Gift size={48} className="mx-auto text-copper mb-6" />
                </motion.div>
                <h2 className="text-foreground mb-4">
                  Individueller Betrag
                </h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  Sie möchten einen anderen Betrag schenken? Kein Problem! 
                  Wählen Sie bei der Gutscheinbestellung einfach „Wunschbetrag" 
                  und geben Sie Ihre gewünschte Summe ein.
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="copper" size="lg" asChild>
                    <Link to="/gutscheine">
                      Gutschein gestalten
                      <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </GlowCard>
          </ScrollReveal>
        </div>
      </section>

      {/* Full Gift Card Component */}
      <section className="section-padding-sm bg-secondary/30">
        <div className="container-wide">
          <GiftCard variant="full" />
        </div>
      </section>
    </Layout>
  );
};

export default Geschenkideen;