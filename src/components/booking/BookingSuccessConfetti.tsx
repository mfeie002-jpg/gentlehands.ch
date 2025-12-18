import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
  delay: number;
}

export const BookingSuccessConfetti = () => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const colors = [
      "hsl(var(--copper))",
      "hsl(var(--primary))",
      "#FFD700",
      "#FF6B6B",
      "#4ECDC4",
      "#A855F7",
    ];

    const pieces: ConfettiPiece[] = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10,
      rotation: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
      delay: Math.random() * 0.5,
    }));

    setConfetti(pieces);

    // Clean up after animation
    const timer = setTimeout(() => setShow(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {confetti.map((piece) => (
          <motion.div
            key={piece.id}
            initial={{
              left: `${piece.x}%`,
              top: "-5%",
              rotate: 0,
              opacity: 1,
            }}
            animate={{
              top: "110%",
              rotate: piece.rotation + 720,
              opacity: [1, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: piece.delay,
              ease: "easeIn",
            }}
            style={{
              position: "absolute",
              width: piece.size,
              height: piece.size,
              backgroundColor: piece.color,
              borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
