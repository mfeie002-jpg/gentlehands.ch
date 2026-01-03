import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ZoomIn, ZoomOut, Move, Eye, EyeOff, 
  RotateCcw, Maximize2, ExternalLink, X,
  GripVertical, Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface ShopLink {
  shop: "ikea" | "galaxus" | "microspot";
  url: string;
  price?: number;
}

export interface ProductMarker {
  id: string;
  name: string;
  description?: string;
  position: { x: number; y: number };
  estimatedCost: number;
  shopLinks?: ShopLink[];
  imageUrl?: string;
  category: string;
  isCompleted?: boolean;
  isFixed?: boolean; // For fixed elements like massage table
}

interface PhaseRoomViewerProps {
  roomId: string;
  roomName: string;
  phase: number;
  phaseName: string;
  phaseImage: string;
  products: ProductMarker[];
  onProductPositionChange?: (productId: string, newPosition: { x: number; y: number }) => void;
  onProductClick?: (product: ProductMarker) => void;
  className?: string;
}

const shopLogos: Record<string, { name: string; color: string }> = {
  ikea: { name: "IKEA", color: "bg-[#0058A3]" },
  galaxus: { name: "Galaxus", color: "bg-[#5C2D91]" },
  microspot: { name: "Microspot", color: "bg-[#E30613]" }
};

const categoryConfig: Record<string, { color: string; label: string }> = {
  basis: { color: "bg-amber-500", label: "Basis" },
  lighting: { color: "bg-yellow-500", label: "Beleuchtung" },
  decor: { color: "bg-emerald-500", label: "Dekoration" },
  tech: { color: "bg-blue-500", label: "Technik" },
  sound: { color: "bg-purple-500", label: "Sound" },
  scent: { color: "bg-pink-500", label: "Duft" },
  wellness: { color: "bg-rose-500", label: "Wellness" },
  extra: { color: "bg-cyan-500", label: "Extra" }
};

