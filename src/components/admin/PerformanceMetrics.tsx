import { motion } from "framer-motion";
import { 
  Zap, 
  Clock, 
  Target, 
  TrendingUp,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface Metrics {
  avgResponseTime: number;
  confirmationRate: number;
  cancellationRate: number;
  completionRate: number;
  avgBookingsPerDay: number;
  peakHour: string;
}

export const PerformanceMetrics = () => {
  const [metrics, setMetrics] = useState<Metrics>({
    avgResponseTime: 0,
    confirmationRate: 0,
    cancellationRate: 0,
    completionRate: 0,
    avgBookingsPerDay: 0,
    peakHour: "10:00"
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      const { data: bookings } = await supabase
        .from('bookings')
        .select('status, appointment_time, created_at');

      if (bookings && bookings.length > 0) {
        const total = bookings.length;
        const confirmed = bookings.filter(b => b.status === 'confirmed').length;
        const cancelled = bookings.filter(b => b.status === 'cancelled').length;
        const completed = bookings.filter(b => b.status === 'completed').length;

        // Calculate peak hour
        const hourCounts: Record<string, number> = {};
        bookings.forEach(b => {
          const hour = b.appointment_time?.split(':')[0] || '10';
          hourCounts[hour] = (hourCounts[hour] || 0) + 1;
        });
        const peakHour = Object.entries(hourCounts)
          .sort(([,a], [,b]) => b - a)[0]?.[0] || '10';

        // Calculate avg bookings per day (last 30 days)
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const recentBookings = bookings.filter(
          b => new Date(b.created_at) > thirtyDaysAgo
        ).length;

        setMetrics({
          avgResponseTime: 2.4, // Simulated
          confirmationRate: Math.round((confirmed / total) * 100),
          cancellationRate: Math.round((cancelled / total) * 100),
          completionRate: Math.round((completed / total) * 100),
          avgBookingsPerDay: Math.round((recentBookings / 30) * 10) / 10,
          peakHour: `${peakHour}:00`
        });
      }
      setIsLoading(false);
    };

    fetchMetrics();
  }, []);

  const metricCards = [
    {
      label: "Ø Reaktionszeit",
      value: `${metrics.avgResponseTime}h`,
      icon: Clock,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      label: "Bestätigungsrate",
      value: `${metrics.confirmationRate}%`,
      progress: metrics.confirmationRate,
      icon: CheckCircle2,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10"
    },
    {
      label: "Stornierungsrate",
      value: `${metrics.cancellationRate}%`,
      progress: metrics.cancellationRate,
      icon: XCircle,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      inverted: true
    },
    {
      label: "Ø Buchungen/Tag",
      value: metrics.avgBookingsPerDay.toString(),
      icon: TrendingUp,
      color: "text-violet-500",
      bgColor: "bg-violet-500/10"
    },
    {
      label: "Peak-Stunde",
      value: metrics.peakHour,
      icon: Zap,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10"
    },
    {
      label: "Abschlussrate",
      value: `${metrics.completionRate}%`,
      progress: metrics.completionRate,
      icon: Target,
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10"
    }
  ];

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 animate-pulse">
        <div className="h-6 w-48 bg-muted rounded mb-6" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-24 bg-muted rounded-xl" />
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
      <div className="flex items-center gap-3 mb-6">
        <Target className="w-5 h-5 text-muted-foreground" />
        <h3 className="text-lg font-semibold">Performance-Metriken</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {metricCards.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "p-4 rounded-xl border border-border",
              metric.bgColor
            )}
          >
            <div className="flex items-center gap-2 mb-2">
              <metric.icon className={cn("w-4 h-4", metric.color)} />
              <span className="text-xs text-muted-foreground">{metric.label}</span>
            </div>
            <p className="text-2xl font-bold font-playfair mb-2">{metric.value}</p>
            {metric.progress !== undefined && (
              <Progress 
                value={metric.inverted ? 100 - metric.progress : metric.progress} 
                className="h-1.5"
              />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
