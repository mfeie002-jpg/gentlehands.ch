import { AnimatedCounter } from "./AnimatedCounter";
import { ScrollReveal } from "./ScrollReveal";

const stats = [
  { end: 2500, suffix: "+", label: "Zufriedene Kundinnen" },
  { end: 12, suffix: "+", label: "Jahre Erfahrung" },
  { end: 98, suffix: "%", label: "Wiederbuchungsrate" },
  { end: 4.9, suffix: "/5", label: "Durchschnittliche Bewertung", prefix: "" },
];

export const StatsSection = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-petrol to-petrol-dark">
      <div className="container-wide">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-copper-light font-medium tracking-wide uppercase text-sm mb-4">
              Vertrauen & Qualität
            </p>
            <h2 className="text-primary-foreground">
              Zahlen, die für sich sprechen
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-4xl md:text-5xl lg:text-6xl text-copper-light mb-2">
                <AnimatedCounter
                  end={stat.end}
                  suffix={stat.suffix}
                  prefix={stat.prefix || ""}
                  label=""
                  duration={2 + index * 0.3}
                />
              </div>
              <p className="text-primary-foreground/80 text-sm md:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
