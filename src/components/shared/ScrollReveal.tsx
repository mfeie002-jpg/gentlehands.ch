import { ReactNode, useMemo } from "react";
import { motion, Variants, useReducedMotion } from "framer-motion";

type Direction = "up" | "down" | "left" | "right" | "scale" | "none" | "blur";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
  stagger?: boolean;
}

const createVariants = (prefersReducedMotion: boolean): Record<Direction, Variants> => {
  if (prefersReducedMotion) {
    return {
      up: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
      down: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
      left: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
      right: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
      scale: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
      none: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
      blur: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
    };
  }

  return {
    up: {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0 },
    },
    down: {
      hidden: { opacity: 0, y: -40 },
      visible: { opacity: 1, y: 0 },
    },
    left: {
      hidden: { opacity: 0, x: -40 },
      visible: { opacity: 1, x: 0 },
    },
    right: {
      hidden: { opacity: 0, x: 40 },
      visible: { opacity: 1, x: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1 },
    },
    none: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    blur: {
      hidden: { opacity: 0, filter: "blur(10px)" },
      visible: { opacity: 1, filter: "blur(0px)" },
    },
  };
};

export const ScrollReveal = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className = "",
  once = true,
  amount = 0.2,
  stagger = false,
}: ScrollRevealProps) => {
  const prefersReducedMotion = useReducedMotion();
  const variants = useMemo(() => createVariants(!!prefersReducedMotion), [prefersReducedMotion]);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px", amount }}
      variants={variants[direction]}
      transition={{ 
        duration: prefersReducedMotion ? 0.2 : duration, 
        delay, 
        ease: [0.25, 0.1, 0.25, 1],
        staggerChildren: stagger ? 0.1 : undefined,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
