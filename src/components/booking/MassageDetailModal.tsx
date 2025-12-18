import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Zap, Clock, Target, CheckCircle, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MassageDetail {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  techniques: string[];
  idealFor: string;
  intensity: "sanft" | "mittel" | "intensiv";
  duration: string;
}

const massageDetails: Record<string, MassageDetail> = {
  "Deep Release Session": {
    id: "deep-release",
    title: "Deep Release Session",
    description: "Eine intensive Tiefengewebsmassage, die hartnäckige Verspannungen löst und tief sitzende Blockaden bearbeitet. Professionelle Grifftechniken erreichen auch die tieferen Muskelschichten.",
    benefits: [
      "Löst chronische Muskelverspannungen",
      "Verbessert Beweglichkeit & Flexibilität",
      "Fördert Durchblutung & Regeneration",
      "Reduziert Stresshormone nachhaltig",
      "Lindert Rücken- und Nackenschmerzen"
    ],
    techniques: [
      "Tiefengewebsmassage",
      "Triggerpunkt-Therapie",
      "Myofasziale Techniken",
      "Dehnungsgriffe"
    ],
    idealFor: "Menschen mit chronischen Verspannungen, Sportler:innen, Schreibtischarbeiter:innen",
    intensity: "intensiv",
    duration: "90-120 Min"
  },
  "Stress Reset": {
    id: "stress-reset",
    title: "Stress Reset",
    description: "Eine beruhigende Entspannungsmassage, die das Nervensystem sanft herunterfährt. Fliessende Bewegungen und gleichmässiger Druck führen in tiefe Entspannung.",
    benefits: [
      "Aktiviert das parasympathische Nervensystem",
      "Senkt Cortisol-Level messbar",
      "Verbessert Schlafqualität",
      "Fördert emotionale Balance",
      "Stärkt das Immunsystem"
    ],
    techniques: [
      "Schwedische Massage",
      "Effleurage (Streichungen)",
      "Sanfte Knetungen",
      "Rhythmische Drucksequenzen"
    ],
    idealFor: "Gestresste Berufstätige, Menschen mit Schlafproblemen, Burnout-Prävention",
    intensity: "sanft",
    duration: "60-90 Min"
  },
  "Emotional Grounding": {
    id: "emotional-grounding",
    title: "Emotional Grounding",
    description: "Eine achtsame Körperarbeit, die emotionale Spannungen löst und Sie wieder in Kontakt mit Ihrem Körper bringt. Besonders geeignet bei emotionaler Überlastung.",
    benefits: [
      "Löst emotionale Blockaden sanft",
      "Fördert Körperbewusstsein",
      "Unterstützt Stressverarbeitung",
      "Schafft innere Ruhe & Zentrierung",
      "Stärkt Selbstwahrnehmung"
    ],
    techniques: [
      "Achtsame Berührung",
      "Atemintegration",
      "Körperspürarbeit",
      "Energetische Ausbalancierung"
    ],
    idealFor: "Emotionale Erschöpfung, Lebensübergänge, Selbstfürsorge-Rituale",
    intensity: "sanft",
    duration: "90 Min"
  },
  "Ganzkörper Tiefenentspannung": {
    id: "ganzkoerper",
    title: "Ganzkörper Tiefenentspannung",
    description: "Unsere Signature-Massage für vollständige Regeneration. Eine luxuriöse Ganzkörperbehandlung, die keine Zone unberührt lässt und tiefste Entspannung ermöglicht.",
    benefits: [
      "Komplette Körperentspannung",
      "Verbessert Lymphfluss",
      "Löst Verspannungen am ganzen Körper",
      "Tiefe mentale Erholung",
      "Nachhaltige Regeneration"
    ],
    techniques: [
      "Kombination aller Techniken",
      "Kopf- und Gesichtsmassage",
      "Fuss- und Handreflexzonen",
      "Rücken- und Schulterbehandlung"
    ],
    idealFor: "Verwöhn-Erlebnis, besondere Anlässe, vollständige Regeneration",
    intensity: "mittel",
    duration: "120 Min"
  },
  "Aromatherapie": {
    id: "aromatherapie",
    title: "Aromatherapie Massage",
    description: "Eine sensorische Reise mit hochwertigen ätherischen Ölen. Die Düfte werden individuell auf Ihre Bedürfnisse abgestimmt und verstärken die therapeutische Wirkung.",
    benefits: [
      "Synergie von Massage & Aromatherapie",
      "Individuell abgestimmte Düfte",
      "Emotionale Harmonisierung",
      "Tiefe Entspannung der Sinne",
      "Nachhaltige Wirkung durch Öle"
    ],
    techniques: [
      "Klassische Massagegriffe",
      "Aromatherapeutische Anwendung",
      "Warme Ölauflagen",
      "Inhalationstechniken"
    ],
    idealFor: "Duft-Liebhaber:innen, ganzheitliche Entspannung, Sinneserlebnis",
    intensity: "sanft",
    duration: "75-90 Min"
  },
  "Hot Stone": {
    id: "hot-stone",
    title: "Hot Stone Massage",
    description: "Warme Basaltsteine werden auf Energiepunkte gelegt und für die Massage verwendet. Die Wärme dringt tief ein und bereitet die Muskeln optimal auf die Behandlung vor.",
    benefits: [
      "Tiefenwärme für Muskellockerung",
      "Fördert Durchblutung intensiv",
      "Löst Verspannungen sanft",
      "Besonders wohltuend im Winter",
      "Energetische Ausbalancierung"
    ],
    techniques: [
      "Steinplatzierung auf Meridiane",
      "Gleitende Steinmassage",
      "Wärmebehandlung",
      "Kontrastanwendungen möglich"
    ],
    idealFor: "Wärmeliebende, chronische Verspannungen, Winter-Wellness",
    intensity: "mittel",
    duration: "90-120 Min"
  },
  "Klangtherapie": {
    id: "klangtherapie",
    title: "Klangschalen Massage",
    description: "Tibetische Klangschalen werden auf und um Ihren Körper platziert. Die Vibrationen durchdringen sanft jede Zelle und führen in tiefste Entspannungszustände.",
    benefits: [
      "Tiefe Zellenentspannung",
      "Harmonisiert Energiefluss",
      "Fördert Meditation & Loslassen",
      "Stressabbau auf allen Ebenen",
      "Vibrationstherapie für Körper & Geist"
    ],
    techniques: [
      "Klangschalen-Platzierung",
      "Obertongesang optional",
      "Sanfte Körperberührung",
      "Atemführung"
    ],
    idealFor: "Meditation-Liebhaber:innen, spirituelle Entspannung, Klangreisen",
    intensity: "sanft",
    duration: "60-90 Min"
  },
  "Swedish Massage": {
    id: "swedish",
    title: "Klassische Schwedische Massage",
    description: "Die Mutter aller westlichen Massagetechniken. Bewährte Griffe, die Muskeln lockern, die Durchblutung fördern und das Wohlbefinden steigern.",
    benefits: [
      "Bewährte klassische Techniken",
      "Allgemeine Entspannung",
      "Durchblutungsförderung",
      "Muskellockerung",
      "Ideal für Einsteiger:innen"
    ],
    techniques: [
      "Effleurage (Streichungen)",
      "Petrissage (Knetungen)",
      "Friktion (Reibungen)",
      "Tapotement (Klopfungen)"
    ],
    idealFor: "Massage-Neulinge, allgemeine Entspannung, regelmässige Wellness",
    intensity: "mittel",
    duration: "60-90 Min"
  },
  "Tiefenentspannung": {
    id: "tiefenentspannung",
    title: "Tiefenentspannung Premium",
    description: "Unser ganzheitliches Premium-Erlebnis vereint verschiedene Entspannungstechniken zu einer transformativen Reise für Körper, Geist und Seele.",
    benefits: [
      "Ganzheitliche Regeneration",
      "Mentale Tiefenentspannung",
      "Körperliche Lockerung",
      "Emotionale Balance",
      "Nachhaltige Erholung"
    ],
    techniques: [
      "Kombinierte Massage-Stile",
      "Atemübungen",
      "Progressive Relaxation",
      "Meditative Elemente"
    ],
    idealFor: "Tiefgreifende Entspannung, besondere Regeneration, Auszeit vom Alltag",
    intensity: "sanft",
    duration: "90-120 Min"
  }
};

