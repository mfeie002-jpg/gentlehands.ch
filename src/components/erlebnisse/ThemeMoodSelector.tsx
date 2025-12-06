import { motion } from "framer-motion";
import { Sun, Moon, Zap, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const moods = [
  {
    icon: Sun,
    title: "Leichtigkeit",
    description: "Ich möchte mich federleicht fühlen",
    themes: ["Ozean & Palmen", "Urban Loft"],
    color: "from-amber-500/20 to-orange-500/20",
  },
  {
    icon: Moon,
    title: "Tiefe Ruhe",
    description: "Ich brauche völlige Stille",
    themes: ["Deep Dark Relax", "Zen Garden"],
    color: "from-slate-500/20 to-indigo-500/20",
  },
  {
    icon: Zap,
    title: "Erdung",
    description: "Ich fühle mich entwurzelt",
    themes: ["Alpine Stille", "Zen Garden"],
    color: "from-emerald-500/20 to-teal-500/20",
  },
  {
    icon: Heart,
    title: "Überraschung",
    description: "Ich möchte mich überraschen lassen",
    themes: ["Surprise Experience"],
    color: "from-rose-500/20 to-pink-500/20",
  },
];

export const ThemeMoodSelector = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-foreground mb-4">Nicht sicher, welches Theme?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Wählen Sie Ihren aktuellen Mood – wir empfehlen das passende Erlebnis
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {moods.map((mood, index) => (
            <motion.div
              key={mood.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`p-6 rounded-2xl bg-gradient-to-br ${mood.color} border border-border/50 cursor-pointer group`}
            >
              <motion.div
                className="w-12 h-12 mb-4 rounded-xl bg-background/50 flex items-center justify-center"
                whileHover={{ rotate: 15 }}
              >
                <mood.icon size={24} className="text-copper" />
              </motion.div>
              <h3 className="font-display text-lg text-foreground mb-2">{mood.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{mood.description}</p>
              <div className="flex flex-wrap gap-1">
                {mood.themes.map((theme) => (
                  <span
                    key={theme}
                    className="text-xs px-2 py-1 rounded-full bg-background/50 text-foreground"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="copper" size="lg" asChild>
            <Link to="/quiz">
              Quiz starten für persönliche Empfehlung
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
