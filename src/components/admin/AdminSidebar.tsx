import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Calendar, 
  MessageSquare, 
  Gift, 
  Activity,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  UserCog,
  Camera
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/Logo";

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onLogout: () => void;
}

const menuItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'bookings', icon: Calendar, label: 'Buchungen' },
  { id: 'therapists', icon: UserCog, label: 'Therapeuten' },
  { id: 'testimonials', icon: MessageSquare, label: 'Testimonials' },
  { id: 'giftcards', icon: Gift, label: 'Gutscheine' },
  { id: 'activity', icon: Activity, label: 'Aktivität' },
  { id: 'users', icon: Users, label: 'Benutzer' },
  { id: 'websitetools', icon: Camera, label: 'Website-Tools' },
  { id: 'settings', icon: Settings, label: 'Einstellungen' },
];

export const AdminSidebar = ({ 
  activeTab, 
  onTabChange, 
  isCollapsed, 
  onToggleCollapse,
  onLogout 
}: AdminSidebarProps) => {
  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={cn(
        "fixed left-0 top-0 h-screen bg-card border-r border-border z-50 flex flex-col transition-all duration-300",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <Logo className="h-8" />
            <span className="font-playfair text-lg font-semibold">Admin</span>
          </motion.div>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-2 rounded-lg hover:bg-muted transition-colors"
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
              activeTab === item.id
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "hover:bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium"
              >
                {item.label}
              </motion.span>
            )}
          </motion.button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <motion.button
          onClick={onLogout}
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-all"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span className="font-medium">Abmelden</span>}
        </motion.button>
      </div>
    </motion.aside>
  );
};
