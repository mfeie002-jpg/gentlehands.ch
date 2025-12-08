import { motion } from 'framer-motion';
import { Logo } from './Logo';

export const PageLoadingFallback = () => {
  return (
    <div className="min-h-[60vh] sm:min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col items-center gap-4 sm:gap-6"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.03, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ 
            duration: 1.2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Logo size="md" />
        </motion.div>
        
        {/* Loading bar */}
        <div className="w-32 sm:w-48 h-0.5 sm:h-1 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-copper via-copper-light to-copper rounded-full"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        <motion.p
          className="text-muted-foreground text-xs sm:text-sm"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          Wird geladen...
        </motion.p>
      </motion.div>
    </div>
  );
};
