import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SEOHead } from "@/components/shared/SEOHead";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { GlowCard } from "@/components/shared/GlowCard";
import { Heart, Users, Gift, Sparkles, Building2, Handshake, ArrowRight, ExternalLink, Star } from "lucide-react";

const partners = [
  {
    name: "Premium Yoga Studio",
    category: "Yoga & Meditation",
    description: "Hochwertige Yoga-Kurse und Meditation in Zürich.",
    benefit: "10% Rabatt für GentleHands-Kundinnen",
    rating: 4.9,
    color: "from-purple-500/20 to-indigo-500/20",
  },
  {
    name: "Bio Beauty Spa",
    category: "Naturkosmetik",
    description: "Biologische Hautpflege und natürliche Beauty-Treatments.",
    benefit: "Gratis Hautanalyse",
    rating: 4.8,
    color: "from-rose-500/20 to-pink-500/20",
  },
  {
    name: "Mindful Living",
    category: "Coaching",
    description: "Life Coaching und Stressmanagement für Frauen.",
    benefit: "Kostenloses Erstgespräch",
    rating: 5.0,
    color: "from-emerald-500/20 to-teal-500/20",
  },
  {
    name: "Organic Tea House",
    category: "Tee & Wellness",
    description: "Feinste Bio-Tees und Wellness-Produkte.",
    benefit: "10% auf alle Produkte",
    rating: 4.7,
    color: "from-amber-500/20 to-orange-500/20",
  },
];

const partnershipTypes = [
  {
    icon: Gift,
    title: "Empfehlungspartner",
    description: "Sie empfehlen GentleHands Ihren Kundinnen und erhalten eine Provision.",
    color: "from-copper/20 to-copper/5",
  },
  {
    icon: Users,
    title: "Cross-Promotion",
    description: "Gemeinsame Marketing-Aktionen und gegenseitige Empfehlungen.",
    color: "from-petrol/20 to-petrol/5",
  },
  {
    icon: Sparkles,
    title: "Paket-Angebote",
    description: "Kombinierte Angebote für unsere gemeinsamen Zielgruppen.",
    color: "from-purple-500/20 to-purple-500/5",
  },
  {
    icon: Building2,
    title: "Corporate Partnership",
    description: "Exklusive Angebote für Mitarbeitende Ihres Unternehmens.",
    color: "from-emerald-500/20 to-emerald-500/5",
  },
];

const Partner = () => {
  return (
    <Layout>
      <SEOHead
        title="Partner & Empfehlungen | GentleHands Zürich"
        description="Entdecken Sie unsere Partner und deren exklusive Vorteile für GentleHands-Kundinnen. Werden Sie selbst Partner."
        canonical="/partner"
      />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
        {/* Connection lines animation */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="w-full h-full opacity-10">
            {[...Array(5)].map((_, i) => (
              <motion.line
                key={i}
                x1={`${20 + i * 15}%`}
                y1="20%"
                x2={`${30 + i * 10}%`}
                y2="80%"
                stroke="hsl(var(--copper))"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 2, delay: i * 0.2, repeat: Infinity, repeatType: "reverse" }}
              />
            ))}
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
              <Handshake size={40} className="text-copper" />
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-copper font-medium tracking-wide uppercase text-sm mb-4"
            >
              Gemeinsam mehr erreichen
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-foreground mb-6"
            >
              Unsere{" "}
              <span className="bg-gradient-to-r from-foreground via-copper to-foreground bg-clip-text text-transparent">
                Partner
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground text-lg"
            >
              Wir arbeiten mit ausgewählten Partnern zusammen, die unsere Werte teilen
              und Ihr Wohlbefinden ganzheitlich unterstützen.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Partners */}
      <section className="section-padding-sm">
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-foreground mb-4">
                Exklusive Vorteile
              </h2>
              <p className="text-muted-foreground">
                Als GentleHands-Kundin profitieren Sie bei unseren Partnern.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {partners.map((partner, index) => (
              <ScrollReveal key={partner.name} delay={index * 0.1}>
                <GlowCard className="h-full" glowColor="copper">
                  <motion.div 
                    className="h-full p-6"
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <motion.span 
                          className={`inline-block text-xs text-copper font-medium uppercase tracking-wider px-2 py-1 rounded-full bg-gradient-to-r ${partner.color}`}
                          whileHover={{ scale: 1.05 }}
                        >
                          {partner.category}
                        </motion.span>
                        <h3 className="font-display text-xl text-foreground mt-2">
                          {partner.name}
                        </h3>
                      </div>
                      <motion.div 
                        className="flex items-center gap-1 px-2 py-1 bg-amber-500/10 rounded-full"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Star size={14} className="text-amber-500 fill-amber-500" />
                        <span className="text-sm font-medium text-amber-600">{partner.rating}</span>
                      </motion.div>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">
                      {partner.description}
                    </p>
                    <motion.div 
                      className="inline-flex items-center gap-2 px-4 py-2 bg-copper/10 rounded-xl"
                      whileHover={{ scale: 1.02, x: 5 }}
                    >
                      <Gift size={16} className="text-copper" />
                      <span className="text-sm font-medium text-copper">
                        {partner.benefit}
                      </span>
                    </motion.div>
                  </motion.div>
                </GlowCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Partner */}
      <section className="section-padding bg-secondary/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,hsl(var(--copper)/0.05),transparent_50%)]" />
        
        <div className="container-wide relative">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Handshake size={48} className="mx-auto text-copper mb-6" />
              </motion.div>
              <h2 className="text-foreground mb-6">
                Partner werden
              </h2>
              <p className="text-muted-foreground">
                Sie haben ein Unternehmen oder eine Praxis, die zu unserer Philosophie passt?
                Lassen Sie uns gemeinsam Mehrwert für unsere Kundinnen schaffen.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {partnershipTypes.map((type, index) => (
              <ScrollReveal key={type.title} delay={index * 0.1}>
                <GlowCard className="h-full" glowColor="copper">
                  <motion.div 
                    className="h-full p-6 text-center"
                    whileHover={{ y: -5 }}
                  >
                    <motion.div 
                      className={`w-16 h-16 mx-auto rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center mb-4`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <type.icon size={28} className="text-copper" />
                    </motion.div>
                    <h3 className="font-display text-lg text-foreground mb-2">
                      {type.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {type.description}
                    </p>
                  </motion.div>
                </GlowCard>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="copper" size="lg" asChild>
                  <Link to="/kontakt">
                    Partnerschaft anfragen
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Affiliate */}
      <section className="section-padding">
        <div className="container-narrow">
          <ScrollReveal>
            <GlowCard glowColor="copper">
              <motion.div 
                className="p-8 md:p-12 text-center"
                whileHover={{ scale: 1.01 }}
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Heart size={48} className="mx-auto text-copper mb-6" />
                </motion.div>
                <h2 className="text-foreground mb-6">
                  Empfehlungsprogramm
                </h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  Empfehlen Sie GentleHands an Freundinnen, Kolleginnen oder Kundinnen
                  und erhalten Sie eine Gutschrift für jede erfolgreiche Buchung.
                  Es lohnt sich für beide Seiten!
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="copper" size="lg" asChild>
                    <Link to="/kontakt">
                      Mehr erfahren
                      <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </GlowCard>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Partner;