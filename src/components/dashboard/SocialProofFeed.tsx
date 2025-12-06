import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MapPin, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns";
import { de } from "date-fns/locale";

interface Testimonial {
  id: string;
  name: string;
  content: string;
  rating: number | null;
  location: string | null;
  theme: string | null;
  submitted_at: string | null;
}

export const SocialProofFeed = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const { data } = await supabase
      .from('testimonial_submissions')
      .select('*')
      .eq('is_approved', true)
      .order('submitted_at', { ascending: false })
      .limit(10);

    if (data) setTestimonials(data);
    setIsLoading(false);
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (testimonials.length > 1) {
      const interval = setInterval(nextTestimonial, 8000);
      return () => clearInterval(interval);
    }
  }, [testimonials.length]);

  if (isLoading || testimonials.length === 0) {
    return null;
  }

  const current = testimonials[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6 border border-border/50 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-copper/5 rounded-full blur-2xl" />
      
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
          <Quote className="w-5 h-5 text-amber-500" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-foreground">Kundenstimmen</h3>
          <p className="text-sm text-muted-foreground">Was andere sagen</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="relative"
        >
          {/* Rating */}
          {current.rating && (
            <div className="flex gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < current.rating! 
                      ? 'text-amber-500 fill-amber-500' 
                      : 'text-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Content */}
          <blockquote className="text-foreground italic mb-4 leading-relaxed">
            "{current.content}"
          </blockquote>

          {/* Author */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">{current.name}</p>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                {current.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {current.location}
                  </span>
                )}
                {current.theme && (
                  <span className="text-copper">• {current.theme}</span>
                )}
              </div>
            </div>
            {current.submitted_at && (
              <span className="text-xs text-muted-foreground">
                {format(parseISO(current.submitted_at), 'MMM yyyy', { locale: de })}
              </span>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      {testimonials.length > 1 && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/50">
          <div className="flex gap-1">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === currentIndex ? 'bg-copper' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="w-8 h-8" onClick={prevTestimonial}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8" onClick={nextTestimonial}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
};
