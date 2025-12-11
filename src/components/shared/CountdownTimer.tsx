import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Flame, Gift, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface CountdownTimerProps {
  targetDate: Date;
  title?: string;
  description?: string;
  offerText?: string;
  ctaText?: string;
  ctaLink?: string;
  variant?: "banner" | "card" | "minimal";
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TimeUnit = ({ value, label, variant }: { value: number; label: string; variant: string }) => {
  const [prevValue, setPrevValue] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (value !== prevValue) {
      setIsFlipping(true);
      const timer = setTimeout(() => {
        setPrevValue(value);
        setIsFlipping(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [value, prevValue]);

  const size = variant === "minimal" ? "small" : "normal";

  return (
    <div className="flex flex-col items-center">
      <div className={`relative ${size === "small" ? "w-14 h-14" : "w-16 h-16 sm:w-20 sm:h-20"}`}>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={value}
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: 90, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`absolute inset-0 flex items-center justify-center rounded-xl bg-gradient-to-b from-card to-card/80 border border-border/50 shadow-lg ${
              isFlipping ? "animate-pulse" : ""
            }`}
            style={{ transformStyle: "preserve-3d" }}
          >
            <span className={`font-bold text-foreground ${size === "small" ? "text-xl" : "text-2xl sm:text-3xl"}`}>
              {String(value).padStart(2, "0")}
            </span>
          </motion.div>
        </AnimatePresence>
        
        {/* Reflection effect */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-copper/5 to-transparent rounded-b-xl pointer-events-none" />
      </div>
      <span className={`text-muted-foreground mt-2 ${size === "small" ? "text-xs" : "text-xs sm:text-sm"}`}>
        {label}
      </span>
    </div>
  );
};

export const CountdownTimer = ({
  targetDate,
  title = "Limitiertes Angebot",
  description = "Sichern Sie sich jetzt Ihren exklusiven Vorteil",
  offerText = "20% Rabatt auf alle Massagen",
  ctaText = "Jetzt buchen",
  ctaLink = "/buchung",
  variant = "card",
}: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference <= 0) {
        setIsExpired(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (isExpired) return null;

  if (variant === "minimal") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-4 p-4 rounded-2xl bg-card/50 border border-copper/20"
      >
        <Clock className="w-5 h-5 text-copper" />
        <div className="flex gap-3">
          <TimeUnit value={timeLeft.days} label="Tage" variant="minimal" />
          <span className="text-2xl text-muted-foreground self-start mt-3">:</span>
          <TimeUnit value={timeLeft.hours} label="Std" variant="minimal" />
          <span className="text-2xl text-muted-foreground self-start mt-3">:</span>
          <TimeUnit value={timeLeft.minutes} label="Min" variant="minimal" />
        </div>
      </motion.div>
    );
  }

  if (variant === "banner") {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-copper/20 via-copper/10 to-copper/20 border-y border-copper/30"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Flame className="w-6 h-6 text-copper" />
              </motion.div>
              <div>
                <p className="font-semibold text-foreground">{offerText}</p>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex gap-2">
                {[
                  { value: timeLeft.days, label: "T" },
                  { value: timeLeft.hours, label: "S" },
                  { value: timeLeft.minutes, label: "M" },
                  { value: timeLeft.seconds, label: "S" },
                ].map((unit, i) => (
                  <div key={i} className="text-center">
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-card border border-border/50">
                      <span className="font-bold text-foreground">{String(unit.value).padStart(2, "0")}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">{unit.label}</span>
                  </div>
                ))}
              </div>
              
              <Button variant="copper" size="sm" asChild>
                <Link to={ctaLink}>{ctaText}</Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Card variant (default)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative overflow-hidden"
    >
      <div className="glass rounded-3xl p-8 md:p-10 border border-copper/20 relative">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-0 right-0 w-64 h-64 bg-copper/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute bottom-0 left-0 w-48 h-48 bg-petrol/10 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-copper/10 border border-copper/30 mb-4"
            >
              <Gift className="w-4 h-4 text-copper" />
              <span className="text-sm font-medium text-copper">{title}</span>
            </motion.div>
            
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              {offerText}
            </h3>
            <p className="text-muted-foreground">{description}</p>
          </div>

          {/* Countdown */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8">
            <TimeUnit value={timeLeft.days} label="Tage" variant="card" />
            <span className="text-2xl sm:text-3xl text-copper font-light mt-[-20px]">:</span>
            <TimeUnit value={timeLeft.hours} label="Stunden" variant="card" />
            <span className="text-2xl sm:text-3xl text-copper font-light mt-[-20px]">:</span>
            <TimeUnit value={timeLeft.minutes} label="Minuten" variant="card" />
            <span className="text-2xl sm:text-3xl text-copper font-light mt-[-20px]">:</span>
            <TimeUnit value={timeLeft.seconds} label="Sekunden" variant="card" />
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button variant="copper" size="lg" asChild className="shadow-copper">
              <Link to={ctaLink}>
                <Sparkles className="w-4 h-4 mr-2" />
                {ctaText}
              </Link>
            </Button>
          </div>

          {/* Urgency indicator */}
          {timeLeft.days < 3 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-sm text-copper mt-4 flex items-center justify-center gap-2"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                🔥
              </motion.span>
              Nur noch {timeLeft.days === 0 ? "wenige Stunden" : `${timeLeft.days} Tage`} verfügbar!
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
};
