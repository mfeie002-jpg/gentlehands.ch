import { motion } from "framer-motion";
import { Sparkles, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

interface MassageStats {
  name: string;
  count: number;
  revenue: number;
  percentage: number;
}

const priceMap: Record<string, number> = {
  '60': 180,
  '90': 260,
  '120': 340,
  '60 Min': 180,
  '90 Min': 260,
  '120 Min': 340
};

export const TopMassages = () => {
  const [massages, setMassages] = useState<MassageStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const { data } = await supabase
        .from('bookings')
        .select('massage, duration');

      if (data && data.length > 0) {
        const massageCounts: Record<string, { count: number; revenue: number }> = {};
        
        data.forEach(booking => {
          const massage = booking.massage || 'Unbekannt';
          if (!massageCounts[massage]) {
            massageCounts[massage] = { count: 0, revenue: 0 };
          }
          massageCounts[massage].count++;
          massageCounts[massage].revenue += priceMap[booking.duration] || 180;
        });

        const total = data.length;
        const sorted = Object.entries(massageCounts)
          .map(([name, stats]) => ({
            name,
            count: stats.count,
            revenue: stats.revenue,
            percentage: Math.round((stats.count / total) * 100)
          }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);

        setMassages(sorted);
      }
      setIsLoading(false);
    };

    fetchStats();
  }, []);

  const colors = [
    "from-emerald-500 to-green-500",
    "from-blue-500 to-cyan-500",
    "from-violet-500 to-purple-500",
    "from-amber-500 to-orange-500",
    "from-pink-500 to-rose-500"
  ];

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 animate-pulse">
        <div className="h-6 w-40 bg-muted rounded mb-6" />
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-12 bg-muted rounded-lg" />
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
        <Sparkles className="w-5 h-5 text-muted-foreground" />
        <h3 className="text-lg font-semibold">Top Massagen</h3>
      </div>

      {massages.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Noch keine Daten verfügbar</p>
        </div>
      ) : (
        <div className="space-y-4">
          {massages.map((massage, index) => (
            <motion.div
              key={massage.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-3">
                  <span className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br",
                    colors[index]
                  )}>
                    {index + 1}
                  </span>
                  <span className="font-medium">{massage.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium">{massage.count} Buchungen</span>
                  <span className="text-xs text-muted-foreground ml-2">
                    ({massage.percentage}%)
                  </span>
                </div>
              </div>
              <div className="relative h-2 bg-muted rounded-full overflow-hidden ml-9">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${massage.percentage}%` }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                  className={cn("h-full rounded-full bg-gradient-to-r", colors[index])}
                />
              </div>
              <p className="text-xs text-muted-foreground ml-9 mt-1">
                CHF {massage.revenue.toLocaleString()} Umsatz
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};
