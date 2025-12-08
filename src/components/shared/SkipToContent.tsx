import { motion } from "framer-motion";

export const SkipToContent = () => {
  return (
    <motion.a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-copper focus:text-accent-foreground focus:rounded-lg focus:shadow-lg focus:outline-none"
      initial={{ opacity: 0, y: -20 }}
      whileFocus={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      Zum Hauptinhalt springen
    </motion.a>
  );
};
