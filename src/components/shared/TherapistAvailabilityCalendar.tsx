import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, User, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';
import { de } from 'date-fns/locale';

interface TimeSlot {
  time: string;
  available: boolean;
  bookedBy?: string;
}

interface TherapistSchedule {
  id: string;
  name: string;
  color: string;
  specialty: string;
  avatar?: string;
  schedule: {
    [date: string]: TimeSlot[];
  };
}

// Simulated therapist data
const therapists: TherapistSchedule[] = [
  {
    id: '1',
    name: 'Anna',
    color: 'hsl(var(--primary))',
    specialty: 'Deep Tissue & Entspannung',
    schedule: {}
  },
  {
    id: '2',
    name: 'Luca',
    color: 'hsl(168, 45%, 45%)',
    specialty: 'Hot Stone & Aromatherapie',
    schedule: {}
  },
  {
    id: '3',
    name: 'Morris',
    color: 'hsl(35, 60%, 50%)',
    specialty: 'Sport & Regeneration',
    schedule: {}
  }
];

const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', '13:00', 
  '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
];

// Generate random availability
const generateSchedule = (date: Date): TimeSlot[] => {
  return timeSlots.map(time => ({
    time,
    available: Math.random() > 0.3,
    bookedBy: Math.random() > 0.7 ? 'Gebucht' : undefined
  }));
};

interface TherapistAvailabilityCalendarProps {
  onSelectSlot?: (therapist: string, date: Date, time: string) => void;
  className?: string;
}

