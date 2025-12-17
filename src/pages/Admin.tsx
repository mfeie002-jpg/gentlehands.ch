import { useState, useEffect, useMemo } from "react";
import { SEOHead } from "@/components/shared/SEOHead";
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
import { UsersManager } from "@/components/admin/UsersManager";
import { SettingsPanel } from "@/components/admin/SettingsPanel";
import { TestDataGenerator } from "@/components/admin/TestDataGenerator";
import { RealtimeBookingNotifications } from "@/components/admin/RealtimeBookingNotifications";
import { LiveBookingCounter } from "@/components/admin/LiveBookingCounter";
import { BookingStatusNotifications } from "@/components/admin/BookingStatusNotifications";
import { WeeklyOverview } from "@/components/admin/WeeklyOverview";
import { PerformanceMetrics } from "@/components/admin/PerformanceMetrics";
import { TopMassages } from "@/components/admin/TopMassages";
import { RecentCustomers } from "@/components/admin/RecentCustomers";
import { UpcomingAppointments } from "@/components/admin/UpcomingAppointments";
import { ExportOptions } from "@/components/admin/ExportOptions";
import { AdminNotificationBell } from "@/components/admin/AdminNotificationBell";
import { CustomerInsights } from "@/components/admin/CustomerInsights";
import { BookingTrends } from "@/components/admin/BookingTrends";
import { TherapistPerformance } from "@/components/admin/TherapistPerformance";
import { RevenueBreakdown } from "@/components/admin/RevenueBreakdown";
import { CustomerFeedbackSummary } from "@/components/admin/CustomerFeedbackSummary";
import { BookingHeatmap } from "@/components/admin/BookingHeatmap";
import { QuickNotes } from "@/components/admin/QuickNotes";
import { SystemHealth } from "@/components/admin/SystemHealth";
import { GoalTracker } from "@/components/admin/GoalTracker";
import { TherapistsManager } from "@/components/admin/TherapistsManager";

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
      case 'therapists': return 'Therapeuten';
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
      <SEOHead
        title="Admin Dashboard | GentleHands"
        description="GentleHands Admin Dashboard"
        noIndex={true}
      />

      <div className="min-h-screen bg-background">
        {/* Realtime notifications */}
        <RealtimeBookingNotifications onNewBooking={handleRefresh} />
        <BookingStatusNotifications onStatusChange={handleRefresh} />

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
          >
            <div className="flex items-center gap-4">
              <LiveBookingCounter />
              <AdminNotificationBell />
            </div>
          </AdminHeader>

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
                  {/* Main Stats */}
                  <StatsCards stats={stats} />
                  
                  {/* Performance & Goals */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <GoalTracker bookings={bookings} />
                    <SystemHealth />
                  </div>
                  
                  {/* Charts Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <RevenueChart bookings={bookings} />
                    </div>
                    <RevenueBreakdown bookings={bookings} />
                  </div>
                  
                  {/* Analytics Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <BookingTrends bookings={bookings} />
                    <TopMassages bookings={bookings} />
                    <TherapistPerformance bookings={bookings} />
                  </div>
                  
                  {/* Heatmap & Insights */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <BookingHeatmap bookings={bookings} />
                    <CustomerInsights bookings={bookings} />
                  </div>
                  
                  {/* Upcoming & Performance */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <UpcomingAppointments bookings={bookings} />
                    <PerformanceMetrics bookings={bookings} />
                    <RecentCustomers bookings={bookings} />
                  </div>
                  
                  {/* Quick Actions & Tools */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <QuickActions onAction={handleQuickAction} />
                    <TestDataGenerator onDataGenerated={handleRefresh} />
                    <QuickNotes />
                  </div>
                  
                  {/* Feedback & Calendar */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <CustomerFeedbackSummary testimonials={testimonials} />
                    <WeeklyOverview bookings={bookings} />
                  </div>
                  
                  {/* Calendar & Activity */}
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
                  className="space-y-6"
                >
                  {/* Export Options */}
                  <div className="flex justify-end">
                    <ExportOptions />
                  </div>
                  
                  <BookingsTable
                    bookings={bookings}
                    searchQuery={searchQuery}
                    onUpdateStatus={updateBookingStatus}
                    onDelete={deleteBooking}
                  />
                </motion.div>
              )}

              {activeTab === "therapists" && (
                <motion.div
                  key="therapists"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <TherapistsManager />
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

              {activeTab === "users" && (
                <motion.div
                  key="users"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <UsersManager />
                </motion.div>
              )}

              {activeTab === "settings" && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <SettingsPanel />
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
