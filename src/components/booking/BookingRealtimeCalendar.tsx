import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, User, ChevronLeft, ChevronRight, Loader2, Check, AlertCircle } from "lucide-react";
import { format, addDays, startOfWeek, addWeeks, isSameDay, isAfter, isBefore, startOfToday } from "date-fns";
import { de } from "date-fns/locale";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface TimeSlot {
  time_slot: string;
  is_available: boolean;
}

interface TherapistAvailability {
  therapist_id: string;
  therapist_name: string;
  date: string;
  time_slot: string;
  is_available: boolean;
}

interface Therapist {
  id: string;
  name: string;
  photo_url?: string | null;
  color?: string | null;
}

interface BookingRealtimeCalendarProps {
  selectedTherapistId?: string;
  therapists: Therapist[];
  onSelectSlot: (therapistId: string, therapistName: string, date: Date, time: string) => void;
  selectedDate?: Date;
  selectedTime?: string;
}

export const BookingRealtimeCalendar = ({
  selectedTherapistId,
  therapists,
  onSelectSlot,
  selectedDate,
  selectedTime,
}: BookingRealtimeCalendarProps) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(() => startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [availability, setAvailability] = useState<TherapistAvailability[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState<Date | null>(selectedDate || null);
  const [viewMode, setViewMode] = useState<'week' | 'day'>('week');

  const today = startOfToday();
  const weekDays = useMemo(() => 
    Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i)),
    [currentWeekStart]
  );

  // Filter therapists based on selection
  const relevantTherapists = useMemo(() => {
    if (selectedTherapistId && selectedTherapistId !== 'none') {
      return therapists.filter(t => t.id === selectedTherapistId);
    }
    return therapists.filter(t => t.id !== 'none');
  }, [selectedTherapistId, therapists]);

  // Fetch availability
  useEffect(() => {
    fetchAvailability();
  }, [currentWeekStart, relevantTherapists]);

  const fetchAvailability = async () => {
    if (relevantTherapists.length === 0) {
      setAvailability([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const startDate = format(currentWeekStart, 'yyyy-MM-dd');
      const endDate = format(addDays(currentWeekStart, 6), 'yyyy-MM-dd');

      const { data, error } = await supabase
        .rpc('get_all_availability', { 
          p_start_date: startDate, 
          p_end_date: endDate 
        });

      if (error) {
        console.error("Error fetching availability:", error);
        return;
      }

      // Filter for relevant therapists
      const relevantIds = relevantTherapists.map(t => t.id);
      const filtered = (data || []).filter((slot: TherapistAvailability) => 
        relevantIds.includes(slot.therapist_id)
      );

      setAvailability(filtered);
    } catch (err) {
      console.error("Availability fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Get available slots for a specific day
  const getSlotsForDay = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return availability.filter(slot => slot.date === dateStr && slot.is_available);
  };

  // Get available slots grouped by time for day view
  const getTimeSlotsForDay = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const daySlots = availability.filter(slot => slot.date === dateStr);
    
    const timeMap = new Map<string, { therapist_id: string; therapist_name: string; is_available: boolean }[]>();
    
    daySlots.forEach(slot => {
      if (!timeMap.has(slot.time_slot)) {
        timeMap.set(slot.time_slot, []);
      }
      timeMap.get(slot.time_slot)!.push({
        therapist_id: slot.therapist_id,
        therapist_name: slot.therapist_name,
        is_available: slot.is_available,
      });
    });

    return Array.from(timeMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([time, slots]) => ({ time, slots }));
  };

  const handleDayClick = (date: Date) => {
    if (isBefore(date, today)) return;
    setSelectedDay(date);
    setViewMode('day');
  };

  const handleSlotClick = (therapistId: string, therapistName: string, date: Date, time: string) => {
    onSelectSlot(therapistId, therapistName, date, time);
  };

  const goToPreviousWeek = () => {
    const newStart = addWeeks(currentWeekStart, -1);
    if (!isBefore(newStart, startOfWeek(today, { weekStartsOn: 1 }))) {
      setCurrentWeekStart(newStart);
    }
  };

  const goToNextWeek = () => {
    setCurrentWeekStart(addWeeks(currentWeekStart, 1));
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="text-copper" size={20} />
          <h3 className="font-display text-lg text-foreground">
            {viewMode === 'week' ? 'Verfügbare Termine' : format(selectedDay!, 'EEEE, d. MMMM', { locale: de })}
          </h3>
        </div>
        
        <div className="flex items-center gap-2">
          {viewMode === 'day' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('week')}
            >
              Wochenansicht
            </Button>
          )}
          <div className="flex items-center gap-1">
            <button
              onClick={goToPreviousWeek}
              disabled={isBefore(addWeeks(currentWeekStart, -1), startOfWeek(today, { weekStartsOn: 1 }))}
              className="p-2 rounded-lg hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-sm text-muted-foreground min-w-[120px] text-center">
              {format(currentWeekStart, 'd. MMM', { locale: de })} - {format(addDays(currentWeekStart, 6), 'd. MMM', { locale: de })}
            </span>
            <button
              onClick={goToNextWeek}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-copper" size={32} />
        </div>
      )}

      {/* Week View */}
      {!isLoading && viewMode === 'week' && (
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day) => {
            const slots = getSlotsForDay(day);
            const availableCount = slots.length;
            const isPast = isBefore(day, today);
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            const isToday = isSameDay(day, today);

            return (
              <button
                key={day.toISOString()}
                onClick={() => handleDayClick(day)}
                disabled={isPast || availableCount === 0}
                className={cn(
                  "p-3 rounded-xl border-2 text-center transition-all min-h-[100px] flex flex-col",
                  isPast 
                    ? "opacity-40 cursor-not-allowed border-border bg-muted/30"
                    : availableCount === 0
                    ? "opacity-50 cursor-not-allowed border-border"
                    : isSelected
                    ? "border-copper bg-copper/10 shadow-md"
                    : "border-border hover:border-copper/50 hover:shadow-sm"
                )}
              >
                <span className={cn(
                  "text-xs uppercase tracking-wider mb-1",
                  isToday ? "text-copper font-medium" : "text-muted-foreground"
                )}>
                  {format(day, 'EEE', { locale: de })}
                </span>
                <span className={cn(
                  "text-lg font-display mb-2",
                  isToday ? "text-copper" : "text-foreground"
                )}>
                  {format(day, 'd')}
                </span>
                
                {!isPast && (
                  <div className="mt-auto">
                    {availableCount > 0 ? (
                      <span className="text-xs text-petrol font-medium">
                        {availableCount} frei
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        Ausgebucht
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Day View */}
      {!isLoading && viewMode === 'day' && selectedDay && (
        <div className="space-y-3">
          {getTimeSlotsForDay(selectedDay).length === 0 ? (
            <div className="text-center py-8">
              <AlertCircle className="text-muted-foreground mx-auto mb-2" size={32} />
              <p className="text-muted-foreground">Keine verfügbaren Termine an diesem Tag</p>
            </div>
          ) : (
            getTimeSlotsForDay(selectedDay).map(({ time, slots }) => {
              const availableSlots = slots.filter(s => s.is_available);
              if (availableSlots.length === 0) return null;

              return (
                <div key={time} className="flex items-start gap-4 p-3 rounded-xl bg-muted/30">
                  <div className="flex items-center gap-2 min-w-[80px]">
                    <Clock size={16} className="text-muted-foreground" />
                    <span className="font-medium text-foreground">{time}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {availableSlots.map((slot) => {
                      const therapist = therapists.find(t => t.id === slot.therapist_id);
                      const isThisSelected = selectedDate && selectedTime === time && 
                        isSameDay(selectedDate, selectedDay) && 
                        selectedTherapistId === slot.therapist_id;

                      return (
                        <motion.button
                          key={`${slot.therapist_id}-${time}`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleSlotClick(slot.therapist_id, slot.therapist_name, selectedDay, time)}
                          className={cn(
                            "flex items-center gap-2 px-3 py-2 rounded-lg border transition-all",
                            isThisSelected
                              ? "border-copper bg-copper/10 shadow-sm"
                              : "border-border bg-background hover:border-copper/50"
                          )}
                        >
                          {therapist?.photo_url ? (
                            <img
                              src={therapist.photo_url}
                              alt={slot.therapist_name}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                          ) : (
                            <div 
                              className="w-6 h-6 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: therapist?.color || '#9F7F6F' }}
                            >
                              <User size={12} className="text-white" />
                            </div>
                          )}
                          <span className="text-sm font-medium">{slot.therapist_name}</span>
                          {isThisSelected && (
                            <Check size={14} className="text-copper" />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-petrol/20 border border-petrol/30" />
          <span>Verfügbar</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-muted border border-border" />
          <span>Ausgebucht</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-copper/20 border border-copper" />
          <span>Ausgewählt</span>
        </div>
      </div>
    </div>
  );
};
