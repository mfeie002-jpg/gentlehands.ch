import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import heroImage from "@/assets/hero-spa-room.jpg";
import oceanImage from "@/assets/theme-ocean.jpg";
import alpineImage from "@/assets/theme-alpine.jpg";
import darkImage from "@/assets/theme-dark.jpg";
import zenImage from "@/assets/theme-zen.jpg";
import urbanImage from "@/assets/theme-urban.jpg";

const galleryImages = [
  { src: heroImage, alt: "Luxuriöser Massageraum", category: "Räumlichkeiten" },
  { src: oceanImage, alt: "Ozean & Palmen Theme", category: "Themes" },
  { src: alpineImage, alt: "Alpine Stille Theme", category: "Themes" },
  { src: darkImage, alt: "Deep Dark Relax Theme", category: "Themes" },
  { src: zenImage, alt: "Zen Garden Theme", category: "Themes" },
  { src: urbanImage, alt: "Urban Loft Theme", category: "Themes" },
];

const categories = ["Alle", "Räumlichkeiten", "Themes", "Details", "Atmosphäre"];

const Galerie = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("Alle");

  const filteredImages = activeCategory === "Alle" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);
  const nextImage = () => setSelectedImage((prev) => prev !== null ? (prev + 1) % filteredImages.length : 0);
  const prevImage = () => setSelectedImage((prev) => prev !== null ? (prev - 1 + filteredImages.length) % filteredImages.length : 0);

  return (
    <Layout>
      <Helmet>
        <title>Galerie | GentleHands Zürich</title>
        <meta
          name="description"
          content="Entdecken Sie unsere atmosphärischen Räume und Themes in der GentleHands Galerie. Bilder unserer exklusiven Wellness-Erlebnisse."
        />
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-copper font-medium tracking-wide uppercase text-sm mb-4">
              Galerie
            </p>
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

      {/* Category Filter */}
      <section className="py-8">
        <div className="container-wide">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding-sm">
        <div className="container-wide">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <button
                  onClick={() => openLightbox(index)}
                  className="group relative aspect-[4/3] w-full rounded-2xl overflow-hidden"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-accent-foreground text-sm font-medium bg-foreground/80 backdrop-blur-sm rounded-lg px-3 py-2">
                      {image.alt}
                    </p>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-background hover:text-copper transition-colors"
            >
              <X size={32} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 text-background hover:text-copper transition-colors"
            >
              <ChevronLeft size={48} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 text-background hover:text-copper transition-colors"
            >
              <ChevronRight size={48} />
            </button>
            <motion.img
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={filteredImages[selectedImage].src}
              alt={filteredImages[selectedImage].alt}
              className="max-w-full max-h-[85vh] rounded-xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-background text-center">
              {filteredImages[selectedImage].alt}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="section-padding bg-secondary/30">
        <div className="container-narrow text-center">
          <h2 className="text-foreground mb-6">
            Überzeugt?
          </h2>
          <p className="text-muted-foreground mb-8">
            Erleben Sie unsere Räume persönlich – buchen Sie jetzt Ihr erstes GentleHands-Erlebnis.
          </p>
          <Button variant="copper" size="lg" asChild>
            <Link to="/buchung">Erlebnis anfragen</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Galerie;
