import { motion } from "framer-motion";
import { User, Star, TrendingUp, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface TherapistPerformanceProps {
  bookings: any[];
}

export const TherapistPerformance = ({ bookings }: TherapistPerformanceProps) => {
  // Calculate therapist stats
  const therapistStats = new Map<string, { 
    count: number; 
    completed: number;
    cancelled: number;
  }>();

  bookings.forEach(booking => {
    const therapist = booking.masseur || 'Unbekannt';
    const existing = therapistStats.get(therapist) || { count: 0, completed: 0, cancelled: 0 };
    existing.count++;
    if (booking.status === 'completed') existing.completed++;
    if (booking.status === 'cancelled') existing.cancelled++;
    therapistStats.set(therapist, existing);
  });

  const therapists = Array.from(therapistStats.entries())
    .map(([name, stats]) => ({
      name,
      ...stats,
      completionRate: stats.count > 0 ? Math.round((stats.completed / stats.count) * 100) : 0
    }))
    .sort((a, b) => b.count - a.count);

  const topTherapist = therapists[0];
  const totalBookings = bookings.length;

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          Therapeuten Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Top Performer */}
        {topTherapist && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20"
          >
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-medium text-amber-600">Top Performer</span>
            </div>
            <p className="text-xl font-bold">{topTherapist.name}</p>
            <p className="text-sm text-muted-foreground">
              {topTherapist.count} Buchungen • {topTherapist.completionRate}% Abschlussrate
            </p>
          </motion.div>
        )}

        {/* Therapist List */}
        <div className="space-y-3">
          {therapists.slice(0, 4).map((therapist, index) => {
            const percentage = totalBookings > 0 ? (therapist.count / totalBookings) * 100 : 0;
            
            return (
              <motion.div
                key={therapist.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                      {therapist.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{therapist.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {therapist.count} Buchungen
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{Math.round(percentage)}%</p>
                    <p className="text-xs text-muted-foreground">Anteil</p>
                  </div>
                </div>
                <Progress value={percentage} className="h-1.5" />
              </motion.div>
            );
          })}
        </div>

        {therapists.length === 0 && (
          <div className="text-center py-4 text-muted-foreground text-sm">
            Keine Therapeuten-Daten verfügbar
          </div>
        )}
      </CardContent>
    </Card>
  );
};
