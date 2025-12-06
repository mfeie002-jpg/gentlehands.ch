import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, DollarSign, Users, Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickStatsProps {
  stats: {
    todayRevenue: number;
    yesterdayRevenue: number;
    todayBookings: number;
    yesterdayBookings: number;
    pendingActions: number;
    avgDuration: number;
  };
}

export const QuickStats = ({ stats }: QuickStatsProps) => {
  const revenueChange = stats.yesterdayRevenue > 0 
    ? Math.round(((stats.todayRevenue - stats.yesterdayRevenue) / stats.yesterdayRevenue) * 100)
    : 0;
  
  const bookingsChange = stats.yesterdayBookings > 0
    ? Math.round(((stats.todayBookings - stats.yesterdayBookings) / stats.yesterdayBookings) * 100)
    : 0;

  const getTrend = (change: number) => {
    if (change > 0) return { icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10' };
    if (change < 0) return { icon: TrendingDown, color: 'text-red-500', bg: 'bg-red-500/10' };
    return { icon: Minus, color: 'text-muted-foreground', bg: 'bg-muted' };
  };

  const revenueTrend = getTrend(revenueChange);
  const bookingsTrend = getTrend(bookingsChange);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
    >
      {/* Today's Revenue */}
      <div className="p-4 rounded-xl bg-card border border-border">
        <div className="flex items-center justify-between mb-2">
          <DollarSign className="w-5 h-5 text-muted-foreground" />
          <div className={cn("flex items-center gap-1 text-xs px-2 py-0.5 rounded-full", revenueTrend.bg, revenueTrend.color)}>
            <revenueTrend.icon className="w-3 h-3" />
            <span>{Math.abs(revenueChange)}%</span>
          </div>
        </div>
        <p className="text-2xl font-bold font-playfair">CHF {stats.todayRevenue.toLocaleString()}</p>
        <p className="text-xs text-muted-foreground">Heute Umsatz</p>
      </div>

      {/* Today's Bookings */}
      <div className="p-4 rounded-xl bg-card border border-border">
        <div className="flex items-center justify-between mb-2">
          <Calendar className="w-5 h-5 text-muted-foreground" />
          <div className={cn("flex items-center gap-1 text-xs px-2 py-0.5 rounded-full", bookingsTrend.bg, bookingsTrend.color)}>
            <bookingsTrend.icon className="w-3 h-3" />
            <span>{Math.abs(bookingsChange)}%</span>
          </div>
        </div>
        <p className="text-2xl font-bold font-playfair">{stats.todayBookings}</p>
        <p className="text-xs text-muted-foreground">Heute Buchungen</p>
      </div>

      {/* Pending Actions */}
      <div className="p-4 rounded-xl bg-card border border-border">
        <div className="flex items-center justify-between mb-2">
          <Clock className="w-5 h-5 text-muted-foreground" />
          {stats.pendingActions > 0 && (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
          )}
        </div>
        <p className="text-2xl font-bold font-playfair">{stats.pendingActions}</p>
        <p className="text-xs text-muted-foreground">Ausstehende Aktionen</p>
      </div>

      {/* Avg Duration */}
      <div className="p-4 rounded-xl bg-card border border-border">
        <div className="flex items-center justify-between mb-2">
          <Users className="w-5 h-5 text-muted-foreground" />
        </div>
        <p className="text-2xl font-bold font-playfair">{stats.avgDuration} Min</p>
        <p className="text-xs text-muted-foreground">Ø Behandlungsdauer</p>
      </div>
    </motion.div>
  );
};
