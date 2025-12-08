import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Search, Check, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { giftCardCodeSchema } from "@/lib/validations";

interface GiftCardResult {
  valid: boolean;
  balance?: number;
  expires?: string;
  message: string;
}

export const GiftCardChecker = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GiftCardResult | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const checkGiftCard = async () => {
    const trimmedCode = code.trim().toUpperCase();
    
    // Validate input
    const validation = giftCardCodeSchema.safeParse({ code: trimmedCode });
    if (!validation.success) {
      setValidationError(validation.error.errors[0]?.message || "Ungültiger Code");
      return;
    }
    setValidationError(null);
    
    setLoading(true);
    setResult(null);

    try {
      // Use secure RPC function instead of direct table access
      const { data, error } = await supabase
        .rpc('check_gift_card_balance', { p_code: trimmedCode });

      if (error || !data || data.length === 0) {
        setResult({
          valid: false,
          message: "Dieser Gutscheincode wurde nicht gefunden.",
        });
      } else {
        const giftCard = data[0];
        
        if (giftCard.is_redeemed) {
          setResult({
            valid: false,
            message: "Dieser Gutschein wurde bereits eingelöst.",
          });
        } else if (giftCard.expires_at && new Date(giftCard.expires_at) < new Date()) {
          setResult({
            valid: false,
            message: "Dieser Gutschein ist abgelaufen.",
          });
        } else {
          setResult({
            valid: true,
            balance: giftCard.remaining_balance,
            expires: giftCard.expires_at,
            message: "Gutschein gültig!",
          });
        }
      }
    } catch {
      setResult({
        valid: false,
        message: "Fehler beim Überprüfen des Gutscheins.",
      });
    }

    setLoading(false);
  };

  return (
    <div className="glass rounded-2xl p-6 border border-border/50">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-copper/10 flex items-center justify-center">
          <Gift className="w-6 h-6 text-copper" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-foreground">Gutschein prüfen</h3>
          <p className="text-sm text-muted-foreground">Geben Sie Ihren Gutscheincode ein</p>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase());
              setValidationError(null);
            }}
            placeholder="XXXX-XXXX-XXXX"
            className={`w-full px-4 py-3 rounded-xl bg-muted border focus:ring-2 outline-none font-mono uppercase tracking-wider ${
              validationError 
                ? "border-destructive focus:border-destructive focus:ring-destructive/20" 
                : "border-border focus:border-copper focus:ring-copper/20"
            }`}
            maxLength={20}
          />
        </div>
        <Button
          onClick={checkGiftCard}
          disabled={loading || !code.trim()}
          variant="copper"
          className="px-6"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Search className="w-4 h-4" />
          )}
        </Button>
      </div>
      
      {validationError && (
        <p className="text-sm text-destructive mt-2">{validationError}</p>
      )}

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mt-4 p-4 rounded-xl ${
              result.valid 
                ? "bg-emerald-500/10 border border-emerald-500/20" 
                : "bg-rose-500/10 border border-rose-500/20"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                result.valid ? "bg-emerald-500" : "bg-rose-500"
              }`}>
                {result.valid ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <X className="w-4 h-4 text-white" />
                )}
              </div>
              <div>
                <p className={`font-medium ${result.valid ? "text-emerald-600" : "text-rose-600"}`}>
                  {result.message}
                </p>
                {result.valid && result.balance && (
                  <div className="mt-2">
                    <p className="text-2xl font-bold text-foreground">
                      CHF {result.balance.toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground">Verbleibendes Guthaben</p>
                    {result.expires && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Gültig bis: {new Date(result.expires).toLocaleDateString('de-CH')}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
