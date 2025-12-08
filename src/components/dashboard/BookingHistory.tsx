import { motion } from "framer-motion";
import { Calendar, Clock, User, MapPin, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Booking {
  id: string;
  date: string;
  time: string;
  massage: string;
  therapist: string;
  theme: string;
  status: "completed" | "upcoming" | "cancelled";
  rating?: number;
}

interface BookingHistoryProps {
  bookings: Booking[];
}

export const BookingHistory = ({ bookings }: BookingHistoryProps) => {
  const getStatusBadge = (status: Booking["status"]) => {
    switch (status) {
      case "completed":
        return <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-600 text-xs">Abgeschlossen</span>;
      case "upcoming":
        return <span className="px-2 py-1 rounded-full bg-copper/10 text-copper text-xs">Bevorstehend</span>;
      case "cancelled":
        return <span className="px-2 py-1 rounded-full bg-destructive/10 text-destructive text-xs">Storniert</span>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border/50 rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-xl text-foreground">Buchungsverlauf</h3>
        <Button variant="ghost" size="sm">
          Alle anzeigen
          <ChevronRight size={16} className="ml-1" />
        </Button>
      </div>

      <div className="space-y-4">
        {bookings.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">Noch keine Buchungen vorhanden.</p>
        ) : (
          bookings.map((booking, index) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-xl bg-secondary/30 border border-border/30 hover:border-copper/30 transition-colors group"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h4 className="font-medium text-foreground">{booking.massage}</h4>
                    {getStatusBadge(booking.status)}
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {booking.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {booking.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <User size={14} />
                      {booking.therapist}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      {booking.theme}
                    </span>
                  </div>

                  {booking.rating && (
                    <div className="flex items-center gap-1">
                      {[...Array(booking.rating)].map((_, i) => (
                        <Star key={i} size={12} className="text-copper fill-copper" />
                      ))}
                    </div>
                  )}
                </div>

                <ChevronRight size={20} className="text-muted-foreground group-hover:text-copper transition-colors" />
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};
