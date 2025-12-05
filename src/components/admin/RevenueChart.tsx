import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Booking } from "@/hooks/useAdmin";
import { useMemo } from "react";

interface RevenueChartProps {
  bookings: Booking[];
}

export const RevenueChart = ({ bookings }: RevenueChartProps) => {
  const priceMap: Record<string, number> = {
    '60': 180,
    '90': 260,
    '120': 340
  };

  const chartData = useMemo(() => {
    const last7Days = Array.from({ length: 7 }).map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toISOString().split('T')[0];
    });

    return last7Days.map(date => {
      const dayBookings = bookings.filter(b => 
        b.appointment_date === date && b.status === 'confirmed'
      );
      const revenue = dayBookings.reduce((sum, b) => sum + (priceMap[b.duration] || 0), 0);
      const count = dayBookings.length;
      
      return {
        date,
        revenue,
        count,
        label: new Date(date).toLocaleDateString('de-CH', { weekday: 'short' })
      };
    });
  }, [bookings]);

  const maxRevenue = Math.max(...chartData.map(d => d.revenue), 1);
  const totalRevenue = chartData.reduce((sum, d) => sum + d.revenue, 0);
  const avgRevenue = totalRevenue / 7;
  
  // Compare to previous week (simplified)
  const previousWeekRevenue = bookings
    .filter(b => {
      const date = new Date(b.appointment_date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 14);
      const twoWeeksAgo = new Date();
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 7);
      return date >= weekAgo && date < twoWeeksAgo && b.status === 'confirmed';
    })
    .reduce((sum, b) => sum + (priceMap[b.duration] || 0), 0);

  const percentChange = previousWeekRevenue > 0 
    ? ((totalRevenue - previousWeekRevenue) / previousWeekRevenue) * 100 
    : 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border bg-card p-6"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Umsatz letzte 7 Tage</h3>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold font-playfair">CHF {totalRevenue.toLocaleString()}</span>
            <div className={`flex items-center gap-1 text-sm ${percentChange >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
              {percentChange >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {Math.abs(percentChange).toFixed(1)}%
            </div>
          </div>
        </div>
        <div className="text-right text-sm text-muted-foreground">
          <p>Ø CHF {avgRevenue.toFixed(0)}/Tag</p>
        </div>
      </div>

      {/* Chart */}
      <div className="flex items-end justify-between gap-2 h-40">
        {chartData.map((day, index) => (
          <motion.div
            key={day.date}
            initial={{ height: 0 }}
            animate={{ height: `${(day.revenue / maxRevenue) * 100}%` }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
            className="relative flex-1 group"
          >
            {/* Bar */}
            <div 
              className="absolute inset-x-0 bottom-0 rounded-t-lg bg-gradient-to-t from-primary to-primary/60 transition-all group-hover:from-primary/80"
              style={{ height: '100%' }}
            />
            
            {/* Tooltip */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <div className="bg-popover border border-border rounded-lg p-2 shadow-lg text-center whitespace-nowrap">
                <p className="font-bold">CHF {day.revenue}</p>
                <p className="text-xs text-muted-foreground">{day.count} Buchungen</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Labels */}
      <div className="flex justify-between mt-3">
        {chartData.map(day => (
          <div key={day.date} className="flex-1 text-center text-xs text-muted-foreground">
            {day.label}
          </div>
        ))}
      </div>
    </motion.div>
  );
};
