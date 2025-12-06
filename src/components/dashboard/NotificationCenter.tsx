import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bell, Calendar, Gift, Star, Award, X, Check, 
  Clock, ChevronRight, Sparkles 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { format, parseISO, isAfter, addDays } from "date-fns";
import { de } from "date-fns/locale";

interface Notification {
  id: string;
  type: 'booking' | 'reward' | 'reminder' | 'promo' | 'milestone';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    link: string;
  };
}

interface NotificationCenterProps {
  userId: string;
  loyaltyPoints: number;
  upcomingBookings: any[];
}

export const NotificationCenter = ({ userId, loyaltyPoints, upcomingBookings }: NotificationCenterProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    generateNotifications();
  }, [upcomingBookings, loyaltyPoints]);

  const generateNotifications = () => {
    const notifs: Notification[] = [];
    const now = new Date();

    // Upcoming appointment reminders
    upcomingBookings.forEach((booking, index) => {
      const appointmentDate = parseISO(booking.appointment_date);
      const daysUntil = Math.ceil((appointmentDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysUntil <= 3 && daysUntil > 0) {
        notifs.push({
          id: `booking-${booking.id}`,
          type: 'reminder',
          title: `Termin in ${daysUntil === 1 ? 'einem Tag' : `${daysUntil} Tagen`}`,
          message: `${booking.massage} am ${format(appointmentDate, 'd. MMMM', { locale: de })} um ${booking.appointment_time}`,
          timestamp: new Date(now.getTime() - index * 3600000),
          read: false,
          action: { label: 'Details', link: '/dashboard?tab=bookings' }
        });
      }
    });

    // Loyalty points milestone
    const milestones = [100, 250, 500, 1000];
    const nextMilestone = milestones.find(m => m > loyaltyPoints);
    if (nextMilestone && loyaltyPoints >= nextMilestone - 50) {
      notifs.push({
        id: 'milestone-close',
        type: 'milestone',
        title: 'Fast geschafft!',
        message: `Nur noch ${nextMilestone - loyaltyPoints} Punkte bis zu Ihrem nächsten Reward.`,
        timestamp: new Date(now.getTime() - 7200000),
        read: false,
        action: { label: 'Rewards', link: '/dashboard?tab=rewards' }
      });
    }

    // Seasonal promo
    notifs.push({
      id: 'winter-promo',
      type: 'promo',
      title: 'Winter Wellness Special',
      message: 'Geniessen Sie 15% auf alle Alpine Stille Erlebnisse bis Ende Januar.',
      timestamp: new Date(now.getTime() - 86400000),
      read: true,
      action: { label: 'Entdecken', link: '/saisonal' }
    });

    // Welcome message for new users
    if (loyaltyPoints === 0 && upcomingBookings.length === 0) {
      notifs.push({
        id: 'welcome',
        type: 'reward',
        title: 'Willkommen bei GentleHands!',
        message: 'Entdecken Sie unsere exklusiven Wellness-Erlebnisse.',
        timestamp: now,
        read: false,
        action: { label: 'Erlebnisse', link: '/erlebnisse' }
      });
    }

    setNotifications(notifs);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'booking': return Calendar;
      case 'reward': return Award;
      case 'reminder': return Clock;
      case 'promo': return Gift;
      case 'milestone': return Star;
      default: return Bell;
    }
  };

  const getIconColor = (type: Notification['type']) => {
    switch (type) {
      case 'booking': return 'text-blue-500 bg-blue-500/10';
      case 'reward': return 'text-amber-500 bg-amber-500/10';
      case 'reminder': return 'text-copper bg-copper/10';
      case 'promo': return 'text-emerald-500 bg-emerald-500/10';
      case 'milestone': return 'text-violet-500 bg-violet-500/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="relative">
      <Button 
        variant="outline" 
        size="sm" 
        className="gap-2 relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="w-4 h-4" />
        <span className="hidden sm:inline">Benachrichtigungen</span>
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-copper text-background text-xs font-bold rounded-full flex items-center justify-center"
          >
            {unreadCount}
          </motion.span>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 top-12 w-96 max-w-[calc(100vw-2rem)] z-50 rounded-2xl border border-border bg-card shadow-xl overflow-hidden"
            >
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h3 className="font-semibold">Benachrichtigungen</h3>
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                    <Check className="w-4 h-4 mr-1" />
                    Alle gelesen
                  </Button>
                )}
              </div>

              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>Keine Benachrichtigungen</p>
                  </div>
                ) : (
                  notifications.map((notif, index) => {
                    const Icon = getIcon(notif.type);
                    return (
                      <motion.div
                        key={notif.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => markAsRead(notif.id)}
                        className={`p-4 border-b border-border/50 hover:bg-muted/50 cursor-pointer transition-colors ${
                          !notif.read ? 'bg-copper/5' : ''
                        }`}
                      >
                        <div className="flex gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${getIconColor(notif.type)}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <p className="font-medium text-foreground">{notif.title}</p>
                              {!notif.read && (
                                <span className="w-2 h-2 bg-copper rounded-full flex-shrink-0 mt-2" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">{notif.message}</p>
                            {notif.action && (
                              <a 
                                href={notif.action.link}
                                className="inline-flex items-center gap-1 text-sm text-copper hover:underline mt-1"
                              >
                                {notif.action.label}
                                <ChevronRight className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
