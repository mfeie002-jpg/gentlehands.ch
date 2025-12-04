import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Waves, Mountain, Moon, Building, Leaf, Sparkles } from "lucide-react";

const themes = [
  {
    id: "ozean",
    icon: Waves,
    title: "Ozean & Palmen",
    description:
      "Leichtigkeit und Wärme wie an einem tropischen Strand bei Sonnenuntergang.",
    color: "from-petrol/20 to-petrol/5",
    iconColor: "text-petrol",
  },
  {
    id: "alpine",
    icon: Mountain,
    title: "Alpine Stille",
    description:
      "Geborgenheit und klare Bergluft – wie in einer gemütlichen Berghütte.",
    color: "from-forest/20 to-forest/5",
    iconColor: "text-forest",
  },
  {
    id: "dark",
    icon: Moon,
    title: "Deep Dark Relax",
    description:
      "Tiefe Dunkelheit für maximalen Fokus auf Ihre Körperwahrnehmung.",
    color: "from-foreground/10 to-foreground/5",
    iconColor: "text-foreground",
  },
  {
    id: "urban",
    icon: Building,
    title: "Urban Loft",
    description:
      "Moderner City-Vibe – stylish, warm und ganz für Sie allein.",
    color: "from-warm-gray/20 to-warm-gray/5",
    iconColor: "text-warm-gray",
  },
  {
    id: "zen",
    icon: Leaf,
    title: "Zen Garden",
    description:
      "Minimalistisch und asiatisch inspiriert für tiefste Ruhe.",
    color: "from-forest/20 to-forest/5",
    iconColor: "text-forest",
  },
  {
    id: "surprise",
    icon: Sparkles,
    title: "Surprise Experience",
    description:
      "Vertrauen Sie uns – wir gestalten Ihr Erlebnis intuitiv nach Ihrem Mood.",
    color: "from-copper/20 to-copper/5",
    iconColor: "text-copper",
  },
];

export const ThemesPreviewSection = () => {
  return (
    <section className="section-padding">
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-copper font-medium tracking-wide uppercase text-sm mb-4">
            Atmosphärische Erlebnisse
          </p>
          <h2 className="text-foreground mb-4">Wählen Sie Ihr Theme</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Jedes Erlebnis wird durch eine einzigartige Atmosphäre geprägt –
            Licht, Düfte, Klänge und Ambiente perfekt abgestimmt.
          </p>
        </motion.div>

        {/* Themes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((theme, index) => (
            <motion.div
              key={theme.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                to={`/erlebnisse#${theme.id}`}
                className="group block h-full"
              >
                <div className="card-elevated p-8 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-copper/20">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${theme.color} flex items-center justify-center mb-6`}
                  >
                    <theme.icon size={28} className={theme.iconColor} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-display mb-3 text-foreground group-hover:text-primary transition-colors">
                    {theme.title}
                  </h3>
                  <p className="text-muted-foreground text-sm flex-1 mb-4">
                    {theme.description}
                  </p>

                  {/* Link */}
                  <div className="flex items-center gap-2 text-primary text-sm font-medium">
                    <span>Mehr erfahren</span>
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button variant="petrol-outline" size="lg" asChild>
            <Link to="/erlebnisse">
              Alle Erlebnisse entdecken
              <ArrowRight size={18} />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
