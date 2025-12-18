import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { CheckCircle, MapPin } from "lucide-react";

const fakeBookings = [
  { name: "Sarah M.", location: "Zürich", massage: "Tiefenentspannung", time: "vor 2 Min." },
  { name: "Lisa K.", location: "Basel", massage: "Aromatherapie", time: "vor 5 Min." },
  { name: "Anna B.", location: "Bern", massage: "Hot Stone", time: "vor 8 Min." },
  { name: "Julia W.", location: "Luzern", massage: "Swedish Massage", time: "vor 12 Min." },
  { name: "Maria S.", location: "Winterthur", massage: "Deep Tissue", time: "vor 15 Min." },
  { name: "Nina R.", location: "St. Gallen", massage: "Klangtherapie", time: "vor 18 Min." },
];

export const BookingFOMOPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(0);

  useEffect(() => {
    // Show first popup after 5 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(initialTimer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Hide after 5 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    // Show next booking after 20-40 seconds
    const nextTimer = setTimeout(() => {
      setCurrentBooking((prev) => (prev + 1) % fakeBookings.length);
      setIsVisible(true);
    }, 20000 + Math.random() * 20000);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [isVisible, currentBooking]);

  const booking = fakeBookings[currentBooking];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -100, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-24 left-4 z-50 max-w-xs"
        >
          <div className="bg-background/95 backdrop-blur-md border border-border/50 rounded-xl p-4 shadow-xl">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-forest/20 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-forest" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {booking.name} hat gebucht
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {booking.massage}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {booking.location} • {booking.time}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Progress bar animation */}
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-petrol/50 rounded-b-xl"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 5, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