export const PhaseRoomViewer = ({
  roomId,
  roomName,
  phase,
  phaseName,
  phaseImage,
  products,
  onProductPositionChange,
  onProductClick,
  className
}: PhaseRoomViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [showLabels, setShowLabels] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [draggingProduct, setDraggingProduct] = useState<string | null>(null);
  const [highlightedProduct, setHighlightedProduct] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductMarker | null>(null);
  const [fullscreen, setFullscreen] = useState(false);

  const handleMouseDown = (e: React.MouseEvent, product: ProductMarker) => {
    if (!editMode || product.isFixed) return;
    e.preventDefault();
    setDraggingProduct(product.id);
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!draggingProduct || !containerRef.current || !editMode) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Clamp values
    const clampedX = Math.max(5, Math.min(95, x));
    const clampedY = Math.max(5, Math.min(95, y));

    onProductPositionChange?.(draggingProduct, { x: clampedX, y: clampedY });
  }, [draggingProduct, editMode, onProductPositionChange]);

  const handleMouseUp = () => {
    setDraggingProduct(null);
  };

  const handleProductClick = (product: ProductMarker) => {
    if (editMode) return;
    setSelectedProduct(product);
    setHighlightedProduct(product.id);
    onProductClick?.(product);
  };

  const highlightProductInImage = (productId: string) => {
    setHighlightedProduct(productId);
    // Auto-scroll to product if zoomed
    const productEl = document.getElementById(`marker-${productId}`);
    if (productEl) {
      productEl.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    }
  };

  const resetPositions = () => {
    // This would reset to default positions - implement if needed
  };

  return (
    <div className={cn("relative", className)}>
      {/* Controls */}
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-copper border-copper/50">
            Phase {phase}: {phaseName}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {products.length} Produkte
          </Badge>
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            variant={editMode ? "default" : "ghost"}
            size="sm"
            onClick={() => setEditMode(!editMode)}
            className={cn("gap-1.5", editMode && "bg-copper hover:bg-copper/90")}
          >
            <Move className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{editMode ? "Bearbeiten" : "Verschieben"}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowLabels(!showLabels)}
          >
            {showLabels ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setZoom(prev => Math.max(0.5, prev - 0.25))}
            disabled={zoom <= 0.5}
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </Button>
          <span className="text-xs text-muted-foreground min-w-[3rem] text-center">
            {Math.round(zoom * 100)}%
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setZoom(prev => Math.min(2, prev + 0.25))}
            disabled={zoom >= 2}
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setFullscreen(!fullscreen)}
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Main Viewer */}
      <div 
        className={cn(
          "relative rounded-xl overflow-hidden border border-border shadow-lg transition-all",
          fullscreen && "fixed inset-4 z-50 rounded-2xl"
        )}
      >
        {fullscreen && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-20 bg-background/80 backdrop-blur"
            onClick={() => setFullscreen(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
        
        <div 
          ref={containerRef}
          className="relative overflow-auto"
          style={{ maxHeight: fullscreen ? "calc(100vh - 4rem)" : "500px" }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div 
            className="relative transition-transform duration-200 origin-top-left"
            style={{ transform: `scale(${zoom})`, width: zoom > 1 ? `${100 / zoom}%` : "100%" }}
          >
            {/* Phase Image */}
            <img
              src={phaseImage}
              alt={`${roomName} - Phase ${phase}`}
              className="w-full h-auto"
              draggable={false}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 pointer-events-none" />

            {/* Product Markers */}
            {products.map((product, index) => {
              const config = categoryConfig[product.category] || categoryConfig.extra;
              const isHighlighted = highlightedProduct === product.id;
              const isDragging = draggingProduct === product.id;

              return (
                <motion.div
                  key={product.id}
                  id={`marker-${product.id}`}
                  className={cn(
                    "absolute cursor-pointer group",
                    editMode && !product.isFixed && "cursor-move",
                    product.isFixed && "cursor-default"
                  )}
                  style={{
                    left: `${product.position.x}%`,
                    top: `${product.position.y}%`,
                    transform: "translate(-50%, -50%)",
                    zIndex: isDragging ? 50 : isHighlighted ? 40 : product.isFixed ? 5 : 10
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: isDragging ? 1.3 : isHighlighted ? 1.4 : 1, 
                    opacity: 1 
                  }}
                  transition={{ delay: index * 0.05, duration: 0.2 }}
                  onMouseDown={(e) => handleMouseDown(e, product)}
                  onClick={() => !editMode && handleProductClick(product)}
                >
                  {/* Highlight Ring */}
                  <AnimatePresence>
                    {isHighlighted && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: [1, 1.5, 1.2], opacity: [1, 0.5, 0.7] }}
                        exit={{ scale: 0, opacity: 0 }}
                        className={cn(
                          "absolute inset-0 rounded-full -m-4",
                          config.color,
                          "opacity-30"
                        )}
                        style={{ width: "3rem", height: "3rem" }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Main Marker */}
                  <motion.div
                    className={cn(
                      "relative w-8 h-8 rounded-full flex items-center justify-center shadow-lg",
                      product.isFixed ? "bg-amber-500 ring-2 ring-amber-300" : config.color,
                      isDragging && "ring-4 ring-white ring-opacity-50",
                      isHighlighted && "ring-4 ring-white shadow-2xl",
                      product.isCompleted && !product.isFixed && "opacity-60"
                    )}
                    animate={!isDragging && !isHighlighted && !product.isFixed ? {
                      scale: [1, 1.1, 1],
                    } : {}}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  >
                    {product.isFixed ? (
                      <span className="text-xs font-bold text-white">🛏</span>
                    ) : editMode ? (
                      <GripVertical className="w-4 h-4 text-white" />
                    ) : (
                      <span className="text-xs font-bold text-white">{index}</span>
                    )}
                  </motion.div>

                  {/* Arrow pointing to product */}
                  {isHighlighted && !editMode && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-1"
                    >
                      <Target className="w-6 h-6 text-white drop-shadow-lg animate-bounce" />
                    </motion.div>
                  )}

                  {/* Label */}
                  {showLabels && !editMode && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "absolute left-1/2 -translate-x-1/2 mt-2 top-full",
                        "bg-background/95 backdrop-blur-sm rounded-lg px-2 py-1",
                        "border border-border shadow-md",
                        "whitespace-nowrap text-xs font-medium",
                        "pointer-events-none",
                        isHighlighted && "bg-copper text-white border-copper"
                      )}
                    >
                      {product.name}
                    </motion.div>
                  )}

                  {/* Hover Tooltip */}
                  <AnimatePresence>
                    {!editMode && !isHighlighted && (
                      <div className="absolute z-30 left-1/2 -translate-x-1/2 bottom-full mb-3 min-w-[180px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <div className="bg-card rounded-lg shadow-xl border border-border p-2">
                          <div className="flex items-start gap-2">
                            {product.imageUrl && (
                              <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-10 h-10 rounded object-cover"
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-foreground text-xs truncate">{product.name}</h4>
                              <p className="text-xs text-muted-foreground">CHF {product.estimatedCost}</p>
                            </div>
                          </div>
                        </div>
                        <div className="absolute left-1/2 -translate-x-1/2 top-full -mt-1">
                          <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-card" />
                        </div>
                      </div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}

            {/* Edit Mode Indicator */}
            {editMode && (
              <div className="absolute top-4 left-4 bg-copper text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 shadow-lg">
                <Move className="w-3 h-3" />
                Produkte verschieben - Drag & Drop
              </div>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 shadow-lg max-w-[200px]">
          <p className="text-xs font-medium text-foreground mb-2">Kategorien</p>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
            {Object.entries(categoryConfig).slice(0, 6).map(([key, config]) => (
              <div key={key} className="flex items-center gap-1.5">
                <div className={cn("w-2.5 h-2.5 rounded-full", config.color)} />
                <span className="text-muted-foreground">{config.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Detail Sidebar */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute top-0 right-0 w-80 max-h-full overflow-auto bg-card border border-border rounded-xl shadow-2xl z-40"
          >
            <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-4 h-4 rounded-full",
                  categoryConfig[selectedProduct.category]?.color || "bg-gray-500"
                )} />
                <span className="text-sm font-medium text-foreground">Produkt-Details</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setSelectedProduct(null);
                  setHighlightedProduct(null);
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {selectedProduct.imageUrl && (
              <div className="relative aspect-square bg-muted">
                <img
                  src={selectedProduct.imageUrl.replace("w=200&h=200", "w=600&h=600")}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-semibold text-white">{selectedProduct.name}</h3>
                  <p className="text-white/80 text-sm">{categoryConfig[selectedProduct.category]?.label}</p>
                </div>
              </div>
            )}

            <div className="p-4 space-y-4">
              {selectedProduct.description && (
                <p className="text-sm text-muted-foreground">{selectedProduct.description}</p>
              )}

              <div className="flex items-center justify-between py-3 border-y border-border">
                <span className="text-sm text-muted-foreground">Preis</span>
                <span className="text-xl font-bold text-copper">CHF {selectedProduct.estimatedCost}</span>
              </div>

              {selectedProduct.shopLinks && selectedProduct.shopLinks.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-foreground">Jetzt kaufen bei:</p>
                  <div className="flex flex-col gap-2">
                    {selectedProduct.shopLinks.map((shop, idx) => (
                      <a
                        key={idx}
                        href={shop.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "flex items-center justify-between px-4 py-3 rounded-lg",
                          "text-sm font-medium text-white transition-all hover:scale-[1.02]",
                          shopLogos[shop.shop].color
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <ExternalLink className="w-4 h-4" />
                          {shopLogos[shop.shop].name}
                        </div>
                        {shop.price && (
                          <span className="font-bold">CHF {shop.price}</span>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2">
                <p className="text-xs text-muted-foreground">
                  Position: {Math.round(selectedProduct.position.x)}%, {Math.round(selectedProduct.position.y)}%
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Quick List */}
      <div className="mt-4 flex flex-wrap gap-2">
        {products.map((product, index) => {
          const config = categoryConfig[product.category] || categoryConfig.extra;
          return (
            <button
              key={product.id}
              onClick={() => highlightProductInImage(product.id)}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs",
                "bg-muted hover:bg-muted/80 transition-colors",
                highlightedProduct === product.id && "ring-2 ring-copper bg-copper/10"
              )}
            >
              <div className={cn("w-3 h-3 rounded-full", config.color)} />
              <span className="font-medium">{index + 1}. {product.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
