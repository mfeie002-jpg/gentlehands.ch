import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ZoomIn, ZoomOut, Move, Eye, EyeOff, 
  Maximize2, ExternalLink, X, Check,
  GripVertical, Target, Cloud, CloudOff, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useDraggableProducts } from "@/hooks/useDraggableProducts";

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
  isFixed?: boolean;
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
  const [zoom, setZoom] = useState(1);
  const [showLabels, setShowLabels] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [highlightedProduct, setHighlightedProduct] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductMarker | null>(null);
  const [fullscreen, setFullscreen] = useState(false);

  const {
    containerRef,
    draggingProduct,
    isDragging,
    hasUnsavedChanges,
    isSaving,
    savedStatus,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    forceSave
  } = useDraggableProducts({
    products,
    onPositionChange: (id, pos) => onProductPositionChange?.(id, pos),
    autoSaveDelay: 1200
  });

  const handleProductClick = (product: ProductMarker) => {
    if (editMode) return;
    setSelectedProduct(product);
    setHighlightedProduct(product.id);
    onProductClick?.(product);
  };

  const highlightProductInImage = (productId: string) => {
    setHighlightedProduct(productId);
    const productEl = document.getElementById(`marker-${productId}`);
    if (productEl) {
      productEl.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    }
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
          
          {/* Auto-save indicator */}
          <AnimatePresence mode="wait">
            {savedStatus === "saving" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-1.5 text-xs text-muted-foreground"
              >
                <Loader2 className="w-3 h-3 animate-spin" />
                Speichern...
              </motion.div>
            )}
            {savedStatus === "saved" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-1.5 text-xs text-emerald-600"
              >
                <Check className="w-3 h-3" />
                Gespeichert
              </motion.div>
            )}
          </AnimatePresence>
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
          
          {editMode && hasUnsavedChanges && (
            <Button
              variant="outline"
              size="sm"
              onClick={forceSave}
              disabled={isSaving}
              className="gap-1.5"
            >
              {isSaving ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Cloud className="w-3.5 h-3.5" />
              )}
              <span className="hidden sm:inline">Jetzt speichern</span>
            </Button>
          )}
          
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
          fullscreen && "fixed inset-4 z-50 rounded-2xl",
          editMode && "ring-2 ring-copper ring-opacity-50"
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
          className={cn(
            "relative overflow-auto",
            editMode && "cursor-crosshair"
          )}
          style={{ maxHeight: fullscreen ? "calc(100vh - 4rem)" : "500px" }}
          onMouseMove={editMode ? handleDragMove : undefined}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchMove={editMode ? handleDragMove : undefined}
          onTouchEnd={handleDragEnd}
        >
          <div 
            className="relative transition-transform duration-200 origin-top-left"
            style={{ transform: `scale(${zoom})`, width: zoom > 1 ? `${100 / zoom}%` : "100%" }}
          >
            {/* Phase Image */}
            <img
              src={phaseImage}
              alt={`${roomName} - Phase ${phase}`}
              className="w-full h-auto select-none"
              draggable={false}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 pointer-events-none" />

            {/* Product Markers */}
            {products.map((product, index) => {
              const config = categoryConfig[product.category] || categoryConfig.extra;
              const isHighlighted = highlightedProduct === product.id;
              const isBeingDragged = draggingProduct === product.id;
              const isPurchased = product.isCompleted;

              return (
                <motion.div
                  key={product.id}
                  id={`marker-${product.id}`}
                  className={cn(
                    "absolute group touch-none select-none",
                    editMode && !product.isFixed ? "cursor-grab active:cursor-grabbing" : "cursor-pointer",
                    product.isFixed && "cursor-default",
                    isBeingDragged && "z-50"
                  )}
                  style={{
                    left: `${product.position.x}%`,
                    top: `${product.position.y}%`,
                    transform: "translate(-50%, -50%)",
                    zIndex: isBeingDragged ? 50 : isHighlighted ? 40 : product.isFixed ? 5 : 10
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: isBeingDragged ? 1.2 : isHighlighted ? 1.15 : 1, 
                    opacity: 1 
                  }}
                  transition={{ 
                    delay: index * 0.03, 
                    duration: 0.15,
                    scale: { type: "spring", stiffness: 300, damping: 20 }
                  }}
                  onMouseDown={(e) => editMode && handleDragStart(e, product)}
                  onTouchStart={(e) => editMode && handleDragStart(e, product)}
                  onClick={() => !editMode && !isDragging && handleProductClick(product)}
                >
                  {/* Drag visual feedback ring */}
                  {isBeingDragged && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: [1, 1.5, 1.2], opacity: [0.8, 0.3, 0.5] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                      className="absolute inset-0 -m-4 w-20 h-20 rounded-xl bg-copper/40"
                    />
                  )}

                  {/* Highlight Ring */}
                  <AnimatePresence>
                    {isHighlighted && !isBeingDragged && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: [1, 1.3, 1.1], opacity: [1, 0.5, 0.7] }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute inset-0 -m-2 rounded-xl bg-copper/40"
                      />
                    )}
                  </AnimatePresence>

                  {/* Product Image Card */}
                  <motion.div
                    className={cn(
                      "relative w-14 h-14 rounded-xl overflow-hidden shadow-lg border-2 transition-all",
                      isPurchased 
                        ? "border-emerald-500 shadow-emerald-500/30" 
                        : "border-white/50 shadow-black/30",
                      isBeingDragged && "ring-4 ring-copper shadow-2xl scale-110",
                      isHighlighted && "ring-4 ring-copper shadow-2xl",
                      !isPurchased && "grayscale-[70%] opacity-70"
                    )}
                    animate={!isBeingDragged && !isHighlighted && !isPurchased ? {
                      scale: [1, 1.05, 1],
                    } : {}}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  >
                    {/* Product Image or Placeholder */}
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                    ) : (
                      <div className={cn(
                        "w-full h-full flex items-center justify-center",
                        config.color
                      )}>
                        <span className="text-lg text-white">📦</span>
                      </div>
                    )}

                    {/* Shadow/Ghost overlay for unpurchased */}
                    {!isPurchased && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <span className="text-white text-xs">?</span>
                        </div>
                      </div>
                    )}

                    {/* Purchased checkmark */}
                    {isPurchased && (
                      <div className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shadow-md">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}

                    {/* Category indicator */}
                    <div className={cn(
                      "absolute bottom-0.5 left-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[8px]",
                      config.color
                    )}>
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>

                    {/* Price tag */}
                    <div className="absolute bottom-0 right-0 bg-black/70 text-white text-[8px] px-1 py-0.5 rounded-tl">
                      CHF {product.estimatedCost}
                    </div>
                  </motion.div>

                  {/* Edit mode grip */}
                  {editMode && !product.isFixed && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-copper flex items-center justify-center shadow-md">
                      <GripVertical className="w-3 h-3 text-white" />
                    </div>
                  )}

                  {/* Label */}
                  {showLabels && !editMode && !isBeingDragged && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "absolute left-1/2 -translate-x-1/2 mt-1 top-full",
                        "bg-background/95 backdrop-blur-sm rounded-lg px-2 py-1",
                        "border border-border shadow-md",
                        "whitespace-nowrap text-[10px] font-medium max-w-[100px] truncate",
                        "pointer-events-none",
                        isHighlighted && "bg-copper text-white border-copper",
                        !isPurchased && "opacity-70"
                      )}
                    >
                      {product.name}
                    </motion.div>
                  )}

                  {/* Drag mode position label */}
                  {editMode && isBeingDragged && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute left-1/2 -translate-x-1/2 mt-12 top-full bg-copper text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg whitespace-nowrap"
                    >
                      {Math.round(product.position.x)}%, {Math.round(product.position.y)}%
                    </motion.div>
                  )}

                  {/* Hover Tooltip with Full Details */}
                  <AnimatePresence>
                    {!editMode && !isHighlighted && !isBeingDragged && (
                      <div className="absolute z-30 left-1/2 -translate-x-1/2 bottom-full mb-3 min-w-[200px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <div className="bg-card rounded-xl shadow-xl border border-border p-3">
                          <div className="flex items-start gap-3">
                            {product.imageUrl && (
                              <img
                                src={product.imageUrl}
                                alt={product.name}
                                className={cn(
                                  "w-16 h-16 rounded-lg object-cover border",
                                  isPurchased ? "border-emerald-500" : "border-border grayscale opacity-70"
                                )}
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-foreground text-sm">{product.name}</h4>
                              <p className="text-xs text-muted-foreground mt-0.5">{config.label}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-sm font-bold text-copper">CHF {product.estimatedCost}</span>
                                {isPurchased ? (
                                  <span className="text-[10px] bg-emerald-500/20 text-emerald-600 px-1.5 py-0.5 rounded-full">Gekauft ✓</span>
                                ) : (
                                  <span className="text-[10px] bg-amber-500/20 text-amber-600 px-1.5 py-0.5 rounded-full">Ausstehend</span>
                                )}
                              </div>
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
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-4 left-4 bg-copper text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 shadow-lg"
              >
                <Move className="w-3 h-3" />
                Drag & Drop aktiv • Auto-Save
              </motion.div>
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
                          "flex items-center justify-between p-3 rounded-lg text-white",
                          shopLogos[shop.shop]?.color || "bg-gray-600"
                        )}
                      >
                        <span className="font-medium">{shopLogos[shop.shop]?.name}</span>
                        <div className="flex items-center gap-2">
                          {shop.price && (
                            <span className="text-sm opacity-90">CHF {shop.price}</span>
                          )}
                          <ExternalLink className="w-4 h-4" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Position Info */}
              <div className="text-xs text-muted-foreground pt-2 border-t border-border">
                Position: {Math.round(selectedProduct.position.x)}% × {Math.round(selectedProduct.position.y)}%
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Quick List with Images */}
      <div className="mt-4 bg-muted/30 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-medium text-foreground">Produkte in dieser Phase</p>
          <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-emerald-500" /> Gekauft
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-amber-500" /> Ausstehend
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {products.filter(p => !p.isFixed).map((product) => {
            const config = categoryConfig[product.category] || categoryConfig.extra;
            const isHighlighted = highlightedProduct === product.id;
            const isPurchased = product.isCompleted;
            
            return (
              <button
                key={product.id}
                onClick={() => highlightProductInImage(product.id)}
                className={cn(
                  "relative flex flex-col items-center p-2 rounded-xl transition-all",
                  isHighlighted 
                    ? "bg-copper/20 ring-2 ring-copper shadow-lg" 
                    : "bg-background hover:bg-muted border border-border hover:border-copper/50",
                  !isPurchased && "opacity-70"
                )}
              >
                {/* Product Thumbnail */}
                <div className={cn(
                  "w-12 h-12 rounded-lg overflow-hidden mb-2 border-2 transition-all",
                  isPurchased ? "border-emerald-500" : "border-border grayscale"
                )}>
                  {product.imageUrl ? (
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className={cn("w-full h-full flex items-center justify-center", config.color)}>
                      <span className="text-white text-sm">📦</span>
                    </div>
                  )}
                </div>
                
                {/* Product Name */}
                <span className="text-[10px] text-center font-medium line-clamp-2 leading-tight">
                  {product.name}
                </span>
                
                {/* Price */}
                <span className="text-[9px] text-muted-foreground mt-0.5">
                  CHF {product.estimatedCost}
                </span>
                
                {/* Status Badge */}
                <div className={cn(
                  "absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center",
                  isPurchased ? "bg-emerald-500" : "bg-amber-500"
                )}>
                  {isPurchased ? (
                    <Check className="w-2.5 h-2.5 text-white" />
                  ) : (
                    <span className="text-[8px] text-white font-bold">!</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
