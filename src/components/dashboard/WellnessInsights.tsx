import { motion } from "framer-motion";
import { TrendingUp, Activity, Moon, Smile, Calendar, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { format, parseISO, subMonths } from "date-fns";
import { de } from "date-fns/locale";

interface WellnessInsightsProps {
  bookings: any[];
  journalEntries: any[];
  loyaltyPoints: number;
}

export const WellnessInsights = ({ bookings, journalEntries, loyaltyPoints }: WellnessInsightsProps) => {
  // Calculate insights from data
  const now = new Date();
  const lastMonth = subMonths(now, 1);
  
  const bookingsThisMonth = bookings.filter(b => 
    parseISO(b.appointment_date) >= lastMonth
  ).length;

  const bookingsLastMonth = bookings.filter(b => {
    const date = parseISO(b.appointment_date);
    return date >= subMonths(lastMonth, 1) && date < lastMonth;
  }).length;

  const bookingTrend = bookingsLastMonth > 0 
    ? Math.round(((bookingsThisMonth - bookingsLastMonth) / bookingsLastMonth) * 100) 
    : bookingsThisMonth > 0 ? 100 : 0;

  // Calculate average mood from journal
  const moodValues: Record<string, number> = {
    'sehr_entspannt': 5,
    'entspannt': 4,
    'neutral': 3,
    'gestresst': 2,
    'sehr_gestresst': 1,
  };

  const averageMoodAfter = journalEntries.length > 0
    ? journalEntries.reduce((sum, entry) => sum + (moodValues[entry.mood_after] || 3), 0) / journalEntries.length
    : 0;

  const averageMoodBefore = journalEntries.length > 0
    ? journalEntries.reduce((sum, entry) => sum + (moodValues[entry.mood_before] || 3), 0) / journalEntries.length
    : 0;

  const moodImprovement = averageMoodAfter - averageMoodBefore;

  // Most booked experience
  const experienceCounts = bookings.reduce((acc, b) => {
    acc[b.massage] = (acc[b.massage] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const favoriteExperience = Object.entries(experienceCounts)
    .sort(([,a], [,b]) => (b as number) - (a as number))[0];

  // Favorite time
  const timeCounts = bookings.reduce((acc, b) => {
    const hour = parseInt(b.appointment_time?.split(':')[0] || '0');
    const slot = hour < 12 ? 'Vormittag' : hour < 17 ? 'Nachmittag' : 'Abend';
    acc[slot] = (acc[slot] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const favoriteTime = Object.entries(timeCounts)
    .sort(([,a], [,b]) => (b as number) - (a as number))[0];

  const insights = [
    {
      title: "Wellness-Frequenz",
      value: `${bookingsThisMonth}`,
      unit: "Erlebnisse",
      trend: bookingTrend,
      icon: Calendar,
      color: "text-blue-500 bg-blue-500/10",
    },
    {
      title: "Stimmungsverbesserung",
      value: moodImprovement > 0 ? `+${moodImprovement.toFixed(1)}` : moodImprovement.toFixed(1),
      unit: "durchschnittlich",
      trend: moodImprovement > 0 ? 20 : -10,
      icon: Smile,
      color: "text-emerald-500 bg-emerald-500/10",
    },
    {
      title: "Lieblingserlebnis",
      value: favoriteExperience ? favoriteExperience[0] : "—",
      unit: favoriteExperience ? `${favoriteExperience[1]}x gebucht` : "",
      icon: Activity,
      color: "text-copper bg-copper/10",
    },
    {
      title: "Bevorzugte Zeit",
      value: favoriteTime ? favoriteTime[0] : "—",
      unit: favoriteTime ? `${favoriteTime[1]}x gewählt` : "",
      icon: Moon,
      color: "text-violet-500 bg-violet-500/10",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6 border border-border/50"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-petrol/10 flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-petrol" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-foreground">Wellness-Insights</h3>
          <p className="text-sm text-muted-foreground">Ihre persönliche Übersicht</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-xl bg-muted/30"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${insight.color}`}>
                <insight.icon className="w-4 h-4" />
              </div>
              {'trend' in insight && insight.trend !== undefined && (
                <div className={`flex items-center gap-1 text-xs font-medium ${
                  insight.trend >= 0 ? 'text-emerald-500' : 'text-rose-500'
                }`}>
                  {insight.trend >= 0 ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                  {Math.abs(insight.trend)}%
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground mb-1">{insight.title}</p>
            <p className="font-semibold text-foreground truncate">{insight.value}</p>
            {insight.unit && (
              <p className="text-xs text-muted-foreground">{insight.unit}</p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Personalized Tip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6 p-4 rounded-xl bg-gradient-to-r from-copper/10 to-amber-500/5 border border-copper/20"
      >
        <p className="text-sm font-medium text-copper mb-1">💡 Persönlicher Tipp</p>
        <p className="text-sm text-muted-foreground">
          {bookingsThisMonth === 0 
            ? "Gönnen Sie sich wieder ein Wellness-Erlebnis – Ihr Körper wird es Ihnen danken."
            : moodImprovement > 0.5
            ? "Ihre regelmässigen Besuche zeigen deutliche Wirkung auf Ihr Wohlbefinden!"
            : "Probieren Sie einmal das Deep Dark Relax Erlebnis für tiefere Entspannung."
          }
        </p>
      </motion.div>
    </motion.div>
  );
};
