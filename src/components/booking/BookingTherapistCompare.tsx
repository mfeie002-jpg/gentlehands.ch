import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Calendar, Award, Scale, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Therapist {
  id: string;
  name: string;
  role?: string;
  specialties: string[];
  photo_url?: string | null;
  hourly_rate?: number | null;
  average_rating?: number | null;
  total_bookings?: number | null;
  experience_years?: number | null;
  is_featured?: boolean;
}

interface BookingTherapistCompareProps {
  isOpen: boolean;
  onClose: () => void;
  therapists: Therapist[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

export const BookingTherapistCompare = ({
  isOpen,
  onClose,
  therapists,
  selectedId,
  onSelect,
}: BookingTherapistCompareProps) => {
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const toggleCompare = (id: string) => {
    setCompareIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(i => i !== id);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), id];
      }
      return [...prev, id];
    });
  };

  const compareTherapists = therapists.filter(t => compareIds.includes(t.id));

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card border border-border rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Scale className="text-copper" size={20} />
                <h2 className="font-display text-lg">Therapeut:innen vergleichen</h2>
              </div>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 overflow-auto max-h-[calc(90vh-120px)]">
              {/* Selection grid */}
              <p className="text-sm text-muted-foreground mb-4">
                Wählen Sie bis zu 3 Therapeut:innen zum Vergleich
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
                {therapists.filter(t => t.id !== "none").map((therapist) => {
                  const isInCompare = compareIds.includes(therapist.id);
                  
                  return (
                    <button
                      key={therapist.id}
                      onClick={() => toggleCompare(therapist.id)}
                      className={cn(
                        "relative p-3 rounded-xl border-2 transition-all text-left",
                        isInCompare
                          ? "border-copper bg-copper/5"
                          : "border-border hover:border-copper/50"
                      )}
                    >
                      {therapist.photo_url ? (
                        <img
                          src={therapist.photo_url}
                          alt={therapist.name}
                          className="w-12 h-12 rounded-lg object-cover mb-2"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-muted mb-2" />
                      )}
                      <p className="font-medium text-sm truncate">{therapist.name}</p>
                      {therapist.hourly_rate && (
                        <p className="text-xs text-copper">CHF {therapist.hourly_rate}/h</p>
                      )}
                      
                      {isInCompare && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-copper rounded-full flex items-center justify-center">
                          <Check size={12} className="text-accent-foreground" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Comparison table */}
              {compareTherapists.length > 0 && (
                <div className="border border-border rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-3 text-sm font-medium text-muted-foreground">Eigenschaft</th>
                        {compareTherapists.map(t => (
                          <th key={t.id} className="p-3 text-center">
                            <div className="flex flex-col items-center gap-2">
                              {t.photo_url ? (
                                <img
                                  src={t.photo_url}
                                  alt={t.name}
                                  className="w-10 h-10 rounded-lg object-cover"
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-lg bg-muted" />
                              )}
                              <span className="font-medium text-sm">{t.name}</span>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-border">
                        <td className="p-3 text-sm text-muted-foreground">Stundensatz</td>
                        {compareTherapists.map(t => (
                          <td key={t.id} className="p-3 text-center font-medium">
                            {t.hourly_rate ? `CHF ${t.hourly_rate}` : "-"}
                          </td>
                        ))}
                      </tr>
                      <tr className="border-t border-border">
                        <td className="p-3 text-sm text-muted-foreground">Bewertung</td>
                        {compareTherapists.map(t => (
                          <td key={t.id} className="p-3 text-center">
                            {t.average_rating ? (
                              <span className="flex items-center justify-center gap-1">
                                <Star size={14} className="text-amber-500 fill-amber-500" />
                                {t.average_rating.toFixed(1)}
                              </span>
                            ) : "-"}
                          </td>
                        ))}
                      </tr>
                      <tr className="border-t border-border">
                        <td className="p-3 text-sm text-muted-foreground">Erfahrung</td>
                        {compareTherapists.map(t => (
                          <td key={t.id} className="p-3 text-center">
                            {t.experience_years ? `${t.experience_years} Jahre` : "-"}
                          </td>
                        ))}
                      </tr>
                      <tr className="border-t border-border">
                        <td className="p-3 text-sm text-muted-foreground">Buchungen</td>
                        {compareTherapists.map(t => (
                          <td key={t.id} className="p-3 text-center">
                            {t.total_bookings ? `${t.total_bookings}+` : "-"}
                          </td>
                        ))}
                      </tr>
                      <tr className="border-t border-border">
                        <td className="p-3 text-sm text-muted-foreground">Spezialisierung</td>
                        {compareTherapists.map(t => (
                          <td key={t.id} className="p-3 text-center">
                            <div className="flex flex-wrap justify-center gap-1">
                              {t.specialties.slice(0, 2).map(s => (
                                <span key={s} className="text-xs px-2 py-0.5 bg-secondary rounded-full">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </td>
                        ))}
                      </tr>
                      <tr className="border-t border-border">
                        <td className="p-3 text-sm text-muted-foreground">Top-Therapeut:in</td>
                        {compareTherapists.map(t => (
                          <td key={t.id} className="p-3 text-center">
                            {t.is_featured ? (
                              <Award className="text-copper mx-auto" size={18} />
                            ) : "-"}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* Select button */}
              {compareTherapists.length > 0 && (
                <div className="flex gap-3 mt-6 justify-center">
                  {compareTherapists.map(t => (
                    <Button
                      key={t.id}
                      onClick={() => {
                        onSelect(t.id);
                        onClose();
                      }}
                      variant={selectedId === t.id ? "default" : "outline"}
                      className={selectedId === t.id ? "bg-copper hover:bg-copper/90" : ""}
                    >
                      {t.name} wählen
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
