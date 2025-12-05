import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { SeasonalOffer } from "@/components/shared/SeasonalOffer";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { GlowCard } from "@/components/shared/GlowCard";
import { Calendar, Gift, Clock, Sparkles, Heart, Snowflake, Sun, Leaf, Cloud, ArrowRight, Bell } from "lucide-react";

const upcomingEvents = [
  {
    date: "14. Februar",
    title: "Valentinstag Special",
    description: "Schenken Sie sich selbst Liebe – oder einer besonderen Frau in Ihrem Leben.",
    offer: "Gutscheine mit 15% Bonus",
    color: "from-rose-500/20 to-pink-500/20",
    icon: Heart,
  },
  {
    date: "10. März",
    title: "Frauentag Extended",
    description: "Eine ganze Woche lang besondere Angebote zum Internationalen Frauentag.",
    offer: "Gratis Aromatherapie-Upgrade",
    color: "from-purple-500/20 to-indigo-500/20",
    icon: Sparkles,
  },
  {
    date: "31. März",
    title: "Ostern – Zeit für Ruhe",
    description: "Nutzen Sie die freien Tage für echte Entspannung statt Stress.",
    offer: "10% auf alle Sessions",
    color: "from-amber-500/20 to-yellow-500/20",
    icon: Sun,
  },
  {
    date: "12. Mai",
    title: "Muttertag",
    description: "Das perfekte Geschenk für die wichtigste Frau in Ihrem Leben.",
    offer: "Geschenkbox gratis",
    color: "from-pink-500/20 to-rose-500/20",
    icon: Gift,
  },
];

const seasons = [
  {
    season: "Winter",
    months: "Dezember – Februar",
    theme: "Wärme & Geborgenheit",
    description: "Wärmende Öle, heisser Tee, kuschelige Atmosphäre.",
    icon: Snowflake,
    color: "#60A5FA",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
  },
  {
    season: "Frühling",
    months: "März – Mai",
    theme: "Erwachen & Energie",
    description: "Belebende Düfte, frische Energie, Neustart.",
    icon: Leaf,
    color: "#34D399",
    bgGradient: "from-emerald-500/10 to-green-500/10",
  },
  {
    season: "Sommer",
    months: "Juni – August",
    theme: "Leichtigkeit & Frische",
    description: "Kühlende Techniken, Ozean-Atmosphäre, Urlaubsgefühl.",
    icon: Sun,
    color: "#FBBF24",
    bgGradient: "from-amber-500/10 to-yellow-500/10",
  },
  {
    season: "Herbst",
    months: "September – November",
    theme: "Erdung & Rückzug",
    description: "Warme Holznoten, Alpine-Theme, Innehalten.",
    icon: Cloud,
    color: "#F97316",
    bgGradient: "from-orange-500/10 to-amber-500/10",
  },
];

