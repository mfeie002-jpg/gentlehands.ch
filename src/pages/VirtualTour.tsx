import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SEOHead } from "@/components/shared/SEOHead";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Interactive360Viewer } from "@/components/shared/Interactive360Viewer";
import { Play, Eye, MapPin, Sparkles, ArrowRight, X, ChevronLeft, ChevronRight, Volume2, VolumeX, Maximize2, ZoomIn } from "lucide-react";
import { useState } from "react";

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
    longDescription: "Unser Empfangsbereich ist der erste Eindruck Ihrer Entspannungsreise. Mit gedämpftem Licht, aromatischen Düften und bequemen Sitzgelegenheiten können Sie hier ankommen und den Alltag hinter sich lassen.",
    image: roomEmpfang,
    features: ["Warmer Tee", "Entspannte Atmosphäre", "Persönliche Begrüssung"],
    ambiance: "Warm & Einladend",
  },
  {
    id: "ozean",
    name: "Ozean Suite",
    description: "Projiziertes Meeresrauschen, warmes Licht und Düfte des Meeres.",
    longDescription: "Tauchen Sie ein in die beruhigenden Wellen des Ozeans. Sanftes Meeresrauschen, projizierte Wellen an der Decke und der Duft von Meersalz und Kokosnuss schaffen eine Atmosphäre wie an einem tropischen Strand.",
    image: roomOzean,
    features: ["Meeresrauschen", "Projektion", "Meerdüfte"],
    ambiance: "Tropisch & Entspannend",
  },
  {
    id: "alpine",
    name: "Alpine Suite",
    description: "Holzelemente, Kaminfeuer-Atmosphäre und Bergkräuter-Düfte.",
    longDescription: "Fühlen Sie sich wie in einer gemütlichen Berghütte. Natürliche Holzelemente, das sanfte Knistern eines simulierten Kaminfeuers und der Duft von Bergkräutern und Zirbenholz umhüllen Sie.",
    image: roomAlpine,
    features: ["Holzatmosphäre", "Kaminfeuer", "Bergkräuter"],
    ambiance: "Geborgen & Natürlich",
  },
  {
    id: "dark",
    name: "Deep Dark Suite",
    description: "Nahezu vollständige Dunkelheit für maximale Körperwahrnehmung.",
    longDescription: "Für die intensivste Erfahrung: In nahezu vollständiger Dunkelheit werden Ihre anderen Sinne geschärft. Spüren Sie jede Berührung intensiver und lassen Sie sich vollständig fallen.",
    image: roomDark,
    features: ["Totale Dunkelheit", "Schärfere Sinne", "Tiefste Entspannung"],
    ambiance: "Intensiv & Fokussiert",
  },
  {
    id: "zen",
    name: "Zen Suite",
    description: "Minimalistisch, klar, mit sanften Räuchernoten.",
    longDescription: "Japanisch inspirierte Klarheit und Reduktion aufs Wesentliche. Minimalistisches Design, sanfte Räucherstäbchen und meditative Klänge führen Sie zu innerer Ruhe.",
    image: roomZen,
    features: ["Minimalistisch", "Räuchernoten", "Meditative Klänge"],
    ambiance: "Klar & Meditativ",
  },
  {
    id: "urban",
    name: "Urban Loft Suite",
    description: "Modern, stylish, mit urbanem Flair und Chillout-Vibes.",
    longDescription: "Für moderne Frauen, die auch bei der Entspannung nicht auf Stil verzichten. Industrial-Elemente treffen auf weiche Textilien, begleitet von entspannten Lounge-Beats.",
    image: roomUrban,
    features: ["Modern", "Stylish", "Lounge-Musik"],
    ambiance: "Urban & Cool",
  },
];

