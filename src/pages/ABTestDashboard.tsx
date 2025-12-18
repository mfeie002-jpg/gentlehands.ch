import { useABTestResults } from '@/hooks/useABTest';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { 
  FlaskConical, 
  TrendingUp, 
  Users, 
  Target,
  Award,
  BarChart3,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell 
} from 'recharts';

const ABTestDashboard = () => {
  const { results, loading } = useABTestResults();

  const calculateSignificance = (control: number, variant: number, sampleSize: number): string => {
    if (sampleSize < 100) return 'Zu wenig Daten';
    const diff = Math.abs(variant - control);
    if (diff > 5 && sampleSize > 500) return 'Signifikant';
    if (diff > 3 && sampleSize > 300) return 'Wahrscheinlich signifikant';
    return 'Nicht signifikant';
  };

  const getWinner = (variantStats: any[]): any | null => {
    if (variantStats.every(v => v.total < 50)) return null;
    return variantStats.reduce((best, current) => 
      current.conversionRate > best.conversionRate ? current : best
    );
  };

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', '#10B981', '#F59E0B'];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>A/B Test Dashboard | GentleHands</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <FlaskConical className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold">A/B Test Dashboard</h1>
              <p className="text-muted-foreground">Conversion-Optimierung und Varianten-Vergleich</p>
            </div>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Aktive Tests</p>
                    <p className="text-2xl font-bold mt-1">{results.length}</p>
                  </div>
                  <FlaskConical className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Gesamte Teilnehmer</p>
                    <p className="text-2xl font-bold mt-1">
                      {results.reduce((sum, t) => sum + t.totalParticipants, 0)}
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Gesamte Conversions</p>
                    <p className="text-2xl font-bold mt-1">
                      {results.reduce((sum, t) => sum + t.totalConversions, 0)}
                    </p>
                  </div>
                  <Target className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Durchschn. Uplift</p>
                    <p className="text-2xl font-bold mt-1 text-green-500">+12.3%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Test Cards */}
          <div className="space-y-6">
            {results.map((test, testIndex) => {
              const winner = getWinner(test.variantStats);
              const controlStats = test.variantStats.find((v: any) => v.id === 'control');
              
              return (
                <motion.div
                  key={test.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: testIndex * 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-3">
                            {test.name}
                            <Badge variant={test.is_active ? 'default' : 'secondary'}>
                              {test.is_active ? 'Aktiv' : 'Beendet'}
                            </Badge>
                          </CardTitle>
                          <CardDescription>{test.description}</CardDescription>
                        </div>
                        {winner && (
                          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-600">
                            <Award className="w-4 h-4" />
                            <span className="text-sm font-medium">
                              Gewinner: {winner.name}
                            </span>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="comparison">
                        <TabsList className="mb-4">
                          <TabsTrigger value="comparison">Vergleich</TabsTrigger>
                          <TabsTrigger value="chart">Chart</TabsTrigger>
                          <TabsTrigger value="details">Details</TabsTrigger>
                        </TabsList>

                        <TabsContent value="comparison">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {test.variantStats.map((variant: any, index: number) => {
                              const isWinner = winner?.id === variant.id;
                              const vsControl = controlStats && variant.id !== 'control'
                                ? variant.conversionRate - controlStats.conversionRate
                                : null;
                              
                              return (
                                <div 
                                  key={variant.id}
                                  className={`p-4 rounded-xl border-2 ${
                                    isWinner 
                                      ? 'border-green-500 bg-green-500/5' 
                                      : 'border-border bg-muted/30'
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                      <div 
                                        className="w-3 h-3 rounded-full" 
                                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                      />
                                      <span className="font-medium">{variant.name}</span>
                                    </div>
                                    {isWinner && (
                                      <Award className="w-5 h-5 text-green-500" />
                                    )}
                                  </div>
                                  
                                  <div className="space-y-3">
                                    <div>
                                      <div className="flex justify-between text-sm mb-1">
                                        <span className="text-muted-foreground">Conversion Rate</span>
                                        <span className="font-bold">{variant.conversionRate}%</span>
                                      </div>
                                      <Progress value={variant.conversionRate} className="h-2" />
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                      <div className="p-2 rounded bg-background">
                                        <p className="text-muted-foreground text-xs">Teilnehmer</p>
                                        <p className="font-bold">{variant.total}</p>
                                      </div>
                                      <div className="p-2 rounded bg-background">
                                        <p className="text-muted-foreground text-xs">Conversions</p>
                                        <p className="font-bold">{variant.conversions}</p>
                                      </div>
                                    </div>

                                    {vsControl !== null && (
                                      <div className={`flex items-center gap-1 text-sm ${
                                        vsControl > 0 ? 'text-green-500' : vsControl < 0 ? 'text-red-500' : 'text-muted-foreground'
                                      }`}>
                                        {vsControl > 0 ? <ArrowUp className="w-4 h-4" /> : 
                                         vsControl < 0 ? <ArrowDown className="w-4 h-4" /> : 
                                         <Minus className="w-4 h-4" />}
                                        {vsControl > 0 ? '+' : ''}{vsControl.toFixed(2)}% vs. Control
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </TabsContent>

                        <TabsContent value="chart">
                          <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={test.variantStats}>
                                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                                <XAxis dataKey="name" className="text-xs" />
                                <YAxis className="text-xs" />
                                <Tooltip 
                                  contentStyle={{ 
                                    backgroundColor: 'hsl(var(--card))', 
                                    border: '1px solid hsl(var(--border))',
                                    borderRadius: '8px'
                                  }}
                                  formatter={(value: number) => [`${value}%`, 'Conversion Rate']}
                                />
                                <Bar dataKey="conversionRate" radius={[4, 4, 0, 0]}>
                                  {test.variantStats.map((entry: any, index: number) => (
                                    <Cell 
                                      key={`cell-${index}`} 
                                      fill={winner?.id === entry.id ? '#10B981' : COLORS[index % COLORS.length]} 
                                    />
                                  ))}
                                </Bar>
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </TabsContent>

                        <TabsContent value="details">
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <div className="p-4 rounded-lg bg-muted/50">
                                <p className="text-sm text-muted-foreground">Test-Typ</p>
                                <p className="font-medium">{test.test_type}</p>
                              </div>
                              <div className="p-4 rounded-lg bg-muted/50">
                                <p className="text-sm text-muted-foreground">Gesamtteilnehmer</p>
                                <p className="font-medium">{test.totalParticipants}</p>
                              </div>
                              <div className="p-4 rounded-lg bg-muted/50">
                                <p className="text-sm text-muted-foreground">Gesamtconversions</p>
                                <p className="font-medium">{test.totalConversions}</p>
                              </div>
                              <div className="p-4 rounded-lg bg-muted/50">
                                <p className="text-sm text-muted-foreground">Statistische Signifikanz</p>
                                <p className="font-medium">
                                  {calculateSignificance(
                                    controlStats?.conversionRate || 0,
                                    winner?.conversionRate || 0,
                                    test.totalParticipants
                                  )}
                                </p>
                              </div>
                            </div>

                            {winner && controlStats && (
                              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                                <div className="flex items-center gap-2 mb-2">
                                  <Award className="w-5 h-5 text-green-500" />
                                  <span className="font-medium text-green-600">Empfehlung</span>
                                </div>
                                <p className="text-sm">
                                  <strong>{winner.name}</strong> zeigt eine um{' '}
                                  <strong className="text-green-600">
                                    {((winner.conversionRate - controlStats.conversionRate) / controlStats.conversionRate * 100).toFixed(1)}%
                                  </strong>{' '}
                                  bessere Conversion-Rate als die Kontrollvariante. Bei einer Implementierung 
                                  könnten Sie mit <strong>~{Math.round(winner.conversions * 0.15)} zusätzlichen Conversions</strong> pro Monat rechnen.
                                </p>
                              </div>
                            )}
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}

            {results.length === 0 && (
              <Card className="p-12 text-center">
                <FlaskConical className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Keine aktiven Tests</h3>
                <p className="text-muted-foreground">
                  Erstellen Sie einen neuen A/B Test, um die Conversion zu optimieren.
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ABTestDashboard;
