import { motion } from "framer-motion";
import { Calendar, Clock, Bell, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface BookingTherapistAvailabilityProps {
  hasAvailableToday: boolean;
  availableTodayCount: number;
  nextAvailableSlot: {
    date: Date;
    time: string;
    displayDate: string;
  } | null;
  isLoading?: boolean;
  onWaitlistClick?: () => void;
  compact?: boolean;
}

export const BookingTherapistAvailability = ({
  hasAvailableToday,
  availableTodayCount,
  nextAvailableSlot,
  isLoading,
  onWaitlistClick,
  compact = false
}: BookingTherapistAvailabilityProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center gap-1.5 mt-1">
        <div className="w-2 h-2 rounded-full bg-muted animate-pulse" />
        <span className="text-[10px] text-muted-foreground">Lädt...</span>
      </div>
    );
  }

  // Today available
  if (hasAvailableToday && availableTodayCount > 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "flex items-center gap-1.5 mt-1",
          compact && "mt-0.5"
        )}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <span className="text-[10px] sm:text-xs text-green-600 font-medium">
          Heute {availableTodayCount} {availableTodayCount === 1 ? 'Termin' : 'Termine'} frei
        </span>
      </motion.div>
    );
  }

  // Next available slot
  if (nextAvailableSlot) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "flex items-center gap-1.5 mt-1",
          compact && "mt-0.5"
        )}
      >
        <Calendar size={10} className="text-copper" />
        <span className="text-[10px] sm:text-xs text-muted-foreground">
          Nächster Termin: {nextAvailableSlot.displayDate}, {nextAvailableSlot.time}
        </span>
      </motion.div>
    );
  }

  // Fully booked - show waitlist option
  return (
    <motion.div 
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex flex-col gap-1 mt-1",
        compact && "mt-0.5"
      )}
    >
      <div className="flex items-center gap-1.5">
        <AlertCircle size={10} className="text-amber-500" />
        <span className="text-[10px] sm:text-xs text-amber-600 font-medium">
          Diese Woche ausgebucht
        </span>
      </div>
      {onWaitlistClick && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onWaitlistClick();
          }}
          className="flex items-center gap-1 text-[10px] text-copper hover:text-copper/80 transition-colors"
        >
          <Bell size={10} />
          <span>Auf Warteliste setzen</span>
        </button>
      )}
    </motion.div>
  );
};
