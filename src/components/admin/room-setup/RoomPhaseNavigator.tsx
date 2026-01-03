import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Layers, Check, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { PhaseRoomViewer, ProductMarker } from "./PhaseRoomViewer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Import AI-generated room images
import ozeanRoom from "@/assets/rooms/ozean-room.jpg";
import alpineRoom from "@/assets/rooms/alpine-room.jpg";
import darkRoom from "@/assets/rooms/dark-room.jpg";
import zenRoom from "@/assets/rooms/zen-room.jpg";
import urbanRoom from "@/assets/rooms/urban-room.jpg";
import surpriseRoom from "@/assets/rooms/surprise-room.jpg";

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
  onSavePositions?: () => void;
  className?: string;
}

// AI-generated room images per room theme
const roomImages: Record<string, string> = {
  ozean: ozeanRoom,
  alpine: alpineRoom,
  dark: darkRoom,
  urban: urbanRoom,
  zen: zenRoom,
  surprise: surpriseRoom
};

// Fixed massage table position - always in center of room
const MASSAGE_TABLE_MARKER: ProductMarker = {
  id: "massage-table-base",
  name: "Massage-Liege",
  description: "Professionelle schwarze Leder-Massageliege - bereits vorhanden",
  position: { x: 50, y: 55 },
  estimatedCost: 0,
  category: "basis",
  isCompleted: true,
  isFixed: true,
  imageUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=200&h=200&fit=crop"
};

export const RoomPhaseNavigator = ({
  roomId,
  roomName,
  phases,
  onProductPositionChange,
  onSavePositions,
  className
}: RoomPhaseNavigatorProps) => {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

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

  const getRoomImage = () => {
    return roomImages[roomId] || ozeanRoom;
  };

  // Combine products with fixed massage table
  const getProductsWithBase = (products: ProductMarker[]): ProductMarker[] => {
    return [MASSAGE_TABLE_MARKER, ...products];
  };

  const handlePositionChange = (productId: string, newPosition: { x: number; y: number }) => {
    // Don't allow moving the fixed massage table
    if (productId === MASSAGE_TABLE_MARKER.id) return;
    
    setHasUnsavedChanges(true);
    onProductPositionChange?.(productId, newPosition);
  };

  const handleSavePositions = async () => {
    setIsSaving(true);
    try {
      // Get all products with their positions
      const allProducts = phases.flatMap(phase => phase.products);
      
      // Save to database
      for (const product of allProducts) {
        if (product.position) {
          await supabase
            .from("room_setup_checklist")
            .update({
              position_x: product.position.x,
              position_y: product.position.y
            })
            .eq("id", product.id);
        }
      }
      
      setHasUnsavedChanges(false);
      toast.success("Positionen gespeichert!");
      onSavePositions?.();
    } catch (error) {
      console.error("Error saving positions:", error);
      toast.error("Fehler beim Speichern");
    } finally {
      setIsSaving(false);
    }
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
          {hasUnsavedChanges && (
            <Button
              variant="default"
              size="sm"
              onClick={handleSavePositions}
              disabled={isSaving}
              className="bg-copper hover:bg-copper/90 gap-1.5"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Speichern
            </Button>
          )}
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

      {/* Phase Image Viewer with AI-generated room */}
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
            phaseImage={getRoomImage()}
            products={getProductsWithBase(activePhase.products)}
            onProductPositionChange={handlePositionChange}
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

      {/* Fixed Element Legend */}
      <div className="flex items-center gap-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
        <div className="w-4 h-4 rounded-full bg-amber-500 ring-2 ring-amber-500/50" />
        <p className="text-sm text-amber-700 dark:text-amber-300">
          <strong>Massage-Liege</strong> ist als Basis-Element fixiert und kann nicht verschoben werden
        </p>
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
