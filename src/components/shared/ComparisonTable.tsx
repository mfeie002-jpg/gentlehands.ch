import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";

interface Feature {
  name: string;
  gentlehands: boolean | "partial";
  traditional: boolean | "partial";
  spa: boolean | "partial";
}

const features: Feature[] = [
  { name: "Exklusiv nur für Frauen", gentlehands: true, traditional: false, spa: false },
  { name: "Wählbare Atmosphären/Themes", gentlehands: true, traditional: false, spa: "partial" },
  { name: "Persönliche Masseur:in-Wahl", gentlehands: true, traditional: "partial", spa: false },
  { name: "Trauma-sensitiver Ansatz", gentlehands: true, traditional: false, spa: false },
  { name: "Individuelle Präferenzen", gentlehands: true, traditional: "partial", spa: false },
  { name: "Diskrete Premium-Lage", gentlehands: true, traditional: false, spa: "partial" },
  { name: "Keine Wartezeiten", gentlehands: true, traditional: false, spa: false },
  { name: "Surprise Experience Option", gentlehands: true, traditional: false, spa: false },
  { name: "Nachbetreuung/Follow-up", gentlehands: true, traditional: false, spa: false },
  { name: "Flexible Buchungszeiten", gentlehands: true, traditional: "partial", spa: true },
];

const renderCheck = (value: boolean | "partial") => {
  if (value === true) return <Check size={20} className="text-forest" />;
  if (value === "partial") return <Minus size={20} className="text-copper" />;
  return <X size={20} className="text-muted-foreground/50" />;
};

export const ComparisonTable = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="overflow-x-auto"
    >
      <table className="w-full min-w-[600px]">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-4 pr-4 font-display text-foreground">
              Merkmal
            </th>
            <th className="py-4 px-4 text-center">
              <div className="font-display text-copper">GentleHands</div>
            </th>
            <th className="py-4 px-4 text-center">
              <div className="font-display text-muted-foreground">Traditionell</div>
            </th>
            <th className="py-4 px-4 text-center">
              <div className="font-display text-muted-foreground">Hotel-Spa</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature, index) => (
            <motion.tr
              key={feature.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
            >
              <td className="py-4 pr-4 text-foreground">{feature.name}</td>
              <td className="py-4 px-4">
                <div className="flex justify-center">{renderCheck(feature.gentlehands)}</div>
              </td>
              <td className="py-4 px-4">
                <div className="flex justify-center">{renderCheck(feature.traditional)}</div>
              </td>
              <td className="py-4 px-4">
                <div className="flex justify-center">{renderCheck(feature.spa)}</div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
      
      <div className="flex items-center justify-center gap-6 mt-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Check size={16} className="text-forest" />
          <span>Ja</span>
        </div>
        <div className="flex items-center gap-2">
          <Minus size={16} className="text-copper" />
          <span>Teilweise</span>
        </div>
        <div className="flex items-center gap-2">
          <X size={16} className="text-muted-foreground/50" />
          <span>Nein</span>
        </div>
      </div>
    </motion.div>
  );
};
