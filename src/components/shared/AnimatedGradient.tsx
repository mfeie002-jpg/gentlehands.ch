import { motion } from "framer-motion";

interface AnimatedGradientProps {
  className?: string;
}

export const AnimatedGradient = ({ className = "" }: AnimatedGradientProps) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.div
        className="absolute -inset-[100%] opacity-30"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, hsl(var(--copper) / 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, hsl(var(--primary) / 0.1) 0%, transparent 50%)
          `,
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};
