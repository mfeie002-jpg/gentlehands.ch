import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Megaphone, X, Bell, Sparkles, AlertCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Announcement {
  id: string;
  type: 'info' | 'success' | 'warning' | 'feature';
  message: string;
  dismissible: boolean;
}

// Mock announcements - could be fetched from database
const announcements: Announcement[] = [
  {
    id: '1',
    type: 'feature',
    message: 'Neu: Echtzeit-Benachrichtigungen für neue Buchungen aktiviert!',
    dismissible: true
  }
];

export const AnnouncementBanner = () => {
  const [visibleAnnouncements, setVisibleAnnouncements] = useState<Announcement[]>([]);
  const [dismissed, setDismissed] = useState<string[]>([]);

  useEffect(() => {
    // Load dismissed from localStorage
    const savedDismissed = localStorage.getItem('admin-dismissed-announcements');
    if (savedDismissed) {
      setDismissed(JSON.parse(savedDismissed));
    }
  }, []);

  useEffect(() => {
    // Filter out dismissed announcements
    setVisibleAnnouncements(
      announcements.filter(a => !dismissed.includes(a.id))
    );
  }, [dismissed]);

  const dismissAnnouncement = (id: string) => {
    const newDismissed = [...dismissed, id];
    setDismissed(newDismissed);
    localStorage.setItem('admin-dismissed-announcements', JSON.stringify(newDismissed));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'feature': return Sparkles;
      case 'warning': return AlertCircle;
      case 'success': return Bell;
      default: return Info;
    }
  };

  const getStyles = (type: string) => {
    switch (type) {
      case 'feature': 
        return 'bg-gradient-to-r from-primary/20 to-purple-500/20 border-primary/30 text-primary';
      case 'warning': 
        return 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-600';
      case 'success': 
        return 'bg-gradient-to-r from-emerald-500/20 to-green-500/20 border-emerald-500/30 text-emerald-600';
      default: 
        return 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-600';
    }
  };

  if (visibleAnnouncements.length === 0) return null;

  return (
    <AnimatePresence>
      {visibleAnnouncements.map((announcement) => {
        const Icon = getIcon(announcement.type);
        const styles = getStyles(announcement.type);

        return (
          <motion.div
            key={announcement.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-0 left-64 right-0 z-50 border-b ${styles}`}
          >
            <div className="flex items-center justify-between px-6 py-3">
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{announcement.message}</span>
              </div>
              {announcement.dismissible && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => dismissAnnouncement(announcement.id)}
                  className="h-8 w-8 p-0 hover:bg-white/20"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </motion.div>
        );
      })}
    </AnimatePresence>
  );
};