const VirtualTour = () => {
  const [selectedRoom, setSelectedRoom] = useState<typeof rooms[0] | null>(null);
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [show360Viewer, setShow360Viewer] = useState(false);
  const [viewerRoom, setViewerRoom] = useState<typeof rooms[0] | null>(null);

  const open360Viewer = (room: typeof rooms[0]) => {
    setViewerRoom(room);
    setShow360Viewer(true);
  };

  const openRoomDetail = (room: typeof rooms[0]) => {
    setSelectedRoom(room);
    setCurrentRoomIndex(rooms.findIndex(r => r.id === room.id));
  };

  const nextRoom = () => {
    const newIndex = (currentRoomIndex + 1) % rooms.length;
    setCurrentRoomIndex(newIndex);
    setSelectedRoom(rooms[newIndex]);
  };

  const prevRoom = () => {
    const newIndex = (currentRoomIndex - 1 + rooms.length) % rooms.length;
    setCurrentRoomIndex(newIndex);
    setSelectedRoom(rooms[newIndex]);
  };

  return (
    <Layout>
      <SEOHead
        title="Virtuelle Tour | GentleHands Zürich"
        description="Entdecken Sie unsere Räumlichkeiten virtuell. Ein erster Eindruck unserer atmosphärischen Suiten und des Empfangsbereichs."
        canonical="/virtual-tour"
      />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
        {/* Ambient effects */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-petrol/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-copper/5 rounded-full blur-[100px]" />
        
        <div className="container-wide relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div 
              className="flex items-center justify-center gap-4 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="h-px bg-copper/30 w-16" />
              <p className="text-copper font-medium tracking-[0.2em] uppercase text-xs">
                Einblick
              </p>
              <div className="h-px bg-copper/30 w-16" />
            </motion.div>
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
            <motion.div 
              className="relative aspect-video rounded-3xl overflow-hidden bg-secondary group cursor-pointer"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.4 }}
            >
              <img 
                src={virtualTourHero} 
                alt="GentleHands Wellness Center Übersicht"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Multi-layer overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />
              <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/30 transition-colors" />
              
              {/* Play button */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Pulse rings */}
                  <motion.div
                    className="absolute inset-0 w-24 h-24 -m-2 rounded-full border-2 border-white/30"
                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute inset-0 w-24 h-24 -m-2 rounded-full border-2 border-white/30"
                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                  
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                    <Play size={32} className="text-white ml-1" />
                  </div>
                </motion.div>
                <p className="text-white font-medium mt-4 text-lg">
                  360° Tour starten
                </p>
                <p className="text-white/70 text-sm mt-1">
                  Entdecken Sie alle Räume interaktiv
                </p>
              </div>

              {/* Controls */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <Maximize2 size={18} />
                </button>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* Room Gallery */}
      <section className="section-padding bg-secondary/30 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-copper/20 to-transparent" />
        
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center mb-12">
              <motion.div 
                className="flex items-center justify-center gap-4 mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <div className="h-px bg-copper/30 w-12" />
                <p className="text-copper font-medium tracking-[0.2em] uppercase text-xs">
                  Erkunden
                </p>
                <div className="h-px bg-copper/30 w-12" />
              </motion.div>
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
                <motion.div 
                  className="group cursor-pointer"
                  onClick={() => openRoomDetail(room)}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-card mb-4">
                    <img 
                      src={room.image} 
                      alt={room.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Hover content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.div 
                        className="w-14 h-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center mb-2"
                        initial={{ scale: 0.8 }}
                        whileHover={{ scale: 1 }}
                      >
                        <Eye size={24} className="text-white" />
                      </motion.div>
                      <span className="text-white text-sm font-medium">Details ansehen</span>
                    </div>

                    {/* Ambiance badge */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white text-xs">{room.ambiance}</span>
                    </div>
                  </div>
                  <h3 className="font-display text-lg text-foreground group-hover:text-copper transition-colors">
                    {room.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    {room.description}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Room Detail Modal */}
      <AnimatePresence>
        {selectedRoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/80 backdrop-blur-md"
            onClick={() => setSelectedRoom(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedRoom(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-foreground/10 backdrop-blur flex items-center justify-center text-foreground hover:bg-foreground/20 transition-colors"
              >
                <X size={20} />
              </button>

              {/* Navigation arrows */}
              <button
                onClick={prevRoom}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-foreground/10 backdrop-blur flex items-center justify-center text-foreground hover:bg-foreground/20 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextRoom}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-foreground/10 backdrop-blur flex items-center justify-center text-foreground hover:bg-foreground/20 transition-colors"
              >
                <ChevronRight size={20} />
              </button>

              <div className="grid md:grid-cols-2">
                {/* Image */}
                <div className="relative aspect-square md:aspect-auto">
                  <motion.img
                    key={selectedRoom.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    src={selectedRoom.image}
                    alt={selectedRoom.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent md:bg-gradient-to-r" />
                </div>

                {/* Content */}
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <motion.div
                    key={selectedRoom.id + "-content"}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <span className="text-copper text-sm font-medium tracking-wide uppercase">
                      {selectedRoom.ambiance}
                    </span>
                    <h3 className="font-display text-3xl text-foreground mt-2 mb-4">
                      {selectedRoom.name}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {selectedRoom.longDescription}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {selectedRoom.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-3 py-1 rounded-full bg-copper/10 text-copper text-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button variant="copper" asChild>
                        <Link to={`/buchung?theme=${selectedRoom.id}`}>
                          In dieser Suite buchen
                          <ArrowRight size={16} />
                        </Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setSelectedRoom(null);
                          open360Viewer(selectedRoom);
                        }}
                        className="border-copper/30 hover:border-copper/50"
                      >
                        <ZoomIn size={16} className="mr-2" />
                        360° Ansicht
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Room indicator dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {rooms.map((room, index) => (
                  <button
                    key={room.id}
                    onClick={() => {
                      setCurrentRoomIndex(index);
                      setSelectedRoom(rooms[index]);
                    }}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentRoomIndex ? "bg-copper" : "bg-foreground/20"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Features */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-copper/5 to-transparent" />
        
        <div className="container-narrow relative">
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
                <motion.div 
                  className="text-center p-8 rounded-2xl bg-card border border-border/50 hover:border-copper/30 transition-colors group"
                  whileHover={{ y: -4 }}
                >
                  <motion.div 
                    className="w-16 h-16 mx-auto rounded-2xl bg-copper/10 flex items-center justify-center mb-4 group-hover:bg-copper/20 transition-colors"
                    whileHover={{ rotate: 6 }}
                  >
                    <feature.icon size={28} className="text-copper" />
                  </motion.div>
                  <h3 className="font-display text-lg text-foreground mb-2 group-hover:text-copper transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-petrol via-petrol-dark to-petrol" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-copper rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-petrol-light rounded-full blur-[100px]" />
        </div>
        
        <div className="container-narrow text-center relative">
          <ScrollReveal>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-white mb-6">
                Bereit für den echten Besuch?
              </h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Eine virtuelle Tour kann nur einen kleinen Eindruck vermitteln.
                Erleben Sie GentleHands live – buchen Sie Ihren ersten Termin.
              </p>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button variant="secondary" size="lg" asChild className="shadow-lg">
                  <Link to="/buchung">
                    Jetzt buchen
                    <ArrowRight size={16} />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* 360° Viewer Modal */}
      <AnimatePresence>
        {show360Viewer && viewerRoom && (
          <Interactive360Viewer
            room={{
              id: viewerRoom.id,
              name: viewerRoom.name,
              image: viewerRoom.image,
            }}
            onClose={() => setShow360Viewer(false)}
          />
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default VirtualTour;
