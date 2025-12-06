import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
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
import { format, addDays, isSunday, isAfter } from "date-fns";
import { de } from "date-fns/locale";

interface BookingRescheduleProps {
  booking: {
    id: string;
    booking_number: string;
    massage: string;
    appointment_date: string;
    appointment_time: string;
  };
  onRescheduled: () => void;
}

const timeSlots = [
  "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00"
];

export const BookingReschedule = ({ booking, onRescheduled }: BookingRescheduleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleReschedule = async () => {
    if (!selectedDate || !selectedTime) {
      toast({ title: "Bitte wählen Sie Datum und Uhrzeit", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase
      .from('bookings')
      .update({
        appointment_date: format(selectedDate, 'yyyy-MM-dd'),
        appointment_time: selectedTime,
        status: 'rescheduled',
      })
      .eq('id', booking.id);

    if (error) {
      toast({ title: "Fehler", description: error.message, variant: "destructive" });
    } else {
      toast({ 
        title: "Termin verschoben", 
        description: `Neuer Termin: ${format(selectedDate, 'd. MMMM yyyy', { locale: de })} um ${selectedTime}` 
      });
      setIsOpen(false);
      onRescheduled();
    }

    setIsSubmitting(false);
  };

  const disabledDays = (date: Date) => {
    return isSunday(date) || !isAfter(date, new Date());
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Calendar className="w-4 h-4" />
          Verschieben
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Termin verschieben</DialogTitle>
          <DialogDescription>
            {booking.massage} - #{booking.booking_number}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Current Appointment */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 text-sm">
            <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <div>
              <p className="font-medium">Aktueller Termin</p>
              <p className="text-muted-foreground">
                {format(new Date(booking.appointment_date), 'd. MMMM yyyy', { locale: de })} um {booking.appointment_time}
              </p>
            </div>
          </div>

          {/* Date Selection */}
          <div>
            <p className="text-sm font-medium mb-3">Neues Datum wählen</p>
            <CalendarUI
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={disabledDays}
              locale={de}
              className="rounded-xl border border-border"
              fromDate={addDays(new Date(), 1)}
              toDate={addDays(new Date(), 60)}
            />
          </div>

          {/* Time Selection */}
          {selectedDate && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-sm font-medium mb-3">Neue Uhrzeit wählen</p>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTime(time)}
                    className="w-full"
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Confirm */}
          {selectedDate && selectedTime && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-4 border-t border-border"
            >
              <div className="flex items-center gap-3 p-3 rounded-xl bg-copper/10 mb-4">
                <Clock className="w-4 h-4 text-copper" />
                <div className="text-sm">
                  <p className="font-medium text-foreground">Neuer Termin</p>
                  <p className="text-copper">
                    {format(selectedDate, 'd. MMMM yyyy', { locale: de })} um {selectedTime}
                  </p>
                </div>
              </div>

              <Button 
                variant="copper" 
                className="w-full"
                onClick={handleReschedule}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Calendar className="w-4 h-4 mr-2" />
                )}
                Termin bestätigen
              </Button>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
