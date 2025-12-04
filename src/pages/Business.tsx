import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Building2, Users, Heart, Gift, Shield, Clock, Check, ArrowRight } from "lucide-react";

const benefits = [
  {
    icon: Heart,
    title: "Burnout-Prävention",
    description: "Regelmässige Entspannung reduziert Stress und beugt Erschöpfung vor.",
  },
  {
    icon: Users,
    title: "Mitarbeiterbindung",
    description: "Ein besonderes Benefit, das Wertschätzung zeigt und die Loyalität stärkt.",
  },
  {
    icon: Shield,
    title: "Diskretion garantiert",
    description: "Alle Buchungen werden diskret abgewickelt – kein Kollege muss davon wissen.",
  },
  {
    icon: Clock,
    title: "Flexible Termine",
    description: "Abend- und Wochenendtermine für maximale Flexibilität Ihrer Mitarbeiterinnen.",
  },
];

const packages = [
  {
    name: "Starter",
    description: "Für kleine Teams",
    features: [
      "5 Gutscheine à 90 Min",
      "10% Rabatt",
      "Flexible Einlösung",
      "Reporting",
    ],
  },
  {
    name: "Professional",
    description: "Für mittelgrosse Unternehmen",
    features: [
      "15 Gutscheine à 90 Min",
      "15% Rabatt",
      "Dedicated Account Manager",
      "Anonymes Feedback-Report",
      "Quartals-Review",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    description: "Für Grossunternehmen",
    features: [
      "Unbegrenzte Gutscheine",
      "20% Rabatt",
      "Custom Branding möglich",
      "Integration in HR-System",
      "Monatliches Reporting",
      "Exklusive Termine",
    ],
  },
];

const Business = () => {
  return (
    <Layout>
      <Helmet>
        <title>Corporate Wellness | GentleHands Zürich</title>
        <meta
          name="description"
          content="GentleHands Corporate Wellness Programme für Unternehmen. Investieren Sie in das Wohlbefinden Ihrer Mitarbeiterinnen."
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
              <Building2 size={40} className="text-copper" />
            </div>
            <p className="text-copper font-medium tracking-wide uppercase text-sm mb-4">
              Corporate Wellness
            </p>
            <h1 className="text-foreground mb-6">
              Investieren Sie in Ihr Team
            </h1>
            <p className="text-muted-foreground text-lg">
              Stress ist der häufigste Grund für Ausfälle am Arbeitsplatz.
              Bieten Sie Ihren Mitarbeiterinnen ein Benefit, das wirklich etwas
              bewirkt.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding-sm">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card-elevated p-6 text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon size={28} className="text-primary" />
                </div>
                <h4 className="font-display text-lg text-foreground mb-2">
                  {benefit.title}
                </h4>
                <p className="text-muted-foreground text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding-sm bg-secondary/30">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-foreground mb-4">So funktioniert es</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Paket wählen", text: "Wählen Sie ein Paket, das zu Ihrem Unternehmen passt." },
              { step: "2", title: "Gutscheine verteilen", text: "Verteilen Sie die Gutscheine diskret an Ihre Mitarbeiterinnen." },
              { step: "3", title: "Erlebnisse geniessen", text: "Ihre Mitarbeiterinnen buchen und geniessen selbstständig." },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-full bg-copper text-accent-foreground text-xl font-display flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h4 className="font-display text-lg text-foreground mb-2">
                  {item.title}
                </h4>
                <p className="text-muted-foreground text-sm">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="section-padding-sm">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-foreground mb-4">Unsere Pakete</h2>
            <p className="text-muted-foreground">
              Flexible Lösungen für jede Unternehmensgrösse.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`card-elevated p-8 ${pkg.popular ? "ring-2 ring-copper" : ""}`}
              >
                {pkg.popular && (
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-copper text-accent-foreground rounded-full mb-4">
                    Beliebt
                  </span>
                )}
                <h3 className="font-display text-2xl text-foreground mb-1">
                  {pkg.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  {pkg.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check size={18} className="text-copper shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={pkg.popular ? "copper" : "petrol-outline"}
                  className="w-full"
                  asChild
                >
                  <Link to="/kontakt">Anfrage senden</Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-narrow text-center">
          <Gift size={40} className="mx-auto mb-6 text-copper" />
          <h2 className="text-primary-foreground mb-6">
            Kostenloses Erstgespräch
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Lassen Sie uns gemeinsam herausfinden, wie GentleHands Ihr
            Unternehmen unterstützen kann. Unverbindlich und vertraulich.
          </p>
          <Button variant="copper" size="lg" asChild>
            <Link to="/kontakt">
              Gespräch vereinbaren
              <ArrowRight size={18} />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Business;
