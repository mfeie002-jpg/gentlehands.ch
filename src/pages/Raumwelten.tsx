import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Waves, Mountain, Moon, Building2, Leaf, Sparkles, ChevronLeft, ChevronRight, ExternalLink, Check } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LazyImage } from "@/components/shared/LazyImage";
import { Link } from "react-router-dom";

// Import room images
import ozeanPhase1 from "@/assets/rooms/ozean-phase1.jpg";
import ozeanPhase2 from "@/assets/rooms/ozean-phase2.jpg";
import ozeanPhase3 from "@/assets/rooms/ozean-phase3.jpg";
import alpinePhase1 from "@/assets/rooms/alpine-phase1.jpg";
import alpinePhase2 from "@/assets/rooms/alpine-phase2.jpg";
import alpinePhase3 from "@/assets/rooms/alpine-phase3.jpg";
import darkPhase1 from "@/assets/rooms/dark-phase1.jpg";
import darkPhase2 from "@/assets/rooms/dark-phase2.jpg";
import darkPhase3 from "@/assets/rooms/dark-phase3.jpg";
import urbanPhase1 from "@/assets/rooms/urban-phase1.jpg";
import urbanPhase2 from "@/assets/rooms/urban-phase2.jpg";
import urbanPhase3 from "@/assets/rooms/urban-phase3.jpg";
import zenPhase1 from "@/assets/rooms/zen-phase1.jpg";
import zenPhase2 from "@/assets/rooms/zen-phase2.jpg";
import zenPhase3 from "@/assets/rooms/zen-phase3.jpg";
import surprisePhase1 from "@/assets/rooms/surprise-phase1.jpg";
import surprisePhase2 from "@/assets/rooms/surprise-phase2.jpg";
import surprisePhase3 from "@/assets/rooms/surprise-phase3.jpg";

interface RoomData {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  phases: {
    name: string;
    description: string;
    image: string;
    equipment: string[];
    cost: number;
    isCurrent?: boolean;
  }[];
}

