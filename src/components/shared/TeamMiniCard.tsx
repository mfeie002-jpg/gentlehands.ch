import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Languages, Star } from "lucide-react";

interface TeamMiniCardProps {
  id: string;
  name: string;
  role: string;
  specialty: string;
  languages: string[];
  rating: number;
  delay?: number;
}

export const TeamMiniCard = ({
  id,
  name,
  role,
  specialty,
  languages,
  rating,
  delay = 0,
}: TeamMiniCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
    >
      <Link
        to={`/team#${id}`}
        className="block group"
      >
        <div className="p-6 rounded-2xl bg-card border border-border hover:border-copper/30 hover:shadow-lg transition-all duration-300">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-sand to-sand-dark shrink-0 flex items-center justify-center">
              <span className="text-warm-gray text-xs text-center">Foto</span>
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-display text-lg text-foreground group-hover:text-copper transition-colors">
                {name}
              </h3>
              <p className="text-sm text-copper mb-2">{role}</p>
              <p className="text-sm text-muted-foreground mb-3">{specialty}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Languages size={14} />
                  <span>{languages.slice(0, 2).join(", ")}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={14} className="fill-copper text-copper" />
                  <span className="text-sm font-medium text-foreground">{rating}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
