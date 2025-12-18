import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  title: string;
  icon: React.ElementType;
}

interface BookingProgressStepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export const BookingProgressStepper = ({ steps, currentStep, onStepClick }: BookingProgressStepperProps) => {
  return (
    <div className="relative">
      {/* Progress line background */}
      <div className="absolute top-5 left-0 right-0 h-0.5 bg-border hidden sm:block" />
      
      {/* Active progress line */}
      <motion.div
        className="absolute top-5 left-0 h-0.5 bg-copper hidden sm:block"
        initial={{ width: "0%" }}
        animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
      
      {/* Steps */}
      <div className="relative flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const isClickable = step.id < currentStep;
          
          return (
            <motion.button
              key={step.id}
              onClick={() => isClickable && onStepClick?.(step.id)}
              disabled={!isClickable}
              className={cn(
                "flex flex-col items-center gap-2 relative z-10 transition-all",
                isClickable && "cursor-pointer hover:scale-105",
                !isClickable && "cursor-default"
              )}
              whileHover={isClickable ? { scale: 1.05 } : {}}
              whileTap={isClickable ? { scale: 0.95 } : {}}
            >
              {/* Step circle */}
              <motion.div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                  isCompleted && "bg-copper text-white",
                  isCurrent && "bg-copper text-white ring-4 ring-copper/20",
                  !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                )}
                initial={false}
                animate={{
                  scale: isCurrent ? 1.1 : 1,
                  boxShadow: isCurrent ? "0 0 20px rgba(var(--copper-rgb), 0.4)" : "none"
                }}
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <Check size={18} />
                  </motion.div>
                ) : (
                  <step.icon size={18} />
                )}
              </motion.div>
              
              {/* Step title */}
              <span className={cn(
                "text-xs font-medium hidden sm:block transition-colors",
                (isCompleted || isCurrent) ? "text-copper" : "text-muted-foreground"
              )}>
                {step.title}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
