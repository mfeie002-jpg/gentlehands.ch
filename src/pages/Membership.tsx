import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Crown, Star, Gift, Calendar, Heart, Sparkles, Check, ArrowRight } from "lucide-react";

const membershipTiers = [
  {
    name: "Essence",
    price: "290",
    period: "pro Monat",
    description: "Für regelmässige Entspannung",
    features: [
      "1 Session à 90 Min pro Monat",
      "10% auf Zusatz-Sessions",
      "Bevorzugte Terminbuchung",
      "Kostenlose Stornierung bis 12h vorher",
    ],
    color: "from-petrol/20 to-petrol/5",
    icon: Star,
  },
  {
    name: "Signature",
    price: "540",
    period: "pro Monat",
    description: "Unser beliebtestes Abo",
    features: [
      "2 Sessions à 90 Min pro Monat",
      "15% auf Zusatz-Sessions",
      "Priority Terminbuchung",
      "Kostenlose Stornierung bis 6h vorher",
      "1 Gast-Session pro Jahr inklusive",
      "Exklusive Member-Events",
    ],
    popular: true,
    color: "from-copper/20 to-copper/5",
    icon: Crown,
  },
  {
    name: "Prestige",
    price: "990",
    period: "pro Monat",
    description: "Das ultimative Erlebnis",
    features: [
      "4 Sessions à 90 Min pro Monat",
      "20% auf alles Weitere",
      "VIP-Terminbuchung (auch kurzfristig)",
      "Unbegrenzte Stornierung",
      "2 Gast-Sessions pro Jahr inklusive",
      "Aftercare-Sets inklusive",
      "Persönlicher Concierge-Service",
      "Private Events & Previews",
    ],
    color: "from-forest/20 to-forest/5",
    icon: Sparkles,
  },
];

const perks = [
  { icon: Calendar, title: "Bevorzugte Termine", text: "Members bekommen immer zuerst Zugang zu freien Slots." },
  { icon: Gift, title: "Geburtstags-Session", text: "Eine kostenlose 60-Min Session in Ihrem Geburtsmonat." },
  { icon: Heart, title: "Upgrades nach Verfügbarkeit", text: "Kostenlose Theme-Upgrades wenn möglich." },
  { icon: Star, title: "Member-Previews", text: "Neue Themes und Services zuerst erleben." },
];

const Membership = () => {
  return (
    <Layout>
      <Helmet>
        <title>Membership | GentleHands Zürich</title>
        <meta
          name="description"
          content="GentleHands Membership Programme für regelmässige Entspannung. Exklusive Vorteile, bevorzugte Termine und besondere Erlebnisse."
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
            <div className="w-20 h-20 rounded-2xl bg-copper/10 flex items-center justify-center mx-auto mb-6">
              <Crown size={40} className="text-copper" />
            </div>
            <p className="text-copper font-medium tracking-wide uppercase text-sm mb-4">
              Membership
            </p>
            <h1 className="text-foreground mb-6">
              Werden Sie Member
            </h1>
            <p className="text-muted-foreground text-lg">
              Regelmässige Entspannung zum Vorzugspreis. Exklusive Vorteile,
              bevorzugte Termine und besondere Erlebnisse nur für Members.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="section-padding-sm">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {membershipTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative card-elevated p-8 ${tier.popular ? "ring-2 ring-copper" : ""}`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-copper text-accent-foreground text-sm font-medium rounded-full">
                      <Star size={14} />
                      Beliebt
                    </span>
                  </div>
                )}

                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tier.color} flex items-center justify-center mb-6`}>
                  <tier.icon size={28} className="text-primary" />
                </div>

                <h3 className="font-display text-2xl text-foreground mb-1">
                  {tier.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {tier.description}
                </p>

                <div className="mb-6">
                  <span className="font-display text-4xl text-foreground">
                    CHF {tier.price}
                  </span>
                  <span className="text-muted-foreground text-sm ml-2">
                    {tier.period}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check size={18} className="text-copper shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={tier.popular ? "copper" : "petrol-outline"}
                  className="w-full"
                  asChild
                >
                  <Link to="/kontakt">Member werden</Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="section-padding-sm bg-secondary/30">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-foreground mb-4">Member-Vorteile</h2>
            <p className="text-muted-foreground">
              Zusätzlich zu Ihrem Abo geniessen alle Members:
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((perk, index) => (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="card-bordered p-6 text-center"
              >
                <perk.icon size={28} className="text-copper mx-auto mb-4" />
                <h4 className="font-display text-foreground mb-2">{perk.title}</h4>
                <p className="text-muted-foreground text-sm">{perk.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding-sm">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-foreground mb-4">Häufige Fragen</h2>
          </motion.div>

          <div className="space-y-4">
            {[
              { q: "Wie lange bin ich gebunden?", a: "Minimum 3 Monate, danach monatlich kündbar." },
              { q: "Was passiert, wenn ich eine Session nicht nutze?", a: "Ungenutzte Sessions können auf den Folgemonat übertragen werden (max. 1x)." },
              { q: "Kann ich upgraden?", a: "Ja, jederzeit. Die Differenz wird pro rata berechnet." },
              { q: "Gibt es eine Kündigungsfrist?", a: "30 Tage zum Monatsende nach der Mindestlaufzeit." },
            ].map((item, index) => (
              <div key={index} className="card-bordered p-6">
                <p className="font-medium text-foreground mb-2">{item.q}</p>
                <p className="text-muted-foreground text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-narrow text-center">
          <Crown size={40} className="mx-auto mb-6 text-copper" />
          <h2 className="text-primary-foreground mb-6">
            Bereit, Member zu werden?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Kontaktieren Sie uns für ein unverbindliches Gespräch. Wir finden
            gemeinsam das passende Membership für Sie.
          </p>
          <Button variant="copper" size="lg" asChild>
            <Link to="/kontakt">
              Jetzt anfragen
              <ArrowRight size={18} />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Membership;
