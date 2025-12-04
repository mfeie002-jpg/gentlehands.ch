import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
}

export const ImageReveal = ({
  src,
  alt,
  className = "",
  direction = "left",
  delay = 0,
}: ImageRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const clipPathStart = {
    left: "inset(0 100% 0 0)",
    right: "inset(0 0 0 100%)",
    up: "inset(100% 0 0 0)",
    down: "inset(0 0 100% 0)",
  };

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ clipPath: clipPathStart[direction] }}
        animate={isInView ? { clipPath: "inset(0 0 0 0)" } : {}}
        transition={{
          duration: 1,
          delay,
          ease: [0.77, 0, 0.175, 1],
        }}
        className="relative"
      >
        <motion.img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          initial={{ scale: 1.3 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{
            duration: 1.4,
            delay,
            ease: [0.77, 0, 0.175, 1],
          }}
        />
      </motion.div>
    </div>
  );
};
