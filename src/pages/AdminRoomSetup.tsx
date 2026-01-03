import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { 
  Waves, Mountain, Moon, Building2, Leaf, Sparkles, 
  Check, ExternalLink, ChevronDown, ChevronUp, 
  ShoppingCart, DollarSign, FileText, ArrowLeft
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface ChecklistItem {
  id: string;
  name: string;
  description?: string;
  estimatedCost: number;
  purchaseLink?: string;
  isCompleted: boolean;
  category: string;
}

interface RoomPhase {
  id: string;
  roomId: string;
  roomName: string;
  phase: number;
  phaseName: string;
  description: string;
  estimatedCost: number;
  actualCost: number;
  completionPercentage: number;
  isCurrent: boolean;
  notes: string;
  checklist: ChecklistItem[];
}

const roomIcons: Record<string, React.ReactNode> = {
  ozean: <Waves className="w-5 h-5 text-cyan-400" />,
  alpine: <Mountain className="w-5 h-5 text-amber-400" />,
  dark: <Moon className="w-5 h-5 text-purple-400" />,
  urban: <Building2 className="w-5 h-5 text-slate-400" />,
  zen: <Leaf className="w-5 h-5 text-emerald-400" />,
  surprise: <Sparkles className="w-5 h-5 text-pink-400" />
};

const roomColors: Record<string, string> = {
  ozean: "from-cyan-500/10 to-blue-600/10",
  alpine: "from-amber-500/10 to-orange-600/10",
  dark: "from-purple-500/10 to-indigo-600/10",
  urban: "from-slate-500/10 to-zinc-600/10",
  zen: "from-emerald-500/10 to-green-600/10",
  surprise: "from-pink-500/10 to-rose-600/10"
};

// Default checklist items per room and phase
const defaultChecklists: Record<string, Record<number, ChecklistItem[]>> = {
  ozean: {
    1: [
      { id: "o1-1", name: "Blaue LED-Strips", description: "5m RGB LED-Strip mit Fernbedienung", estimatedCost: 50, purchaseLink: "https://www.galaxus.ch", isCompleted: false, category: "lighting" },
      { id: "o1-2", name: "Tropische Kunstpflanzen", description: "2-3 Palmen-Pflanzen", estimatedCost: 80, purchaseLink: "https://www.ikea.ch", isCompleted: false, category: "decor" },
      { id: "o1-3", name: "Strand-Poster/Wandbild", description: "Grosses Ozean-Motiv", estimatedCost: 40, purchaseLink: "https://www.ikea.ch", isCompleted: false, category: "decor" },
      { id: "o1-4", name: "Kokos-Duftkerzen", description: "Set mit 3 Kerzen", estimatedCost: 30, purchaseLink: "https://www.galaxus.ch", isCompleted: false, category: "scent" }
    ],
    2: [
      { id: "o2-1", name: "Mini-Projektor", description: "1080p LED Projektor für Wellenanimation", estimatedCost: 200, purchaseLink: "https://www.galaxus.ch", isCompleted: false, category: "tech" },
      { id: "o2-2", name: "Premium BT-Speaker", description: "JBL oder Sonos", estimatedCost: 150, purchaseLink: "https://www.galaxus.ch", isCompleted: false, category: "sound" },
      { id: "o2-3", name: "Aroma-Diffuser", description: "Ultraschall-Diffuser mit Timer", estimatedCost: 60, purchaseLink: "https://www.galaxus.ch", isCompleted: false, category: "scent" },
      { id: "o2-4", name: "Echte Muscheln & Sand-Deko", description: "Deko-Set", estimatedCost: 90, purchaseLink: "https://www.galaxus.ch", isCompleted: false, category: "decor" }
    ],
    3: [
      { id: "o3-1", name: "4K 360° Projektor-System", description: "Professionelles Immersions-System", estimatedCost: 500, purchaseLink: "https://www.galaxus.ch", isCompleted: false, category: "tech" },
      { id: "o3-2", name: "Surround-Sound-System", description: "5.1 Kanal System", estimatedCost: 300, purchaseLink: "https://www.galaxus.ch", isCompleted: false, category: "sound" },
      { id: "o3-3", name: "Infrarot-Wärmelampe", description: "Therapeutische IR-Lampe", estimatedCost: 150, purchaseLink: "https://www.galaxus.ch", isCompleted: false, category: "wellness" },
      { id: "o3-4", name: "Profi-Aromatherapie-Station", description: "Mit mehreren Düften", estimatedCost: 50, purchaseLink: "https://www.galaxus.ch", isCompleted: false, category: "scent" }
    ]
  },
  alpine: {
    1: [
      { id: "a1-1", name: "Holzdeko-Set", description: "Rustikale Holzelemente", estimatedCost: 60, purchaseLink: "https://www.ikea.ch", isCompleted: false, category: "decor" },
      { id: "a1-2", name: "LED-Kerzen", description: "Set mit 6 Kerzen", estimatedCost: 40, purchaseLink: "https://www.ikea.ch", isCompleted: false, category: "lighting" },
      { id: "a1-3", name: "Tannen-Duftöl", description: "Natürliches Waldduft-Öl", estimatedCost: 25, purchaseLink: "https://www.galaxus.ch", isCompleted: false, category: "scent" },
      { id: "a1-4", name: "Warme Lichterketten", description: "Warmweisse LEDs", estimatedCost: 25, purchaseLink: "https://www.ikea.ch", isCompleted: false, category: "lighting" }
    ],
    2: [
      { id: "a2-1", name: "Holzwand-Panels", description: "Selbstklebende Holzpaneele 3m²", estimatedCost: 250, purchaseLink: "https://www.galaxus.ch", isCompleted: false, category: "decor" },
      { id: "a2-2", name: "Kuhfell-Teppich", description: "Echter oder Kunstfell-Teppich", estimatedCost: 150, purchaseLink: "https://www.ikea.ch", isCompleted: false, category: "decor" },
      { id: "a2-3", name: "Philips Hue Starter-Set", description: "Mit 3 Lampen und Bridge", estimatedCost: 150, purchaseLink: "https://www.galaxus.ch", isCompleted: false, category: "lighting" },
      { id: "a2-4", name: "Kaminknistern-Speaker", description: "Premium BT-Speaker", estimatedCost: 50, purchaseLink: "https://www.galaxus.ch", isCompleted: false, category: "sound" }
    ],
    3: [
      { id: "a3-1", name: "Echtholz-Wandverkleidung", description: "Professionelle Installation", estimatedCost: 600, purchaseLink: "", isCompleted: false, category: "decor" },
      { id: "a3-2", name: "Smart Home Integration", description: "Alle Geräte verbinden", estimatedCost: 200, purchaseLink: "https://www.galaxus.ch", isCompleted: false, category: "tech" },
      { id: "a3-3", name: "Hi-Fi Surround-System", description: "Premium Soundsystem", estimatedCost: 300, purchaseLink: "https://www.galaxus.ch", isCompleted: false, category: "sound" },
      { id: "a3-4", name: "Infrarot-Heizpanel", description: "Optional für extra Wärme", estimatedCost: 100, purchaseLink: "https://www.galaxus.ch", isCompleted: false, category: "wellness" }
    ]
  },
  dark: {
    1: [
      { id: "d1-1", name: "Blackout-Vorhänge", description: "Komplette Verdunkelung", estimatedCost: 40, purchaseLink: "https://www.ikea.ch", isCompleted: false, category: "decor" },
      { id: "d1-2", name: "Himalaya-Salzlampen", description: "Set mit 3 Lampen", estimatedCost: 45, purchaseLink: "https://www.galaxus.ch", isCompleted: false, category: "lighting" },
      { id: "d1-3", name: "Lavendel-Duftöl", description: "Beruhigendes Öl", estimatedCost: 15, purchaseLink: "https://www.galaxus.ch", isCompleted: false, category: "scent" }
    ],
    2: [
      { id: "d2-1", name: "Galaxie-Projektor", description: "Sternenhimmel-Projektor", estimatedCost: 80, purchaseLink: "https://www.galaxus.ch", isCompleted: false, category: "tech" },
      { id: "d2-2", name: "Akustik-Panels", description: "Schallabsorbierende Panels", estimatedCost: 150, purchaseLink: "https://www.galaxus.ch", isCompleted: false, category: "decor" },
      { id: "d2-3", name: "Dimmer-Steuerung", description: "Smart Dimmer", estimatedCost: 50, purchaseLink: "https://www.galaxus.ch", isCompleted: false, category: "lighting" },
      { id: "d2-4", name: "Binaurale Beats System", description: "Spezielle Audio-Frequenzen", estimatedCost: 120, purchaseLink: "https://www.galaxus.ch", isCompleted: false, category: "sound" }
    ],
    3: [
      { id: "d3-1", name: "Floatation-Elemente", description: "Schwerelosigkeits-Feeling", estimatedCost: 300, purchaseLink: "", isCompleted: false, category: "wellness" },
      { id: "d3-2", name: "Körperschall-System", description: "Integriert in Liege", estimatedCost: 350, purchaseLink: "", isCompleted: false, category: "sound" },
      { id: "d3-3", name: "App-Lichtsteuerung", description: "Vollautomatisierung", estimatedCost: 100, purchaseLink: "https://www.galaxus.ch", isCompleted: false, category: "tech" },
      { id: "d3-4", name: "Aurora-Projektion", description: "Nordlicht-Effekte", estimatedCost: 50, purchaseLink: "https://www.galaxus.ch", isCompleted: false, category: "tech" }
    ]
  },
  urban: {
    1: [
      { id: "u1-1", name: "Industrial-Deko", description: "Metallische Deko-Elemente", estimatedCost: 80, purchaseLink: "https://www.ikea.ch", isCompleted: false, category: "decor" },
      { id: "u1-2", name: "LED-Spotlights", description: "Gerichtete Beleuchtung", estimatedCost: 60, purchaseLink: "https://www.ikea.ch", isCompleted: false, category: "lighting" },
      { id: "u1-3", name: "Sandelholz-Duft", description: "Premium Duftöl", estimatedCost: 30, purchaseLink: "https://www.galaxus.ch", isCompleted: false, category: "scent" },
      { id: "u1-4", name: "Moderne Akzente", description: "Zeitgenössische Deko", estimatedCost: 30, purchaseLink: "https://www.ikea.ch", isCompleted: false, category: "decor" }
    ],
    2: [
      { id: "u2-1", name: "Beton-Wandpanels", description: "Betonoptik-Panels", estimatedCost: 200, purchaseLink: "https://www.galaxus.ch", isCompleted: false, category: "decor" },
      { id: "u2-2", name: "Smart RGB-LED System", description: "Philips Hue oder ähnlich", estimatedCost: 150, purchaseLink: "https://www.galaxus.ch", isCompleted: false, category: "lighting" },
      { id: "u2-3", name: "Premium BT-Speaker", description: "Marshall oder JBL", estimatedCost: 150, purchaseLink: "https://www.galaxus.ch", isCompleted: false, category: "sound" },
      { id: "u2-4", name: "Indoor-Pflanzen", description: "Moderne Pflanzentöpfe", estimatedCost: 100, purchaseLink: "https://www.ikea.ch", isCompleted: false, category: "decor" }
    ],
    3: [
      { id: "u3-1", name: "Designer-Möbel", description: "Hochwertige Sitzmöbel", estimatedCost: 400, purchaseLink: "", isCompleted: false, category: "decor" },
      { id: "u3-2", name: "B&O Sound-System", description: "Bang & Olufsen Premium", estimatedCost: 400, purchaseLink: "https://www.galaxus.ch", isCompleted: false, category: "sound" },
      { id: "u3-3", name: "Kinetic Light Installation", description: "Bewegliche Lichtkunst", estimatedCost: 150, purchaseLink: "", isCompleted: false, category: "lighting" },
      { id: "u3-4", name: "Espresso-Ecke", description: "Hochwertige Kaffeemaschine", estimatedCost: 50, purchaseLink: "https://www.galaxus.ch", isCompleted: false, category: "extra" }
    ]
  },
  zen: {
    1: [
      { id: "z1-1", name: "Bambus-Deko", description: "Bambus-Elemente", estimatedCost: 50, purchaseLink: "https://www.ikea.ch", isCompleted: false, category: "decor" },
      { id: "z1-2", name: "Papierlampen", description: "Japanische Reispapierlampen", estimatedCost: 40, purchaseLink: "https://www.ikea.ch", isCompleted: false, category: "lighting" },
      { id: "z1-3", name: "Räucherstäbchen-Set", description: "Premium Räucherwerk", estimatedCost: 30, purchaseLink: "https://www.galaxus.ch", isCompleted: false, category: "scent" },
      { id: "z1-4", name: "Zen-Steine", description: "Dekorative Steine", estimatedCost: 30, purchaseLink: "https://www.galaxus.ch", isCompleted: false, category: "decor" }
    ],
    2: [
      { id: "z2-1", name: "Bambus-Brunnen", description: "Indoor-Wasserbrunnen", estimatedCost: 150, purchaseLink: "https://www.galaxus.ch", isCompleted: false, category: "decor" },
      { id: "z2-2", name: "Japanische Laternen", description: "Authentische Papierlampen", estimatedCost: 80, purchaseLink: "https://www.galaxus.ch", isCompleted: false, category: "lighting" },
      { id: "z2-3", name: "Echte Klangschalen", description: "Set mit 3 Schalen", estimatedCost: 150, purchaseLink: "https://www.galaxus.ch", isCompleted: false, category: "sound" },
      { id: "z2-4", name: "Mini Zen-Garten", description: "Mit Sand und Steinen", estimatedCost: 60, purchaseLink: "https://www.galaxus.ch", isCompleted: false, category: "decor" },
      { id: "z2-5", name: "Bonsai-Pflanzen", description: "2 kleine Bonsais", estimatedCost: 60, purchaseLink: "https://www.galaxus.ch", isCompleted: false, category: "decor" }
    ],
    3: [
      { id: "z3-1", name: "Tatami-Bodenmatten", description: "Authentische Tatami", estimatedCost: 400, purchaseLink: "", isCompleted: false, category: "decor" },
      { id: "z3-2", name: "Shoji-Trennwände", description: "Japanische Raumteiler", estimatedCost: 300, purchaseLink: "", isCompleted: false, category: "decor" },
      { id: "z3-3", name: "Koto-Musik-System", description: "Traditionelle japanische Musik", estimatedCost: 100, purchaseLink: "https://www.galaxus.ch", isCompleted: false, category: "sound" },
      { id: "z3-4", name: "Matcha-Ecke", description: "Tee-Zeremonie Set", estimatedCost: 150, purchaseLink: "https://www.galaxus.ch", isCompleted: false, category: "extra" },
      { id: "z3-5", name: "Premium Bonsai", description: "Grosser Bonsai-Baum", estimatedCost: 50, purchaseLink: "https://www.galaxus.ch", isCompleted: false, category: "decor" }
    ]
  },
  surprise: {
    1: [
      { id: "s1-1", name: "Multi-Themen-Deko-Set", description: "Elemente aller Themen", estimatedCost: 150, purchaseLink: "https://www.ikea.ch", isCompleted: false, category: "decor" },
      { id: "s1-2", name: "Flexible RGB-Beleuchtung", description: "Farbwechsel-System", estimatedCost: 100, purchaseLink: "https://www.galaxus.ch", isCompleted: false, category: "lighting" },
      { id: "s1-3", name: "Wechsel-Duft-Set", description: "Verschiedene Düfte", estimatedCost: 50, purchaseLink: "https://www.galaxus.ch", isCompleted: false, category: "scent" }
    ],
    2: [
      { id: "s2-1", name: "Grosse Projektionsfläche", description: "Motorisierte Leinwand", estimatedCost: 250, purchaseLink: "https://www.galaxus.ch", isCompleted: false, category: "tech" },
      { id: "s2-2", name: "Smart-Licht-Zonen", description: "Mehrere Zonen steuerbar", estimatedCost: 200, purchaseLink: "https://www.galaxus.ch", isCompleted: false, category: "lighting" },
      { id: "s2-3", name: "Multi-Zone Audio", description: "Mehrkanal-Soundsystem", estimatedCost: 200, purchaseLink: "https://www.galaxus.ch", isCompleted: false, category: "sound" },
      { id: "s2-4", name: "Modular-Deko-System", description: "Schnell wechselbar", estimatedCost: 50, purchaseLink: "https://www.ikea.ch", isCompleted: false, category: "decor" }
    ],
    3: [
      { id: "s3-1", name: "360° Projektions-System", description: "Rundum-Immersion", estimatedCost: 700, purchaseLink: "", isCompleted: false, category: "tech" },
      { id: "s3-2", name: "iPad-Steuerung", description: "Zentrale Raumkontrolle", estimatedCost: 400, purchaseLink: "https://www.galaxus.ch", isCompleted: false, category: "tech" },
      { id: "s3-3", name: "Full Automation System", description: "HomeKit/KNX Integration", estimatedCost: 300, purchaseLink: "", isCompleted: false, category: "tech" },
      { id: "s3-4", name: "Sensorik-System", description: "Bewegungs- und Lichtsensoren", estimatedCost: 100, purchaseLink: "https://www.galaxus.ch", isCompleted: false, category: "tech" }
    ]
  }
};

const AdminRoomSetup = () => {
  const [roomPhases, setRoomPhases] = useState<RoomPhase[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedRooms, setExpandedRooms] = useState<string[]>(["ozean"]);

  useEffect(() => {
    fetchRoomPhases();
  }, []);

  const fetchRoomPhases = async () => {
    try {
      const { data, error } = await supabase
        .from("room_phases")
        .select("*")
        .order("room_id")
        .order("phase");

      if (error) throw error;

      // Map database data to our format with default checklists
      const phases: RoomPhase[] = (data || []).map((phase: any) => ({
        id: phase.id,
        roomId: phase.room_id,
        roomName: phase.room_name,
        phase: phase.phase,
        phaseName: phase.phase_name,
        description: phase.description || "",
        estimatedCost: phase.estimated_cost || 0,
        actualCost: phase.actual_cost || 0,
        completionPercentage: phase.completion_percentage || 0,
        isCurrent: phase.is_current || false,
        notes: phase.notes || "",
        checklist: defaultChecklists[phase.room_id]?.[phase.phase] || []
      }));

      setRoomPhases(phases);
    } catch (error) {
      console.error("Error fetching room phases:", error);
      toast.error("Fehler beim Laden der Raum-Daten");
    } finally {
      setLoading(false);
    }
  };

  const toggleRoom = (roomId: string) => {
    setExpandedRooms(prev => 
      prev.includes(roomId) 
        ? prev.filter(id => id !== roomId)
        : [...prev, roomId]
    );
  };

  const getRoomPhases = (roomId: string) => {
    return roomPhases.filter(p => p.roomId === roomId);
  };

  const getUniqueRooms = () => {
    const rooms = new Map<string, { id: string; name: string }>();
    roomPhases.forEach(phase => {
      if (!rooms.has(phase.roomId)) {
        rooms.set(phase.roomId, { id: phase.roomId, name: phase.roomName });
      }
    });
    return Array.from(rooms.values());
  };

  const calculateTotalBudget = () => {
    return roomPhases.reduce((sum, phase) => sum + phase.estimatedCost, 0);
  };

  const calculateCompletedItems = () => {
    let completed = 0;
    let total = 0;
    roomPhases.forEach(phase => {
      phase.checklist.forEach(item => {
        total++;
        if (item.isCompleted) completed++;
      });
    });
    return { completed, total };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-copper" />
      </div>
    );
  }

  const uniqueRooms = getUniqueRooms();
  const totalBudget = calculateTotalBudget();
  const { completed, total } = calculateCompletedItems();

  return (
    <>
      <Helmet>
        <title>Raum-Setup Admin | Seelenstein</title>
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <Button variant="ghost" size="sm" className="mb-4 gap-2" asChild>
              <Link to="/admin">
                <ArrowLeft className="w-4 h-4" />
                Zurück zum Admin
              </Link>
            </Button>
            <h1 className="text-3xl font-serif text-foreground mb-2">
              Raum-Setup Übersicht
            </h1>
            <p className="text-muted-foreground">
              Verwalte den Aufbau aller 6 Themenräume in 3 Phasen
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-copper/10">
                    <DollarSign className="w-6 h-6 text-copper" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Gesamt-Budget</p>
                    <p className="text-2xl font-bold text-foreground">CHF {totalBudget.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-emerald-500/10">
                    <Check className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Erledigte Items</p>
                    <p className="text-2xl font-bold text-foreground">{completed} / {total}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-blue-500/10">
                    <FileText className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Räume / Phasen</p>
                    <p className="text-2xl font-bold text-foreground">{uniqueRooms.length} / {roomPhases.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Room Cards */}
          <div className="space-y-6">
            {uniqueRooms.map((room) => {
              const phases = getRoomPhases(room.id);
              const isExpanded = expandedRooms.includes(room.id);
              const roomTotalCost = phases.reduce((sum, p) => sum + p.estimatedCost, 0);
              const currentPhase = phases.find(p => p.isCurrent);

              return (
                <Card key={room.id} className={`bg-gradient-to-br ${roomColors[room.id]} border-0 overflow-hidden`}>
                  <Collapsible open={isExpanded} onOpenChange={() => toggleRoom(room.id)}>
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-black/5 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            {roomIcons[room.id]}
                            <div>
                              <CardTitle className="text-foreground">{room.name}</CardTitle>
                              <p className="text-sm text-muted-foreground">
                                {currentPhase ? `Aktuell: Phase ${currentPhase.phase} (${currentPhase.phaseName})` : "Noch nicht gestartet"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <Badge variant="outline" className="text-copper border-copper/30">
                              CHF {roomTotalCost}
                            </Badge>
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-muted-foreground" />
                            )}
                          </div>
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <CardContent className="pt-0 space-y-6">
                        {phases.map((phase) => (
                          <motion.div
                            key={phase.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-6 rounded-lg bg-background/50 backdrop-blur"
                          >
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <h3 className="font-medium text-foreground">
                                  Phase {phase.phase}: {phase.phaseName}
                                </h3>
                                {phase.isCurrent && (
                                  <Badge className="bg-copper text-white">Aktuell</Badge>
                                )}
                              </div>
                              <Badge variant="secondary">CHF {phase.estimatedCost}</Badge>
                            </div>

                            <p className="text-sm text-muted-foreground mb-4">
                              {phase.description}
                            </p>

                            {/* Checklist */}
                            <div className="space-y-3 mb-4">
                              <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                                <ShoppingCart className="w-4 h-4" />
                                Einkaufsliste
                              </h4>
                              {phase.checklist.map((item) => (
                                <div
                                  key={item.id}
                                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                                >
                                  <Checkbox
                                    id={item.id}
                                    checked={item.isCompleted}
                                    className="mt-0.5"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <label
                                      htmlFor={item.id}
                                      className={`text-sm font-medium cursor-pointer ${
                                        item.isCompleted ? "line-through text-muted-foreground" : "text-foreground"
                                      }`}
                                    >
                                      {item.name}
                                    </label>
                                    {item.description && (
                                      <p className="text-xs text-muted-foreground">{item.description}</p>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2 shrink-0">
                                    <span className="text-sm text-muted-foreground">
                                      CHF {item.estimatedCost}
                                    </span>
                                    {item.purchaseLink && (
                                      <Button size="icon" variant="ghost" className="h-6 w-6" asChild>
                                        <a href={item.purchaseLink} target="_blank" rel="noopener noreferrer">
                                          <ExternalLink className="w-3 h-3" />
                                        </a>
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Notes */}
                            <div>
                              <h4 className="text-sm font-medium text-foreground mb-2">Notizen</h4>
                              <Textarea
                                placeholder="Notizen zu dieser Phase..."
                                className="resize-none bg-background/50"
                                rows={2}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              );
            })}
          </div>

          {/* Quick Links */}
          <div className="mt-12 text-center">
            <Button className="bg-copper hover:bg-copper/90" asChild>
              <Link to="/raumwelten">Zur öffentlichen Raumwelten-Seite</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default AdminRoomSetup;
