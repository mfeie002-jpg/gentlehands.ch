import { motion } from "framer-motion";
import { Star, Users, ThumbsUp, Award } from "lucide-react";

interface TestimonialStatsBarProps {
  averageRating: number;
  totalReviews: number;
  recommendRate: number;
  yearsExperience: number;
}

export const TestimonialStatsBar = ({
  averageRating,
  totalReviews,
  recommendRate,
  yearsExperience
}: TestimonialStatsBarProps) => {
  const stats = [
    { icon: Star, value: averageRating.toFixed(1), label: "Durchschnitt", color: "amber-500" },
    { icon: Users, value: `${totalReviews}+`, label: "Bewertungen", color: "copper" },
    { icon: ThumbsUp, value: `${recommendRate}%`, label: "Empfehlen uns", color: "emerald-500" },
    { icon: Award, value: `${yearsExperience}+`, label: "Jahre Erfahrung", color: "petrol" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-secondary/50 border border-border/50"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="text-center"
        >
          <div className={`w-12 h-12 mx-auto rounded-xl bg-${stat.color}/10 flex items-center justify-center mb-2`}>
            <stat.icon className={`w-6 h-6 text-${stat.color}`} />
          </div>
          <p className="text-2xl font-bold text-foreground">{stat.value}</p>
          <p className="text-xs text-muted-foreground">{stat.label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};
