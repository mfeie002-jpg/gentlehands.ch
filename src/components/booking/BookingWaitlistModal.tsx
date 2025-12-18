import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Bell, Calendar, Clock, User, Mail, Phone, CheckCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { de } from "date-fns/locale";

interface BookingWaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate?: Date;
  selectedTime?: string;
  therapistId?: string;
  therapistName?: string;
  massageType?: string;
  theme?: string;
  duration?: string;
}

export const BookingWaitlistModal = ({
  isOpen,
  onClose,
  selectedDate,
  selectedTime,
  therapistId,
  therapistName,
  massageType,
  theme,
  duration
}: BookingWaitlistModalProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !formData.name || !formData.email) {
      toast({
        title: "Fehler",
        description: "Bitte füllen Sie alle Pflichtfelder aus.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("booking_waitlist")
        .insert({
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone || null,
          preferred_date: format(selectedDate, "yyyy-MM-dd"),
          preferred_time: selectedTime || null,
          preferred_therapist_id: therapistId || null,
          massage_type: massageType || null,
          theme: theme || null,
          duration: duration || null
        });

      if (error) throw error;

      setIsSuccess(true);
      toast({
        title: "Erfolgreich eingetragen",
        description: "Sie werden benachrichtigt, sobald ein Platz frei wird."
      });

      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setFormData({ name: "", email: "", phone: "" });
      }, 2000);

    } catch (error: any) {
      console.error("Waitlist error:", error);
      toast({
        title: "Fehler",
        description: "Eintragung fehlgeschlagen. Bitte versuchen Sie es erneut.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center py-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4"
            >
              <CheckCircle size={32} className="text-white" />
            </motion.div>
            <h3 className="text-xl font-display text-foreground mb-2">
              Sie stehen auf der Warteliste!
            </h3>
            <p className="text-muted-foreground text-sm">
              Wir benachrichtigen Sie per E-Mail, sobald ein Platz frei wird.
            </p>
          </motion.div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl flex items-center gap-2">
            <Bell className="text-copper" size={22} />
            Auf Warteliste setzen
          </DialogTitle>
          <DialogDescription>
            Werden Sie benachrichtigt, sobald dieser Termin verfügbar wird.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Selected slot info */}
          <div className="p-3 bg-muted/50 rounded-lg space-y-2">
            {selectedDate && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar size={14} className="text-copper" />
                <span>{format(selectedDate, "EEEE, d. MMMM yyyy", { locale: de })}</span>
              </div>
            )}
            {selectedTime && (
              <div className="flex items-center gap-2 text-sm">
                <Clock size={14} className="text-copper" />
                <span>{selectedTime} Uhr</span>
              </div>
            )}
            {therapistName && (
              <div className="flex items-center gap-2 text-sm">
                <User size={14} className="text-copper" />
                <span>{therapistName}</span>
              </div>
            )}
          </div>

          {/* Form fields */}
          <div className="space-y-3">
            <div>
              <Label htmlFor="waitlist-name" className="text-sm">
                Name *
              </Label>
              <Input
                id="waitlist-name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Ihr vollständiger Name"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="waitlist-email" className="text-sm">
                E-Mail *
              </Label>
              <div className="relative mt-1">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="waitlist-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="ihre@email.ch"
                  required
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="waitlist-phone" className="text-sm">
                Telefon (optional)
              </Label>
              <div className="relative mt-1">
                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="waitlist-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+41 XX XXX XX XX"
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Info text */}
          <p className="text-xs text-muted-foreground">
            Ihre Daten werden nur zur Benachrichtigung verwendet und nach 30 Tagen automatisch gelöscht.
          </p>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Abbrechen
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-copper hover:bg-copper/90 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin mr-2" />
                  Wird eingetragen...
                </>
              ) : (
                <>
                  <Bell size={16} className="mr-2" />
                  Benachrichtigen
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
