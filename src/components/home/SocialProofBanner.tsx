import { motion } from "framer-motion";
import { Star, Users, Award, Heart } from "lucide-react";

const stats = [
  { icon: Star, value: "4.9", label: "Bewertung", suffix: "/5" },
  { icon: Users, value: "2000", label: "Zufriedene Kundinnen", suffix: "+" },
  { icon: Award, value: "8", label: "Jahre Erfahrung", suffix: "" },
  { icon: Heart, value: "98", label: "Weiterempfehlung", suffix: "%" },
];

export const SocialProofBanner = () => {
  return (
    <section className="py-8 bg-petrol/5 border-y border-petrol/10">
      <div className="container-wide">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 text-center"
            >
              <div className="w-10 h-10 rounded-lg bg-petrol/10 flex items-center justify-center">
                <stat.icon size={18} className="text-petrol" />
              </div>
              <div className="text-left">
                <div className="flex items-baseline">
                  <span className="text-2xl font-display text-foreground font-medium">{stat.value}</span>
                  <span className="text-lg text-copper">{stat.suffix}</span>
                </div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
