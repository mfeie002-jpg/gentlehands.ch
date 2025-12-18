import { motion, AnimatePresence } from "framer-motion";
import { User, Sparkles, Clock, Calendar, X, Edit2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface BookingQuickViewProps {
  therapist?: string;
  theme?: string;
  massage?: string;
  duration?: string;
  date?: string;
  time?: string;
  onEdit: (step: number) => void;
  isExpanded: boolean;
  onToggle: () => void;
}

export const BookingQuickView = ({
  therapist,
  theme,
  massage,
  duration,
  date,
  time,
  onEdit,
  isExpanded,
  onToggle
}: BookingQuickViewProps) => {
  const items = [
    { label: "Therapeut:in", value: therapist, icon: User, step: 1 },
    { label: "Themenraum", value: theme, icon: Sparkles, step: 2 },
    { label: "Massage", value: massage ? `${massage}${duration ? ` (${duration})` : ''}` : undefined, icon: Clock, step: 3 },
    { label: "Termin", value: date && time ? `${date}, ${time}` : undefined, icon: Calendar, step: 5 },
  ].filter(item => item.value);

  if (items.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 bg-muted/30 border border-border/50 rounded-xl overflow-hidden"
    >
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/50 transition-colors"
      >
        <span className="text-sm font-medium text-muted-foreground">
          Ihre bisherige Auswahl ({items.length})
        </span>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <X size={16} className={cn(
            "text-muted-foreground transition-transform",
            !isExpanded && "rotate-45"
          )} />
        </motion.div>
      </button>
      
      {/* Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {items.map((item, idx) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center gap-3 p-2 rounded-lg bg-background/50 group"
                >
                  <div className="w-8 h-8 rounded-full bg-copper/10 flex items-center justify-center shrink-0">
                    <item.icon size={14} className="text-copper" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-medium text-foreground truncate">{item.value}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(item.step);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-muted rounded-md transition-all"
                    aria-label={`${item.label} bearbeiten`}
                  >
                    <Edit2 size={12} className="text-muted-foreground" />
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
