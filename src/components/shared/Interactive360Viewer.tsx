import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, ZoomOut, RotateCcw, Maximize2, Minimize2, Info, X, Move, Hand } from "lucide-react";

interface Hotspot {
  x: number;
  y: number;
  label: string;
  description: string;
}

interface Room {
  id: string;
  name: string;
  image: string;
  hotspots?: Hotspot[];
}

interface Interactive360ViewerProps {
  room: Room;
  onClose: () => void;
}

export const Interactive360Viewer = ({ room, onClose }: Interactive360ViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  const hotspots: Hotspot[] = room.hotspots || [
    { x: 30, y: 40, label: "Massageliege", description: "Ergonomisch geformte Premium-Liege mit beheizbarer Oberfläche" },
    { x: 70, y: 30, label: "Ambiente-Licht", description: "Individuell einstellbares Farblichtsystem" },
    { x: 50, y: 60, label: "Duft-Diffusor", description: "Aromatherapie mit natürlichen ätherischen Ölen" },
    { x: 85, y: 50, label: "Sound-System", description: "Surroundsound für immersive Klangerlebnisse" },
  ];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    // Limit panning based on zoom level
    const maxPan = (zoom - 1) * 200;
    setPosition({
      x: Math.max(-maxPan, Math.min(maxPan, newX)),
      y: Math.max(-maxPan, Math.min(maxPan, newY)),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => {
      const newZoom = Math.max(prev - 0.5, 1);
      if (newZoom === 1) setPosition({ x: 0, y: 0 });
      return newZoom;
    });
  };

  const handleReset = () => {
    setZoom(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Auto-rotate effect
  useEffect(() => {
    if (isDragging || zoom > 1) return;
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, [isDragging, zoom]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-foreground/98"
    >
      {/* Main Viewer */}
      <div
        className="relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Image with transforms */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom}) rotate(${rotation}deg)`,
            transition: isDragging ? "none" : "transform 0.3s ease-out",
          }}
        >
          <img
            src={room.image}
            alt={room.name}
            className="w-full h-full object-cover"
            draggable={false}
          />
          
          {/* Hotspots */}
          {zoom >= 1 && hotspots.map((hotspot, index) => (
            <motion.button
              key={index}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="absolute group"
              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
              onClick={(e) => {
                e.stopPropagation();
                setActiveHotspot(hotspot);
              }}
            >
              {/* Pulse effect */}
              <motion.div
                className="absolute inset-0 w-8 h-8 -m-4 rounded-full bg-copper/30"
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              
              {/* Hotspot marker */}
              <div className="w-6 h-6 rounded-full bg-copper border-2 border-background shadow-lg flex items-center justify-center group-hover:scale-125 transition-transform">
                <div className="w-2 h-2 rounded-full bg-background" />
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 rounded-lg bg-background text-foreground text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                {hotspot.label}
              </div>
            </motion.button>
          ))}
        </motion.div>
        
        {/* Vignette overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-foreground/80 to-transparent">
        <div className="flex items-center justify-between">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-display text-background"
            >
              {room.name}
            </motion.h2>
            <p className="text-background/60 text-sm mt-1">
              360° interaktive Ansicht
            </p>
          </div>
          
          <button
            onClick={onClose}
            className="w-12 h-12 rounded-full bg-background/10 backdrop-blur flex items-center justify-center text-background hover:bg-background/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2"
      >
        <button
          onClick={handleZoomIn}
          disabled={zoom >= 3}
          className="w-12 h-12 rounded-xl bg-background/10 backdrop-blur flex items-center justify-center text-background hover:bg-background/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        
        <div className="px-3 py-2 rounded-xl bg-background/10 backdrop-blur text-background text-center text-sm font-medium">
          {Math.round(zoom * 100)}%
        </div>
        
        <button
          onClick={handleZoomOut}
          disabled={zoom <= 1}
          className="w-12 h-12 rounded-xl bg-background/10 backdrop-blur flex items-center justify-center text-background hover:bg-background/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        
        <div className="h-px bg-background/20 my-2" />
        
        <button
          onClick={handleReset}
          className="w-12 h-12 rounded-xl bg-background/10 backdrop-blur flex items-center justify-center text-background hover:bg-background/20 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
        
        <button
          onClick={toggleFullscreen}
          className="w-12 h-12 rounded-xl bg-background/10 backdrop-blur flex items-center justify-center text-background hover:bg-background/20 transition-colors"
        >
          {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
        </button>
        
        <button
          onClick={() => setShowInfo(!showInfo)}
          className={`w-12 h-12 rounded-xl backdrop-blur flex items-center justify-center transition-colors ${
            showInfo ? 'bg-copper text-background' : 'bg-background/10 text-background hover:bg-background/20'
          }`}
        >
          <Info className="w-5 h-5" />
        </button>
      </motion.div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6 px-6 py-3 rounded-full bg-background/10 backdrop-blur text-background/80 text-sm"
      >
        <span className="flex items-center gap-2">
          <Hand className="w-4 h-4" />
          Ziehen zum Drehen
        </span>
        <span className="flex items-center gap-2">
          <Move className="w-4 h-4" />
          Zoomen & Bewegen
        </span>
      </motion.div>

      {/* Info Panel */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-80 glass rounded-2xl p-6 text-foreground"
          >
            <h3 className="text-lg font-display mb-3">{room.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Erkunden Sie den Raum mit der Maus. Klicken Sie auf die Markierungen für mehr Details.
            </p>
            
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-copper uppercase tracking-wider">Highlights</h4>
              {hotspots.map((hotspot, i) => (
                <button
                  key={i}
                  onClick={() => setActiveHotspot(hotspot)}
                  className="w-full text-left p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <p className="font-medium text-sm">{hotspot.label}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hotspot Detail Modal */}
      <AnimatePresence>
        {activeHotspot && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 glass rounded-2xl p-6 text-foreground"
          >
            <button
              onClick={() => setActiveHotspot(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="w-12 h-12 rounded-xl bg-copper/10 flex items-center justify-center mb-4">
              <Info className="w-6 h-6 text-copper" />
            </div>
            
            <h3 className="text-xl font-display mb-2">{activeHotspot.label}</h3>
            <p className="text-muted-foreground">{activeHotspot.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
