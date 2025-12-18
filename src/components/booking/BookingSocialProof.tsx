import { motion, AnimatePresence } from "framer-motion";
import { Users, Clock, TrendingUp, Eye } from "lucide-react";
import { useState, useEffect } from "react";

interface BookingSocialProofProps {
  selectedTime?: string;
  selectedDate?: Date;
}

export const BookingSocialProof = ({ selectedTime, selectedDate }: BookingSocialProofProps) => {
  const [viewerCount, setViewerCount] = useState(0);
  const [recentBookings, setRecentBookings] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);

  // Simulate realistic viewer counts
  useEffect(() => {
    // Initial count
    setViewerCount(Math.floor(Math.random() * 3) + 2);
    setRecentBookings(Math.floor(Math.random() * 5) + 8);

    // Periodically update viewer count (simulate real traffic)
    const interval = setInterval(() => {
      setViewerCount(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        return Math.max(1, Math.min(6, prev + change));
      });
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  // Rotate through messages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % 3);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const messages = [
    {
      icon: Users,
      text: `${viewerCount} Personen schauen sich gerade Termine an`,
      color: "text-petrol",
    },
    {
      icon: TrendingUp,
      text: `${recentBookings} Buchungen in den letzten 24 Stunden`,
      color: "text-forest",
    },
    {
      icon: Clock,
      text: "Beliebte Zeiten: 14:00 - 18:00 Uhr",
      color: "text-copper",
    },
  ];

  const current = messages[currentMessage];
  const Icon = current.icon;

  return (
    <div className="space-y-3">
      {/* Main rotating message */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMessage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2 text-sm"
        >
          <div className={`p-1.5 rounded-full bg-muted ${current.color}`}>
            <Icon size={14} />
          </div>
          <span className="text-muted-foreground">{current.text}</span>
        </motion.div>
      </AnimatePresence>

      {/* Urgency indicator for popular times */}
      {selectedTime && ["14:00", "15:00", "16:00", "17:00", "18:00"].includes(selectedTime) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 dark:bg-amber-950/30 px-3 py-2 rounded-lg"
        >
          <Eye size={14} className="animate-pulse" />
          <span>Beliebte Zeit! Nur noch wenige Plätze verfügbar.</span>
        </motion.div>
      )}

      {/* Live typing indicator */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <div className="flex gap-1">
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
            className="w-1.5 h-1.5 rounded-full bg-petrol"
          />
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            className="w-1.5 h-1.5 rounded-full bg-petrol"
          />
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
            className="w-1.5 h-1.5 rounded-full bg-petrol"
          />
        </div>
        <span>Jemand bucht gerade...</span>
      </div>
    </div>
  );
};
