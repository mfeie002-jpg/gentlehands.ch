import { motion } from "framer-motion";

interface AnimatedGradientProps {
  className?: string;
}

export const AnimatedGradient = ({ className = "" }: AnimatedGradientProps) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <motion.div
        className="absolute -inset-[50%] opacity-10"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, hsl(var(--primary) / 0.08) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, hsl(var(--primary) / 0.05) 0%, transparent 60%),
            radial-gradient(ellipse at 40% 80%, hsl(var(--primary) / 0.05) 0%, transparent 60%)
          `,
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 120,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};
