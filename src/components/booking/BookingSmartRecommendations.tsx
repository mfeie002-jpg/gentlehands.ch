import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, User, Palette, Heart, ChevronRight, Star, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

interface Recommendation {
  recommendation_type: string;
  item_id: string;
  item_name: string;
  reason: string;
  score: number;
}

interface BookingSmartRecommendationsProps {
  userId?: string | null;
  onSelectTherapist: (id: string) => void;
  onSelectTheme: (id: string) => void;
  onSelectMassage: (id: string) => void;
  currentTherapist?: string;
  currentTheme?: string;
  currentMassage?: string;
}

export const BookingSmartRecommendations = ({
  userId,
  onSelectTherapist,
  onSelectTheme,
  onSelectMassage,
  currentTherapist,
  currentTheme,
  currentMassage,
}: BookingSmartRecommendationsProps) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    fetchRecommendations();
  }, [userId]);

  const fetchRecommendations = async () => {
    try {
      const { data, error } = await supabase
        .rpc('get_booking_recommendations', { p_user_id: userId || null });

      if (error) {
        console.error("Error fetching recommendations:", error);
        return;
      }

      // Sort by score and remove duplicates
      const uniqueRecs = (data || [])
        .sort((a: Recommendation, b: Recommendation) => b.score - a.score)
        .filter((rec: Recommendation, index: number, self: Recommendation[]) => 
          index === self.findIndex(r => r.item_id === rec.item_id)
        );

      setRecommendations(uniqueRecs);
    } catch (err) {
      console.error("Recommendations error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'therapist': return User;
      case 'theme': return Palette;
      case 'massage': return Heart;
      default: return Sparkles;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'therapist': return 'Therapeut:in';
      case 'theme': return 'Themenraum';
      case 'massage': return 'Massage';
      default: return 'Empfehlung';
    }
  };

  const handleSelect = (rec: Recommendation) => {
    switch (rec.recommendation_type) {
      case 'therapist':
        onSelectTherapist(rec.item_id);
        break;
      case 'theme':
        onSelectTheme(rec.item_id);
        break;
      case 'massage':
        onSelectMassage(rec.item_id);
        break;
    }
  };

  const isSelected = (rec: Recommendation) => {
    switch (rec.recommendation_type) {
      case 'therapist': return currentTherapist === rec.item_id;
      case 'theme': return currentTheme === rec.item_id;
      case 'massage': return currentMassage === rec.item_id;
      default: return false;
    }
  };

  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-copper/5 to-petrol/5 rounded-2xl p-4 animate-pulse">
        <div className="h-6 bg-muted rounded w-40 mb-3" />
        <div className="flex gap-3 overflow-hidden">
          {[1, 2, 3].map(i => (
            <div key={i} className="min-w-[160px] h-24 bg-muted rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <div className="bg-gradient-to-r from-copper/5 via-petrol/5 to-copper/5 rounded-2xl overflow-hidden border border-copper/10">
        {/* Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-4 hover:bg-white/50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-copper to-petrol flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <div className="text-left">
              <h3 className="font-display text-sm font-medium text-foreground">
                Personalisierte Empfehlungen
              </h3>
              <p className="text-xs text-muted-foreground">
                Basierend auf Ihren Präferenzen
              </p>
            </div>
          </div>
          <ChevronRight 
            size={18} 
            className={cn(
              "text-muted-foreground transition-transform",
              isExpanded && "rotate-90"
            )} 
          />
        </button>

        {/* Recommendations */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-4 pb-4">
                <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
                  {recommendations.slice(0, 6).map((rec, index) => {
                    const Icon = getIcon(rec.recommendation_type);
                    const selected = isSelected(rec);
                    
                    return (
                      <motion.button
                        key={`${rec.recommendation_type}-${rec.item_id}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleSelect(rec)}
                        className={cn(
                          "relative min-w-[160px] p-3 rounded-xl border-2 text-left transition-all flex-shrink-0",
                          selected
                            ? "border-copper bg-copper/10 shadow-md"
                            : "border-border/50 bg-background/80 hover:border-copper/50 hover:shadow-sm"
                        )}
                      >
                        {/* Score badge */}
                        {rec.score >= 95 && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                            <Star size={10} className="text-white fill-white" />
                          </div>
                        )}
                        
                        <div className="flex items-start gap-2 mb-2">
                          <div className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center",
                            selected ? "bg-copper/20 text-copper" : "bg-muted text-muted-foreground"
                          )}>
                            <Icon size={16} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                              {getTypeLabel(rec.recommendation_type)}
                            </span>
                            <p className="font-medium text-sm text-foreground truncate">
                              {rec.item_name}
                            </p>
                          </div>
                        </div>
                        
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {rec.reason}
                        </p>
                        
                        {selected && (
                          <div className="absolute bottom-2 right-2">
                            <div className="w-4 h-4 bg-copper rounded-full flex items-center justify-center">
                              <TrendingUp size={10} className="text-white" />
                            </div>
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
