import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ComparisonTable } from "@/components/shared/ComparisonTable";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { TrustBadges } from "@/components/shared/TrustBadges";
import { Crown, Target, Shield, Heart } from "lucide-react";

const differences = [
  {
    icon: Crown,
    title: "Exklusiv für Frauen",
    description: "Bei uns gibt es keine gemischten Wartebereiche, keine zufälligen Begegnungen. Ein komplett geschützter Raum.",
  },
  {
    icon: Target,
    title: "Masseur:in-Wahl",
    description: "Sie wählen, wer Sie massiert – basierend auf Stil, Erfahrung und persönlicher Präferenz.",
  },
  {
    icon: Shield,
    title: "Trauma-sensitiv",
    description: "Alle unsere Teammitglieder sind in trauma-sensibler Körperarbeit geschult.",
  },
  {
    icon: Heart,
    title: "Atmosphäre nach Wahl",
    description: "Sechs verschiedene Themes von Ozean bis Deep Dark – Sie bestimmen die Stimmung.",
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
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-copper font-medium tracking-wide uppercase text-sm mb-4">
              Der Unterschied
            </p>
            <h1 className="text-foreground mb-6">
              Warum GentleHands anders ist
            </h1>
            <p className="text-muted-foreground text-lg">
              GentleHands ist kein klassisches Massage-Studio und auch kein Hotel-Spa.
              Wir sind ein exklusiver Raum für Frauen, die mehr wollen als nur eine Massage.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Differences */}
      <section className="section-padding-sm">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {differences.map((diff, index) => (
              <ScrollReveal key={diff.title} delay={index * 0.1}>
                <div className="h-full p-6 rounded-2xl bg-card border border-border hover:border-copper/30 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-copper/10 flex items-center justify-center mb-4">
                    <diff.icon size={24} className="text-copper" />
                  </div>
                  <h3 className="font-display text-lg text-foreground mb-2">
                    {diff.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {diff.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-padding bg-secondary/30">
        <div className="container-wide">
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
            <div className="bg-card rounded-2xl p-6 md:p-8 border border-border">
              <ComparisonTable />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* What We're Not */}
      <section className="section-padding">
        <div className="container-narrow">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-foreground mb-6">
                Was wir NICHT sind
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScrollReveal delay={0.1}>
              <div className="p-6 rounded-2xl bg-destructive/5 border border-destructive/20">
                <h3 className="font-display text-lg text-foreground mb-4">
                  Kein Erotikstudio
                </h3>
                <p className="text-muted-foreground text-sm">
                  GentleHands bietet keine sexuellen Dienstleistungen. Unser Fokus 
                  liegt auf professioneller Körperarbeit, Entspannung und Wohlbefinden. 
                  Jede Anfrage in diese Richtung führt zum sofortigen Ausschluss.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="p-6 rounded-2xl bg-destructive/5 border border-destructive/20">
                <h3 className="font-display text-lg text-foreground mb-4">
                  Keine Massenabfertigung
                </h3>
                <p className="text-muted-foreground text-sm">
                  Wir nehmen nur eine begrenzte Anzahl an Terminen pro Tag an. 
                  Keine überfüllten Wartebereiche, keine Hektik, keine 
                  durchgetakteten 30-Minuten-Slots.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="p-6 rounded-2xl bg-destructive/5 border border-destructive/20">
                <h3 className="font-display text-lg text-foreground mb-4">
                  Kein Wellness-Hotel
                </h3>
                <p className="text-muted-foreground text-sm">
                  Bei uns gibt es keine Sauna, keinen Pool, kein Restaurant. 
                  Wir sind spezialisiert auf eines: die bestmögliche Massage-Erfahrung 
                  in einer perfekt gestalteten Atmosphäre.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="p-6 rounded-2xl bg-destructive/5 border border-destructive/20">
                <h3 className="font-display text-lg text-foreground mb-4">
                  Keine Therapiepraxis
                </h3>
                <p className="text-muted-foreground text-sm">
                  Wir sind keine Physiotherapie und ersetzen keine medizinische 
                  Behandlung. Bei gesundheitlichen Beschwerden empfehlen wir 
                  immer zuerst den Arztbesuch.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="section-padding-sm bg-secondary/30">
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center mb-12">
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
            <h2 className="text-foreground mb-6">
              Bereit für etwas anderes?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Erleben Sie selbst den Unterschied. Buchen Sie Ihr erstes 
              GentleHands-Erlebnis und entdecken Sie, wie Massage sein kann.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="copper" size="lg" asChild>
                <Link to="/buchung">Erlebnis buchen</Link>
              </Button>
              <Button variant="petrol-outline" size="lg" asChild>
                <Link to="/erlebnisse">Erlebnisse entdecken</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Vergleich;
