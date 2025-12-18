import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BookingStepTransitionProps {
  children: ReactNode;
  direction?: "forward" | "backward";
  stepKey: string | number;
}

export const BookingStepTransition = ({ 
  children, 
  direction = "forward",
  stepKey 
}: BookingStepTransitionProps) => {
  const variants = {
    enter: (dir: string) => ({
      x: dir === "forward" ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: string) => ({
      x: dir === "forward" ? -50 : 50,
      opacity: 0,
    }),
  };

  return (
    <motion.div
      key={stepKey}
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      {children}
    </motion.div>
  );
};
