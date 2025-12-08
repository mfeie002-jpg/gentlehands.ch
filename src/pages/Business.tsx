import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SEOHead } from "@/components/shared/SEOHead";
import { Building2, Users, Heart, Gift, Shield, Clock, Check, ArrowRight, Sparkles, TrendingUp, Award } from "lucide-react";
import { FloatingElements } from "@/components/shared/FloatingElements";
import { GlowCard } from "@/components/shared/GlowCard";

const benefits = [
  {
    icon: Heart,
    title: "Burnout-Prävention",
    description: "Regelmässige Entspannung reduziert Stress und beugt Erschöpfung vor.",
    stat: "67%",
    statLabel: "weniger Krankheitstage",
  },
  {
    icon: Users,
    title: "Mitarbeiterbindung",
    description: "Ein besonderes Benefit, das Wertschätzung zeigt und die Loyalität stärkt.",
    stat: "89%",
    statLabel: "höhere Zufriedenheit",
  },
  {
    icon: Shield,
    title: "Diskretion garantiert",
    description: "Alle Buchungen werden diskret abgewickelt – kein Kollege muss davon wissen.",
    stat: "100%",
    statLabel: "Vertraulichkeit",
  },
  {
    icon: Clock,
    title: "Flexible Termine",
    description: "Abend- und Wochenendtermine für maximale Flexibilität Ihrer Mitarbeiterinnen.",
    stat: "24/7",
    statLabel: "Online-Buchung",
  },
];

const packages = [
  {
    name: "Starter",
    description: "Für kleine Teams",
    price: "CHF 2'250",
    priceNote: "statt CHF 2'500",
    features: [
      "5 Gutscheine à 90 Min",
      "10% Rabatt",
      "Flexible Einlösung",
      "Reporting",
    ],
    badge: null,
  },
  {
    name: "Professional",
    description: "Für mittelgrosse Unternehmen",
    price: "CHF 6'375",
    priceNote: "statt CHF 7'500",
    features: [
      "15 Gutscheine à 90 Min",
      "15% Rabatt",
      "Dedicated Account Manager",
      "Anonymes Feedback-Report",
      "Quartals-Review",
    ],
    badge: "Beliebt",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "Für Grossunternehmen",
    price: "Auf Anfrage",
    priceNote: "Individuell kalkuliert",
    features: [
      "Unbegrenzte Gutscheine",
      "20% Rabatt",
      "Custom Branding möglich",
      "Integration in HR-System",
      "Monatliches Reporting",
      "Exklusive Termine",
    ],
    badge: "Premium",
  },
];

const steps = [
  { step: "1", title: "Paket wählen", text: "Wählen Sie ein Paket, das zu Ihrem Unternehmen passt.", icon: Gift },
  { step: "2", title: "Gutscheine verteilen", text: "Verteilen Sie die Gutscheine diskret an Ihre Mitarbeiterinnen.", icon: Users },
  { step: "3", title: "Erlebnisse geniessen", text: "Ihre Mitarbeiterinnen buchen und geniessen selbstständig.", icon: Heart },
];

