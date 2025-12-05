import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Award, Heart, Clock, Shield } from "lucide-react";

const stats = [
  { value: 98, suffix: "%", label: "Kundenzufriedenheit", icon: Heart, color: "from-rose-500/20 to-copper/20" },
  { value: 5000, suffix: "+", label: "Behandlungen", icon: Award, color: "from-copper/20 to-amber-500/20" },
  { value: 15, suffix: "+", label: "Jahre Erfahrung", icon: Clock, color: "from-petrol/20 to-teal-500/20" },
  { value: 100, suffix: "%", label: "Diskret & Professionell", icon: Shield, color: "from-emerald-500/20 to-petrol/20" },
];

const AnimatedNumber = ({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!inView) return;
    
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [inView, value]);
  
  return (
    <span className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

export const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      {/* Ambient glow effects */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-copper/5 rounded-full blur-[120px] -translate-y-1/2" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-petrol/5 rounded-full blur-[120px] -translate-y-1/2" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-copper/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
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
            Vertrauen durch <span className="text-gradient-copper">Ergebnisse</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group relative"
            >
              {/* Card background with gradient */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />
              
              <div className="relative glass rounded-2xl p-6 md:p-8 border border-border/30 group-hover:border-copper/30 transition-all duration-500 hover:-translate-y-2">
                {/* Icon */}
                <motion.div
                  className="w-14 h-14 mx-auto mb-6 rounded-xl bg-gradient-to-br from-copper/10 to-copper/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <stat.icon className="w-7 h-7 text-copper" />
                </motion.div>
                
                {/* Number with animated counter */}
                <div className="relative mb-4">
                  <motion.span 
                    className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground group-hover:text-copper transition-colors duration-500"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                  >
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} inView={isInView} />
                  </motion.span>
                  
                  {/* Glow effect on number */}
                  <div className="absolute inset-0 blur-2xl bg-copper/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                {/* Animated divider */}
                <motion.div 
                  className="w-12 h-0.5 bg-gradient-to-r from-copper/30 via-copper to-copper/30 mx-auto mb-4"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                />
                <div className="w-0 h-0.5 bg-copper mx-auto group-hover:w-20 transition-all duration-500" />
                
                {/* Label */}
                <p className="text-muted-foreground text-sm uppercase tracking-widest font-medium mt-4">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Bottom decorative element */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 flex justify-center"
        >
          <div className="flex items-center gap-3">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-copper/50" />
            <div className="w-2 h-2 rounded-full bg-copper/50" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-copper/50" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
