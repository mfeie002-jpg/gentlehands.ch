import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Check, X, Loader2, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface BookingGiftCardInputProps {
  onApply: (code: string, discount: number) => void;
  onRemove: () => void;
  appliedCode?: string | null;
  appliedDiscount?: number;
  maxDiscount?: number;
}

export const BookingGiftCardInput = ({
  onApply,
  onRemove,
  appliedCode,
  appliedDiscount,
  maxDiscount,
}: BookingGiftCardInputProps) => {
  const [isExpanded, setIsExpanded] = useState(!!appliedCode);
  const [code, setCode] = useState(appliedCode || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleApply = async () => {
    if (!code.trim()) {
      setError("Bitte geben Sie einen Gutscheincode ein");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data, error: rpcError } = await supabase
        .rpc('check_gift_card_balance', { p_code: code.trim().toUpperCase() });

      if (rpcError) throw rpcError;

      if (!data || data.length === 0 || !data[0].valid) {
        setError("Ungültiger oder abgelaufener Gutscheincode");
        return;
      }

      const balance = data[0].remaining_balance;
      const discount = maxDiscount ? Math.min(balance, maxDiscount) : balance;
      
      onApply(code.trim().toUpperCase(), discount);
      
      toast({
        title: "Gutschein angewendet!",
        description: `CHF ${discount} Rabatt wurde hinzugefügt`,
      });
    } catch (err) {
      console.error("Gift card check error:", err);
      setError("Fehler beim Überprüfen des Gutscheins");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = () => {
    setCode("");
    setError(null);
    onRemove();
    setIsExpanded(false);
  };

  if (appliedCode) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-petrol/5 border border-petrol/20 rounded-xl p-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-petrol/10 flex items-center justify-center">
              <Check className="text-petrol" size={20} />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Gutschein angewendet</p>
              <p className="text-xs text-muted-foreground">
                Code: {appliedCode} • -CHF {appliedDiscount}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            className="text-muted-foreground hover:text-destructive"
          >
            <X size={16} />
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-2">
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-2 text-sm text-petrol hover:text-petrol/80 transition-colors"
        >
          <Gift size={16} />
          <span>Gutscheincode eingeben</span>
          <Sparkles size={12} className="opacity-50" />
        </button>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3"
          >
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Gift className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <Input
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value.toUpperCase());
                    setError(null);
                  }}
                  placeholder="GUTSCHEINCODE"
                  className="pl-10 uppercase tracking-wider"
                  disabled={isLoading}
                />
              </div>
              <Button
                onClick={handleApply}
                disabled={isLoading || !code.trim()}
                className="bg-petrol hover:bg-petrol/90"
              >
                {isLoading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  "Einlösen"
                )}
              </Button>
            </div>
            
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-destructive flex items-center gap-1"
              >
                <X size={12} />
                {error}
              </motion.p>
            )}
            
            <button
              onClick={() => setIsExpanded(false)}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Abbrechen
            </button>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};
