import { useEffect } from "react";

interface BookingKeyboardNavProps {
  currentStep: number;
  totalSteps: number;
  canProceed: boolean;
  onNext: () => void;
  onPrevious: () => void;
  isSubmitting?: boolean;
}

export const BookingKeyboardNav = ({
  currentStep,
  totalSteps,
  canProceed,
  onNext,
  onPrevious,
  isSubmitting
}: BookingKeyboardNavProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      // Arrow Right or Enter to go next
      if ((e.key === "ArrowRight" || e.key === "Enter") && canProceed && currentStep < totalSteps && !isSubmitting) {
        e.preventDefault();
        onNext();
      }

      // Arrow Left to go back
      if (e.key === "ArrowLeft" && currentStep > 1 && currentStep < totalSteps) {
        e.preventDefault();
        onPrevious();
      }

      // Number keys to jump to step (1-6)
      if (e.key >= "1" && e.key <= String(totalSteps - 1)) {
        const targetStep = parseInt(e.key);
        if (targetStep < currentStep) {
          // Can go back to any previous step
          for (let i = currentStep; i > targetStep; i--) {
            onPrevious();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStep, totalSteps, canProceed, onNext, onPrevious, isSubmitting]);

  return null; // This is a behavior-only component
};
