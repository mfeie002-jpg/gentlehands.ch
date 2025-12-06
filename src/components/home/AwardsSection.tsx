import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Award, Star, Trophy, Medal } from "lucide-react";

const awards = [
  {
    icon: Trophy,
    title: "Best Wellness Experience",
    year: "2024",
    source: "Zürich Lifestyle Awards",
  },
  {
    icon: Star,
    title: "Top Rated Spa",
    year: "2023",
    source: "Swiss Wellness Guide",
  },
  {
    icon: Medal,
    title: "Excellence in Service",
    year: "2024",
    source: "Premium Spa Association",
  },
  {
    icon: Award,
    title: "Customer Choice Award",
    year: "2024",
    source: "Women's Wellness Forum",
  },
];

export const AwardsSection = () => {
  return (
    <section className="py-12 bg-secondary/30 border-y border-border">
      <div className="container-wide">
        <ScrollReveal className="text-center mb-8">
          <span className="text-copper text-xs font-medium uppercase tracking-wider">Ausgezeichnet</span>
        </ScrollReveal>
        
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {awards.map((award, index) => (
            <ScrollReveal key={award.title} delay={index * 0.1}>
              <motion.div
                className="flex items-center gap-3 text-center group"
                whileHover={{ y: -2 }}
              >
                <div className="w-10 h-10 rounded-lg bg-copper/10 flex items-center justify-center group-hover:bg-copper/20 transition-colors">
                  <award.icon size={18} className="text-copper" />
                </div>
                <div className="text-left">
                  <p className="text-foreground text-sm font-medium">{award.title}</p>
                  <p className="text-muted-foreground text-xs">{award.source} • {award.year}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
