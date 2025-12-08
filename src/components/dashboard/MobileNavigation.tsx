import { motion } from "framer-motion";
import { Calendar, Heart, BookOpen, Settings, TrendingUp, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "overview", icon: TrendingUp, label: "Übersicht" },
  { id: "bookings", icon: Calendar, label: "Termine" },
  { id: "rewards", icon: Award, label: "Punkte" },
  { id: "favorites", icon: Heart, label: "Favoriten" },
  { id: "journal", icon: BookOpen, label: "Journal" },
  { id: "settings", icon: Settings, label: "Settings" },
];

export const MobileNavigation = ({ activeTab, onTabChange }: MobileNavigationProps) => {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background/95 backdrop-blur-xl border-t border-border safe-area-bottom"
    >
      <div className="flex items-center justify-around py-2 px-1 max-w-lg mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex flex-col items-center gap-1 px-2 py-2 rounded-xl transition-all min-w-[52px] touch-manipulation active:scale-95",
              activeTab === tab.id
                ? "text-copper"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <motion.div
              animate={{ scale: activeTab === tab.id ? 1.1 : 1 }}
              className={cn(
                "p-1.5 rounded-lg transition-colors",
                activeTab === tab.id && "bg-copper/10"
              )}
            >
              <tab.icon className="w-5 h-5" />
            </motion.div>
            <span className="text-[10px] font-medium leading-tight truncate max-w-[52px]">{tab.label}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
};
