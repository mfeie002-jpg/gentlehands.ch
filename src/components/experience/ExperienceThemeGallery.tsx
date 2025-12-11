import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Volume2, Sparkles, Palette } from 'lucide-react';
import { LazyImage } from '@/components/shared/LazyImage';
import { Button } from '@/components/ui/button';

// Import theme images
import themeOcean from '@/assets/theme-ocean.jpg';
import themeAlpine from '@/assets/theme-alpine.jpg';
import themeDark from '@/assets/theme-dark.jpg';
import themeUrban from '@/assets/theme-urban.jpg';
import themeZen from '@/assets/theme-zen.jpg';
import experienceSurprise from '@/assets/experience-surprise.jpg';

interface Theme {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  mood: string;
  sounds: string[];
  scent: string;
  color: string;
}

const themes: Theme[] = [
  {
    id: 'ozean',
    name: 'Ozean & Palmen',
    tagline: 'Urlaubsfeeling pur',
    description: 'Lassen Sie sich von sanftem Wellenrauschen und tropischen Düften in ferne Paradiese entführen.',
    image: themeOcean,
    mood: 'Entspannt & Leicht',
    sounds: ['Meeresrauschen', 'Tropische Vögel'],
    scent: 'Kokosnuss & Meeresbrise',
    color: 'from-blue-500/20 to-teal-500/20',
  },
  {
    id: 'alpine',
    name: 'Alpine Stille',
    tagline: 'Bergluft & Geborgenheit',
    description: 'Die Ruhe der Schweizer Berge in einem Raum – frische Luft, Holzduft und absolute Stille.',
    image: themeAlpine,
    mood: 'Geerdet & Sicher',
    sounds: ['Bergbach', 'Windstille'],
    scent: 'Zirbenholz & Bergkräuter',
    color: 'from-green-600/20 to-emerald-500/20',
  },
  {
    id: 'dark',
    name: 'Deep Dark Relax',
    tagline: 'Völlige Dunkelheit',
    description: 'Im Schutz der Dunkelheit können Sie vollständig loslassen – alle Sinne fokussiert auf die Berührung.',
    image: themeDark,
    mood: 'Tief & Geschützt',
    sounds: ['Tiefe Frequenzen', 'Stille'],
    scent: 'Sandelholz & Amber',
    color: 'from-slate-800/30 to-slate-900/30',
  },
  {
    id: 'urban',
    name: 'Urban Loft',
    tagline: 'Moderne Selbstfürsorge',
    description: 'Zeitgemässes Design trifft auf Entspannung – für die moderne Frau, die bewusst Zeit für sich nimmt.',
    image: themeUrban,
    mood: 'Modern & Bewusst',
    sounds: ['Soft Lounge', 'Ambient'],
    scent: 'Weisser Tee & Grapefruit',
    color: 'from-copper/20 to-amber-500/20',
  },
  {
    id: 'zen',
    name: 'Zen Garden',
    tagline: 'Japanische Ästhetik',
    description: 'Minimalistische Eleganz inspiriert von japanischen Gärten – Klarheit für Körper und Geist.',
    image: themeZen,
    mood: 'Klar & Zentriert',
    sounds: ['Bambusflöte', 'Koi-Teich'],
    scent: 'Grüner Tee & Lotus',
    color: 'from-stone-400/20 to-stone-500/20',
  },
  {
    id: 'surprise',
    name: 'Surprise Experience',
    tagline: 'Vertrauen Sie uns',
    description: 'Überlassen Sie die Gestaltung unseren Therapeut:innen – für eine intuitive, auf Sie abgestimmte Erfahrung.',
    image: experienceSurprise,
    mood: 'Überraschend & Intuitiv',
    sounds: ['Individuell'],
    scent: 'Nach Tagesform gewählt',
    color: 'from-purple-500/20 to-pink-500/20',
  },
];

export const ExperienceThemeGallery = () => {
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-copper/5 blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-primary/5 blur-[120px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, delay: 5 }}
        />
      </div>

      <div className="container-wide relative z-10">
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-copper/10 border border-copper/20 mb-6"
          >
            <Palette size={16} className="text-copper" />
            <span className="text-copper text-sm font-medium">Erlebnis-Welten</span>
          </motion.div>
          <h2 className="text-foreground mb-4">Wählen Sie Ihre Atmosphäre</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Jedes Erlebnis-Theme wurde sorgfältig gestaltet, um eine einzigartige Stimmung zu erschaffen. 
            Wählen Sie die Atmosphäre, die zu Ihrer aktuellen Sehnsucht passt.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {themes.map((theme, index) => (
            <motion.div
              key={theme.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredTheme(theme.id)}
              onMouseLeave={() => setHoveredTheme(null)}
              onClick={() => setSelectedTheme(selectedTheme?.id === theme.id ? null : theme)}
              className="group cursor-pointer"
            >
              <div className="relative rounded-2xl overflow-hidden bg-card">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <LazyImage
                    src={theme.image}
                    alt={theme.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${theme.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Mood Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: hoveredTheme === theme.id ? 1 : 0, y: hoveredTheme === theme.id ? 0 : -10 }}
                    className="absolute top-4 left-4"
                  >
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-sm text-xs font-medium text-foreground">
                      <Sparkles size={12} className="text-copper" />
                      {theme.mood}
                    </span>
                  </motion.div>
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <p className="text-copper text-xs sm:text-sm mb-1">{theme.tagline}</p>
                    <h3 className="font-display text-lg sm:text-xl text-white mb-2">{theme.name}</h3>
                    
                    {/* Expanded Info on Hover/Select */}
                    <AnimatePresence>
                      {(hoveredTheme === theme.id || selectedTheme?.id === theme.id) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <p className="text-white/80 text-xs sm:text-sm mb-3 line-clamp-2">
                            {theme.description}
                          </p>
                          
                          {/* Sound & Scent */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm text-[10px] sm:text-xs text-white/90">
                              <Volume2 size={10} />
                              {theme.sounds[0]}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm text-[10px] sm:text-xs text-white/90">
                              🌸 {theme.scent.split(' & ')[0]}
                            </span>
                          </div>
                          
                          <Button
                            variant="copper"
                            size="sm"
                            className="w-full group/btn"
                            asChild
                          >
                            <Link to={`/buchung?theme=${theme.id}`}>
                              Dieses Erlebnis wählen
                              <ArrowRight size={14} className="ml-2 transition-transform group-hover/btn:translate-x-1" />
                            </Link>
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10 sm:mt-12"
        >
          <Button variant="petrol-outline" size="lg" asChild>
            <Link to="/erlebnisse" className="group">
              Alle Erlebnisse entdecken
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
