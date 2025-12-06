import { motion } from "framer-motion";
import { Gift, Sparkles, Heart } from "lucide-react";

interface VoucherPreviewCardProps {
  value: string;
  recipientName?: string;
  senderName?: string;
  message?: string;
  design?: "classic" | "modern" | "romantic";
}

const designStyles = {
  classic: {
    bg: "bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900",
    accent: "text-amber-800 dark:text-amber-200",
    border: "border-amber-200 dark:border-amber-700"
  },
  modern: {
    bg: "bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900",
    accent: "text-slate-800 dark:text-slate-200",
    border: "border-slate-200 dark:border-slate-700"
  },
  romantic: {
    bg: "bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-950 dark:to-rose-900",
    accent: "text-rose-800 dark:text-rose-200",
    border: "border-rose-200 dark:border-rose-700"
  }
};

export const VoucherPreviewCard = ({
  value,
  recipientName = "Empfängerin",
  senderName,
  message,
  design = "classic"
}: VoucherPreviewCardProps) => {
  const styles = designStyles[design];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative aspect-[16/10] rounded-2xl overflow-hidden ${styles.bg} ${styles.border} border-2 p-8 shadow-xl`}
    >
      {/* Decorative elements */}
      <div className="absolute top-4 right-4 opacity-10">
        <Sparkles size={64} />
      </div>
      <div className="absolute bottom-4 left-4 opacity-10">
        <Heart size={48} />
      </div>

      {/* Logo area */}
      <div className="mb-6">
        <span className="text-copper text-sm font-medium tracking-wider">GENTLEHANDS</span>
        <p className={`text-xs ${styles.accent} opacity-70`}>Exklusive Erlebnismassagen</p>
      </div>

      {/* Value */}
      <div className="mb-6">
        <span className={`text-4xl font-display ${styles.accent}`}>{value}</span>
        <p className={`text-sm ${styles.accent} opacity-70`}>Gutschein</p>
      </div>

      {/* Recipient */}
      <div className="mb-4">
        <p className={`text-sm ${styles.accent} opacity-70`}>Für</p>
        <p className={`text-xl font-display ${styles.accent}`}>{recipientName}</p>
      </div>

      {/* Message preview */}
      {message && (
        <p className={`text-sm ${styles.accent} opacity-70 line-clamp-2 italic`}>
          "{message}"
        </p>
      )}

      {/* Footer */}
      <div className="absolute bottom-6 right-6 flex items-center gap-2">
        <Gift size={16} className="text-copper" />
        {senderName && (
          <span className={`text-xs ${styles.accent} opacity-70`}>von {senderName}</span>
        )}
      </div>
    </motion.div>
  );
};
