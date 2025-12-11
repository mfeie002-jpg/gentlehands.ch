import { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Grid, Rows, ZoomIn, ZoomOut, Camera, Download, Share2, Maximize2 } from "lucide-react";
import { SEOHead } from "@/components/shared/SEOHead";
import { FloatingElements } from "@/components/shared/FloatingElements";
import { LazyImage } from "@/components/shared/LazyImage";
// Room/Atmosphere Images
import heroImage from "@/assets/hero-spa-room.jpg";
import spaMassageRoom from "@/assets/spa-massage-room.jpg";
import aromatherapyOils from "@/assets/aromatherapy-oils.jpg";
import wellnessLounge from "@/assets/wellness-lounge.jpg";

// Theme Images
import oceanImage from "@/assets/theme-ocean.jpg";
import alpineImage from "@/assets/theme-alpine.jpg";
import darkImage from "@/assets/theme-dark.jpg";
import zenImage from "@/assets/theme-zen.jpg";
import urbanImage from "@/assets/theme-urban.jpg";

// Massage Hands Images
import massageHandsBack from "@/assets/massage-hands-back.jpg";
import massageHandsShoulders from "@/assets/massage-hands-shoulders.jpg";
import massageHandsNeck from "@/assets/massage-hands-neck.jpg";
import massageHandsLowerBack from "@/assets/massage-hands-lower-back.jpg";
import massageDeepRelease from "@/assets/massage-deep-release.jpg";
import massageStressReset from "@/assets/massage-stress-reset.jpg";

// Themed Massage Images
import massageOverhead from "@/assets/massage-overhead-view.jpg";
import massageOceanTheme from "@/assets/massage-ocean-theme.jpg";
import massageDarkTheme from "@/assets/massage-dark-theme.jpg";
import massageZenTheme from "@/assets/massage-zen-theme.jpg";
import massageAlpineTheme from "@/assets/massage-alpine-theme.jpg";
import massageHotStones from "@/assets/massage-hot-stones.jpg";

// Emotional Images
import emotionalRelaxedFace from "@/assets/emotional-relaxed-face.jpg";
import emotionalTherapistHands from "@/assets/emotional-therapist-hands.jpg";
import emotionalPrivateMoment from "@/assets/emotional-private-moment.jpg";
import emotionalContentSmile from "@/assets/emotional-content-smile.jpg";
import emotionalInnerPeace from "@/assets/emotional-inner-peace.jpg";
import emotionalDeepRest from "@/assets/emotional-deep-rest.jpg";

const galleryImages = [
  { src: massageHandsBack, alt: "Sanfte Rückenmassage", category: "Massagen", featured: true },
  { src: massageHandsShoulders, alt: "Entspannende Schultermassage", category: "Massagen", featured: true },
  { src: massageHandsNeck, alt: "Wohltuende Nackenmassage", category: "Massagen", featured: false },
  { src: massageHandsLowerBack, alt: "Lösende Massage unterer Rücken", category: "Massagen", featured: false },
  { src: massageDeepRelease, alt: "Deep Release Session", category: "Massagen", featured: true },
  { src: massageStressReset, alt: "Stress Reset Behandlung", category: "Massagen", featured: false },
  { src: emotionalTherapistHands, alt: "Professionelle Berührung", category: "Massagen", featured: true },
  { src: massageOverhead, alt: "Verwöhnende Ganzkörpermassage", category: "Erlebnisse", featured: true },
  { src: massageOceanTheme, alt: "Ozean Theme Massage", category: "Erlebnisse", featured: false },
  { src: massageDarkTheme, alt: "Deep Dark Relax Massage", category: "Erlebnisse", featured: true },
  { src: massageZenTheme, alt: "Zen Garden Massage", category: "Erlebnisse", featured: false },
  { src: massageAlpineTheme, alt: "Alpine Stille Massage", category: "Erlebnisse", featured: true },
  { src: massageHotStones, alt: "Hot Stone Behandlung", category: "Erlebnisse", featured: false },
  { src: heroImage, alt: "Luxuriöser Massageraum", category: "Räumlichkeiten", featured: false },
  { src: spaMassageRoom, alt: "Private Massage Suite", category: "Räumlichkeiten", featured: false },
  { src: wellnessLounge, alt: "Wellness Lounge", category: "Räumlichkeiten", featured: false },
  { src: aromatherapyOils, alt: "Aromatherapie Öle", category: "Details", featured: false },
  { src: oceanImage, alt: "Ozean & Palmen Theme", category: "Themes", featured: false },
  { src: alpineImage, alt: "Alpine Stille Theme", category: "Themes", featured: false },
  { src: darkImage, alt: "Deep Dark Relax Theme", category: "Themes", featured: false },
  { src: zenImage, alt: "Zen Garden Theme", category: "Themes", featured: false },
  { src: urbanImage, alt: "Urban Loft Theme", category: "Themes", featured: false },
  { src: emotionalRelaxedFace, alt: "Tiefe Entspannung", category: "Emotionen", featured: true },
  { src: emotionalPrivateMoment, alt: "Privater Moment der Ruhe", category: "Emotionen", featured: false },
  { src: emotionalContentSmile, alt: "Zufriedenes Lächeln", category: "Emotionen", featured: true },
  { src: emotionalInnerPeace, alt: "Innerer Frieden", category: "Emotionen", featured: false },
  { src: emotionalDeepRest, alt: "Tiefe Erholung", category: "Emotionen", featured: true },
];

