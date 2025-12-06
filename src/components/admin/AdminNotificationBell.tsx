import { motion, AnimatePresence } from "framer-motion";
import { Bell, Calendar, MessageSquare, Gift, X, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatDistanceToNow } from "date-fns";
import { de } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: 'booking' | 'testimonial' | 'gift_card';
  title: string;
  description: string;
  createdAt: string;
  read: boolean;
}

export const AdminNotificationBell = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const fetchNotifications = async () => {
    // Fetch recent activity as notifications
    const [bookings, testimonials, giftCards] = await Promise.all([
      supabase.from('bookings').select('id, customer_name, massage, created_at')
        .order('created_at', { ascending: false }).limit(5),
      supabase.from('testimonial_submissions').select('id, name, created_at: submitted_at')
        .eq('is_approved', false).order('submitted_at', { ascending: false }).limit(3),
      supabase.from('gift_cards').select('id, code, value, created_at')
        .order('created_at', { ascending: false }).limit(3)
    ]);

    const notifs: Notification[] = [];

    bookings.data?.forEach(b => {
      notifs.push({
        id: `booking-${b.id}`,
        type: 'booking',
        title: 'Neue Buchung',
        description: `${b.customer_name} - ${b.massage}`,
        createdAt: b.created_at,
        read: false
      });
    });

    testimonials.data?.forEach(t => {
      notifs.push({
        id: `testimonial-${t.id}`,
        type: 'testimonial',
        title: 'Neues Testimonial',
        description: `Von ${t.name} - wartet auf Genehmigung`,
        createdAt: t.created_at,
        read: false
      });
    });

    giftCards.data?.forEach(g => {
      notifs.push({
        id: `giftcard-${g.id}`,
        type: 'gift_card',
        title: 'Neuer Gutschein',
        description: `${g.code} - CHF ${g.value}`,
        createdAt: g.created_at,
        read: false
      });
    });

    // Sort by date
    notifs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    setNotifications(notifs.slice(0, 10));
    setUnreadCount(notifs.filter(n => !n.read).length);
  };

  useEffect(() => {
    fetchNotifications();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('admin-notifications')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'bookings' }, fetchNotifications)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'testimonial_submissions' }, fetchNotifications)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'gift_cards' }, fetchNotifications)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'booking': return Calendar;
      case 'testimonial': return MessageSquare;
      case 'gift_card': return Gift;
      default: return Bell;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'booking': return 'bg-blue-500/10 text-blue-500';
      case 'testimonial': return 'bg-pink-500/10 text-pink-500';
      case 'gift_card': return 'bg-emerald-500/10 text-emerald-500';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <AnimatePresence>
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center"
              >
                {unreadCount > 9 ? '9+' : unreadCount}
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h4 className="font-semibold">Benachrichtigungen</h4>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllRead}
              className="h-8 text-xs"
            >
              <Check className="w-3 h-3 mr-1" />
              Alle gelesen
            </Button>
          )}
        </div>

        <div className="max-h-96 overflow-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Keine neuen Benachrichtigungen</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {notifications.map((notif, index) => {
                const Icon = getIcon(notif.type);
                return (
                  <motion.div
                    key={notif.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={cn(
                      "p-4 hover:bg-muted/50 transition-colors cursor-pointer",
                      !notif.read && "bg-primary/5"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", getColor(notif.type))}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{notif.title}</p>
                        <p className="text-sm text-muted-foreground truncate">{notif.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true, locale: de })}
                        </p>
                      </div>
                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
