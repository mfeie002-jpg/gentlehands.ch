import { motion } from "framer-motion";
import { Target, TrendingUp, Check, Flame } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { startOfMonth, endOfMonth, isWithinInterval, startOfWeek, endOfWeek } from "date-fns";

interface GoalTrackerProps {
  bookings: any[];
}

export const GoalTracker = ({ bookings }: GoalTrackerProps) => {
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(today, { weekStartsOn: 1 });

  // This month's bookings
  const monthlyBookings = bookings.filter(b =>
    isWithinInterval(new Date(b.created_at), { start: monthStart, end: monthEnd })
  ).length;

  // This week's bookings
  const weeklyBookings = bookings.filter(b =>
    isWithinInterval(new Date(b.created_at), { start: weekStart, end: weekEnd })
  ).length;

  // Goals (could be made configurable)
  const goals = [
    {
      name: 'Monatliche Buchungen',
      current: monthlyBookings,
      target: 50,
      icon: Target,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      name: 'Wöchentliche Buchungen',
      current: weeklyBookings,
      target: 15,
      icon: TrendingUp,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10'
    },
    {
      name: 'Completed Bookings',
      current: bookings.filter(b => b.status === 'completed').length,
      target: 40,
      icon: Check,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    }
  ];

  // Calculate streak (consecutive days with bookings)
  const calculateStreak = () => {
    const sortedDates = [...new Set(
      bookings.map(b => b.appointment_date)
    )].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    
    let streak = 0;
    const todayStr = today.toISOString().split('T')[0];
    
    for (let i = 0; i < sortedDates.length; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      const checkStr = checkDate.toISOString().split('T')[0];
      
      if (sortedDates.includes(checkStr)) {
        streak++;
      } else if (i > 0) {
        break;
      }
    }
    
    return streak;
  };

  const streak = calculateStreak();

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Ziele & Fortschritt
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Streak Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-amber-500/20">
                <Flame className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Aktuelle Serie</p>
                <p className="text-2xl font-bold text-amber-600">{streak} Tage</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">
                {streak >= 7 ? '🔥 Fantastisch!' : streak >= 3 ? '👍 Weiter so!' : '💪 Los geht\'s!'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Goals */}
        <div className="space-y-4">
          {goals.map((goal, index) => {
            const percentage = Math.min((goal.current / goal.target) * 100, 100);
            const isComplete = goal.current >= goal.target;
            
            return (
              <motion.div
                key={goal.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${goal.bgColor}`}>
                      <goal.icon className={`w-4 h-4 ${goal.color}`} />
                    </div>
                    <span className="text-sm font-medium">{goal.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold ${isComplete ? 'text-emerald-500' : ''}`}>
                      {goal.current}/{goal.target}
                    </span>
                    {isComplete && (
                      <Check className="w-4 h-4 text-emerald-500" />
                    )}
                  </div>
                </div>
                <Progress 
                  value={percentage} 
                  className={`h-2 ${isComplete ? '[&>div]:bg-emerald-500' : ''}`} 
                />
                <p className="text-xs text-muted-foreground text-right">
                  {percentage.toFixed(0)}% erreicht
                </p>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
