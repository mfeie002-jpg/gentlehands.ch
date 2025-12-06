import { motion } from "framer-motion";
import { Shield, Heart, CheckCircle } from "lucide-react";

const reassurances = [
  {
    icon: Shield,
    text: "Professionelle Entspannungsmassage – keine erotischen Dienstleistungen",
  },
  {
    icon: Heart,
    text: "Sie kontrollieren jederzeit Intensität, Bereiche und Tempo",
  },
  {
    icon: CheckCircle,
    text: "Alle Therapeut:innen sind umfassend ausgebildet und geschult",
  },
];

export const BookingIntroduction = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 p-6 rounded-2xl bg-secondary/50 border border-border"
    >
      <h3 className="text-lg font-display text-foreground mb-4 text-center">
        Bevor Sie beginnen
      </h3>
      <div className="space-y-3">
        {reassurances.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-copper/10 flex items-center justify-center shrink-0">
              <item.icon size={16} className="text-copper" />
            </div>
            <p className="text-sm text-muted-foreground">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
