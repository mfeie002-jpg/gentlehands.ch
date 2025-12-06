import { motion } from "framer-motion";
import { useState } from "react";
import { Maximize2 } from "lucide-react";

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
  featured?: boolean;
}

interface GalleryMasonryProps {
  images: GalleryImage[];
  onImageClick: (index: number) => void;
}

export const GalleryMasonry = ({ images, onImageClick }: GalleryMasonryProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
      {images.map((image, index) => (
        <motion.div
          key={`${image.src}-${index}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          className="break-inside-avoid mb-4"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <motion.button
            onClick={() => onImageClick(index)}
            whileHover={{ y: -4 }}
            className={`relative w-full rounded-2xl overflow-hidden bg-secondary ${
              image.featured ? "aspect-[3/4]" : "aspect-[4/3]"
            } group`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <motion.div 
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            >
              <div className="w-14 h-14 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center border border-background/30">
                <Maximize2 size={22} className="text-background" />
              </div>
            </motion.div>
            
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-background text-sm font-medium">{image.alt}</p>
              <span className="text-background/70 text-xs">{image.category}</span>
            </div>
            
            {image.featured && (
              <div className="absolute top-3 left-3 px-2 py-1 bg-copper/90 text-background text-xs font-medium rounded-full">
                Featured
              </div>
            )}
          </motion.button>
        </motion.div>
      ))}
    </div>
  );
};
