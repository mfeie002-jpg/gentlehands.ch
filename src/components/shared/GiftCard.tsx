import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Gift, Heart, Sparkles } from "lucide-react";

interface GiftCardProps {
  variant?: "mini" | "full";
}

export const GiftCard = ({ variant = "mini" }: GiftCardProps) => {
  if (variant === "mini") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-copper/10 to-copper/5 p-6 border border-copper/20"
      >
        <Gift size={80} className="absolute -right-4 -bottom-4 text-copper/10" />
        
        <div className="relative z-10">
          <h3 className="font-display text-xl text-foreground mb-2">
            Verschenken Sie Entspannung
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            Ein Gutschein für unvergessliche Momente.
          </p>
          <Button variant="copper" size="sm" asChild>
            <Link to="/gutscheine">Gutscheine entdecken</Link>
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-copper/20 via-copper/10 to-background p-8 md:p-12 border border-copper/20"
    >
      <div className="absolute top-0 right-0 opacity-20">
        <Sparkles size={150} className="text-copper" />
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Gift size={24} className="text-copper" />
            <span className="text-copper font-medium">Geschenkidee</span>
          </div>
          
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
            Das perfekte Geschenk
          </h2>
          
          <p className="text-muted-foreground text-lg mb-6">
            Schenken Sie einer besonderen Frau Zeit für sich selbst. 
            Unsere Gutscheine sind wunderschön verpackt und können 
            individuell gestaltet werden.
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Heart size={16} className="text-copper" />
              <span>Persönliche Botschaft</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles size={16} className="text-copper" />
              <span>Edle Geschenkbox</span>
            </div>
          </div>

          <Button variant="copper" size="lg" asChild>
            <Link to="/gutscheine">Gutschein gestalten</Link>
          </Button>
        </div>

        <div className="hidden lg:flex justify-center">
          <div className="w-72 h-44 rounded-2xl bg-gradient-to-br from-petrol to-petrol-dark p-6 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <div className="h-full flex flex-col justify-between text-primary-foreground">
              <div>
                <p className="text-xs uppercase tracking-wider opacity-70">Gutschein</p>
                <p className="font-display text-2xl mt-1">GentleHands</p>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs opacity-70">Wert</p>
                  <p className="font-display text-xl">CHF 250</p>
                </div>
                <Gift size={32} className="opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
