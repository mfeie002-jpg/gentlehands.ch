import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { GiftCard } from "@/components/shared/GiftCard";
import { Gift, Heart, Sparkles, Star, Users, Calendar } from "lucide-react";

const occasions = [
  {
    icon: Heart,
    title: "Valentinstag",
    description: "Schenken Sie Entspannung statt Blumen – ein Geschenk, das wirklich wirkt.",
  },
  {
    icon: Calendar,
    title: "Geburtstag",
    description: "Das perfekte Geschenk für die Frau, die schon alles hat.",
  },
  {
    icon: Star,
    title: "Muttertag",
    description: "Zeigen Sie Ihrer Mutter, wie viel sie Ihnen bedeutet.",
  },
  {
    icon: Users,
    title: "Freundinnen",
    description: "Ein besonderes Dankeschön für die beste Freundin.",
  },
  {
    icon: Sparkles,
    title: "Einfach so",
    description: "Die schönsten Geschenke sind die ohne Anlass.",
  },
  {
    icon: Gift,
    title: "Für sich selbst",
    description: "Gönnen Sie sich selbst etwas Gutes – Sie haben es verdient.",
  },
];

const packages = [
  {
    name: "Entspannungsmoment",
    price: "150",
    includes: ["60-Min Stress Reset", "Theme nach Wahl", "Willkommenstee"],
  },
  {
    name: "Zeit für mich",
    price: "250",
    includes: ["90-Min Deep Release", "Theme nach Wahl", "Aromatherapie", "Geschenkbox"],
    popular: true,
  },
  {
    name: "Luxus-Retreat",
    price: "400",
    includes: ["120-Min Ganzkörper", "Premium Theme", "Aromatherapie", "Take-Home Öl", "Geschenkbox deluxe"],
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
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-copper font-medium tracking-wide uppercase text-sm mb-4">
              Schenken
            </p>
            <h1 className="text-foreground mb-6">
              Das perfekte Geschenk
            </h1>
            <p className="text-muted-foreground text-lg">
              Verschenken Sie unvergessliche Momente der Entspannung. 
              Unsere Gutscheine kommen in einer wunderschönen Geschenkbox – 
              bereit zum Überreichen.
            </p>
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
                <div className="text-center p-4 rounded-xl bg-card border border-border hover:border-copper/30 transition-colors">
                  <div className="w-10 h-10 mx-auto rounded-lg bg-copper/10 flex items-center justify-center mb-3">
                    <occasion.icon size={20} className="text-copper" />
                  </div>
                  <h3 className="font-medium text-foreground text-sm mb-1">
                    {occasion.title}
                  </h3>
                  <p className="text-muted-foreground text-xs">
                    {occasion.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gift Packages */}
      <section className="section-padding bg-secondary/30">
        <div className="container-wide">
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
                <div className={`relative h-full p-8 rounded-2xl transition-all ${
                  pkg.popular 
                    ? "bg-gradient-to-br from-petrol to-petrol-dark text-primary-foreground" 
                    : "bg-card border border-border"
                }`}>
                  {pkg.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-copper text-accent-foreground text-xs font-medium rounded-full">
                      Beliebt
                    </span>
                  )}
                  <h3 className={`font-display text-2xl mb-2 ${pkg.popular ? "text-primary-foreground" : "text-foreground"}`}>
                    {pkg.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className={`font-display text-4xl ${pkg.popular ? "text-primary-foreground" : "text-foreground"}`}>
                      {pkg.price}
                    </span>
                    <span className={pkg.popular ? "text-primary-foreground/70" : "text-muted-foreground"}>
                      CHF
                    </span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {pkg.includes.map((item) => (
                      <li key={item} className={`flex items-start gap-2 text-sm ${pkg.popular ? "text-primary-foreground/90" : "text-muted-foreground"}`}>
                        <Gift size={16} className={`shrink-0 mt-0.5 ${pkg.popular ? "text-copper-light" : "text-copper"}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant={pkg.popular ? "secondary" : "copper"} 
                    className="w-full"
                    asChild
                  >
                    <Link to="/gutscheine">Auswählen</Link>
                  </Button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Amount */}
      <section className="section-padding">
        <div className="container-narrow">
          <ScrollReveal>
            <div className="p-8 md:p-12 rounded-3xl bg-card border border-border text-center">
              <Gift size={48} className="mx-auto text-copper mb-6" />
              <h2 className="text-foreground mb-4">
                Individueller Betrag
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Sie möchten einen anderen Betrag schenken? Kein Problem! 
                Wählen Sie bei der Gutscheinbestellung einfach „Wunschbetrag" 
                und geben Sie Ihre gewünschte Summe ein.
              </p>
              <Button variant="copper" size="lg" asChild>
                <Link to="/gutscheine">Gutschein gestalten</Link>
              </Button>
            </div>
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
