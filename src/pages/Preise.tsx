import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Check, Star, Clock, Info, Gift, Percent, Sparkles, ArrowRight, Zap } from "lucide-react";
import { GlowCard } from "@/components/shared/GlowCard";
import { FloatingElements } from "@/components/shared/FloatingElements";
import { PriceTierCard } from "@/components/pricing/PriceTierCard";
import { PriceComparisonRow } from "@/components/pricing/PriceComparisonRow";
const pricingTiers = [
  {
    duration: "60 Min",
    price: 180,
    pricePerMin: 3,
    description: "Der kompakte Einstieg",
    features: [
      "Fokussierte Massage",
      "Alle Themes wählbar",
      "Willkommenstee",
    ],
    recommended: false,
    gradient: "from-secondary to-secondary/50",
    glowColor: "24 55% 52%",
  },
  {
    duration: "90 Min",
    price: 260,
    pricePerMin: 2.89,
    description: "Unser Klassiker",
    features: [
      "Ausführliche Ganzkörpermassage",
      "Alle Themes wählbar",
      "Aromatherapie inklusive",
      "Getränkeauswahl",
      "Entspannte Atmosphäre",
    ],
    recommended: true,
    gradient: "from-copper/20 to-copper/5",
    glowColor: "24 55% 52%",
  },
  {
    duration: "120 Min",
    price: 340,
    pricePerMin: 2.83,
    description: "Das Premium-Erlebnis",
    features: [
      "Tiefgreifende Ganzkörpermassage",
      "Premium Themes verfügbar",
      "Champagner oder Premium-Tee",
      "Aftercare-Set zum Mitnehmen",
      "Persönliche Nachbetreuung",
    ],
    recommended: false,
    gradient: "from-primary/10 to-primary/5",
    glowColor: "155 35% 35%",
  },
];

const addOns = [
  { name: "Aromatherapie-Upgrade", price: 25, description: "Premium-Düfte nach Wahl", icon: "🌿" },
  { name: "Hot Stone Elemente", price: 40, description: "Warme Basaltsteine zur Vertiefung", icon: "🪨" },
  { name: "Kopf- & Gesichtsmassage", price: 35, description: "Zusätzliche 15 Min Fokus", icon: "✨" },
  { name: "Champagner-Service", price: 45, description: "Glas Champagner vor/nach der Session", icon: "🥂" },
  { name: "Aftercare-Set", price: 30, description: "Produkte für zu Hause", icon: "🎁" },
];

const packages = [
  { name: "3er-Paket", savings: 10, description: "3 Sessions Ihrer Wahl", sessions: 3, color: "petrol" },
  { name: "5er-Paket", savings: 15, description: "5 Sessions Ihrer Wahl", sessions: 5, color: "copper" },
  { name: "10er-Paket", savings: 20, description: "10 Sessions Ihrer Wahl", sessions: 10, color: "forest" },
];

