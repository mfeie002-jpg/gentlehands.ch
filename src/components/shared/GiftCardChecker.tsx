import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Search, Check, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

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

  const checkGiftCard = async () => {
    if (!code.trim()) return;
    
    setLoading(true);
    setResult(null);

    try {
      const { data, error } = await supabase
        .from('gift_cards')
        .select('*')
        .eq('code', code.toUpperCase())
        .single();

      if (error || !data) {
        setResult({
          valid: false,
          message: "Dieser Gutscheincode wurde nicht gefunden.",
        });
      } else if (data.is_redeemed) {
        setResult({
          valid: false,
          message: "Dieser Gutschein wurde bereits eingelöst.",
        });
      } else if (data.expires_at && new Date(data.expires_at) < new Date()) {
        setResult({
          valid: false,
          message: "Dieser Gutschein ist abgelaufen.",
        });
      } else {
        setResult({
          valid: true,
          balance: data.remaining_balance,
          expires: data.expires_at,
          message: "Gutschein gültig!",
        });
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
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="XXXX-XXXX-XXXX"
            className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-copper focus:ring-2 focus:ring-copper/20 outline-none font-mono uppercase tracking-wider"
            maxLength={14}
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
