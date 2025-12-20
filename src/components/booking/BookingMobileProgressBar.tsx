import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check, Clock } from "lucide-react";

interface Step {
  id: number;
  title: string;
  icon: React.ElementType;
}

interface BookingMobileProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps: Step[];
  onStepClick?: (step: number) => void;
}

export const BookingMobileProgressBar = ({ 
  currentStep, 
  totalSteps, 
  steps,
  onStepClick 
}: BookingMobileProgressBarProps) => {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
  
  // Estimate remaining time (approx 45 seconds per step)
  const remainingSteps = totalSteps - currentStep;
  const estimatedMinutes = Math.ceil((remainingSteps * 45) / 60);
  
  const currentStepData = steps[currentStep - 1];
  const CurrentIcon = currentStepData?.icon;

  return (
    <div className="sm:hidden sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border pb-4 pt-2 px-4 -mx-4 mb-6">
      {/* Progress bar with percentage */}
      <div className="relative mb-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {CurrentIcon && (
              <motion.div
                key={currentStep}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-8 h-8 rounded-full bg-copper/20 flex items-center justify-center"
              >
                <CurrentIcon size={16} className="text-copper" />
              </motion.div>
            )}
            <div>
              <motion.h3 
                key={currentStepData?.title}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm font-semibold text-foreground"
              >
                {currentStepData?.title}
              </motion.h3>
              <p className="text-xs text-muted-foreground">
                Schritt {currentStep} von {totalSteps}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="text-right">
              <span className="text-lg font-bold text-copper">{Math.round(progress)}%</span>
              {estimatedMinutes > 0 && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock size={10} />
                  <span>~{estimatedMinutes} Min</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="relative h-3 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-copper via-copper-light to-copper rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ["-100%", "400%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
      
      {/* Step dots with touch targets */}
      <div className="flex justify-between items-center">
        {steps.map((step, idx) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const isClickable = step.id < currentStep;
          
          return (
            <motion.button
              key={step.id}
              onClick={() => isClickable && onStepClick?.(step.id)}
              disabled={!isClickable}
              className={cn(
                "relative flex flex-col items-center justify-center min-w-[44px] min-h-[44px] -m-2 p-2",
                isClickable && "active:scale-95"
              )}
              whileTap={isClickable ? { scale: 0.9 } : {}}
            >
              <motion.div
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-all",
                  isCompleted && "bg-copper text-white",
                  isCurrent && "bg-copper text-white ring-2 ring-copper/30 ring-offset-2 ring-offset-background",
                  !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                )}
                animate={{
                  scale: isCurrent ? 1.2 : 1
                }}
              >
                {isCompleted ? (
                  <Check size={12} />
                ) : (
                  <span>{step.id}</span>
                )}
              </motion.div>
              
              {/* Connection line */}
              {idx < steps.length - 1 && (
                <div className="absolute top-1/2 -translate-y-1/2 left-full w-[calc(100%-24px)] h-0.5 -ml-1">
                  <div className={cn(
                    "h-full rounded-full transition-colors duration-300",
                    isCompleted ? "bg-copper" : "bg-muted"
                  )} />
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
