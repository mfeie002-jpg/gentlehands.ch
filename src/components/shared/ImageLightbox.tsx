import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface Image {
  src: string;
  alt: string;
  category?: string;
}

interface ImageLightboxProps {
  images: Image[];
  columns?: 2 | 3 | 4;
}

export const ImageLightbox = ({ images, columns = 3 }: ImageLightboxProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight") setSelectedIndex((prev) => (prev! + 1) % images.length);
      if (e.key === "ArrowLeft") setSelectedIndex((prev) => (prev! - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, images.length]);

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  return (
    <>
      <div className={`grid grid-cols-1 ${gridCols[columns]} gap-4 md:gap-6`}>
        {images.map((image, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            onClick={() => setSelectedIndex(index)}
            className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-secondary cursor-pointer"
          >
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
              {image.alt}
            </div>
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors duration-300 flex items-center justify-center">
              <ZoomIn 
                size={32} 
                className="text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
            {image.category && (
              <span className="absolute bottom-3 left-3 px-3 py-1 bg-background/80 backdrop-blur-sm text-xs rounded-full text-foreground">
                {image.category}
              </span>
            )}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center p-4"
            onClick={() => setSelectedIndex(null)}
          >
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-6 right-6 p-2 text-primary-foreground hover:text-copper transition-colors"
              aria-label="Schliessen"
            >
              <X size={32} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((prev) => (prev! - 1 + images.length) % images.length);
              }}
              className="absolute left-4 md:left-8 p-3 text-primary-foreground hover:text-copper transition-colors"
              aria-label="Vorheriges Bild"
            >
              <ChevronLeft size={40} />
            </button>

            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl max-h-[80vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-[4/3] w-full max-h-[70vh] rounded-2xl bg-secondary flex items-center justify-center">
                <span className="text-muted-foreground">{images[selectedIndex].alt}</span>
              </div>
              <p className="mt-4 text-primary-foreground text-center">
                {images[selectedIndex].alt}
              </p>
              <p className="text-primary-foreground/60 text-sm">
                {selectedIndex + 1} / {images.length}
              </p>
            </motion.div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((prev) => (prev! + 1) % images.length);
              }}
              className="absolute right-4 md:right-8 p-3 text-primary-foreground hover:text-copper transition-colors"
              aria-label="Nächstes Bild"
            >
              <ChevronRight size={40} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
