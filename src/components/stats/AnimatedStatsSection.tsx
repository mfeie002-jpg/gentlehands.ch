import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, Users, Heart, Award, Clock, Star } from 'lucide-react';

interface Stat {
  id: string;
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  icon: React.ElementType;
  description: string;
  color: string;
}

const stats: Stat[] = [
  {
    id: 'satisfaction',
    label: 'Kundenzufriedenheit',
    value: 98,
    suffix: '%',
    icon: Heart,
    description: 'Unserer Kundinnen empfehlen uns weiter',
    color: 'copper',
  },
  {
    id: 'sessions',
    label: 'Behandlungen',
    value: 5000,
    suffix: '+',
    icon: TrendingUp,
    description: 'Erfolgreich durchgeführte Sessions',
    color: 'primary',
  },
  {
    id: 'clients',
    label: 'Zufriedene Kundinnen',
    value: 1200,
    suffix: '+',
    icon: Users,
    description: 'Frauen vertrauen uns regelmässig',
    color: 'forest',
  },
  {
    id: 'experience',
    label: 'Jahre Erfahrung',
    value: 12,
    suffix: '+',
    icon: Award,
    description: 'In professioneller Körperarbeit',
    color: 'copper',
  },
  {
    id: 'rating',
    label: 'Durchschnittliche Bewertung',
    value: 4.9,
    suffix: '/5',
    icon: Star,
    description: 'Basierend auf über 500 Bewertungen',
    color: 'copper',
  },
  {
    id: 'returnRate',
    label: 'Wiederbuchungsrate',
    value: 87,
    suffix: '%',
    icon: Clock,
    description: 'Unserer Kundinnen kommen wieder',
    color: 'primary',
  },
];

const AnimatedCounter = ({ 
  value, 
  duration = 2000,
  decimals = 0 
}: { 
  value: number; 
  duration?: number;
  decimals?: number;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(easeOutQuart * value);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString('de-CH')}
    </span>
  );
};

export const AnimatedStatsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-primary text-primary-foreground">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-copper/10 blur-[120px]"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-white/5 blur-[120px]"
          animate={{ scale: [1.3, 1, 1.3], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, delay: 5 }}
        />
        
        {/* Dot Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div ref={containerRef} className="container-wide relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-copper/20 border border-copper/30 mb-6"
          >
            <TrendingUp size={16} className="text-copper" />
            <span className="text-copper text-sm font-medium">Unsere Erfolge</span>
          </motion.div>
          <h2 className="text-primary-foreground mb-4">Zahlen, die für sich sprechen</h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto">
            Vertrauen Sie auf jahrelange Erfahrung und tausende zufriedene Kundinnen.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="text-center p-6 sm:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-copper/20 flex items-center justify-center mx-auto mb-4"
                >
                  <stat.icon size={24} className="text-copper" />
                </motion.div>

                {/* Value */}
                <div className="mb-2">
                  <span className="font-display text-3xl sm:text-4xl md:text-5xl text-primary-foreground">
                    {stat.prefix}
                    {isInView && (
                      <AnimatedCounter 
                        value={stat.value} 
                        decimals={stat.id === 'rating' ? 1 : 0}
                      />
                    )}
                    {stat.suffix}
                  </span>
                </div>

                {/* Label */}
                <h4 className="font-display text-sm sm:text-base text-primary-foreground mb-1">
                  {stat.label}
                </h4>
                <p className="text-xs sm:text-sm text-primary-foreground/60">
                  {stat.description}
                </p>

                {/* Hover Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, hsl(var(--copper) / 0.1), transparent 70%)`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Trust Line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-primary-foreground/50 text-sm">
            Stand: Dezember 2024 • Alle Angaben basieren auf internen Erhebungen
          </p>
        </motion.div>
      </div>
    </section>
  );
};
