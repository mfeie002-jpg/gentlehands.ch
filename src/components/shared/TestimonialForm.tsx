import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Send, Check, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const themes = [
  "Ozean & Palmen",
  "Alpine Stille",
  "Deep Dark Relax",
  "Urban Loft",
  "Zen Garden",
  "Surprise Experience",
];

export const TestimonialForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    theme: "",
    rating: 5,
    content: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('testimonial_submissions')
        .insert({
          name: formData.name,
          location: formData.location,
          theme: formData.theme,
          rating: formData.rating,
          content: formData.content,
        });

      if (error) throw error;

      setSubmitted(true);
      toast({
        title: "Vielen Dank!",
        description: "Ihre Bewertung wurde erfolgreich eingereicht.",
      });
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Ihre Bewertung konnte nicht gesendet werden.",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/10 flex items-center justify-center"
        >
          <Check className="w-10 h-10 text-emerald-500" />
        </motion.div>
        <h3 className="text-2xl font-display font-semibold text-foreground mb-2">
          Vielen Dank für Ihre Bewertung!
        </h3>
        <p className="text-muted-foreground">
          Ihre Erfahrung hilft anderen Frauen, GentleHands zu entdecken.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-copper/10 flex items-center justify-center">
          <Heart className="w-6 h-6 text-copper" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-foreground">Teilen Sie Ihre Erfahrung</h3>
          <p className="text-sm text-muted-foreground">Ihre Bewertung hilft anderen Frauen</p>
        </div>
      </div>

      {/* Rating */}
      <div>
        <label className="block text-sm font-medium mb-3">Ihre Bewertung</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.button
              key={star}
              type="button"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
              onClick={() => setFormData({ ...formData, rating: star })}
              className="focus:outline-none"
            >
              <Star
                className={`w-8 h-8 transition-colors ${
                  star <= (hoveredStar || formData.rating)
                    ? "text-copper fill-copper"
                    : "text-muted-foreground"
                }`}
              />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Name & Location */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Name / Initialen</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-copper focus:ring-2 focus:ring-copper/20 outline-none"
            placeholder="Sandra M."
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Ort</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-copper focus:ring-2 focus:ring-copper/20 outline-none"
            placeholder="Zürich"
          />
        </div>
      </div>

      {/* Theme */}
      <div>
        <label className="block text-sm font-medium mb-2">Welches Erlebnis haben Sie gewählt?</label>
        <div className="flex flex-wrap gap-2">
          {themes.map((theme) => (
            <button
              key={theme}
              type="button"
              onClick={() => setFormData({ ...formData, theme })}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                formData.theme === theme
                  ? "bg-copper text-background"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              {theme}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium mb-2">Ihre Erfahrung</label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-copper focus:ring-2 focus:ring-copper/20 outline-none resize-none"
          rows={4}
          placeholder="Erzählen Sie uns von Ihrem Erlebnis..."
          required
        />
      </div>

      <Button type="submit" variant="copper" className="w-full" disabled={loading}>
        {loading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-5 h-5 border-2 border-background border-t-transparent rounded-full"
          />
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Bewertung absenden
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Ihre Bewertung wird nach einer kurzen Prüfung veröffentlicht.
      </p>
    </form>
  );
};
