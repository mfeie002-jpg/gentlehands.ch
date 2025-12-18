import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { 
  Users, 
  MousePointer, 
  Clock, 
  TrendingUp,
  Map,
  ArrowRight,
  Smartphone,
  Monitor,
  Tablet,
  Eye
} from 'lucide-react';
import { format, subDays } from 'date-fns';
import { de } from 'date-fns/locale';
import { Helmet } from 'react-helmet-async';
import { 
  Sankey, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface JourneyEvent {
  type: string;
  page?: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

interface Journey {
  id: string;
  session_id: string;
  events: JourneyEvent[];
  started_at: string;
  completed_at: string | null;
  conversion_type: string | null;
  source: string;
  device_type: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
}

const CustomerJourneyDashboard = () => {
  const [timeRange, setTimeRange] = useState('7');

  const { data: journeys, isLoading } = useQuery({
    queryKey: ['customer-journeys', timeRange],
    queryFn: async () => {
      const startDate = subDays(new Date(), parseInt(timeRange)).toISOString();
      
      const { data, error } = await supabase
        .from('customer_journeys')
        .select('*')
        .gte('started_at', startDate)
        .order('started_at', { ascending: false });

      if (error) throw error;
      return (data || []).map(d => ({
        ...d,
        events: d.events as unknown as JourneyEvent[]
      })) as Journey[];
    }
  });

  // Calculate metrics
  const totalJourneys = journeys?.length || 0;
  const completedJourneys = journeys?.filter(j => j.completed_at).length || 0;
  const conversionRate = totalJourneys > 0 ? ((completedJourneys / totalJourneys) * 100).toFixed(1) : '0';
  
  const avgEvents = journeys?.length 
    ? (journeys.reduce((sum, j) => sum + (j.events?.length || 0), 0) / journeys.length).toFixed(1)
    : '0';

  // Device distribution
  const deviceData = [
    { name: 'Desktop', value: journeys?.filter(j => j.device_type === 'desktop').length || 0, icon: Monitor },
    { name: 'Mobile', value: journeys?.filter(j => j.device_type === 'mobile').length || 0, icon: Smartphone },
    { name: 'Tablet', value: journeys?.filter(j => j.device_type === 'tablet').length || 0, icon: Tablet },
  ];

  // Source distribution
  const sourceData = journeys?.reduce((acc, j) => {
    const source = j.source || 'direct';
    const key = source.includes('google') ? 'Google' 
      : source.includes('facebook') ? 'Facebook'
      : source.includes('instagram') ? 'Instagram'
      : source === 'direct' ? 'Direkt'
      : 'Andere';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  const sourceChartData = Object.entries(sourceData).map(([name, value]) => ({ name, value }));

  // Page flow analysis
  const pageFlowData = journeys?.reduce((acc, journey) => {
    const pageViews = journey.events?.filter(e => e.type === 'page_view') || [];
    pageViews.forEach((event, index) => {
      if (index < pageViews.length - 1) {
        const from = event.metadata?.path || '/';
        const to = pageViews[index + 1].metadata?.path || '/';
        const key = `${from} → ${to}`;
        acc[key] = (acc[key] || 0) + 1;
      }
    });
    return acc;
  }, {} as Record<string, number>) || {};

  const topFlows = Object.entries(pageFlowData)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([flow, count]) => ({ flow, count }));

  // Funnel data
  const funnelStages = [
    { stage: 'Seitenbesuch', count: totalJourneys },
    { stage: 'Erlebnisse angesehen', count: journeys?.filter(j => j.events?.some(e => e.type === 'experience_view')).length || 0 },
    { stage: 'Buchung gestartet', count: journeys?.filter(j => j.events?.some(e => e.type === 'booking_start')).length || 0 },
    { stage: 'Formular ausgefüllt', count: journeys?.filter(j => j.events?.some(e => e.type === 'booking_step' && e.metadata?.step >= 4)).length || 0 },
    { stage: 'Buchung abgeschlossen', count: completedJourneys },
  ];

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', '#F59E0B', '#10B981'];

  const StatCard = ({ title, value, icon: Icon, subtitle }: { 
    title: string; 
    value: string | number; 
    icon: any; 
    subtitle?: string;
  }) => (
    <Card className="bg-card/50 backdrop-blur border-border/50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
          </div>
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      <Helmet>
        <title>Customer Journey Dashboard | GentleHands</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold">Customer Journey</h1>
              <p className="text-muted-foreground">Analyse des Kundenverhaltens von Besuch bis Buchung</p>
            </div>
            
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Zeitraum wählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Letzte 7 Tage</SelectItem>
                <SelectItem value="30">Letzte 30 Tage</SelectItem>
                <SelectItem value="90">Letzte 90 Tage</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              title="Besuchs-Sessions" 
              value={totalJourneys}
              icon={Users}
            />
            <StatCard 
              title="Conversion Rate" 
              value={`${conversionRate}%`}
              icon={TrendingUp}
              subtitle="Besuch → Buchung"
            />
            <StatCard 
              title="Durchschn. Interaktionen" 
              value={avgEvents}
              icon={MousePointer}
              subtitle="pro Session"
            />
            <StatCard 
              title="Abgeschlossene Buchungen" 
              value={completedJourneys}
              icon={Eye}
            />
          </div>

          <Tabs defaultValue="funnel" className="space-y-4">
            <TabsList>
              <TabsTrigger value="funnel" className="gap-2">
                <TrendingUp className="w-4 h-4" />
                Conversion Funnel
              </TabsTrigger>
              <TabsTrigger value="flow" className="gap-2">
                <Map className="w-4 h-4" />
                Page Flow
              </TabsTrigger>
              <TabsTrigger value="sources" className="gap-2">
                <Users className="w-4 h-4" />
                Traffic Sources
              </TabsTrigger>
              <TabsTrigger value="devices" className="gap-2">
                <Monitor className="w-4 h-4" />
                Geräte
              </TabsTrigger>
            </TabsList>

            <TabsContent value="funnel">
              <Card>
                <CardHeader>
                  <CardTitle>Conversion Funnel</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {funnelStages.map((stage, index) => {
                      const percentage = totalJourneys > 0 
                        ? ((stage.count / totalJourneys) * 100).toFixed(1) 
                        : '0';
                      const dropoff = index > 0 
                        ? ((1 - stage.count / funnelStages[index - 1].count) * 100).toFixed(1)
                        : null;
                      
                      return (
                        <div key={stage.stage} className="relative">
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                                {index + 1}
                              </span>
                              <span className="font-medium">{stage.stage}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-muted-foreground">{stage.count} Sessions</span>
                              <span className="font-bold">{percentage}%</span>
                            </div>
                          </div>
                          <div className="h-10 bg-muted rounded-lg overflow-hidden">
                            <motion.div 
                              className="h-full bg-gradient-to-r from-primary to-primary/60 flex items-center justify-end pr-4"
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                              {parseFloat(percentage) > 20 && (
                                <span className="text-white text-sm font-medium">{percentage}%</span>
                              )}
                            </motion.div>
                          </div>
                          {dropoff && parseFloat(dropoff) > 0 && (
                            <div className="flex items-center gap-1 mt-1 text-xs text-red-500">
                              <ArrowRight className="w-3 h-3 rotate-90" />
                              {dropoff}% Absprung
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="flow">
              <Card>
                <CardHeader>
                  <CardTitle>Top Seitenübergänge</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={topFlows} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                        <XAxis type="number" className="text-xs" />
                        <YAxis dataKey="flow" type="category" width={200} className="text-xs" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                        />
                        <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sources">
              <Card>
                <CardHeader>
                  <CardTitle>Traffic-Quellen</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={sourceChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {sourceChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-3">
                      {sourceChartData.map((source, index) => (
                        <div key={source.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <span>{source.name}</span>
                          </div>
                          <span className="font-bold">{source.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="devices">
              <Card>
                <CardHeader>
                  <CardTitle>Geräteverteilung</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {deviceData.map((device, index) => {
                      const Icon = device.icon;
                      const percentage = totalJourneys > 0 
                        ? ((device.value / totalJourneys) * 100).toFixed(1) 
                        : '0';
                      
                      return (
                        <motion.div 
                          key={device.name}
                          className="p-6 rounded-xl bg-muted/50 text-center"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Icon className="w-12 h-12 mx-auto text-primary mb-4" />
                          <p className="text-3xl font-bold">{device.value}</p>
                          <p className="text-sm text-muted-foreground">{device.name}</p>
                          <p className="text-lg font-medium text-primary mt-2">{percentage}%</p>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Recent Journeys */}
          <Card>
            <CardHeader>
              <CardTitle>Letzte Customer Journeys</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {journeys?.slice(0, 5).map((journey) => (
                  <div 
                    key={journey.id} 
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${journey.completed_at ? 'bg-green-500' : 'bg-yellow-500'}`} />
                      <div>
                        <p className="font-medium text-sm">
                          {journey.session_id.substring(0, 20)}...
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(journey.started_at), 'dd.MM.yyyy HH:mm', { locale: de })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm">{journey.events?.length || 0} Events</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        journey.completed_at 
                          ? 'bg-green-500/20 text-green-600' 
                          : 'bg-yellow-500/20 text-yellow-600'
                      }`}>
                        {journey.completed_at ? 'Konvertiert' : 'Offen'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CustomerJourneyDashboard;
