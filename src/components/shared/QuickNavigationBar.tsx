import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface QuickNavigationItem {
  id: string;
  label: string;
  icon?: LucideIcon;
}

interface QuickNavigationBarProps {
  items: QuickNavigationItem[];
  activeId: string;
  onSelect: (id: string) => void;
}

export const QuickNavigationBar = ({ items, activeId, onSelect }: QuickNavigationBarProps) => {
  return (
    <div className="py-6 border-b border-border/50 sticky top-16 z-30 bg-background/80 backdrop-blur-md">
      <div className="container-wide">
        <div className="flex flex-wrap justify-center gap-2">
          {items.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onSelect(item.id)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                activeId === item.id
                  ? "bg-copper text-accent-foreground shadow-lg shadow-copper/20"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {item.icon && <item.icon size={16} />}
              {item.label}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};
