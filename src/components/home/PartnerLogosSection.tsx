import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

const partners = [
  { name: "Swiss Wellness", logo: "SW" },
  { name: "Bio Suisse", logo: "BS" },
  { name: "Migros", logo: "M" },
  { name: "CSS", logo: "CSS" },
  { name: "Swica", logo: "S" },
  { name: "Helsana", logo: "H" },
];

export const PartnerLogosSection = () => {
  return (
    <section className="py-10 bg-secondary/20">
      <div className="container-wide">
        <ScrollReveal className="text-center mb-6">
          <p className="text-muted-foreground text-sm">Vertraut von führenden Unternehmen</p>
        </ScrollReveal>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center w-20 h-12 rounded-lg bg-card/50 border border-border/50 cursor-default"
            >
              <span className="text-muted-foreground/50 font-display text-lg">{partner.logo}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
