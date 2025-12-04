import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxSectionProps {
  children: ReactNode;
  imageUrl?: string;
  overlay?: boolean;
  height?: string;
  className?: string;
}

export const ParallaxSection = ({ 
  children, 
  imageUrl,
  overlay = true,
  height = "min-h-[60vh]",
  className = ""
}: ParallaxSectionProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${height} ${className}`}>
      {imageUrl && (
        <motion.div
          style={{ y }}
          className="absolute inset-0 -top-[20%] -bottom-[20%]"
        >
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        </motion.div>
      )}
      {overlay && (
        <div className="absolute inset-0 bg-foreground/60" />
      )}
      <div className="relative z-10 h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};
