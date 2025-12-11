import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  Grid3X3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface TimeSlot {
  time: string;
  available: number;
  booked: number;
  total: number;
}

interface DayAvailability {
  date: Date;
  slots: TimeSlot[];
  totalAvailable: number;
  totalBooked: number;
}

interface BookingHeatmapProps {
  bookings?: any[];
}

// Generate sample availability data
const generateAvailabilityData = (startDate: Date, days: number): DayAvailability[] => {
  const data: DayAvailability[] = [];
  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
  ];

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    // Skip Sundays
    if (date.getDay() === 0) {
      data.push({
        date,
        slots: [],
        totalAvailable: 0,
        totalBooked: 0,
      });
      continue;
    }

    const slots: TimeSlot[] = timeSlots.map(time => {
      const total = 3; // 3 therapists
      const booked = Math.floor(Math.random() * (total + 1));
      return {
        time,
        available: total - booked,
        booked,
        total,
      };
    });

    data.push({
      date,
      slots,
      totalAvailable: slots.reduce((sum, s) => sum + s.available, 0),
      totalBooked: slots.reduce((sum, s) => sum + s.booked, 0),
    });
  }

  return data;
};

export const BookingHeatmap = ({ bookings = [] }: BookingHeatmapProps) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    return new Date(today.setDate(diff));
  });

  const [selectedDay, setSelectedDay] = useState<DayAvailability | null>(null);

  const availabilityData = useMemo(() => 
    generateAvailabilityData(currentWeekStart, 28), // 4 weeks
    [currentWeekStart]
  );

  const weekDays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
  
  const getHeatmapColor = (available: number, total: number) => {
    if (total === 0) return 'bg-muted/30'; // Closed
    const ratio = available / total;
    if (ratio >= 0.7) return 'bg-emerald-500';
    if (ratio >= 0.4) return 'bg-amber-500';
    if (ratio > 0) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getHeatmapOpacity = (available: number, total: number) => {
    if (total === 0) return 'opacity-30';
    const ratio = available / total;
    if (ratio >= 0.7) return 'opacity-100';
    if (ratio >= 0.4) return 'opacity-80';
    if (ratio > 0) return 'opacity-60';
    return 'opacity-100';
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeekStart(newDate);
  };

  const weeks = useMemo(() => {
    const result: DayAvailability[][] = [];
    for (let i = 0; i < availabilityData.length; i += 7) {
      result.push(availabilityData.slice(i, i + 7));
    }
    return result;
  }, [availabilityData]);

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('de-CH', { month: 'long', year: 'numeric' });
  };

  const totalStats = useMemo(() => {
    const thisWeek = availabilityData.slice(0, 7);
    return {
      available: thisWeek.reduce((sum, d) => sum + d.totalAvailable, 0),
      booked: thisWeek.reduce((sum, d) => sum + d.totalBooked, 0),
      utilization: thisWeek.reduce((sum, d) => sum + d.totalBooked, 0) / 
        (thisWeek.reduce((sum, d) => sum + d.totalBooked + d.totalAvailable, 0) || 1) * 100,
    };
  }, [availabilityData]);

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Grid3X3 className="w-5 h-5 text-primary" />
            Verfügbarkeits-Übersicht
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateWeek('prev')}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium min-w-[140px] text-center">
              {formatMonthYear(currentWeekStart)}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateWeek('next')}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center p-3 rounded-xl bg-emerald-500/10"
          >
            <p className="text-xs text-muted-foreground mb-1">Verfügbar</p>
            <p className="text-xl font-bold text-emerald-500">{totalStats.available}</p>
            <p className="text-xs text-muted-foreground">diese Woche</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center p-3 rounded-xl bg-primary/10"
          >
            <p className="text-xs text-muted-foreground mb-1">Gebucht</p>
            <p className="text-xl font-bold text-primary">{totalStats.booked}</p>
            <p className="text-xs text-muted-foreground">diese Woche</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center p-3 rounded-xl bg-amber-500/10"
          >
            <p className="text-xs text-muted-foreground mb-1">Auslastung</p>
            <p className="text-xl font-bold text-amber-500">{totalStats.utilization.toFixed(0)}%</p>
            <p className="text-xs text-muted-foreground">diese Woche</p>
          </motion.div>
        </div>

        {/* Heatmap Calendar */}
        <div className="space-y-2">
          {/* Week day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map(day => (
              <div key={day} className="text-center text-xs text-muted-foreground font-medium">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7 gap-1">
              {week.map((day, dayIndex) => {
                const isToday = day.date.toDateString() === new Date().toDateString();
                const isPast = day.date < new Date() && !isToday;
                const isSunday = day.date.getDay() === 0;
                
                return (
                  <motion.button
                    key={dayIndex}
                    whileHover={{ scale: isSunday ? 1 : 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => !isSunday && setSelectedDay(day)}
                    disabled={isSunday}
                    className={`
                      aspect-square rounded-lg flex flex-col items-center justify-center p-1
                      transition-all cursor-pointer relative
                      ${isPast ? 'opacity-50' : ''}
                      ${isToday ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}
                      ${isSunday ? 'cursor-not-allowed' : 'hover:ring-2 hover:ring-border'}
                      ${getHeatmapColor(day.totalAvailable, day.totalAvailable + day.totalBooked)}
                      ${getHeatmapOpacity(day.totalAvailable, day.totalAvailable + day.totalBooked)}
                    `}
                  >
                    <span className="text-xs font-medium text-white mix-blend-difference">
                      {day.date.getDate()}
                    </span>
                    {!isSunday && (
                      <span className="text-[10px] text-white/80 mix-blend-difference">
                        {day.totalAvailable}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-emerald-500" />
            <span>Viele frei</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-amber-500" />
            <span>Einige frei</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-orange-500" />
            <span>Wenige frei</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-red-500" />
            <span>Ausgebucht</span>
          </div>
        </div>

        {/* Selected Day Detail */}
        {selectedDay && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-muted/30 space-y-3"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-medium">
                {selectedDay.date.toLocaleDateString('de-CH', { 
                  weekday: 'long', 
                  day: 'numeric', 
                  month: 'long' 
                })}
              </h4>
              <Badge variant="outline">
                {selectedDay.totalAvailable} verfügbar
              </Badge>
            </div>
            
            <div className="grid grid-cols-5 gap-2">
              {selectedDay.slots.map((slot, index) => (
                <motion.div
                  key={slot.time}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className={`
                    p-2 rounded-lg text-center text-xs
                    ${slot.available > 0 
                      ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' 
                      : 'bg-red-500/20 text-red-600 dark:text-red-400'
                    }
                  `}
                >
                  <Clock className="w-3 h-3 mx-auto mb-1" />
                  <p className="font-medium">{slot.time}</p>
                  <p className="opacity-70">{slot.available}/{slot.total}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingHeatmap;
