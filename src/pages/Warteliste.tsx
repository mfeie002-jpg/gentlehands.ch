import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Clock, Bell, Heart, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast({
      title: "Sie wurden zur Warteliste hinzugefügt",
      description: "Wir informieren Sie, sobald ein Termin frei wird.",
    });
  };

  return (
    <Layout>
      <Helmet>
        <title>Warteliste | GentleHands Zürich</title>
        <meta
          name="description"
          content="Setzen Sie sich auf unsere Warteliste und erhalten Sie bevorzugten Zugang zu freien Terminen bei GentleHands."
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
              <Clock size={40} className="text-copper" />
            </div>
            <h1 className="text-foreground mb-6">
              Warteliste
            </h1>
            <p className="text-muted-foreground text-lg">
              Aufgrund hoher Nachfrage sind unsere Termine oft ausgebucht.
              Setzen Sie sich auf die Warteliste und erhalten Sie bevorzugten
              Zugang, sobald ein Platz frei wird.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-padding-sm">
        <div className="container-narrow">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card-elevated p-12 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-copper/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} className="text-copper" />
              </div>
              <h2 className="text-foreground mb-4">
                Sie sind auf der Warteliste!
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Wir haben Ihre Anfrage erhalten und melden uns, sobald ein
                passender Termin verfügbar ist. Die durchschnittliche Wartezeit
                beträgt 1-2 Wochen.
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                {/* Form */}
                <div className="lg:col-span-3">
                  <div className="card-elevated p-8">
                    <h2 className="font-display text-2xl text-foreground mb-6">
                      Auf Warteliste setzen
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">E-Mail *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefon *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Bevorzugte:r Masseur:in (optional)</Label>
                        <select
                          value={formData.preferredMasseur}
                          onChange={(e) =>
                            setFormData({ ...formData, preferredMasseur: e.target.value })
                          }
                          className="w-full h-10 px-3 rounded-lg border border-input bg-background"
                        >
                          <option value="">Keine Präferenz</option>
                          <option value="morris">Morris</option>
                          <option value="anna">Anna</option>
                          <option value="luca">Luca</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label>Zeitliche Flexibilität</Label>
                        <div className="flex flex-wrap gap-3">
                          {[
                            { value: "flexible", label: "Sehr flexibel" },
                            { value: "weekdays", label: "Nur Werktage" },
                            { value: "weekends", label: "Nur Wochenende" },
                            { value: "evenings", label: "Nur Abends" },
                          ].map((opt) => (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() =>
                                setFormData({ ...formData, flexibility: opt.value })
                              }
                              className={`px-4 py-2 rounded-lg border transition-all ${
                                formData.flexibility === opt.value
                                  ? "border-copper bg-copper/10"
                                  : "border-border hover:border-copper/50"
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="notifications"
                          checked={formData.notifications}
                          onCheckedChange={(c) =>
                            setFormData({ ...formData, notifications: !!c })
                          }
                        />
                        <Label htmlFor="notifications" className="text-sm">
                          Ich möchte per SMS benachrichtigt werden, wenn ein
                          Termin kurzfristig frei wird.
                        </Label>
                      </div>

                      <Button variant="copper" size="lg" className="w-full" type="submit">
                        Auf Warteliste setzen
                      </Button>
                    </form>
                  </div>
                </div>

                {/* Info */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="card-bordered p-6">
                    <Bell size={24} className="text-copper mb-4" />
                    <h4 className="font-display text-lg text-foreground mb-2">
                      So funktioniert es
                    </h4>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-copper/20 text-copper text-xs flex items-center justify-center shrink-0 mt-0.5">
                          1
                        </span>
                        Füllen Sie das Formular aus
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-copper/20 text-copper text-xs flex items-center justify-center shrink-0 mt-0.5">
                          2
                        </span>
                        Wir prüfen freie Termine
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-copper/20 text-copper text-xs flex items-center justify-center shrink-0 mt-0.5">
                          3
                        </span>
                        Sie erhalten eine Benachrichtigung
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-copper/20 text-copper text-xs flex items-center justify-center shrink-0 mt-0.5">
                          4
                        </span>
                        Bestätigen Sie innerhalb von 24h
                      </li>
                    </ul>
                  </div>

                  <div className="card-bordered p-6">
                    <Heart size={24} className="text-copper mb-4" />
                    <h4 className="font-display text-lg text-foreground mb-2">
                      Durchschnittliche Wartezeit
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Je nach Flexibilität und Präferenzen beträgt die
                      durchschnittliche Wartezeit <strong>1-2 Wochen</strong>.
                      Flexible Kundinnen erhalten oft innerhalb weniger Tage
                      einen Termin.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Warteliste;
