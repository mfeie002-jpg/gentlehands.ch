import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { RefreshCw, Calendar, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns";
import { de } from "date-fns/locale";

interface Booking {
  id: string;
  massage: string;
  theme: string;
  masseur: string;
  appointment_date: string;
}

interface QuickRebookProps {
  pastBookings: Booking[];
}

export const QuickRebook = ({ pastBookings }: QuickRebookProps) => {
  if (pastBookings.length === 0) return null;

  // Get unique combinations
  const uniqueExperiences = pastBookings.reduce((acc, booking) => {
    const key = `${booking.massage}-${booking.theme}-${booking.masseur}`;
    if (!acc.find(b => `${b.massage}-${b.theme}-${b.masseur}` === key)) {
      acc.push(booking);
    }
    return acc;
  }, [] as Booking[]);

  // Count favorites
  const experienceCounts = pastBookings.reduce((acc, booking) => {
    const key = booking.massage;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const favoriteExperience = Object.entries(experienceCounts)
    .sort(([,a], [,b]) => b - a)[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6 border border-border/50"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display font-semibold text-foreground">Schnell nachbuchen</h3>
          <p className="text-sm text-muted-foreground">Ihre bisherigen Erlebnisse</p>
        </div>
        <RefreshCw className="w-5 h-5 text-copper" />
      </div>

      {/* Favorite Experience Highlight */}
      {favoriteExperience && (
        <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-copper/10 to-amber-500/5 border border-copper/20">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 text-copper fill-copper" />
            <span className="text-sm font-medium text-copper">Ihr Favorit</span>
          </div>
          <p className="text-lg font-display font-semibold text-foreground">{favoriteExperience[0]}</p>
          <p className="text-sm text-muted-foreground">{favoriteExperience[1]}x gebucht</p>
          <Button variant="copper" size="sm" className="mt-3" asChild>
            <Link to={`/buchung?massage=${encodeURIComponent(favoriteExperience[0])}`}>
              Erneut buchen
            </Link>
          </Button>
        </div>
      )}

      {/* Recent Experiences */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Letzte Erlebnisse</p>
        {uniqueExperiences.slice(0, 4).map((booking, index) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-copper/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-copper" />
              </div>
              <div>
                <p className="font-medium text-foreground">{booking.massage}</p>
                <p className="text-xs text-muted-foreground">
                  {booking.theme} • {booking.masseur} • {format(parseISO(booking.appointment_date), 'd. MMM yyyy', { locale: de })}
                </p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              asChild
            >
              <Link to={`/buchung?massage=${encodeURIComponent(booking.massage)}&theme=${encodeURIComponent(booking.theme)}&masseur=${encodeURIComponent(booking.masseur)}`}>
                <RefreshCw className="w-4 h-4 mr-1" />
                Buchen
              </Link>
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <div className="mt-6 pt-6 border-t border-border/50 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold text-foreground">{pastBookings.length}</p>
          <p className="text-xs text-muted-foreground">Erlebnisse</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground">{uniqueExperiences.length}</p>
          <p className="text-xs text-muted-foreground">Verschiedene</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground">
            {new Set(pastBookings.map(b => b.masseur)).size}
          </p>
          <p className="text-xs text-muted-foreground">Therapeuten</p>
        </div>
      </div>
    </motion.div>
  );
};
