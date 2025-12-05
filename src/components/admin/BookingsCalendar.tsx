import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Booking } from "@/hooks/useAdmin";

interface BookingsCalendarProps {
  bookings: Booking[];
  onSelectDate?: (date: string) => void;
}

export const BookingsCalendar = ({ bookings, onSelectDate }: BookingsCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startPadding = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    
    const days: { date: Date; isCurrentMonth: boolean; bookings: Booking[] }[] = [];
    
    // Previous month padding
    for (let i = startPadding - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      days.push({ date, isCurrentMonth: false, bookings: [] });
    }
    
    // Current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      const dateStr = date.toISOString().split('T')[0];
      const dayBookings = bookings.filter(b => b.appointment_date === dateStr);
      days.push({ date, isCurrentMonth: true, bookings: dayBookings });
    }
    
    // Next month padding
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      const date = new Date(year, month + 1, i);
      days.push({ date, isCurrentMonth: false, bookings: [] });
    }
    
    return days;
  }, [currentMonth, bookings]);

  const weekDays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border bg-card p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">
          {currentMonth.toLocaleDateString('de-CH', { month: 'long', year: 'numeric' })}
        </h3>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={goToNextMonth}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {daysInMonth.map((day, index) => {
          const hasBookings = day.bookings.length > 0;
          const pendingCount = day.bookings.filter(b => b.status === 'pending').length;
          const confirmedCount = day.bookings.filter(b => b.status === 'confirmed').length;
          
          return (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => day.isCurrentMonth && onSelectDate?.(day.date.toISOString().split('T')[0])}
              className={cn(
                "relative aspect-square rounded-lg flex flex-col items-center justify-center text-sm transition-colors",
                day.isCurrentMonth ? "hover:bg-muted" : "text-muted-foreground/50",
                isToday(day.date) && "bg-primary text-primary-foreground font-bold",
                hasBookings && !isToday(day.date) && "bg-primary/10"
              )}
            >
              {day.date.getDate()}
              
              {/* Booking Indicators */}
              {hasBookings && (
                <div className="absolute bottom-1 flex gap-0.5">
                  {pendingCount > 0 && (
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  )}
                  {confirmedCount > 0 && (
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  )}
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-2 h-2 rounded-full bg-amber-500" />
          Ausstehend
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          Bestätigt
        </div>
      </div>
    </motion.div>
  );
};
