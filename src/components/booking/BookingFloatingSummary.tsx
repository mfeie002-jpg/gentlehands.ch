import { motion, AnimatePresence } from "framer-motion";
import { Check, User, Sparkles, Clock, Calendar, CreditCard, Gift, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface BookingFloatingSummaryProps {
  currentStep: number;
  formData: {
    masseur: string;
    theme: string;
    massage: string;
    duration: string;
    selectedDate?: Date;
    selectedTime: string;
  };
  masseurs: Array<{ id: string; name: string; photo_url?: string | null }>;
  themes: Array<{ id: string; title: string }>;
  massages: Array<{ id: string; title: string }>;
  calculatedPrice: number | null;
  appliedGiftCard?: { code: string; discount: number } | null;
}

export const BookingFloatingSummary = ({
  currentStep,
  formData,
  masseurs,
  themes,
  massages,
  calculatedPrice,
  appliedGiftCard,
}: BookingFloatingSummaryProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  
  const selectedMasseur = masseurs.find(m => m.id === formData.masseur);
  const selectedTheme = themes.find(t => t.id === formData.theme);
  const selectedMassage = massages.find(m => m.id === formData.massage);
  
  const summaryItems = [
    {
      label: "Therapeut:in",
      value: selectedMasseur?.name || null,
      icon: User,
      step: 1,
    },
    {
      label: "Themenraum",
      value: selectedTheme?.title || null,
      icon: Sparkles,
      step: 2,
    },
    {
      label: "Massage",
      value: selectedMassage ? `${selectedMassage.title} (${formData.duration})` : null,
      icon: Clock,
      step: 3,
    },
    {
      label: "Termin",
      value: formData.selectedDate && formData.selectedTime 
        ? `${formData.selectedDate.toLocaleDateString('de-CH')} um ${formData.selectedTime}` 
        : null,
      icon: Calendar,
      step: 5,
    },
  ];

  const completedItems = summaryItems.filter(item => item.value && item.step <= currentStep);
  const finalPrice = appliedGiftCard && calculatedPrice 
    ? Math.max(0, calculatedPrice - appliedGiftCard.discount) 
    : calculatedPrice;

  if (currentStep === 6) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="hidden lg:block fixed right-6 top-32 w-72 z-40"
      >
        <div className="bg-card/95 backdrop-blur-md border border-border rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-copper/10 to-petrol/10 p-4 flex items-center justify-between">
            <h3 className="font-display text-sm font-medium text-foreground">Ihre Auswahl</h3>
            <button 
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {isMinimized ? <Sparkles size={16} /> : <X size={16} />}
            </button>
          </div>
          
          <AnimatePresence>
            {!isMinimized && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                {/* Summary Items */}
                <div className="p-4 space-y-3">
                  {summaryItems.map((item, index) => {
                    const Icon = item.icon;
                    const isCompleted = item.value && item.step <= currentStep;
                    const isCurrent = item.step === currentStep;
                    
                    return (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={cn(
                          "flex items-start gap-3 p-2 rounded-lg transition-all",
                          isCurrent && "bg-copper/5 ring-1 ring-copper/20",
                          isCompleted && !isCurrent && "opacity-80"
                        )}
                      >
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                          isCompleted ? "bg-copper/10 text-copper" : "bg-muted text-muted-foreground"
                        )}>
                          {isCompleted ? <Check size={14} /> : <Icon size={14} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-muted-foreground">{item.label}</p>
                          <p className={cn(
                            "text-sm truncate",
                            isCompleted ? "text-foreground font-medium" : "text-muted-foreground italic"
                          )}>
                            {item.value || "Noch nicht gewählt"}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                
                {/* Price Section */}
                {calculatedPrice && (
                  <div className="border-t border-border p-4 space-y-2">
                    {appliedGiftCard && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1 text-petrol">
                          <Gift size={14} />
                          Gutschein
                        </span>
                        <span className="text-petrol">-CHF {appliedGiftCard.discount}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Gesamtpreis</span>
                      <span className="text-lg font-display font-semibold text-foreground">
                        CHF {finalPrice}
                      </span>
                    </div>
                  </div>
                )}
                
                {/* Progress */}
                <div className="px-4 pb-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span>Fortschritt</span>
                    <span>{Math.round((completedItems.length / summaryItems.length) * 100)}%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-copper to-petrol rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(completedItems.length / summaryItems.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
