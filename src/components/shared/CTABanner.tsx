import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface CTABannerProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  variant?: "default" | "copper" | "gradient";
}

export const CTABanner = ({
  title,
  description,
  buttonText,
  buttonLink,
  variant = "default",
}: CTABannerProps) => {
  const variants = {
    default: "bg-secondary/50 border-border/50",
    copper: "bg-gradient-to-r from-copper/10 to-copper/5 border-copper/20",
    gradient: "bg-gradient-to-r from-primary/10 via-copper/10 to-primary/10 border-copper/30",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`p-8 md:p-12 rounded-3xl border text-center ${variants[variant]}`}
    >
      <motion.div
        className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-copper/10 flex items-center justify-center"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        <Sparkles size={32} className="text-copper" />
      </motion.div>

      <h2 className="text-2xl md:text-3xl font-display text-foreground mb-4">{title}</h2>
      <p className="text-muted-foreground mb-8 max-w-xl mx-auto">{description}</p>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button variant="copper" size="lg" asChild className="group">
          <Link to={buttonLink}>
            {buttonText}
            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  );
};
