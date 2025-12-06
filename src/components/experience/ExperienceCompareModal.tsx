import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Volume2, Wind, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface Theme {
  name: string;
  image: string;
  icon: LucideIcon;
  sounds: string;
  scent: string;
  mood: string;
  highlights: string[];
}

interface ExperienceCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  themes: Theme[];
}

export const ExperienceCompareModal = ({
  isOpen,
  onClose,
  themes
}: ExperienceCompareModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-foreground/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-background rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-background z-10 p-6 border-b border-border/50 flex items-center justify-between">
              <h2 className="text-2xl font-display text-foreground">Erlebnisse vergleichen</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-secondary transition-colors"
              >
                <X size={24} className="text-muted-foreground" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {themes.slice(0, 3).map((theme, index) => (
                  <motion.div
                    key={theme.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="rounded-2xl border border-border/50 overflow-hidden"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={theme.image}
                        alt={theme.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-background font-display text-xl">{theme.name}</h3>
                        <span className="text-copper text-sm">{theme.mood}</span>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Volume2 size={14} className="text-copper" />
                        <span className="text-muted-foreground">{theme.sounds}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Wind size={14} className="text-copper" />
                        <span className="text-muted-foreground">{theme.scent}</span>
                      </div>

                      <div className="pt-4 border-t border-border/50">
                        <p className="text-xs text-muted-foreground mb-3">Highlights</p>
                        <ul className="space-y-2">
                          {theme.highlights.map((highlight) => (
                            <li key={highlight} className="flex items-center gap-2 text-sm">
                              <Check size={14} className="text-emerald-500" />
                              <span className="text-foreground">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button variant="copper" className="w-full" asChild>
                        <Link to={`/buchung?theme=${encodeURIComponent(theme.name)}`}>
                          Auswählen
                        </Link>
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
