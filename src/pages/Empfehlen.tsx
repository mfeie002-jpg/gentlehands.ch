import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Gift, Users, Heart, Copy, Check, Share2, Mail, MessageCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const benefits = [
  {
    icon: Gift,
    title: "CHF 50 für Sie",
    description: "Erhalten Sie einen CHF 50 Gutschein, wenn Ihre Freundin bucht.",
  },
  {
    icon: Heart,
    title: "CHF 30 für Ihre Freundin",
    description: "Ihre Freundin erhält CHF 30 Rabatt auf ihre erste Buchung.",
  },
  {
    icon: Users,
    title: "Unbegrenzt empfehlen",
    description: "Es gibt kein Limit – je mehr Sie empfehlen, desto mehr sparen Sie.",
  },
];

const steps = [
  {
    number: "1",
    title: "Teilen Sie Ihren Code",
    description: "Senden Sie Ihren persönlichen Empfehlungscode an Freundinnen.",
  },
  {
    number: "2",
    title: "Freundin bucht",
    description: "Ihre Freundin gibt den Code bei ihrer ersten Buchung ein.",
  },
  {
    number: "3",
    title: "Beide profitieren",
    description: "Sie und Ihre Freundin erhalten automatisch Ihre Gutscheine.",
  },
];

const Empfehlen = () => {
  const [copied, setCopied] = useState(false);
  const referralCode = "GENTLE-" + Math.random().toString(36).substring(2, 8).toUpperCase();

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    toast({
      title: "Code kopiert!",
      description: "Der Empfehlungscode wurde in die Zwischenablage kopiert.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const shareVia = (method: string) => {
    const message = `Ich empfehle dir GentleHands – exklusive Massagen nur für Frauen in Zürich. Mit meinem Code ${referralCode} erhältst du CHF 30 Rabatt auf deine erste Buchung! https://gentlehands.ch`;
    
    switch (method) {
      case "whatsapp":
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
        break;
      case "email":
        window.open(`mailto:?subject=Meine Empfehlung: GentleHands&body=${encodeURIComponent(message)}`, "_blank");
        break;
      default:
        navigator.share?.({ title: "GentleHands empfehlen", text: message });
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Freundinnen empfehlen | GentleHands Zürich</title>
        <meta
          name="description"
          content="Empfehlen Sie GentleHands weiter und erhalten Sie CHF 50 Guthaben. Ihre Freundin erhält CHF 30 Rabatt."
        />
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-copper/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-petrol/10 rounded-full blur-[150px]" />

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-copper/20 to-copper/5 flex items-center justify-center"
            >
              <Gift className="w-10 h-10 text-copper" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              Teilen Sie <span className="text-gradient-copper">Entspannung</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Empfehlen Sie GentleHands Ihren Freundinnen und profitieren Sie beide.
            </p>

            {/* Referral Code Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-block"
            >
              <div className="glass rounded-2xl p-6 border border-copper/20">
                <p className="text-sm text-muted-foreground mb-2">Ihr persönlicher Empfehlungscode</p>
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-mono font-bold text-copper tracking-wider">
                    {referralCode}
                  </span>
                  <button
                    onClick={copyCode}
                    className="w-10 h-10 rounded-xl bg-copper/10 hover:bg-copper/20 flex items-center justify-center transition-colors"
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <Copy className="w-5 h-5 text-copper" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-6 border border-border/50 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-copper/10 flex items-center justify-center">
                  <benefit.icon className="w-7 h-7 text-copper" />
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
              So funktioniert's
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto relative">
            {/* Connection lines */}
            <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-copper/30 via-copper to-copper/30" />

            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center relative"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-copper text-background flex items-center justify-center text-xl font-bold relative z-10">
                  {step.number}
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Share Options */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto text-center"
          >
            <h2 className="text-2xl font-display font-bold text-foreground mb-6">
              Jetzt teilen
            </h2>

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => shareVia("whatsapp")}
                className="gap-2 border-emerald-500/30 text-emerald-600 hover:bg-emerald-500/10"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => shareVia("email")}
                className="gap-2"
              >
                <Mail className="w-5 h-5" />
                E-Mail
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => shareVia("share")}
                className="gap-2"
              >
                <Share2 className="w-5 h-5" />
                Mehr Optionen
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-copper/10 to-petrol/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">
              Noch kein GentleHands-Konto?
            </h2>
            <p className="text-muted-foreground mb-6">
              Erstellen Sie jetzt ein Konto, um Ihren persönlichen Empfehlungscode zu erhalten.
            </p>
            <Button variant="copper" size="lg" asChild>
              <a href="/login">Konto erstellen</a>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Empfehlen;
