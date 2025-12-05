import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Heart, Trash2, Calendar, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface Favorite {
  id: string;
  experience_id: string;
  massage_type: string | null;
  created_at: string;
}

const experiences = [
  { id: "ozean", name: "Ozean & Palmen", description: "Tropische Leichtigkeit mit Meeresrauschen", image: "/lovable-uploads/experience-ocean.jpg" },
  { id: "alpine", name: "Alpine Stille", description: "Bergige Geborgenheit und Ruhe", image: "/lovable-uploads/experience-alpine.jpg" },
  { id: "dark", name: "Deep Dark Relax", description: "Tiefe Entspannung im Dunkeln", image: "/lovable-uploads/experience-dark.jpg" },
  { id: "urban", name: "Urban Loft", description: "Moderne Selbstfürsorge", image: "/lovable-uploads/experience-urban.jpg" },
  { id: "zen", name: "Zen Garden", description: "Asiatische Harmonie", image: "/lovable-uploads/experience-zen.jpg" },
  { id: "surprise", name: "Surprise Experience", description: "Lassen Sie sich überraschen", image: "/lovable-uploads/experience-surprise.jpg" },
];

interface FavoritesTabProps {
  userId: string;
}

export const FavoritesTab = ({ userId }: FavoritesTabProps) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, [userId]);

  const fetchFavorites = async () => {
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching favorites:', error);
    } else {
      setFavorites(data || []);
    }
    setLoading(false);
  };

  const removeFavorite = async (id: string) => {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error("Fehler beim Entfernen");
    } else {
      setFavorites(favorites.filter(f => f.id !== id));
      toast.success("Aus Favoriten entfernt");
    }
  };

  const addFavorite = async (experienceId: string, massageType?: string) => {
    const { data, error } = await supabase
      .from('favorites')
      .insert({
        user_id: userId,
        experience_id: experienceId,
        massage_type: massageType || null
      })
      .select()
      .single();

    if (error) {
      toast.error("Fehler beim Hinzufügen");
    } else {
      setFavorites([data, ...favorites]);
      toast.success("Zu Favoriten hinzugefügt");
    }
  };

  const getExperienceDetails = (experienceId: string) => {
    return experiences.find(e => e.id === experienceId) || experiences[0];
  };

  if (loading) {
    return (
      <div className="glass rounded-2xl p-6 border border-border/50">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted rounded w-1/3"></div>
          <div className="h-32 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="glass rounded-2xl p-6 border border-border/50">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display font-semibold text-foreground">Meine Favoriten</h3>
          <span className="text-sm text-muted-foreground">{favorites.length} gespeichert</span>
        </div>

        {favorites.length > 0 ? (
          <div className="grid sm:grid-cols-2 gap-4">
            {favorites.map((favorite) => {
              const experience = getExperienceDetails(favorite.experience_id);
              return (
                <motion.div
                  key={favorite.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="group relative rounded-xl overflow-hidden border border-border/50 bg-muted/30"
                >
                  <div className="aspect-video bg-gradient-to-br from-copper/20 to-petrol/20 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-copper/50" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium text-foreground">{experience.name}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{experience.description}</p>
                    {favorite.massage_type && (
                      <p className="text-xs text-copper mb-3">Massage: {favorite.massage_type}</p>
                    )}
                    <div className="flex items-center gap-2">
                      <Button variant="copper" size="sm" asChild className="flex-1">
                        <Link to="/buchung">
                          <Calendar className="w-4 h-4 mr-1" />
                          Buchen
                        </Link>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeFavorite(favorite.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-rose-500" />
            </div>
            <h4 className="font-medium text-foreground mb-2">Noch keine Favoriten</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Entdecken Sie unsere Erlebnisse und speichern Sie Ihre Favoriten.
            </p>
            <Button variant="copper" asChild>
              <Link to="/erlebnisse">Erlebnisse entdecken</Link>
            </Button>
          </div>
        )}
      </div>

      {/* Quick Add Section */}
      <div className="glass rounded-2xl p-6 border border-border/50">
        <h4 className="font-display font-semibold text-foreground mb-4">Schnell hinzufügen</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {experiences.map((exp) => {
            const isFavorite = favorites.some(f => f.experience_id === exp.id);
            return (
              <button
                key={exp.id}
                onClick={() => !isFavorite && addFavorite(exp.id)}
                disabled={isFavorite}
                className={`p-3 rounded-xl text-left transition-all ${
                  isFavorite 
                    ? 'bg-copper/10 border border-copper/30 cursor-default' 
                    : 'bg-muted/30 hover:bg-muted/50 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Heart className={`w-4 h-4 ${isFavorite ? 'text-copper fill-copper' : 'text-muted-foreground'}`} />
                  <span className={`text-sm font-medium ${isFavorite ? 'text-copper' : 'text-foreground'}`}>
                    {exp.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
