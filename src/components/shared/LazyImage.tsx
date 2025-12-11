import { useState, useRef, useEffect, ImgHTMLAttributes, memo } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholderClassName?: string;
  wrapperClassName?: string;
  containerClassName?: string;
  threshold?: number;
  rootMargin?: string;
  aspectRatio?: "square" | "video" | "portrait" | "wide" | "auto";
  priority?: boolean;
  blur?: boolean;
  quality?: 'low' | 'medium' | 'high';
}

// Low-quality image placeholder generator (LQIP-style blur)
const generatePlaceholderStyle = (blur: boolean) => ({
  filter: blur ? 'blur(20px)' : 'none',
  transform: blur ? 'scale(1.1)' : 'scale(1)',
});

export const LazyImage = memo(({
  src,
  alt,
  className,
  placeholderClassName,
  wrapperClassName,
  containerClassName,
  threshold = 0.01,
  rootMargin = '300px',
  aspectRatio = 'auto',
  priority = false,
  blur = true,
  quality = 'high',
  ...props
}: LazyImageProps) => {
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
      { threshold, rootMargin }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, priority]);

  // Preload priority images
  useEffect(() => {
    if (priority && src) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [priority, src]);

  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    wide: "aspect-[21/9]",
    auto: "",
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div 
      ref={containerRef}
      className={cn(
        'relative overflow-hidden bg-muted/30', 
        aspectRatio !== 'auto' && aspectClasses[aspectRatio],
        wrapperClassName,
        containerClassName
      )}
    >
      {/* Animated placeholder skeleton */}
      <AnimatePresence>
        {!isLoaded && !hasError && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={cn(
              'absolute inset-0 bg-gradient-to-br from-muted via-muted/60 to-muted',
              placeholderClassName
            )}
            aria-hidden="true"
          >
            {/* Shimmer effect */}
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
          className={cn(
            'w-full h-full object-cover',
            className
          )}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          // @ts-ignore - fetchPriority is valid but not in types yet
          fetchpriority={priority ? "high" : "auto"}
          initial={blur ? { opacity: 0, filter: 'blur(20px)', scale: 1.05 } : { opacity: 0 }}
          animate={
            isLoaded 
              ? { opacity: 1, filter: 'blur(0px)', scale: 1 } 
              : blur 
                ? { opacity: 0.3, filter: 'blur(20px)', scale: 1.05 } 
                : { opacity: 0 }
          }
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          {...props}
        />
      )}
    </div>
  );
});

LazyImage.displayName = 'LazyImage';
