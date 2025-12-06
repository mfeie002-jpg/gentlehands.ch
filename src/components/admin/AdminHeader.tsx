import { motion } from "framer-motion";
import { Bell, Search, Sun, Moon, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect, ReactNode } from "react";

interface AdminHeaderProps {
  title: string;
  onSearch?: (query: string) => void;
  onRefresh?: () => void;
  children?: ReactNode;
}

export const AdminHeader = ({ title, onSearch, onRefresh, children }: AdminHeaderProps) => {
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border px-6 py-4"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-playfair font-bold">{title}</h1>
          <p className="text-sm text-muted-foreground">
            {currentTime.toLocaleDateString('de-CH', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })} • {currentTime.toLocaleTimeString('de-CH')}
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Custom Children */}
          {children}

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Suchen..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10 w-64 bg-muted/50"
            />
          </div>

          {/* Refresh */}
          {onRefresh && (
            <Button variant="outline" size="icon" onClick={onRefresh}>
              <RefreshCw className="w-4 h-4" />
            </Button>
          )}

          {/* Theme Toggle */}
          <Button variant="outline" size="icon" onClick={() => setIsDark(!isDark)}>
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </motion.header>
  );
};
