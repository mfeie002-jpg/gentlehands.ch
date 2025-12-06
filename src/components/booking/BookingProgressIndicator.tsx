import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface BookingProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const BookingProgressIndicator = ({ currentStep, totalSteps }: BookingProgressIndicatorProps) => {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="mb-8">
      {/* Progress Bar */}
      <div className="relative h-2 bg-secondary rounded-full overflow-hidden mb-4">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-copper to-copper-light rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <motion.div
              key={index}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col items-center"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  isCompleted
                    ? "bg-copper text-accent-foreground"
                    : isCurrent
                    ? "bg-copper/20 text-copper border-2 border-copper"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {isCompleted ? (
                  <Check size={16} />
                ) : (
                  stepNumber
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
