import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, MapPin, ArrowRight } from "lucide-react";

interface UpcomingBookingProps {
  booking?: {
    date: string;
    time: string;
    massage: string;
    therapist: string;
    theme: string;
  };
}

export const UpcomingBooking = ({ booking }: UpcomingBookingProps) => {
  if (!booking) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-copper/10 to-copper/5 border border-copper/20 rounded-xl p-6 text-center"
      >
        <Calendar size={32} className="text-copper mx-auto mb-4" />
        <h3 className="font-serif text-lg text-foreground mb-2">
          Keine anstehenden Termine
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Buchen Sie Ihre nächste Auszeit und gönnen Sie sich Entspannung.
        </p>
        <Button variant="copper" asChild>
          <Link to="/buchung" className="inline-flex items-center gap-2">
            Jetzt buchen
            <ArrowRight size={16} />
          </Link>
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-copper/10 to-copper/5 border border-copper/20 rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-lg text-foreground">Nächster Termin</h3>
        <span className="text-xs bg-copper/20 text-copper px-2 py-1 rounded-full">
          Bestätigt
        </span>
      </div>
      
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3">
          <Calendar size={16} className="text-copper" />
          <span className="text-foreground">{booking.date}</span>
        </div>
        <div className="flex items-center gap-3">
          <Clock size={16} className="text-copper" />
          <span className="text-foreground">{booking.time} Uhr</span>
        </div>
        <div className="flex items-center gap-3">
          <User size={16} className="text-copper" />
          <span className="text-foreground">{booking.therapist}</span>
        </div>
        <div className="flex items-center gap-3">
          <MapPin size={16} className="text-copper" />
          <span className="text-foreground">{booking.theme}</span>
        </div>
      </div>
      
      <div className="bg-card/50 rounded-lg p-3 mb-4">
        <p className="text-sm text-foreground font-medium">{booking.massage}</p>
      </div>
      
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1">
          Verschieben
        </Button>
        <Button variant="copper" size="sm" className="flex-1">
          Details
        </Button>
      </div>
    </motion.div>
  );
};
