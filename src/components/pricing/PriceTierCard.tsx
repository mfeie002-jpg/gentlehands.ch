import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, ArrowRight, Crown, Sparkles } from "lucide-react";

interface PriceTierCardProps {
  name: string;
  price: string;
  duration: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  savings?: string;
}

export const PriceTierCard = ({
  name,
  price,
  duration,
  description,
  features,
  highlighted = false,
  badge,
  savings
}: PriceTierCardProps) => {
  return (
    <motion.div
      className={`relative rounded-3xl p-8 h-full ${
        highlighted
          ? "bg-gradient-to-b from-copper to-copper-dark text-background border-2 border-copper shadow-2xl shadow-copper/30 scale-105"
          : "bg-card border border-border/50"
      }`}
      whileHover={{ y: -8 }}
    >
      {badge && (
        <div className={`absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-medium ${
          highlighted ? "bg-background text-copper" : "bg-copper text-background"
        }`}>
          <Crown size={12} />
          {badge}
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className={`font-display text-2xl mb-2 ${highlighted ? "text-background" : "text-foreground"}`}>
          {name}
        </h3>
        <div className="flex items-baseline justify-center gap-1 mb-2">
          <span className={`text-4xl font-bold ${highlighted ? "text-background" : "text-foreground"}`}>
            {price}
          </span>
          <span className={highlighted ? "text-background/70" : "text-muted-foreground"}>
            / {duration}
          </span>
        </div>
        {savings && (
          <span className={`inline-block px-2 py-0.5 rounded-full text-xs ${
            highlighted ? "bg-background/20 text-background" : "bg-emerald-500/10 text-emerald-500"
          }`}>
            {savings}
          </span>
        )}
        <p className={`mt-3 text-sm ${highlighted ? "text-background/80" : "text-muted-foreground"}`}>
          {description}
        </p>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
              highlighted ? "bg-background/20" : "bg-copper/10"
            }`}>
              <Check size={12} className={highlighted ? "text-background" : "text-copper"} />
            </div>
            <span className={`text-sm ${highlighted ? "text-background/90" : "text-muted-foreground"}`}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <Button
        variant={highlighted ? "secondary" : "copper"}
        className="w-full"
        asChild
      >
        <Link to="/buchung" className="flex items-center justify-center gap-2">
          Auswählen
          <ArrowRight size={16} />
        </Link>
      </Button>
    </motion.div>
  );
};
