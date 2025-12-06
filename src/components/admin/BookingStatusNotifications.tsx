import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Check, X, Clock, CheckCircle2 } from "lucide-react";

interface BookingStatusNotificationsProps {
  onStatusChange?: () => void;
}

const statusLabels: Record<string, { label: string; icon: any; color: string }> = {
  pending: { label: "Ausstehend", icon: Clock, color: "text-amber-500" },
  confirmed: { label: "Bestätigt", icon: Check, color: "text-emerald-500" },
  cancelled: { label: "Storniert", icon: X, color: "text-red-500" },
  completed: { label: "Abgeschlossen", icon: CheckCircle2, color: "text-blue-500" }
};

export const BookingStatusNotifications = ({ onStatusChange }: BookingStatusNotificationsProps) => {
  useEffect(() => {
    const channel = supabase
      .channel('booking-status-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'bookings'
        },
        (payload) => {
          const oldStatus = (payload.old as any)?.status;
          const newStatus = (payload.new as any)?.status;
          const bookingNumber = (payload.new as any)?.booking_number;
          const customerName = (payload.new as any)?.customer_name;

          if (oldStatus !== newStatus && newStatus) {
            const statusInfo = statusLabels[newStatus] || statusLabels.pending;
            const StatusIcon = statusInfo.icon;

            toast.success(
              <div className="flex items-start gap-3">
                <StatusIcon className={`w-5 h-5 mt-0.5 ${statusInfo.color}`} />
                <div>
                  <p className="font-medium">Status geändert: {statusInfo.label}</p>
                  <p className="text-sm text-muted-foreground">
                    {customerName} • #{bookingNumber}
                  </p>
                </div>
              </div>,
              { duration: 4000 }
            );

            onStatusChange?.();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [onStatusChange]);

  return null;
};
