import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Music, Wind, Volume2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ExperienceThemeCardProps {
  name: string;
  tagline: string;
  description: string;
  image: string;
  icon: LucideIcon;
  sounds: string;
  scent: string;
  mood: string;
  featured?: boolean;
}

export const ExperienceThemeCard = ({
  name,
  tagline,
  description,
  image,
  icon: Icon,
  sounds,
  scent,
  mood,
  featured = false
}: ExperienceThemeCardProps) => {
  return (
    <motion.div
      className={`relative rounded-3xl overflow-hidden group ${
        featured ? "md:col-span-2" : ""
      }`}
      whileHover={{ y: -8 }}
    >
      <div className={`${featured ? "aspect-[21/9]" : "aspect-[4/5]"} relative overflow-hidden`}>
        <motion.img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.7 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
        
        {/* Icon */}
        <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center">
          <Icon className="w-6 h-6 text-background" />
        </div>
        
        {/* Mood badge */}
        <div className="absolute top-4 right-4 px-3 py-1 bg-copper/80 backdrop-blur-sm text-background text-xs font-medium rounded-full">
          {mood}
        </div>
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className="text-copper text-sm font-medium mb-1 block">{tagline}</span>
          <h3 className="text-background font-display text-2xl mb-2">{name}</h3>
          <p className="text-background/80 text-sm mb-4 line-clamp-2">{description}</p>
          
          {/* Details */}
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center gap-2 text-background/70 text-xs">
              <Volume2 size={12} />
              <span>{sounds}</span>
            </div>
            <div className="flex items-center gap-2 text-background/70 text-xs">
              <Wind size={12} />
              <span>{scent}</span>
            </div>
          </div>
          
          <Link
            to={`/buchung?theme=${encodeURIComponent(name)}`}
            className="inline-flex items-center gap-2 text-copper font-medium hover:gap-3 transition-all"
          >
            Erleben <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
