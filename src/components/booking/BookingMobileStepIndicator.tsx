import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check, ChevronRight } from "lucide-react";

interface Step {
  id: number;
  title: string;
  icon: React.ElementType;
}

interface BookingMobileStepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps?: Step[];
  onStepClick?: (step: number) => void;
}

export const BookingMobileStepIndicator = ({ 
  currentStep, 
  totalSteps,
  steps,
  onStepClick 
}: BookingMobileStepIndicatorProps) => {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
  
  return (
    <div className="sm:hidden mb-6">
      {/* Main progress section */}
      <div className="bg-gradient-to-r from-copper/5 to-copper/10 rounded-2xl p-4 border border-copper/20">
        {/* Current step info */}
        {steps && steps[currentStep - 1] && (
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <motion.div
                key={currentStep}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-10 h-10 rounded-xl bg-copper flex items-center justify-center shadow-lg shadow-copper/30"
              >
                {(() => {
                  const Icon = steps[currentStep - 1].icon;
                  return <Icon size={20} className="text-white" />;
                })()}
              </motion.div>
              <div>
                <AnimatePresence mode="wait">
                  <motion.h3
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="font-semibold text-foreground"
                  >
                    {steps[currentStep - 1].title}
                  </motion.h3>
                </AnimatePresence>
                <p className="text-xs text-muted-foreground">
                  Schritt {currentStep} von {totalSteps}
                </p>
              </div>
            </div>
            
            {/* Percentage badge */}
            <motion.div
              key={progress}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="px-3 py-1.5 bg-copper text-white text-sm font-bold rounded-full"
            >
              {Math.round(progress)}%
            </motion.div>
          </div>
        )}
        
        {/* Progress bar */}
        <div className="relative h-2.5 bg-muted/50 rounded-full overflow-hidden mb-3">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-copper to-copper-light rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
          {/* Pulse effect on active progress */}
          <motion.div
            className="absolute inset-y-0 right-0 w-4 bg-gradient-to-r from-transparent to-white/30 rounded-full"
            style={{ left: `calc(${progress}% - 16px)` }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
        
        {/* Step dots - larger touch targets */}
        <div className="flex justify-between items-center px-1">
          {Array.from({ length: totalSteps }).map((_, idx) => {
            const isCompleted = idx + 1 < currentStep;
            const isCurrent = idx + 1 === currentStep;
            const isClickable = idx + 1 < currentStep && onStepClick;
            
            return (
              <motion.button
                key={idx}
                onClick={() => isClickable && onStepClick?.(idx + 1)}
                disabled={!isClickable}
                className={cn(
                  "relative flex items-center justify-center",
                  "min-w-[44px] min-h-[44px] -m-2", // Large touch target
                  isClickable && "active:scale-90"
                )}
                whileTap={isClickable ? { scale: 0.9 } : {}}
              >
                <motion.div
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-300",
                    isCurrent && "w-5 h-5 bg-copper ring-4 ring-copper/20",
                    isCompleted && "bg-copper",
                    !isCompleted && !isCurrent && "bg-muted"
                  )}
                  animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                  transition={isCurrent ? { duration: 2, repeat: Infinity } : {}}
                >
                  {isCompleted && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <Check size={8} className="text-white" />
                    </motion.div>
                  )}
                </motion.div>
              </motion.button>
            );
          })}
        </div>
      </div>
      
      {/* Next step preview */}
      {steps && currentStep < totalSteps && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-1 mt-3 text-xs text-muted-foreground"
        >
          <span>Nächster Schritt:</span>
          <span className="font-medium text-foreground">{steps[currentStep]?.title}</span>
          <ChevronRight size={12} />
        </motion.div>
      )}
    </div>
  );
};
