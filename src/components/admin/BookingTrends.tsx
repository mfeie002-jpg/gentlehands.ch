import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, subDays, startOfWeek, endOfWeek, isWithinInterval } from "date-fns";
import { de } from "date-fns/locale";

interface BookingTrendsProps {
  bookings: any[];
}

export const BookingTrends = ({ bookings }: BookingTrendsProps) => {
  const today = new Date();
  
  // This week vs last week
  const thisWeekStart = startOfWeek(today, { weekStartsOn: 1 });
  const thisWeekEnd = endOfWeek(today, { weekStartsOn: 1 });
  const lastWeekStart = subDays(thisWeekStart, 7);
  const lastWeekEnd = subDays(thisWeekEnd, 7);
  
  const thisWeekBookings = bookings.filter(b => 
    isWithinInterval(new Date(b.created_at), { start: thisWeekStart, end: thisWeekEnd })
  ).length;
  
  const lastWeekBookings = bookings.filter(b => 
    isWithinInterval(new Date(b.created_at), { start: lastWeekStart, end: lastWeekEnd })
  ).length;
  
  const weeklyChange = lastWeekBookings > 0 
    ? Math.round(((thisWeekBookings - lastWeekBookings) / lastWeekBookings) * 100)
    : thisWeekBookings > 0 ? 100 : 0;

  // Calculate daily average
  const last30Days = bookings.filter(b => 
    new Date(b.created_at) >= subDays(today, 30)
  ).length;
  const dailyAvg = (last30Days / 30).toFixed(1);

  // Peak day analysis
  const dayCount: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
  bookings.forEach(b => {
    const day = new Date(b.appointment_date).getDay();
    dayCount[day]++;
  });
  
  const peakDayNum = Object.entries(dayCount).sort((a, b) => b[1] - a[1])[0]?.[0];
  const dayNames = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
  const peakDay = dayNames[Number(peakDayNum)] || 'N/A';

  const TrendIcon = weeklyChange > 0 ? TrendingUp : weeklyChange < 0 ? TrendingDown : Minus;
  const trendColor = weeklyChange > 0 ? 'text-emerald-500' : weeklyChange < 0 ? 'text-red-500' : 'text-muted-foreground';

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Buchungs-Trends
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Weekly Comparison */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-4 rounded-xl bg-muted/30"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Diese Woche</span>
            <div className={`flex items-center gap-1 ${trendColor}`}>
              <TrendIcon className="w-4 h-4" />
              <span className="text-sm font-medium">{weeklyChange > 0 ? '+' : ''}{weeklyChange}%</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{thisWeekBookings}</span>
            <span className="text-muted-foreground text-sm">vs. {lastWeekBookings} letzte Woche</span>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-3 rounded-lg bg-primary/5 border border-primary/10"
          >
            <p className="text-xs text-muted-foreground mb-1">Ø pro Tag (30T)</p>
            <p className="text-xl font-semibold">{dailyAvg}</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/10"
          >
            <p className="text-xs text-muted-foreground mb-1">Stärkster Tag</p>
            <p className="text-xl font-semibold text-amber-600">{peakDay}</p>
          </motion.div>
        </div>

        {/* Day Distribution Bar */}
        <div className="pt-2">
          <p className="text-xs text-muted-foreground mb-2">Verteilung nach Wochentag</p>
          <div className="flex gap-1 h-12">
            {[1, 2, 3, 4, 5, 6, 0].map((day) => {
              const maxCount = Math.max(...Object.values(dayCount), 1);
              const height = (dayCount[day] / maxCount) * 100;
              return (
                <motion.div
                  key={day}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: day * 0.05 }}
                  className={`flex-1 rounded-t ${
                    day === Number(peakDayNum) ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                  title={`${dayNames[day]}: ${dayCount[day]}`}
                />
              );
            })}
          </div>
          <div className="flex gap-1 mt-1">
            {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((day) => (
              <span key={day} className="flex-1 text-[10px] text-center text-muted-foreground">
                {day}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
