import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Snowflake, Sun, Leaf, Flower2, Clock, Gift } from "lucide-react";

interface SeasonalOfferProps {
  season?: "winter" | "spring" | "summer" | "autumn";
}

const seasons = {
  winter: {
    icon: Snowflake,
    name: "Winter Wellness",
    title: "Wärme für kalte Tage",
    description: "Wärmende Massagen mit Ingwer & Zimt, heisser Tee und extra kuschelige Decken. Perfekt zum Auftanken in der dunklen Jahreszeit.",
    offer: "20% auf alle 120-Min-Sessions",
    validUntil: "Gültig bis 28. Februar",
    color: "from-blue-100 to-slate-100",
    iconColor: "text-blue-600",
  },
  spring: {
    icon: Flower2,
    name: "Frühlingserwachen",
    title: "Neustart für Körper & Seele",
    description: "Belebende Massagen mit frischen Zitrusdüften und energetisierenden Techniken. Zeit, aus dem Winterschlaf zu erwachen.",
    offer: "Gratis Aromatherapie-Upgrade",
    validUntil: "Gültig bis 31. Mai",
    color: "from-pink-100 to-green-50",
    iconColor: "text-pink-500",
  },
  summer: {
    icon: Sun,
    name: "Sommer Escape",
    title: "Abkühlung für heisse Tage",
    description: "Kühlende Techniken, erfrischende Minze und unser Ozean-Theme für das ultimative Urlaubsgefühl mitten in der Stadt.",
    offer: "15% auf Feierabend-Rituale",
    validUntil: "Gültig bis 31. August",
    color: "from-yellow-100 to-orange-50",
    iconColor: "text-orange-500",
  },
  autumn: {
    icon: Leaf,
    name: "Herbst Retreat",
    title: "Zeit zum Innehalten",
    description: "Erdende Massagen mit warmen Holznoten und unserem Alpine-Theme. Perfekt für die Übergangszeit.",
    offer: "Gutschein-Bonus: 10% extra",
    validUntil: "Gültig bis 30. November",
    color: "from-orange-100 to-amber-50",
    iconColor: "text-amber-600",
  },
};

export const SeasonalOffer = ({ season = "winter" }: SeasonalOfferProps) => {
  const current = seasons[season];
  const Icon = current.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${current.color} p-8 md:p-12`}
    >
      <div className="absolute top-0 right-0 opacity-10">
        <Icon size={200} className={current.iconColor} />
      </div>

      <div className="relative z-10 max-w-2xl">
        <div className="flex items-center gap-3 mb-4">
          <Icon size={24} className={current.iconColor} />
          <span className={`font-medium ${current.iconColor}`}>{current.name}</span>
        </div>

        <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
          {current.title}
        </h2>

        <p className="text-muted-foreground text-lg mb-6">
          {current.description}
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur rounded-full">
            <Gift size={18} className="text-copper" />
            <span className="font-medium text-foreground">{current.offer}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock size={16} />
            <span>{current.validUntil}</span>
          </div>
        </div>

        <Button variant="copper" size="lg" asChild>
          <Link to="/buchung">Jetzt Angebot nutzen</Link>
        </Button>
      </div>
    </motion.div>
  );
};
