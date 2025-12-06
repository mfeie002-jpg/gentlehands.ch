import { motion } from "framer-motion";
import { Grid, LayoutGrid, Rows } from "lucide-react";

interface GalleryFilterBarProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  viewMode: "grid" | "masonry";
  onViewModeChange: (mode: "grid" | "masonry") => void;
  imageCounts: Record<string, number>;
}

export const GalleryFilterBar = ({
  categories,
  activeCategory,
  onCategoryChange,
  viewMode,
  onViewModeChange,
  imageCounts
}: GalleryFilterBarProps) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4">
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category, index) => (
          <motion.button
            key={category}
            onClick={() => onCategoryChange(category)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all relative ${
              activeCategory === category
                ? "bg-copper text-background shadow-lg shadow-copper/20"
                : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
            }`}
          >
            {category}
            {activeCategory !== category && imageCounts[category] !== undefined && (
              <span className="ml-1 text-xs opacity-60">
                ({imageCounts[category]})
              </span>
            )}
          </motion.button>
        ))}
      </div>
      
      <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
        <motion.button
          onClick={() => onViewModeChange("grid")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`p-2 rounded transition-all ${viewMode === "grid" ? "bg-background shadow-sm" : ""}`}
        >
          <LayoutGrid size={18} className={viewMode === "grid" ? "text-copper" : "text-muted-foreground"} />
        </motion.button>
        <motion.button
          onClick={() => onViewModeChange("masonry")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`p-2 rounded transition-all ${viewMode === "masonry" ? "bg-background shadow-sm" : ""}`}
        >
          <Rows size={18} className={viewMode === "masonry" ? "text-copper" : "text-muted-foreground"} />
        </motion.button>
      </div>
    </div>
  );
};
