import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, AlertTriangle, Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BodyMap } from "./BodyMap";

interface QuestionnaireData {
  allergies: string;
  medicalConditions: string;
  currentMedications: string;
  pregnancyStatus: string;
  painAreas: string[];
  stressLevel: number;
  sleepQuality: number;
  consentGiven: boolean;
}

interface HealthQuestionnaireProps {
  onComplete: (data: QuestionnaireData) => void;
}

export const HealthQuestionnaire = ({ onComplete }: HealthQuestionnaireProps) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<QuestionnaireData>({
    allergies: "",
    medicalConditions: "",
    currentMedications: "",
    pregnancyStatus: "",
    painAreas: [],
    stressLevel: 5,
    sleepQuality: 5,
    consentGiven: false,
  });

  const totalSteps = 4;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete(data);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const updateData = (field: keyof QuestionnaireData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Schritt {step} von {totalSteps}</span>
          <span className="text-sm text-copper font-medium">{Math.round((step / totalSteps) * 100)}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-copper"
            initial={{ width: 0 }}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Steps */}
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-6"
      >
        {step === 1 && (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-copper/10 flex items-center justify-center">
                <Heart className="w-6 h-6 text-copper" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground">Gesundheitsinformationen</h3>
                <p className="text-sm text-muted-foreground">Damit wir Ihr Erlebnis optimal gestalten können</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Haben Sie Allergien? (z.B. gegen Öle, Düfte)
                </label>
                <textarea
                  value={data.allergies}
                  onChange={(e) => updateData("allergies", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-copper focus:ring-2 focus:ring-copper/20 outline-none resize-none"
                  rows={2}
                  placeholder="Keine bekannten Allergien..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Bestehende Erkrankungen oder Verletzungen
                </label>
                <textarea
                  value={data.medicalConditions}
                  onChange={(e) => updateData("medicalConditions", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-copper focus:ring-2 focus:ring-copper/20 outline-none resize-none"
                  rows={2}
                  placeholder="Keine bekannten Erkrankungen..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Aktuelle Medikamente
                </label>
                <textarea
                  value={data.currentMedications}
                  onChange={(e) => updateData("currentMedications", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-copper focus:ring-2 focus:ring-copper/20 outline-none resize-none"
                  rows={2}
                  placeholder="Keine Medikamente..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Schwangerschaft</label>
                <div className="flex gap-3">
                  {["Nicht schwanger", "Schwanger", "Möglicherweise"].map(option => (
                    <button
                      key={option}
                      onClick={() => updateData("pregnancyStatus", option)}
                      className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-colors ${
                        data.pregnancyStatus === option
                          ? "bg-copper text-background"
                          : "bg-muted hover:bg-muted/80"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-copper/10 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-copper" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground">Schmerzpunkte</h3>
                <p className="text-sm text-muted-foreground">Wo haben Sie Verspannungen oder Schmerzen?</p>
              </div>
            </div>

            <BodyMap
              selectedAreas={data.painAreas}
              onAreaToggle={(areaId) => {
                const newAreas = data.painAreas.includes(areaId)
                  ? data.painAreas.filter(a => a !== areaId)
                  : [...data.painAreas, areaId];
                updateData("painAreas", newAreas);
              }}
              mode="focus"
            />
          </>
        )}

        {step === 3 && (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-copper/10 flex items-center justify-center">
                <Heart className="w-6 h-6 text-copper" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground">Ihr Wohlbefinden</h3>
                <p className="text-sm text-muted-foreground">Wie fühlen Sie sich aktuell?</p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <label className="block text-sm font-medium mb-4">
                  Aktuelles Stresslevel: <span className="text-copper">{data.stressLevel}/10</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={data.stressLevel}
                  onChange={(e) => updateData("stressLevel", parseInt(e.target.value))}
                  className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-copper"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Entspannt</span>
                  <span>Sehr gestresst</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-4">
                  Schlafqualität: <span className="text-copper">{data.sleepQuality}/10</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={data.sleepQuality}
                  onChange={(e) => updateData("sleepQuality", parseInt(e.target.value))}
                  className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-copper"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Schlecht</span>
                  <span>Ausgezeichnet</span>
                </div>
              </div>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <Check className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground">Einverständnis</h3>
                <p className="text-sm text-muted-foreground">Bitte bestätigen Sie Ihre Angaben</p>
              </div>
            </div>

            <div className="bg-muted/50 rounded-xl p-4 mb-6">
              <p className="text-sm text-muted-foreground">
                Ihre Angaben werden vertraulich behandelt und dienen ausschliesslich der optimalen 
                Gestaltung Ihres Massage-Erlebnisses. Sie können diese jederzeit aktualisieren.
              </p>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={data.consentGiven}
                onChange={(e) => updateData("consentGiven", e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-border accent-copper"
              />
              <span className="text-sm">
                Ich bestätige, dass meine Angaben korrekt sind und erkläre mich mit der 
                Verarbeitung meiner Gesundheitsdaten zum Zweck der Massage einverstanden.
              </span>
            </label>
          </>
        )}
      </motion.div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
        <Button
          variant="ghost"
          onClick={handleBack}
          disabled={step === 1}
        >
          Zurück
        </Button>
        <Button
          variant="copper"
          onClick={handleNext}
          disabled={step === 4 && !data.consentGiven}
        >
          {step === totalSteps ? "Abschliessen" : "Weiter"}
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};
