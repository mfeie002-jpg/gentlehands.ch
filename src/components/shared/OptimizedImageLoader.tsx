import { useState, useRef, useEffect, memo } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface OptimizedImageLoaderProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: "square" | "video" | "portrait" | "wide" | "auto";
  priority?: boolean;
  blur?: boolean;
  showSkeleton?: boolean;
  onLoadComplete?: () => void;
  width?: number;
  height?: number;
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
 * - Skeleton placeholder
 * - Priority loading option
 * - ARIA accessibility
 */
export const OptimizedImageLoader = memo(({
  src,
  alt,
  className,
  aspectRatio = "auto",
  priority = false,
  blur = true,
  showSkeleton = true,
  onLoadComplete,
  width,
  height,
}: OptimizedImageLoaderProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
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
        rootMargin: "100px 0px" 
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoadComplete?.();
  };

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative overflow-hidden bg-muted",
        aspectRatioClasses[aspectRatio],
        className
      )}
      role="img"
      aria-label={alt}
    >
      {/* Skeleton placeholder */}
      <AnimatePresence>
        {showSkeleton && !isLoaded && !hasError && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 skeleton-pulse"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
          <span className="text-sm">Bild nicht verfügbar</span>
        </div>
      )}

      {/* Actual image */}
      {isInView && !hasError && (
        <motion.img
          ref={imgRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          initial={blur ? { opacity: 0, filter: "blur(20px)" } : { opacity: 0 }}
          animate={
            isLoaded 
              ? { opacity: 1, filter: "blur(0px)" } 
              : blur 
                ? { opacity: 0.5, filter: "blur(20px)" } 
                : { opacity: 0 }
          }
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={cn(
            "w-full h-full object-cover",
            !isLoaded && "invisible"
          )}
        />
      )}
    </div>
  );
});

OptimizedImageLoader.displayName = "OptimizedImageLoader";
