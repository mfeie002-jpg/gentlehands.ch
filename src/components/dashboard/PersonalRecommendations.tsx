import { motion } from "framer-motion";
import { Sparkles, Clock, Star, ChevronRight, Palette } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface PersonalRecommendationsProps {
  bookings: any[];
  preferences: {
    preferred_theme?: string | null;
    preferred_therapist?: string | null;
  };
}

interface Recommendation {
  id: string;
  title: string;
  description: string;
  type: 'experience' | 'upgrade' | 'new' | 'seasonal';
  link: string;
  image?: string;
  badge?: string;
}

export const PersonalRecommendations = ({ bookings, preferences }: PersonalRecommendationsProps) => {
  // Analyze booking patterns
  const massageCounts = bookings.reduce((acc, b) => {
    acc[b.massage] = (acc[b.massage] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const themeCounts = bookings.reduce((acc, b) => {
    acc[b.theme] = (acc[b.theme] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const hasTriedDeepDark = bookings.some(b => b.theme === 'Deep Dark Relax');
  const hasTriedHotStone = bookings.some(b => b.massage?.includes('Hot Stone'));
  const hasTriedAroma = bookings.some(b => b.massage?.includes('Aromatherapie'));
  const bookingCount = bookings.length;

  // Generate personalized recommendations
  const recommendations: Recommendation[] = [];

  // If they love a theme, suggest the upgrade
  if (preferences.preferred_theme === 'Ozean & Palmen') {
    recommendations.push({
      id: 'ocean-upgrade',
      title: 'Sound Therapy Ocean',
      description: 'Erweitern Sie Ihr Lieblingserlebnis mit heilenden Klangschalen.',
      type: 'upgrade',
      link: '/soundtherapie',
      badge: 'Empfohlen für Sie',
    });
  }

  // If they haven't tried Deep Dark Relax
  if (!hasTriedDeepDark) {
    recommendations.push({
      id: 'deep-dark',
      title: 'Deep Dark Relax',
      description: 'Entdecken Sie unser intensivstes Erlebnis für tiefste Entspannung.',
      type: 'new',
      link: '/erlebnisse',
      badge: 'Neu entdecken',
    });
  }

  // Seasonal recommendation
  recommendations.push({
    id: 'winter-special',
    title: 'Winter Wellness',
    description: 'Wärmendes Alpine Stille Erlebnis mit Hot Stone Elementen.',
    type: 'seasonal',
    link: '/saisonal',
    badge: 'Saisonal',
  });

  // If they've booked more than 5 times, suggest membership
  if (bookingCount >= 5) {
    recommendations.push({
      id: 'membership',
      title: 'Membership Vorteile',
      description: 'Als treue Kundin: 15% auf alle Erlebnisse und Priority Booking.',
      type: 'upgrade',
      link: '/membership',
      badge: 'Exklusiv',
    });
  }

  // If they haven't tried aromatherapy
  if (!hasTriedAroma) {
    recommendations.push({
      id: 'aromatherapy',
      title: 'Aromatherapie Add-on',
      description: 'Individuelle Duftkomposition für Ihr nächstes Erlebnis.',
      type: 'new',
      link: '/aromatherapie',
      badge: 'Add-on',
    });
  }

  const getTypeIcon = (type: Recommendation['type']) => {
    switch (type) {
      case 'upgrade': return Star;
      case 'new': return Sparkles;
      case 'seasonal': return Palette;
      default: return Clock;
    }
  };

  const getTypeColor = (type: Recommendation['type']) => {
    switch (type) {
      case 'upgrade': return 'text-amber-500 bg-amber-500/10';
      case 'new': return 'text-violet-500 bg-violet-500/10';
      case 'seasonal': return 'text-emerald-500 bg-emerald-500/10';
      default: return 'text-copper bg-copper/10';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6 border border-border/50"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-copper/10 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-copper" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-foreground">Für Sie empfohlen</h3>
          <p className="text-sm text-muted-foreground">Basierend auf Ihren Präferenzen</p>
        </div>
      </div>

      <div className="space-y-3">
        {recommendations.slice(0, 4).map((rec, index) => {
          const Icon = getTypeIcon(rec.type);
          return (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={rec.link}
                className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${getTypeColor(rec.type)}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-medium text-foreground">{rec.title}</p>
                    {rec.badge && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-copper/10 text-copper">
                        {rec.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1">{rec.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-border/50">
        <Button variant="outline" className="w-full" asChild>
          <Link to="/quiz">
            <Sparkles className="w-4 h-4 mr-2" />
            Personalisierungsquiz starten
          </Link>
        </Button>
      </div>
    </motion.div>
  );
};
