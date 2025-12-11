import { useState, useRef, useEffect, memo, useCallback } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface OptimizedImageLoaderProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: "square" | "video" | "portrait" | "wide" | "auto";
  priority?: boolean;
  blur?: boolean;
  showSkeleton?: boolean;
  onLoadComplete?: () => void;
  width?: number;
  height?: number;
  sizes?: string;
}

const aspectRatioClasses = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
  wide: "aspect-[21/9]",
  auto: "",
};

/**
 * Optimized image component with:
 * - Intersection Observer for lazy loading
 * - Blur-up effect on load
 * - Skeleton placeholder with shimmer
 * - Priority loading option with preload
 * - ARIA accessibility
 * - Native lazy loading fallback
 * - fetchPriority for LCP optimization
 */
export const OptimizedImageLoader = memo(({
  src,
  alt,
  className,
  containerClassName,
  aspectRatio = "auto",
  priority = false,
  blur = true,
  showSkeleton = true,
  onLoadComplete,
  width,
  height,
  sizes,
}: OptimizedImageLoaderProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      // Preload priority images
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
      return () => {
        document.head.removeChild(link);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.01,
        rootMargin: "300px 0px" 
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority, src]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoadComplete?.();
  }, [onLoadComplete]);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative overflow-hidden bg-muted/30",
        aspectRatioClasses[aspectRatio],
        containerClassName
      )}
      role="img"
      aria-label={alt}
    >
      {/* Skeleton placeholder with shimmer */}
      <AnimatePresence>
        {showSkeleton && !isLoaded && !hasError && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-gradient-to-br from-muted via-muted/60 to-muted"
            aria-hidden="true"
          >
            {/* Shimmer animation */}
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

      {/* Actual image with blur-up effect */}
      {isInView && !hasError && (
        <motion.img
          ref={imgRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          // @ts-ignore - fetchPriority is valid but not in types yet
          fetchpriority={priority ? "high" : "auto"}
          initial={blur ? { opacity: 0, filter: "blur(20px)", scale: 1.05 } : { opacity: 0 }}
          animate={
            isLoaded 
              ? { opacity: 1, filter: "blur(0px)", scale: 1 } 
              : blur 
                ? { opacity: 0.3, filter: "blur(20px)", scale: 1.05 } 
                : { opacity: 0 }
          }
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className={cn(
            "w-full h-full object-cover",
            className
          )}
        />
      )}
    </div>
  );
});

OptimizedImageLoader.displayName = "OptimizedImageLoader";
