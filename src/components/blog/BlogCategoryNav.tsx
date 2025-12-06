import { motion } from "framer-motion";

interface BlogCategoryNavProps {
  categories: { id: string; label: string }[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export const BlogCategoryNav = ({
  categories,
  activeCategory,
  onCategoryChange
}: BlogCategoryNavProps) => {
  return (
    <nav className="flex flex-wrap justify-center gap-2">
      {categories.map((category, index) => (
        <motion.button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
            activeCategory === category.id
              ? "bg-copper text-background shadow-lg shadow-copper/20"
              : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
          }`}
        >
          {category.label}
        </motion.button>
      ))}
    </nav>
  );
};
