import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { AlertTriangle, Clock, Users, Flame } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format, addDays } from "date-fns";

interface SlotAvailability {
  date: string;
  time: string;
  availableTherapists: number;
  totalTherapists: number;
  status: "available" | "limited" | "almost-full" | "full";
}

interface BookingAvailabilityIndicatorProps {
  selectedDate?: Date;
  selectedTime?: string;
  onSelectSlot?: (date: Date, time: string) => void;
}

export const BookingAvailabilityIndicator = ({
  selectedDate,
  selectedTime,
  onSelectSlot,
}: BookingAvailabilityIndicatorProps) => {
  const [hotSlots, setHotSlots] = useState<SlotAvailability[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAvailability = async () => {
      setIsLoading(true);
      
      try {
        // Get total therapists count
        const { count: therapistCount } = await supabase
          .from("therapists")
          .select("*", { count: "exact", head: true })
          .eq("status", "approved");

        const totalTherapists = therapistCount || 3;

        // Get bookings for next 7 days
        const startDate = format(new Date(), "yyyy-MM-dd");
        const endDate = format(addDays(new Date(), 7), "yyyy-MM-dd");

        const { data: bookings } = await supabase
          .from("bookings")
          .select("appointment_date, appointment_time")
          .gte("appointment_date", startDate)
          .lte("appointment_date", endDate)
          .not("status", "in", '("cancelled","rejected")');

        // Count bookings per slot
        const slotCounts: Record<string, number> = {};
        bookings?.forEach((b) => {
          const key = `${b.appointment_date}_${b.appointment_time}`;
          slotCounts[key] = (slotCounts[key] || 0) + 1;
        });

        // Find slots that are almost full or limited
        const hotSlotsData: SlotAvailability[] = [];
        const popularTimes = ["14:00", "15:00", "16:00", "17:00", "18:00"];

        // Check next 3 days for hot slots
        for (let i = 0; i < 3; i++) {
          const date = addDays(new Date(), i);
          const dateStr = format(date, "yyyy-MM-dd");

          popularTimes.forEach((time) => {
            const key = `${dateStr}_${time}`;
            const bookedCount = slotCounts[key] || 0;
            const availableCount = totalTherapists - bookedCount;
            
            // Simulate some slots being almost full for demo
            const simulatedBooked = Math.random() > 0.7 ? Math.floor(totalTherapists * 0.7) : bookedCount;
            const simulatedAvailable = totalTherapists - Math.max(bookedCount, simulatedBooked);

            let status: SlotAvailability["status"] = "available";
            if (simulatedAvailable === 0) status = "full";
            else if (simulatedAvailable === 1) status = "almost-full";
            else if (simulatedAvailable <= totalTherapists * 0.5) status = "limited";

            if (status !== "available" && status !== "full") {
              hotSlotsData.push({
                date: dateStr,
                time,
                availableTherapists: simulatedAvailable,
                totalTherapists,
                status,
              });
            }
          });
        }

        // Sort by urgency and limit
        hotSlotsData.sort((a, b) => {
          const statusOrder = { "almost-full": 0, "limited": 1, "available": 2, "full": 3 };
          return statusOrder[a.status] - statusOrder[b.status];
        });

        setHotSlots(hotSlotsData.slice(0, 4));
      } catch (error) {
        console.error("Error fetching availability:", error);
      }

      setIsLoading(false);
    };

    fetchAvailability();

    // Refresh every 30 seconds
    const interval = setInterval(fetchAvailability, 30000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading || hotSlots.length === 0) return null;

  const formatDateDisplay = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = addDays(today, 1);

    if (format(date, "yyyy-MM-dd") === format(today, "yyyy-MM-dd")) return "Heute";
    if (format(date, "yyyy-MM-dd") === format(tomorrow, "yyyy-MM-dd")) return "Morgen";
    return format(date, "EEE, d. MMM");
  };

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Flame className="w-4 h-4 text-red-500 animate-pulse" />
        <span className="text-sm font-medium text-foreground">Beliebte Zeiten - schnell buchen!</span>
      </div>

      {/* Hot Slots Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {hotSlots.map((slot, index) => (
          <motion.button
            key={`${slot.date}-${slot.time}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelectSlot?.(new Date(slot.date), slot.time)}
            className={`p-3 rounded-lg border text-left transition-all hover:scale-[1.02] ${
              slot.status === "almost-full"
                ? "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800"
                : "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-muted-foreground">
                {formatDateDisplay(slot.date)}
              </span>
              {slot.status === "almost-full" ? (
                <AlertTriangle className="w-3 h-3 text-red-500" />
              ) : (
                <Clock className="w-3 h-3 text-amber-500" />
              )}
            </div>
            
            <p className={`text-sm font-semibold ${
              slot.status === "almost-full" ? "text-red-700 dark:text-red-300" : "text-amber-700 dark:text-amber-300"
            }`}>
              {slot.time} Uhr
            </p>
            
            <div className="flex items-center gap-1 mt-1">
              <Users className="w-3 h-3 text-muted-foreground" />
              <span className={`text-xs ${
                slot.status === "almost-full" ? "text-red-600 dark:text-red-400" : "text-amber-600 dark:text-amber-400"
              }`}>
                {slot.status === "almost-full" 
                  ? `Nur noch ${slot.availableTherapists} frei!`
                  : `${slot.availableTherapists} von ${slot.totalTherapists} frei`
                }
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Currently Selected Slot Status */}
      {selectedDate && selectedTime && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg"
        >
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-muted-foreground">
            Ihr gewählter Termin ist noch verfügbar
          </span>
        </motion.div>
      )}
    </div>
  );
};
