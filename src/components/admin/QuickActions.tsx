import { motion } from "framer-motion";
import { 
  Plus, 
  Download, 
  Mail, 
  RefreshCw,
  Calendar,
  Gift,
  MessageSquare,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuickActionsProps {
  onAction: (action: string) => void;
}

const actions = [
  { id: 'new-booking', icon: Calendar, label: 'Neue Buchung', color: 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20' },
  { id: 'new-giftcard', icon: Gift, label: 'Gutschein erstellen', color: 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20' },
  { id: 'export', icon: Download, label: 'Export CSV', color: 'bg-violet-500/10 text-violet-500 hover:bg-violet-500/20' },
  { id: 'send-reminders', icon: Mail, label: 'Erinnerungen senden', color: 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20' },
];

export const QuickActions = ({ onAction }: QuickActionsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border bg-card p-6"
    >
      <h3 className="text-lg font-semibold mb-4">Schnellaktionen</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <motion.button
            key={action.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onAction(action.id)}
            className={cn(
              "flex items-center gap-3 p-4 rounded-xl transition-colors",
              action.color
            )}
          >
            <action.icon className="w-5 h-5" />
            <span className="font-medium text-sm">{action.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};
