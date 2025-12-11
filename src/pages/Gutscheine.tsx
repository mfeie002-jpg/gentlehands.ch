import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Heart, Star, Clock, Check, ArrowRight, ArrowLeft, Sparkles, CreditCard } from "lucide-react";
import { SEOHead } from "@/components/shared/SEOHead";
import { useToast } from "@/hooks/use-toast";
import { FloatingElements } from "@/components/shared/FloatingElements";
import { GlowCard } from "@/components/shared/GlowCard";
import { VoucherPreviewCard } from "@/components/voucher/VoucherPreviewCard";
import { VoucherValueSelector } from "@/components/voucher/VoucherValueSelector";
import { GiftCardChecker } from "@/components/shared/GiftCardChecker";
import { LazyImage } from "@/components/shared/LazyImage";
import giftCardPresentation from "@/assets/gift-card-presentation.jpg";

const giftCards = [
  {
    id: "discovery",
    title: "Entdeckungs-Gutschein",
    subtitle: "60 Minuten",
    price: 180,
    description: "Der perfekte Einstieg in die Welt von GentleHands.",
    includes: ["60-Minuten-Massage", "Freie Theme-Wahl", "Willkommenstee"],
    color: "petrol",
    glowColor: "180 50% 30%",
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
    color: "copper",
    glowColor: "24 55% 52%",
    icon: Heart,
  },
  {
    id: "premium",
    title: "Premium Retreat",
    subtitle: "120 Minuten",
    price: 340,
    description: "Das ultimative Entspannungserlebnis für besondere Menschen.",
    includes: ["120-Minuten-Massage", "Premium Themes", "Champagner/Tee", "Aftercare-Set", "Persönliche Beratung"],
    color: "forest",
    glowColor: "155 35% 35%",
    icon: Gift,
  },
  {
    id: "custom",
    title: "Wertgutschein",
    subtitle: "Flexibler Betrag",
    price: null,
    description: "Lassen Sie die beschenkte Person selbst wählen.",
    includes: ["Beliebiger Betrag ab CHF 50", "Flexibel einlösbar", "2 Jahre gültig"],
    color: "warm-gray",
    glowColor: "0 0% 50%",
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
      <SEOHead 
        title="Gutscheine | GentleHands Zürich"
        description="Verschenken Sie Entspannung: Exklusive GentleHands Gutscheine für unvergessliche Massage-Erlebnisse."
        canonical="https://gentlehands.ch/gutscheine"
      />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute top-1/4 -right-32 w-96 h-96 bg-copper/10 rounded-full blur-[120px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, delay: 4 }}
          />
        </div>
        
        <FloatingElements variant="dots" />
        
        <div className="container-wide relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-20 h-20 rounded-2xl bg-copper/10 flex items-center justify-center mb-6"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Gift size={40} className="text-copper" />
                </motion.div>
              </motion.div>
              
              <motion.h1 
                className="text-foreground mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Schenken Sie <span className="text-gradient-copper">Entspannung</span>
              </motion.h1>
              <motion.p 
                className="text-muted-foreground text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Das perfekte Geschenk für besondere Menschen – ein unvergessliches GentleHands-Erlebnis.
              </motion.p>
            </motion.div>

            {/* Emotional Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <LazyImage
                  src={giftCardPresentation}
                  alt="Elegante Gutschein-Präsentation im GentleHands Spa"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
              </div>
              
              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-4 -left-4 bg-card p-4 rounded-2xl shadow-xl border border-border"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <p className="text-copper text-sm font-medium">Ab CHF 180</p>
                <p className="text-muted-foreground text-xs">Unvergessliche Momente schenken</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Progress Indicator */}
      <section className="py-6 border-b border-border/50 sticky top-16 z-30 bg-background/80 backdrop-blur-md">
        <div className="container-wide">
          <div className="flex items-center justify-center gap-4">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <motion.div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= s ? 'bg-copper text-accent-foreground' : 'bg-secondary text-muted-foreground'
                  }`}
                  animate={{ scale: step === s ? 1.1 : 1 }}
                >
                  {s}
                </motion.div>
                <span className={`text-sm hidden sm:inline ${step >= s ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {s === 1 ? 'Gutschein wählen' : 'Personalisieren'}
                </span>
                {s === 1 && (
                  <div className="w-8 h-px bg-border mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gift Cards */}
      <section className="section-padding-sm">
        <div className="container-wide">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  {giftCards.map((card, index) => (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <GlowCard
                        glowColor={card.glowColor}
                        className={`h-full p-6 cursor-pointer transition-all ${
                          selectedCard === card.id
                            ? "ring-2 ring-copper"
                            : "hover:ring-1 hover:ring-copper/30"
                        }`}
                        onClick={() => setSelectedCard(card.id)}
                      >
                        {card.popular && (
                          <motion.span 
                            className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-copper text-accent-foreground rounded-full mb-4"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Sparkles size={12} />
                            Beliebt
                          </motion.span>
                        )}
                        
                        <motion.div 
                          className={`w-14 h-14 rounded-xl bg-gradient-to-br from-${card.color}/20 to-${card.color}/5 flex items-center justify-center mb-4`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <card.icon size={28} className="text-primary" />
                        </motion.div>
                        
                        <h3 className="font-display text-xl text-foreground mb-1">{card.title}</h3>
                        <p className="text-copper text-sm mb-3">{card.subtitle}</p>
                        <p className="text-muted-foreground text-sm mb-4">{card.description}</p>
                        
                        <ul className="space-y-2 mb-4">
                          {card.includes.map((item) => (
                            <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Check size={14} className="text-copper" />
                              {item}
                            </li>
                          ))}
                        </ul>
                        
                        {card.price ? (
                          <motion.p 
                            className="font-display text-2xl text-foreground"
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                          >
                            CHF {card.price}
                          </motion.p>
                        ) : (
                          <p className="text-muted-foreground text-sm">Betrag wählbar</p>
                        )}
                        
                        {selectedCard === card.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-4 right-4 w-6 h-6 rounded-full bg-copper flex items-center justify-center"
                          >
                            <Check size={14} className="text-accent-foreground" />
                          </motion.div>
                        )}
                      </GlowCard>
                    </motion.div>
                  ))}
                </div>

                {selectedCard === "custom" && (
                  <motion.div 
                    className="max-w-xs mx-auto mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
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
                  </motion.div>
                )}

                {selectedCard && (
                  <motion.div 
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        variant="copper"
                        size="lg"
                        onClick={() => setStep(2)}
                        disabled={selectedCard === "custom" && !customAmount}
                        className="group"
                      >
                        Weiter zur Personalisierung
                        <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="max-w-2xl mx-auto"
              >
                <div className="card-elevated p-8 relative overflow-hidden">
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-copper/10 to-transparent" />
                  
                  <h2 className="font-display text-2xl text-foreground mb-6">Gutschein personalisieren</h2>

                  <div className="space-y-6 relative z-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="recipientName">Name des Beschenkten</Label>
                        <Input
                          id="recipientName"
                          value={formData.recipientName}
                          onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                          placeholder="Anna Muster"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="recipientEmail">E-Mail des Beschenkten</Label>
                        <Input
                          id="recipientEmail"
                          type="email"
                          value={formData.recipientEmail}
                          onChange={(e) => setFormData({ ...formData, recipientEmail: e.target.value })}
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
                          onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                          placeholder="Maria Muster"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="senderEmail">Ihre E-Mail</Label>
                        <Input
                          id="senderEmail"
                          type="email"
                          value={formData.senderEmail}
                          onChange={(e) => setFormData({ ...formData, senderEmail: e.target.value })}
                          placeholder="maria@email.ch"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Persönliche Nachricht</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Schreiben Sie eine persönliche Nachricht..."
                        rows={4}
                      />
                    </div>

                    <motion.div 
                      className="p-4 bg-gradient-to-r from-secondary/50 to-secondary/30 rounded-xl border border-border/50"
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Ausgewählt:</span>
                        <span className="font-display text-foreground">{selectedGift?.title}</span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-muted-foreground">Gesamtbetrag:</span>
                        <motion.span 
                          className="font-display text-2xl text-copper"
                          initial={{ scale: 0.5 }}
                          animate={{ scale: 1 }}
                        >
                          CHF {totalPrice}
                        </motion.span>
                      </div>
                    </motion.div>

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={() => setStep(1)} className="group">
                        <ArrowLeft size={16} className="mr-2 transition-transform group-hover:-translate-x-1" />
                        Zurück
                      </Button>
                      <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          variant="copper"
                          className="w-full group"
                          onClick={handlePurchase}
                        >
                          <CreditCard size={18} className="mr-2" />
                          Zur Kasse (CHF {totalPrice})
                          <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Check Gift Card Balance */}
      <section className="section-padding bg-gradient-to-b from-secondary/30 to-background">
        <div className="container-narrow">
          <GiftCardChecker />
          
          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-16">
            {[
              { icon: Gift, title: "Sofort verfügbar", text: "Der Gutschein wird sofort per E-Mail zugestellt – perfekt für Last-Minute-Geschenke." },
              { icon: Clock, title: "2 Jahre gültig", text: "Genügend Zeit, um den perfekten Moment für das Erlebnis zu finden." },
              { icon: Heart, title: "Persönlich gestaltbar", text: "Mit persönlicher Nachricht und wahlweise elegantem Ausdruck zum Verschenken." },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <motion.div 
                  className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <item.icon size={24} className="text-primary" />
                </motion.div>
                <h4 className="font-display text-lg text-foreground mb-2">{item.title}</h4>
                <p className="text-muted-foreground text-sm">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Gutscheine;