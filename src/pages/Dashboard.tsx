import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/shared/SEOHead";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { 
  Calendar, Heart, Gift, Star, Clock, User, Settings, LogOut, 
  ChevronRight, Sparkles, BookOpen, Award, Bell, TrendingUp
} from "lucide-react";
import { FavoritesTab } from "@/components/dashboard/FavoritesTab";
import { JournalTab } from "@/components/dashboard/JournalTab";
import { SettingsTab } from "@/components/dashboard/SettingsTab";
import { ProfileCompletion } from "@/components/dashboard/ProfileCompletion";
import { LoyaltyRewards } from "@/components/dashboard/LoyaltyRewards";
import { BookingReminders } from "@/components/dashboard/BookingReminders";
import { QuickRebook } from "@/components/dashboard/QuickRebook";
import { BookingExport } from "@/components/dashboard/BookingExport";
import { MobileNavigation } from "@/components/dashboard/MobileNavigation";
import { NotificationCenter } from "@/components/dashboard/NotificationCenter";
import { TestimonialSubmission } from "@/components/dashboard/TestimonialSubmission";
import { ReferralProgram } from "@/components/dashboard/ReferralProgram";
import { WellnessInsights } from "@/components/dashboard/WellnessInsights";
import { PersonalRecommendations } from "@/components/dashboard/PersonalRecommendations";
import { SocialProofFeed } from "@/components/dashboard/SocialProofFeed";
import { BookingReschedule } from "@/components/dashboard/BookingReschedule";
import { BookingCancellation } from "@/components/dashboard/BookingCancellation";
import { WelcomeCard } from "@/components/dashboard/WelcomeCard";
import { UpcomingBooking } from "@/components/dashboard/UpcomingBooking";
import { RecentSessions } from "@/components/dashboard/RecentSessions";
import { WellnessProgress } from "@/components/dashboard/WellnessProgress";

interface UserProfile {
  full_name: string | null;
  phone: string | null;
  preferred_therapist: string | null;
  preferred_theme: string | null;
  loyalty_points: number;
  total_bookings: number;
  member_since: string;
}

