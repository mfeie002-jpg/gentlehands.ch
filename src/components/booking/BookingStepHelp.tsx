import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StepHelpContent {
  title: string;
  tips: string[];
  faq?: { q: string; a: string }[];
}

const stepHelp: Record<number, StepHelpContent> = {
  1: {
    title: "Therapeut:in wählen",
    tips: [
      "Jede:r Therapeut:in hat einen eigenen Stil und Spezialisierungen",
      "Bei 'Keine Präferenz' wählen wir intuitiv passend zu Ihren Wünschen",
      "Sie können beim nächsten Besuch wechseln oder bei Ihrer Wahl bleiben"
    ],
    faq: [
      { q: "Kann ich später wechseln?", a: "Ja, Sie können bei jeder Buchung frei wählen." }
    ]
  },
  2: {
    title: "Themenraum wählen",
    tips: [
      "Der Themenraum bestimmt Atmosphäre, Düfte und Musik",
      "Surprise Experience ist ideal, wenn Sie sich überraschen lassen möchten",
      "Alle Räume sind gleich komfortabel ausgestattet"
    ]
  },
  3: {
    title: "Massage wählen",
    tips: [
      "Tippen Sie auf ℹ️ für detaillierte Informationen zu jeder Massage",
      "Die Dauer können Sie nach der Auswahl festlegen",
      "Längere Sessions ermöglichen tiefere Entspannung"
    ]
  },
  4: {
    title: "Präferenzen anpassen",
    tips: [
      "Alle Angaben sind optional und können vor Ort geändert werden",
      "Bei 'Intuitive Gestaltung' passt sich die Massage spontan an",
      "Ihre Wünsche werden vertraulich behandelt"
    ]
  },
  5: {
    title: "Termin & Kontakt",
    tips: [
      "Wählen Sie einen Termin mindestens 24h im Voraus",
      "Sie erhalten eine Bestätigung per E-Mail",
      "Kostenlose Stornierung bis 24h vor dem Termin"
    ],
    faq: [
      { q: "Kann ich kurzfristig buchen?", a: "Bei Verfügbarkeit ja - kontaktieren Sie uns direkt." }
    ]
  }
};

interface BookingStepHelpProps {
  currentStep: number;
}

export const BookingStepHelp = ({ currentStep }: BookingStepHelpProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const help = stepHelp[currentStep];
  
  if (!help) return null;

  return (
    <>
      {/* Help button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 sm:bottom-8 sm:right-8 z-40 w-12 h-12 bg-copper text-white rounded-full shadow-lg flex items-center justify-center hover:bg-copper/90 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Hilfe anzeigen"
      >
        <HelpCircle size={24} />
      </motion.button>
      
      {/* Help panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />
            
            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-background border-l border-border shadow-xl z-50 overflow-y-auto"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-xl text-foreground">
                    {help.title}
                  </h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                    aria-label="Schliessen"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                {/* Tips */}
                <div className="space-y-4 mb-6">
                  <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Tipps
                  </h4>
                  <ul className="space-y-3">
                    {help.tips.map((tip, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex gap-3 text-sm text-foreground"
                      >
                        <span className="text-copper">•</span>
                        {tip}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                
                {/* FAQ */}
                {help.faq && help.faq.length > 0 && (
                  <div className="space-y-4 mb-6">
                    <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      Häufige Fragen
                    </h4>
                    <div className="space-y-3">
                      {help.faq.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + idx * 0.1 }}
                          className="p-3 bg-muted/50 rounded-lg"
                        >
                          <p className="text-sm font-medium text-foreground mb-1">{item.q}</p>
                          <p className="text-sm text-muted-foreground">{item.a}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Contact */}
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-3">
                    Noch Fragen? Wir helfen gerne.
                  </p>
                  <Button variant="outline" className="w-full gap-2" asChild>
                    <a href="/kontakt">
                      <MessageCircle size={16} />
                      Kontakt aufnehmen
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
