import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Heart, Users, Gift, Sparkles, Building2, Handshake } from "lucide-react";

const partners = [
  {
    name: "Premium Yoga Studio",
    category: "Yoga & Meditation",
    description: "Hochwertige Yoga-Kurse und Meditation in Zürich.",
    benefit: "10% Rabatt für GentleHands-Kundinnen",
  },
  {
    name: "Bio Beauty Spa",
    category: "Naturkosmetik",
    description: "Biologische Hautpflege und natürliche Beauty-Treatments.",
    benefit: "Gratis Hautanalyse",
  },
  {
    name: "Mindful Living",
    category: "Coaching",
    description: "Life Coaching und Stressmanagement für Frauen.",
    benefit: "Kostenloses Erstgespräch",
  },
  {
    name: "Organic Tea House",
    category: "Tee & Wellness",
    description: "Feinste Bio-Tees und Wellness-Produkte.",
    benefit: "10% auf alle Produkte",
  },
];

const partnershipTypes = [
  {
    icon: Gift,
    title: "Empfehlungspartner",
    description: "Sie empfehlen GentleHands Ihren Kundinnen und erhalten eine Provision.",
  },
  {
    icon: Users,
    title: "Cross-Promotion",
    description: "Gemeinsame Marketing-Aktionen und gegenseitige Empfehlungen.",
  },
  {
    icon: Sparkles,
    title: "Paket-Angebote",
    description: "Kombinierte Angebote für unsere gemeinsamen Zielgruppen.",
  },
  {
    icon: Building2,
    title: "Corporate Partnership",
    description: "Exklusive Angebote für Mitarbeitende Ihres Unternehmens.",
  },
];

const Partner = () => {
  return (
    <Layout>
      <Helmet>
        <title>Partner & Empfehlungen | GentleHands Zürich</title>
        <meta
          name="description"
          content="Entdecken Sie unsere Partner und deren exklusive Vorteile für GentleHands-Kundinnen. Werden Sie selbst Partner."
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
              Gemeinsam mehr erreichen
            </p>
            <h1 className="text-foreground mb-6">
              Unsere Partner
            </h1>
            <p className="text-muted-foreground text-lg">
              Wir arbeiten mit ausgewählten Partnern zusammen, die unsere Werte teilen
              und Ihr Wohlbefinden ganzheitlich unterstützen.
            </p>
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
                <div className="h-full p-6 rounded-2xl bg-card border border-border hover:border-copper/30 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-xs text-copper font-medium uppercase tracking-wider">
                        {partner.category}
                      </span>
                      <h3 className="font-display text-xl text-foreground mt-1">
                        {partner.name}
                      </h3>
                    </div>
                    <Heart size={24} className="text-copper/30" />
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    {partner.description}
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-copper/10 rounded-full">
                    <Gift size={14} className="text-copper" />
                    <span className="text-sm font-medium text-copper">
                      {partner.benefit}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Partner */}
      <section className="section-padding bg-secondary/30">
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Handshake size={48} className="mx-auto text-copper mb-6" />
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
                <div className="h-full p-6 rounded-2xl bg-card border border-border text-center">
                  <div className="w-14 h-14 mx-auto rounded-xl bg-copper/10 flex items-center justify-center mb-4">
                    <type.icon size={28} className="text-copper" />
                  </div>
                  <h3 className="font-display text-lg text-foreground mb-2">
                    {type.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {type.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center">
              <Button variant="copper" size="lg" asChild>
                <Link to="/kontakt">Partnerschaft anfragen</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Affiliate */}
      <section className="section-padding">
        <div className="container-narrow">
          <ScrollReveal>
            <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-copper/10 to-copper/5 border border-copper/20 text-center">
              <h2 className="text-foreground mb-6">
                Empfehlungsprogramm
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Empfehlen Sie GentleHands an Freundinnen, Kolleginnen oder Kundinnen
                und erhalten Sie eine Gutschrift für jede erfolgreiche Buchung.
                Es lohnt sich für beide Seiten!
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="copper" size="lg" asChild>
                  <Link to="/kontakt">Mehr erfahren</Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Partner;
