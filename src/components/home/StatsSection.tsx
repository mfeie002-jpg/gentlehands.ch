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
    <section className="py-24 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      {/* Ambient glow effects */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-copper/5 rounded-full blur-[120px] -translate-y-1/2" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-petrol/5 rounded-full blur-[120px] -translate-y-1/2" />
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div className="flex items-center justify-center gap-4 mb-4">
            <motion.div 
              className="h-px bg-gradient-to-r from-transparent via-copper to-transparent w-12"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
            <span className="text-copper uppercase tracking-[0.3em] text-xs font-medium">
              Unsere Erfolge
            </span>
            <motion.div 
              className="h-px bg-gradient-to-r from-transparent via-copper to-transparent w-12"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
          </motion.div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-foreground">
            Vertrauen durch Ergebnisse
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group relative"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-copper/0 group-hover:bg-copper/5 rounded-2xl blur-xl transition-all duration-500" />
              
              <div className="relative p-6">
                <div className="relative inline-block mb-4">
                  <span className="text-5xl md:text-6xl lg:text-7xl font-display text-foreground group-hover:text-gradient-copper transition-all duration-500">
                    <NumberCounter value={stat.value} duration={2} suffix={stat.suffix} />
                  </span>
                </div>
                <motion.div 
                  className="w-12 h-0.5 bg-gradient-to-r from-copper/30 via-copper to-copper/30 mx-auto mb-4 group-hover:w-20 transition-all duration-500"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                />
                <p className="text-muted-foreground text-sm uppercase tracking-widest font-medium">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
