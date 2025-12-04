import { motion } from "framer-motion";
import { NumberCounter } from "@/components/shared/NumberCounter";

const stats = [
  { value: 98, suffix: "%", label: "Kundenzufriedenheit" },
  { value: 5000, suffix: "+", label: "Behandlungen" },
  { value: 15, suffix: "+", label: "Jahre Erfahrung" },
  { value: 100, suffix: "%", label: "Diskret & Professionell" },
];

export const StatsSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-copper uppercase tracking-[0.3em] text-sm font-medium">
            Unsere Erfolge
          </span>
          <h2 className="text-3xl md:text-4xl font-display text-foreground mt-4">
            Vertrauen durch Ergebnisse
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="relative inline-block">
                <span className="text-5xl md:text-6xl font-display text-foreground group-hover:text-copper transition-colors duration-300">
                  <NumberCounter value={stat.value} duration={2} suffix={stat.suffix} />
                </span>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-copper/30 group-hover:w-full transition-all duration-300" />
              </div>
              <p className="text-muted-foreground mt-4 text-sm uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
