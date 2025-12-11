import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LazyImage } from "./LazyImage";

interface ParallaxHeroProps {
  imageSrc: string;
  imageAlt: string;
  children: React.ReactNode;
  overlayOpacity?: number;
  parallaxStrength?: number;
  minHeight?: string;
}

export const ParallaxHero = ({
  imageSrc,
  imageAlt,
  children,
  overlayOpacity = 0.5,
  parallaxStrength = 0.3,
  minHeight = "70vh",
}: ParallaxHeroProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${parallaxStrength * 100}%`]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.5]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden"
      style={{ minHeight }}
    >
      {/* Parallax Background */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 -z-10"
      >
        <LazyImage
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-[120%] object-cover"
        />
        <motion.div
          style={{ opacity }}
          className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background"
        />
      </motion.div>

      {/* Ambient Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-copper/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-petrol/10 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center" style={{ minHeight }}>
        <div className="container mx-auto px-4">
          {children}
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  );
};
