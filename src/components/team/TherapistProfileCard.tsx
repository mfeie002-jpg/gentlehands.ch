import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, Award, Heart, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TherapistProfileCardProps {
  name: string;
  role: string;
  image: string;
  rating: number;
  specialties: string[];
  experience: string;
  bio: string;
  availability?: string;
  featured?: boolean;
}

export const TherapistProfileCard = ({
  name,
  role,
  image,
  rating,
  specialties,
  experience,
  bio,
  availability,
  featured = false
}: TherapistProfileCardProps) => {
  return (
    <motion.div
      className={`relative rounded-3xl overflow-hidden ${
        featured 
          ? "bg-gradient-to-br from-copper/10 to-petrol/10 border-2 border-copper/30" 
          : "bg-card border border-border/50"
      }`}
      whileHover={{ y: -8 }}
    >
      {featured && (
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1 px-3 py-1 bg-copper text-background text-xs font-medium rounded-full">
          <Heart size={12} />
          Beliebt
        </div>
      )}

      <div className="aspect-[3/4] relative overflow-hidden">
        <motion.img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
        
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1 px-2 py-1 bg-background/20 backdrop-blur-sm rounded-full">
              <Star size={12} className="text-amber-500 fill-amber-500" />
              <span className="text-background text-xs font-medium">{rating}</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 bg-background/20 backdrop-blur-sm rounded-full">
              <Award size={12} className="text-copper" />
              <span className="text-background text-xs">{experience}</span>
            </div>
          </div>
          <h3 className="text-background font-display text-2xl">{name}</h3>
          <p className="text-background/80 text-sm">{role}</p>
        </div>
      </div>

      <div className="p-6">
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{bio}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {specialties.slice(0, 3).map((specialty) => (
            <span
              key={specialty}
              className="px-2 py-1 bg-secondary text-muted-foreground text-xs rounded-full"
            >
              {specialty}
            </span>
          ))}
        </div>

        {availability && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Calendar size={14} className="text-copper" />
            <span>{availability}</span>
          </div>
        )}

        <Button variant="copper" className="w-full" asChild>
          <Link to={`/buchung?masseur=${encodeURIComponent(name)}`} className="flex items-center justify-center gap-2">
            Bei {name.split(" ")[0]} buchen
            <ArrowRight size={16} />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
};
