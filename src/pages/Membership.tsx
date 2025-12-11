import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Star, Gift, Calendar, Heart, Sparkles, Check, ArrowRight, ChevronDown } from "lucide-react";
import { SEOHead } from "@/components/shared/SEOHead";
import { FloatingElements } from "@/components/shared/FloatingElements";
import { LazyImage } from "@/components/shared/LazyImage";
import membershipVip from "@/assets/membership-vip.jpg";

const membershipTiers = [
  {
    name: "Essence",
    price: "290",
    period: "pro Monat",
    description: "Für regelmässige Entspannung",
    sessionsPerMonth: 1,
    features: [
      "1 Session à 90 Min pro Monat",
      "10% auf Zusatz-Sessions",
      "Bevorzugte Terminbuchung",
      "Kostenlose Stornierung bis 12h vorher",
    ],
    color: "petrol",
    glowColor: "180 50% 30%",
    icon: Star,
  },
  {
    name: "Signature",
    price: "540",
    period: "pro Monat",
    description: "Unser beliebtestes Abo",
    sessionsPerMonth: 2,
    features: [
      "2 Sessions à 90 Min pro Monat",
      "15% auf Zusatz-Sessions",
      "Priority Terminbuchung",
      "Kostenlose Stornierung bis 6h vorher",
      "1 Gast-Session pro Jahr inklusive",
      "Exklusive Member-Events",
    ],
    popular: true,
    color: "copper",
    glowColor: "24 55% 52%",
    icon: Crown,
  },
  {
    name: "Prestige",
    price: "990",
    period: "pro Monat",
    description: "Das ultimative Erlebnis",
    sessionsPerMonth: 4,
    features: [
      "4 Sessions à 90 Min pro Monat",
      "20% auf alles Weitere",
      "VIP-Terminbuchung (auch kurzfristig)",
      "Unbegrenzte Stornierung",
      "2 Gast-Sessions pro Jahr inklusive",
      "Aftercare-Sets inklusive",
      "Persönlicher Concierge-Service",
      "Private Events & Previews",
    ],
    color: "forest",
    glowColor: "155 35% 35%",
    icon: Sparkles,
  },
];

const perks = [
  { icon: Calendar, title: "Bevorzugte Termine", text: "Members bekommen immer zuerst Zugang zu freien Slots." },
  { icon: Gift, title: "Geburtstags-Session", text: "Eine kostenlose 60-Min Session in Ihrem Geburtsmonat." },
  { icon: Heart, title: "Upgrades nach Verfügbarkeit", text: "Kostenlose Theme-Upgrades wenn möglich." },
  { icon: Star, title: "Member-Previews", text: "Neue Themes und Services zuerst erleben." },
];

const faqs = [
  { q: "Wie lange bin ich gebunden?", a: "Minimum 3 Monate, danach monatlich kündbar." },
  { q: "Was passiert, wenn ich eine Session nicht nutze?", a: "Ungenutzte Sessions können auf den Folgemonat übertragen werden (max. 1x)." },
  { q: "Kann ich upgraden?", a: "Ja, jederzeit. Die Differenz wird pro rata berechnet." },
  { q: "Gibt es eine Kündigungsfrist?", a: "30 Tage zum Monatsende nach der Mindestlaufzeit." },
];

