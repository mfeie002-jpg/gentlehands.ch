import { useState } from "react";
import { motion } from "framer-motion";
import { XCircle, AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { de } from "date-fns/locale";

interface BookingCancellationProps {
  booking: {
    id: string;
    booking_number: string;
    massage: string;
    appointment_date: string;
    appointment_time: string;
  };
  onCancelled: () => void;
}

const cancellationReasons = [
  { value: 'schedule_conflict', label: 'Terminkonflikt' },
  { value: 'illness', label: 'Krankheit' },
  { value: 'personal', label: 'Persönliche Gründe' },
  { value: 'reschedule', label: 'Möchte einen anderen Termin' },
  { value: 'other', label: 'Sonstiges' },
];

export const BookingCancellation = ({ booking, onCancelled }: BookingCancellationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleCancel = async () => {
    if (!reason) {
      toast({ title: "Bitte wählen Sie einen Grund", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase
      .from('bookings')
      .update({
        status: 'cancelled',
        additional_notes: `Stornierungsgrund: ${cancellationReasons.find(r => r.value === reason)?.label}. ${additionalInfo}`.trim(),
      })
      .eq('id', booking.id);

    if (error) {
      toast({ title: "Fehler", description: error.message, variant: "destructive" });
    } else {
      toast({ 
        title: "Termin storniert", 
        description: "Wir haben Ihre Stornierung erhalten." 
      });
      setIsOpen(false);
      onCancelled();
    }

    setIsSubmitting(false);
  };

  const appointmentDate = new Date(booking.appointment_date);
  const hoursUntil = (appointmentDate.getTime() - Date.now()) / (1000 * 60 * 60);
  const isLateCancellation = hoursUntil < 24;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-rose-500 hover:text-rose-600 hover:bg-rose-500/10">
          <XCircle className="w-4 h-4 mr-1" />
          Stornieren
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Termin stornieren</DialogTitle>
          <DialogDescription>
            {booking.massage} am {format(appointmentDate, 'd. MMMM yyyy', { locale: de })}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Late cancellation warning */}
          {isLateCancellation && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30"
            >
              <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-amber-600">Kurzfristige Stornierung</p>
                <p className="text-muted-foreground">
                  Bei Stornierungen weniger als 24 Stunden vor dem Termin können Gebühren anfallen.
                </p>
              </div>
            </motion.div>
          )}

          {/* Reason Selection */}
          <div>
            <Label className="mb-3 block">Stornierungsgrund</Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger>
                <SelectValue placeholder="Bitte wählen Sie einen Grund" />
              </SelectTrigger>
              <SelectContent>
                {cancellationReasons.map((r) => (
                  <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Additional Info */}
          <div>
            <Label className="mb-3 block">Zusätzliche Informationen (optional)</Label>
            <Textarea
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="Gibt es etwas, das wir wissen sollten?"
              rows={3}
              className="resize-none"
            />
          </div>

          {/* Confirm */}
          <div className="pt-4 border-t border-border space-y-3">
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={handleCancel}
              disabled={isSubmitting || !reason}
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <XCircle className="w-4 h-4 mr-2" />
              )}
              Termin endgültig stornieren
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setIsOpen(false)}
            >
              Abbrechen
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            Möchten Sie lieber umbuchen? Nutzen Sie die Option "Verschieben" stattdessen.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
