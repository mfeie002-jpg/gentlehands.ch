import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  BarChart3, 
  Map, 
  FlaskConical, 
  MousePointer, 
  TrendingUp, 
  Users,
  Target,
  Activity,
  ArrowRight
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const analyticsModules = [
  {
    title: 'Buchungs-Analytics',
    description: 'KPIs, Revenue-Trends und Conversion-Tracking',
    icon: BarChart3,
    href: '/analytics',
    stats: { label: 'Buchungen', value: '127' },
    color: 'from-blue-500 to-blue-600',
  },
  {
    title: 'Customer Journey',
    description: 'Visualisierung des Kundenwegs von Besuch bis Buchung',
    icon: Map,
    href: '/customer-journey',
    stats: { label: 'Sessions', value: '2.4k' },
    color: 'from-green-500 to-green-600',
  },
  {
    title: 'A/B Testing',
    description: 'Varianten-Vergleich und Conversion-Optimierung',
    icon: FlaskConical,
    href: '/ab-tests',
    stats: { label: 'Aktive Tests', value: '3' },
    color: 'from-purple-500 to-purple-600',
  },
  {
    title: 'Heatmap Analytics',
    description: 'Klick-Verhalten und Scroll-Tiefe visualisiert',
    icon: MousePointer,
    href: '/heatmap',
    stats: { label: 'Datenpunkte', value: '15k' },
    color: 'from-orange-500 to-orange-600',
  },
];

const quickStats = [
  { label: 'Conversion Rate', value: '4.8%', change: '+0.5%', icon: Target },
  { label: 'Aktive Besucher', value: '47', change: '+12', icon: Users },
  { label: 'Heute Buchungen', value: '8', change: '+3', icon: Activity },
  { label: 'Avg. Session', value: '3:42', change: '+0:23', icon: TrendingUp },
];

const AnalyticsHub = () => {
  return (
    <>
      <Helmet>
        <title>Analytics Hub | GentleHands</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-display font-bold mb-2">Analytics Hub</h1>
            <p className="text-lg text-muted-foreground">
              Zentrale Übersicht aller Analyse-Tools für datengetriebene Entscheidungen
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-card/50 backdrop-blur border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Icon className="w-5 h-5 text-primary" />
                        <span className="text-xs text-green-500 font-medium">{stat.change}</span>
                      </div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Analytics Modules */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {analyticsModules.map((module, index) => {
              const Icon = module.icon;
              return (
                <motion.div
                  key={module.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <Link to={module.href}>
                    <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden">
                      <div className={`h-2 bg-gradient-to-r ${module.color}`} />
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold">{module.stats.value}</p>
                            <p className="text-xs text-muted-foreground">{module.stats.label}</p>
                          </div>
                        </div>
                        <CardTitle className="mt-4 group-hover:text-primary transition-colors">
                          {module.title}
                        </CardTitle>
                        <CardDescription>{module.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center text-sm text-primary font-medium">
                          Dashboard öffnen
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Live Activity Feed */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Live Aktivität
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { action: 'Buchung abgeschlossen', time: 'vor 2 Min', page: '/buchung' },
                  { action: 'Seite besucht', time: 'vor 5 Min', page: '/erlebnisse' },
                  { action: 'Quiz gestartet', time: 'vor 8 Min', page: '/quiz' },
                  { action: 'Gutschein eingelöst', time: 'vor 12 Min', page: '/gutscheine' },
                  { action: 'Newsletter Signup', time: 'vor 15 Min', page: '/' },
                ].map((event, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div className="flex items-center gap-3">
                      <Activity className="w-4 h-4 text-primary" />
                      <span className="font-medium">{event.action}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{event.page}</span>
                      <span>{event.time}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AnalyticsHub;