const Saisonal = () => {
  return (
    <Layout>
      <Helmet>
        <title>Saisonale Angebote | GentleHands Zürich</title>
        <meta
          name="description"
          content="Entdecken Sie unsere saisonalen Specials und limitierten Angebote. Von Winter Wellness bis Sommer Escape – immer das passende Erlebnis."
        />
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
        {/* Seasonal particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, 20, 0],
                rotate: [0, 360],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              {["❄️", "🌸", "☀️", "🍂"][i % 4]}
            </motion.div>
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
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-copper/20 to-copper/5 flex items-center justify-center"
            >
              <Sparkles size={40} className="text-copper" />
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-copper font-medium tracking-wide uppercase text-sm mb-4"
            >
              Limitierte Angebote
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-foreground mb-6"
            >
              <span className="bg-gradient-to-r from-foreground via-copper to-foreground bg-clip-text text-transparent">
                Saisonale Specials
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground text-lg"
            >
              Jede Jahreszeit bringt ihre eigenen Bedürfnisse mit. Unsere saisonalen
              Angebote sind perfekt darauf abgestimmt – und zeitlich limitiert.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Current Season */}
      <section className="section-padding-sm">
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center mb-12">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-block"
              >
                <Snowflake size={32} className="text-copper mb-4" />
              </motion.div>
              <p className="text-copper font-medium tracking-wide uppercase text-sm mb-4">
                Aktuell
              </p>
              <h2 className="text-foreground">
                Unser Winter-Special
              </h2>
            </div>
          </ScrollReveal>

          <SeasonalOffer season="winter" />
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="section-padding bg-secondary/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,hsl(var(--copper)/0.05),transparent_50%)]" />
        
        <div className="container-wide relative">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className="text-copper font-medium tracking-wide uppercase text-sm mb-4">
                Vormerken
              </p>
              <h2 className="text-foreground mb-6">
                Kommende Specials
              </h2>
              <p className="text-muted-foreground">
                Diese besonderen Anlässe haben wir für Sie vorbereitet.
                Melden Sie sich für unseren Newsletter an, um nichts zu verpassen.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((event, index) => (
              <ScrollReveal key={event.title} delay={index * 0.1}>
                <GlowCard className="h-full" glowColor="copper">
                  <motion.div 
                    className="h-full p-6"
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-start gap-4">
                      <motion.div 
                        className={`shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br ${event.color} flex flex-col items-center justify-center`}
                        whileHover={{ rotate: 5, scale: 1.05 }}
                      >
                        <event.icon size={24} className="text-copper mb-1" />
                        <span className="text-xs text-copper font-medium">
                          {event.date.split(" ")[0]}
                        </span>
                      </motion.div>
                      <div className="flex-1">
                        <p className="text-xs text-copper font-medium mb-1">
                          {event.date}
                        </p>
                        <h3 className="font-display text-lg text-foreground mb-2">
                          {event.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-3">
                          {event.description}
                        </p>
                        <motion.div 
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-copper/10 rounded-full"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Gift size={14} className="text-copper" />
                          <span className="text-sm text-copper font-medium">{event.offer}</span>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </GlowCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Year Overview */}
      <section className="section-padding relative">
        <div className="absolute inset-0">
          <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100">
            <pattern id="season-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="currentColor" className="text-copper" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#season-dots)" />
          </svg>
        </div>
        
        <div className="container-narrow relative">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-foreground mb-6">
                Das ganze Jahr entspannt
              </h2>
              <p className="text-muted-foreground">
                Jede Jahreszeit hat bei GentleHands ihr eigenes Thema.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {seasons.map((item, index) => (
              <ScrollReveal key={item.season} delay={index * 0.1}>
                <GlowCard className="h-full" glowColor="copper">
                  <motion.div 
                    className={`p-6 bg-gradient-to-br ${item.bgGradient}`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <motion.div
                        className="w-14 h-14 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${item.color}20` }}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <item.icon size={28} style={{ color: item.color }} />
                      </motion.div>
                      <div>
                        <h3 className="font-display text-xl text-foreground">
                          {item.season}
                        </h3>
                        <p className="text-xs text-muted-foreground">{item.months}</p>
                      </div>
                    </div>
                    <p className="text-copper text-sm font-medium mb-2">
                      {item.theme}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>
                  </motion.div>
                </GlowCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding bg-gradient-to-br from-petrol to-petrol-dark relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-copper-light/20"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        <div className="container-narrow text-center relative">
          <ScrollReveal>
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Bell size={48} className="mx-auto text-copper-light mb-6" />
            </motion.div>
            <h2 className="text-primary-foreground mb-6">
              Kein Special verpassen
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Melden Sie sich für unseren Newsletter an und erfahren Sie als Erste
              von neuen Angeboten, limitierten Specials und exklusiven Events.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="secondary" size="lg" asChild>
                <Link to="/warteliste">
                  Newsletter abonnieren
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Saisonal;