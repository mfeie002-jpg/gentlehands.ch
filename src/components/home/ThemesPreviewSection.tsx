import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowRight, Waves, Mountain, Moon, Building, Leaf, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { useRef, MouseEvent } from "react";

const themes = [
  {
    id: "ozean",
    icon: Waves,
    title: "Ozean & Palmen",
    description:
      "Leichtigkeit und Wärme wie an einem tropischen Strand bei Sonnenuntergang.",
    color: "from-petrol/20 to-petrol/5",
    iconColor: "text-petrol",
    glowColor: "185 45% 28%",
  },
  {
    id: "alpine",
    icon: Mountain,
    title: "Alpine Stille",
    description:
      "Geborgenheit und klare Bergluft – wie in einer gemütlichen Berghütte.",
    color: "from-forest/20 to-forest/5",
    iconColor: "text-forest",
    glowColor: "150 30% 25%",
  },
  {
    id: "dark",
    icon: Moon,
    title: "Deep Dark Relax",
    description:
      "Tiefe Dunkelheit für maximalen Fokus auf Ihre Körperwahrnehmung.",
    color: "from-foreground/10 to-foreground/5",
    iconColor: "text-foreground",
    glowColor: "30 20% 12%",
  },
  {
    id: "urban",
    icon: Building,
    title: "Urban Loft",
    description:
      "Moderner City-Vibe – stylish, warm und ganz für Sie allein.",
    color: "from-warm-gray/20 to-warm-gray/5",
    iconColor: "text-warm-gray",
    glowColor: "30 12% 45%",
  },
  {
    id: "zen",
    icon: Leaf,
    title: "Zen Garden",
    description:
      "Minimalistisch und asiatisch inspiriert für tiefste Ruhe.",
    color: "from-forest/20 to-forest/5",
    iconColor: "text-forest",
    glowColor: "150 30% 25%",
  },
  {
    id: "surprise",
    icon: Sparkles,
    title: "Surprise Experience",
    description:
      "Vertrauen Sie uns – wir gestalten Ihr Erlebnis intuitiv nach Ihrem Mood.",
    color: "from-copper/20 to-copper/5",
    iconColor: "text-copper",
    glowColor: "25 50% 55%",
  },
];

const ThemeCard = ({ theme, index }: { theme: typeof themes[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const background = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, hsl(${theme.glowColor} / 0.08), transparent 80%)`;

  return (
    <ScrollReveal direction="up" delay={index * 0.1}>
      <Link to={`/erlebnisse#${theme.id}`} className="group block h-full">
        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          className="relative card-elevated p-8 h-full flex flex-col transition-all duration-500 hover:-translate-y-2 border border-transparent hover:border-copper/20 overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Glow Effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background }}
          />

          {/* Icon */}
          <motion.div
            className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${theme.color} flex items-center justify-center mb-6`}
            whileHover={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.5 }}
          >
            <theme.icon size={28} className={theme.iconColor} />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>

          {/* Content */}
          <h3 className="relative text-xl font-display mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
            {theme.title}
          </h3>
          <p className="relative text-muted-foreground text-sm flex-1 mb-4 leading-relaxed">
            {theme.description}
          </p>

          {/* Link */}
          <div className="relative flex items-center gap-2 text-primary text-sm font-medium">
            <span className="animated-underline">Mehr erfahren</span>
            <motion.div
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
            >
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </ScrollReveal>
  );
};

export const ThemesPreviewSection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent pointer-events-none" />
      
      <div className="container-wide relative">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <motion.div className="flex items-center justify-center gap-4 mb-6">
            <motion.div 
              className="h-px bg-copper/30 w-16"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
            <p className="text-copper font-medium tracking-[0.2em] uppercase text-xs">
              Atmosphärische Erlebnisse
            </p>
            <motion.div 
              className="h-px bg-copper/30 w-16"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
          </motion.div>
          <h2 className="text-foreground mb-4">Wählen Sie Ihr Theme</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Jedes Erlebnis wird durch eine einzigartige Atmosphäre geprägt –
            Licht, Düfte, Klänge und Ambiente perfekt abgestimmt.
          </p>
        </ScrollReveal>

        {/* Themes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((theme, index) => (
            <ThemeCard key={theme.id} theme={theme} index={index} />
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal direction="up" delay={0.4} className="text-center mt-12">
          <Button variant="petrol-outline" size="lg" asChild className="group">
            <Link to="/erlebnisse">
              Alle Erlebnisse entdecken
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
};
