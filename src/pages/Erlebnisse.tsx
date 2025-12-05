import { useState, useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Waves, Mountain, Moon, Building, Leaf, Sparkles, Check, ArrowRight, Play, Volume2 } from "lucide-react";
import { FloatingElements } from "@/components/shared/FloatingElements";
import { GlowCard } from "@/components/shared/GlowCard";

import massageOcean from "@/assets/massage-ocean-theme.jpg";
import massageAlpine from "@/assets/massage-alpine-theme.jpg";
import massageDark from "@/assets/massage-dark-theme.jpg";
import massageZen from "@/assets/massage-zen-theme.jpg";
import massageOverhead from "@/assets/massage-overhead-view.jpg";
import massageBack from "@/assets/massage-hands-back.jpg";

const themes = [
  {
    id: "ozean",
    icon: Waves,
    title: "Ozean & Palmen",
    subtitle: "Tropische Leichtigkeit",
    image: massageOcean,
    description:
      "Lassen Sie sich davontragen an einen warmen Strand bei Sonnenuntergang. Das sanfte Rauschen des Meeres, der Duft von Kokos und Sandelholz, warmes Licht – ein Kurzurlaub für Ihre Seele.",
    elements: [
      "Projektionen von Meer und Strand",
      "Sanftes Meeresrauschen im Hintergrund",
      "Düfte: Kokos, Sandelholz, Meeresbrise",
      "Warmes, goldenes Lichtambiente",
    ],
    idealFor: [
      "Sie sehnen sich nach Leichtigkeit",
      "Stress und Alltagssorgen loslassen",
      "Urlaubsgefühl ohne zu verreisen",
      "Wärme und Geborgenheit spüren",
    ],
    duration: "90 / 120 Min empfohlen",
    color: "from-petrol/20 to-petrol/5",
    iconColor: "text-petrol",
    bgAccent: "bg-petrol/10",
    gradientFrom: "petrol",
  },
  {
    id: "alpine",
    icon: Mountain,
    title: "Alpine Stille",
    subtitle: "Berghütten-Geborgenheit",
    image: massageAlpine,
    description:
      "Die Ruhe einer Berghütte nach einem langen Tag. Holzelemente, der Duft von frischen Kräutern und klarer Bergluft. Perfekt für alle, die Erdung und Naturverbundenheit suchen.",
    elements: [
      "Warme Holz-Atmosphäre",
      "Kaminfeuer-Lichtspiel (simuliert)",
      "Düfte: Holz, Kräuter, frische Luft",
      "Dezente Akustik-/Pianoklänge",
    ],
    idealFor: [
      "Naturverbundenheit ist Ihnen wichtig",
      "Sie brauchen Erdung und Stabilität",
      "Warme, gemütliche Atmosphäre gewünscht",
      "Tiefer Rückzug vom Alltag",
    ],
    duration: "90 / 120 Min empfohlen",
    color: "from-forest/20 to-forest/5",
    iconColor: "text-forest",
    bgAccent: "bg-forest/10",
    gradientFrom: "forest",
  },
  {
    id: "dark",
    icon: Moon,
    title: "Deep Dark Relax",
    subtitle: "Maximale Tiefe",
    image: massageDark,
    description:
      "Ein dunkler, geschützter Raum mit nur punktuellen, warmen Lichtquellen. Hier steht Ihr Körper im absoluten Fokus – ohne visuelle Ablenkung, für maximale Wahrnehmung.",
    elements: [
      "Nahezu vollständige Dunkelheit",
      "Vereinzelte, warme Lichtpunkte",
      "Minimale oder keine Musik",
      "Fokus auf Berührung und Atmung",
    ],
    idealFor: [
      "Mentale Überlastung/Reizüberflutung",
      "Sie wollen tief nach innen gehen",
      "Körperwahrnehmung intensivieren",
      "Maximale Entspannung des Nervensystems",
    ],
    duration: "90 / 120 Min empfohlen",
    color: "from-foreground/15 to-foreground/5",
    iconColor: "text-foreground",
    bgAccent: "bg-foreground/10",
    gradientFrom: "foreground",
  },
  {
    id: "urban",
    icon: Building,
    title: "Urban Loft",
    subtitle: "City-Wellness",
    image: massageOverhead,
    description:
      "Moderner, stylisher Loft-Vibe für die Frau, die sich etwas Besonderes gönnt. Industrial-Charme trifft auf Wärme und Wohlgefühl – urban, aber nie kalt.",
    elements: [
      "Industrial/Loft-Design-Elemente",
      "Dezente Chillout-/Ambient-Musik",
      "Klares, modernes Lichtdesign",
      "Stylish und gleichzeitig einladend",
    ],
    idealFor: [
      "Modernes Ambiente bevorzugt",
      "Design und Ästhetik sind wichtig",
      "Entspannung mit urbanem Flair",
      "«Me-Time» in stylisher Umgebung",
    ],
    duration: "60 / 90 Min empfohlen",
    color: "from-warm-gray/20 to-warm-gray/5",
    iconColor: "text-warm-gray",
    bgAccent: "bg-warm-gray/10",
    gradientFrom: "warm-gray",
  },
  {
    id: "zen",
    icon: Leaf,
    title: "Zen Garden",
    subtitle: "Asiatische Ruhe",
    image: massageZen,
    description:
      "Minimalistisch, asiatisch inspiriert – maximale Reduktion für maximale Ruhe. Klare Linien, wenig Dekoration, leichte Räuchernoten. Ein Ort der Stille.",
    elements: [
      "Minimalistisches, klares Design",
      "Leichte Räucher-/Tee-Noten",
      "Sehr reduzierte, meditative Klänge",
      "Natürliche Materialien",
    ],
    idealFor: [
      "Meditation und Achtsamkeit wichtig",
      "Weniger ist für Sie mehr",
      "Tiefe innere Ruhe gesucht",
      "Spirituell inspirierte Atmosphäre",
    ],
    duration: "90 / 120 Min empfohlen",
    color: "from-forest/20 to-forest/5",
    iconColor: "text-forest",
    bgAccent: "bg-forest/10",
    gradientFrom: "forest",
  },
  {
    id: "surprise",
    icon: Sparkles,
    title: "Surprise Experience",
    subtitle: "Vertrauen & Hingabe",
    image: massageBack,
    description:
      "Sie wählen nur Ihren groben Mood – leicht, tief oder emotionaler Reset. Alles andere überlassen Sie uns. Ein Akt des Vertrauens mit einem Erlebnis, das genau zu Ihnen passt.",
    elements: [
      "Intuitiv von unserem Team gestaltet",
      "Basierend auf Ihrem gewählten Mood",
      "Überraschende Elemente möglich",
      "Maximale Hingabe, minimale Kontrolle",
    ],
    idealFor: [
      "Entscheidungsmüdigkeit",
      "Lust auf Überraschung",
      "Vertrauen üben wollen",
      "Offen für Neues sein",
    ],
    duration: "90 / 120 Min empfohlen",
    color: "from-copper/20 to-copper/5",
    iconColor: "text-copper",
    bgAccent: "bg-copper/10",
    gradientFrom: "copper",
  },
];

