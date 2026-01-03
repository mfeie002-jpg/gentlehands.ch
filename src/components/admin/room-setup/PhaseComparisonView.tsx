import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Columns3, Maximize2, X, Check, 
  ChevronDown, ZoomIn, Package, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// Import phase-specific progression images
import phase1Minimal from "@/assets/rooms/phase1-minimal.jpg";
import phase2Developing from "@/assets/rooms/phase2-developing.jpg";
import phase3Complete from "@/assets/rooms/phase3-complete.jpg";

interface PhaseData {
  phase: number;
  phaseName: string;
  description: string;
  estimatedCost: number;
  completionPercentage: number;
  productCount: number;
}

interface PhaseComparisonViewProps {
  roomName: string;
  phases: PhaseData[];
  className?: string;
}

const phaseImages: Record<number, string> = {
  1: phase1Minimal,
  2: phase2Developing,
  3: phase3Complete
};

const phaseColors: Record<number, string> = {
  1: "from-slate-500/20 to-slate-600/10 border-slate-400/30",
  2: "from-amber-500/20 to-amber-600/10 border-amber-400/30",
  3: "from-emerald-500/20 to-emerald-600/10 border-emerald-400/30"
};

const phaseBadgeColors: Record<number, string> = {
  1: "bg-slate-500 text-white",
  2: "bg-amber-500 text-white",
  3: "bg-emerald-500 text-white"
};

