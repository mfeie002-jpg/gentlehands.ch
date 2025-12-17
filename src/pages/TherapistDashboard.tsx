import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/shared/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useTherapistDashboard } from "@/hooks/useTherapists";
import { format, isFuture, isPast, isToday } from "date-fns";
import { de } from "date-fns/locale";
import { 
  Calendar, Clock, User, Star, TrendingUp, CreditCard,
  MessageSquare, Settings, LogOut, ChevronRight, CheckCircle,
  AlertCircle, Loader2, GraduationCap, BookOpen, Award
} from "lucide-react";

interface Certification {
  id: string;
  massage_type_id: string;
  passed: boolean;
  quiz_score: number | null;
  certified_at: string | null;
  massage_type?: { name: string };
}

interface MassageType {
  id: string;
  name: string;
}

const TherapistDashboard = () => {
  const navigate = useNavigate();
  const { therapist, bookings, earnings, feedback, isLoading } = useTherapistDashboard();
  const [activeTab, setActiveTab] = useState("overview");
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [massageTypes, setMassageTypes] = useState<MassageType[]>([]);
  const [certificationsLoading, setCertificationsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in and is a therapist
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login?redirect=/therapeut/dashboard');
      }
    };
    checkAuth();
  }, [navigate]);

  // Fetch certifications and massage types
  useEffect(() => {
    const fetchCertifications = async () => {
      if (!therapist?.id) return;
      
      setCertificationsLoading(true);
      try {
        // Get all massage types
        const { data: types } = await supabase
          .from('massage_types')
          .select('id, name')
          .eq('is_active', true);
        setMassageTypes(types || []);

        // Get therapist's certifications
        const { data: certs } = await supabase
          .from('therapist_certifications')
          .select('*')
          .eq('therapist_id', therapist.id);
        setCertifications(certs || []);
      } catch (err) {
        console.error('Failed to fetch certifications:', err);
      } finally {
        setCertificationsLoading(false);
      }
    };

    fetchCertifications();
  }, [therapist?.id]);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="animate-spin text-copper" size={32} />
        </div>
      </Layout>
    );
  }

  if (!therapist) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <AlertCircle size={48} className="text-muted-foreground mb-4" />
          <h1 className="text-xl font-display mb-2">Kein Therapeuten-Profil gefunden</h1>
          <p className="text-muted-foreground mb-6 text-center">
            Registrieren Sie sich als Therapeut:in, um Zugang zu erhalten.
          </p>
          <Button onClick={() => navigate('/therapeut/registrierung')}>
            Jetzt registrieren
          </Button>
        </div>
      </Layout>
    );
  }

  const upcomingBookings = bookings.filter(b => 
    isFuture(new Date(b.appointment_date)) || isToday(new Date(b.appointment_date))
  );
  const pastBookings = bookings.filter(b => isPast(new Date(b.appointment_date)) && !isToday(new Date(b.appointment_date)));
  
  const totalEarnings = earnings.reduce((sum, e) => sum + (e.net_amount || 0), 0);
  const pendingEarnings = earnings.filter(e => e.status === 'pending').reduce((sum, e) => sum + (e.net_amount || 0), 0);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <Layout>
      <SEOHead
        title="Therapeuten-Dashboard | GentleHands"
        description="Verwalten Sie Ihre Termine und Einnahmen."
        noIndex
      />

      <div className="min-h-screen bg-gradient-to-b from-background to-sand/20 py-8 sm:py-12">
        <div className="container max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-2xl sm:text-3xl text-foreground mb-1">
                Willkommen, {therapist.name}
              </h1>
              <div className="flex items-center gap-2">
                <Badge variant={therapist.status === 'approved' ? 'default' : 'secondary'}>
                  {therapist.status === 'approved' ? 'Aktiv' : therapist.status}
                </Badge>
                {therapist.average_rating > 0 && (
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star size={14} className="text-amber-500 fill-amber-500" />
                    {therapist.average_rating.toFixed(1)}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => navigate('/therapeut/einstellungen')}>
                <Settings size={16} className="mr-2" />
                Einstellungen
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut size={16} className="mr-2" />
                Abmelden
              </Button>
            </div>
          </div>

          {/* Status Warning */}
          {therapist.status === 'pending' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3"
            >
              <AlertCircle className="text-amber-600 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <p className="font-medium text-amber-900">Profil in Prüfung</p>
                <p className="text-sm text-amber-700">
                  Ihr Profil wird aktuell geprüft. Sie werden per E-Mail benachrichtigt, sobald Sie freigeschaltet sind.
                </p>
              </div>
            </motion.div>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { 
                label: "Anstehende Termine", 
                value: upcomingBookings.length,
                icon: Calendar,
                color: "text-blue-600"
              },
              { 
                label: "Behandlungen gesamt", 
                value: therapist.total_bookings,
                icon: CheckCircle,
                color: "text-green-600"
              },
              { 
                label: "Ausstehend", 
                value: `CHF ${pendingEarnings.toFixed(0)}`,
                icon: Clock,
                color: "text-amber-600"
              },
              { 
                label: "Gesamteinnahmen", 
                value: `CHF ${totalEarnings.toFixed(0)}`,
                icon: TrendingUp,
                color: "text-copper"
              }
            ].map((stat, i) => (
              <Card key={i}>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-secondary ${stat.color}`}>
                      <stat.icon size={20} />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-lg sm:text-xl font-semibold text-foreground">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6 flex-wrap">
              <TabsTrigger value="overview">Übersicht</TabsTrigger>
              <TabsTrigger value="training" className="flex items-center gap-1.5">
                <GraduationCap size={14} />
                Schulung
              </TabsTrigger>
              <TabsTrigger value="bookings">Termine</TabsTrigger>
              <TabsTrigger value="earnings">Einnahmen</TabsTrigger>
              <TabsTrigger value="feedback">Bewertungen</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Upcoming Appointments */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Nächste Termine</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab('bookings')}>
                    Alle anzeigen <ChevronRight size={16} />
                  </Button>
                </CardHeader>
                <CardContent>
                  {upcomingBookings.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      Keine anstehenden Termine
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {upcomingBookings.slice(0, 5).map((booking) => (
                        <div 
                          key={booking.id}
                          className="flex items-center justify-between p-4 rounded-xl bg-secondary/50"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-copper/10 flex items-center justify-center">
                              <Calendar size={20} className="text-copper" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">
                                {booking.customer_name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {booking.massage} • {booking.duration}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-foreground">
                              {format(new Date(booking.appointment_date), 'EEE, d. MMM', { locale: de })}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {booking.appointment_time} Uhr
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recent Feedback */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Letzte Bewertungen</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab('feedback')}>
                    Alle anzeigen <ChevronRight size={16} />
                  </Button>
                </CardHeader>
                <CardContent>
                  {feedback.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      Noch keine Bewertungen
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {feedback.slice(0, 3).map((fb) => (
                        <div key={fb.id} className="p-4 rounded-xl bg-secondary/50">
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={14} 
                                className={i < fb.overall_rating ? 'text-amber-500 fill-amber-500' : 'text-muted'}
                              />
                            ))}
                          </div>
                          {fb.comment && (
                            <p className="text-sm text-foreground italic">"{fb.comment}"</p>
                          )}
                          <p className="text-xs text-muted-foreground mt-2">
                            {format(new Date(fb.submitted_at), 'd. MMMM yyyy', { locale: de })}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Training & Certifications Tab */}
            <TabsContent value="training" className="space-y-6">
              {/* Certification Progress */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Award size={20} className="text-copper" />
                    Zertifizierungsstatus
                  </CardTitle>
                  <Button variant="copper" size="sm" asChild>
                    <Link to="/therapeut/schulung">
                      <BookOpen size={16} className="mr-2" />
                      Zur Schulung
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  {certificationsLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="animate-spin text-copper" size={24} />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Overall Progress */}
                      <div className="p-4 rounded-xl bg-secondary/50 mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-foreground">Gesamtfortschritt</span>
                          <span className="text-sm text-copper font-semibold">
                            {certifications.filter(c => c.passed).length} / {massageTypes.length} Zertifizierungen
                          </span>
                        </div>
                        <Progress 
                          value={massageTypes.length > 0 ? (certifications.filter(c => c.passed).length / massageTypes.length) * 100 : 0} 
                          className="h-2"
                        />
                      </div>

                      {/* Individual Certifications */}
                      <div className="grid gap-3">
                        {massageTypes.map((type) => {
                          const cert = certifications.find(c => c.massage_type_id === type.id);
                          const isPassed = cert?.passed;
                          
                          return (
                            <div 
                              key={type.id}
                              className={`flex items-center justify-between p-4 rounded-xl border ${
                                isPassed 
                                  ? 'bg-green-50 border-green-200' 
                                  : 'bg-secondary/30 border-border'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                  isPassed ? 'bg-green-100' : 'bg-muted'
                                }`}>
                                  {isPassed ? (
                                    <CheckCircle size={20} className="text-green-600" />
                                  ) : (
                                    <BookOpen size={20} className="text-muted-foreground" />
                                  )}
                                </div>
                                <div>
                                  <p className={`font-medium ${isPassed ? 'text-green-900' : 'text-foreground'}`}>
                                    {type.name}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {isPassed 
                                      ? `Zertifiziert am ${cert?.certified_at ? format(new Date(cert.certified_at), 'd. MMM yyyy', { locale: de }) : '-'}`
                                      : cert?.quiz_score 
                                        ? `Letzter Versuch: ${cert.quiz_score}%`
                                        : 'Noch nicht begonnen'
                                    }
                                  </p>
                                </div>
                              </div>
                              <div>
                                {isPassed ? (
                                  <Badge variant="default" className="bg-green-600">
                                    Zertifiziert
                                  </Badge>
                                ) : (
                                  <Button variant="outline" size="sm" asChild>
                                    <Link to={`/therapeut/schulung?massage=${type.id}`}>
                                      Starten
                                    </Link>
                                  </Button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {massageTypes.length === 0 && (
                        <p className="text-muted-foreground text-center py-8">
                          Keine Schulungen verfügbar
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Training Info */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-copper/10 flex items-center justify-center shrink-0">
                      <GraduationCap size={24} className="text-copper" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg text-foreground mb-2">
                        Werden Sie zertifiziert
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Absolvieren Sie unsere Schulungen für jede Massageart, um diese bei GentleHands 
                        anbieten zu können. Jede Schulung beinhaltet detaillierte Anleitungen und einen 
                        Abschlussquiz.
                      </p>
                      <Button variant="copper" asChild>
                        <Link to="/therapeut/schulung">
                          Schulungen ansehen
                          <ChevronRight size={16} />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bookings">
              <Card>
                <CardHeader>
                  <CardTitle>Alle Termine</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {bookings.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">
                        Keine Termine vorhanden
                      </p>
                    ) : (
                      bookings.map((booking) => (
                        <div 
                          key={booking.id}
                          className={`flex items-center justify-between p-4 rounded-xl ${
                            isFuture(new Date(booking.appointment_date)) 
                              ? 'bg-secondary/50' 
                              : 'bg-muted/30'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                              isFuture(new Date(booking.appointment_date))
                                ? 'bg-copper/10'
                                : 'bg-muted'
                            }`}>
                              <Calendar size={20} className={
                                isFuture(new Date(booking.appointment_date))
                                  ? 'text-copper'
                                  : 'text-muted-foreground'
                              } />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">
                                {booking.customer_name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {booking.massage} • {booking.theme}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-foreground">
                              {format(new Date(booking.appointment_date), 'EEE, d. MMM', { locale: de })}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {booking.appointment_time} Uhr • {booking.duration}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="earnings">
              <Card>
                <CardHeader>
                  <CardTitle>Einnahmenübersicht</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-green-50 border border-green-200">
                      <p className="text-sm text-green-700">Ausgezahlt</p>
                      <p className="text-2xl font-bold text-green-900">
                        CHF {earnings.filter(e => e.status === 'paid').reduce((s, e) => s + e.net_amount, 0).toFixed(2)}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                      <p className="text-sm text-amber-700">Ausstehend</p>
                      <p className="text-2xl font-bold text-amber-900">
                        CHF {pendingEarnings.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {earnings.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">
                        Noch keine Einnahmen
                      </p>
                    ) : (
                      earnings.map((earning) => (
                        <div 
                          key={earning.id}
                          className="flex items-center justify-between p-4 rounded-xl bg-secondary/50"
                        >
                          <div className="flex items-center gap-3">
                            <CreditCard size={20} className="text-muted-foreground" />
                            <div>
                              <p className="font-medium text-foreground">
                                CHF {earning.net_amount.toFixed(2)}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {format(new Date(earning.created_at), 'd. MMM yyyy', { locale: de })}
                              </p>
                            </div>
                          </div>
                          <Badge variant={earning.status === 'paid' ? 'default' : 'secondary'}>
                            {earning.status === 'paid' ? 'Ausgezahlt' : 'Ausstehend'}
                          </Badge>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="feedback">
              <Card>
                <CardHeader>
                  <CardTitle>Kundenbewertungen</CardTitle>
                </CardHeader>
                <CardContent>
                  {feedback.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      Noch keine Bewertungen erhalten
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {feedback.map((fb) => (
                        <div key={fb.id} className="p-4 rounded-xl bg-secondary/50">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  size={16} 
                                  className={i < fb.overall_rating ? 'text-amber-500 fill-amber-500' : 'text-muted'}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {format(new Date(fb.submitted_at), 'd. MMMM yyyy', { locale: de })}
                            </span>
                          </div>
                          {fb.comment && (
                            <p className="text-foreground italic mb-2">"{fb.comment}"</p>
                          )}
                          <div className="flex gap-4 text-xs text-muted-foreground">
                            <span>Atmosphäre: {fb.atmosphere_rating}/5</span>
                            <span>Behandlung: {fb.therapist_rating}/5</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default TherapistDashboard;
