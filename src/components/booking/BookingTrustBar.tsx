import { motion } from "framer-motion";
import { Shield, Star, Clock, Award, Lock, Heart } from "lucide-react";

const trustItems = [
  { icon: Shield, text: "100% Diskret" },
  { icon: Star, text: "4.9/5 Bewertungen" },
  { icon: Clock, text: "Kostenlose Stornierung" },
  { icon: Award, text: "Zertifizierte Therapeut:innen" },
  { icon: Lock, text: "Sichere Buchung" },
  { icon: Heart, text: "Nur für Frauen" },
];

export const BookingTrustBar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-gradient-to-r from-petrol/5 via-copper/5 to-petrol/5 border-y border-border/50 py-3 mb-6"
    >
      <div className="flex items-center justify-center gap-4 sm:gap-8 flex-wrap px-4">
        {trustItems.slice(0, 4).map((item, index) => (
          <motion.div
            key={item.text}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-1.5 text-muted-foreground"
          >
            <item.icon size={14} className="text-copper shrink-0" />
            <span className="text-xs sm:text-sm whitespace-nowrap">{item.text}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export const BookingTrustSignals = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6 mb-4">
      {trustItems.map((item, index) => (
        <motion.div
          key={item.text}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50 border border-border/50"
        >
          <div className="w-8 h-8 rounded-full bg-copper/10 flex items-center justify-center shrink-0">
            <item.icon size={14} className="text-copper" />
          </div>
          <span className="text-xs text-muted-foreground leading-tight">{item.text}</span>
        </motion.div>
      ))}
    </div>
  );
};
