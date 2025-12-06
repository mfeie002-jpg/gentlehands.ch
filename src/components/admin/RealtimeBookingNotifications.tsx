import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Bell, Calendar, User } from "lucide-react";

interface RealtimeBookingNotificationsProps {
  onNewBooking?: () => void;
}

export const RealtimeBookingNotifications = ({ onNewBooking }: RealtimeBookingNotificationsProps) => {
  const { toast } = useToast();

  useEffect(() => {
    console.log("Setting up realtime booking notifications...");

    const channel = supabase
      .channel('admin-booking-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'bookings'
        },
        (payload) => {
          console.log("New booking received:", payload);
          
          const newBooking = payload.new as {
            customer_name: string;
            massage: string;
            appointment_date: string;
            appointment_time: string;
            booking_number: string;
          };

          // Play notification sound
          try {
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleVAYTG+X0/K2jmY7HCdqeH6MpqWeg25FGDBccIiio6OYjIBoT0dDU2RygZSfrKieh3VkWlNQVmJzg5OaoqKckIBpV0tGSVdicoaXpKmooJiLfG9iWVRYYG+Ak5+lp6OZkIBxYVZQT1dmbX+Sn6aloZmRg3ZpXVZTWGJugJKfoKOgm5OGe29kW1dZYGt9jZqgoqGem5KGfHJpYVxcY2t4iJaeoKCfnJiRh31ybGZhYWZtd4aUm5+fn56bmJGIf3dxbGppa3B5hZGZnZ+fnpyamJOLg3x2cXBwcnZ8hY+WmZydnZ2cmpiVkIqEfnh1dHR2eX+GjpOXmZqam5qZl5SSjomFgX9+fn+Bg4iNkZSWl5eYmJeWlZOQjYqIhoWFhoeJi46RlJWWl5eXl5aVk5GQjoqJiIeHiIqLjY+SlJSVlZaWlpWUk5KQjoqLioqJiouMjpCSkpSUlJSVlJOTk5GPjIyLi4uLi4yNj5CSkpOTk5OTkpKSko+PjY2NjIyNjY2Oj5CRkpKSkpKSkpGRkJCOj42NjY2NjY2Oj5CRkZGSkpKRkZGRkI+Qjo6OjY6Ojo2Ojo+QkZGRkZGRkZGRkJCQj5COjo6Ojo6Ojo+PkJCQkZGRkZCQkJCQkI+Pj4+Ojo6Ojo+Pj5CQkJCQkJCQkJCQkJCPj4+Pj4+Pj4+Pj5CQkJCQkJCQkJCQkJCPj4+Pj4+Pj4+Pj5CQkJCQkJCQkJCQj4+Pj4+Pj4+Pj4+PkJCQkJCQkJCQkI+Pj4+Pj4+Pj4+Pj5CQkJCQkJCQkJCPj4+Pj4+Pj4+Pj4+QkJCQkJCQkJCPj4+Pj4+Pj4+Pj4+PkJCQkJCQkI+Pj4+Pj4+Pj4+Pj4+QkJCQkJCQj4+Pj4+Pj4+Pj4+Pj5CQkJCQkI+Pj4+Pj4+Pj4+Pj4+QkJCQkJCPj4+Pj4+Pj4+Pj4+PkJCQkJCPj4+Pj4+Pj4+Pj4+PkJCQkJCPj4+Pj4+Pj4+Pj4+PkJCQkI+Pj4+Pj4+Pj4+Pj4+QkJCQj4+Pj4+Pj4+Pj4+Pj5CQkI+Pj4+Pj4+Pj4+Pj4+QkJCPj4+Pj4+Pj4+Pj4+PkJCPj4+Pj4+Pj4+Pj4+PkJCPj4+Pj4+Pj4+Pj4+PkI+Pj4+Pj4+Pj4+Pj4+Qj4+Pj4+Pj4+Pj4+Pj5CPj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4=');
            audio.volume = 0.3;
            audio.play().catch(() => {});
          } catch (e) {
            // Audio not supported
          }

          toast({
            title: (
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-copper" />
                <span>Neue Buchung eingegangen!</span>
              </div>
            ) as any,
            description: (
              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-2 text-sm">
                  <User className="w-3 h-3" />
                  <span>{newBooking.customer_name}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-3 h-3" />
                  <span>{newBooking.massage} • {new Date(newBooking.appointment_date).toLocaleDateString('de-CH')}</span>
                </div>
                <div className="text-xs text-muted-foreground font-mono mt-1">
                  {newBooking.booking_number}
                </div>
              </div>
            ) as any,
            duration: 10000,
          });

          // Trigger refresh callback
          onNewBooking?.();
        }
      )
      .subscribe((status) => {
        console.log("Realtime subscription status:", status);
      });

    return () => {
      console.log("Cleaning up realtime subscription");
      supabase.removeChannel(channel);
    };
  }, [toast, onNewBooking]);

  // This component doesn't render anything visible
  return null;
};
