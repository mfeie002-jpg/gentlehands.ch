import { useState } from "react";
import { motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Banknote, Save, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface TherapistRateEditorProps {
  therapist: {
    id: string;
    name: string;
    hourly_rate: number | null;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TherapistRateEditor = ({
  therapist,
  open,
  onOpenChange,
}: TherapistRateEditorProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [rate, setRate] = useState(String(therapist.hourly_rate || 120));

  const updateRateMutation = useMutation({
    mutationFn: async (newRate: number) => {
      const { error } = await supabase
        .from("therapists")
        .update({ hourly_rate: newRate })
        .eq("id", therapist.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-therapists"] });
      toast({ title: "Stundensatz aktualisiert" });
      onOpenChange(false);
    },
    onError: () => {
      toast({ title: "Fehler beim Aktualisieren", variant: "destructive" });
    },
  });

  const handleSave = () => {
    const numRate = parseFloat(rate);
    if (isNaN(numRate) || numRate < 50 || numRate > 500) {
      toast({
        title: "Ungültiger Stundensatz",
        description: "Bitte geben Sie einen Wert zwischen 50 und 500 CHF ein.",
        variant: "destructive",
      });
      return;
    }
    updateRateMutation.mutate(numRate);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Banknote className="w-5 h-5 text-copper" />
            Stundensatz bearbeiten
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="text-center">
            <p className="text-muted-foreground mb-2">Therapeut:in</p>
            <p className="text-xl font-display text-foreground">{therapist.name}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hourlyRate">Stundensatz (CHF)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                CHF
              </span>
              <Input
                id="hourlyRate"
                type="number"
                min={50}
                max={500}
                step={5}
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="pl-12 text-lg font-medium"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Empfohlener Bereich: 100–180 CHF/Stunde
            </p>
          </div>

          {/* Quick select buttons */}
          <div className="space-y-2">
            <Label>Schnellauswahl</Label>
            <div className="flex flex-wrap gap-2">
              {[100, 120, 140, 150, 180, 200].map((preset) => (
                <Button
                  key={preset}
                  variant={rate === String(preset) ? "default" : "outline"}
                  size="sm"
                  onClick={() => setRate(String(preset))}
                >
                  {preset} CHF
                </Button>
              ))}
            </div>
          </div>

          {/* Price calculation preview */}
          <div className="bg-secondary/50 rounded-xl p-4">
            <p className="text-sm text-muted-foreground mb-2">Preisvorschau</p>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-background rounded-lg p-2">
                <p className="text-xs text-muted-foreground">60 Min</p>
                <p className="font-medium">{(parseFloat(rate) || 0).toFixed(0)} CHF</p>
              </div>
              <div className="bg-background rounded-lg p-2">
                <p className="text-xs text-muted-foreground">90 Min</p>
                <p className="font-medium">{((parseFloat(rate) || 0) * 1.5).toFixed(0)} CHF</p>
              </div>
              <div className="bg-background rounded-lg p-2">
                <p className="text-xs text-muted-foreground">120 Min</p>
                <p className="font-medium">{((parseFloat(rate) || 0) * 2).toFixed(0)} CHF</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              <X size={16} className="mr-2" />
              Abbrechen
            </Button>
            <Button
              className="flex-1"
              onClick={handleSave}
              disabled={updateRateMutation.isPending}
            >
              <Save size={16} className="mr-2" />
              {updateRateMutation.isPending ? "Speichern..." : "Speichern"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
