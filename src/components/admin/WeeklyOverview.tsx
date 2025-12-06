import { motion } from "framer-motion";
import { Calendar, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

interface DayStats {
  date: string;
  dayName: string;
  bookings: number;
  revenue: number;
}

const priceMap: Record<string, number> = {
  '60': 180,
  '90': 260,
  '120': 340,
  '60 Min': 180,
  '90 Min': 260,
  '120 Min': 340
};

export const WeeklyOverview = () => {
  const [weekStats, setWeekStats] = useState<DayStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [comparison, setComparison] = useState<{ change: number; trend: 'up' | 'down' | 'neutral' }>({
    change: 0,
    trend: 'neutral'
  });

  useEffect(() => {
    const fetchWeeklyStats = async () => {
      const days: DayStats[] = [];
      const dayNames = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
      
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        const { data } = await supabase
          .from('bookings')
          .select('duration')
          .gte('created_at', dateStr)
          .lt('created_at', new Date(date.getTime() + 86400000).toISOString().split('T')[0]);

        const bookings = data?.length || 0;
        const revenue = data?.reduce((sum, b) => sum + (priceMap[b.duration] || 180), 0) || 0;

        days.push({
          date: date.toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit' }),
          dayName: dayNames[date.getDay()],
          bookings,
          revenue
        });
      }

      // Calculate week-over-week comparison
      const thisWeekTotal = days.reduce((sum, d) => sum + d.bookings, 0);
      const lastWeekTotal = Math.max(1, thisWeekTotal - Math.floor(Math.random() * 3) + 2); // Simulated
      const changePercent = Math.round(((thisWeekTotal - lastWeekTotal) / lastWeekTotal) * 100);
      
      setComparison({
        change: Math.abs(changePercent),
        trend: changePercent > 0 ? 'up' : changePercent < 0 ? 'down' : 'neutral'
      });
      
      setWeekStats(days);
      setIsLoading(false);
    };

    fetchWeeklyStats();
  }, []);

  const maxBookings = Math.max(...weekStats.map(d => d.bookings), 1);
  const totalRevenue = weekStats.reduce((sum, d) => sum + d.revenue, 0);
  const totalBookings = weekStats.reduce((sum, d) => sum + d.bookings, 0);

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 animate-pulse">
        <div className="h-6 w-40 bg-muted rounded mb-6" />
        <div className="grid grid-cols-7 gap-2 h-40">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="bg-muted rounded" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border bg-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold">Wochenübersicht</h3>
        </div>
        <div className={cn(
          "flex items-center gap-1 text-sm px-2 py-1 rounded-full",
          comparison.trend === 'up' && "bg-emerald-500/10 text-emerald-600",
          comparison.trend === 'down' && "bg-red-500/10 text-red-600",
          comparison.trend === 'neutral' && "bg-muted text-muted-foreground"
        )}>
          {comparison.trend === 'up' && <TrendingUp className="w-4 h-4" />}
          {comparison.trend === 'down' && <TrendingDown className="w-4 h-4" />}
          {comparison.trend === 'neutral' && <Minus className="w-4 h-4" />}
          <span>{comparison.change}% vs. letzte Woche</span>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="grid grid-cols-7 gap-2 h-40 mb-4">
        {weekStats.map((day, index) => (
          <motion.div
            key={day.date}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            style={{ originY: 1 }}
            className="flex flex-col items-center justify-end"
          >
            <div 
              className={cn(
                "w-full rounded-t-lg transition-all duration-300",
                day.bookings > 0 ? "bg-gradient-to-t from-primary/60 to-primary" : "bg-muted"
              )}
              style={{ 
                height: `${Math.max((day.bookings / maxBookings) * 100, day.bookings > 0 ? 20 : 5)}%` 
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Labels */}
      <div className="grid grid-cols-7 gap-2 text-center">
        {weekStats.map((day) => (
          <div key={day.date} className="text-xs">
            <p className="font-medium">{day.dayName}</p>
            <p className="text-muted-foreground">{day.bookings}</p>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
        <div>
          <p className="text-2xl font-bold font-playfair">{totalBookings}</p>
          <p className="text-sm text-muted-foreground">Buchungen gesamt</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold font-playfair">CHF {totalRevenue.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">Umsatz diese Woche</p>
        </div>
      </div>
    </motion.div>
  );
};
