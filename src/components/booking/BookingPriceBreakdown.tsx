import { motion, AnimatePresence } from "framer-motion";
import { Info, Gift, Percent, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface BookingPriceBreakdownProps {
  basePrice: number;
  duration: string;
  therapistName: string;
  giftCardDiscount?: number;
  membershipDiscount?: number;
}

export const BookingPriceBreakdown = ({
  basePrice,
  duration,
  therapistName,
  giftCardDiscount = 0,
  membershipDiscount = 0
}: BookingPriceBreakdownProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const totalDiscount = giftCardDiscount + membershipDiscount;
  const finalPrice = Math.max(0, basePrice - totalDiscount);
  const hasDiscounts = totalDiscount > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-copper/5 to-copper/10 border border-copper/20 rounded-xl overflow-hidden"
    >
      {/* Header - Always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-copper/5 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Gesamtpreis</span>
          {hasDiscounts && (
            <span className="px-2 py-0.5 bg-green-500/20 text-green-700 text-xs rounded-full">
              -{totalDiscount} CHF gespart
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            {hasDiscounts && (
              <span className="text-sm text-muted-foreground line-through mr-2">
                CHF {basePrice}
              </span>
            )}
            <span className="font-display text-2xl text-copper font-semibold">
              CHF {finalPrice}
            </span>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={18} className="text-muted-foreground" />
          </motion.div>
        </div>
      </button>
      
      {/* Expanded breakdown */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3 border-t border-copper/10 pt-3">
              {/* Base price */}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {therapistName} × {duration}
                </span>
                <span className="text-foreground">CHF {basePrice}</span>
              </div>
              
              {/* Gift card discount */}
              {giftCardDiscount > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex justify-between text-sm"
                >
                  <span className="text-green-600 flex items-center gap-1.5">
                    <Gift size={14} />
                    Gutschein-Rabatt
                  </span>
                  <span className="text-green-600">-CHF {giftCardDiscount}</span>
                </motion.div>
              )}
              
              {/* Membership discount */}
              {membershipDiscount > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex justify-between text-sm"
                >
                  <span className="text-purple-600 flex items-center gap-1.5">
                    <Percent size={14} />
                    Mitglieder-Rabatt
                  </span>
                  <span className="text-purple-600">-CHF {membershipDiscount}</span>
                </motion.div>
              )}
              
              {/* Divider */}
              <div className="border-t border-copper/10 pt-2">
                <div className="flex justify-between font-medium">
                  <span className="text-foreground">Zu zahlen</span>
                  <span className="text-copper text-lg">CHF {finalPrice}</span>
                </div>
              </div>
              
              {/* Info */}
              <p className="text-xs text-muted-foreground flex items-start gap-1.5 mt-2">
                <Info size={12} className="mt-0.5 shrink-0" />
                Alle Preise inkl. MwSt. Zahlung vor Ort oder online möglich.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
