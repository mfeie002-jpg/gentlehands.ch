import { motion } from "framer-motion";

interface FloatingElementsProps {
  variant?: "dots" | "circles" | "organic";
  className?: string;
}

export const FloatingElements = ({ 
  variant = "dots",
  className = ""
}: FloatingElementsProps) => {
  const elements = {
    dots: [
      { size: 4, x: "10%", y: "20%", duration: 20 },
      { size: 6, x: "85%", y: "15%", duration: 25 },
      { size: 3, x: "70%", y: "70%", duration: 18 },
      { size: 5, x: "25%", y: "80%", duration: 22 },
      { size: 4, x: "90%", y: "50%", duration: 30 },
    ],
    circles: [
      { size: 80, x: "5%", y: "10%", duration: 35, opacity: 0.03 },
      { size: 120, x: "80%", y: "60%", duration: 40, opacity: 0.02 },
      { size: 60, x: "50%", y: "85%", duration: 30, opacity: 0.04 },
    ],
    organic: [
      { size: 200, x: "-5%", y: "20%", duration: 50 },
      { size: 150, x: "90%", y: "70%", duration: 45 },
    ],
  };

  const currentElements = elements[variant];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {variant === "dots" && currentElements.map((el, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/20"
          style={{
            width: el.size,
            height: el.size,
            left: el.x,
            top: el.y,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {variant === "circles" && currentElements.map((el, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-primary"
          style={{
            width: el.size,
            height: el.size,
            left: el.x,
            top: el.y,
            opacity: el.opacity,
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {variant === "organic" && currentElements.map((el, i) => (
        <motion.div
          key={i}
          className="absolute bg-gradient-radial from-primary/5 to-transparent rounded-full blur-3xl"
          style={{
            width: el.size,
            height: el.size,
            left: el.x,
            top: el.y,
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};
