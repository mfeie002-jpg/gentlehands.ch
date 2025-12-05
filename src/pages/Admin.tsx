import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  useAdminAuth, 
  useBookings, 
  useTestimonials, 
  useGiftCards, 
  useActivityLogs,
  useAdminStats 
} from "@/hooks/useAdmin";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { StatsCards } from "@/components/admin/StatsCards";
import { BookingsTable } from "@/components/admin/BookingsTable";
import { TestimonialsManager } from "@/components/admin/TestimonialsManager";
import { GiftCardsManager } from "@/components/admin/GiftCardsManager";
import { ActivityFeed } from "@/components/admin/ActivityFeed";
import { RevenueChart } from "@/components/admin/RevenueChart";
import { BookingsCalendar } from "@/components/admin/BookingsCalendar";
import { QuickActions } from "@/components/admin/QuickActions";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAdmin, isLoading: authLoading, user } = useAdminAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { bookings, isLoading: bookingsLoading, updateBookingStatus, deleteBooking, refetch: refetchBookings } = useBookings();
  const { testimonials, isLoading: testimonialsLoading, approveTestimonial, deleteTestimonial, refetch: refetchTestimonials } = useTestimonials();
  const { giftCards, isLoading: giftCardsLoading, createGiftCard, updateGiftCardBalance, refetch: refetchGiftCards } = useGiftCards();
  const { logs, isLoading: logsLoading } = useActivityLogs();
  const { stats, isLoading: statsLoading } = useAdminStats();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [authLoading, user, navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleRefresh = () => {
    refetchBookings();
    refetchTestimonials();
    refetchGiftCards();
    toast({ title: "Aktualisiert", description: "Daten wurden neu geladen" });
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'new-giftcard':
        setActiveTab('giftcards');
        break;
      case 'export':
        exportToCSV();
        break;
      default:
        toast({ title: "Aktion", description: `${action} ausgeführt` });
    }
  };

  const exportToCSV = () => {
    const headers = ['Buchungsnummer', 'Kunde', 'Email', 'Massage', 'Datum', 'Status'];
    const rows = bookings.map(b => [
      b.booking_number,
      b.customer_name,
      b.customer_email,
      b.massage,
      b.appointment_date,
      b.status
    ]);
    
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `buchungen-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    
    toast({ title: "Export", description: "CSV wurde heruntergeladen" });
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Dashboard';
      case 'bookings': return 'Buchungen';
      case 'testimonials': return 'Testimonials';
      case 'giftcards': return 'Gutscheine';
      case 'activity': return 'Aktivität';
      case 'users': return 'Benutzer';
      case 'settings': return 'Einstellungen';
      default: return 'Admin';
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Laden...</p>
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 rounded-2xl border border-border bg-card max-w-md"
        >
          <h1 className="text-2xl font-bold font-playfair mb-4">Zugriff verweigert</h1>
          <p className="text-muted-foreground mb-6">
            Sie haben keine Administratorrechte für diese Seite.
          </p>
          <button
            onClick={() => navigate("/")}
            className="text-primary hover:underline"
          >
            Zurück zur Startseite
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | GentleHands</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <AdminSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          onLogout={handleLogout}
        />

        <main className={`transition-all duration-300 ${sidebarCollapsed ? "ml-20" : "ml-64"}`}>
          <AdminHeader
            title={getTabTitle()}
            onSearch={setSearchQuery}
            onRefresh={handleRefresh}
          />

          <div className="p-6">
            <AnimatePresence mode="wait">
              {activeTab === "dashboard" && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <StatsCards stats={stats} />
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <RevenueChart bookings={bookings} />
                    </div>
                    <QuickActions onAction={handleQuickAction} />
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <BookingsCalendar bookings={bookings} />
                    <ActivityFeed logs={logs.slice(0, 10)} isLoading={logsLoading} />
                  </div>
                </motion.div>
              )}

              {activeTab === "bookings" && (
                <motion.div
                  key="bookings"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <BookingsTable
                    bookings={bookings}
                    searchQuery={searchQuery}
                    onUpdateStatus={updateBookingStatus}
                    onDelete={deleteBooking}
                  />
                </motion.div>
              )}

              {activeTab === "testimonials" && (
                <motion.div
                  key="testimonials"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <TestimonialsManager
                    testimonials={testimonials}
                    searchQuery={searchQuery}
                    onApprove={approveTestimonial}
                    onDelete={deleteTestimonial}
                  />
                </motion.div>
              )}

              {activeTab === "giftcards" && (
                <motion.div
                  key="giftcards"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <GiftCardsManager
                    giftCards={giftCards}
                    searchQuery={searchQuery}
                    onCreate={createGiftCard}
                    onUpdateBalance={updateGiftCardBalance}
                  />
                </motion.div>
              )}

              {activeTab === "activity" && (
                <motion.div
                  key="activity"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <ActivityFeed logs={logs} isLoading={logsLoading} />
                </motion.div>
              )}

              {(activeTab === "users" || activeTab === "settings") && (
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-12 text-center text-muted-foreground rounded-2xl border border-dashed"
                >
                  <p>Dieser Bereich wird bald verfügbar sein.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </>
  );
};

export default Admin;
