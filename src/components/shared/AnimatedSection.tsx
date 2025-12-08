import { memo, ReactNode } from "react";
import { motion, Variants } from "framer-motion";
import useInView from "@/hooks/useInView";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  animation?: "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "scale" | "blur" | "reveal";
  stagger?: boolean;
  staggerDelay?: number;
  once?: boolean;
  disabled?: boolean;
}

const animationVariants: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
  reveal: {
    hidden: { opacity: 0, clipPath: "inset(100% 0 0 0)" },
    visible: { opacity: 1, clipPath: "inset(0 0 0 0)" },
  },
};

/**
 * Reusable animated section wrapper with viewport detection
 * Provides consistent animation patterns across the site
 */
export const AnimatedSection = memo(({
  children,
  className,
  delay = 0,
  duration = 0.6,
  animation = "fadeUp",
  stagger = false,
  staggerDelay = 0.1,
  once = true,
  disabled = false,
}: AnimatedSectionProps) => {
  const { ref, isInView } = useInView({ 
    threshold: 0.1, 
    triggerOnce: once,
    rootMargin: "50px 0px",
  });

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  const variants = animationVariants[animation];
  
  const containerVariants: Variants = stagger
    ? {
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }
    : variants;

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(className)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      transition={
        !stagger
          ? {
              duration,
              delay,
              ease: [0.25, 0.1, 0.25, 1],
            }
          : undefined
      }
    >
      {stagger
        ? Array.isArray(children)
          ? children.map((child, index) => (
              <motion.div key={index} variants={variants} transition={{ duration, ease: [0.25, 0.1, 0.25, 1] }}>
                {child}
              </motion.div>
            ))
          : children
        : children}
    </motion.div>
  );
});

AnimatedSection.displayName = "AnimatedSection";

/**
 * Animated text reveal with word-by-word animation
 */
interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export const AnimatedText = memo(({
  text,
  className,
  delay = 0,
  as: Tag = "p",
}: AnimatedTextProps) => {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });
  
  const words = text.split(" ");
  
  return (
    <Tag ref={ref as any} className={cn("overflow-hidden", className)}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-[0.25em]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.5,
            delay: delay + index * 0.05,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
});

AnimatedText.displayName = "AnimatedText";
