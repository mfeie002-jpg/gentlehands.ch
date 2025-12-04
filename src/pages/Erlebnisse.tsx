import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Waves, Mountain, Moon, Building, Leaf, Sparkles, Music, Wind, Droplets, Check } from "lucide-react";

const themes = [
  {
    id: "ozean",
    icon: Waves,
    title: "Ozean & Palmen",
    subtitle: "Tropische Leichtigkeit",
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
    bgAccent: "bg-petrol/5",
  },
  {
    id: "alpine",
    icon: Mountain,
    title: "Alpine Stille",
    subtitle: "Berghütten-Geborgenheit",
    description:
      "Die Ruhe einer Berghütte nach einem langen Tag. Holzelemente, der Duft von frischen Kräutern und klarer Bergluft. Perfekt für alle, die Erdung und Naturverbundenheit suchen.",
    elements: [
      "Warme Holz-Atmosphäre",
      "Kaminfeuer-Lichtspiel (simuliert)",
      "Düfte: Holz, Kräuter, frische Luft",
      "Dezente Akustik-/Pianokläng",
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
    bgAccent: "bg-forest/5",
  },
  {
    id: "dark",
    icon: Moon,
    title: "Deep Dark Relax",
    subtitle: "Maximale Tiefe",
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
    bgAccent: "bg-foreground/5",
  },
  {
    id: "urban",
    icon: Building,
    title: "Urban Loft",
    subtitle: "City-Wellness",
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
    bgAccent: "bg-warm-gray/5",
  },
  {
    id: "zen",
    icon: Leaf,
    title: "Zen Garden",
    subtitle: "Asiatische Ruhe",
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
    bgAccent: "bg-forest/5",
  },
  {
    id: "surprise",
    icon: Sparkles,
    title: "Surprise Experience",
    subtitle: "Vertrauen & Hingabe",
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
    bgAccent: "bg-copper/5",
  },
];

const Erlebnisse = () => {
  return (
    <Layout>
      <Helmet>
        <title>Erlebnisse & Themes | GentleHands Zürich</title>
        <meta
          name="description"
          content="Entdecken Sie unsere atmosphärischen Erlebnisse: Ozean & Palmen, Alpine Stille, Deep Dark Relax und mehr. Jedes Theme ein einzigartiges Entspannungserlebnis."
        />
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-copper font-medium tracking-wide uppercase text-sm mb-4">
              Atmosphärische Erlebnisse
            </p>
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

      {/* Themes */}
      <section className="section-padding-sm">
        <div className="container-wide space-y-24">
          {themes.map((theme, index) => (
            <motion.div
              key={theme.id}
              id={theme.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`scroll-mt-32 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
                {/* Visual */}
                <div className={`${index % 2 === 1 ? "lg:[direction:ltr]" : ""}`}>
                  <div className={`aspect-[4/3] rounded-3xl ${theme.bgAccent} relative overflow-hidden`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-8">
                        <div className={`w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${theme.color} flex items-center justify-center`}>
                          <theme.icon size={48} className={theme.iconColor} />
                        </div>
                        <p className="text-muted-foreground text-sm">
                          [Platzhalter: Atmosphärisches Bild für {theme.title}]
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? "lg:[direction:ltr]" : ""}`}>
                  <p className={`font-medium tracking-wide uppercase text-sm mb-2 ${theme.iconColor}`}>
                    {theme.subtitle}
                  </p>
                  <h2 className="text-foreground mb-4">{theme.title}</h2>
                  <div className="divider-copper mb-6" />
                  <p className="text-muted-foreground mb-8">
                    {theme.description}
                  </p>

                  {/* Elements */}
                  <div className="mb-8">
                    <h4 className="font-display text-lg text-foreground mb-4">
                      Das erwartet Sie:
                    </h4>
                    <ul className="space-y-2">
                      {theme.elements.map((element) => (
                        <li key={element} className="flex items-start gap-3">
                          <Check size={18} className="text-copper mt-0.5 shrink-0" />
                          <span className="text-muted-foreground text-sm">{element}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Ideal For */}
                  <div className="mb-8 p-6 rounded-2xl bg-secondary/50">
                    <h4 className="font-display text-lg text-foreground mb-4">
                      Ideal für Sie, wenn...
                    </h4>
                    <ul className="space-y-2">
                      {theme.idealFor.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-copper mt-2 shrink-0" />
                          <span className="text-muted-foreground text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Duration & CTA */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <Button variant="copper" size="lg" asChild>
                      <Link to={`/buchung?theme=${theme.id}`}>
                        Dieses Erlebnis buchen
                      </Link>
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      {theme.duration}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
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
