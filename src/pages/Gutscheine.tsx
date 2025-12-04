import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Gift, Heart, Star, Clock, Check, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const giftCards = [
  {
    id: "discovery",
    title: "Entdeckungs-Gutschein",
    subtitle: "60 Minuten",
    price: 180,
    description: "Der perfekte Einstieg in die Welt von GentleHands.",
    includes: ["60-Minuten-Massage", "Freie Theme-Wahl", "Willkommenstee"],
    color: "from-petrol/20 to-petrol/5",
    icon: Star,
  },
  {
    id: "signature",
    title: "Signature Experience",
    subtitle: "90 Minuten",
    price: 260,
    description: "Unser meistgebuchtes Erlebnis als Geschenk.",
    includes: ["90-Minuten-Massage", "Alle Themes verfügbar", "Aromatherapie", "Getränkeauswahl"],
    popular: true,
    color: "from-copper/20 to-copper/5",
    icon: Heart,
  },
  {
    id: "premium",
    title: "Premium Retreat",
    subtitle: "120 Minuten",
    price: 340,
    description: "Das ultimative Entspannungserlebnis für besondere Menschen.",
    includes: ["120-Minuten-Massage", "Premium Themes", "Champagner/Tee", "Aftercare-Set", "Persönliche Beratung"],
    color: "from-forest/20 to-forest/5",
    icon: Gift,
  },
  {
    id: "custom",
    title: "Wertgutschein",
    subtitle: "Flexibler Betrag",
    price: null,
    description: "Lassen Sie die beschenkte Person selbst wählen.",
    includes: ["Beliebiger Betrag ab CHF 50", "Flexibel einlösbar", "2 Jahre gültig"],
    color: "from-warm-gray/20 to-warm-gray/5",
    icon: Clock,
  },
];