const ThemeCard = ({ theme, index }: { theme: typeof themes[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      id={theme.id}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="scroll-mt-40"
    >
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
        {/* Image */}
        <div 
          className={`${index % 2 === 1 ? "lg:[direction:ltr]" : ""}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div 
            className="relative group cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <motion.img 
                src={theme.image} 
                alt={theme.title}
                className="w-full h-full object-cover"
                animate={{ scale: isHovered ? 1.1 : 1 }}
                transition={{ duration: 0.7 }}
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent"
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Play Preview Button */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
              >
                <motion.div
                  className="w-20 h-20 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center shadow-xl"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play size={32} className="text-copper ml-1" fill="currentColor" />
                </motion.div>
              </motion.div>
              
              {/* Sound Indicator */}
              <motion.div
                className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-2 rounded-full bg-background/80 backdrop-blur-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              >
                <Volume2 size={14} className="text-copper" />
                <span className="text-xs text-foreground">Ambiente anhören</span>
              </motion.div>
            </div>
            
            {/* Floating Badge */}
            <motion.div 
              className={`absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-full glass ${theme.bgAccent} shadow-lg`}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                animate={{ rotate: isHovered ? 360 : 0 }}
                transition={{ duration: 0.6 }}
              >
                <theme.icon size={18} className={theme.iconColor} />
              </motion.div>
              <span className="text-sm font-medium">{theme.subtitle}</span>
            </motion.div>
            
            {/* Glow Effect */}
            <motion.div
              className={`absolute -inset-4 rounded-[2rem] bg-gradient-to-r ${theme.color} opacity-0 blur-2xl -z-10`}
              animate={{ opacity: isHovered ? 0.5 : 0 }}
            />
          </motion.div>
        </div>

        {/* Content */}
        <div className={`${index % 2 === 1 ? "lg:[direction:ltr]" : ""}`}>
          <motion.div
            initial={{ opacity: 0, x: index % 2 === 1 ? -30 : 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className={`font-medium tracking-wide uppercase text-sm mb-2 ${theme.iconColor}`}>
              {theme.subtitle}
            </p>
            <h2 className="text-foreground mb-4">{theme.title}</h2>
            <div className="divider-copper mb-6" />
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
              {theme.description}
            </p>

            {/* Elements */}
            <GlowCard className="mb-8 p-6">
              <h4 className="font-display text-lg text-foreground mb-4 flex items-center gap-2">
                <Sparkles size={18} className="text-copper" />
                Das erwartet Sie:
              </h4>
              <ul className="space-y-3">
                {theme.elements.map((element, i) => (
                  <motion.li 
                    key={element} 
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <div className="mt-1">
                      <Check size={16} className="text-copper" />
                    </div>
                    <span className="text-muted-foreground">{element}</span>
                  </motion.li>
                ))}
              </ul>
            </GlowCard>

            {/* Ideal For */}
            <div className="mb-8 p-6 rounded-2xl bg-secondary/50 border border-border/50">
              <h4 className="font-display text-lg text-foreground mb-4">
                Ideal für Sie, wenn...
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {theme.idealFor.map((item, i) => (
                  <motion.li 
                    key={item} 
                    className="flex items-start gap-3"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.4 + i * 0.05 }}
                  >
                    <div className={`w-2 h-2 rounded-full ${theme.bgAccent} mt-2 shrink-0`} />
                    <span className="text-muted-foreground text-sm">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Duration & CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button variant="copper" size="lg" asChild className="group relative overflow-hidden">
                <Link to={`/buchung?theme=${theme.id}`}>
                  <span className="relative z-10 flex items-center gap-2">
                    Dieses Erlebnis buchen
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Button>
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-copper/50" />
                {theme.duration}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const Erlebnisse = () => {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const [activeTheme, setActiveTheme] = useState<string | null>(null);

  return (
    <Layout>
      <Helmet>
        <title>Erlebnisse & Themes | GentleHands Zürich</title>
        <meta
          name="description"
          content="Entdecken Sie unsere atmosphärischen Erlebnisse: Ozean & Palmen, Alpine Stille, Deep Dark Relax und mehr. Jedes Theme ein einzigartiges Entspannungserlebnis."
        />
      </Helmet>

      {/* Hero with Parallax */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <img src={massageBack} alt="GentleHands Erlebnisse" className="w-full h-full object-cover scale-110" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        </motion.div>
        
        {/* Ambient Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {themes.slice(0, 4).map((theme, i) => (
            <motion.div
              key={theme.id}
              className={`absolute w-64 h-64 rounded-full ${theme.bgAccent} blur-[100px]`}
              style={{
                top: `${20 + i * 15}%`,
                left: `${10 + i * 25}%`,
              }}
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ 
                duration: 6 + i * 2,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
        
        <FloatingElements variant="dots" />
        
        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-copper/10 border border-copper/20 mb-6 backdrop-blur-sm"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={16} className="text-copper" />
              </motion.div>
              <span className="text-copper text-sm font-medium">6 einzigartige Welten</span>
            </motion.div>
            
            <motion.h1 
              className="text-foreground mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="block">Wählen Sie</span>
              <span className="bg-gradient-to-r from-copper via-copper-light to-copper bg-clip-text text-transparent">
                Ihre Welt
              </span>
            </motion.h1>
            <motion.p 
              className="text-muted-foreground text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Jedes unserer Themes kreiert eine einzigartige Atmosphäre für Ihr
              Erlebnis – perfekt abgestimmt auf verschiedene Bedürfnisse und
              Stimmungen.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Theme Quick Nav */}
      <section className="py-8 border-b border-border/50 sticky top-16 z-30 bg-background/80 backdrop-blur-md">
        <div className="container-wide">
          <div className="flex flex-wrap justify-center gap-3">
            {themes.map((theme, i) => (
              <motion.a
                key={theme.id}
                href={`#${theme.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setActiveTheme(theme.id)}
                onMouseLeave={() => setActiveTheme(null)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${theme.bgAccent} hover:opacity-90 shadow-sm`}
              >
                <motion.div
                  animate={{ rotate: activeTheme === theme.id ? 360 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <theme.icon size={16} className={theme.iconColor} />
                </motion.div>
                <span className="hidden sm:inline">{theme.title}</span>
                
                {/* Active Indicator */}
                {activeTheme === theme.id && (
                  <motion.div
                    layoutId="activeThemeIndicator"
                    className="absolute inset-0 rounded-full border-2 border-copper"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Themes */}
      <section className="section-padding-sm relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 1px)`,
            backgroundSize: '48px 48px'
          }} />
        </div>
        
        <div className="container-wide space-y-32 relative">
          {themes.map((theme, index) => (
            <ThemeCard key={theme.id} theme={theme} index={index} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-copper/10 blur-[80px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-petrol/10 blur-[60px]"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>
        
        <div className="container-narrow text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-copper/20 to-primary/20 flex items-center justify-center"
            >
              <Sparkles size={32} className="text-copper" />
            </motion.div>
            
            <h2 className="text-foreground mb-6">
              Nicht sicher, welches Theme?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Kein Problem – wir beraten Sie gerne persönlich oder Sie wählen
              unsere Surprise Experience und überlassen die Entscheidung uns.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="copper" size="lg" className="group" asChild>
                <Link to="/kontakt">
                  Beratung anfragen
                  <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="petrol-outline" size="lg" asChild>
                <Link to="/buchung?theme=surprise">Surprise Experience</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Erlebnisse;