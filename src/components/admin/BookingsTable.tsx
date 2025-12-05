import { motion, AnimatePresence } from "framer-motion";
import { 
  MoreHorizontal, 
  Check, 
  X, 
  Clock, 
  Trash2,
  Mail,
  Phone,
  Calendar,
  User,
  MapPin,
  FileText
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { Booking } from "@/hooks/useAdmin";

interface BookingsTableProps {
  bookings: Booking[];
  searchQuery: string;
  onUpdateStatus: (id: string, status: string) => Promise<boolean>;
  onDelete: (id: string) => Promise<boolean>;
}

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  pending: { label: "Ausstehend", color: "bg-amber-500/20 text-amber-600 border-amber-500/30", icon: Clock },
  confirmed: { label: "Bestätigt", color: "bg-emerald-500/20 text-emerald-600 border-emerald-500/30", icon: Check },
  cancelled: { label: "Storniert", color: "bg-red-500/20 text-red-600 border-red-500/30", icon: X },
  completed: { label: "Abgeschlossen", color: "bg-blue-500/20 text-blue-600 border-blue-500/30", icon: Check },
};

export const BookingsTable = ({ bookings, searchQuery, onUpdateStatus, onDelete }: BookingsTableProps) => {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filteredBookings = bookings.filter(booking => {
    const query = searchQuery.toLowerCase();
    return (
      booking.customer_name.toLowerCase().includes(query) ||
      booking.customer_email.toLowerCase().includes(query) ||
      booking.booking_number.toLowerCase().includes(query) ||
      booking.massage.toLowerCase().includes(query)
    );
  });

  const handleDelete = async () => {
    if (deleteId) {
      await onDelete(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <>
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-4 font-medium text-muted-foreground">Buchung</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Kunde</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Service</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Termin</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                <th className="text-right p-4 font-medium text-muted-foreground">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredBookings.map((booking, index) => {
                  const status = statusConfig[booking.status || 'pending'];
                  const StatusIcon = status.icon;
                  
                  return (
                    <motion.tr
                      key={booking.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors cursor-pointer"
                      onClick={() => setSelectedBooking(booking)}
                    >
                      <td className="p-4">
                        <div>
                          <p className="font-mono text-sm font-medium">{booking.booking_number}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(booking.created_at).toLocaleDateString('de-CH')}
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium">{booking.customer_name}</p>
                          <p className="text-sm text-muted-foreground">{booking.customer_email}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium">{booking.massage}</p>
                          <p className="text-sm text-muted-foreground">{booking.theme} • {booking.duration} Min</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium">
                            {new Date(booking.appointment_date).toLocaleDateString('de-CH', { 
                              weekday: 'short', 
                              day: 'numeric', 
                              month: 'short' 
                            })}
                          </p>
                          <p className="text-sm text-muted-foreground">{booking.appointment_time} Uhr</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className={cn("gap-1", status.color)}>
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </Badge>
                      </td>
                      <td className="p-4 text-right" onClick={e => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onUpdateStatus(booking.id, 'confirmed')}>
                              <Check className="w-4 h-4 mr-2 text-emerald-500" />
                              Bestätigen
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onUpdateStatus(booking.id, 'completed')}>
                              <Check className="w-4 h-4 mr-2 text-blue-500" />
                              Abschliessen
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onUpdateStatus(booking.id, 'cancelled')}>
                              <X className="w-4 h-4 mr-2 text-amber-500" />
                              Stornieren
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => setDeleteId(booking.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Löschen
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        
        {filteredBookings.length === 0 && (
          <div className="p-12 text-center text-muted-foreground">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Keine Buchungen gefunden</p>
          </div>
        )}
      </div>

      {/* Booking Detail Modal */}
      <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-playfair text-2xl">Buchungsdetails</DialogTitle>
            <DialogDescription>
              {selectedBooking?.booking_number}
            </DialogDescription>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="grid grid-cols-2 gap-6 mt-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Kunde</p>
                    <p className="font-medium">{selectedBooking.customer_name}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">E-Mail</p>
                    <p className="font-medium">{selectedBooking.customer_email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Telefon</p>
                    <p className="font-medium">{selectedBooking.customer_phone}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Erlebnis</p>
                    <p className="font-medium">{selectedBooking.theme}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Termin</p>
                    <p className="font-medium">
                      {new Date(selectedBooking.appointment_date).toLocaleDateString('de-CH', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })} um {selectedBooking.appointment_time} Uhr
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Service</p>
                    <p className="font-medium">{selectedBooking.massage} • {selectedBooking.duration} Min</p>
                    <p className="text-sm text-muted-foreground">Therapeut: {selectedBooking.masseur}</p>
                  </div>
                </div>
              </div>
              
              {selectedBooking.additional_notes && (
                <div className="col-span-2 p-4 rounded-xl bg-muted/50">
                  <p className="text-sm text-muted-foreground mb-1">Notizen</p>
                  <p>{selectedBooking.additional_notes}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Buchung löschen?</AlertDialogTitle>
            <AlertDialogDescription>
              Diese Aktion kann nicht rückgängig gemacht werden. Die Buchung wird permanent gelöscht.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Löschen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
