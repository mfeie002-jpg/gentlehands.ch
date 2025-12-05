import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, User, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TimeSlot {
  time: string;
  available: boolean;
  therapist?: string;
}

interface BookingCalendarProps {
  onSelectDateTime: (date: Date, time: string, therapist: string) => void;
  selectedTherapist?: string;
}

const therapists = [
  { id: "anna", name: "Anna", color: "bg-rose-500", specialties: ["Tiefenentspannung", "Hot Stone"] },
  { id: "luca", name: "Luca", color: "bg-amber-500", specialties: ["Sportmassage", "Deep Tissue"] },
  { id: "morris", name: "Morris", color: "bg-emerald-500", specialties: ["Ganzheitlich", "Aromatherapie"] },
];

const generateTimeSlots = (date: Date): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const times = ["10:00", "11:30", "13:00", "14:30", "16:00", "17:30", "19:00"];
  
  times.forEach(time => {
    // Simulate availability based on date
    const isAvailable = Math.random() > 0.3;
    const randomTherapist = therapists[Math.floor(Math.random() * therapists.length)];
    
    slots.push({
      time,
      available: isAvailable,
      therapist: isAvailable ? randomTherapist.id : undefined,
    });
  });
  
  return slots;
};

export const BookingCalendar = ({ onSelectDateTime, selectedTherapist }: BookingCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedTherapistId, setSelectedTherapistId] = useState<string>(selectedTherapist || "any");
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [viewMode, setViewMode] = useState<"calendar" | "therapist">("calendar");

  useEffect(() => {
    if (selectedDate) {
      setTimeSlots(generateTimeSlots(selectedDate));
    }
  }, [selectedDate]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    return { daysInMonth, startingDay };
  };

  const { daysInMonth, startingDay } = getDaysInMonth(currentMonth);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isDateDisabled = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const isSunday = date.getDay() === 0;
    const isPast = date < today;
    const isTooFar = date > new Date(today.getTime() + 60 * 24 * 60 * 60 * 1000);
    return isSunday || isPast || isTooFar;
  };

  const handleDateSelect = (day: number) => {
    if (isDateDisabled(day)) return;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    if (selectedDate) {
      onSelectDateTime(selectedDate, time, selectedTherapistId);
    }
  };

  const monthNames = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
  const dayNames = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];

  return (
    <div className="space-y-6">
      {/* View Mode Toggle */}
      <div className="flex gap-2 p-1 bg-muted/50 rounded-xl">
        <button
          onClick={() => setViewMode("calendar")}
          className={cn(
            "flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all",
            viewMode === "calendar" ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"
          )}
        >
          Nach Datum
        </button>
        <button
          onClick={() => setViewMode("therapist")}
          className={cn(
            "flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all",
            viewMode === "therapist" ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"
          )}
        >
          Nach Therapeut:in
        </button>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === "calendar" ? (
          <motion.div
            key="calendar"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-display font-semibold">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h3>
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Day Names */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map(day => (
                <div key={day} className="text-center text-xs text-muted-foreground font-medium py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for days before month starts */}
              {[...Array(startingDay)].map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}
              
              {/* Days of month */}
              {[...Array(daysInMonth)].map((_, i) => {
                const day = i + 1;
                const isDisabled = isDateDisabled(day);
                const isSelected = selectedDate?.getDate() === day && 
                                   selectedDate?.getMonth() === currentMonth.getMonth();
                const isToday = today.getDate() === day && 
                               today.getMonth() === currentMonth.getMonth() &&
                               today.getFullYear() === currentMonth.getFullYear();
                
                return (
                  <motion.button
                    key={day}
                    onClick={() => handleDateSelect(day)}
                    disabled={isDisabled}
                    whileHover={!isDisabled ? { scale: 1.1 } : {}}
                    whileTap={!isDisabled ? { scale: 0.95 } : {}}
                    className={cn(
                      "aspect-square rounded-xl flex items-center justify-center text-sm font-medium transition-all relative",
                      isDisabled && "text-muted-foreground/30 cursor-not-allowed",
                      !isDisabled && !isSelected && "hover:bg-copper/10 text-foreground",
                      isSelected && "bg-copper text-background",
                      isToday && !isSelected && "ring-2 ring-copper/50"
                    )}
                  >
                    {day}
                    {!isDisabled && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-500" />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="therapist"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            {/* Therapist Selection */}
            <div className="space-y-3">
              <button
                onClick={() => setSelectedTherapistId("any")}
                className={cn(
                  "w-full p-4 rounded-xl border-2 transition-all text-left",
                  selectedTherapistId === "any" 
                    ? "border-copper bg-copper/5" 
                    : "border-border hover:border-copper/50"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-copper/20 to-petrol/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-copper" />
                  </div>
                  <div>
                    <p className="font-medium">Keine Präferenz</p>
                    <p className="text-sm text-muted-foreground">Nächster verfügbarer Termin</p>
                  </div>
                  {selectedTherapistId === "any" && (
                    <Check className="w-5 h-5 text-copper ml-auto" />
                  )}
                </div>
              </button>
              
              {therapists.map(therapist => (
                <button
                  key={therapist.id}
                  onClick={() => setSelectedTherapistId(therapist.id)}
                  className={cn(
                    "w-full p-4 rounded-xl border-2 transition-all text-left",
                    selectedTherapistId === therapist.id 
                      ? "border-copper bg-copper/5" 
                      : "border-border hover:border-copper/50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn("w-12 h-12 rounded-full flex items-center justify-center text-white font-medium", therapist.color)}>
                      {therapist.name[0]}
                    </div>
                    <div>
                      <p className="font-medium">{therapist.name}</p>
                      <p className="text-sm text-muted-foreground">{therapist.specialties.join(", ")}</p>
                    </div>
                    {selectedTherapistId === therapist.id && (
                      <Check className="w-5 h-5 text-copper ml-auto" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Time Slots */}
      <AnimatePresence>
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border pt-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-copper" />
              <h4 className="font-medium">
                Verfügbare Zeiten am {selectedDate.toLocaleDateString('de-CH', { weekday: 'long', day: 'numeric', month: 'long' })}
              </h4>
            </div>
            
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {timeSlots.map(slot => (
                <motion.button
                  key={slot.time}
                  onClick={() => slot.available && handleTimeSelect(slot.time)}
                  disabled={!slot.available}
                  whileHover={slot.available ? { scale: 1.05 } : {}}
                  whileTap={slot.available ? { scale: 0.95 } : {}}
                  className={cn(
                    "py-3 px-4 rounded-xl text-sm font-medium transition-all",
                    !slot.available && "bg-muted/30 text-muted-foreground/50 cursor-not-allowed line-through",
                    slot.available && selectedTime !== slot.time && "bg-muted hover:bg-copper/10",
                    selectedTime === slot.time && "bg-copper text-background"
                  )}
                >
                  {slot.time}
                </motion.button>
              ))}
            </div>
            
            {/* Legend */}
            <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-muted" /> Verfügbar
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-copper" /> Ausgewählt
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-muted/30" /> Belegt
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
