import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, Users, Heart, Award, Star, RotateCcw } from 'lucide-react';

interface Stat {
  id: string;
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  icon: React.ElementType;
  description: string;
}

const stats: Stat[] = [
  {
    id: 'satisfaction',
    label: 'Kundenzufriedenheit',
    value: 98,
    suffix: '%',
    icon: Heart,
    description: 'empfehlen uns weiter',
  },
  {
    id: 'sessions',
    label: 'Behandlungen',
    value: 5000,
    suffix: '+',
    icon: TrendingUp,
    description: 'durchgeführte Sessions',
  },
  {
    id: 'clients',
    label: 'Kundinnen',
    value: 1200,
    suffix: '+',
    icon: Users,
    description: 'vertrauen uns',
  },
  {
    id: 'experience',
    label: 'Jahre Erfahrung',
    value: 12,
    suffix: '',
    icon: Award,
    description: 'in Körperarbeit',
  },
  {
    id: 'rating',
    label: 'Bewertung',
    value: 4.9,
    suffix: '/5',
    icon: Star,
    description: 'bei 500+ Reviews',
  },
  {
    id: 'returnRate',
    label: 'Wiederbuchung',
    value: 87,
    suffix: '%',
    icon: RotateCcw,
    description: 'kommen wieder',
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
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
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
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  return (
    <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/95">
      {/* Background Effects - Optimized */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-copper/10 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-white/5 blur-[100px]" />
      </div>

      <div ref={containerRef} className="container-wide relative z-10 px-4 sm:px-6">
        {/* Header - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-copper/20 border border-copper/30 text-copper text-xs font-medium mb-4">
            <TrendingUp size={14} />
            Unsere Erfolge
          </span>
          <h2 className="text-primary-foreground text-2xl sm:text-3xl md:text-4xl font-display">
            Zahlen, die für sich sprechen
          </h2>
        </motion.div>

        {/* Stats Grid - Optimized for Mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group"
            >
              <div className="text-center p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-copper/30 transition-all duration-300 h-full">
                {/* Icon */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-copper/20 flex items-center justify-center mx-auto mb-3">
                  <stat.icon size={18} className="sm:w-5 sm:h-5 text-copper" />
                </div>

                {/* Value */}
                <div className="mb-1">
                  <span className="font-display text-2xl sm:text-3xl md:text-4xl text-primary-foreground tabular-nums">
                    {stat.prefix}
                    {isInView && (
                      <AnimatedCounter 
                        value={stat.value} 
                        decimals={stat.id === 'rating' ? 1 : 0}
                        duration={1500}
                      />
                    )}
                    {stat.suffix}
                  </span>
                </div>

                {/* Label */}
                <h4 className="font-medium text-xs sm:text-sm text-primary-foreground/90 mb-0.5">
                  {stat.label}
                </h4>
                <p className="text-[10px] sm:text-xs text-primary-foreground/50 leading-tight">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-6 sm:mt-8 text-primary-foreground/40 text-xs"
        >
          Stand: Dezember 2024
        </motion.p>
      </div>
    </section>
  );
};
