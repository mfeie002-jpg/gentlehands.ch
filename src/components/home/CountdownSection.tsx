import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Clock, Calendar, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export const CountdownSection = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 12, minutes: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes } = prev;
        minutes--;
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          days--;
        }
        if (days < 0) {
          days = 3;
          hours = 12;
          minutes = 45;
        }
        return { days, hours, minutes };
      });
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-8 bg-gradient-to-r from-copper/10 via-copper/5 to-copper/10 border-y border-copper/20">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <ScrollReveal direction="left">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-copper/20 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-copper" />
              </div>
              <div>
                <p className="text-foreground font-medium">Nächste verfügbare Termine</p>
                <p className="text-muted-foreground text-sm">Buchen Sie jetzt, bevor sie vergeben sind</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                {[
                  { value: timeLeft.days, label: "Tage" },
                  { value: timeLeft.hours, label: "Std" },
                  { value: timeLeft.minutes, label: "Min" },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <motion.div
                      className="bg-card border border-copper/30 rounded-lg px-3 py-2 min-w-[50px]"
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span className="text-xl font-display text-copper">{item.value}</span>
                    </motion.div>
                    <span className="text-xs text-muted-foreground mt-1">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <Button variant="copper" size="lg" asChild>
              <Link to="/buchung" className="flex items-center gap-2">
                <Sparkles size={16} />
                Termin sichern
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
