import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Bell, Calendar, Clock, MapPin, User, ChevronRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { differenceInDays, differenceInHours, format, parseISO } from "date-fns";
import { de } from "date-fns/locale";

interface Booking {
  id: string;
  booking_number: string;
  appointment_date: string;
  appointment_time: string;
  massage: string;
  theme: string;
  masseur: string;
}

interface BookingRemindersProps {
  upcomingBookings: Booking[];
}

export const BookingReminders = ({ upcomingBookings }: BookingRemindersProps) => {
  if (upcomingBookings.length === 0) return null;

  const getTimeUntil = (date: string, time: string) => {
    const appointmentDate = new Date(`${date}T${time}`);
    const now = new Date();
    const days = differenceInDays(appointmentDate, now);
    const hours = differenceInHours(appointmentDate, now) % 24;
    
    if (days === 0) return { text: `In ${hours} Stunden`, urgent: true };
    if (days === 1) return { text: "Morgen", urgent: true };
    if (days <= 3) return { text: `In ${days} Tagen`, urgent: false };
    return { text: `In ${days} Tagen`, urgent: false };
  };

  const nextBooking = upcomingBookings[0];
  const timeUntil = getTimeUntil(nextBooking.appointment_date, nextBooking.appointment_time);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Next Appointment Highlight */}
      <div className={`rounded-2xl p-6 border ${
        timeUntil.urgent 
          ? 'bg-gradient-to-r from-copper/10 to-amber-500/10 border-copper/30' 
          : 'glass border-border/50'
      }`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              timeUntil.urgent ? 'bg-copper/20' : 'bg-muted/50'
            }`}>
              <Bell className={`w-5 h-5 ${timeUntil.urgent ? 'text-copper' : 'text-muted-foreground'}`} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Nächster Termin</p>
              <p className={`font-medium ${timeUntil.urgent ? 'text-copper' : 'text-foreground'}`}>
                {timeUntil.text}
              </p>
            </div>
          </div>
          {timeUntil.urgent && (
            <span className="px-3 py-1 rounded-full bg-copper/20 text-copper text-xs font-medium animate-pulse">
              Bald!
            </span>
          )}
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-display font-semibold text-foreground">
            {nextBooking.massage}
          </h3>
          
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              {format(parseISO(nextBooking.appointment_date), 'EEEE, d. MMMM yyyy', { locale: de })}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              {nextBooking.appointment_time} Uhr
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="w-4 h-4" />
              {nextBooking.masseur}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              {nextBooking.theme}
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <Button variant="copper" size="sm" asChild>
            <Link to="/vorbereitung">Vorbereitung lesen</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link to="/kontakt">Termin ändern</Link>
          </Button>
        </div>
      </div>

      {/* Preparation Checklist */}
      {timeUntil.urgent && (
        <div className="glass rounded-2xl p-6 border border-border/50">
          <h4 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            Vor Ihrem Termin
          </h4>
          <div className="space-y-3">
            {[
              "Trinken Sie ausreichend Wasser",
              "Vermeiden Sie schwere Mahlzeiten 2h vorher",
              "Planen Sie 15min früher da zu sein",
              "Bringen Sie bequeme Kleidung mit"
            ].map((tip, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
                <div className="w-6 h-6 rounded-full bg-copper/10 flex items-center justify-center text-xs font-bold text-copper">
                  {index + 1}
                </div>
                <span className="text-sm text-foreground">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Other Upcoming */}
      {upcomingBookings.length > 1 && (
        <div className="glass rounded-2xl p-6 border border-border/50">
          <h4 className="font-display font-semibold text-foreground mb-4">Weitere Termine</h4>
          <div className="space-y-3">
            {upcomingBookings.slice(1, 4).map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{booking.massage}</p>
                    <p className="text-xs text-muted-foreground">
                      {format(parseISO(booking.appointment_date), 'd. MMM', { locale: de })} • {booking.appointment_time}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};
