import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { SeasonalOffer } from "@/components/shared/SeasonalOffer";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Calendar, Gift, Clock, Sparkles, Heart, Snowflake } from "lucide-react";

const upcomingEvents = [
  {
    date: "14. Februar",
    title: "Valentinstag Special",
    description: "Schenken Sie sich selbst Liebe – oder einer besonderen Frau in Ihrem Leben.",
    offer: "Gutscheine mit 15% Bonus",
  },
  {
    date: "10. März",
    title: "Frauentag Extended",
    description: "Eine ganze Woche lang besondere Angebote zum Internationalen Frauentag.",
    offer: "Gratis Aromatherapie-Upgrade",
  },
  {
    date: "31. März",
    title: "Ostern – Zeit für Ruhe",
    description: "Nutzen Sie die freien Tage für echte Entspannung statt Stress.",
    offer: "10% auf alle Sessions",
  },
  {
    date: "12. Mai",
    title: "Muttertag",
    description: "Das perfekte Geschenk für die wichtigste Frau in Ihrem Leben.",
    offer: "Geschenkbox gratis",
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
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-copper font-medium tracking-wide uppercase text-sm mb-4">
              Limitierte Angebote
            </p>
            <h1 className="text-foreground mb-6">
              Saisonale Specials
            </h1>
            <p className="text-muted-foreground text-lg">
              Jede Jahreszeit bringt ihre eigenen Bedürfnisse mit. Unsere saisonalen
              Angebote sind perfekt darauf abgestimmt – und zeitlich limitiert.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Current Season */}
      <section className="section-padding-sm">
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center mb-12">
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
      <section className="section-padding bg-secondary/30">
        <div className="container-wide">
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
                <div className="h-full p-6 rounded-2xl bg-card border border-border hover:border-copper/30 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-16 h-16 rounded-xl bg-copper/10 flex flex-col items-center justify-center">
                      <Calendar size={20} className="text-copper" />
                      <span className="text-xs text-copper font-medium mt-1">
                        {event.date.split(" ")[0]}
                      </span>
                    </div>
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
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-copper/10 rounded-full">
                        <Gift size={14} className="text-copper" />
                        <span className="text-sm text-copper">{event.offer}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Year Overview */}
      <section className="section-padding">
        <div className="container-narrow">
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
            {[
              {
                season: "Winter",
                months: "Dezember – Februar",
                theme: "Wärme & Geborgenheit",
                description: "Wärmende Öle, heisser Tee, kuschelige Atmosphäre.",
                icon: Snowflake,
              },
              {
                season: "Frühling",
                months: "März – Mai",
                theme: "Erwachen & Energie",
                description: "Belebende Düfte, frische Energie, Neustart.",
                icon: Sparkles,
              },
              {
                season: "Sommer",
                months: "Juni – August",
                theme: "Leichtigkeit & Frische",
                description: "Kühlende Techniken, Ozean-Atmosphäre, Urlaubsgefühl.",
                icon: Heart,
              },
              {
                season: "Herbst",
                months: "September – November",
                theme: "Erdung & Rückzug",
                description: "Warme Holznoten, Alpine-Theme, Innehalten.",
                icon: Clock,
              },
            ].map((item, index) => (
              <ScrollReveal key={item.season} delay={index * 0.1}>
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <item.icon size={24} className="text-copper" />
                    <div>
                      <h3 className="font-display text-lg text-foreground">
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
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding bg-gradient-to-br from-petrol to-petrol-dark">
        <div className="container-narrow text-center">
          <ScrollReveal>
            <h2 className="text-primary-foreground mb-6">
              Kein Special verpassen
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Melden Sie sich für unseren Newsletter an und erfahren Sie als Erste
              von neuen Angeboten, limitierten Specials und exklusiven Events.
            </p>
            <Button variant="secondary" size="lg" asChild>
              <Link to="/warteliste">Newsletter abonnieren</Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Saisonal;
