import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ArrowRight, ExternalLink, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ShopLink {
  shop: "ikea" | "galaxus" | "microspot";
  url: string;
  price?: number;
}

interface ProductHotspot {
  id: string;
  name: string;
  description?: string;
  position: { x: number; y: number };
  estimatedCost: number;
  shopLinks?: ShopLink[];
  imageUrl?: string;
  category: string;
}

interface InteractiveRoomViewProps {
  roomId: string;
  roomName: string;
  products: ProductHotspot[];
  onProductClick?: (product: ProductHotspot) => void;
}

const shopLogos: Record<string, { name: string; color: string }> = {
  ikea: { name: "IKEA", color: "bg-[#0058A3]" },
  galaxus: { name: "Galaxus", color: "bg-[#5C2D91]" },
  microspot: { name: "Microspot", color: "bg-[#E30613]" }
};

// Room images - professional massage room setup images
const roomImages: Record<string, string> = {
  ozean: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&h=800&fit=crop",
  alpine: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1200&h=800&fit=crop",
  dark: "https://images.unsplash.com/photo-1540555700478-4be289fbec50?w=1200&h=800&fit=crop",
  urban: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1200&h=800&fit=crop",
  zen: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1200&h=800&fit=crop",
  surprise: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1200&h=800&fit=crop"
};

// Standard massage table that's used in all rooms
const massageTable: ProductHotspot = {
  id: "base-liege",
  name: "Massage-Liege (Basis)",
  description: "Elektrische Premium-Massageliege mit Gesichtsstütze und Armablagen - bereits in allen Räumen vorhanden",
  position: { x: 50, y: 55 },
  estimatedCost: 0,
  shopLinks: [],
  imageUrl: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&h=400&fit=crop",
  category: "basis"
};

export const InteractiveRoomView = ({
  roomId,
  roomName,
  products,
  onProductClick
}: InteractiveRoomViewProps) => {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductHotspot | null>(null);
  const [showLightbox, setShowLightbox] = useState(false);

  // Add massage table to products if not already included
  const allProducts = [massageTable, ...products];

  const handleProductClick = (product: ProductHotspot) => {
    setSelectedProduct(product);
    setShowLightbox(true);
    onProductClick?.(product);
  };

  const closeLightbox = () => {
    setShowLightbox(false);
    setSelectedProduct(null);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      basis: "bg-amber-500",
      lighting: "bg-yellow-500",
      decor: "bg-emerald-500",
      tech: "bg-blue-500",
      sound: "bg-purple-500",
      scent: "bg-pink-500",
      wellness: "bg-rose-500",
      extra: "bg-cyan-500"
    };
    return colors[category] || "bg-gray-500";
  };

  return (
    <div className="relative">
      {/* Main Room Image with Hotspots */}
      <div className="relative rounded-xl overflow-hidden border border-border shadow-lg">
        <img
          src={roomImages[roomId]}
          alt={`${roomName} Raum-Ansicht`}
          className="w-full h-auto aspect-video object-cover"
        />

        {/* Overlay gradient for better hotspot visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

        {/* Hotspots */}
        {allProducts.map((product, index) => (
          <motion.div
            key={product.id}
            className="absolute cursor-pointer group"
            style={{
              left: `${product.position.x}%`,
              top: `${product.position.y}%`,
              transform: "translate(-50%, -50%)"
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
            onClick={() => handleProductClick(product)}
          >
            {/* Pulsating dot */}
            <div className="relative">
              <motion.div
                className={`w-6 h-6 rounded-full ${getCategoryColor(product.category)} shadow-lg flex items-center justify-center`}
                animate={{
                  scale: hoveredProduct === product.id ? 1.3 : [1, 1.2, 1],
                  boxShadow: hoveredProduct === product.id 
                    ? "0 0 20px rgba(255,255,255,0.5)" 
                    : "0 4px 12px rgba(0,0,0,0.3)"
                }}
                transition={{
                  scale: hoveredProduct === product.id 
                    ? { duration: 0.2 }
                    : { repeat: Infinity, duration: 2 }
                }}
              >
                <span className="text-xs font-bold text-white">{index + 1}</span>
              </motion.div>

              {/* Connecting line to tooltip */}
              <AnimatePresence>
                {hoveredProduct === product.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute z-10 left-1/2 -translate-x-1/2 bottom-full mb-3 min-w-[200px]"
                  >
                    {/* Arrow pointing down */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-full">
                      <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-card" />
                    </div>
                    
                    {/* Tooltip content */}
                    <div className="bg-card rounded-lg shadow-xl border border-border p-3">
                      <div className="flex items-start gap-3">
                        {product.imageUrl && (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-12 h-12 rounded object-cover"
                          />
                        )}
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground text-sm">{product.name}</h4>
                          {product.description && (
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                              {product.description}
                            </p>
                          )}
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary" className="text-xs">
                              {product.category === "basis" ? "Vorhanden" : `CHF ${product.estimatedCost}`}
                            </Badge>
                            <ZoomIn className="w-3 h-3 text-muted-foreground" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <p className="text-xs font-medium text-foreground mb-2">Legende</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="text-muted-foreground">Basis</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="text-muted-foreground">Beleuchtung</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-muted-foreground">Dekoration</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-muted-foreground">Technik</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
              <span className="text-muted-foreground">Sound</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-pink-500" />
              <span className="text-muted-foreground">Duft</span>
            </div>
          </div>
        </div>

        {/* Click hint */}
        <div className="absolute bottom-4 right-4 bg-copper/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
          <p className="text-xs font-medium text-white flex items-center gap-2">
            <ShoppingCart className="w-3 h-3" />
            Klick auf Nummer für Details & Kauflinks
          </p>
        </div>
      </div>

      {/* Product Detail Lightbox */}
      <AnimatePresence>
        {showLightbox && selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-2xl w-full bg-card rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${getCategoryColor(selectedProduct.category)}`} />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{selectedProduct.name}</h3>
                    <p className="text-sm text-muted-foreground capitalize">{selectedProduct.category}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={closeLightbox}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Image */}
              {selectedProduct.imageUrl && (
                <div className="relative aspect-video bg-muted">
                  <img
                    src={selectedProduct.imageUrl.replace("w=200&h=200", "w=800&h=600").replace("w=400&h=400", "w=800&h=600")}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                {selectedProduct.description && (
                  <p className="text-muted-foreground mb-4">{selectedProduct.description}</p>
                )}

                {selectedProduct.category === "basis" ? (
                  <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
                    <p className="text-amber-500 font-medium flex items-center gap-2">
                      ✓ Diese Liege ist bereits in allen Räumen vorhanden
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-muted-foreground">Geschätzte Kosten:</span>
                      <span className="text-2xl font-bold text-copper">CHF {selectedProduct.estimatedCost}</span>
                    </div>

                    {/* Shop Links */}
                    {selectedProduct.shopLinks && selectedProduct.shopLinks.length > 0 ? (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-foreground mb-3">Jetzt kaufen:</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedProduct.shopLinks.map((shop, idx) => (
                            <a
                              key={idx}
                              href={shop.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-white transition-all hover:scale-105 ${shopLogos[shop.shop].color}`}
                            >
                              <ExternalLink className="w-4 h-4" />
                              {shopLogos[shop.shop].name}
                              {shop.price && (
                                <span className="font-bold">CHF {shop.price}</span>
                              )}
                              <ArrowRight className="w-4 h-4" />
                            </a>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground italic">
                        Keine direkten Kauflinks verfügbar - bitte individuell anfragen
                      </p>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
