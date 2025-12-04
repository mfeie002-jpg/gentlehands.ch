import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2 } from "lucide-react";

interface Playlist {
  id: string;
  name: string;
  description: string;
  duration: string;
  tracks: number;
  mood: string;
  preview: string; // Would be actual audio URL
}

const playlists: Playlist[] = [
  {
    id: "ocean-waves",
    name: "Ocean Waves",
    description: "Sanftes Meeresrauschen mit fernen Möwenrufen und leisen Windgeräuschen.",
    duration: "3 Std",
    tracks: 12,
    mood: "Ozean & Palmen",
    preview: "#",
  },
  {
    id: "forest-ambience",
    name: "Forest Ambience",
    description: "Vogelgesang, raschelnde Blätter und plätschernde Bäche in der Natur.",
    duration: "2.5 Std",
    tracks: 10,
    mood: "Alpine Stille",
    preview: "#",
  },
  {
    id: "deep-silence",
    name: "Deep Silence",
    description: "Nahezu vollständige Stille mit sehr subtilen, tiefen Frequenzen.",
    duration: "2 Std",
    tracks: 5,
    mood: "Deep Dark Relax",
    preview: "#",
  },
  {
    id: "ambient-lounge",
    name: "Ambient Lounge",
    description: "Sanfte elektronische Klänge und minimalistische Chillout-Musik.",
    duration: "3 Std",
    tracks: 18,
    mood: "Urban Loft",
    preview: "#",
  },
  {
    id: "zen-meditation",
    name: "Zen Meditation",
    description: "Tibetische Klangschalen, sanfte Gongs und meditative Flötenklänge.",
    duration: "2 Std",
    tracks: 8,
    mood: "Zen Garden",
    preview: "#",
  },
  {
    id: "piano-dreams",
    name: "Piano Dreams",
    description: "Zarte Klaviermelodien für tiefe emotionale Entspannung.",
    duration: "2.5 Std",
    tracks: 15,
    mood: "Alle Themes",
    preview: "#",
  },
];

export const MusicPreview = () => {
  const [playing, setPlaying] = useState<string | null>(null);

  const togglePlay = (id: string) => {
    setPlaying(playing === id ? null : id);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {playlists.map((playlist, index) => (
        <motion.div
          key={playlist.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          className="group"
        >
          <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-copper/30 transition-all">
            <button
              onClick={() => togglePlay(playlist.id)}
              className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                playing === playlist.id
                  ? "bg-copper text-accent-foreground"
                  : "bg-secondary hover:bg-copper/20"
              }`}
            >
              {playing === playlist.id ? (
                <Pause size={20} />
              ) : (
                <Play size={20} className="ml-0.5" />
              )}
            </button>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-display text-foreground truncate">
                {playlist.name}
              </h4>
              <p className="text-sm text-muted-foreground line-clamp-1">
                {playlist.description}
              </p>
              <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                <span>{playlist.tracks} Tracks</span>
                <span>·</span>
                <span>{playlist.duration}</span>
                <span>·</span>
                <span className="text-copper">{playlist.mood}</span>
              </div>
            </div>
            
            <Volume2 size={18} className="shrink-0 text-muted-foreground" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};
