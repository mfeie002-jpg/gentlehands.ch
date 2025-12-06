import { motion } from "framer-motion";
import { TrendingUp, Clock, CheckCircle2, XCircle, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface PerformanceMetricsProps {
  bookings: any[];
}

export const PerformanceMetrics = ({ bookings }: PerformanceMetricsProps) => {
  const totalBookings = bookings.length;
  const completedBookings = bookings.filter(b => b.status === 'completed').length;
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled').length;
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
  
  const completionRate = totalBookings > 0 ? Math.round((completedBookings / totalBookings) * 100) : 0;
  const cancellationRate = totalBookings > 0 ? Math.round((cancelledBookings / totalBookings) * 100) : 0;
  const confirmationRate = totalBookings > 0 ? Math.round((confirmedBookings / totalBookings) * 100) : 0;

  const durations = bookings
    .map(b => parseInt(b.duration) || 0)
    .filter(d => d > 0);
  const avgDuration = durations.length > 0 
    ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length) 
    : 0;

  const metrics = [
    { label: "Abschlussrate", value: completionRate, icon: CheckCircle2, color: "text-emerald-500" },
    { label: "Bestätigungsrate", value: confirmationRate, icon: TrendingUp, color: "text-blue-500" },
    { label: "Stornierungsrate", value: cancellationRate, icon: XCircle, color: "text-red-500" }
  ];

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 rounded-xl bg-primary/5 border border-primary/10"
        >
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Ø Behandlungsdauer</span>
          </div>
          <p className="text-2xl font-bold">{avgDuration} Min</p>
        </motion.div>

        <div className="space-y-3">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <metric.icon className={`w-4 h-4 ${metric.color}`} />
                  <span className="text-sm">{metric.label}</span>
                </div>
                <span className={`text-sm font-bold ${metric.color}`}>{metric.value}%</span>
              </div>
              <Progress value={metric.value} className="h-2" />
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
