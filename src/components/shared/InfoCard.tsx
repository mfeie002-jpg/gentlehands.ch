import { motion } from "framer-motion";
import { LucideIcon, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface InfoCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  link?: string;
  linkText?: string;
  variant?: "default" | "highlight" | "dark";
}

export const InfoCard = ({
  icon: Icon,
  title,
  description,
  link,
  linkText = "Mehr erfahren",
  variant = "default",
}: InfoCardProps) => {
  const variants = {
    default: "bg-card border-border/50",
    highlight: "bg-gradient-to-br from-copper/10 to-primary/5 border-copper/20",
    dark: "bg-foreground/5 border-foreground/10",
  };

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className={`p-6 rounded-2xl border ${variants[variant]} ${link ? "cursor-pointer group" : ""}`}
    >
      <motion.div
        className="w-12 h-12 mb-4 rounded-xl bg-copper/10 flex items-center justify-center group-hover:bg-copper/20 transition-colors"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        <Icon size={24} className="text-copper" />
      </motion.div>

      <h3 className="font-display text-lg text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>

      {link && (
        <span className="inline-flex items-center gap-1 text-sm text-copper font-medium group-hover:gap-2 transition-all">
          {linkText}
          <ArrowRight size={14} />
        </span>
      )}
    </motion.div>
  );

  if (link) {
    return <Link to={link}>{content}</Link>;
  }

  return content;
};
