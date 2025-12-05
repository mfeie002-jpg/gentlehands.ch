import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Waves, Mountain, Moon, Building, Leaf, Sparkles, Check, ArrowRight } from "lucide-react";
import { FloatingElements } from "@/components/shared/FloatingElements";
import { GlowCard } from "@/components/shared/GlowCard";

import oceanImage from "@/assets/theme-ocean.jpg";
import alpineImage from "@/assets/theme-alpine.jpg";
import darkImage from "@/assets/theme-dark.jpg";
import urbanImage from "@/assets/theme-urban.jpg";
import zenImage from "@/assets/theme-zen.jpg";
import heroSpaRoom from "@/assets/hero-spa-room.jpg";

const themes = [
  {
    id: "ozean",
    icon: Waves,
    title: "Ozean & Palmen",
    subtitle: "Tropische Leichtigkeit",
    image: oceanImage,
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
  },
  {
    id: "alpine",
    icon: Mountain,
    title: "Alpine Stille",
    subtitle: "Berghütten-Geborgenheit",
    image: alpineImage,
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
  },
  {
    id: "dark",
    icon: Moon,
    title: "Deep Dark Relax",
    subtitle: "Maximale Tiefe",
    image: darkImage,
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
  },
  {
    id: "urban",
    icon: Building,
    title: "Urban Loft",
    subtitle: "City-Wellness",
    image: urbanImage,
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
  },
  {
    id: "zen",
    icon: Leaf,
    title: "Zen Garden",
    subtitle: "Asiatische Ruhe",
    image: zenImage,
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
  },
  {
    id: "surprise",
    icon: Sparkles,
    title: "Surprise Experience",
    subtitle: "Vertrauen & Hingabe",
    image: heroSpaRoom,
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
  },
];

const Erlebnisse = () => {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);

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
          <img src={heroSpaRoom} alt="GentleHands Erlebnisse" className="w-full h-full object-cover scale-110" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        </motion.div>
        
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-copper/10 border border-copper/20 mb-6"
            >
              <Sparkles size={16} className="text-copper" />
              <span className="text-copper text-sm font-medium">6 einzigartige Welten</span>
            </motion.div>
            
            <h1 className="text-foreground mb-6">
              Wählen Sie Ihre Welt
            </h1>
            <p className="text-muted-foreground text-lg">
              Jedes unserer Themes kreiert eine einzigartige Atmosphäre für Ihr
              Erlebnis – perfekt abgestimmt auf verschiedene Bedürfnisse und
              Stimmungen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Theme Quick Nav */}
      <section className="py-8 border-b border-border/50 sticky top-16 z-30 bg-background/80 backdrop-blur-md">
        <div className="container-wide">
          <div className="flex flex-wrap justify-center gap-3">
            {themes.map((theme) => (
              <motion.a
                key={theme.id}
                href={`#${theme.id}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${theme.bgAccent} hover:opacity-80`}
              >
                <theme.icon size={16} className={theme.iconColor} />
                <span className="hidden sm:inline">{theme.title}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Themes */}
      <section className="section-padding-sm">
        <div className="container-wide space-y-32">
          {themes.map((theme, index) => (
            <motion.div
              key={theme.id}
              id={theme.id}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="scroll-mt-40"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
                {/* Image */}
                <div className={`${index % 2 === 1 ? "lg:[direction:ltr]" : ""}`}>
                  <motion.div 
                    className="relative group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="aspect-[4/3] rounded-3xl overflow-hidden">
                      <img 
                        src={theme.image} 
                        alt={theme.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    
                    {/* Floating Badge */}
                    <motion.div 
                      className={`absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-full glass ${theme.bgAccent}`}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                    >
                      <theme.icon size={18} className={theme.iconColor} />
                      <span className="text-sm font-medium">{theme.subtitle}</span>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? "lg:[direction:ltr]" : ""}`}>
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 1 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
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
                      <h4 className="font-display text-lg text-foreground mb-4">
                        Das erwartet Sie:
                      </h4>
                      <ul className="space-y-3">
                        {theme.elements.map((element, i) => (
                          <motion.li 
                            key={element} 
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * i }}
                          >
                            <Check size={18} className="text-copper mt-0.5 shrink-0" />
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
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {theme.idealFor.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full ${theme.bgAccent} mt-2 shrink-0`} />
                            <span className="text-muted-foreground text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Duration & CTA */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <Button variant="copper" size="lg" asChild className="group">
                        <Link to={`/buchung?theme=${theme.id}`}>
                          Dieses Erlebnis buchen
                          <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                      <span className="text-sm text-muted-foreground">
                        {theme.duration}
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-b from-secondary/30 to-background">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles size={40} className="mx-auto mb-6 text-copper" />
            <h2 className="text-foreground mb-6">
              Nicht sicher, welches Theme?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Kein Problem – wir beraten Sie gerne persönlich oder Sie wählen
              unsere Surprise Experience und überlassen die Entscheidung uns.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="copper" size="lg" asChild>
                <Link to="/kontakt">Beratung anfragen</Link>
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