const categories = ["Alle", "Massagen", "Erlebnisse", "Emotionen", "Räumlichkeiten", "Themes", "Details"];

const Galerie = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("Alle");
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("grid");
  const [zoomLevel, setZoomLevel] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.1]);

  const filteredImages = activeCategory === "Alle" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  };
  const closeLightbox = () => {
    setSelectedImage(null);
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  };
  const nextImage = () => {
    setSelectedImage((prev) => prev !== null ? (prev + 1) % filteredImages.length : 0);
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  };
  const prevImage = () => {
    setSelectedImage((prev) => prev !== null ? (prev - 1 + filteredImages.length) % filteredImages.length : 0);
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 1));
    if (zoomLevel <= 1.5) setImagePosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "+" || e.key === "=") handleZoomIn();
      if (e.key === "-") handleZoomOut();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, filteredImages.length, zoomLevel]);

  useEffect(() => {
    if (selectedImage !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedImage]);

  return (
    <Layout>
      <SEOHead 
        title="Galerie | GentleHands Zürich"
        description="Entdecken Sie unsere atmosphärischen Räume, Massage-Erlebnisse und Themes in der GentleHands Galerie."
        canonical="https://gentlehands.ch/galerie"
      />

      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY, scale: heroScale }}>
          <img src={massageHandsBack} alt="GentleHands Galerie" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </motion.div>
        
        {/* Ambient effects */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute top-1/4 -right-32 w-96 h-96 bg-copper/10 rounded-full blur-[120px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, delay: 4 }}
          />
        </div>
        
        <FloatingElements variant="dots" />
        
        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-copper/10 border border-copper/20 mb-6"
            >
              <Camera size={16} className="text-copper" />
              <span className="text-copper text-sm font-medium">{galleryImages.length} Bilder</span>
            </motion.div>
            
            <motion.h1 
              className="text-foreground mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Einblicke in unsere <span className="text-gradient-copper">Welt</span>
            </motion.h1>
            <motion.p 
              className="text-muted-foreground text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Erleben Sie die Atmosphäre von GentleHands schon vor Ihrem Besuch.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter & View Toggle */}
      <section className="py-8 border-b border-border/50 sticky top-16 z-30 bg-background/80 backdrop-blur-md">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all relative overflow-hidden ${
                    activeCategory === category
                      ? "bg-copper text-accent-foreground shadow-lg shadow-copper/20"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {activeCategory === category && (
                    <motion.div
                      layoutId="categoryIndicator"
                      className="absolute inset-0 bg-copper rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2 }}
                    />
                  )}
                  {category}
                  {activeCategory !== category && (
                    <span className="ml-1 text-xs text-muted-foreground">
                      ({category === "Alle" ? galleryImages.length : galleryImages.filter(i => i.category === category).length})
                    </span>
                  )}
                </motion.button>
              ))}
            </div>
            
            <div className="flex items-center gap-2 bg-secondary rounded-lg p-1">
              <motion.button
                onClick={() => setViewMode("grid")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded transition-all ${viewMode === "grid" ? "bg-background shadow-sm" : ""}`}
              >
                <Grid size={18} className={viewMode === "grid" ? "text-copper" : "text-muted-foreground"} />
              </motion.button>
              <motion.button
                onClick={() => setViewMode("masonry")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded transition-all ${viewMode === "masonry" ? "bg-background shadow-sm" : ""}`}
              >
                <Rows size={18} className={viewMode === "masonry" ? "text-copper" : "text-muted-foreground"} />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding-sm">
        <div className="container-wide">
          <motion.div 
            layout
            className={viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              : "columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
            }
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.src}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.03, type: "spring", bounce: 0.2 }}
                  className={viewMode === "masonry" ? "break-inside-avoid mb-4" : ""}
                >
                  <motion.button
                    onClick={() => openLightbox(index)}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    className={`group relative w-full rounded-2xl overflow-hidden bg-secondary ${
                      viewMode === "grid" 
                        ? "aspect-[4/3]" 
                        : image.featured ? "aspect-[3/4]" : "aspect-[4/3]"
                    }`}
                  >
                    <LazyImage
                      src={image.src}
                      alt={image.alt}
                      className="transition-all duration-700 group-hover:scale-110"
                      threshold={0.1}
                      rootMargin="100px"
                    />
                    
                    {/* Gradient overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 bg-copper/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay" />
                    
                    {/* Zoom Icon with glow */}
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                    >
                      <motion.div 
                        className="w-16 h-16 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center border border-white/20"
                        whileHover={{ scale: 1.1 }}
                        style={{ boxShadow: '0 0 30px rgba(181, 120, 80, 0.3)' }}
                      >
                        <Maximize2 size={24} className="text-white" />
                      </motion.div>
                    </motion.div>
                    
                    {/* Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white text-sm font-medium drop-shadow-lg">{image.alt}</p>
                      <span className="text-white/70 text-xs">{image.category}</span>
                    </div>
                    
                    {/* Featured badge */}
                    {image.featured && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="absolute top-3 left-3 px-2 py-1 bg-copper/90 backdrop-blur-sm text-accent-foreground text-xs font-medium rounded-full"
                      >
                        ✨ Featured
                      </motion.div>
                    )}
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Fullscreen Lightbox with Zoom */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/98 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            {/* Controls */}
            <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
              {/* Zoom controls */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); handleZoomOut(); }}
                className="p-3 rounded-full bg-background/10 hover:bg-background/20 text-white transition-colors"
                disabled={zoomLevel <= 1}
              >
                <ZoomOut size={20} />
              </motion.button>
              <span className="text-white/70 text-sm min-w-[40px] text-center">{Math.round(zoomLevel * 100)}%</span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); handleZoomIn(); }}
                className="p-3 rounded-full bg-background/10 hover:bg-background/20 text-white transition-colors"
                disabled={zoomLevel >= 3}
              >
                <ZoomIn size={20} />
              </motion.button>
              
              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeLightbox}
                className="p-3 rounded-full bg-background/10 hover:bg-background/20 text-white transition-colors ml-2"
              >
                <X size={24} />
              </motion.button>
            </div>
            
            {/* Navigation */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              whileHover={{ scale: 1.1, x: 4 }}
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-background/10 hover:bg-background/20 text-white transition-all backdrop-blur-sm"
            >
              <ChevronLeft size={32} />
            </motion.button>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              whileHover={{ scale: 1.1, x: -4 }}
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-background/10 hover:bg-background/20 text-white transition-all backdrop-blur-sm"
            >
              <ChevronRight size={32} />
            </motion.button>
            
            {/* Image Container with zoom */}
            <div className="h-full flex flex-col items-center justify-center p-4 md:p-12 overflow-hidden">
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-5xl w-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.img
                  ref={imageRef}
                  src={filteredImages[selectedImage].src}
                  alt={filteredImages[selectedImage].alt}
                  className="max-w-full max-h-[70vh] rounded-2xl object-contain shadow-2xl cursor-zoom-in"
                  style={{
                    transform: `scale(${zoomLevel}) translate(${imagePosition.x}px, ${imagePosition.y}px)`,
                    transition: isDragging ? 'none' : 'transform 0.3s ease-out'
                  }}
                  drag={zoomLevel > 1}
                  dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={() => setIsDragging(false)}
                  onClick={() => zoomLevel < 3 && handleZoomIn()}
                />
                
                {/* Decorative frame */}
                <div className="absolute inset-0 pointer-events-none rounded-2xl border border-copper/20" />
              </motion.div>
              
              {/* Image Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-center"
              >
                <p className="text-white text-lg font-display">
                  {filteredImages[selectedImage].alt}
                </p>
                <p className="text-white/60 text-sm mt-1">
                  {filteredImages[selectedImage].category}
                </p>
              </motion.div>
              
              {/* Thumbnail Navigation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 flex items-center gap-2 overflow-x-auto max-w-full pb-2 px-4"
              >
                {filteredImages.map((img, idx) => (
                  <motion.button
                    key={img.src}
                    onClick={(e) => { e.stopPropagation(); setSelectedImage(idx); setZoomLevel(1); }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-16 h-12 rounded-lg overflow-hidden shrink-0 transition-all ${
                      idx === selectedImage 
                        ? "ring-2 ring-copper scale-110 shadow-lg shadow-copper/30" 
                        : "opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img src={img.src} alt="" className="w-full h-full object-cover" />
                  </motion.button>
                ))}
              </motion.div>
              
              {/* Counter */}
              <motion.p 
                className="text-white/50 text-sm mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {selectedImage + 1} / {filteredImages.length}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute top-0 right-0 w-96 h-96 bg-copper/5 rounded-full blur-[100px]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>
        
        <div className="container-narrow text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-foreground mb-6">
              Überzeugt?
            </h2>
            <p className="text-muted-foreground mb-8">
              Erleben Sie unsere Räume persönlich – buchen Sie jetzt Ihr erstes GentleHands-Erlebnis.
            </p>
            <Button variant="copper" size="lg" asChild className="group">
              <Link to="/buchung">
                Erlebnis anfragen
                <motion.span
                  className="inline-block ml-2"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Galerie;