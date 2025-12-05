import { useState } from "react";
import { motion } from "framer-motion";

interface BodyArea {
  id: string;
  name: string;
  path: string;
  x: number;
  y: number;
}

const bodyAreas: BodyArea[] = [
  { id: "head", name: "Kopf & Nacken", path: "", x: 50, y: 8 },
  { id: "shoulders", name: "Schultern", path: "", x: 50, y: 18 },
  { id: "upper-back", name: "Oberer Rücken", path: "", x: 50, y: 28 },
  { id: "arms", name: "Arme", path: "", x: 25, y: 35 },
  { id: "lower-back", name: "Unterer Rücken", path: "", x: 50, y: 42 },
  { id: "hips", name: "Hüfte", path: "", x: 50, y: 52 },
  { id: "legs-upper", name: "Oberschenkel", path: "", x: 50, y: 65 },
  { id: "legs-lower", name: "Unterschenkel", path: "", x: 50, y: 80 },
  { id: "feet", name: "Füsse", path: "", x: 50, y: 95 },
];

interface BodyMapProps {
  selectedAreas: string[];
  onAreaToggle: (areaId: string) => void;
  mode?: "focus" | "avoid";
}

export const BodyMap = ({ selectedAreas, onAreaToggle, mode = "focus" }: BodyMapProps) => {
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);

  const getAreaColor = (areaId: string) => {
    if (selectedAreas.includes(areaId)) {
      return mode === "focus" ? "bg-copper" : "bg-rose-500";
    }
    if (hoveredArea === areaId) {
      return mode === "focus" ? "bg-copper/50" : "bg-rose-500/50";
    }
    return "bg-muted-foreground/20";
  };

  return (
    <div className="relative max-w-xs mx-auto">
      {/* Body Silhouette */}
      <div className="relative w-full aspect-[1/2]">
        {/* SVG Body Outline */}
        <svg
          viewBox="0 0 100 200"
          className="w-full h-full"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
        >
          {/* Head */}
          <ellipse cx="50" cy="15" rx="12" ry="14" className="fill-muted/30 stroke-muted-foreground/30" />
          
          {/* Neck */}
          <rect x="45" y="28" width="10" height="8" className="fill-muted/30 stroke-muted-foreground/30" />
          
          {/* Shoulders & Torso */}
          <path
            d="M25 36 Q30 32 45 35 L45 35 Q50 34 55 35 L55 35 Q70 32 75 36 L75 55 Q73 60 70 65 L70 100 Q65 105 50 105 Q35 105 30 100 L30 65 Q27 60 25 55 Z"
            className="fill-muted/30 stroke-muted-foreground/30"
          />
          
          {/* Arms */}
          <path
            d="M25 36 Q20 40 15 55 Q10 70 15 85 Q18 90 20 85 Q22 75 25 65"
            className="fill-muted/30 stroke-muted-foreground/30"
          />
          <path
            d="M75 36 Q80 40 85 55 Q90 70 85 85 Q82 90 80 85 Q78 75 75 65"
            className="fill-muted/30 stroke-muted-foreground/30"
          />
          
          {/* Legs */}
          <path
            d="M30 100 L32 140 Q33 145 35 150 L35 185 Q38 190 40 185 L42 150 Q44 140 45 130 L45 105"
            className="fill-muted/30 stroke-muted-foreground/30"
          />
          <path
            d="M70 100 L68 140 Q67 145 65 150 L65 185 Q62 190 60 185 L58 150 Q56 140 55 130 L55 105"
            className="fill-muted/30 stroke-muted-foreground/30"
          />
        </svg>

        {/* Clickable Areas */}
        {bodyAreas.map((area) => (
          <motion.button
            key={area.id}
            onClick={() => onAreaToggle(area.id)}
            onMouseEnter={() => setHoveredArea(area.id)}
            onMouseLeave={() => setHoveredArea(null)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`absolute w-8 h-8 rounded-full ${getAreaColor(area.id)} 
              transition-colors duration-200 flex items-center justify-center 
              shadow-lg cursor-pointer border-2 border-background`}
            style={{
              left: `${area.x}%`,
              top: `${area.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {selectedAreas.includes(area.id) && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-2 h-2 rounded-full bg-background"
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 space-y-2">
        <p className="text-sm font-medium text-center text-foreground">
          {mode === "focus" ? "Fokus-Bereiche" : "Zu meidende Bereiche"}
        </p>
        <p className="text-xs text-muted-foreground text-center">
          Klicken Sie auf die Punkte, um Bereiche auszuwählen
        </p>
        
        {/* Selected Areas */}
        {selectedAreas.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {selectedAreas.map(areaId => {
              const area = bodyAreas.find(a => a.id === areaId);
              return (
                <motion.span
                  key={areaId}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className={`px-3 py-1 rounded-full text-xs text-background ${
                    mode === "focus" ? "bg-copper" : "bg-rose-500"
                  }`}
                >
                  {area?.name}
                </motion.span>
              );
            })}
          </div>
        )}
      </div>

      {/* Hovered Area Info */}
      {hoveredArea && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full px-3 py-1 rounded-lg bg-foreground text-background text-sm whitespace-nowrap"
        >
          {bodyAreas.find(a => a.id === hoveredArea)?.name}
        </motion.div>
      )}
    </div>
  );
};
