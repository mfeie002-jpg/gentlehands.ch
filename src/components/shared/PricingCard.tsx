import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, Sparkles } from "lucide-react";

interface PricingCardProps {
  name: string;
  price: string;
  duration: string;
  description: string;
  features: string[];
  popular?: boolean;
  ctaText?: string;
  ctaLink?: string;
  delay?: number;
}

export const PricingCard = ({
  name,
  price,
  duration,
  description,
  features,
  popular = false,
  ctaText = "Jetzt buchen",
  ctaLink = "/buchung",
  delay = 0,
}: PricingCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className={`relative h-full ${popular ? "z-10" : ""}`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-copper text-accent-foreground text-sm font-medium rounded-full shadow-copper">
            <Sparkles size={14} />
            Beliebt
          </span>
        </div>
      )}
      
      <div
        className={`h-full p-8 rounded-3xl transition-all duration-300 ${
          popular
            ? "bg-gradient-to-br from-petrol to-petrol-dark text-primary-foreground shadow-2xl scale-105"
            : "bg-card border border-border hover:border-copper/30 hover:shadow-lg"
        }`}
      >
        <div className="mb-6">
          <h3 className={`font-display text-2xl mb-2 ${popular ? "text-primary-foreground" : "text-foreground"}`}>
            {name}
          </h3>
          <p className={`text-sm ${popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
            {description}
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-baseline gap-1">
            <span className={`font-display text-4xl md:text-5xl ${popular ? "text-primary-foreground" : "text-foreground"}`}>
              {price}
            </span>
            <span className={`text-lg ${popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
              CHF
            </span>
          </div>
          <p className={`text-sm mt-1 ${popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
            {duration}
          </p>
        </div>

        <ul className="space-y-4 mb-8">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <Check
                size={18}
                className={`mt-0.5 shrink-0 ${popular ? "text-copper-light" : "text-copper"}`}
              />
              <span className={`text-sm ${popular ? "text-primary-foreground/90" : "text-muted-foreground"}`}>
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <Button
          variant={popular ? "secondary" : "copper"}
          className="w-full"
          size="lg"
          asChild
        >
          <Link to={ctaLink}>{ctaText}</Link>
        </Button>
      </div>
    </motion.div>
  );
};
