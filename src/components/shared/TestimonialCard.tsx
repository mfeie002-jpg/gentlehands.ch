import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  author: string;
  location?: string;
  rating?: number;
  highlight?: boolean;
}

export const TestimonialCard = ({
  quote,
  author,
  location,
  rating = 5,
  highlight = false,
}: TestimonialCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className={`p-6 rounded-2xl border relative overflow-hidden ${
        highlight
          ? "bg-gradient-to-br from-copper/10 to-primary/5 border-copper/30"
          : "bg-card border-border/50"
      }`}
    >
      {/* Quote Icon */}
      <Quote
        size={48}
        className={`absolute top-4 right-4 ${
          highlight ? "text-copper/20" : "text-muted-foreground/10"
        }`}
      />

      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Star size={16} className="text-copper fill-copper" />
          </motion.div>
        ))}
      </div>

      {/* Quote */}
      <p className="text-foreground italic mb-6 relative z-10">"{quote}"</p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-copper/10 flex items-center justify-center">
          <span className="text-copper font-medium">{author.charAt(0)}</span>
        </div>
        <div>
          <p className="font-medium text-foreground">{author}</p>
          {location && <p className="text-xs text-muted-foreground">{location}</p>}
        </div>
      </div>
    </motion.div>
  );
};
