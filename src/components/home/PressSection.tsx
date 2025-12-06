import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

const pressLogos = [
  { name: "Annabelle", text: "ANNABELLE" },
  { name: "NZZ", text: "NZZ" },
  { name: "Tages-Anzeiger", text: "TAGES-ANZEIGER" },
  { name: "Schweizer Illustrierte", text: "SI" },
  { name: "Vogue", text: "VOGUE" },
];

export const PressSection = () => {
  return (
    <section className="py-12 bg-secondary/20 border-y border-border/30">
      <div className="container-wide">
        <ScrollReveal className="text-center mb-8">
          <p className="text-muted-foreground text-xs uppercase tracking-[0.3em]">
            Bekannt aus
          </p>
        </ScrollReveal>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
          {pressLogos.map((logo, index) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors cursor-default"
            >
              <span className="text-lg md:text-xl font-display tracking-wider">
                {logo.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
