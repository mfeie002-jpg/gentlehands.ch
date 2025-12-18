import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Users, Eye } from "lucide-react";

export const BookingLiveVisitors = () => {
  const [visitors, setVisitors] = useState(0);
  const [recentViews, setRecentViews] = useState(0);

  useEffect(() => {
    // Initialize with realistic numbers
    setVisitors(Math.floor(Math.random() * 4) + 3); // 3-6 visitors
    setRecentViews(Math.floor(Math.random() * 15) + 20); // 20-35 recent views

    // Simulate visitor fluctuation
    const visitorInterval = setInterval(() => {
      setVisitors((prev) => {
        const change = Math.random() > 0.5 ? 1 : -1;
        return Math.max(2, Math.min(8, prev + change));
      });
    }, 12000);

    // Increment recent views occasionally
    const viewInterval = setInterval(() => {
      if (Math.random() > 0.6) {
        setRecentViews((prev) => prev + 1);
      }
    }, 8000);

    return () => {
      clearInterval(visitorInterval);
      clearInterval(viewInterval);
    };
  }, []);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 p-4 bg-muted/30 rounded-xl border border-border/50">
      {/* Live Visitors */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <Users className="w-4 h-4 text-petrol" />
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"
          />
        </div>
        <div className="flex items-center gap-1.5">
          <motion.span
            key={visitors}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="font-semibold text-foreground"
          >
            {visitors}
          </motion.span>
          <span className="text-sm text-muted-foreground">
            Personen schauen gerade
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="hidden sm:block w-px h-6 bg-border" />

      {/* Recent Views */}
      <div className="flex items-center gap-2">
        <Eye className="w-4 h-4 text-copper" />
        <div className="flex items-center gap-1.5">
          <motion.span
            key={recentViews}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            className="font-semibold text-foreground"
          >
            {recentViews}
          </motion.span>
          <span className="text-sm text-muted-foreground">
            Aufrufe heute
          </span>
        </div>
      </div>

      {/* Live Indicator */}
      <div className="flex items-center gap-1.5 ml-auto">
        <motion.div
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-2 h-2 rounded-full bg-green-500"
        />
        <span className="text-xs text-green-600 dark:text-green-400 font-medium">LIVE</span>
      </div>
    </div>
  );
};
