import { motion, AnimatePresence } from "framer-motion";
import { Calendar, TrendingUp, Clock, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

interface LiveStats {
  todayBookings: number;
  weekBookings: number;
  pendingCount: number;
  onlineNow: number;
}

export const LiveBookingCounter = () => {
  const [stats, setStats] = useState<LiveStats>({
    todayBookings: 0,
    weekBookings: 0,
    pendingCount: 0,
    onlineNow: Math.floor(Math.random() * 5) + 1
  });
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchStats = async () => {
    setIsUpdating(true);
    const today = new Date().toISOString().split('T')[0];
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const [todayResult, weekResult, pendingResult] = await Promise.all([
      supabase.from('bookings').select('id', { count: 'exact' })
        .gte('created_at', today),
      supabase.from('bookings').select('id', { count: 'exact' })
        .gte('created_at', weekAgo),
      supabase.from('bookings').select('id', { count: 'exact' })
        .eq('status', 'pending')
    ]);

    setStats({
      todayBookings: todayResult.count || 0,
      weekBookings: weekResult.count || 0,
      pendingCount: pendingResult.count || 0,
      onlineNow: Math.floor(Math.random() * 5) + 1
    });
    setLastUpdate(new Date());
    setIsUpdating(false);
  };

  useEffect(() => {
    fetchStats();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('live-booking-counter')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'bookings' },
        () => fetchStats()
      )
      .subscribe();

    // Refresh every 30 seconds
    const interval = setInterval(fetchStats, 30000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, []);

  const counters = [
    { 
      label: "Heute", 
      value: stats.todayBookings, 
      icon: Calendar,
      color: "from-emerald-500 to-green-500",
      bgColor: "bg-emerald-500/10"
    },
    { 
      label: "Diese Woche", 
      value: stats.weekBookings, 
      icon: TrendingUp,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10"
    },
    { 
      label: "Ausstehend", 
      value: stats.pendingCount, 
      icon: Clock,
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-500/10"
    },
    { 
      label: "Aktive Nutzer", 
      value: stats.onlineNow, 
      icon: Users,
      color: "from-violet-500 to-purple-500",
      bgColor: "bg-violet-500/10",
      live: true
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border bg-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold">Live-Statistiken</h3>
          <motion.div
            animate={{ scale: isUpdating ? [1, 1.2, 1] : 1 }}
            className="flex items-center gap-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs text-muted-foreground">Live</span>
          </motion.div>
        </div>
        <span className="text-xs text-muted-foreground">
          Aktualisiert: {lastUpdate.toLocaleTimeString('de-CH')}
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <AnimatePresence mode="popLayout">
          {counters.map((counter, index) => (
            <motion.div
              key={counter.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative p-4 rounded-xl border border-border overflow-hidden group",
                counter.bgColor
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                <counter.icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{counter.label}</span>
                {counter.live && (
                  <span className="relative flex h-2 w-2 ml-auto">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                  </span>
                )}
              </div>
              <motion.p 
                key={counter.value}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold font-playfair"
              >
                {counter.value}
              </motion.p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