const TherapistAvailabilityCalendar: React.FC<TherapistAvailabilityCalendarProps> = ({
  onSelectSlot,
  className
}) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(() => 
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  const [selectedTherapist, setSelectedTherapist] = useState<string | null>(null);
  const [hoveredSlot, setHoveredSlot] = useState<{ therapist: string; date: string; time: string } | null>(null);

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentWeekStart(prev => 
      direction === 'next' ? addDays(prev, 7) : addDays(prev, -7)
    );
  };

  const getSlotStatus = (therapistId: string, date: Date, time: string) => {
    // Simulate availability based on deterministic random
    const seed = `${therapistId}-${format(date, 'yyyy-MM-dd')}-${time}`;
    const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const isAvailable = hash % 3 !== 0;
    const isBooked = hash % 5 === 0;
    
    if (isBooked) return 'booked';
    if (isAvailable) return 'available';
    return 'unavailable';
  };

  const filteredTherapists = selectedTherapist 
    ? therapists.filter(t => t.id === selectedTherapist)
    : therapists;

  return (
    <div className={cn("bg-card rounded-2xl border border-border p-6", className)}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-display font-semibold text-foreground flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Therapeuten-Verfügbarkeit
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Übersicht freier Termine pro Therapeut:in
          </p>
        </div>

        {/* Week Navigation */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateWeek('prev')}
            className="h-8 w-8"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm font-medium min-w-[180px] text-center">
            {format(currentWeekStart, 'd. MMM', { locale: de })} - {format(addDays(currentWeekStart, 6), 'd. MMM yyyy', { locale: de })}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateWeek('next')}
            className="h-8 w-8"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Therapist Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant={selectedTherapist === null ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedTherapist(null)}
          className="rounded-full"
        >
          Alle
        </Button>
        {therapists.map(therapist => (
          <Button
            key={therapist.id}
            variant={selectedTherapist === therapist.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedTherapist(therapist.id)}
            className="rounded-full gap-2"
          >
            <span 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: therapist.color }}
            />
            {therapist.name}
          </Button>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-6 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-primary/20 border border-primary" />
          <span className="text-muted-foreground">Verfügbar</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-muted border border-border" />
          <span className="text-muted-foreground">Nicht verfügbar</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-destructive/20 border border-destructive/50" />
          <span className="text-muted-foreground">Gebucht</span>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="overflow-x-auto -mx-6 px-6">
        <div className="min-w-[700px]">
          {/* Day Headers */}
          <div className="grid grid-cols-[100px_repeat(7,1fr)] gap-1 mb-2">
            <div className="text-xs font-medium text-muted-foreground p-2">
              <Clock className="w-4 h-4" />
            </div>
            {weekDays.map((day, idx) => (
              <div 
                key={idx}
                className={cn(
                  "text-center p-2 rounded-lg",
                  isSameDay(day, new Date()) && "bg-primary/10"
                )}
              >
                <div className="text-xs text-muted-foreground">
                  {format(day, 'EEE', { locale: de })}
                </div>
                <div className={cn(
                  "text-sm font-medium",
                  isSameDay(day, new Date()) && "text-primary"
                )}>
                  {format(day, 'd')}
                </div>
              </div>
            ))}
          </div>

          {/* Therapist Rows */}
          <AnimatePresence mode="wait">
            {filteredTherapists.map((therapist, tIdx) => (
              <motion.div
                key={therapist.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: tIdx * 0.1 }}
                className="mb-4"
              >
                {/* Therapist Header */}
                <div className="flex items-center gap-2 mb-2 py-2">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                    style={{ backgroundColor: therapist.color }}
                  >
                    {therapist.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{therapist.name}</div>
                    <div className="text-xs text-muted-foreground">{therapist.specialty}</div>
                  </div>
                </div>

                {/* Time Slots Grid */}
                {timeSlots.map((time, timeIdx) => (
                  <div 
                    key={time}
                    className="grid grid-cols-[100px_repeat(7,1fr)] gap-1 mb-1"
                  >
                    <div className="text-xs text-muted-foreground p-2 flex items-center">
                      {time}
                    </div>
                    {weekDays.map((day, dayIdx) => {
                      const status = getSlotStatus(therapist.id, day, time);
                      const isHovered = hoveredSlot?.therapist === therapist.id && 
                                       hoveredSlot?.date === format(day, 'yyyy-MM-dd') && 
                                       hoveredSlot?.time === time;
                      
                      return (
                        <motion.button
                          key={dayIdx}
                          className={cn(
                            "h-8 rounded-md border transition-all duration-200 relative",
                            status === 'available' && "bg-primary/10 border-primary/30 hover:bg-primary/20 hover:border-primary cursor-pointer",
                            status === 'unavailable' && "bg-muted/50 border-border/50 cursor-not-allowed",
                            status === 'booked' && "bg-destructive/10 border-destructive/30 cursor-not-allowed"
                          )}
                          disabled={status !== 'available'}
                          onClick={() => status === 'available' && onSelectSlot?.(therapist.name, day, time)}
                          onMouseEnter={() => setHoveredSlot({ 
                            therapist: therapist.id, 
                            date: format(day, 'yyyy-MM-dd'), 
                            time 
                          })}
                          onMouseLeave={() => setHoveredSlot(null)}
                          whileHover={status === 'available' ? { scale: 1.05 } : {}}
                          whileTap={status === 'available' ? { scale: 0.95 } : {}}
                        >
                          {isHovered && status === 'available' && (
                            <motion.div
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-10 border border-border"
                            >
                              {time} buchen
                            </motion.div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                ))}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-4 border-t border-border grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl font-display font-semibold text-primary">
            {Math.floor(Math.random() * 20) + 30}
          </div>
          <div className="text-xs text-muted-foreground">Freie Slots diese Woche</div>
        </div>
        <div>
          <div className="text-2xl font-display font-semibold text-foreground">
            {therapists.length}
          </div>
          <div className="text-xs text-muted-foreground">Verfügbare Therapeuten</div>
        </div>
        <div>
          <div className="text-2xl font-display font-semibold text-accent">
            {Math.floor(Math.random() * 5) + 3}
          </div>
          <div className="text-xs text-muted-foreground">Termine heute</div>
        </div>
      </div>
    </div>
  );
};

export default TherapistAvailabilityCalendar;
