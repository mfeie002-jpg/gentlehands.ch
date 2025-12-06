import { motion } from "framer-motion";

interface SectionDividerProps {
  variant?: "wave" | "gradient" | "dots" | "line";
}

export const SectionDivider = ({ variant = "gradient" }: SectionDividerProps) => {
  if (variant === "wave") {
    return (
      <div className="h-16 relative overflow-hidden">
        <svg
          viewBox="0 0 1440 48"
          className="absolute bottom-0 w-full"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,24 C360,48 720,0 1080,24 C1260,36 1350,36 1440,24 L1440,48 L0,48 Z"
            fill="currentColor"
            className="text-secondary/30"
            initial={{ d: "M0,24 C360,48 720,0 1080,24 C1260,36 1350,36 1440,24 L1440,48 L0,48 Z" }}
            animate={{
              d: [
                "M0,24 C360,48 720,0 1080,24 C1260,36 1350,36 1440,24 L1440,48 L0,48 Z",
                "M0,36 C360,12 720,48 1080,24 C1260,12 1350,36 1440,36 L1440,48 L0,48 Z",
                "M0,24 C360,48 720,0 1080,24 C1260,36 1350,36 1440,24 L1440,48 L0,48 Z",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div className="py-8 flex justify-center gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-copper/30"
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    );
  }

  if (variant === "line") {
    return (
      <div className="py-8 flex justify-center">
        <motion.div
          className="w-32 h-px bg-gradient-to-r from-transparent via-copper/50 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />
      </div>
    );
  }

  // gradient (default)
  return (
    <div className="h-24 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />
  );
};
