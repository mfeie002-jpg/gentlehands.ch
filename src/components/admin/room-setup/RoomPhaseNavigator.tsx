import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Layers, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { PhaseRoomViewer, ProductMarker } from "./PhaseRoomViewer";

interface PhaseData {
  phase: number;
  phaseName: string;
  description: string;
  estimatedCost: number;
  isCurrent: boolean;
  products: ProductMarker[];
  phaseImage: string;
  completionPercentage: number;
}

interface RoomPhaseNavigatorProps {
  roomId: string;
  roomName: string;
  phases: PhaseData[];
  onProductPositionChange?: (productId: string, newPosition: { x: number; y: number }) => void;
  className?: string;
}

// Phase images per room showing progression
const phaseImages: Record<string, Record<number, string>> = {
  ozean: {
    1: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1200&h=800&fit=crop&q=80",
    2: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&h=800&fit=crop&q=80",
    3: "https://images.unsplash.com/photo-1540555700478-4be289fbec50?w=1200&h=800&fit=crop&q=80"
  },
  alpine: {
    1: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1200&h=800&fit=crop&q=80",
    2: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1200&h=800&fit=crop&q=80",
    3: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1200&h=800&fit=crop&q=80"
  },
  dark: {
    1: "https://images.unsplash.com/photo-1540555700478-4be289fbec50?w=1200&h=800&fit=crop&q=80",
    2: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=1200&h=800&fit=crop&q=80",
    3: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=800&fit=crop&q=80"
  },
  urban: {
    1: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1200&h=800&fit=crop&q=80",
    2: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1200&h=800&fit=crop&q=80",
    3: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&h=800&fit=crop&q=80"
  },
  zen: {
    1: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1200&h=800&fit=crop&q=80",
    2: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1200&h=800&fit=crop&q=80",
    3: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1200&h=800&fit=crop&q=80"
  },
  surprise: {
    1: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1200&h=800&fit=crop&q=80",
    2: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&h=800&fit=crop&q=80",
    3: "https://images.unsplash.com/photo-1540555700478-4be289fbec50?w=1200&h=800&fit=crop&q=80"
  }
};

export const RoomPhaseNavigator = ({
  roomId,
  roomName,
  phases,
  onProductPositionChange,
  className
}: RoomPhaseNavigatorProps) => {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const activePhase = phases[activePhaseIndex];
  const totalCost = phases.reduce((sum, p) => sum + p.estimatedCost, 0);

  const goToPhase = (index: number) => {
    setDirection(index > activePhaseIndex ? 1 : -1);
    setActivePhaseIndex(index);
  };

  const goToPrev = () => {
    if (activePhaseIndex > 0) {
      goToPhase(activePhaseIndex - 1);
    }
  };

  const goToNext = () => {
    if (activePhaseIndex < phases.length - 1) {
      goToPhase(activePhaseIndex + 1);
    }
  };

  const getPhaseImage = (phase: number) => {
    return phaseImages[roomId]?.[phase] || 
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&h=800&fit=crop";
  };

  if (!activePhase) return null;

  return (
    <div className={cn("space-y-4", className)}>
      {/* Phase Navigation Bar */}
      <div className="flex items-center justify-between bg-muted/50 rounded-xl p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-copper" />
            <span className="font-medium text-foreground">{roomName}</span>
          </div>
          
          <div className="hidden sm:flex items-center gap-1">
            {phases.map((phase, index) => (
              <button
                key={phase.phase}
                onClick={() => goToPhase(index)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
                  activePhaseIndex === index
                    ? "bg-copper text-white shadow-md"
                    : "bg-background hover:bg-muted text-foreground"
                )}
              >
                <span className="text-sm font-medium">Phase {phase.phase}</span>
                {phase.isCurrent && (
                  <Badge variant="secondary" className="text-xs bg-white/20 text-white border-0">
                    Aktuell
                  </Badge>
                )}
                {phase.completionPercentage === 100 && (
                  <Check className="w-4 h-4" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrev}
            disabled={activePhaseIndex === 0}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm text-muted-foreground min-w-[4rem] text-center">
            {activePhaseIndex + 1} / {phases.length}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            disabled={activePhaseIndex === phases.length - 1}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Phase Info Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="sm:col-span-2 bg-muted/30 rounded-lg p-4">
          <h3 className="font-medium text-foreground mb-1">
            Phase {activePhase.phase}: {activePhase.phaseName}
          </h3>
          <p className="text-sm text-muted-foreground">{activePhase.description}</p>
        </div>
        <div className="bg-muted/30 rounded-lg p-4">
          <p className="text-xs text-muted-foreground mb-1">Budget dieser Phase</p>
          <p className="text-xl font-bold text-copper">CHF {activePhase.estimatedCost}</p>
        </div>
        <div className="bg-muted/30 rounded-lg p-4">
          <p className="text-xs text-muted-foreground mb-1">Fortschritt</p>
          <div className="flex items-center gap-3">
            <Progress value={activePhase.completionPercentage} className="flex-1 h-2" />
            <span className="text-sm font-medium text-foreground">
              {activePhase.completionPercentage}%
            </span>
          </div>
        </div>
      </div>

      {/* Phase Image Viewer */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activePhase.phase}
          initial={{ opacity: 0, x: direction * 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -direction * 50 }}
          transition={{ duration: 0.3 }}
        >
          <PhaseRoomViewer
            roomId={roomId}
            roomName={roomName}
            phase={activePhase.phase}
            phaseName={activePhase.phaseName}
            phaseImage={getPhaseImage(activePhase.phase)}
            products={activePhase.products}
            onProductPositionChange={onProductPositionChange}
          />
        </motion.div>
      </AnimatePresence>

      {/* Phase Timeline */}
      <div className="relative flex items-center justify-between px-8 py-4 bg-muted/30 rounded-xl overflow-hidden">
        {/* Progress Line */}
        <div className="absolute left-8 right-8 top-1/2 h-1 bg-border rounded-full" />
        <motion.div
          className="absolute left-8 top-1/2 h-1 bg-copper rounded-full"
          initial={false}
          animate={{ width: `${(activePhaseIndex / (phases.length - 1)) * 100}%` }}
          transition={{ duration: 0.3 }}
        />

        {/* Phase Dots */}
        {phases.map((phase, index) => (
          <button
            key={phase.phase}
            onClick={() => goToPhase(index)}
            className={cn(
              "relative z-10 w-12 h-12 rounded-full flex flex-col items-center justify-center transition-all",
              index <= activePhaseIndex 
                ? "bg-copper text-white shadow-lg" 
                : "bg-background text-muted-foreground border-2 border-border"
            )}
          >
            <span className="text-xs font-bold">{phase.phase}</span>
            {phase.completionPercentage === 100 && (
              <Check className="w-3 h-3 absolute -bottom-0.5 -right-0.5 bg-emerald-500 text-white rounded-full p-0.5" />
            )}
          </button>
        ))}
      </div>

      {/* Total Summary */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-copper/10 to-copper/5 rounded-xl border border-copper/20">
        <div>
          <p className="text-sm text-muted-foreground">Gesamt-Budget für {roomName}</p>
          <p className="text-2xl font-bold text-copper">CHF {totalCost.toLocaleString()}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Produkte gesamt</p>
          <p className="text-xl font-bold text-foreground">
            {phases.reduce((sum, p) => sum + p.products.length, 0)} Items
          </p>
        </div>
      </div>
    </div>
  );
};
