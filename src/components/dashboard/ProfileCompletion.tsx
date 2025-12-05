import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle, Circle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProfileCompletionProps {
  profile: {
    full_name: string | null;
    phone: string | null;
    preferred_therapist: string | null;
    preferred_theme: string | null;
  } | null;
  hasBookings: boolean;
  hasFavorites: boolean;
  hasJournalEntries: boolean;
}

export const ProfileCompletion = ({ 
  profile, 
  hasBookings, 
  hasFavorites, 
  hasJournalEntries 
}: ProfileCompletionProps) => {
  const steps = [
    { id: "name", label: "Name hinzufügen", completed: !!profile?.full_name },
    { id: "phone", label: "Telefon angeben", completed: !!profile?.phone },
    { id: "therapist", label: "Therapeut:in wählen", completed: !!profile?.preferred_therapist },
    { id: "theme", label: "Lieblingserlebnis wählen", completed: !!profile?.preferred_theme },
    { id: "booking", label: "Erste Buchung", completed: hasBookings },
    { id: "favorite", label: "Favorit speichern", completed: hasFavorites },
    { id: "journal", label: "Journal starten", completed: hasJournalEntries },
  ];

  const completedCount = steps.filter(s => s.completed).length;
  const percentage = Math.round((completedCount / steps.length) * 100);

  if (percentage === 100) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6 border border-border/50"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-display font-semibold text-foreground">Profil vervollständigen</h3>
          <p className="text-sm text-muted-foreground">{completedCount} von {steps.length} abgeschlossen</p>
        </div>
        <div className="relative w-14 h-14">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="28"
              cy="28"
              r="24"
              className="fill-none stroke-muted stroke-[4]"
            />
            <circle
              cx="28"
              cy="28"
              r="24"
              className="fill-none stroke-copper stroke-[4]"
              strokeDasharray={`${percentage * 1.51} 151`}
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-copper">
            {percentage}%
          </span>
        </div>
      </div>

      <div className="space-y-2">
        {steps.filter(s => !s.completed).slice(0, 3).map((step) => (
          <div
            key={step.id}
            className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <Circle className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-foreground flex-1">{step.label}</span>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {steps.filter(s => s.completed).map((step) => (
          <span
            key={step.id}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs"
          >
            <CheckCircle className="w-3 h-3" />
            {step.label}
          </span>
        ))}
      </div>
    </motion.div>
  );
};
