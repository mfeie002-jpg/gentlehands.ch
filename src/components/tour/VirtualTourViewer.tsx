import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, X, Volume2, Eye, RotateCcw } from 'lucide-react';
import { LazyImage } from '@/components/shared/LazyImage';
import { Button } from '@/components/ui/button';

// Import room images
import roomZen from '@/assets/room-zen.jpg';
import roomAlpine from '@/assets/room-alpine.jpg';
import roomDark from '@/assets/room-dark.jpg';
import roomOzean from '@/assets/room-ozean.jpg';
import roomUrban from '@/assets/room-urban.jpg';
import roomEmpfang from '@/assets/room-empfang.jpg';

interface Room {
  id: string;
  name: string;
  description: string;
  image: string;
  sounds: string[];
  scent: string;
  features: string[];
}

const rooms: Room[] = [
  {
    id: 'empfang',
    name: 'Empfangsbereich',
    description: 'Ihr erster Eindruck – ein Ort der Ruhe und Diskretion, der Sie willkommen heisst.',
    image: roomEmpfang,
    sounds: ['Leise Ambient-Musik'],
    scent: 'Dezenter Raumduft',
    features: ['Privater Wartebereich', 'Willkommenstee', 'Diskrete Atmosphäre'],
  },
  {
    id: 'zen',
    name: 'Zen Garden',
    description: 'Japanische Ästhetik trifft auf tiefe Entspannung – minimalistisch und zentrierend.',
    image: roomZen,
    sounds: ['Bambusflöte', 'Koi-Teich'],
    scent: 'Grüner Tee & Lotus',
    features: ['Tatami-Elemente', 'Natürliches Licht', 'Bambus-Akzente'],
  },
  {
    id: 'alpine',
    name: 'Alpine Stille',
    description: 'Die Ruhe der Schweizer Berge – Geborgenheit und frische Bergluft.',
    image: roomAlpine,
    sounds: ['Bergbach', 'Windstille'],
    scent: 'Zirbenholz & Bergkräuter',
    features: ['Holzvertäfelung', 'Warme Erdtöne', 'Bergpanorama-Projektion'],
  },
  {
    id: 'ozean',
    name: 'Ozean & Palmen',
    description: 'Urlaubsfeeling pur – lassen Sie sich ans Meer entführen.',
    image: roomOzean,
    sounds: ['Meeresrauschen', 'Tropische Vögel'],
    scent: 'Kokosnuss & Meeresbrise',
    features: ['Blaue Lichtstimmung', 'Wasserelement', 'Palmen-Dekoration'],
  },
  {
    id: 'dark',
    name: 'Deep Dark Relax',
    description: 'Völlige Dunkelheit für maximale sensorische Fokussierung.',
    image: roomDark,
    sounds: ['Tiefe Frequenzen', 'Stille'],
    scent: 'Sandelholz & Amber',
    features: ['Vollständig abdunkelbar', 'Wärmestrahler', 'Schallisoliert'],
  },
  {
    id: 'urban',
    name: 'Urban Loft',
    description: 'Moderne Selbstfürsorge – zeitgemässes Design für die bewusste Frau.',
    image: roomUrban,
    sounds: ['Soft Lounge', 'Ambient'],
    scent: 'Weisser Tee & Grapefruit',
    features: ['Industrial-Elemente', 'Moderne Kunst', 'Smart Lighting'],
  },
];

export const VirtualTourViewer = () => {
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentRoom = rooms[currentRoomIndex];

  const nextRoom = () => {
    setCurrentRoomIndex((prev) => (prev + 1) % rooms.length);
    setRotation(0);
  };

  const prevRoom = () => {
    setCurrentRoomIndex((prev) => (prev - 1 + rooms.length) % rooms.length);
    setRotation(0);
  };

  const goToRoom = (index: number) => {
    setCurrentRoomIndex(index);
    setRotation(0);
  };

  // Handle mouse/touch drag for 360° effect
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - startX;
    setRotation((prev) => prev + delta * 0.2);
    setStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const delta = e.touches[0].clientX - startX;
    setRotation((prev) => prev + delta * 0.2);
    setStartX(e.touches[0].clientX);
  };

  const resetRotation = () => setRotation(0);

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-gradient-to-b from-background to-secondary/30">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-copper/5 blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="container-wide relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-copper/10 border border-copper/20 mb-6"
          >
            <Eye size={16} className="text-copper" />
            <span className="text-copper text-sm font-medium">Virtueller Rundgang</span>
          </motion.div>
          <h2 className="text-foreground mb-4">Erkunden Sie unsere Räume</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tauchen Sie ein in unsere thematisch gestalteten Erlebnisräume. Ziehen Sie, um sich umzusehen.
          </p>
        </motion.div>

        {/* Main Viewer */}
        <div className="max-w-5xl mx-auto">
          <div
            ref={containerRef}
            className={`relative rounded-2xl overflow-hidden shadow-2xl shadow-copper/10 ${
              isFullscreen ? 'fixed inset-4 z-50 rounded-xl' : ''
            }`}
          >
            {/* Room Image with 360° Effect */}
            <div
              className="relative aspect-[16/9] cursor-grab active:cursor-grabbing select-none"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleMouseUp}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentRoom.id}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                  style={{
                    transform: `perspective(1000px) rotateY(${rotation * 0.1}deg) scale(${1 + Math.abs(rotation) * 0.0002})`,
                  }}
                >
                  <LazyImage
                    src={currentRoom.image}
                    alt={currentRoom.name}
                    className="w-full h-full object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

              {/* Room Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <motion.div
                  key={currentRoom.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="font-display text-2xl sm:text-3xl text-white mb-2">
                    {currentRoom.name}
                  </h3>
                  <p className="text-white/80 text-sm sm:text-base mb-4 max-w-xl">
                    {currentRoom.description}
                  </p>

                  {/* Room Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {currentRoom.features.map((feature) => (
                      <span
                        key={feature}
                        className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs text-white/90"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Sound & Scent */}
                  <div className="flex gap-4">
                    <span className="inline-flex items-center gap-1.5 text-xs text-white/70">
                      <Volume2 size={14} />
                      {currentRoom.sounds[0]}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-white/70">
                      🌸 {currentRoom.scent}
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevRoom}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Vorheriger Raum"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextRoom}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Nächster Raum"
              >
                <ChevronRight size={20} />
              </button>

              {/* Controls */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={resetRotation}
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  aria-label="Ansicht zurücksetzen"
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  aria-label={isFullscreen ? 'Vollbild beenden' : 'Vollbild'}
                >
                  {isFullscreen ? <X size={16} /> : <Maximize2 size={16} />}
                </button>
              </div>

              {/* Drag Hint */}
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-xs text-white/70">
                ↔ Ziehen zum Umsehen
              </div>
            </div>
          </div>

          {/* Room Thumbnails */}
          <div className="flex gap-2 sm:gap-3 mt-6 overflow-x-auto pb-2 -mx-4 px-4">
            {rooms.map((room, index) => (
              <motion.button
                key={room.id}
                onClick={() => goToRoom(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative flex-shrink-0 w-20 sm:w-24 rounded-lg overflow-hidden transition-all ${
                  index === currentRoomIndex
                    ? 'ring-2 ring-copper ring-offset-2 ring-offset-background'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <div className="aspect-video">
                  <LazyImage
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-1 left-1 right-1 text-[10px] sm:text-xs text-white text-center truncate">
                  {room.name}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Backdrop */}
      {isFullscreen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-40"
          onClick={() => setIsFullscreen(false)}
        />
      )}
    </section>
  );
};