interface MassageDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  massageTitle: string;
  onSelect: () => void;
}

const intensityColors = {
  sanft: "bg-green-500/20 text-green-700 border-green-500/30",
  mittel: "bg-amber-500/20 text-amber-700 border-amber-500/30",
  intensiv: "bg-rose-500/20 text-rose-700 border-rose-500/30"
};

const intensityLabels = {
  sanft: "Sanft",
  mittel: "Mittel",
  intensiv: "Intensiv"
};

export const MassageDetailModal = ({ isOpen, onClose, massageTitle, onSelect }: MassageDetailModalProps) => {
  const details = massageDetails[massageTitle] || massageDetails["Stress Reset"];
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-foreground flex items-center gap-3">
            <Heart className="text-copper" size={24} />
            {details.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          {/* Intensity & Duration Badges */}
          <div className="flex flex-wrap gap-3">
            <span className={cn(
              "px-3 py-1.5 rounded-full text-sm font-medium border",
              intensityColors[details.intensity]
            )}>
              {intensityLabels[details.intensity]}
            </span>
            <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-copper/10 text-copper border border-copper/30 flex items-center gap-1.5">
              <Clock size={14} />
              {details.duration}
            </span>
          </div>
          
          {/* Description */}
          <div>
            <p className="text-muted-foreground leading-relaxed">
              {details.description}
            </p>
          </div>
          
          {/* Benefits */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <Sparkles size={18} className="text-copper" />
              Ihre Vorteile
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {details.benefits.map((benefit, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0" />
                  {benefit}
                </motion.li>
              ))}
            </ul>
          </div>
          
          {/* Techniques */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <Target size={18} className="text-copper" />
              Angewandte Techniken
            </h4>
            <div className="flex flex-wrap gap-2">
              {details.techniques.map((technique, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="px-3 py-1.5 bg-muted rounded-lg text-sm text-muted-foreground"
                >
                  {technique}
                </motion.span>
              ))}
            </div>
          </div>
          
          {/* Ideal For */}
          <div className="p-4 bg-copper/5 border border-copper/20 rounded-xl">
            <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <Zap size={18} className="text-copper" />
              Ideal für
            </h4>
            <p className="text-sm text-muted-foreground">
              {details.idealFor}
            </p>
          </div>
          
          {/* CTA */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Schliessen
            </Button>
            <Button
              onClick={() => {
                onSelect();
                onClose();
              }}
              className="flex-1 bg-copper hover:bg-copper/90 text-white"
            >
              Diese Massage wählen
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
