import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeatureGridProps {
  features: Feature[];
  columns?: 2 | 3 | 4;
}

export const FeatureGrid = ({ features, columns = 3 }: FeatureGridProps) => {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={`grid grid-cols-1 ${gridCols[columns]} gap-6 md:gap-8`}>
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group"
        >
          <div className="h-full p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-copper/30 hover:shadow-lg transition-all duration-300">
            <div className="w-14 h-14 rounded-xl bg-copper/10 flex items-center justify-center mb-5 group-hover:bg-copper/20 transition-colors">
              <feature.icon size={28} className="text-copper" />
            </div>
            <h3 className="font-display text-lg md:text-xl text-foreground mb-3">
              {feature.title}
            </h3>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              {feature.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
