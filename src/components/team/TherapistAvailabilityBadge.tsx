import { motion } from "framer-motion";
import { Calendar, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { format } from "date-fns";

interface TherapistAvailabilityBadgeProps {
  therapistId: string;
  therapistName: string;
  hasAvailableToday: boolean;
  availableTodayCount: number;
  nextAvailableSlot: {
    date: Date;
    time: string;
    displayDate: string;
  } | null;
  isLoading?: boolean;
}

export const TherapistAvailabilityBadge = ({
  therapistId,
  therapistName,
  hasAvailableToday,
  availableTodayCount,
  nextAvailableSlot,
  isLoading
}: TherapistAvailabilityBadgeProps) => {
  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-6 w-32 bg-secondary rounded-full" />
      </div>
    );
  }

  const bookingUrl = nextAvailableSlot 
    ? `/buchung?masseur=${therapistId}&date=${format(nextAvailableSlot.date, 'yyyy-MM-dd')}&time=${nextAvailableSlot.time}`
    : `/buchung?masseur=${therapistId}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      {/* Live Status Indicator */}
      <div className="flex items-center gap-2">
        {hasAvailableToday ? (
          <motion.div 
            className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-emerald-500"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
              Heute verfügbar
            </span>
            <span className="text-xs text-emerald-500/70">
              ({availableTodayCount} {availableTodayCount === 1 ? 'Termin' : 'Termine'})
            </span>
          </motion.div>
        ) : (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full">
            <span className="w-2 h-2 rounded-full bg-muted-foreground/40" />
            <span className="text-sm text-muted-foreground">Heute ausgebucht</span>
          </div>
        )}
      </div>

      {/* Next Available Slot with Direct Link */}
      {nextAvailableSlot && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Link to={bookingUrl}>
            <motion.div 
              className="inline-flex items-center gap-3 px-4 py-2.5 bg-copper/10 hover:bg-copper/20 border border-copper/20 rounded-xl transition-colors cursor-pointer group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-copper" />
                <span className="text-sm font-medium text-foreground">
                  Nächster Termin:
                </span>
              </div>
              <div className="flex items-center gap-2 text-copper">
                <Calendar size={14} />
                <span className="text-sm font-medium">{nextAvailableSlot.displayDate}</span>
                <span className="text-muted-foreground">•</span>
                <Clock size={14} />
                <span className="text-sm font-medium">{nextAvailableSlot.time} Uhr</span>
              </div>
              <motion.span 
                className="text-copper ml-1"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.div>
          </Link>
        </motion.div>
      )}

      {!nextAvailableSlot && (
        <p className="text-sm text-muted-foreground italic">
          Keine freien Termine in den nächsten 7 Tagen
        </p>
      )}
    </motion.div>
  );
};