const rooms: RoomData[] = [
  {
    id: "ozean",
    name: "Ozean & Palmen",
    icon: <Waves className="w-5 h-5" />,
    color: "text-cyan-400",
    gradient: "from-cyan-500/20 to-blue-600/20",
    phases: [
      {
        name: "Basic",
        description: "Grundausstattung mit Premium-Liege, blauen LED-Akzenten und Strand-Atmosphäre",
        image: ozeanPhase1,
        equipment: ["Premium-Liege mit Kamin", "Blaue LED-Strips", "Tropische Pflanzen", "Strand-Poster", "Kokos-Kerzen"],
        cost: 200,
        isCurrent: true
      },
      {
        name: "Standard",
        description: "Projektor mit Wellenanimation, hochwertigere Beleuchtung und Sound",
        image: ozeanPhase2,
        equipment: ["Mini-Projektor", "RGB LED-System", "Premium BT-Speaker", "Aroma-Diffuser", "Sand & Muschel-Deko"],
        cost: 500
      },
      {
        name: "Premium",
        description: "360-Grad Immersion mit Surround-Sound und Profi-Wellness-Setup",
        image: ozeanPhase3,
        equipment: ["4K 360°-Projektion", "Surround-Sound-System", "Profi-Aromatherapie", "Infrarot-Wärmelampe", "Echte Sand-Elemente"],
        cost: 1000
      }
    ]
  },
  {
    id: "alpine",
    name: "Alpine Stille",
    icon: <Mountain className="w-5 h-5" />,
    color: "text-amber-400",
    gradient: "from-amber-500/20 to-orange-600/20",
    phases: [
      {
        name: "Basic",
        description: "Holzdeko, LED-Kerzen und warme Beleuchtung mit Kamin-Liege",
        image: alpinePhase1,
        equipment: ["Premium-Liege mit Kamin", "Rustikale Holzdeko", "LED-Kerzen", "Tannen-Duft", "Warme Beleuchtung"],
        cost: 150,
        isCurrent: true
      },
      {
        name: "Standard",
        description: "Holzwand-Panels, Kuhfell-Elemente und Philips Hue Lichtsteuerung",
        image: alpinePhase2,
        equipment: ["Holzwand-Panels", "Kuhfell-Teppich", "Philips Hue System", "Kamin-Sound-Speaker", "Geweih-Deko"],
        cost: 600
      },
      {
        name: "Premium",
        description: "Echte Holzverkleidung, Smart Home Steuerung und Hi-Fi Sound",
        image: alpinePhase3,
        equipment: ["Echtholz-Verkleidung", "Smart Home Integration", "Hi-Fi Surround", "Optionale Infrarot-Heizung", "Designer-Möbel"],
        cost: 1200
      }
    ]
  },
  {
    id: "dark",
    name: "Deep Dark Relax",
    icon: <Moon className="w-5 h-5" />,
    color: "text-purple-400",
    gradient: "from-purple-500/20 to-indigo-600/20",
    phases: [
      {
        name: "Basic",
        description: "Blackout-Vorhänge, Salzlampen und minimalistisches Setup",
        image: darkPhase1,
        equipment: ["Premium-Liege mit Kamin", "Blackout-Vorhänge", "Himalaya-Salzlampen", "Lavendel-Duft", "Minimal-Sound"],
        cost: 100,
        isCurrent: true
      },
      {
        name: "Standard",
        description: "Sternenhimmel-Projektor, Akustik-Panels und Vibrations-System",
        image: darkPhase2,
        equipment: ["Galaxie-Projektor", "Akustik-Panels", "Dimmer-Steuerung", "Vibrations-Modul", "Binaurale Beats"],
        cost: 400
      },
      {
        name: "Premium",
        description: "Float-Elemente, Körperschall-Liege und App-Steuerung",
        image: darkPhase3,
        equipment: ["Floatation-Elemente", "Körperschall-System", "App-Lichtsteuerung", "Aurora-Projektion", "Sensorik-Integration"],
        cost: 800
      }
    ]
  },
  {
    id: "urban",
    name: "Urban Loft",
    icon: <Building2 className="w-5 h-5" />,
    color: "text-slate-400",
    gradient: "from-slate-500/20 to-zinc-600/20",
    phases: [
      {
        name: "Basic",
        description: "Industrial-Deko, LED-Spots und moderne Akzente",
        image: urbanPhase1,
        equipment: ["Premium-Liege mit Kamin", "Industrial-Deko", "LED-Spotlights", "Sandelholz-Duft", "Moderne Akzente"],
        cost: 200,
        isCurrent: true
      },
      {
        name: "Standard",
        description: "Beton-Panels, Smart-LEDs und Premium-Speaker",
        image: urbanPhase2,
        equipment: ["Beton-Wandpanels", "Smart RGB-LEDs", "Premium BT-Speaker", "Indoor-Pflanzen", "Industrial-Lampen"],
        cost: 600
      },
      {
        name: "Premium",
        description: "Designer-Möbel, B&O Sound und Espresso-Ecke",
        image: urbanPhase3,
        equipment: ["Designer-Möbel", "B&O Sound-System", "Kinetic Lights", "Espresso-Ecke", "Premium Materials"],
        cost: 1000
      }
    ]
  },
  {
    id: "zen",
    name: "Zen Garden",
    icon: <Leaf className="w-5 h-5" />,
    color: "text-emerald-400",
    gradient: "from-emerald-500/20 to-green-600/20",
    phases: [
      {
        name: "Basic",
        description: "Bambus-Elemente, warme Lampen und Räucherstäbchen",
        image: zenPhase1,
        equipment: ["Premium-Liege mit Kamin", "Bambus-Deko", "Papierlampen", "Räucherstäbchen", "Zen-Atmosphäre"],
        cost: 150,
        isCurrent: true
      },
      {
        name: "Standard",
        description: "Mini-Brunnen, Papierlampen und echte Klangschalen",
        image: zenPhase2,
        equipment: ["Bambus-Brunnen", "Japanische Laternen", "Echte Klangschalen", "Zen-Steingarten", "Bonsai-Pflanzen"],
        cost: 500
      },
      {
        name: "Premium",
        description: "Tatami-Matten, Shoji-Wände und Matcha-Ecke",
        image: zenPhase3,
        equipment: ["Tatami-Boden", "Shoji-Trennwände", "Koto-Musik-System", "Matcha-Ecke", "Premium Bonsai"],
        cost: 1000
      }
    ]
  },
  {
    id: "surprise",
    name: "Surprise Experience",
    icon: <Sparkles className="w-5 h-5" />,
    color: "text-pink-400",
    gradient: "from-pink-500/20 to-rose-600/20",
    phases: [
      {
        name: "Basic",
        description: "Flexible Basis-Elemente aller Themen kombiniert",
        image: surprisePhase1,
        equipment: ["Premium-Liege mit Kamin", "Multi-Themen-Deko", "Flexible Beleuchtung", "Wechsel-Düfte", "Basis-Sound"],
        cost: 300,
        isCurrent: true
      },
      {
        name: "Standard",
        description: "Multi-Projektion und Smart-Steuerung für Themenwechsel",
        image: surprisePhase2,
        equipment: ["Grosse Projektionsfläche", "Smart-Licht-Zonen", "Multi-Zone Audio", "Themen-Switching", "Modular-Deko"],
        cost: 700
      },
      {
        name: "Premium",
        description: "Vollständig transformierbarer Raum per iPad-App",
        image: surprisePhase3,
        equipment: ["360° Projektion", "iPad-Steuerung", "Full Automation", "Sensorik-System", "Instant-Transformation"],
        cost: 1500
      }
    ]
  }
];

