import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Music, Volume2, Waves, Wind, Bell, Sparkles } from "lucide-react";

const playlists = [
  { name: "Ozean Sounds", description: "Sanfte Wellen & Meeresrauschen", duration: "∞ Loop" },
  { name: "Alpine Ruhe", description: "Bergbach & Vogelgesang", duration: "∞ Loop" },
  { name: "Deep Frequencies", description: "Binaurale Beats & Stille", duration: "∞ Loop" },
  { name: "Zen Meditation", description: "Klangschalen & Bambusflöte", duration: "∞ Loop" },
];

export const MusicPreviewSection = () => {
  return (
    <section className="py-12 bg-petrol/5 border-y border-petrol/10">
      <div className="container-wide">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <ScrollReveal direction="left" className="lg:w-1/3">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-petrol/15 flex items-center justify-center">
                <Music className="w-6 h-6 text-petrol" />
              </div>
              <div>
                <span className="text-petrol text-xs font-medium uppercase tracking-wider">Soundscapes</span>
                <h3 className="text-xl font-display text-foreground">Klang für Ihre Seele</h3>
              </div>
            </div>
            <p className="text-muted-foreground">
              Jeder Raum hat seine eigene akustische Atmosphäre – oder Sie wählen Stille.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="right" className="lg:w-2/3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {playlists.map((playlist, index) => (
                <motion.div
                  key={playlist.name}
                  className="bg-card/50 rounded-xl p-4 border border-border/50 hover:border-petrol/30 transition-all group cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-petrol/10 flex items-center justify-center group-hover:bg-petrol/20 transition-colors">
                      <Volume2 size={14} className="text-petrol" />
                    </div>
                    <motion.div
                      className="flex gap-0.5"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-0.5 bg-petrol/50 rounded-full" style={{ height: `${8 + i * 4}px` }} />
                      ))}
                    </motion.div>
                  </div>
                  <p className="text-foreground text-sm font-medium">{playlist.name}</p>
                  <p className="text-muted-foreground text-xs">{playlist.description}</p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
