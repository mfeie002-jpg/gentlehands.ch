import { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Bell, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingWaitlistModal } from "./BookingWaitlistModal";
import { format } from "date-fns";
import { de } from "date-fns/locale";

interface BookingSlotUnavailableProps {
  selectedDate?: Date;
  selectedTime?: string;
  therapistId?: string;
  therapistName?: string;
  massageType?: string;
  theme?: string;
  duration?: string;
  onSelectAlternative?: () => void;
  alternativeTimes?: string[];
}

export const BookingSlotUnavailable = ({
  selectedDate,
  selectedTime,
  therapistId,
  therapistName,
  massageType,
  theme,
  duration,
  onSelectAlternative,
  alternativeTimes = []
}: BookingSlotUnavailableProps) => {
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center shrink-0">
            <AlertCircle size={20} className="text-amber-600" />
          </div>
          
          <div className="flex-1 space-y-3">
            <div>
              <h4 className="font-medium text-foreground">
                Dieser Termin ist leider ausgebucht
              </h4>
              <p className="text-sm text-muted-foreground mt-1">
                {selectedDate && selectedTime ? (
                  <>
                    {format(selectedDate, "EEEE, d. MMMM", { locale: de })} um {selectedTime} Uhr 
                    {therapistName && ` bei ${therapistName}`} ist nicht mehr verfügbar.
                  </>
                ) : (
                  "Der gewählte Termin ist bereits vergeben."
                )}
              </p>
            </div>

            {/* Alternative times */}
            {alternativeTimes.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">
                  Alternative Zeiten am selben Tag:
                </p>
                <div className="flex flex-wrap gap-2">
                  {alternativeTimes.slice(0, 4).map((time) => (
                    <button
                      key={time}
                      onClick={onSelectAlternative}
                      className="px-3 py-1.5 bg-background border border-border rounded-lg text-sm hover:border-copper transition-colors"
                    >
                      {time} Uhr
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-2 pt-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowWaitlistModal(true)}
                className="gap-2"
              >
                <Bell size={14} />
                Auf Warteliste setzen
              </Button>
              
              {onSelectAlternative && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onSelectAlternative}
                  className="gap-2"
                >
                  <Calendar size={14} />
                  Anderen Termin wählen
                  <ArrowRight size={14} />
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <BookingWaitlistModal
        isOpen={showWaitlistModal}
        onClose={() => setShowWaitlistModal(false)}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        therapistId={therapistId}
        therapistName={therapistName}
        massageType={massageType}
        theme={theme}
        duration={duration}
      />
    </>
  );
};
