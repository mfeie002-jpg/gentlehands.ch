import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface TestimonialQuoteCardProps {
  name: string;
  location?: string;
  text: string;
  rating: number;
  theme?: string;
  date?: string;
  image?: string;
  variant?: "default" | "large" | "minimal";
}

export const TestimonialQuoteCard = ({
  name,
  location,
  text,
  rating,
  theme,
  date,
  image,
  variant = "default"
}: TestimonialQuoteCardProps) => {
  if (variant === "large") {
    return (
      <motion.div
        className="relative p-10 rounded-3xl bg-gradient-to-br from-copper/10 to-petrol/10 border border-border/50"
        whileHover={{ y: -4 }}
      >
        <Quote size={48} className="text-copper/20 absolute top-6 left-6" />
        
        <div className="flex gap-1 mb-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={24}
              className={i < rating ? "text-amber-500 fill-amber-500" : "text-muted-foreground/30"}
            />
          ))}
        </div>
        
        <p className="text-foreground text-2xl font-light leading-relaxed mb-8">
          "{text}"
        </p>
        
        <div className="flex items-center gap-4">
          {image ? (
            <img src={image} alt={name} className="w-14 h-14 rounded-full object-cover" />
          ) : (
            <div className="w-14 h-14 rounded-full bg-copper/10 flex items-center justify-center">
              <span className="text-copper font-medium text-xl">{name.charAt(0)}</span>
            </div>
          )}
          <div>
            <p className="text-foreground font-medium text-lg">{name}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {location && <span>{location}</span>}
              {theme && (
                <>
                  <span>•</span>
                  <span className="text-copper">{theme}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === "minimal") {
    return (
      <motion.div
        className="p-5 rounded-xl bg-card border border-border/50"
        whileHover={{ y: -4, borderColor: "hsl(var(--copper) / 0.3)" }}
      >
        <div className="flex gap-0.5 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < rating ? "text-amber-500 fill-amber-500" : "text-muted-foreground/30"}
            />
          ))}
        </div>
        <p className="text-foreground text-sm mb-3 line-clamp-3">"{text}"</p>
        <p className="text-muted-foreground text-xs">{name}</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="p-6 rounded-2xl bg-card border border-border/50 h-full"
      whileHover={{ y: -8, borderColor: "hsl(var(--copper) / 0.3)" }}
    >
      <Quote size={24} className="text-copper/30 mb-4" />
      
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? "text-amber-500 fill-amber-500" : "text-muted-foreground/30"}
          />
        ))}
      </div>
      
      <p className="text-foreground mb-6">"{text}"</p>
      
      <div className="flex items-center gap-3 pt-4 border-t border-border/50">
        {image ? (
          <img src={image} alt={name} className="w-10 h-10 rounded-full object-cover" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-copper/10 flex items-center justify-center">
            <span className="text-copper font-medium">{name.charAt(0)}</span>
          </div>
        )}
        <div>
          <p className="text-foreground font-medium text-sm">{name}</p>
          {(location || theme) && (
            <p className="text-muted-foreground text-xs">
              {location}{location && theme && " • "}{theme && <span className="text-copper">{theme}</span>}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};
