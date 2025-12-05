import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { X, ChevronLeft, ChevronRight, Grid, Rows, ZoomIn, Camera } from "lucide-react";
import { FloatingElements } from "@/components/shared/FloatingElements";

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

const galleryImages = [
  // Massage Hands - Featured
  { src: massageHandsBack, alt: "Sanfte Rückenmassage", category: "Massagen", featured: true },
  { src: massageHandsShoulders, alt: "Entspannende Schultermassage", category: "Massagen", featured: true },
  { src: massageHandsNeck, alt: "Wohltuende Nackenmassage", category: "Massagen", featured: false },
  { src: massageHandsLowerBack, alt: "Lösende Massage unterer Rücken", category: "Massagen", featured: false },
  { src: massageDeepRelease, alt: "Deep Release Session", category: "Massagen", featured: true },
  { src: massageStressReset, alt: "Stress Reset Behandlung", category: "Massagen", featured: false },
  
  // Themed Massages
  { src: massageOverhead, alt: "Verwöhnende Ganzkörpermassage", category: "Erlebnisse", featured: true },
  { src: massageOceanTheme, alt: "Ozean Theme Massage", category: "Erlebnisse", featured: false },
  { src: massageDarkTheme, alt: "Deep Dark Relax Massage", category: "Erlebnisse", featured: true },
  { src: massageZenTheme, alt: "Zen Garden Massage", category: "Erlebnisse", featured: false },
  { src: massageAlpineTheme, alt: "Alpine Stille Massage", category: "Erlebnisse", featured: true },
  { src: massageHotStones, alt: "Hot Stone Behandlung", category: "Erlebnisse", featured: false },
  
  // Rooms & Atmosphere
  { src: heroImage, alt: "Luxuriöser Massageraum", category: "Räumlichkeiten", featured: false },
  { src: spaMassageRoom, alt: "Private Massage Suite", category: "Räumlichkeiten", featured: false },
  { src: wellnessLounge, alt: "Wellness Lounge", category: "Räumlichkeiten", featured: false },
  { src: aromatherapyOils, alt: "Aromatherapie Öle", category: "Details", featured: false },
  
  // Theme Rooms
  { src: oceanImage, alt: "Ozean & Palmen Theme", category: "Themes", featured: false },
  { src: alpineImage, alt: "Alpine Stille Theme", category: "Themes", featured: false },
  { src: darkImage, alt: "Deep Dark Relax Theme", category: "Themes", featured: false },
  { src: zenImage, alt: "Zen Garden Theme", category: "Themes", featured: false },
  { src: urbanImage, alt: "Urban Loft Theme", category: "Themes", featured: false },
];

const categories = ["Alle", "Massagen", "Erlebnisse", "Räumlichkeiten", "Themes", "Details"];

const Galerie = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("Alle");
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("grid");

  const filteredImages = activeCategory === "Alle" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);
  const nextImage = () => setSelectedImage((prev) => prev !== null ? (prev + 1) % filteredImages.length : 0);
  const prevImage = () => setSelectedImage((prev) => prev !== null ? (prev - 1 + filteredImages.length) % filteredImages.length : 0);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, filteredImages.length]);

  // Lock body scroll when lightbox is open
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
      <Helmet>
        <title>Galerie | GentleHands Zürich</title>
        <meta
          name="description"
          content="Entdecken Sie unsere atmosphärischen Räume, Massage-Erlebnisse und Themes in der GentleHands Galerie. Bilder unserer exklusiven Wellness-Erlebnisse."
        />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <motion.div className="absolute inset-0">
          <img src={massageHandsBack} alt="GentleHands Galerie" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </motion.div>
        
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
            
            <h1 className="text-foreground mb-6">
              Einblicke in unsere Welt
            </h1>
            <p className="text-muted-foreground text-lg">
              Erleben Sie die Atmosphäre von GentleHands schon vor Ihrem Besuch.
              Jedes Detail ist auf Ihre Entspannung ausgerichtet.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter & View Toggle */}
      <section className="py-8 border-b border-border/50 sticky top-16 z-30 bg-background/80 backdrop-blur-md">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category
                      ? "bg-copper text-accent-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
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
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${viewMode === "grid" ? "bg-background shadow-sm" : ""}`}
              >
                <Grid size={18} className={viewMode === "grid" ? "text-copper" : "text-muted-foreground"} />
              </button>
              <button
                onClick={() => setViewMode("masonry")}
                className={`p-2 rounded ${viewMode === "masonry" ? "bg-background shadow-sm" : ""}`}
              >
                <Rows size={18} className={viewMode === "masonry" ? "text-copper" : "text-muted-foreground"} />
              </button>
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
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className={viewMode === "masonry" ? "break-inside-avoid mb-4" : ""}
                >
                  <button
                    onClick={() => openLightbox(index)}
                    className={`group relative w-full rounded-2xl overflow-hidden bg-secondary ${
                      viewMode === "grid" 
                        ? "aspect-[4/3]" 
                        : image.featured ? "aspect-[3/4]" : "aspect-[4/3]"
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Zoom Icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-14 h-14 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center">
                        <ZoomIn size={24} className="text-background" />
                      </div>
                    </div>
                    
                    {/* Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-background text-sm font-medium">{image.alt}</p>
                      <span className="text-background/70 text-xs">{image.category}</span>
                    </div>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/98"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 p-3 rounded-full bg-background/10 hover:bg-background/20 text-background transition-colors"
            >
              <X size={28} />
            </button>
            
            {/* Navigation */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-background/10 hover:bg-background/20 text-background transition-colors"
            >
              <ChevronLeft size={36} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-background/10 hover:bg-background/20 text-background transition-colors"
            >
              <ChevronRight size={36} />
            </button>
            
            {/* Image Container */}
            <div className="h-full flex flex-col items-center justify-center p-4 md:p-12">
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                src={filteredImages[selectedImage].src}
                alt={filteredImages[selectedImage].alt}
                className="max-w-full max-h-[80vh] rounded-2xl object-contain shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
              
              {/* Image Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-center"
              >
                <p className="text-background text-lg font-display">
                  {filteredImages[selectedImage].alt}
                </p>
                <p className="text-background/60 text-sm mt-1">
                  {filteredImages[selectedImage].category}
                </p>
              </motion.div>
              
              {/* Thumbnail Navigation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 flex items-center gap-2 overflow-x-auto max-w-full pb-2"
              >
                {filteredImages.map((img, idx) => (
                  <button
                    key={img.src}
                    onClick={(e) => { e.stopPropagation(); setSelectedImage(idx); }}
                    className={`w-16 h-12 rounded-lg overflow-hidden shrink-0 transition-all ${
                      idx === selectedImage 
                        ? "ring-2 ring-copper scale-110" 
                        : "opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img src={img.src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </motion.div>
              
              {/* Counter */}
              <p className="text-background/50 text-sm mt-4">
                {selectedImage + 1} / {filteredImages.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="section-padding bg-secondary/30">
        <div className="container-narrow text-center">
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
            <Button variant="copper" size="lg" asChild>
              <Link to="/buchung">Erlebnis anfragen</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Galerie;
