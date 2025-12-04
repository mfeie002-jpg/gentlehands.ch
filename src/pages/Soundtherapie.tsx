import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { MusicPreview } from "@/components/shared/MusicPreview";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Music, Waves, Brain, Heart, Volume2, Headphones } from "lucide-react";

const soundOptions = [
  {
    icon: Waves,
    title: "Naturklänge",
    description: "Meeresrauschen, Waldgeräusche, Regentropfen – die Natur als Klangkulisse.",
  },
  {
    icon: Music,
    title: "Ambient Music",
    description: "Sanfte, fliessende Klänge ohne Melodie, die den Geist beruhigen.",
  },
  {
    icon: Heart,
    title: "Klangschalen",
    description: "Tibetische Klangschalen und Gongs für tiefe Entspannung.",
  },
  {
    icon: Volume2,
    title: "Stille",
    description: "Manchmal ist Stille die kraftvollste Klangkulisse.",
  },
];

const Soundtherapie = () => {
  return (
    <Layout>
      <Helmet>
        <title>Soundtherapie & Musik | GentleHands Zürich</title>
        <meta
          name="description"
          content="Die richtige Klangkulisse verstärkt Ihr Entspannungserlebnis. Entdecken Sie unsere Sound-Optionen von Naturklängen bis Stille."
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
              Klang & Entspannung
            </p>
            <h1 className="text-foreground mb-6">
              Soundtherapie bei GentleHands
            </h1>
            <p className="text-muted-foreground text-lg">
              Sound hat die Kraft, uns in andere Welten zu tragen. Bei GentleHands
              gestalten wir die Klangkulisse so individuell wie Ihr gesamtes Erlebnis.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sound Options */}
      <section className="section-padding-sm">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {soundOptions.map((option, index) => (
              <ScrollReveal key={option.title} delay={index * 0.1}>
                <div className="h-full p-6 rounded-2xl bg-card border border-border hover:border-copper/30 transition-colors text-center">
                  <div className="w-14 h-14 mx-auto rounded-xl bg-copper/10 flex items-center justify-center mb-4">
                    <option.icon size={28} className="text-copper" />
                  </div>
                  <h3 className="font-display text-lg text-foreground mb-2">
                    {option.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {option.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Sound */}
      <section className="section-padding bg-secondary/30">
        <div className="container-narrow">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-foreground mb-6">
                  Warum Sound so wichtig ist
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Unser Gehirn reagiert unmittelbar auf Klänge. Die richtigen Frequenzen 
                    können das Nervensystem beruhigen, den Herzschlag verlangsamen und 
                    uns in einen Zustand tiefer Entspannung führen.
                  </p>
                  <p>
                    Bei GentleHands nutzen wir dieses Wissen gezielt: Jedes unserer 
                    Themes hat eine eigene Soundlandschaft, die perfekt auf die 
                    Atmosphäre abgestimmt ist.
                  </p>
                  <p>
                    Und wenn Sie möchten, können Sie auch Ihre eigene Playlist 
                    mitbringen – wir haben dafür die perfekte Soundanlage.
                  </p>
                </div>
              </div>
              <div className="p-8 rounded-2xl bg-card">
                <Brain size={48} className="text-copper mb-6" />
                <h3 className="font-display text-xl text-foreground mb-4">
                  Wissenschaftlich belegt
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>• Naturklänge reduzieren Cortisol um bis zu 25%</li>
                  <li>• 432 Hz Musik fördert tiefe Entspannung</li>
                  <li>• Klangschalen aktivieren Alpha-Gehirnwellen</li>
                  <li>• Stille ermöglicht tiefste Körperwahrnehmung</li>
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Playlists */}
      <section className="section-padding">
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className="text-copper font-medium tracking-wide uppercase text-sm mb-4">
                Unsere Playlists
              </p>
              <h2 className="text-foreground mb-6">
                Hören Sie rein
              </h2>
              <p className="text-muted-foreground">
                Hier bekommen Sie einen kleinen Eindruck unserer kuratierten Playlists.
                Bei der Buchung können Sie Ihren Sound wählen.
              </p>
            </div>
          </ScrollReveal>

          <MusicPreview />
        </div>
      </section>

      {/* Personal Sound */}
      <section className="section-padding-sm bg-secondary/30">
        <div className="container-narrow">
          <ScrollReveal>
            <div className="text-center p-8 md:p-12 rounded-3xl bg-card border border-border">
              <Headphones size={48} className="mx-auto text-copper mb-6" />
              <h2 className="text-foreground mb-4">
                Ihre eigene Musik?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Sie haben eine Playlist, die Sie in tiefe Entspannung versetzt? 
                Bringen Sie sie mit! Unsere Soundanlage spielt sie in bester 
                Qualität ab – einfach per Bluetooth verbinden.
              </p>
              <Button variant="copper" size="lg" asChild>
                <Link to="/buchung">Jetzt Session buchen</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Soundtherapie;
