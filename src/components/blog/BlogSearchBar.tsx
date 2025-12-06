import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface BlogSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const BlogSearchBar = ({
  value,
  onChange,
  placeholder = "Artikel suchen..."
}: BlogSearchBarProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative max-w-md w-full group"
    >
      <Search 
        className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-copper transition-colors" 
        size={20} 
      />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-12 pr-10 h-14 rounded-full bg-background border-border/50 text-base focus:border-copper"
      />
      {value && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => onChange("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-secondary transition-colors"
        >
          <X size={16} className="text-muted-foreground" />
        </motion.button>
      )}
    </motion.div>
  );
};
