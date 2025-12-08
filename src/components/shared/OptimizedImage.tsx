import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: "square" | "video" | "portrait" | "auto";
  priority?: boolean;
  blur?: boolean;
  zoom?: boolean;
}

export const OptimizedImage = ({
  src,
  alt,
  className,
  containerClassName,
  aspectRatio = "auto",
  priority = false,
  blur = true,
  zoom = false,
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority || !containerRef.current) {
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
      { rootMargin: "200px" }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [priority]);

  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    auto: "",
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden",
        aspectClasses[aspectRatio],
        zoom && "group",
        containerClassName
      )}
    >
      {!isLoaded && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}
      
      {isInView && (
        <motion.img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          onLoad={() => setIsLoaded(true)}
          initial={{ opacity: 0, filter: blur ? "blur(10px)" : "blur(0px)" }}
          animate={{ 
            opacity: isLoaded ? 1 : 0, 
            filter: isLoaded ? "blur(0px)" : blur ? "blur(10px)" : "blur(0px)" 
          }}
          transition={{ duration: 0.5 }}
          className={cn(
            "w-full h-full object-cover",
            zoom && "transition-transform duration-700 group-hover:scale-110",
            className
          )}
        />
      )}
    </div>
  );
};
