import { motion } from "framer-motion";
import { CalendarDays, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { startOfWeek, endOfWeek, eachDayOfInterval, format, isSameDay, parseISO } from "date-fns";
import { de } from "date-fns/locale";

interface WeeklyOverviewProps {
  bookings: any[];
}

export const WeeklyOverview = ({ bookings }: WeeklyOverviewProps) => {
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(today, { weekStartsOn: 1 });
  const daysOfWeek = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const dailyCounts = daysOfWeek.map(day => {
    const count = bookings.filter(booking => 
      isSameDay(parseISO(booking.appointment_date), day)
    ).length;
    return { day, count };
  });

  const maxCount = Math.max(...dailyCounts.map(d => d.count), 1);
  const totalThisWeek = dailyCounts.reduce((sum, d) => sum + d.count, 0);

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-primary" />
            Diese Woche
          </CardTitle>
          <div className="flex items-center gap-1 text-sm">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            <span className="font-medium">{totalThisWeek} Termine</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between gap-2 h-32">
          {dailyCounts.map(({ day, count }, index) => {
            const height = (count / maxCount) * 100;
            const isCurrentDay = isSameDay(day, today);
            
            return (
              <motion.div
                key={day.toISOString()}
                initial={{ height: 0 }}
                animate={{ height: `${Math.max(height, 5)}%` }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex-1 flex flex-col items-center"
              >
                <div 
                  className={`w-full rounded-t-lg transition-colors ${
                    isCurrentDay ? 'bg-primary' : count > 0 ? 'bg-primary/40' : 'bg-muted'
                  }`}
                  style={{ height: '100%' }}
                />
                <div className="mt-2 text-center">
                  <p className={`text-xs font-medium ${isCurrentDay ? 'text-primary' : 'text-muted-foreground'}`}>
                    {format(day, 'EEE', { locale: de })}
                  </p>
                  <p className="text-xs text-muted-foreground">{count}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
