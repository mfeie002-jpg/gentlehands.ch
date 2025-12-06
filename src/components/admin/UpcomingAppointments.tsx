import { motion } from "framer-motion";
import { CalendarClock, User, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, isToday, isTomorrow, parseISO } from "date-fns";
import { de } from "date-fns/locale";

interface UpcomingAppointmentsProps {
  bookings: any[];
}

export const UpcomingAppointments = ({ bookings }: UpcomingAppointmentsProps) => {
  const today = new Date();
  
  const upcomingBookings = bookings
    .filter(booking => {
      const appointmentDate = parseISO(booking.appointment_date);
      return appointmentDate >= today && booking.status !== 'cancelled';
    })
    .sort((a, b) => {
      const dateA = parseISO(a.appointment_date);
      const dateB = parseISO(b.appointment_date);
      return dateA.getTime() - dateB.getTime();
    })
    .slice(0, 5);

  const getDateLabel = (dateStr: string) => {
    const date = parseISO(dateStr);
    if (isToday(date)) return 'Heute';
    if (isTomorrow(date)) return 'Morgen';
    return format(date, 'EEE, dd. MMM', { locale: de });
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <CalendarClock className="w-5 h-5 text-primary" />
          Kommende Termine
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {upcomingBookings.length > 0 ? (
          upcomingBookings.map((booking, index) => {
            const dateLabel = getDateLabel(booking.appointment_date);
            const isUrgent = isToday(parseISO(booking.appointment_date));
            
            return (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-3 rounded-lg border ${
                  isUrgent ? 'bg-primary/5 border-primary/20' : 'bg-muted/30 border-transparent'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <User className="w-3 h-3 text-muted-foreground" />
                      <span className="font-medium text-sm">{booking.customer_name}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {booking.massage} • {booking.duration} Min
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant={isUrgent ? "default" : "secondary"} className="text-xs">
                      {dateLabel}
                    </Badge>
                    <div className="flex items-center justify-end gap-1 mt-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{booking.appointment_time}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="text-center py-4 text-muted-foreground text-sm">
            Keine anstehenden Termine
          </div>
        )}
      </CardContent>
    </Card>
  );
};
