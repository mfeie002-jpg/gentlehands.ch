import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Check, Star, Clock, Info, Gift, Percent, Sparkles } from "lucide-react";
import { GlowCard } from "@/components/shared/GlowCard";

const pricingTiers = [
  {
    duration: "60 Min",
    price: 180,
    description: "Der kompakte Einstieg",
    features: [
      "Fokussierte Massage",
      "Alle Themes wählbar",
      "Willkommenstee",
    ],
    recommended: false,
    gradient: "from-secondary to-secondary/50",
  },
  {
    duration: "90 Min",
    price: 260,
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
  },
  {
    duration: "120 Min",
    price: 340,
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
  { name: "3er-Paket", savings: 10, description: "3 Sessions Ihrer Wahl", color: "bg-petrol/10 border-petrol/20" },
  { name: "5er-Paket", savings: 15, description: "5 Sessions Ihrer Wahl", color: "bg-copper/10 border-copper/20" },
  { name: "10er-Paket", savings: 20, description: "10 Sessions Ihrer Wahl", color: "bg-primary/10 border-primary/20" },
];

const Preise = () => {
  return (
    <Layout>
      <Helmet>
        <title>Preise | GentleHands Zürich</title>
        <meta
          name="description"
          content="Transparente Preise für alle GentleHands Massagen und Erlebnisse. 60, 90 oder 120 Minuten – finden Sie Ihr perfektes Erlebnis."
        />
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -right-32 w-96 h-96 bg-copper/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        </div>
        
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
            
            <h1 className="text-foreground mb-6">
              Investieren Sie in Ihr Wohlbefinden
            </h1>
            <p className="text-muted-foreground text-lg">
              Transparente Preise ohne versteckte Kosten. Jede Session beinhaltet
              die volle GentleHands-Erfahrung mit Theme, Atmosphäre und
              persönlicher Betreuung.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Tiers */}
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
                whileHover={{ y: -8 }}
                className="relative"
              >
                <div className={`h-full rounded-3xl p-8 transition-all duration-300 ${
                  tier.recommended 
                    ? "bg-gradient-to-b from-copper/10 to-background ring-2 ring-copper shadow-xl shadow-copper/10" 
                    : "card-elevated hover:shadow-xl"
                }`}>
                  {tier.recommended && (
                    <motion.div 
                      className="absolute -top-4 left-1/2 -translate-x-1/2"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-copper text-accent-foreground text-sm font-medium rounded-full shadow-lg">
                        <Star size={14} fill="currentColor" />
                        Empfohlen
                      </span>
                    </motion.div>
                  )}

                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 text-primary mb-3">
                      <Clock size={20} />
                      <span className="font-medium text-lg">{tier.duration}</span>
                    </div>
                    <div className="flex items-baseline justify-center gap-1 mb-2">
                      <span className="text-muted-foreground text-lg">CHF</span>
                      <motion.span 
                        className="font-display text-6xl text-foreground"
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        {tier.price}
                      </motion.span>
                    </div>
                    <p className="text-muted-foreground">
                      {tier.description}
                    </p>
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
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${tier.recommended ? 'bg-copper' : 'bg-primary/20'}`}>
                          <Check size={12} className={tier.recommended ? 'text-accent-foreground' : 'text-primary'} />
                        </div>
                        <span className="text-muted-foreground">
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  <Button
                    variant={tier.recommended ? "copper" : "petrol-outline"}
                    className="w-full"
                    size="lg"
                    asChild
                  >
                    <Link to="/buchung">Jetzt buchen</Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="section-padding bg-secondary/30">
        <div className="container-wide">
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
            <p className="text-muted-foreground">
              Ergänzen Sie Ihr Erlebnis mit besonderen Extras.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {addOns.map((addon, index) => (
              <motion.div
                key={addon.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <GlowCard className="p-5 text-center h-full">
                  <span className="text-2xl mb-3 block">{addon.icon}</span>
                  <p className="font-display text-foreground mb-1">{addon.name}</p>
                  <p className="text-copper font-semibold mb-2">+CHF {addon.price}</p>
                  <p className="text-muted-foreground text-xs">{addon.description}</p>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
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
            <p className="text-muted-foreground">
              Für regelmässige Entspannung – mit attraktiven Rabatten.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className={`rounded-2xl p-6 text-center border ${pkg.color}`}
              >
                <p className="font-display text-xl text-foreground mb-2">
                  {pkg.name}
                </p>
                <motion.div 
                  className="flex items-baseline justify-center gap-1 mb-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <span className="text-4xl font-display text-copper">{pkg.savings}</span>
                  <span className="text-copper text-xl">%</span>
                </motion.div>
                <p className="text-copper font-medium mb-2">sparen</p>
                <p className="text-muted-foreground text-sm">{pkg.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Info */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Info size={40} className="mx-auto mb-6 text-copper" />
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
              <Button variant="copper" size="lg" asChild>
                <Link to="/buchung">Jetzt buchen</Link>
              </Button>
              <Button variant="petrol-outline" size="lg" asChild>
                <Link to="/gutscheine">Gutschein schenken</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Preise;