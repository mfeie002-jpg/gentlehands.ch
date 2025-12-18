import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Clock, Flame } from "lucide-react";

interface BookingCountdownTimerProps {
  /** Minutes until offer expires */
  initialMinutes?: number;
  /** Show for specific time slots */
  selectedTime?: string;
}

export const BookingCountdownTimer = ({ 
  initialMinutes = 15,
  selectedTime 
}: BookingCountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [isVisible, setIsVisible] = useState(false);

  // Show timer for popular time slots
  useEffect(() => {
    const popularTimes = ["14:00", "15:00", "16:00", "17:00", "18:00"];
    if (selectedTime && popularTimes.includes(selectedTime)) {
      setIsVisible(true);
      setTimeLeft(initialMinutes * 60);
    }
  }, [selectedTime, initialMinutes]);

  // Show timer randomly after 10 seconds on page
  useEffect(() => {
    if (!selectedTime) {
      const showTimer = setTimeout(() => {
        if (Math.random() > 0.3) {
          setIsVisible(true);
        }
      }, 10000);
      return () => clearTimeout(showTimer);
    }
  }, [selectedTime]);

  useEffect(() => {
    if (!isVisible || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Reset timer instead of showing 0
          return initialMinutes * 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isVisible, timeLeft, initialMinutes]);

  if (!isVisible) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isUrgent = timeLeft < 300; // Less than 5 minutes

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center gap-3 p-3 rounded-lg border ${
        isUrgent 
          ? "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800" 
          : "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800"
      }`}
    >
      <div className={`p-2 rounded-full ${isUrgent ? "bg-red-100 dark:bg-red-900/50" : "bg-amber-100 dark:bg-amber-900/50"}`}>
        {isUrgent ? (
          <Flame className={`w-4 h-4 text-red-600 dark:text-red-400 ${isUrgent ? "animate-pulse" : ""}`} />
        ) : (
          <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
        )}
      </div>
      
      <div className="flex-1">
        <p className={`text-sm font-medium ${isUrgent ? "text-red-700 dark:text-red-300" : "text-amber-700 dark:text-amber-300"}`}>
          {isUrgent ? "Letzte Chance!" : "Limitiertes Angebot"}
        </p>
        <p className={`text-xs ${isUrgent ? "text-red-600 dark:text-red-400" : "text-amber-600 dark:text-amber-400"}`}>
          Dieser Termin ist nur noch reserviert für
        </p>
      </div>

      <div className="flex items-center gap-1 font-mono">
        <motion.span
          key={minutes}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className={`text-lg font-bold ${isUrgent ? "text-red-600 dark:text-red-400" : "text-amber-600 dark:text-amber-400"}`}
        >
          {String(minutes).padStart(2, "0")}
        </motion.span>
        <span className={isUrgent ? "text-red-600 dark:text-red-400" : "text-amber-600 dark:text-amber-400"}>:</span>
        <motion.span
          key={seconds}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          className={`text-lg font-bold ${isUrgent ? "text-red-600 dark:text-red-400" : "text-amber-600 dark:text-amber-400"}`}
        >
          {String(seconds).padStart(2, "0")}
        </motion.span>
      </div>
    </motion.div>
  );
};
