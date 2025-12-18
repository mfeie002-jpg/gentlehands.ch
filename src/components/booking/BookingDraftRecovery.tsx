import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, X, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookingDraftRecoveryProps {
  isVisible: boolean;
  draftAge: string | null;
  onRestore: () => void;
  onDismiss: () => void;
}

export const BookingDraftRecovery = ({
  isVisible,
  draftAge,
  onRestore,
  onDismiss,
}: BookingDraftRecoveryProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: "spring", damping: 20 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[90vw] max-w-md"
        >
          <div className="bg-card border border-copper/30 rounded-2xl shadow-2xl overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-copper/5 via-petrol/5 to-copper/5 animate-pulse" />
            
            <div className="relative p-4 sm:p-5">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-copper/10 flex items-center justify-center flex-shrink-0">
                  <RotateCcw className="text-copper" size={24} />
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-base sm:text-lg text-foreground mb-1">
                    Buchung fortsetzen?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Sie haben eine unvollständige Buchung
                    {draftAge && (
                      <span className="flex items-center gap-1 mt-1 text-xs">
                        <Clock size={12} />
                        Gespeichert {draftAge}
                      </span>
                    )}
                  </p>
                  
                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      onClick={onRestore}
                      size="sm"
                      className="bg-copper hover:bg-copper/90 text-accent-foreground"
                    >
                      <RotateCcw size={14} className="mr-1" />
                      Fortsetzen
                    </Button>
                    <Button
                      onClick={onDismiss}
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground"
                    >
                      Neu starten
                    </Button>
                  </div>
                </div>
                
                {/* Close button */}
                <button
                  onClick={onDismiss}
                  className="text-muted-foreground hover:text-foreground transition-colors p-1"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