const Preise = () => {
  const [hoveredTier, setHoveredTier] = useState<number | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);

  return (
    <Layout>
      <Helmet>
        <title>Preise – Professionelle Entspannungsmassagen | GentleHands Zürich</title>
        <meta name="description" content="Transparente Preise für professionelle Entspannungsmassagen bei GentleHands. 60, 90 oder 120 Minuten – finden Sie Ihr perfektes Erlebnis." />
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute top-1/4 -right-32 w-96 h-96 bg-copper/10 rounded-full blur-[120px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, delay: 4 }}
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-copper/10 border border-copper/20 mb-6"
            >
              <Sparkles size={16} className="text-copper" />
              <span className="text-copper text-sm font-medium">Transparente Preise</span>
            </motion.div>
            
            <motion.h1 
              className="text-foreground mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Investieren Sie in Ihr <span className="text-gradient-copper">Wohlbefinden</span>
            </motion.h1>
            <motion.p 
              className="text-muted-foreground text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Transparente Preise ohne versteckte Kosten. Jede Session beinhaltet die volle GentleHands-Erfahrung.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Comparison Cards */}
      <section className="section-padding-sm -mt-8">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.duration}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                onMouseEnter={() => setHoveredTier(index)}
                onMouseLeave={() => setHoveredTier(null)}
                className="relative"
              >
                <motion.div 
                  className={`h-full rounded-3xl p-8 transition-all duration-500 ${
                    tier.recommended 
                      ? "bg-gradient-to-b from-copper/10 to-background ring-2 ring-copper" 
                      : "card-elevated"
                  }`}
                  animate={{
                    y: hoveredTier === index ? -12 : 0,
                    boxShadow: hoveredTier === index 
                      ? `0 25px 50px -12px hsl(${tier.glowColor} / 0.25)` 
                      : '0 4px 20px rgba(0,0,0,0.1)'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Animated glow */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0 pointer-events-none"
                    animate={{ opacity: hoveredTier === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      background: `radial-gradient(circle at 50% 0%, hsl(${tier.glowColor} / 0.15), transparent 70%)`
                    }}
                  />
                  
                  {tier.recommended && (
                    <motion.div 
                      className="absolute -top-4 left-1/2 -translate-x-1/2"
                      initial={{ opacity: 0, y: -10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-copper text-accent-foreground text-sm font-medium rounded-full shadow-lg shadow-copper/30">
                        <Star size={14} fill="currentColor" />
                        Empfohlen
                      </span>
                    </motion.div>
                  )}

                  <div className="text-center mb-8 relative">
                    <motion.div 
                      className="flex items-center justify-center gap-2 text-primary mb-3"
                      animate={{ scale: hoveredTier === index ? 1.05 : 1 }}
                    >
                      <Clock size={20} />
                      <span className="font-medium text-lg">{tier.duration}</span>
                    </motion.div>
                    
                    <div className="flex items-baseline justify-center gap-1 mb-2">
                      <span className="text-muted-foreground text-base sm:text-lg">CHF</span>
                      <motion.span 
                        className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground"
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
                      >
                        {tier.price}
                      </motion.span>
                    </div>
                    
                    {/* Price per minute indicator */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredTier === index ? 1 : 0 }}
                      className="text-xs text-copper font-medium"
                    >
                      CHF {tier.pricePerMin.toFixed(2)}/Min
                    </motion.div>
                    
                    <p className="text-muted-foreground mt-2">{tier.description}</p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature, i) => (
                      <motion.li 
                        key={feature} 
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + (i * 0.1) }}
                      >
                        <motion.div 
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${tier.recommended ? 'bg-copper' : 'bg-primary/20'}`}
                          whileHover={{ scale: 1.2 }}
                        >
                          <Check size={12} className={tier.recommended ? 'text-accent-foreground' : 'text-primary'} />
                        </motion.div>
                        <span className="text-muted-foreground">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant={tier.recommended ? "copper" : "petrol-outline"}
                      className="w-full group"
                      size="lg"
                      asChild
                    >
                      <Link to="/buchung">
                        Jetzt buchen
                        <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
          
          {/* Savings indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forest/10 text-forest text-sm">
              <Zap size={16} />
              <span>Je länger die Session, desto mehr sparen Sie pro Minute</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="section-padding bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5Nzk3OTciIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        </div>
        
        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 mb-4">
              <Gift size={16} className="text-primary" />
              <span className="text-primary text-sm font-medium">Extras</span>
            </div>
            <h2 className="text-foreground mb-4">Zusatzleistungen</h2>
            <p className="text-muted-foreground">Ergänzen Sie Ihr Erlebnis mit besonderen Extras.</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {addOns.map((addon, index) => (
              <motion.div
                key={addon.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <GlowCard 
                  className="p-3 sm:p-5 text-center h-full cursor-pointer"
                  glowColor="24 55% 52%"
                >
                  <motion.span 
                    className="text-2xl sm:text-3xl mb-2 sm:mb-3 block"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {addon.icon}
                  </motion.span>
                  <p className="font-display text-sm sm:text-base text-foreground mb-1 leading-tight">{addon.name}</p>
                  <motion.p 
                    className="text-copper font-semibold text-sm sm:text-base mb-1 sm:mb-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    +CHF {addon.price}
                  </motion.p>
                  <p className="text-muted-foreground text-[10px] sm:text-xs hidden sm:block">{addon.description}</p>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages with interactive selection */}
      <section className="section-padding">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-copper/10 mb-4">
              <Percent size={16} className="text-copper" />
              <span className="text-copper text-sm font-medium">Sparen</span>
            </div>
            <h2 className="text-foreground mb-4">Sparpakete</h2>
            <p className="text-muted-foreground">Für regelmässige Entspannung – mit attraktiven Rabatten.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => setSelectedPackage(selectedPackage === index ? null : index)}
              >
                <motion.div 
                  className={`rounded-2xl p-6 text-center border-2 cursor-pointer transition-all ${
                    selectedPackage === index 
                      ? `border-${pkg.color} bg-${pkg.color}/10` 
                      : 'border-border/50 hover:border-copper/30'
                  }`}
                  whileHover={{ scale: 1.03, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  animate={{
                    boxShadow: selectedPackage === index 
                      ? '0 20px 40px -15px rgba(181, 120, 80, 0.3)' 
                      : 'none'
                  }}
                >
                  <p className="font-display text-xl text-foreground mb-2">{pkg.name}</p>
                  
                  <motion.div 
                    className="flex items-baseline justify-center gap-1 mb-2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1, type: "spring" }}
                  >
                    <span className="text-5xl font-display text-copper">{pkg.savings}</span>
                    <span className="text-copper text-2xl">%</span>
                  </motion.div>
                  
                  <p className="text-copper font-medium mb-2">sparen</p>
                  <p className="text-muted-foreground text-sm">{pkg.description}</p>
                  
                  {/* Session dots */}
                  <div className="flex justify-center gap-1 mt-4">
                    {[...Array(pkg.sessions)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-copper/60"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                      />
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Info */}
      <section className="section-padding bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-copper/10 rounded-full blur-[150px]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>
        
        <div className="container-narrow relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Info size={40} className="mx-auto mb-6 text-copper" />
            </motion.div>
            <h2 className="text-primary-foreground mb-8">Gut zu wissen</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto">
              {[
                { title: "Zahlungsmethoden", text: "Bargeld, Kreditkarte (Visa, Mastercard), TWINT. Zahlung nach der Session." },
                { title: "Stornierung", text: "Bis 24h vorher kostenfrei. Später bis zu 100% des Preises." },
                { title: "Gutscheine", text: "Gutscheine sind 2 Jahre gültig und auf alle Services anwendbar." },
                { title: "Erste Session", text: "Für Erstkundinnen empfehlen wir 90 Minuten für das volle Erlebnis." },
              ].map((item, index) => (
                <motion.div 
                  key={item.title}
                  className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-5 border border-primary-foreground/10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                >
                  <p className="font-medium mb-2">{item.title}</p>
                  <p className="text-primary-foreground/70 text-sm">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-foreground mb-6">Bereit für Ihr Erlebnis?</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="copper" size="lg" asChild className="group">
                  <Link to="/buchung">
                    Jetzt buchen
                    <motion.span
                      className="inline-block ml-2"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="petrol-outline" size="lg" asChild>
                  <Link to="/gutscheine">Gutschein schenken</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Preise;