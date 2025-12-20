import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BookingMobileNavigationProps {
  currentStep: number;
  totalSteps: number;
  canProceed: boolean;
  isSubmitting?: boolean;
  canSubmit?: boolean;
  cooldownSeconds?: number;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export const BookingMobileNavigation = ({
  currentStep,
  totalSteps,
  canProceed,
  isSubmitting = false,
  canSubmit = true,
  cooldownSeconds = 0,
  onBack,
  onNext,
  onSubmit
}: BookingMobileNavigationProps) => {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps - 1; // Step before confirmation
  const isConfirmationStep = currentStep === totalSteps;

  // Don't show navigation on confirmation step
  if (isConfirmationStep) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-0 left-0 right-0 z-50 sm:relative sm:bottom-auto sm:left-auto sm:right-auto"
    >
      {/* Mobile fixed navigation */}
      <div className="sm:hidden bg-background/95 backdrop-blur-md border-t border-border px-4 py-3 pb-safe">
        <div className="flex items-center gap-3">
          {/* Back button */}
          {!isFirstStep && (
            <Button
              variant="outline"
              onClick={onBack}
              className={cn(
                "min-h-[56px] min-w-[56px] p-0",
                "rounded-xl border-2",
                "active:scale-95 transition-transform"
              )}
            >
              <ArrowLeft size={22} />
            </Button>
          )}
          
          {/* Spacer if first step */}
          {isFirstStep && <div className="w-14" />}
          
          {/* Next/Submit button */}
          {!isLastStep ? (
            <Button
              variant="copper"
              onClick={onNext}
              disabled={!canProceed}
              className={cn(
                "flex-1 min-h-[56px] text-base font-semibold",
                "rounded-xl shadow-lg shadow-copper/20",
                "active:scale-[0.98] transition-transform",
                "disabled:opacity-50 disabled:shadow-none"
              )}
            >
              <span>Weiter</span>
              <motion.div
                animate={{ x: canProceed ? [0, 5, 0] : 0 }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
              >
                <ArrowRight size={20} className="ml-2" />
              </motion.div>
            </Button>
          ) : (
            <Button
              variant="copper"
              onClick={onSubmit}
              disabled={!canProceed || isSubmitting || !canSubmit}
              className={cn(
                "flex-1 min-h-[56px] text-base font-semibold",
                "rounded-xl shadow-lg shadow-copper/20",
                "active:scale-[0.98] transition-transform",
                "disabled:opacity-50 disabled:shadow-none"
              )}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={20} className="animate-spin mr-2" />
                  <span>Wird gesendet...</span>
                </>
              ) : cooldownSeconds > 0 ? (
                <>
                  <AlertCircle size={20} className="mr-2" />
                  <span>Warten ({cooldownSeconds}s)</span>
                </>
              ) : (
                <>
                  <span>Buchung absenden</span>
                  <Check size={20} className="ml-2" />
                </>
              )}
            </Button>
          )}
        </div>
        
        {/* Progress indicator text */}
        <div className="flex items-center justify-center mt-2">
          <p className="text-xs text-muted-foreground">
            {isLastStep 
              ? "Letzte Überprüfung vor dem Absenden" 
              : `Noch ${totalSteps - 1 - currentStep} ${totalSteps - 1 - currentStep === 1 ? 'Schritt' : 'Schritte'} bis zur Buchung`
            }
          </p>
        </div>
      </div>
      
      {/* Desktop navigation (original style) */}
      <div className="hidden sm:flex justify-between mt-12 pt-8 border-t border-border gap-3">
        {!isFirstStep ? (
          <Button
            variant="outline"
            onClick={onBack}
            className="min-h-[48px] px-6"
          >
            <ArrowLeft size={16} className="mr-2" />
            <span>Zurück</span>
          </Button>
        ) : (
          <div />
        )}
        
        {!isLastStep ? (
          <Button
            variant="copper"
            onClick={onNext}
            disabled={!canProceed}
            className="ml-auto min-h-[48px] px-8"
          >
            <span>Weiter</span>
            <ArrowRight size={16} className="ml-2" />
          </Button>
        ) : (
          <Button
            variant="copper"
            onClick={onSubmit}
            disabled={!canProceed || isSubmitting || !canSubmit}
            className="ml-auto min-h-[48px] px-8"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin mr-2" />
                Wird gesendet...
              </>
            ) : cooldownSeconds > 0 ? (
              <>
                <AlertCircle size={16} className="mr-2" />
                Warten ({cooldownSeconds}s)
              </>
            ) : (
              <>
                Anfrage absenden
                <Check size={16} className="ml-2" />
              </>
            )}
          </Button>
        )}
      </div>
    </motion.div>
  );
};
