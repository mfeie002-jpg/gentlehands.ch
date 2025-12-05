import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Play, Eye, MapPin, Sparkles, ArrowRight } from "lucide-react";

import roomEmpfang from "@/assets/room-empfang.jpg";
import roomOzean from "@/assets/room-ozean.jpg";
import roomAlpine from "@/assets/room-alpine.jpg";
import roomDark from "@/assets/room-dark.jpg";
import roomZen from "@/assets/room-zen.jpg";
import roomUrban from "@/assets/room-urban.jpg";
import virtualTourHero from "@/assets/virtual-tour-hero.jpg";

const rooms = [
  {
    id: "empfang",
    name: "Empfangsbereich",
    description: "Hier werden Sie empfangen – mit warmem Tee und Zeit zum Ankommen.",
    image: roomEmpfang,
  },
  {
    id: "ozean",
    name: "Ozean Suite",
    description: "Projiziertes Meeresrauschen, warmes Licht und Düfte des Meeres.",
    image: roomOzean,
  },
  {
    id: "alpine",
    name: "Alpine Suite",
    description: "Holzelemente, Kaminfeuer-Atmosphäre und Bergkräuter-Düfte.",
    image: roomAlpine,
  },
  {
    id: "dark",
    name: "Deep Dark Suite",
    description: "Nahezu vollständige Dunkelheit für maximale Körperwahrnehmung.",
    image: roomDark,
  },
  {
    id: "zen",
    name: "Zen Suite",
    description: "Minimalistisch, klar, mit sanften Räuchernoten.",
    image: roomZen,
  },
  {
    id: "urban",
    name: "Urban Loft Suite",
    description: "Modern, stylish, mit urbanem Flair und Chillout-Vibes.",
    image: roomUrban,
  },
];

const VirtualTour = () => {
  return (
    <Layout>
      <Helmet>
        <title>Virtuelle Tour | GentleHands Zürich</title>
        <meta
          name="description"
          content="Entdecken Sie unsere Räumlichkeiten virtuell. Ein erster Eindruck unserer atmosphärischen Suiten und des Empfangsbereichs."
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
              Einblick
            </p>
            <h1 className="text-foreground mb-6">
              Virtuelle Tour
            </h1>
            <p className="text-muted-foreground text-lg">
              Machen Sie sich ein Bild von unseren Räumlichkeiten, bevor Sie uns
              besuchen. Jede Suite wurde mit viel Liebe zum Detail gestaltet.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Video/Image */}
      <section className="section-padding-sm">
        <div className="container-wide">
          <ScrollReveal>
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-secondary group cursor-pointer">
              <img 
                src={virtualTourHero} 
                alt="GentleHands Wellness Center Übersicht"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/40 transition-colors flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-primary-foreground/20 backdrop-blur flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Play size={32} className="text-primary-foreground ml-1" />
                </div>
                <p className="text-primary-foreground font-medium">
                  360° Tour starten
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Room Gallery */}
      <section className="section-padding bg-secondary/30">
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-foreground mb-4">
                Unsere Räume
              </h2>
              <p className="text-muted-foreground">
                Klicken Sie auf einen Raum, um mehr zu erfahren.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room, index) => (
              <ScrollReveal key={room.id} delay={index * 0.1}>
                <div className="group cursor-pointer">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-card mb-4">
                    <img 
                      src={room.image} 
                      alt={room.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-14 h-14 rounded-full bg-primary-foreground/20 backdrop-blur flex items-center justify-center">
                          <Eye size={24} className="text-primary-foreground" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-display text-lg text-foreground group-hover:text-copper transition-colors">
                    {room.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    {room.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding">
        <div className="container-narrow">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-foreground mb-4">
                Was Sie erwartet
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: MapPin,
                title: "Diskrete Lage",
                description: "Versteckter Eingang im Hinterhof – maximale Privatsphäre.",
              },
              {
                icon: Sparkles,
                title: "Premium-Ausstattung",
                description: "Hochwertige Materialien, gedämpftes Licht, perfekte Akustik.",
              },
              {
                icon: Eye,
                title: "Individuelle Atmosphäre",
                description: "Jeder Raum ein eigenes Universum, perfekt auf sein Theme abgestimmt.",
              },
            ].map((feature, index) => (
              <ScrollReveal key={feature.title} delay={index * 0.1}>
                <div className="text-center p-6">
                  <div className="w-14 h-14 mx-auto rounded-xl bg-copper/10 flex items-center justify-center mb-4">
                    <feature.icon size={28} className="text-copper" />
                  </div>
                  <h3 className="font-display text-lg text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding-sm bg-gradient-to-br from-petrol to-petrol-dark">
        <div className="container-narrow text-center">
          <ScrollReveal>
            <h2 className="text-primary-foreground mb-6">
              Bereit für den echten Besuch?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Eine virtuelle Tour kann nur einen kleinen Eindruck vermitteln.
              Erleben Sie GentleHands live – buchen Sie Ihren ersten Termin.
            </p>
            <Button variant="secondary" size="lg" asChild>
              <Link to="/buchung">
                Jetzt buchen
                <ArrowRight size={16} />
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default VirtualTour;
