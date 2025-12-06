import { motion } from "framer-motion";
import { Grid3X3, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BookingHeatmapProps {
  bookings: any[];
}

export const BookingHeatmap = ({ bookings }: BookingHeatmapProps) => {
  const days = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  const hours = ['09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'];
  
  // Create heatmap data
  const heatmapData: Record<string, Record<string, number>> = {};
  days.forEach(day => {
    heatmapData[day] = {};
    hours.forEach(hour => {
      heatmapData[day][hour] = 0;
    });
  });

  const dayMapping: Record<number, string> = {
    1: 'Mo', 2: 'Di', 3: 'Mi', 4: 'Do', 5: 'Fr', 6: 'Sa'
  };

  bookings.forEach(booking => {
    const date = new Date(booking.appointment_date);
    const dayNum = date.getDay();
    const day = dayMapping[dayNum];
    
    if (day && booking.appointment_time) {
      const hour = booking.appointment_time.split(':')[0];
      if (heatmapData[day] && heatmapData[day][hour] !== undefined) {
        heatmapData[day][hour]++;
      }
    }
  });

  // Find max value for color intensity
  let maxValue = 0;
  Object.values(heatmapData).forEach(dayData => {
    Object.values(dayData).forEach(count => {
      if (count > maxValue) maxValue = count;
    });
  });

  const getIntensityClass = (count: number) => {
    if (count === 0) return 'bg-muted/20';
    const intensity = count / (maxValue || 1);
    if (intensity <= 0.25) return 'bg-primary/20';
    if (intensity <= 0.5) return 'bg-primary/40';
    if (intensity <= 0.75) return 'bg-primary/60';
    return 'bg-primary/80';
  };

  // Find peak time
  let peakDay = '';
  let peakHour = '';
  let peakCount = 0;
  
  Object.entries(heatmapData).forEach(([day, hours]) => {
    Object.entries(hours).forEach(([hour, count]) => {
      if (count > peakCount) {
        peakCount = count;
        peakDay = day;
        peakHour = hour;
      }
    });
  });

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Grid3X3 className="w-5 h-5 text-primary" />
          Buchungs-Heatmap
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Peak Time Info */}
        {peakCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 rounded-lg bg-primary/10 flex items-center gap-2"
          >
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-sm">
              Höchste Nachfrage: <span className="font-medium">{peakDay} {peakHour}:00 Uhr</span>
              <span className="text-muted-foreground ml-1">({peakCount} Buchungen)</span>
            </span>
          </motion.div>
        )}

        {/* Heatmap Grid */}
        <div className="overflow-x-auto">
          <div className="min-w-[320px]">
            {/* Hour labels */}
            <div className="flex mb-1">
              <div className="w-8" />
              {hours.map(hour => (
                <div key={hour} className="flex-1 text-center text-[10px] text-muted-foreground">
                  {hour}
                </div>
              ))}
            </div>

            {/* Grid rows */}
            {days.map((day, dayIndex) => (
              <div key={day} className="flex mb-1">
                <div className="w-8 text-xs text-muted-foreground flex items-center">
                  {day}
                </div>
                {hours.map((hour, hourIndex) => (
                  <motion.div
                    key={`${day}-${hour}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (dayIndex * hours.length + hourIndex) * 0.01 }}
                    className={`flex-1 aspect-square m-0.5 rounded ${getIntensityClass(heatmapData[day][hour])}`}
                    title={`${day} ${hour}:00 - ${heatmapData[day][hour]} Buchungen`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
          <span>Weniger</span>
          <div className="flex gap-0.5">
            <div className="w-4 h-4 rounded bg-muted/20" />
            <div className="w-4 h-4 rounded bg-primary/20" />
            <div className="w-4 h-4 rounded bg-primary/40" />
            <div className="w-4 h-4 rounded bg-primary/60" />
            <div className="w-4 h-4 rounded bg-primary/80" />
          </div>
          <span>Mehr</span>
        </div>
      </CardContent>
    </Card>
  );
};