const Membership = () => {
  const [hoveredTier, setHoveredTier] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <Layout>
      <SEOHead 
        title="Membership | GentleHands Zürich"
        description="GentleHands Membership Programme für regelmässige Entspannung. Exklusive Vorteile, bevorzugte Termine und besondere Erlebnisse."
        canonical="https://gentlehands.ch/membership"
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
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Crown size={40} className="text-copper" />
                </motion.div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-copper/10 border border-copper/20 mb-6"
              >
                <Sparkles size={16} className="text-copper" />
                <span className="text-copper text-sm font-medium">Exklusive Vorteile</span>
              </motion.div>
              
              <motion.h1 
                className="text-foreground mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Werden Sie <span className="text-gradient-copper">Member</span>
              </motion.h1>
              <motion.p 
                className="text-muted-foreground text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Regelmässige Entspannung zum Vorzugspreis. Exklusive Vorteile, bevorzugte Termine und besondere Erlebnisse nur für Members.
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
                  src={membershipVip}
                  alt="VIP Membership Erlebnis bei GentleHands"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
              </div>
              
              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-4 -right-4 bg-card p-4 rounded-2xl shadow-xl border border-border"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="flex items-center gap-2 text-copper mb-1">
                  <Crown size={16} />
                  <p className="text-sm font-medium">VIP Behandlung</p>
                </div>
                <p className="text-muted-foreground text-xs">Exklusiv für Members</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="section-padding-sm">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {membershipTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredTier(index)}
                onMouseLeave={() => setHoveredTier(null)}
                className="relative"
              >
                <motion.div 
                  className={`h-full card-elevated p-8 ${tier.popular ? "ring-2 ring-copper" : ""}`}
                  animate={{
                    y: hoveredTier === index ? -12 : 0,
                    boxShadow: hoveredTier === index 
                      ? `0 25px 50px -12px hsl(${tier.glowColor} / 0.3)` 
                      : '0 4px 20px rgba(0,0,0,0.1)'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Animated glow */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0 pointer-events-none"
                    animate={{ opacity: hoveredTier === index ? 1 : 0 }}
                    style={{
                      background: `radial-gradient(circle at 50% 0%, hsl(${tier.glowColor} / 0.15), transparent 70%)`
                    }}
                  />
                  
                  {tier.popular && (
                    <motion.div 
                      className="absolute -top-4 left-1/2 -translate-x-1/2"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-copper text-accent-foreground text-sm font-medium rounded-full shadow-lg shadow-copper/30">
                        <Star size={14} fill="currentColor" />
                        Beliebt
                      </span>
                    </motion.div>
                  )}

                  <motion.div 
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br from-${tier.color}/20 to-${tier.color}/5 flex items-center justify-center mb-6`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <tier.icon size={28} className="text-primary" />
                  </motion.div>

                  <h3 className="font-display text-2xl text-foreground mb-1">{tier.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{tier.description}</p>

                  <div className="mb-6">
                    <motion.span 
                      className="font-display text-5xl text-foreground"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      CHF {tier.price}
                    </motion.span>
                    <span className="text-muted-foreground text-sm ml-2">{tier.period}</span>
                  </div>

                  {/* Sessions indicator */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`h-2 flex-1 rounded-full ${i < tier.sessionsPerMonth ? 'bg-copper' : 'bg-secondary'}`}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mb-6">{tier.sessionsPerMonth} Session{tier.sessionsPerMonth > 1 ? 's' : ''} pro Monat</p>

                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, i) => (
                      <motion.li 
                        key={feature} 
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.05 }}
                      >
                        <motion.div whileHover={{ scale: 1.2 }}>
                          <Check size={18} className="text-copper shrink-0 mt-0.5" />
                        </motion.div>
                        <span className="text-muted-foreground text-sm">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant={tier.popular ? "copper" : "petrol-outline"}
                      className="w-full group"
                      asChild
                    >
                      <Link to="/kontakt">
                        Member werden
                        <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="section-padding-sm bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5Nzk3OTciIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        </div>
        
        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-foreground mb-4">Member-Vorteile</h2>
            <p className="text-muted-foreground">Zusätzlich zu Ihrem Abo geniessen alle Members:</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((perk, index) => (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="card-bordered p-6 text-center h-full">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <perk.icon size={28} className="text-copper mx-auto mb-4" />
                  </motion.div>
                  <h4 className="font-display text-foreground mb-2">{perk.title}</h4>
                  <p className="text-muted-foreground text-sm">{perk.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding-sm">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-foreground mb-4">Häufige Fragen</h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((item, index) => (
              <motion.div 
                key={index} 
                className="card-bordered overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between"
                >
                  <p className="font-medium text-foreground">{item.q}</p>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={20} className="text-muted-foreground" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6">
                        <p className="text-muted-foreground text-sm">{item.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-copper/10 rounded-full blur-[150px]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>
        
        <div className="container-narrow text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Crown size={40} className="mx-auto mb-6 text-copper" />
            </motion.div>
            <h2 className="text-primary-foreground mb-6">Bereit, Member zu werden?</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Kontaktieren Sie uns für ein unverbindliches Gespräch. Wir finden gemeinsam das passende Membership für Sie.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="copper" size="lg" asChild className="group">
                <Link to="/kontakt">
                  Jetzt anfragen
                  <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Membership;