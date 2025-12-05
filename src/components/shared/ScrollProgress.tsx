import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Create glow intensity based on scroll
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.3]);

  return (
    <>
      {/* Main progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
        style={{ scaleX }}
      >
        <div className="w-full h-full bg-gradient-to-r from-copper via-copper-glow to-copper" />
      </motion.div>
      
      {/* Glow effect */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-4 z-[49] origin-left pointer-events-none"
        style={{ 
          scaleX,
          opacity: glowOpacity,
        }}
      >
        <div className="w-full h-full bg-gradient-to-r from-copper/50 via-copper-glow/50 to-copper/50 blur-sm" />
      </motion.div>
      
      {/* Shimmer effect on the progress tip */}
      <motion.div
        className="fixed top-0 h-1 w-8 z-50 pointer-events-none"
        style={{
          left: useTransform(scaleX, (value) => `calc(${value * 100}% - 32px)`),
        }}
      >
        <motion.div
          className="w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </motion.div>
    </>
  );
};