const Business = () => {
  const [hoveredPackage, setHoveredPackage] = useState<string | null>(null);

  return (
    <Layout>
      <SEOHead 
        title="Corporate Wellness | GentleHands Zürich"
        description="GentleHands Corporate Wellness Programme für Unternehmen. Investieren Sie in das Wohlbefinden Ihrer Mitarbeiterinnen."
        canonical="https://gentlehands.ch/business"
      />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
        {/* Ambient Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-copper/10 blur-[100px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-primary/10 blur-[80px]"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>
        
        <FloatingElements variant="dots" />
        
        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-copper/20 to-primary/10 flex items-center justify-center mx-auto mb-6"
            >
              <Building2 size={40} className="text-copper" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-copper/10 border border-copper/20 mb-6"
            >
              <Sparkles size={16} className="text-copper" />
              <span className="text-copper text-sm font-medium">Corporate Wellness</span>
            </motion.div>
            
            <motion.h1 
              className="text-foreground mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span className="block">Investieren Sie</span>
              <span className="bg-gradient-to-r from-copper via-copper-light to-copper bg-clip-text text-transparent">
                in Ihr Team
              </span>
            </motion.h1>
            <motion.p 
              className="text-muted-foreground text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Stress ist der häufigste Grund für Ausfälle am Arbeitsplatz.
              Bieten Sie Ihren Mitarbeiterinnen ein Benefit, das wirklich etwas
              bewirkt.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding-sm relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }} />
        </div>
        
        <div className="container-wide relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlowCard className="h-full p-6 text-center group">
                  <motion.div 
                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-copper/20 to-primary/10 flex items-center justify-center mx-auto mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring" }}
                  >
                    <benefit.icon size={28} className="text-copper" />
                  </motion.div>
                  
                  {/* Stat */}
                  <motion.div 
                    className="mb-2"
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
                  >
                    <span className="text-3xl font-display text-copper">{benefit.stat}</span>
                    <p className="text-xs text-muted-foreground">{benefit.statLabel}</p>
                  </motion.div>
                  
                  <h4 className="font-display text-lg text-foreground mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {benefit.description}
                  </p>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding-sm bg-secondary/30 relative overflow-hidden">
        {/* Ambient Effect */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute top-1/2 -left-20 w-64 h-64 rounded-full bg-copper/5 blur-[80px]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>
        
        <div className="container-narrow relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-copper/10 border border-copper/20 mb-6"
            >
              <TrendingUp size={16} className="text-copper" />
              <span className="text-copper text-sm font-medium">Einfacher Prozess</span>
            </motion.div>
            <h2 className="text-foreground mb-4">So funktioniert es</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center relative"
              >
                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-copper/30 to-transparent" />
                )}
                
                <motion.div 
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-copper to-copper-light text-accent-foreground text-xl font-display flex items-center justify-center mx-auto mb-4 shadow-lg shadow-copper/20"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {item.step}
                </motion.div>
                <div className="w-10 h-10 rounded-lg bg-background/50 flex items-center justify-center mx-auto mb-4">
                  <item.icon size={20} className="text-muted-foreground" />
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
      <section className="section-padding-sm relative">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-copper/10 border border-copper/20 mb-6"
            >
              <Award size={16} className="text-copper" />
              <span className="text-copper text-sm font-medium">Flexible Pakete</span>
            </motion.div>
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
                onMouseEnter={() => setHoveredPackage(pkg.name)}
                onMouseLeave={() => setHoveredPackage(null)}
              >
                <GlowCard className={`h-full p-8 relative overflow-hidden ${pkg.popular ? "ring-2 ring-copper" : ""}`}>
                  {/* Badge */}
                  {pkg.badge && (
                    <motion.span 
                      className={`absolute top-4 right-4 px-3 py-1 text-xs font-medium rounded-full ${
                        pkg.popular ? "bg-copper text-accent-foreground" : "bg-primary/10 text-primary"
                      }`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {pkg.badge}
                    </motion.span>
                  )}
                  
                  <h3 className="font-display text-2xl text-foreground mb-1">
                    {pkg.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {pkg.description}
                  </p>
                  
                  {/* Price */}
                  <div className="mb-6">
                    <motion.span 
                      className="text-3xl font-display text-copper"
                      animate={{ scale: hoveredPackage === pkg.name ? 1.05 : 1 }}
                    >
                      {pkg.price}
                    </motion.span>
                    <p className="text-xs text-muted-foreground">{pkg.priceNote}</p>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, i) => (
                      <motion.li 
                        key={feature} 
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * i }}
                      >
                        <Check size={18} className="text-copper shrink-0 mt-0.5" />
                        <span className="text-muted-foreground text-sm">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <Button
                    variant={pkg.popular ? "copper" : "petrol-outline"}
                    className="w-full group"
                    asChild
                  >
                    <Link to="/kontakt">
                      Anfrage senden
                      <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  
                  {/* Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full pointer-events-none"
                    animate={hoveredPackage === pkg.name ? { translateX: '200%' } : {}}
                    transition={{ duration: 0.8 }}
                  />
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-copper/10 blur-[80px]"
            animate={{ y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>
        
        <div className="container-narrow text-center relative">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-16 h-16 mx-auto mb-6 rounded-full bg-copper/20 flex items-center justify-center"
          >
            <Gift size={32} className="text-copper" />
          </motion.div>
          
          <h2 className="text-primary-foreground mb-6">
            Kostenloses Erstgespräch
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Lassen Sie uns gemeinsam herausfinden, wie GentleHands Ihr
            Unternehmen unterstützen kann. Unverbindlich und vertraulich.
          </p>
          <Button variant="copper" size="lg" className="group" asChild>
            <Link to="/kontakt">
              Gespräch vereinbaren
              <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Business;