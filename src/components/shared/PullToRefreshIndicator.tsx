import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw } from "lucide-react";

interface PullToRefreshIndicatorProps {
  isPulling: boolean;
  isRefreshing: boolean;
  progress: number;
}

export const PullToRefreshIndicator = ({
  isPulling,
  isRefreshing,
  progress,
}: PullToRefreshIndicatorProps) => {
  const showIndicator = (isPulling && progress > 0.1) || isRefreshing;

  return (
    <AnimatePresence>
      {showIndicator && (
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ 
            opacity: 1, 
            y: Math.min(progress * 60, 60),
          }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.2 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
        >
          <motion.div
            className="w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm shadow-lg border border-border/50 flex items-center justify-center"
            animate={{
              scale: isRefreshing ? [1, 1.1, 1] : 1,
            }}
            transition={{ 
              repeat: isRefreshing ? Infinity : 0, 
              duration: 0.6 
            }}
          >
            <motion.div
              animate={{ 
                rotate: isRefreshing ? 360 : progress * 180 
              }}
              transition={{ 
                duration: isRefreshing ? 1 : 0.1,
                repeat: isRefreshing ? Infinity : 0,
                ease: "linear"
              }}
            >
              <RefreshCw 
                size={20} 
                className={`${progress >= 1 || isRefreshing ? 'text-copper' : 'text-muted-foreground'}`} 
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
