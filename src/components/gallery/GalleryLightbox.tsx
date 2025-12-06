import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download } from "lucide-react";
import { useState, useEffect } from "react";

interface GalleryLightboxProps {
  images: { src: string; alt: string }[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const GalleryLightbox = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev
}: GalleryLightboxProps) => {
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  useEffect(() => {
    setZoom(1);
  }, [currentIndex]);

  if (!isOpen || !images[currentIndex]) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-foreground/98 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* Controls */}
        <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => { e.stopPropagation(); setZoom(Math.max(zoom - 0.5, 1)); }}
            className="p-3 rounded-full bg-background/10 hover:bg-background/20 text-background transition-colors"
          >
            <ZoomOut size={20} />
          </motion.button>
          <span className="text-background/70 text-sm min-w-[50px] text-center">{Math.round(zoom * 100)}%</span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => { e.stopPropagation(); setZoom(Math.min(zoom + 0.5, 3)); }}
            className="p-3 rounded-full bg-background/10 hover:bg-background/20 text-background transition-colors"
          >
            <ZoomIn size={20} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-3 rounded-full bg-background/10 hover:bg-background/20 text-background transition-colors ml-2"
          >
            <X size={20} />
          </motion.button>
        </div>

        {/* Navigation */}
        <motion.button
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-background/10 hover:bg-background/20 text-background transition-colors"
        >
          <ChevronLeft size={28} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-background/10 hover:bg-background/20 text-background transition-colors"
        >
          <ChevronRight size={28} />
        </motion.button>

        {/* Image */}
        <div className="absolute inset-0 flex items-center justify-center p-16" onClick={(e) => e.stopPropagation()}>
          <motion.img
            key={currentIndex}
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: zoom }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="max-w-full max-h-full object-contain rounded-lg"
            style={{ cursor: zoom > 1 ? "move" : "default" }}
          />
        </div>

        {/* Counter */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-background/10 backdrop-blur-sm rounded-full">
          <span className="text-background text-sm">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