const Gutscheine = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    recipientName: "",
    recipientEmail: "",
    senderName: "",
    senderEmail: "",
    message: "",
    deliveryMethod: "email",
  });
  const { toast } = useToast();

  const selectedGift = giftCards.find((g) => g.id === selectedCard);
  const totalPrice = selectedCard === "custom" ? Number(customAmount) : selectedGift?.price || 0;

  const handlePurchase = () => {
    toast({
      title: "Gutschein erstellt!",
      description: "Sie werden zur Zahlung weitergeleitet...",
    });
  };

  return (
    <Layout>
      <Helmet>
        <title>Gutscheine | GentleHands Zürich</title>
        <meta
          name="description"
          content="Verschenken Sie Entspannung: Exklusive GentleHands Gutscheine für unvergessliche Massage-Erlebnisse. Das perfekte Geschenk für besondere Menschen."
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
              <Gift size={40} className="text-copper" />
            </div>
            <h1 className="text-foreground mb-6">
              Schenken Sie Entspannung
            </h1>
            <p className="text-muted-foreground text-lg">
              Das perfekte Geschenk für besondere Menschen – ein unvergessliches
              GentleHands-Erlebnis.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gift Cards */}
      <section className="section-padding-sm">
        <div className="container-wide">
          {step === 1 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {giftCards.map((card, index) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <button
                      onClick={() => setSelectedCard(card.id)}
                      className={`w-full text-left h-full card-elevated p-6 border-2 transition-all hover:-translate-y-1 ${
                        selectedCard === card.id
                          ? "border-copper shadow-copper"
                          : "border-transparent hover:border-copper/30"
                      }`}
                    >
                      {card.popular && (
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-copper text-accent-foreground rounded-full mb-4">
                          Beliebt
                        </span>
                      )}
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4`}>
                        <card.icon size={28} className="text-primary" />
                      </div>
                      <h3 className="font-display text-xl text-foreground mb-1">
                        {card.title}
                      </h3>
                      <p className="text-copper text-sm mb-3">{card.subtitle}</p>
                      <p className="text-muted-foreground text-sm mb-4">
                        {card.description}
                      </p>
                      <ul className="space-y-2 mb-4">
                        {card.includes.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Check size={14} className="text-copper" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      {card.price ? (
                        <p className="font-display text-2xl text-foreground">
                          CHF {card.price}
                        </p>
                      ) : (
                        <p className="text-muted-foreground text-sm">
                          Betrag wählbar
                        </p>
                      )}
                    </button>
                  </motion.div>
                ))}
              </div>

              {selectedCard === "custom" && (
                <div className="max-w-xs mx-auto mb-8">
                  <Label htmlFor="amount">Gewünschter Betrag (CHF)</Label>
                  <Input
                    id="amount"
                    type="number"
                    min="50"
                    step="10"
                    placeholder="z.B. 200"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="mt-2"
                  />
                </div>
              )}

              {selectedCard && (
                <div className="text-center">
                  <Button
                    variant="copper"
                    size="lg"
                    onClick={() => setStep(2)}
                    disabled={selectedCard === "custom" && !customAmount}
                  >
                    Weiter zur Personalisierung
                    <ArrowRight size={18} />
                  </Button>
                </div>
              )}
            </>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-2xl mx-auto"
            >
              <div className="card-elevated p-8">
                <h2 className="font-display text-2xl text-foreground mb-6">
                  Gutschein personalisieren
                </h2>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="recipientName">Name des Beschenkten</Label>
                      <Input
                        id="recipientName"
                        value={formData.recipientName}
                        onChange={(e) =>
                          setFormData({ ...formData, recipientName: e.target.value })
                        }
                        placeholder="Anna Muster"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="recipientEmail">E-Mail des Beschenkten</Label>
                      <Input
                        id="recipientEmail"
                        type="email"
                        value={formData.recipientEmail}
                        onChange={(e) =>
                          setFormData({ ...formData, recipientEmail: e.target.value })
                        }
                        placeholder="anna@email.ch"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="senderName">Ihr Name</Label>
                      <Input
                        id="senderName"
                        value={formData.senderName}
                        onChange={(e) =>
                          setFormData({ ...formData, senderName: e.target.value })
                        }
                        placeholder="Maria Muster"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="senderEmail">Ihre E-Mail</Label>
                      <Input
                        id="senderEmail"
                        type="email"
                        value={formData.senderEmail}
                        onChange={(e) =>
                          setFormData({ ...formData, senderEmail: e.target.value })
                        }
                        placeholder="maria@email.ch"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Persönliche Nachricht</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Schreiben Sie eine persönliche Nachricht..."
                      rows={4}
                    />
                  </div>

                  <div className="p-4 bg-secondary/50 rounded-xl">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Ausgewählt:</span>
                      <span className="font-display text-foreground">
                        {selectedGift?.title}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-muted-foreground">Gesamtbetrag:</span>
                      <span className="font-display text-2xl text-copper">
                        CHF {totalPrice}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      Zurück
                    </Button>
                    <Button
                      variant="copper"
                      className="flex-1"
                      onClick={handlePurchase}
                    >
                      Zur Kasse (CHF {totalPrice})
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-narrow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Gift size={24} className="text-primary" />
              </div>
              <h4 className="font-display text-lg text-foreground mb-2">
                Sofort verfügbar
              </h4>
              <p className="text-muted-foreground text-sm">
                Der Gutschein wird sofort per E-Mail zugestellt – perfekt für
                Last-Minute-Geschenke.
              </p>
            </div>
            <div>
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Clock size={24} className="text-primary" />
              </div>
              <h4 className="font-display text-lg text-foreground mb-2">
                2 Jahre gültig
              </h4>
              <p className="text-muted-foreground text-sm">
                Genügend Zeit, um den perfekten Moment für das Erlebnis zu
                finden.
              </p>
            </div>
            <div>
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Heart size={24} className="text-primary" />
              </div>
              <h4 className="font-display text-lg text-foreground mb-2">
                Persönlich gestaltbar
              </h4>
              <p className="text-muted-foreground text-sm">
                Mit persönlicher Nachricht und wahlweise elegantem Ausdruck zum
                Verschenken.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Gutscheine;
