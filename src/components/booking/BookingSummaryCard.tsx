import { motion } from "framer-motion";
import { User, Sparkles, Clock, Settings, Banknote } from "lucide-react";

interface BookingSummaryCardProps {
  masseur: string;
  theme: string;
  massage: string;
  duration: string;
  price?: number | null;
}

export const BookingSummaryCard = ({ masseur, theme, massage, duration, price }: BookingSummaryCardProps) => {
  const items = [
    { icon: User, label: "Therapeut:in", value: masseur || "Noch nicht gewählt" },
    { icon: Sparkles, label: "Theme", value: theme || "Noch nicht gewählt" },
    { icon: Clock, label: "Massage", value: massage ? `${massage} (${duration})` : "Noch nicht gewählt" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-6 rounded-2xl bg-secondary/50 border border-border/50"
    >
      <h3 className="font-display text-lg text-foreground mb-4 flex items-center gap-2">
        <Settings size={18} className="text-copper" />
        Ihre Auswahl
      </h3>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.label} className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-copper/10 flex items-center justify-center shrink-0">
              <item.icon size={16} className="text-copper" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="text-sm text-foreground font-medium">{item.value}</p>
            </div>
          </div>
        ))}
        
        {/* Dynamic Price Display */}
        {price !== undefined && price !== null && price > 0 && (
          <div className="flex items-start gap-3 pt-2 border-t border-border/50">
            <div className="w-8 h-8 rounded-lg bg-copper/20 flex items-center justify-center shrink-0">
              <Banknote size={16} className="text-copper" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Geschätzter Preis</p>
              <p className="text-lg text-copper font-semibold">CHF {price.toFixed(0)}.-</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
