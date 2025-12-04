import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Check, Star, Clock, Info } from "lucide-react";

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
  },
];

const addOns = [
  { name: "Aromatherapie-Upgrade", price: 25, description: "Premium-Düfte nach Wahl" },
  { name: "Hot Stone Elemente", price: 40, description: "Warme Basaltsteine zur Vertiefung" },
  { name: "Kopf- & Gesichtsmassage", price: 35, description: "Zusätzliche 15 Min Fokus" },
  { name: "Champagner-Service", price: 45, description: "Glas Champagner vor/nach der Session" },
  { name: "Aftercare-Set", price: 30, description: "Produkte für zu Hause" },
];

const packages = [
  { name: "3er-Paket", savings: "10%", description: "3 Sessions Ihrer Wahl" },
  { name: "5er-Paket", savings: "15%", description: "5 Sessions Ihrer Wahl" },
  { name: "10er-Paket", savings: "20%", description: "10 Sessions Ihrer Wahl" },
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
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-copper font-medium tracking-wide uppercase text-sm mb-4">
              Preise
            </p>
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
      <section className="section-padding-sm">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.duration}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative card-elevated p-8 ${
                  tier.recommended ? "ring-2 ring-copper" : ""
                }`}
              >
                {tier.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-copper text-accent-foreground text-sm font-medium rounded-full">
                      <Star size={14} />
                      Empfohlen
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 text-primary mb-2">
                    <Clock size={18} />
                    <span className="font-medium">{tier.duration}</span>
                  </div>
                  <p className="font-display text-5xl text-foreground mb-2">
                    CHF {tier.price}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {tier.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check size={18} className="text-copper shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={tier.recommended ? "copper" : "petrol-outline"}
                  className="w-full"
                  asChild
                >
                  <Link to="/buchung">Jetzt buchen</Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="section-padding-sm bg-secondary/30">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
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
                className="card-bordered p-5 text-center"
              >
                <p className="font-display text-foreground mb-1">{addon.name}</p>
                <p className="text-copper font-medium mb-2">+CHF {addon.price}</p>
                <p className="text-muted-foreground text-xs">{addon.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="section-padding-sm">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
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
                className="card-elevated p-6 text-center"
              >
                <p className="font-display text-xl text-foreground mb-2">
                  {pkg.name}
                </p>
                <p className="text-3xl font-display text-copper mb-2">
                  {pkg.savings} sparen
                </p>
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
            <Info size={32} className="mx-auto mb-6 text-copper" />
            <h2 className="text-primary-foreground mb-6">Gut zu wissen</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto">
              <div className="bg-primary-foreground/10 rounded-xl p-5">
                <p className="font-medium mb-2">Zahlungsmethoden</p>
                <p className="text-primary-foreground/70 text-sm">
                  Bargeld, Kreditkarte (Visa, Mastercard), TWINT. Zahlung nach der Session.
                </p>
              </div>
              <div className="bg-primary-foreground/10 rounded-xl p-5">
                <p className="font-medium mb-2">Stornierung</p>
                <p className="text-primary-foreground/70 text-sm">
                  Bis 24h vorher kostenfrei. Später bis zu 100% des Preises.
                </p>
              </div>
              <div className="bg-primary-foreground/10 rounded-xl p-5">
                <p className="font-medium mb-2">Gutscheine</p>
                <p className="text-primary-foreground/70 text-sm">
                  Gutscheine sind 2 Jahre gültig und auf alle Services anwendbar.
                </p>
              </div>
              <div className="bg-primary-foreground/10 rounded-xl p-5">
                <p className="font-medium mb-2">Erste Session</p>
                <p className="text-primary-foreground/70 text-sm">
                  Für Erstkundinnen empfehlen wir 90 Minuten für das volle Erlebnis.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-narrow text-center">
          <h2 className="text-foreground mb-6">Bereit für Ihr Erlebnis?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="copper" size="lg" asChild>
              <Link to="/buchung">Jetzt buchen</Link>
            </Button>
            <Button variant="petrol-outline" size="lg" asChild>
              <Link to="/gutscheine">Gutschein schenken</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Preise;