export const PhaseComparisonView = ({
  roomName,
  phases,
  className
}: PhaseComparisonViewProps) => {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null);
  const [fullscreenPhase, setFullscreenPhase] = useState<number | null>(null);

  const totalBudget = phases.reduce((sum, p) => sum + p.estimatedCost, 0);
  const totalProducts = phases.reduce((sum, p) => sum + p.productCount, 0);
  const avgCompletion = phases.reduce((sum, p) => sum + p.completionPercentage, 0) / phases.length;

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-copper/10 rounded-lg">
            <Columns3 className="w-5 h-5 text-copper" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Phasen-Vergleich</h3>
            <p className="text-sm text-muted-foreground">{roomName} - Alle Ausbaustufen</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm">
          <div className="text-right">
            <span className="text-muted-foreground">Gesamt:</span>
            <span className="ml-2 font-bold text-copper">CHF {totalBudget.toLocaleString()}</span>
          </div>
          <div className="text-right">
            <span className="text-muted-foreground">Produkte:</span>
            <span className="ml-2 font-bold text-foreground">{totalProducts}</span>
          </div>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="bg-muted/30 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Gesamtfortschritt</span>
          <span className="text-sm font-medium text-foreground">{Math.round(avgCompletion)}%</span>
        </div>
        <div className="relative h-2 bg-muted rounded-full overflow-hidden">
          <motion.div 
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-slate-500 via-amber-500 to-emerald-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${avgCompletion}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {phases.map((phase, index) => (
          <motion.div
            key={phase.phase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "relative rounded-2xl overflow-hidden border-2 transition-all duration-300",
              "bg-gradient-to-b",
              phaseColors[phase.phase],
              expandedPhase === phase.phase && "ring-2 ring-copper ring-offset-2 ring-offset-background"
            )}
          >
            {/* Phase Badge */}
            <div className="absolute top-3 left-3 z-10">
              <Badge className={cn("shadow-lg", phaseBadgeColors[phase.phase])}>
                Phase {phase.phase}
              </Badge>
            </div>

            {/* Fullscreen Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 z-10 bg-background/80 backdrop-blur-sm hover:bg-background"
              onClick={() => setFullscreenPhase(phase.phase)}
            >
              <Maximize2 className="w-4 h-4" />
            </Button>

            {/* Completion Badge */}
            {phase.completionPercentage === 100 && (
              <div className="absolute top-3 right-14 z-10">
                <Badge className="bg-emerald-500 text-white shadow-lg gap-1">
                  <Check className="w-3 h-3" />
                  Fertig
                </Badge>
              </div>
            )}

            {/* Phase Image */}
            <div 
              className="relative aspect-[4/3] cursor-pointer group"
              onClick={() => setExpandedPhase(expandedPhase === phase.phase ? null : phase.phase)}
            >
              <img
                src={phaseImages[phase.phase]}
                alt={`Phase ${phase.phase}: ${phase.phaseName}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-copper/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <ZoomIn className="w-8 h-8 text-white drop-shadow-lg" />
              </div>

              {/* Phase Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h4 className="text-lg font-semibold text-white">{phase.phaseName}</h4>
                <p className="text-sm text-white/80 line-clamp-2">{phase.description}</p>
              </div>
            </div>

            {/* Phase Stats */}
            <div className="p-4 space-y-4 bg-card/50 backdrop-blur-sm">
              {/* Progress Bar */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-muted-foreground">Fortschritt</span>
                  <span className="text-xs font-medium text-foreground">{phase.completionPercentage}%</span>
                </div>
                <Progress 
                  value={phase.completionPercentage} 
                  className="h-1.5"
                />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-background/60 rounded-lg p-2.5 text-center">
                  <Package className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
                  <p className="text-lg font-bold text-foreground">{phase.productCount}</p>
                  <p className="text-xs text-muted-foreground">Produkte</p>
                </div>
                <div className="bg-background/60 rounded-lg p-2.5 text-center">
                  <Sparkles className="w-4 h-4 text-copper mx-auto mb-1" />
                  <p className="text-lg font-bold text-copper">CHF {phase.estimatedCost}</p>
                  <p className="text-xs text-muted-foreground">Budget</p>
                </div>
              </div>

              {/* Expand Button */}
              <Button
                variant="ghost"
                size="sm"
                className="w-full gap-2"
                onClick={() => setExpandedPhase(expandedPhase === phase.phase ? null : phase.phase)}
              >
                <ChevronDown className={cn(
                  "w-4 h-4 transition-transform",
                  expandedPhase === phase.phase && "rotate-180"
                )} />
                {expandedPhase === phase.phase ? "Weniger" : "Mehr Details"}
              </Button>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedPhase === phase.phase && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 border-t border-border space-y-2">
                      <h5 className="text-xs font-medium text-foreground">Was diese Phase beinhaltet:</h5>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {phase.phase === 1 && (
                          <>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                              Basis-Einrichtung
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                              Massage-Liege (vorhanden)
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                              Grundbeleuchtung
                            </li>
                          </>
                        )}
                        {phase.phase === 2 && (
                          <>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                              Ambientebeleuchtung
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                              Teppich & Textilien
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                              Erste Dekoration
                            </li>
                          </>
                        )}
                        {phase.phase === 3 && (
                          <>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              Komplette Spa-Atmosphäre
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              Sound-System & Duft
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              Premium Accessoires
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {fullscreenPhase !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setFullscreenPhase(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-12 right-0 text-white hover:bg-white/20"
                onClick={() => setFullscreenPhase(null)}
              >
                <X className="w-6 h-6" />
              </Button>
              
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={phaseImages[fullscreenPhase]}
                  alt={`Phase ${fullscreenPhase}`}
                  className="w-full h-auto"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <Badge className={cn("mb-2", phaseBadgeColors[fullscreenPhase])}>
                    Phase {fullscreenPhase}
                  </Badge>
                  <h3 className="text-2xl font-bold text-white">
                    {phases.find(p => p.phase === fullscreenPhase)?.phaseName}
                  </h3>
                  <p className="text-white/80 mt-1">
                    {phases.find(p => p.phase === fullscreenPhase)?.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comparison Summary */}
      <div className="bg-gradient-to-r from-copper/5 via-copper/10 to-copper/5 rounded-xl p-4 border border-copper/20">
        <div className="flex items-center gap-3 mb-3">
          <Sparkles className="w-5 h-5 text-copper" />
          <h4 className="font-medium text-foreground">Empfehlung</h4>
        </div>
        <p className="text-sm text-muted-foreground">
          Beginne mit <strong className="text-foreground">Phase 1</strong> für eine funktionale Basis, 
          erweitere zu <strong className="text-foreground">Phase 2</strong> für mehr Atmosphäre, und 
          vervollständige mit <strong className="text-foreground">Phase 3</strong> für das ultimative Spa-Erlebnis.
        </p>
      </div>
    </div>
  );
};
