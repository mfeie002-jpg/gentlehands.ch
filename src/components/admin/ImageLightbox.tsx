import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ShopLink {
  shop: "ikea" | "galaxus" | "microspot";
  url: string;
  price?: number;
}

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  productName: string;
  description?: string;
  shopLinks?: ShopLink[];
  price?: number;
}

const shopLogos: Record<string, { name: string; color: string }> = {
  ikea: { name: "IKEA", color: "bg-[#0058A3] hover:bg-[#004F95]" },
  galaxus: { name: "Galaxus", color: "bg-[#5C2D91] hover:bg-[#4A2475]" },
  microspot: { name: "Microspot", color: "bg-[#E30613] hover:bg-[#C9050F]" }
};

export const ImageLightbox = ({
  isOpen,
  onClose,
  imageUrl,
  productName,
  description,
  shopLinks,
  price
}: ImageLightboxProps) => {
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.5, 1));

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-4xl w-full bg-card rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div>
                <h3 className="text-lg font-semibold text-foreground">{productName}</h3>
                {description && (
                  <p className="text-sm text-muted-foreground">{description}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={handleZoomOut} disabled={zoom <= 1}>
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <span className="text-sm text-muted-foreground min-w-[3rem] text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <Button variant="ghost" size="icon" onClick={handleZoomIn} disabled={zoom >= 3}>
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Image */}
            <div className="relative overflow-auto max-h-[60vh] bg-muted/20">
              <motion.img
                src={imageUrl.replace("w=200&h=200", "w=800&h=800")}
                alt={productName}
                className="w-full h-auto transition-transform duration-200 origin-center"
                style={{ transform: `scale(${zoom})` }}
              />
            </div>

            {/* Footer with shop links */}
            <div className="p-4 border-t border-border bg-muted/30">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex flex-wrap gap-2">
                  {shopLinks && shopLinks.length > 0 ? (
                    shopLinks.map((shop, idx) => (
                      <a
                        key={idx}
                        href={shop.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white transition-all hover:scale-105 ${shopLogos[shop.shop].color}`}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Bei {shopLogos[shop.shop].name} kaufen
                        {shop.price && (
                          <span className="ml-1 font-bold">CHF {shop.price}</span>
                        )}
                      </a>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">Keine Shop-Links verfügbar</span>
                  )}
                </div>
                {price && (
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Geschätzte Kosten</p>
                    <p className="text-xl font-bold text-copper">CHF {price}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
