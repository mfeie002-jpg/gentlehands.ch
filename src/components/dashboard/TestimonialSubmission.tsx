import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Send, Loader2, CheckCircle2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface TestimonialSubmissionProps {
  userName: string;
  userId: string;
  recentBookings: { theme: string; massage: string }[];
}

const themes = [
  "Ozean & Palmen",
  "Alpine Stille",
  "Deep Dark Relax",
  "Urban Loft",
  "Zen Garden",
  "Surprise Experience",
];

export const TestimonialSubmission = ({ userName, userId, recentBookings }: TestimonialSubmissionProps) => {
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [content, setContent] = useState("");
  const [theme, setTheme] = useState(recentBookings[0]?.theme || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast({ title: "Bitte schreiben Sie Ihre Erfahrung", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    
    const { error } = await supabase.from('testimonial_submissions').insert({
      name: userName.split(' ')[0] || 'Anonym',
      content: content.trim(),
      rating,
      theme,
      user_id: userId,
      location: 'Zürich',
      is_approved: false,
    });

    if (error) {
      toast({ title: "Fehler", description: error.message, variant: "destructive" });
    } else {
      setIsSubmitted(true);
      toast({ title: "Vielen Dank!", description: "Ihre Bewertung wird nach Prüfung veröffentlicht." });
    }
    
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-2xl p-8 border border-border/50 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4"
        >
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
        </motion.div>
        <h3 className="text-xl font-display font-semibold text-foreground mb-2">
          Vielen Dank für Ihre Bewertung!
        </h3>
        <p className="text-muted-foreground">
          Ihre Erfahrung hilft anderen, GentleHands zu entdecken.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6 border border-border/50"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-amber-500" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-foreground">Teilen Sie Ihre Erfahrung</h3>
          <p className="text-sm text-muted-foreground">Ihre Meinung ist uns wichtig</p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Rating */}
        <div>
          <Label className="mb-3 block">Ihre Bewertung</Label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setRating(star)}
                className="p-1 transition-transform hover:scale-110"
              >
                <Star
                  className={`w-8 h-8 transition-colors ${
                    star <= (hoveredRating || rating)
                      ? 'text-amber-500 fill-amber-500'
                      : 'text-muted-foreground/30'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Theme Selection */}
        <div>
          <Label className="mb-3 block">Erlebnis (optional)</Label>
          <Select value={theme} onValueChange={setTheme}>
            <SelectTrigger>
              <SelectValue placeholder="Welches Erlebnis haben Sie genossen?" />
            </SelectTrigger>
            <SelectContent>
              {themes.map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Content */}
        <div>
          <Label className="mb-3 block">Ihre Erfahrung</Label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Erzählen Sie uns von Ihrem Besuch bei GentleHands..."
            rows={4}
            className="resize-none"
          />
          <p className="text-xs text-muted-foreground mt-2">
            {content.length}/500 Zeichen
          </p>
        </div>

        <Button 
          variant="copper" 
          className="w-full" 
          onClick={handleSubmit}
          disabled={isSubmitting || !content.trim()}
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Send className="w-4 h-4 mr-2" />
          )}
          Bewertung einreichen
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          Ihre Bewertung wird vor der Veröffentlichung geprüft.
        </p>
      </div>
    </motion.div>
  );
};
