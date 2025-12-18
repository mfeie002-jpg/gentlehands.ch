import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BookingMobileStepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const BookingMobileStepIndicator = ({ currentStep, totalSteps }: BookingMobileStepIndicatorProps) => {
  return (
    <div className="sm:hidden mb-4">
      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mb-2">
        {Array.from({ length: totalSteps }).map((_, idx) => (
          <motion.div
            key={idx}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              idx + 1 === currentStep 
                ? "w-6 bg-copper" 
                : idx + 1 < currentStep 
                  ? "w-2 bg-copper/50" 
                  : "w-2 bg-muted"
            )}
            layoutId={`step-dot-${idx}`}
          />
        ))}
      </div>
      
      {/* Step text */}
      <p className="text-center text-xs text-muted-foreground">
        Schritt {currentStep} von {totalSteps}
      </p>
    </div>
  );
};
