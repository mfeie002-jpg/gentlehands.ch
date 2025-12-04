import { motion } from "framer-motion";
import { Droplets } from "lucide-react";

interface Scent {
  name: string;
  description: string;
  mood: string;
  notes: string[];
  color: string;
}

const scents: Scent[] = [
  {
    name: "Lavendel & Bergamotte",
    description: "Beruhigend und ausgleichend – perfekt für stressige Zeiten.",
    mood: "Entspannung",
    notes: ["Lavendel", "Bergamotte", "Zedernholz"],
    color: "from-purple-200 to-purple-100",
  },
  {
    name: "Eukalyptus & Minze",
    description: "Erfrischend und klärend – befreit den Geist.",
    mood: "Klarheit",
    notes: ["Eukalyptus", "Pfefferminze", "Rosmarin"],
    color: "from-teal-200 to-teal-100",
  },
  {
    name: "Sandelholz & Vanille",
    description: "Warm und erdend – schafft Geborgenheit.",
    mood: "Wärme",
    notes: ["Sandelholz", "Vanille", "Amber"],
    color: "from-amber-200 to-amber-100",
  },
  {
    name: "Rose & Jasmin",
    description: "Blumig und herzöffnend – für emotionale Balance.",
    mood: "Harmonie",
    notes: ["Rose", "Jasmin", "Ylang-Ylang"],
    color: "from-pink-200 to-pink-100",
  },
  {
    name: "Zitrus & Ingwer",
    description: "Belebend und energetisierend – weckt die Sinne.",
    mood: "Energie",
    notes: ["Grapefruit", "Orange", "Ingwer"],
    color: "from-orange-200 to-orange-100",
  },
  {
    name: "Weihrauch & Myrrhe",
    description: "Meditativ und tiefgehend – für innere Einkehr.",
    mood: "Tiefe",
    notes: ["Weihrauch", "Myrrhe", "Patchouli"],
    color: "from-stone-300 to-stone-200",
  },
];

export const ScentGuide = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {scents.map((scent, index) => (
        <motion.div
          key={scent.name}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group"
        >
          <div className="h-full p-6 rounded-2xl bg-card border border-border hover:border-copper/30 hover:shadow-lg transition-all duration-300">
            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${scent.color} flex items-center justify-center mb-5`}>
              <Droplets size={28} className="text-foreground/60" />
            </div>
            
            <span className="text-xs font-medium text-copper uppercase tracking-wider">
              {scent.mood}
            </span>
            
            <h3 className="font-display text-xl text-foreground mt-2 mb-3">
              {scent.name}
            </h3>
            
            <p className="text-muted-foreground text-sm mb-4">
              {scent.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {scent.notes.map((note) => (
                <span
                  key={note}
                  className="px-2 py-1 text-xs bg-secondary rounded-full text-secondary-foreground"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