interface Booking {
  id: string;
  booking_number: string;
  appointment_date: string;
  appointment_time: string;
  massage: string;
  theme: string;
  masseur: string;
  duration: string;
  status: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [journalEntries, setJournalEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/login");
      return;
    }
    setUser(session.user);
    fetchAllData(session.user.id, session.user.email);
  };

  const fetchAllData = async (userId: string, email: string | undefined) => {
    const [profileRes, bookingsRes, favoritesRes, journalRes] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', userId).single(),
      email ? supabase.from('bookings').select('*').eq('customer_email', email).order('appointment_date', { ascending: false }) : Promise.resolve({ data: [] }),
      supabase.from('favorites').select('*').eq('user_id', userId),
      supabase.from('session_notes').select('*').eq('user_id', userId),
    ]);

    if (profileRes.data) setProfile(profileRes.data);
    if (bookingsRes.data) setBookings(bookingsRes.data);
    if (favoritesRes.data) setFavorites(favoritesRes.data);
    if (journalRes.data) setJournalEntries(journalRes.data);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const upcomingBookings = bookings.filter(b => new Date(b.appointment_date) >= new Date());
  const pastBookings = bookings.filter(b => new Date(b.appointment_date) < new Date());

  const tabs = [
    { id: "overview", label: "Übersicht", icon: TrendingUp },
    { id: "bookings", label: "Buchungen", icon: Calendar },
    { id: "rewards", label: "Treueprogramm", icon: Award },
    { id: "favorites", label: "Favoriten", icon: Heart },
    { id: "journal", label: "Journal", icon: BookOpen },
    { id: "settings", label: "Einstellungen", icon: Settings },
  ];

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-copper border-t-transparent rounded-full"
          />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead
        title="Mein Bereich | GentleHands Zürich"
        description="Verwalten Sie Ihre Buchungen, Favoriten und Einstellungen."
        noIndex={true}
      />

      <section className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
          >
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground">
                Willkommen zurück, <span className="text-gradient-copper">{profile?.full_name || user?.email?.split('@')[0]}</span>
              </h1>
              <p className="text-muted-foreground mt-1">
                Mitglied seit {profile?.member_since ? new Date(profile.member_since).toLocaleDateString('de-CH', { month: 'long', year: 'numeric' }) : 'heute'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <NotificationCenter 
                userId={user?.id || ''} 
                loyaltyPoints={profile?.loyalty_points || 0} 
                upcomingBookings={upcomingBookings} 
              />
              <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2 text-muted-foreground">
                <LogOut className="w-4 h-4" />
                Abmelden
              </Button>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            <div className="glass rounded-2xl p-5 border border-border/50 cursor-pointer hover:border-copper/30 transition-colors" onClick={() => setActiveTab("bookings")}>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-copper/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-copper" />
                </div>
                {upcomingBookings.length > 0 && <span className="text-xs text-emerald-500 font-medium">Aktiv</span>}
              </div>
              <p className="text-2xl font-bold text-foreground">{upcomingBookings.length}</p>
              <p className="text-sm text-muted-foreground">Anstehende Termine</p>
            </div>

            <div className="glass rounded-2xl p-5 border border-border/50 cursor-pointer hover:border-petrol/30 transition-colors" onClick={() => setActiveTab("rewards")}>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-petrol/10 flex items-center justify-center">
                  <Award className="w-5 h-5 text-petrol" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{profile?.loyalty_points || 0}</p>
              <p className="text-sm text-muted-foreground">Treuepunkte</p>
            </div>

            <div className="glass rounded-2xl p-5 border border-border/50">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-rose-500" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{profile?.total_bookings || bookings.length}</p>
              <p className="text-sm text-muted-foreground">Erlebnisse gesamt</p>
            </div>

            <div className="glass rounded-2xl p-5 border border-border/50">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-amber-500" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {(profile?.total_bookings || 0) >= 30 ? 'Platin' : 
                 (profile?.total_bookings || 0) >= 15 ? 'Gold' : 
                 (profile?.total_bookings || 0) >= 5 ? 'Silber' : 'Bronze'}
              </p>
              <p className="text-sm text-muted-foreground">Mitgliedsstatus</p>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="glass rounded-2xl p-4 border border-border/50 sticky top-24">
                <nav className="space-y-1">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        activeTab === tab.id 
                          ? "bg-copper text-background" 
                          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  ))}
                </nav>

                <div className="mt-6 pt-6 border-t border-border/50">
                  <Button variant="copper" className="w-full" asChild>
                    <Link to="/buchung">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Neues Erlebnis
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-3"
            >
              <AnimatePresence mode="wait">
                {activeTab === "overview" && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    {/* Welcome Card */}
                    <WelcomeCard 
                      userName={profile?.full_name || user?.email?.split('@')[0] || 'Gast'}
                    />

                    {/* Profile Completion */}
                    <ProfileCompletion
                      profile={profile}
                      hasBookings={bookings.length > 0}
                      hasFavorites={favorites.length > 0}
                      hasJournalEntries={journalEntries.length > 0}
                    />

                    {/* Upcoming Booking */}
                    {upcomingBookings.length > 0 && (
                      <UpcomingBooking booking={{
                        date: new Date(upcomingBookings[0].appointment_date).toLocaleDateString('de-CH'),
                        time: upcomingBookings[0].appointment_time,
                        massage: upcomingBookings[0].massage,
                        therapist: upcomingBookings[0].masseur,
                        theme: upcomingBookings[0].theme
                      }} />
                    )}

                    {/* Wellness Progress */}
                    <WellnessProgress />

                    {/* Recent Sessions */}
                    <RecentSessions />

                    {/* Booking Reminders */}
                    {upcomingBookings.length > 0 && (
                      <BookingReminders upcomingBookings={upcomingBookings} />
                    )}

                    {/* Quick Rebook */}
                    {pastBookings.length > 0 && (
                      <QuickRebook pastBookings={pastBookings} />
                    )}

                    {/* Wellness Insights */}
                    <WellnessInsights 
                      bookings={bookings} 
                      journalEntries={journalEntries} 
                      loyaltyPoints={profile?.loyalty_points || 0} 
                    />

                    {/* Personal Recommendations */}
                    <PersonalRecommendations 
                      bookings={bookings} 
                      preferences={{ 
                        preferred_theme: profile?.preferred_theme, 
                        preferred_therapist: profile?.preferred_therapist 
                      }} 
                    />

                    {/* Referral Program */}
                    <ReferralProgram userId={user?.id || ''} />

                    {/* Testimonial Submission */}
                    {pastBookings.length > 0 && (
                      <TestimonialSubmission 
                        userName={profile?.full_name || user?.email?.split('@')[0] || ''} 
                        userId={user?.id || ''} 
                        recentBookings={pastBookings.slice(0, 3)} 
                      />
                    )}

                    {/* Social Proof */}
                    <SocialProofFeed />
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
                    <div className="glass rounded-2xl p-6 border border-border/50">
                      <h3 className="font-display font-semibold text-foreground mb-6">Alle Buchungen</h3>
                      
                      {upcomingBookings.length > 0 && (
                        <div className="mb-8">
                          <h4 className="text-sm font-medium text-copper uppercase tracking-wider mb-3">Anstehend</h4>
                          <div className="space-y-3">
                            {upcomingBookings.map(booking => (
                              <div key={booking.id} className="p-4 rounded-xl border border-copper/20 bg-copper/5">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <p className="font-medium text-foreground">{booking.massage}</p>
                                    <p className="text-sm text-muted-foreground">{booking.theme} • {booking.masseur}</p>
                                    <div className="flex items-center gap-3 mt-2 text-sm">
                                      <span className="flex items-center gap-1 text-copper">
                                        <Calendar className="w-4 h-4" />
                                        {new Date(booking.appointment_date).toLocaleDateString('de-CH')}
                                      </span>
                                      <span className="flex items-center gap-1 text-copper">
                                        <Clock className="w-4 h-4" />
                                        {booking.appointment_time}
                                      </span>
                                    </div>
                                  </div>
                                  <span className="text-xs font-mono text-muted-foreground">{booking.booking_number}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">Vergangen</h4>
                        <div className="space-y-3">
                          {pastBookings.map(booking => (
                            <div key={booking.id} className="p-4 rounded-xl bg-muted/30">
                              <div className="flex items-start justify-between">
                                <div>
                                  <p className="font-medium text-foreground">{booking.massage}</p>
                                  <p className="text-sm text-muted-foreground">{booking.theme} • {booking.masseur}</p>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {new Date(booking.appointment_date).toLocaleDateString('de-CH')}
                                  </p>
                                </div>
                                <Button variant="ghost" size="sm" asChild>
                                  <Link to={`/buchung?massage=${encodeURIComponent(booking.massage)}&theme=${encodeURIComponent(booking.theme)}`}>
                                    Erneut buchen
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          ))}
                          {pastBookings.length === 0 && (
                            <p className="text-center text-muted-foreground py-8">
                              Noch keine vergangenen Buchungen
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Export Section */}
                    <BookingExport bookings={bookings} />
                  </motion.div>
                )}

                {activeTab === "rewards" && (
                  <LoyaltyRewards 
                    points={profile?.loyalty_points || 0} 
                    totalBookings={profile?.total_bookings || bookings.length} 
                  />
                )}

                {activeTab === "favorites" && user && (
                  <FavoritesTab userId={user.id} />
                )}

                {activeTab === "journal" && user && (
                  <JournalTab userId={user.id} userEmail={user.email || ""} />
                )}

                {activeTab === "settings" && user && (
                  <SettingsTab userId={user.id} userEmail={user.email || ""} />
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <MobileNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </section>
    </Layout>
  );
};

export default Dashboard;
