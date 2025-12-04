import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Leaf, Droplets, Recycle, Heart, Sun, TreePine } from "lucide-react";

const initiatives = [
  {
    icon: Leaf,
    title: "Bio-Produkte",
    description: "Wir verwenden ausschliesslich zertifizierte Bio-Öle und natürliche Produkte ohne synthetische Zusätze.",
  },
  {
    icon: Droplets,
    title: "Wassersparen",
    description: "Effiziente Wassersysteme und bewusster Umgang mit dieser kostbaren Ressource.",
  },
  {
    icon: Recycle,
    title: "Zero Waste",
    description: "Wiederverwendbare Materialien, Recycling und Vermeidung von Einwegprodukten.",
  },
  {
    icon: Sun,
    title: "Erneuerbare Energie",
    description: "100% Ökostrom und energieeffiziente Beleuchtung in allen Räumen.",
  },
  {
    icon: TreePine,
    title: "Kompensation",
    description: "Wir kompensieren unseren CO2-Fussabdruck durch Aufforstungsprojekte.",
  },
  {
    icon: Heart,
    title: "Lokale Partner",
    description: "Zusammenarbeit mit lokalen Lieferanten und Schweizer Produzenten.",
  },
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
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-copper font-medium tracking-wide uppercase text-sm mb-4">
              Verantwortung
            </p>
            <h1 className="text-foreground mb-6">
              Nachhaltigkeit bei GentleHands
            </h1>
            <p className="text-muted-foreground text-lg">
              Wir glauben, dass echtes Wohlbefinden nur in Harmonie mit unserer 
              Umwelt entstehen kann. Deshalb setzen wir auf nachhaltige Praktiken.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Initiatives */}
      <section className="section-padding-sm">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {initiatives.map((initiative, index) => (
              <ScrollReveal key={initiative.title} delay={index * 0.1}>
                <div className="h-full p-6 rounded-2xl bg-card border border-border hover:border-forest/30 transition-colors">
                  <div className="w-14 h-14 rounded-xl bg-forest/10 flex items-center justify-center mb-4">
                    <initiative.icon size={28} className="text-forest" />
                  </div>
                  <h3 className="font-display text-xl text-foreground mb-3">
                    {initiative.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {initiative.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding bg-secondary/30">
        <div className="container-narrow">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-foreground mb-6">
                Unsere Philosophie
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-8">
            <ScrollReveal>
              <div className="p-8 rounded-2xl bg-card border border-border">
                <h3 className="font-display text-xl text-foreground mb-4">
                  Qualität vor Quantität
                </h3>
                <p className="text-muted-foreground">
                  Wir bevorzugen hochwertige, langlebige Produkte gegenüber billigen 
                  Einweg-Alternativen. Unsere Massagetücher sind aus Bio-Baumwolle, 
                  unsere Öle aus kontrolliertem Anbau. Das kostet mehr, ist aber für 
                  uns, unsere Kundinnen und die Umwelt besser.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="p-8 rounded-2xl bg-card border border-border">
                <h3 className="font-display text-xl text-foreground mb-4">
                  Transparenz
                </h3>
                <p className="text-muted-foreground">
                  Wir kommunizieren offen über unsere Praktiken – auch dort, wo wir 
                  noch Verbesserungspotential sehen. Nachhaltigkeit ist für uns eine 
                  Reise, kein Ziel.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="p-8 rounded-2xl bg-card border border-border">
                <h3 className="font-display text-xl text-foreground mb-4">
                  Soziale Verantwortung
                </h3>
                <p className="text-muted-foreground">
                  Nachhaltigkeit bedeutet für uns auch faire Arbeitsbedingungen, 
                  respektvoller Umgang und Unterstützung lokaler Gemeinschaften. 
                  Ein Teil unseres Gewinns fliesst in soziale Projekte für Frauen.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Goals */}
      <section className="section-padding">
        <div className="container-narrow">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-foreground mb-4">
                Unsere Ziele bis 2026
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { target: "100%", description: "Plastikfreie Verpackungen" },
              { target: "50%", description: "Reduzierung Wasserverbrauch" },
              { target: "CO2-neutral", description: "Vollständige Klimaneutralität" },
              { target: "10'000 CHF", description: "Jährliche Spende an Frauenprojekte" },
            ].map((goal, index) => (
              <ScrollReveal key={goal.description} delay={index * 0.1}>
                <div className="p-6 rounded-2xl bg-forest/5 border border-forest/20 text-center">
                  <p className="font-display text-3xl text-forest mb-2">
                    {goal.target}
                  </p>
                  <p className="text-muted-foreground">
                    {goal.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding-sm bg-gradient-to-br from-forest to-forest-light">
        <div className="container-narrow text-center">
          <ScrollReveal>
            <Leaf size={48} className="mx-auto text-primary-foreground/80 mb-6" />
            <h2 className="text-primary-foreground mb-6">
              Gemeinsam für eine bessere Zukunft
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Haben Sie Ideen oder Feedback zu unserem Nachhaltigkeitsengagement?
              Wir freuen uns über Ihre Nachricht.
            </p>
            <Button variant="secondary" size="lg" asChild>
              <Link to="/kontakt">Kontakt aufnehmen</Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Nachhaltigkeit;
