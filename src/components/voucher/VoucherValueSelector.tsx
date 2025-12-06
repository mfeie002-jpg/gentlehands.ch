import { motion } from "framer-motion";
import { Check, Gift, Sparkles, Crown } from "lucide-react";

interface VoucherValueSelectorProps {
  values: { amount: string; popular?: boolean; description?: string }[];
  selectedValue: string;
  onSelect: (value: string) => void;
  allowCustom?: boolean;
  customValue?: string;
  onCustomChange?: (value: string) => void;
}

export const VoucherValueSelector = ({
  values,
  selectedValue,
  onSelect,
  allowCustom = true,
  customValue,
  onCustomChange
}: VoucherValueSelectorProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {values.map((item, index) => (
          <motion.button
            key={item.amount}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSelect(item.amount)}
            className={`relative p-4 rounded-xl border-2 transition-all text-center ${
              selectedValue === item.amount
                ? "border-copper bg-copper/10"
                : "border-border/50 hover:border-copper/30"
            }`}
          >
            {item.popular && (
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2 py-0.5 bg-copper text-background text-[10px] font-medium rounded-full">
                <Crown size={10} />
                Beliebt
              </div>
            )}
            
            {selectedValue === item.amount && (
              <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-copper flex items-center justify-center">
                <Check size={12} className="text-background" />
              </div>
            )}
            
            <Gift size={20} className={`mx-auto mb-2 ${selectedValue === item.amount ? "text-copper" : "text-muted-foreground"}`} />
            <p className={`font-bold text-xl ${selectedValue === item.amount ? "text-copper" : "text-foreground"}`}>
              {item.amount}
            </p>
            {item.description && (
              <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
            )}
          </motion.button>
        ))}
      </div>

      {allowCustom && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4"
        >
          <label className="text-sm text-muted-foreground mb-2 block">
            Oder wählen Sie einen individuellen Betrag:
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">CHF</span>
            <input
              type="number"
              min="50"
              max="1000"
              step="10"
              value={customValue || ""}
              onChange={(e) => onCustomChange?.(e.target.value)}
              onFocus={() => onSelect("custom")}
              placeholder="100"
              className="w-full pl-14 pr-4 py-3 rounded-xl border border-border/50 bg-background focus:border-copper focus:outline-none"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">Min. CHF 50 – Max. CHF 1000</p>
        </motion.div>
      )}
    </div>
  );
};
