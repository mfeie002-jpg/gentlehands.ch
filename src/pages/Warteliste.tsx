import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";
import { SEOHead } from "@/components/shared/SEOHead";
import { Clock, Bell, Heart, CheckCircle, Users, Sparkles, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { GlowCard } from "@/components/shared/GlowCard";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { useAnalytics } from "@/hooks/useAnalytics";

const Warteliste = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredMasseur: "",
    preferredTheme: "",
    flexibility: "flexible",
    notifications: true,
  });
  const { toast } = useToast();
  const { trackWaitlistSignup } = useAnalytics();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    trackWaitlistSignup();
    toast({
      title: "Sie wurden zur Warteliste hinzugefügt",
      description: "Wir informieren Sie, sobald ein Termin frei wird.",
    });
  };

  const flexibilityOptions = [
    { value: "flexible", label: "Sehr flexibel", icon: "✨" },
    { value: "weekdays", label: "Nur Werktage", icon: "📅" },
    { value: "weekends", label: "Nur Wochenende", icon: "🌴" },
    { value: "evenings", label: "Nur Abends", icon: "🌙" },
  ];

  return (
    <Layout>
      <SEOHead 
        title="Warteliste | GentleHands Zürich"
        description="Setzen Sie sich auf unsere Warteliste und erhalten Sie bevorzugten Zugang zu freien Terminen bei GentleHands."
        canonical="https://gentlehands.ch/warteliste"
      />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-copper/20"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
            />
          ))}
        </div>

        <div className="container-wide relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div 
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-copper/20 to-copper/5 flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              <Clock size={40} className="text-copper" />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-foreground mb-6"
            >
              <span className="bg-gradient-to-r from-foreground via-copper to-foreground bg-clip-text text-transparent">
                Warteliste
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground text-lg"
            >
              Aufgrund hoher Nachfrage sind unsere Termine oft ausgebucht.
              Setzen Sie sich auf die Warteliste und erhalten Sie bevorzugten
              Zugang, sobald ein Platz frei wird.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-padding-sm">
        <div className="container-narrow">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center"
              >
                <GlowCard glowColor="copper">
                  <div className="p-12">
                    <motion.div 
                      className="w-24 h-24 rounded-full bg-copper/20 flex items-center justify-center mx-auto mb-6 relative"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                    >
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-copper/30"
                        animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <CheckCircle size={48} className="text-copper" />
                    </motion.div>
                    <motion.h2 
                      className="text-foreground mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      Sie sind auf der Warteliste!
                    </motion.h2>
                    <motion.p 
                      className="text-muted-foreground max-w-md mx-auto"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      Wir haben Ihre Anfrage erhalten und melden uns, sobald ein
                      passender Termin verfügbar ist. Die durchschnittliche Wartezeit
                      beträgt 1-2 Wochen.
                    </motion.p>
                  </div>
                </GlowCard>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                  {/* Form */}
                  <div className="lg:col-span-3">
                    <GlowCard glowColor="copper">
                      <div className="p-8">
                        <h2 className="font-display text-2xl text-foreground mb-6">
                          Auf Warteliste setzen
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <motion.div 
                              className="space-y-2"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 }}
                            >
                              <Label htmlFor="name">Name *</Label>
                              <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) =>
                                  setFormData({ ...formData, name: e.target.value })
                                }
                                required
                                className="focus:ring-2 focus:ring-copper/30"
                              />
                            </motion.div>
                            <motion.div 
                              className="space-y-2"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 }}
                            >
                              <Label htmlFor="email">E-Mail *</Label>
                              <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) =>
                                  setFormData({ ...formData, email: e.target.value })
                                }
                                required
                                className="focus:ring-2 focus:ring-copper/30"
                              />
                            </motion.div>
                          </div>

                          <motion.div 
                            className="space-y-2"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            <Label htmlFor="phone">Telefon *</Label>
                            <Input
                              id="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={(e) =>
                                setFormData({ ...formData, phone: e.target.value })
                              }
                              required
                              className="focus:ring-2 focus:ring-copper/30"
                            />
                          </motion.div>

                          <motion.div 
                            className="space-y-2"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                          >
                            <Label>Bevorzugte:r Masseur:in (optional)</Label>
                            <select
                              value={formData.preferredMasseur}
                              onChange={(e) =>
                                setFormData({ ...formData, preferredMasseur: e.target.value })
                              }
                              className="w-full h-10 px-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-copper/30"
                            >
                              <option value="">Keine Präferenz</option>
                              <option value="morris">Morris</option>
                              <option value="anna">Anna</option>
                              <option value="luca">Luca</option>
                            </select>
                          </motion.div>

                          <motion.div 
                            className="space-y-3"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                          >
                            <Label>Zeitliche Flexibilität</Label>
                            <div className="grid grid-cols-2 gap-3">
                              {flexibilityOptions.map((opt) => (
                                <motion.button
                                  key={opt.value}
                                  type="button"
                                  onClick={() =>
                                    setFormData({ ...formData, flexibility: opt.value })
                                  }
                                  className={`px-4 py-3 rounded-xl border transition-all text-left ${
                                    formData.flexibility === opt.value
                                      ? "border-copper bg-copper/10 shadow-lg shadow-copper/10"
                                      : "border-border hover:border-copper/50"
                                  }`}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <span className="text-lg mr-2">{opt.icon}</span>
                                  <span className="text-sm">{opt.label}</span>
                                </motion.button>
                              ))}
                            </div>
                          </motion.div>

                          <motion.div 
                            className="flex items-start space-x-3 p-4 rounded-xl bg-secondary/30"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                          >
                            <Checkbox
                              id="notifications"
                              checked={formData.notifications}
                              onCheckedChange={(c) =>
                                setFormData({ ...formData, notifications: !!c })
                              }
                            />
                            <Label htmlFor="notifications" className="text-sm cursor-pointer">
                              Ich möchte per SMS benachrichtigt werden, wenn ein
                              Termin kurzfristig frei wird.
                            </Label>
                          </motion.div>

                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button variant="copper" size="lg" className="w-full" type="submit">
                              Auf Warteliste setzen
                              <ArrowRight size={16} className="ml-2" />
                            </Button>
                          </motion.div>
                        </form>
                      </div>
                    </GlowCard>
                  </div>

                  {/* Info */}
                  <div className="lg:col-span-2 space-y-6">
                    <ScrollReveal delay={0.2}>
                      <GlowCard glowColor="copper">
                        <div className="p-6">
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          >
                            <Bell size={28} className="text-copper mb-4" />
                          </motion.div>
                          <h4 className="font-display text-lg text-foreground mb-4">
                            So funktioniert es
                          </h4>
                          <ul className="space-y-4">
                            {[
                              "Füllen Sie das Formular aus",
                              "Wir prüfen freie Termine",
                              "Sie erhalten eine Benachrichtigung",
                              "Bestätigen Sie innerhalb von 24h",
                            ].map((step, index) => (
                              <motion.li 
                                key={step}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start gap-3 text-sm text-muted-foreground"
                              >
                                <span className="w-6 h-6 rounded-full bg-copper/20 text-copper text-xs flex items-center justify-center shrink-0 font-medium">
                                  {index + 1}
                                </span>
                                {step}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </GlowCard>
                    </ScrollReveal>

                    <ScrollReveal delay={0.3}>
                      <GlowCard glowColor="copper">
                        <div className="p-6">
                          <Heart size={28} className="text-copper mb-4" />
                          <h4 className="font-display text-lg text-foreground mb-2">
                            Durchschnittliche Wartezeit
                          </h4>
                          <p className="text-muted-foreground text-sm">
                            Je nach Flexibilität und Präferenzen beträgt die
                            durchschnittliche Wartezeit <strong className="text-copper">1-2 Wochen</strong>.
                            Flexible Kundinnen erhalten oft innerhalb weniger Tage
                            einen Termin.
                          </p>
                        </div>
                      </GlowCard>
                    </ScrollReveal>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </Layout>
  );
};

export default Warteliste;