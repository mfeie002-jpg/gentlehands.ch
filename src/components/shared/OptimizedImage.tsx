import { useState, useRef, useEffect, memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: "square" | "video" | "portrait" | "wide" | "auto";
  priority?: boolean;
  blur?: boolean;
  zoom?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
  quality?: number;
}

// Helper to generate WebP source with size variants
const generateSrcSet = (src: string, widths: number[] = [320, 640, 960, 1280, 1920]) => {
  // For external URLs or already processed images, return as-is
  if (src.startsWith('http') || src.startsWith('data:') || src.includes('?')) {
    return undefined;
  }
  
  return widths
    .map((w) => `${src}?w=${w}&format=webp&quality=80 ${w}w`)
    .join(', ');
};

// Get WebP version of an image
const getWebPSrc = (src: string, quality = 80): string => {
  if (src.startsWith('http') || src.startsWith('data:') || src.includes('?format=webp')) {
    return src;
  }
  return `${src}?format=webp&quality=${quality}`;
};

export const OptimizedImage = memo(({
  src,
  alt,
  className,
  containerClassName,
  aspectRatio = "auto",
  priority = false,
  blur = true,
  zoom = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  width,
  height,
  quality = 80,
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate optimized sources
  const webpSrc = getWebPSrc(src, quality);
  const srcSet = generateSrcSet(src);

  useEffect(() => {
    if (priority || !containerRef.current) {
      setIsInView(true);
      // Preload priority images with WebP
      if (priority && src) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = webpSrc;
        link.type = 'image/webp';
        document.head.appendChild(link);
        return () => {
          if (document.head.contains(link)) {
            document.head.removeChild(link);
          }
        };
      }
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [priority, src, webpSrc]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    wide: "aspect-[21/9]",
    auto: "",
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden bg-muted/30",
        aspectClasses[aspectRatio],
        zoom && "group",
        containerClassName
      )}
    >
      {/* Skeleton with shimmer */}
      <AnimatePresence>
        {!isLoaded && !hasError && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <Skeleton className="w-full h-full" />
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
          <span className="text-sm">Bild nicht verfügbar</span>
        </div>
      )}
      
      {isInView && !hasError && (
        <picture>
          {/* WebP source for modern browsers */}
          <source
            type="image/webp"
            srcSet={srcSet || webpSrc}
            sizes={sizes}
          />
          {/* Fallback for older browsers */}
          <motion.img
            ref={imgRef}
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes={sizes}
            loading={priority ? "eager" : "lazy"}
            decoding={priority ? "sync" : "async"}
            // @ts-ignore - fetchPriority is valid but not in types yet
            fetchpriority={priority ? "high" : "auto"}
            onLoad={handleLoad}
            onError={handleError}
            initial={{ opacity: 0, filter: blur ? "blur(20px)" : "blur(0px)", scale: blur ? 1.05 : 1 }}
            animate={{ 
              opacity: isLoaded ? 1 : 0, 
              filter: isLoaded ? "blur(0px)" : blur ? "blur(20px)" : "blur(0px)",
              scale: isLoaded ? 1 : blur ? 1.05 : 1
            }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className={cn(
              "w-full h-full object-cover",
              zoom && "transition-transform duration-700 group-hover:scale-110",
              className
            )}
          />
        </picture>
      )}
    </div>
  );
});

OptimizedImage.displayName = "OptimizedImage";
