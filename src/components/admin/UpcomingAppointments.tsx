import { motion } from "framer-motion";
import { Calendar, Clock, User, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface Appointment {
  id: string;
  customerName: string;
  massage: string;
  theme: string;
  therapist: string;
  date: string;
  time: string;
  duration: string;
  isToday: boolean;
  isTomorrow: boolean;
}

export const UpcomingAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      const today = new Date().toISOString().split('T')[0];
      const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      const { data } = await supabase
        .from('bookings')
        .select('*')
        .gte('appointment_date', today)
        .lte('appointment_date', nextWeek)
        .in('status', ['pending', 'confirmed'])
        .order('appointment_date', { ascending: true })
        .order('appointment_time', { ascending: true })
        .limit(8);

      if (data) {
        const mapped = data.map(booking => ({
          id: booking.id,
          customerName: booking.customer_name,
          massage: booking.massage,
          theme: booking.theme,
          therapist: booking.masseur,
          date: booking.appointment_date,
          time: booking.appointment_time,
          duration: booking.duration,
          isToday: booking.appointment_date === today,
          isTomorrow: booking.appointment_date === tomorrow
        }));
        setAppointments(mapped);
      }
      setIsLoading(false);
    };

    fetchAppointments();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('upcoming-appointments')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'bookings' },
        () => fetchAppointments()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 animate-pulse">
        <div className="h-6 w-48 bg-muted rounded mb-6" />
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 bg-muted rounded-xl" />
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
          <h3 className="text-lg font-semibold">Kommende Termine</h3>
        </div>
        <span className="text-sm text-muted-foreground">Nächste 7 Tage</span>
      </div>

      {appointments.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Keine kommenden Termine</p>
        </div>
      ) : (
        <div className="space-y-3">
          {appointments.map((apt, index) => (
            <motion.div
              key={apt.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "p-4 rounded-xl border transition-all hover:shadow-md cursor-pointer",
                apt.isToday && "bg-primary/5 border-primary/20",
                apt.isTomorrow && "bg-amber-500/5 border-amber-500/20",
                !apt.isToday && !apt.isTomorrow && "bg-muted/30 border-border"
              )}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{apt.customerName}</span>
                </div>
                {apt.isToday && (
                  <Badge variant="default" className="bg-primary">Heute</Badge>
                )}
                {apt.isTomorrow && (
                  <Badge variant="secondary" className="bg-amber-500/20 text-amber-600 border-amber-500/30">Morgen</Badge>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{apt.time} Uhr • {apt.duration} Min</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{apt.theme}</span>
                </div>
              </div>

              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm font-medium text-primary">{apt.massage}</span>
                <span className="text-xs text-muted-foreground">{apt.therapist}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};
