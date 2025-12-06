import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";

const massageFeatures = [
  { name: "Ganzkörperbehandlung", deepRelease: true, stressReset: false, emotional: true, ganzkoerper: true },
  { name: "Tiefenarbeit", deepRelease: true, stressReset: false, emotional: false, ganzkoerper: true },
  { name: "Nervensystem-Fokus", deepRelease: true, stressReset: true, emotional: true, ganzkoerper: true },
  { name: "60 Min verfügbar", deepRelease: false, stressReset: true, emotional: false, ganzkoerper: false },
  { name: "90 Min verfügbar", deepRelease: true, stressReset: true, emotional: true, ganzkoerper: false },
  { name: "120 Min verfügbar", deepRelease: true, stressReset: false, emotional: false, ganzkoerper: true },
  { name: "Für Einsteiger:innen", deepRelease: false, stressReset: true, emotional: true, ganzkoerper: false },
  { name: "Bei starken Verspannungen", deepRelease: true, stressReset: false, emotional: false, ganzkoerper: true },
];

export const MassageComparisonTable = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-foreground mb-4">Massage-Vergleich</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Finden Sie die perfekte Massage für Ihre Bedürfnisse
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-x-auto rounded-2xl border border-border bg-card"
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-medium text-foreground">Merkmal</th>
                <th className="p-4 font-medium text-foreground text-center">Deep Release</th>
                <th className="p-4 font-medium text-foreground text-center">Stress Reset</th>
                <th className="p-4 font-medium text-foreground text-center">Emotional</th>
                <th className="p-4 font-medium text-foreground text-center">Ganzkörper</th>
              </tr>
            </thead>
            <tbody>
              {massageFeatures.map((feature, index) => (
                <motion.tr
                  key={feature.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-border/50 last:border-0 hover:bg-secondary/50 transition-colors"
                >
                  <td className="p-4 text-muted-foreground">{feature.name}</td>
                  <td className="p-4 text-center">
                    {feature.deepRelease ? (
                      <Check size={18} className="inline text-copper" />
                    ) : (
                      <Minus size={18} className="inline text-muted-foreground/30" />
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {feature.stressReset ? (
                      <Check size={18} className="inline text-copper" />
                    ) : (
                      <Minus size={18} className="inline text-muted-foreground/30" />
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {feature.emotional ? (
                      <Check size={18} className="inline text-copper" />
                    ) : (
                      <Minus size={18} className="inline text-muted-foreground/30" />
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {feature.ganzkoerper ? (
                      <Check size={18} className="inline text-copper" />
                    ) : (
                      <Minus size={18} className="inline text-muted-foreground/30" />
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
};
