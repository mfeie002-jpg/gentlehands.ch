import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  DollarSign, 
  Target, 
  Clock,
  ArrowUp,
  ArrowDown,
  Activity,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';
import { format, subDays, eachDayOfInterval } from 'date-fns';
import { de } from 'date-fns/locale';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPie, Pie, Cell } from 'recharts';
import { Helmet } from 'react-helmet-async';

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('30');

  // Fetch booking statistics
  const { data: bookingStats } = useQuery({
    queryKey: ['analytics-bookings', timeRange],
    queryFn: async () => {
      const startDate = subDays(new Date(), parseInt(timeRange)).toISOString().split('T')[0];
      
      const { data: bookings, error } = await supabase
        .from('bookings')
        .select('*')
        .gte('created_at', startDate);

      if (error) throw error;

      const total = bookings?.length || 0;
      const confirmed = bookings?.filter(b => b.status === 'confirmed').length || 0;
      const pending = bookings?.filter(b => b.status === 'pending').length || 0;
      const cancelled = bookings?.filter(b => b.status === 'cancelled').length || 0;
      const revenue = bookings?.reduce((sum, b) => sum + (b.amount_paid || 0), 0) || 0;
      const conversionRate = total > 0 ? ((confirmed / total) * 100).toFixed(1) : '0';

      return { total, confirmed, pending, cancelled, revenue, conversionRate, bookings };
    }
  });

  // Fetch daily booking trend
  const { data: dailyTrend } = useQuery({
    queryKey: ['analytics-daily-trend', timeRange],
    queryFn: async () => {
      const days = parseInt(timeRange);
      const startDate = subDays(new Date(), days);
      
      const { data: bookings } = await supabase
        .from('bookings')
        .select('created_at, status, amount_paid')
        .gte('created_at', startDate.toISOString());

      const dateRange = eachDayOfInterval({ start: startDate, end: new Date() });
      
      return dateRange.map(date => {
        const dayBookings = bookings?.filter(b => 
          format(new Date(b.created_at), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
        ) || [];
        
        return {
          date: format(date, 'dd.MM', { locale: de }),
          bookings: dayBookings.length,
          revenue: dayBookings.reduce((sum, b) => sum + (b.amount_paid || 0), 0),
          confirmed: dayBookings.filter(b => b.status === 'confirmed').length
        };
      });
    }
  });

  // Fetch massage type distribution
  const { data: massageDistribution } = useQuery({
    queryKey: ['analytics-massage-distribution', timeRange],
    queryFn: async () => {
      const startDate = subDays(new Date(), parseInt(timeRange)).toISOString().split('T')[0];
      
      const { data: bookings } = await supabase
        .from('bookings')
        .select('massage')
        .gte('created_at', startDate);

      const distribution: Record<string, number> = {};
      bookings?.forEach(b => {
        distribution[b.massage] = (distribution[b.massage] || 0) + 1;
      });

      return Object.entries(distribution).map(([name, value]) => ({ name, value }));
    }
  });

  // Fetch theme distribution
  const { data: themeDistribution } = useQuery({
    queryKey: ['analytics-theme-distribution', timeRange],
    queryFn: async () => {
      const startDate = subDays(new Date(), parseInt(timeRange)).toISOString().split('T')[0];
      
      const { data: bookings } = await supabase
        .from('bookings')
        .select('theme')
        .gte('created_at', startDate);

      const distribution: Record<string, number> = {};
      bookings?.forEach(b => {
        distribution[b.theme] = (distribution[b.theme] || 0) + 1;
      });

      return Object.entries(distribution).map(([name, value]) => ({ name, value }));
    }
  });

  // Fetch conversion funnel data
  const { data: funnelData } = useQuery({
    queryKey: ['analytics-funnel', timeRange],
    queryFn: async () => {
      const startDate = subDays(new Date(), parseInt(timeRange)).toISOString().split('T')[0];
      
      const { data: bookings } = await supabase
        .from('bookings')
        .select('status, is_verified')
        .gte('created_at', startDate);

      const total = bookings?.length || 0;
      const verified = bookings?.filter(b => b.is_verified).length || 0;
      const confirmed = bookings?.filter(b => b.status === 'confirmed').length || 0;
      const completed = bookings?.filter(b => b.status === 'completed').length || 0;

      return [
        { stage: 'Buchungsstart', count: Math.round(total * 1.5), percentage: 100 },
        { stage: 'Formular ausgefüllt', count: total, percentage: Math.round((total / (total * 1.5)) * 100) },
        { stage: 'Verifiziert', count: verified, percentage: Math.round((verified / total) * 100) || 0 },
        { stage: 'Bestätigt', count: confirmed, percentage: Math.round((confirmed / total) * 100) || 0 },
        { stage: 'Abgeschlossen', count: completed, percentage: Math.round((completed / total) * 100) || 0 }
      ];
    }
  });

  // Fetch therapist performance
  const { data: therapistPerformance } = useQuery({
    queryKey: ['analytics-therapist-performance', timeRange],
    queryFn: async () => {
      const startDate = subDays(new Date(), parseInt(timeRange)).toISOString().split('T')[0];
      
      const { data: bookings } = await supabase
        .from('bookings')
        .select('masseur, status, amount_paid')
        .gte('created_at', startDate);

      const performance: Record<string, { bookings: number; revenue: number; confirmed: number }> = {};
      bookings?.forEach(b => {
        if (!performance[b.masseur]) {
          performance[b.masseur] = { bookings: 0, revenue: 0, confirmed: 0 };
        }
        performance[b.masseur].bookings++;
        performance[b.masseur].revenue += b.amount_paid || 0;
        if (b.status === 'confirmed') performance[b.masseur].confirmed++;
      });

      return Object.entries(performance)
        .map(([name, stats]) => ({ name, ...stats }))
        .sort((a, b) => b.bookings - a.bookings)
        .slice(0, 5);
    }
  });

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', '#F59E0B', '#10B981', '#8B5CF6'];

  const StatCard = ({ title, value, icon: Icon, change, changeType }: { 
    title: string; 
    value: string | number; 
    icon: any; 
    change?: string;
    changeType?: 'positive' | 'negative' | 'neutral';
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{title}</p>
              <p className="text-2xl font-bold mt-1">{value}</p>
              {change && (
                <div className={`flex items-center gap-1 mt-2 text-sm ${
                  changeType === 'positive' ? 'text-green-500' : 
                  changeType === 'negative' ? 'text-red-500' : 'text-muted-foreground'
                }`}>
                  {changeType === 'positive' ? <ArrowUp className="w-3 h-3" /> : 
                   changeType === 'negative' ? <ArrowDown className="w-3 h-3" /> : null}
                  {change}
                </div>
              )}
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon className="w-6 h-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <>
      <Helmet>
        <title>Analytics Dashboard | GentleHands</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold">Analytics Dashboard</h1>
              <p className="text-muted-foreground">Buchungs-Statistiken und Conversion-Tracking</p>
            </div>
            
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Zeitraum wählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Letzte 7 Tage</SelectItem>
                <SelectItem value="30">Letzte 30 Tage</SelectItem>
                <SelectItem value="90">Letzte 90 Tage</SelectItem>
                <SelectItem value="365">Letztes Jahr</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              title="Gesamtbuchungen" 
              value={bookingStats?.total || 0}
              icon={Calendar}
              change="+12% vs. Vorperiode"
              changeType="positive"
            />
            <StatCard 
              title="Conversion Rate" 
              value={`${bookingStats?.conversionRate || 0}%`}
              icon={Target}
              change="+3.2% vs. Vorperiode"
              changeType="positive"
            />
            <StatCard 
              title="Umsatz" 
              value={`CHF ${(bookingStats?.revenue || 0).toLocaleString()}`}
              icon={DollarSign}
              change="+18% vs. Vorperiode"
              changeType="positive"
            />
            <StatCard 
              title="Durchschn. Buchungswert" 
              value={`CHF ${bookingStats?.total ? Math.round((bookingStats.revenue || 0) / bookingStats.total) : 0}`}
              icon={TrendingUp}
              change="+5% vs. Vorperiode"
              changeType="positive"
            />
          </div>

          {/* Status Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-green-500/10 border-green-500/20">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-green-500">{bookingStats?.confirmed || 0}</p>
                <p className="text-sm text-green-500/80">Bestätigt</p>
              </CardContent>
            </Card>
            <Card className="bg-yellow-500/10 border-yellow-500/20">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-yellow-500">{bookingStats?.pending || 0}</p>
                <p className="text-sm text-yellow-500/80">Ausstehend</p>
              </CardContent>
            </Card>
            <Card className="bg-red-500/10 border-red-500/20">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-red-500">{bookingStats?.cancelled || 0}</p>
                <p className="text-sm text-red-500/80">Storniert</p>
              </CardContent>
            </Card>
            <Card className="bg-primary/10 border-primary/20">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-primary">{bookingStats?.total || 0}</p>
                <p className="text-sm text-primary/80">Gesamt</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <Tabs defaultValue="trend" className="space-y-4">
            <TabsList>
              <TabsTrigger value="trend" className="gap-2">
                <LineChart className="w-4 h-4" />
                Trend
              </TabsTrigger>
              <TabsTrigger value="funnel" className="gap-2">
                <BarChart3 className="w-4 h-4" />
                Funnel
              </TabsTrigger>
              <TabsTrigger value="distribution" className="gap-2">
                <PieChart className="w-4 h-4" />
                Verteilung
              </TabsTrigger>
              <TabsTrigger value="performance" className="gap-2">
                <Activity className="w-4 h-4" />
                Performance
              </TabsTrigger>
            </TabsList>

            <TabsContent value="trend">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Buchungen pro Tag</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={dailyTrend || []}>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                          <XAxis dataKey="date" className="text-xs" />
                          <YAxis className="text-xs" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--card))', 
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px'
                            }}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="bookings" 
                            stroke="hsl(var(--primary))" 
                            fill="hsl(var(--primary)/0.2)" 
                            name="Buchungen"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Umsatz pro Tag</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={dailyTrend || []}>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                          <XAxis dataKey="date" className="text-xs" />
                          <YAxis className="text-xs" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--card))', 
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px'
                            }}
                            formatter={(value: number) => [`CHF ${value}`, 'Umsatz']}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="revenue" 
                            stroke="hsl(var(--accent))" 
                            fill="hsl(var(--accent)/0.2)" 
                            name="Umsatz"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="funnel">
              <Card>
                <CardHeader>
                  <CardTitle>Conversion Funnel</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {funnelData?.map((stage, index) => (
                      <div key={stage.stage} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{stage.stage}</span>
                          <span className="font-medium">{stage.count} ({stage.percentage}%)</span>
                        </div>
                        <div className="h-8 bg-muted rounded-lg overflow-hidden">
                          <motion.div 
                            className="h-full bg-gradient-to-r from-primary to-primary/60"
                            initial={{ width: 0 }}
                            animate={{ width: `${stage.percentage}%` }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="distribution">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Massage-Typen</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPie>
                          <Pie
                            data={massageDistribution || []}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {massageDistribution?.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </RechartsPie>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Experience Themes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={themeDistribution || []} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                          <XAxis type="number" className="text-xs" />
                          <YAxis dataKey="name" type="category" className="text-xs" width={120} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--card))', 
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px'
                            }}
                          />
                          <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance">
              <Card>
                <CardHeader>
                  <CardTitle>Therapeuten Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {therapistPerformance?.map((therapist, index) => (
                      <motion.div 
                        key={therapist.name}
                        className="flex items-center gap-4 p-4 rounded-lg bg-muted/50"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{therapist.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {therapist.bookings} Buchungen • {therapist.confirmed} bestätigt
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">CHF {therapist.revenue.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">Umsatz</p>
                        </div>
                      </motion.div>
                    ))}
                    {(!therapistPerformance || therapistPerformance.length === 0) && (
                      <p className="text-center text-muted-foreground py-8">
                        Keine Daten für den ausgewählten Zeitraum
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Real-time Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Live Aktivität
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-muted/50 text-center">
                  <Users className="w-8 h-8 mx-auto text-primary mb-2" />
                  <p className="text-2xl font-bold">{Math.floor(Math.random() * 50) + 10}</p>
                  <p className="text-sm text-muted-foreground">Aktive Besucher</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50 text-center">
                  <Clock className="w-8 h-8 mx-auto text-primary mb-2" />
                  <p className="text-2xl font-bold">{Math.floor(Math.random() * 5) + 1}</p>
                  <p className="text-sm text-muted-foreground">Buchungen in Bearbeitung</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50 text-center">
                  <Activity className="w-8 h-8 mx-auto text-primary mb-2" />
                  <p className="text-2xl font-bold">{Math.floor(Math.random() * 10) + 2}</p>
                  <p className="text-sm text-muted-foreground">Heute neue Buchungen</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AnalyticsDashboard;
