import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";

interface PriceComparisonRowProps {
  feature: string;
  values: (boolean | string | null)[];
  highlightColumn?: number;
}

export const PriceComparisonRow = ({
  feature,
  values,
  highlightColumn = 0
}: PriceComparisonRowProps) => {
  const renderValue = (value: boolean | string | null, isHighlighted: boolean) => {
    if (value === true) {
      return (
        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
          isHighlighted ? "bg-background/20" : "bg-emerald-500/10"
        }`}>
          <Check size={14} className={isHighlighted ? "text-background" : "text-emerald-500"} />
        </div>
      );
    }
    if (value === false) {
      return (
        <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center">
          <X size={14} className="text-destructive/50" />
        </div>
      );
    }
    if (value === null) {
      return <Minus size={14} className="text-muted-foreground/50" />;
    }
    return (
      <span className={`text-sm font-medium ${
        isHighlighted ? "text-background" : "text-foreground"
      }`}>
        {value}
      </span>
    );
  };

  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border-t border-border/30"
    >
      <td className="py-4 px-4 text-foreground text-sm">{feature}</td>
      {values.map((value, index) => (
        <td
          key={index}
          className={`py-4 px-4 text-center ${
            index === highlightColumn ? "bg-copper/10" : ""
          }`}
        >
          <div className="flex justify-center">
            {renderValue(value, index === highlightColumn)}
          </div>
        </td>
      ))}
    </motion.tr>
  );
};
