import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { MusicPreview } from "@/components/shared/MusicPreview";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { GlowCard } from "@/components/shared/GlowCard";
import { Music, Waves, Brain, Heart, Volume2, Headphones, Play, Pause, ArrowRight } from "lucide-react";

const soundOptions = [
  {
    icon: Waves,
    title: "Naturklänge",
    description: "Meeresrauschen, Waldgeräusche, Regentropfen – die Natur als Klangkulisse.",
    color: "from-cyan-500/20 to-blue-500/20",
    waveColor: "#06B6D4",
  },
  {
    icon: Music,
    title: "Ambient Music",
    description: "Sanfte, fliessende Klänge ohne Melodie, die den Geist beruhigen.",
    color: "from-purple-500/20 to-indigo-500/20",
    waveColor: "#8B5CF6",
  },
  {
    icon: Heart,
    title: "Klangschalen",
    description: "Tibetische Klangschalen und Gongs für tiefe Entspannung.",
    color: "from-amber-500/20 to-orange-500/20",
    waveColor: "#F59E0B",
  },
  {
    icon: Volume2,
    title: "Stille",
    description: "Manchmal ist Stille die kraftvollste Klangkulisse.",
    color: "from-gray-500/20 to-slate-500/20",
    waveColor: "#64748B",
  },
];

const scienceFacts = [
  { text: "Naturklänge reduzieren Cortisol um bis zu 25%", icon: "🌿" },
  { text: "432 Hz Musik fördert tiefe Entspannung", icon: "🎵" },
  { text: "Klangschalen aktivieren Alpha-Gehirnwellen", icon: "🧠" },
  { text: "Stille ermöglicht tiefste Körperwahrnehmung", icon: "🤫" },
];

// Sound wave animation component
const SoundWave = ({ color, isPlaying }: { color: string; isPlaying: boolean }) => (
  <div className="flex items-center justify-center gap-1 h-8">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className="w-1 rounded-full"
        style={{ backgroundColor: color }}
        animate={isPlaying ? {
          height: [8, 24, 8],
        } : { height: 8 }}
        transition={{
          duration: 0.5,
          repeat: isPlaying ? Infinity : 0,
          delay: i * 0.1,
        }}
      />
    ))}
  </div>
);

const Soundtherapie = () => {
  const [playingSound, setPlayingSound] = useState<string | null>(null);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

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
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
        {/* Animated sound waves background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 rounded-full border border-copper/10"
              style={{
                width: 200 + i * 150,
                height: 200 + i * 150,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        <div className="container-wide relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-copper/20 to-copper/5 flex items-center justify-center relative"
            >
              <Music size={40} className="text-copper" />
              {/* Animated rings */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-copper/30"
                animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-copper font-medium tracking-wide uppercase text-sm mb-4"
            >
              Klang & Entspannung
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-foreground mb-6"
            >
              <span className="bg-gradient-to-r from-foreground via-copper to-foreground bg-clip-text text-transparent">
                Soundtherapie
              </span>{" "}
              bei GentleHands
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground text-lg"
            >
              Sound hat die Kraft, uns in andere Welten zu tragen. Bei GentleHands
              gestalten wir die Klangkulisse so individuell wie Ihr gesamtes Erlebnis.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Sound Options */}
      <section className="section-padding-sm relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,hsl(var(--copper)/0.03),transparent_50%)]" />
        <div className="container-wide relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {soundOptions.map((option, index) => (
              <ScrollReveal key={option.title} delay={index * 0.1}>
                <GlowCard className="h-full" glowColor="copper">
                  <motion.div 
                    className="h-full p-6 text-center"
                    onMouseEnter={() => setHoveredOption(option.title)}
                    onMouseLeave={() => setHoveredOption(null)}
                    whileHover={{ y: -5 }}
                  >
                    <motion.div 
                      className={`w-16 h-16 mx-auto rounded-xl bg-gradient-to-br ${option.color} flex items-center justify-center mb-4 relative cursor-pointer`}
                      whileHover={{ scale: 1.1 }}
                      onClick={() => setPlayingSound(playingSound === option.title ? null : option.title)}
                    >
                      <AnimatePresence mode="wait">
                        {playingSound === option.title ? (
                          <motion.div
                            key="pause"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                          >
                            <Pause size={28} className="text-copper" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="icon"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                          >
                            <option.icon size={28} className="text-copper" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      {/* Play indicator */}
                      {playingSound === option.title && (
                        <motion.div
                          className="absolute -top-1 -right-1 w-4 h-4 bg-copper rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                        />
                      )}
                    </motion.div>
                    
                    {/* Sound wave visualization */}
                    <div className="h-10 flex items-center justify-center mb-3">
                      <SoundWave 
                        color={option.waveColor} 
                        isPlaying={playingSound === option.title || hoveredOption === option.title} 
                      />
                    </div>
                    
                    <h3 className="font-display text-lg text-foreground mb-2">
                      {option.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {option.description}
                    </p>
                  </motion.div>
                </GlowCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Sound */}
      <section className="section-padding bg-secondary/30 relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-copper/20 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>
        
        <div className="container-narrow relative">
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
              
              <GlowCard glowColor="copper">
                <div className="p-8">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Brain size={48} className="text-copper mb-6" />
                  </motion.div>
                  <h3 className="font-display text-xl text-foreground mb-4">
                    Wissenschaftlich belegt
                  </h3>
                  <ul className="space-y-4">
                    {scienceFacts.map((fact, index) => (
                      <motion.li 
                        key={fact.text}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 text-sm text-muted-foreground"
                      >
                        <span className="text-lg">{fact.icon}</span>
                        <span>{fact.text}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </GlowCard>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Playlists */}
      <section className="section-padding relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--petrol)/0.05),transparent_70%)]" />
        <div className="container-wide relative">
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
            <GlowCard glowColor="copper">
              <motion.div 
                className="text-center p-8 md:p-12"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  animate={{ 
                    y: [0, -5, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Headphones size={48} className="mx-auto text-copper mb-6" />
                </motion.div>
                <h2 className="text-foreground mb-4">
                  Ihre eigene Musik?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  Sie haben eine Playlist, die Sie in tiefe Entspannung versetzt? 
                  Bringen Sie sie mit! Unsere Soundanlage spielt sie in bester 
                  Qualität ab – einfach per Bluetooth verbinden.
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="copper" size="lg" asChild>
                    <Link to="/buchung">
                      Jetzt Session buchen
                      <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </GlowCard>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Soundtherapie;