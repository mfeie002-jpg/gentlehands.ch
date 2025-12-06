import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone,
  MapPin,
  MessageSquare,
  Check,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Booking } from "@/hooks/useAdmin";

interface BookingQuickPreviewProps {
  booking: Booking | null;
  onClose: () => void;
  onUpdateStatus: (id: string, status: string) => Promise<boolean>;
}

const statusConfig: Record<string, { label: string; color: string }> = {
  pending: { label: "Ausstehend", color: "bg-amber-500/20 text-amber-600 border-amber-500/30" },
  confirmed: { label: "Bestätigt", color: "bg-emerald-500/20 text-emerald-600 border-emerald-500/30" },
  cancelled: { label: "Storniert", color: "bg-red-500/20 text-red-600 border-red-500/30" },
  completed: { label: "Abgeschlossen", color: "bg-blue-500/20 text-blue-600 border-blue-500/30" }
};

export const BookingQuickPreview = ({ booking, onClose, onUpdateStatus }: BookingQuickPreviewProps) => {
  if (!booking) return null;

  const status = statusConfig[booking.status || 'pending'];
  const appointmentDate = new Date(booking.appointment_date);
  const isUpcoming = appointmentDate > new Date();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 300 }}
        className="fixed right-0 top-0 h-full w-96 bg-card border-l border-border shadow-2xl z-50 overflow-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border p-4 z-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Buchung</p>
              <p className="font-mono font-medium">{booking.booking_number}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Status */}
          <div className="flex items-center justify-between">
            <Badge variant="outline" className={cn("text-sm", status.color)}>
              {status.label}
            </Badge>
            {isUpcoming && (
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                Bevorstehend
              </span>
            )}
          </div>

          {/* Customer Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Kunde</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">{booking.customer_name}</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{booking.customer_email}</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{booking.customer_phone}</span>
              </div>
            </div>
          </div>

          {/* Appointment Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Termin</h4>
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">
                    {appointmentDate.toLocaleDateString('de-CH', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long'
                    })}
                  </p>
                  <p className="text-sm text-muted-foreground">{booking.appointment_time} Uhr</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <span>{booking.duration} Minuten</span>
              </div>
            </div>
          </div>

          {/* Service Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Service</h4>
            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">Massage</p>
                <p className="font-medium">{booking.massage}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">Erlebnis</p>
                <p className="font-medium">{booking.theme}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">Therapeut</p>
                <p className="font-medium">{booking.masseur}</p>
              </div>
            </div>
          </div>

          {/* Notes */}
          {booking.additional_notes && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Notizen</h4>
              <div className="p-3 rounded-lg bg-muted/50">
                <div className="flex items-start gap-2">
                  <MessageSquare className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <p className="text-sm">{booking.additional_notes}</p>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="space-y-3 pt-4 border-t border-border">
            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Schnellaktionen</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                className="gap-2 bg-emerald-500/10 border-emerald-500/30 text-emerald-600 hover:bg-emerald-500/20"
                onClick={() => onUpdateStatus(booking.id, 'confirmed')}
                disabled={booking.status === 'confirmed'}
              >
                <Check className="w-4 h-4" />
                Bestätigen
              </Button>
              <Button 
                variant="outline"
                className="gap-2 bg-blue-500/10 border-blue-500/30 text-blue-600 hover:bg-blue-500/20"
                onClick={() => onUpdateStatus(booking.id, 'completed')}
                disabled={booking.status === 'completed'}
              >
                <Check className="w-4 h-4" />
                Abschliessen
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
