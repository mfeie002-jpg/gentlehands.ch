import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ScentGuide } from "@/components/shared/ScentGuide";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Droplets, Leaf, Heart, Brain, Wind, Sparkles } from "lucide-react";

const benefits = [
  {
    icon: Brain,
    title: "Stressreduktion",
    description: "Düfte wie Lavendel und Bergamotte aktivieren das parasympathische Nervensystem und fördern tiefe Entspannung.",
  },
  {
    icon: Heart,
    title: "Emotionale Balance",
    description: "Bestimmte Aromen können emotionale Blockaden lösen und das Wohlbefinden steigern.",
  },
  {
    icon: Wind,
    title: "Atemvertiefung",
    description: "Eukalyptus und Minze öffnen die Atemwege und fördern bewusstes, tiefes Atmen.",
  },
  {
    icon: Leaf,
    title: "Natürliche Wirkung",
    description: "Wir verwenden ausschliesslich 100% reine, therapeutische ätherische Öle höchster Qualität.",
  },
];

const Aromatherapie = () => {
  return (
    <Layout>
      <Helmet>
        <title>Aromatherapie | GentleHands Zürich</title>
        <meta
          name="description"
          content="Entdecken Sie die Kraft der Düfte. Unsere Aromatherapie-Optionen verstärken Ihr Massage-Erlebnis und fördern tiefe Entspannung."
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
              Die Kraft der Düfte
            </p>
            <h1 className="text-foreground mb-6">
              Aromatherapie bei GentleHands
            </h1>
            <p className="text-muted-foreground text-lg">
              Düfte haben eine direkte Verbindung zu unserem emotionalen Zentrum.
              Mit sorgfältig ausgewählten ätherischen Ölen verstärken wir Ihr
              Massage-Erlebnis auf einer tieferen Ebene.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding-sm">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <ScrollReveal key={benefit.title} delay={index * 0.1}>
                <div className="h-full p-6 rounded-2xl bg-card border border-border hover:border-copper/30 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-copper/10 flex items-center justify-center mb-4">
                    <benefit.icon size={24} className="text-copper" />
                  </div>
                  <h3 className="font-display text-lg text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {benefit.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Scent Guide */}
      <section className="section-padding bg-secondary/30">
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-copper font-medium tracking-wide uppercase text-sm mb-4">
                Unsere Duftauswahl
              </p>
              <h2 className="text-foreground mb-6">
                Finden Sie Ihren Duft
              </h2>
              <p className="text-muted-foreground">
                Jeder Duft erzählt eine Geschichte und weckt andere Emotionen.
                Wählen Sie intuitiv oder lassen Sie sich von uns beraten.
              </p>
            </div>
          </ScrollReveal>

          <ScentGuide />
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding">
        <div className="container-narrow">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-foreground mb-6">
                So integrieren wir Aromatherapie
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-8">
            {[
              {
                step: "01",
                title: "Duftwahl vor der Session",
                description: "Beim Buchungsprozess oder vor Ort wählen Sie Ihren Wunschduft – oder lassen sich überraschen.",
              },
              {
                step: "02",
                title: "Raumbeduftung",
                description: "Der Raum wird sanft mit Ihrem gewählten Duft beduftet, noch bevor Sie eintreten.",
              },
              {
                step: "03",
                title: "Massageöl",
                description: "Auf Wunsch mischen wir Ihr Massageöl mit den entsprechenden ätherischen Ölen.",
              },
              {
                step: "04",
                title: "Take-Home",
                description: "Optional: Nehmen Sie eine kleine Duftprobe mit nach Hause, um das Gefühl zu verlängern.",
              },
            ].map((item, index) => (
              <ScrollReveal key={item.step} delay={index * 0.1}>
                <div className="flex gap-6">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-copper/10 flex items-center justify-center">
                    <span className="font-display text-copper">{item.step}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-petrol to-petrol-dark">
        <div className="container-narrow text-center">
          <ScrollReveal>
            <Droplets size={48} className="mx-auto text-copper-light mb-6" />
            <h2 className="text-primary-foreground mb-6">
              Aromatherapie als Upgrade
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Aromatherapie ist bei allen unseren Massagen als Gratis-Upgrade
              verfügbar. Wählen Sie einfach bei der Buchung Ihren Wunschduft.
            </p>
            <Button variant="secondary" size="lg" asChild>
              <Link to="/buchung">Jetzt buchen mit Aromatherapie</Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Aromatherapie;