const Raumwelten = () => {
  const [selectedRoom, setSelectedRoom] = useState<string>("ozean");
  const [selectedPhase, setSelectedPhase] = useState<number>(0);

  const currentRoom = rooms.find(r => r.id === selectedRoom) || rooms[0];

  const handlePrevRoom = () => {
    const currentIndex = rooms.findIndex(r => r.id === selectedRoom);
    const prevIndex = currentIndex === 0 ? rooms.length - 1 : currentIndex - 1;
    setSelectedRoom(rooms[prevIndex].id);
    setSelectedPhase(0);
  };

  const handleNextRoom = () => {
    const currentIndex = rooms.findIndex(r => r.id === selectedRoom);
    const nextIndex = currentIndex === rooms.length - 1 ? 0 : currentIndex + 1;
    setSelectedRoom(rooms[nextIndex].id);
    setSelectedPhase(0);
  };

  return (
    <>
      <Helmet>
        <title>Raumwelten – Unsere Wellness-Räume in Entwicklung | Seelenstein</title>
        <meta name="description" content="Entdecken Sie unsere 6 einzigartigen Themenräume und ihre Entwicklung vom Basic-Setup bis zur Premium-Wellness-Oase." />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <Badge variant="outline" className="mb-4 border-copper/30 text-copper">
                In Entwicklung
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground mb-6">
                Unsere Raumwelten
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Erleben Sie die Evolution unserer 6 einzigartigen Themenräume – 
                von der ersten Vision bis zur perfekten Wellness-Oase.
              </p>
            </motion.div>

            {/* Room Selector */}
            <div className="flex flex-wrap justify-center gap-3 mt-12">
              {rooms.map((room) => (
                <Button
                  key={room.id}
                  variant={selectedRoom === room.id ? "default" : "outline"}
                  onClick={() => {
                    setSelectedRoom(room.id);
                    setSelectedPhase(0);
                  }}
                  className={`gap-2 ${selectedRoom === room.id ? "bg-copper hover:bg-copper/90" : ""}`}
                >
                  <span className={room.color}>{room.icon}</span>
                  <span className="hidden sm:inline">{room.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Room Detail Section */}
        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <Button variant="ghost" size="icon" onClick={handlePrevRoom}>
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <motion.div
                key={currentRoom.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className={`inline-flex items-center gap-3 mb-2 ${currentRoom.color}`}>
                  {currentRoom.icon}
                  <h2 className="text-3xl font-serif text-foreground">{currentRoom.name}</h2>
                </div>
              </motion.div>
              <Button variant="ghost" size="icon" onClick={handleNextRoom}>
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>

            {/* Phase Tabs */}
            <Tabs value={String(selectedPhase)} onValueChange={(v) => setSelectedPhase(Number(v))} className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
                {currentRoom.phases.map((phase, index) => (
                  <TabsTrigger 
                    key={index} 
                    value={String(index)}
                    className="relative"
                  >
                    {phase.name}
                    {phase.isCurrent && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-copper rounded-full" />
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>

              <AnimatePresence mode="wait">
                {currentRoom.phases.map((phase, index) => (
                  <TabsContent key={index} value={String(index)} className="mt-0">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="grid lg:grid-cols-2 gap-8 items-start"
                    >
                      {/* Image */}
                      <div className="relative rounded-2xl overflow-hidden aspect-video">
                        <LazyImage
                          src={phase.image}
                          alt={`${currentRoom.name} - ${phase.name}`}
                          className="w-full h-full object-cover"
                        />
                        {phase.isCurrent && (
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-copper text-white">
                              <Check className="w-3 h-3 mr-1" />
                              Aktueller Stand
                            </Badge>
                          </div>
                        )}
                        <div className="absolute bottom-4 right-4">
                          <Badge variant="secondary" className="bg-background/80 backdrop-blur">
                            Phase {index + 1} von 3
                          </Badge>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="space-y-6">
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="text-2xl font-serif text-foreground">
                              Phase {index + 1}: {phase.name}
                            </h3>
                            <Badge variant="outline" className="text-copper border-copper/30">
                              CHF {phase.cost}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground">
                            {phase.description}
                          </p>
                        </div>

                        <Card className={`bg-gradient-to-br ${currentRoom.gradient} border-0`}>
                          <CardContent className="p-6">
                            <h4 className="font-medium text-foreground mb-4">Ausstattung in dieser Phase:</h4>
                            <ul className="space-y-2">
                              {phase.equipment.map((item, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Check className={`w-4 h-4 ${currentRoom.color}`} />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>

                        {/* Progress indicator */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Entwicklungsfortschritt</span>
                            <span className="text-foreground font-medium">
                              {phase.isCurrent ? "In Umsetzung" : index === 0 ? "Geplant" : "Zukünftig"}
                            </span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: phase.isCurrent ? "100%" : "0%" }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                              className="h-full bg-copper rounded-full"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </TabsContent>
                ))}
              </AnimatePresence>
            </Tabs>
          </div>
        </section>

        {/* Equipment Highlight */}
        <section className="py-12 lg:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-serif text-foreground mb-4">
                  Unser Herzstück
                </h2>
                <p className="text-muted-foreground">
                  Die Premium-Behandlungsliege mit integriertem LED-Kamin bildet das Zentrum jedes Raums
                </p>
              </div>

              <Card className="overflow-hidden border-copper/20">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2">
                    <div className="aspect-square md:aspect-auto">
                      <LazyImage
                        src={ozeanPhase1}
                        alt="Premium Behandlungsliege mit Kamin"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <Badge className="w-fit mb-4 bg-copper/10 text-copper border-0">
                        Bereits vorhanden
                      </Badge>
                      <h3 className="text-2xl font-serif text-foreground mb-4">
                        Premium Behandlungsliege
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Mit integriertem LED-Kamin und Heizfunktion – 
                        das perfekte Fundament für jedes Wellness-Erlebnis.
                      </p>
                      <ul className="space-y-2 mb-6">
                        {[
                          "Integrierter LED-Kamineffekt",
                          "Elektrische Heizfunktion",
                          "Höhenverstellbar",
                          "Premium Polsterung",
                          "Hygienisch & pflegeleicht"
                        ].map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Check className="w-4 h-4 text-copper" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button variant="outline" className="w-fit gap-2" asChild>
                        <a 
                          href="https://www.kosmetikfriseurmassage.de/en/massage-wellness/treatment-tables/behandlungsliege-kosmetikliege-mit-heizung-und-kamin-002342h-897a" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          Produkt ansehen
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Budget Overview */}
        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif text-foreground mb-4">
                Investitions-Übersicht
              </h2>
              <p className="text-muted-foreground">
                Geschätzte Kosten pro Raum und Phase (Liege bereits vorhanden)
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {rooms.map((room) => {
                const totalCost = room.phases.reduce((sum, p) => sum + p.cost, 0);
                return (
                  <Card key={room.id} className={`bg-gradient-to-br ${room.gradient} border-0`}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className={room.color}>{room.icon}</span>
                        <h3 className="font-serif text-foreground">{room.name}</h3>
                      </div>
                      <div className="space-y-2 mb-4">
                        {room.phases.map((phase, i) => (
                          <div key={i} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{phase.name}</span>
                            <span className="text-foreground">CHF {phase.cost}</span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-4 border-t border-border/50">
                        <div className="flex justify-between font-medium">
                          <span className="text-foreground">Total</span>
                          <span className="text-copper">CHF {totalCost}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 lg:py-20 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-serif text-foreground mb-4">
              Erleben Sie unsere Räume
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Buchen Sie jetzt Ihre Massage und entdecken Sie unsere Themenräume – 
              wir entwickeln sie kontinuierlich weiter für Ihr ultimatives Wellness-Erlebnis.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-copper hover:bg-copper/90" asChild>
                <Link to="/buchung">Jetzt buchen</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/erlebnisse">Alle Erlebnisse</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Raumwelten;
