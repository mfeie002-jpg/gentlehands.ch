import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "gentlehands_booking_draft";
const AUTOSAVE_INTERVAL = 5000; // 5 seconds

interface BookingDraft {
  formData: Record<string, unknown>;
  currentStep: number;
  savedAt: number;
}

export const useBookingAutosave = (
  formData: Record<string, unknown>,
  currentStep: number,
  onRestore: (data: Record<string, unknown>, step: number) => void
) => {
  const [hasDraft, setHasDraft] = useState(false);
  const [draftAge, setDraftAge] = useState<string | null>(null);
  const [isRecoveryDismissed, setIsRecoveryDismissed] = useState(false);

  // Check for existing draft on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const draft: BookingDraft = JSON.parse(stored);
        const ageMs = Date.now() - draft.savedAt;
        const ageHours = ageMs / (1000 * 60 * 60);
        
        // Only show recovery if draft is less than 24 hours old
        if (ageHours < 24) {
          setHasDraft(true);
          
          // Format age string
          if (ageMs < 60000) {
            setDraftAge("gerade eben");
          } else if (ageMs < 3600000) {
            const mins = Math.floor(ageMs / 60000);
            setDraftAge(`vor ${mins} Minute${mins > 1 ? 'n' : ''}`);
          } else {
            const hours = Math.floor(ageHours);
            setDraftAge(`vor ${hours} Stunde${hours > 1 ? 'n' : ''}`);
          }
        } else {
          // Clear old draft
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Autosave formData periodically
  useEffect(() => {
    // Don't autosave if on confirmation step or if form is empty
    if (currentStep === 6 || !formData.masseur) return;

    const save = () => {
      const draft: BookingDraft = {
        formData,
        currentStep,
        savedAt: Date.now(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    };

    // Save immediately on changes
    save();

    // Also save periodically
    const interval = setInterval(save, AUTOSAVE_INTERVAL);
    return () => clearInterval(interval);
  }, [formData, currentStep]);

  const restoreDraft = useCallback(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const draft: BookingDraft = JSON.parse(stored);
        // Convert date string back to Date object if present
        if (draft.formData.selectedDate) {
          draft.formData.selectedDate = new Date(draft.formData.selectedDate as string);
        }
        onRestore(draft.formData, draft.currentStep);
        setHasDraft(false);
        setIsRecoveryDismissed(true);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, [onRestore]);

  const dismissDraft = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setHasDraft(false);
    setIsRecoveryDismissed(true);
  }, []);

  const clearDraft = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setHasDraft(false);
  }, []);

  return {
    hasDraft: hasDraft && !isRecoveryDismissed,
    draftAge,
    restoreDraft,
    dismissDraft,
    clearDraft,
  };
};
