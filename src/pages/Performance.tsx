import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/shared/SEOHead";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SchemaValidator } from "@/components/shared/SchemaValidator";
import { SEOAuditDashboard } from "@/components/seo/SEOAuditDashboard";
import { useState, useEffect } from "react";
import { 
  Gauge, 
  Clock, 
  Layout as LayoutIcon, 
  MousePointer, 
  Zap,
  FileSearch,
  Search
} from "lucide-react";

interface WebVital {
  name: string;
  value: number | null;
  rating: 'good' | 'needs-improvement' | 'poor' | 'pending';
  threshold: { good: number; needsImprovement: number };
  unit: string;
  description: string;
}

const Performance = () => {
  const [vitals, setVitals] = useState<WebVital[]>([
    {
      name: 'LCP',
      value: null,
      rating: 'pending',
      threshold: { good: 2500, needsImprovement: 4000 },
      unit: 'ms',
      description: 'Largest Contentful Paint – Zeit bis zum größten sichtbaren Element'
    },
    {
      name: 'FID',
      value: null,
      rating: 'pending',
      threshold: { good: 100, needsImprovement: 300 },
      unit: 'ms',
      description: 'First Input Delay – Reaktionszeit auf erste Interaktion'
    },
    {
      name: 'CLS',
      value: null,
      rating: 'pending',
      threshold: { good: 0.1, needsImprovement: 0.25 },
      unit: '',
      description: 'Cumulative Layout Shift – Visuelle Stabilität'
    },
    {
      name: 'FCP',
      value: null,
      rating: 'pending',
      threshold: { good: 1800, needsImprovement: 3000 },
      unit: 'ms',
      description: 'First Contentful Paint – Zeit bis zum ersten Inhalt'
    },
    {
      name: 'TTFB',
      value: null,
      rating: 'pending',
      threshold: { good: 800, needsImprovement: 1800 },
      unit: 'ms',
      description: 'Time to First Byte – Serverantwortzeit'
    },
    {
      name: 'INP',
      value: null,
      rating: 'pending',
      threshold: { good: 200, needsImprovement: 500 },
      unit: 'ms',
      description: 'Interaction to Next Paint – Interaktionslatenz'
    }
  ]);

  useEffect(() => {
    // Measure Core Web Vitals
    const measureVitals = () => {
      // LCP
      if ('PerformanceObserver' in window) {
        try {
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1] as PerformanceEntry & { startTime: number };
            updateVital('LCP', lastEntry.startTime);
          });
          lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

          // FID
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: PerformanceEntry & { processingStart: number; startTime: number }) => {
              updateVital('FID', entry.processingStart - entry.startTime);
            });
          });
          fidObserver.observe({ type: 'first-input', buffered: true });

          // CLS
          let clsValue = 0;
          const clsObserver = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry: PerformanceEntry & { hadRecentInput: boolean; value: number }) => {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
                updateVital('CLS', clsValue);
              }
            });
          });
          clsObserver.observe({ type: 'layout-shift', buffered: true });

          // FCP
          const fcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const fcpEntry = entries.find(e => e.name === 'first-contentful-paint');
            if (fcpEntry) {
              updateVital('FCP', fcpEntry.startTime);
            }
          });
          fcpObserver.observe({ type: 'paint', buffered: true });
        } catch (e) {
          console.log('PerformanceObserver not fully supported');
        }
      }

      // TTFB
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigationEntry) {
        updateVital('TTFB', navigationEntry.responseStart - navigationEntry.requestStart);
      }
    };

    const updateVital = (name: string, value: number) => {
      setVitals(prev => prev.map(vital => {
        if (vital.name === name) {
          const rating = getRating(value, vital.threshold);
          return { ...vital, value, rating };
        }
        return vital;
      }));
    };

    const getRating = (value: number, threshold: { good: number; needsImprovement: number }): 'good' | 'needs-improvement' | 'poor' => {
      if (value <= threshold.good) return 'good';
      if (value <= threshold.needsImprovement) return 'needs-improvement';
      return 'poor';
    };

    measureVitals();
  }, []);

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good': return 'bg-green-500';
      case 'needs-improvement': return 'bg-amber-500';
      case 'poor': return 'bg-red-500';
      default: return 'bg-muted';
    }
  };

  const getRatingLabel = (rating: string) => {
    switch (rating) {
      case 'good': return 'Gut';
      case 'needs-improvement': return 'Verbesserungswürdig';
      case 'poor': return 'Schlecht';
      default: return 'Messung...';
    }
  };

  const vitalIcons: Record<string, typeof Gauge> = {
    LCP: LayoutIcon,
    FID: MousePointer,
    CLS: LayoutIcon,
    FCP: Clock,
    TTFB: Zap,
    INP: MousePointer
  };

  return (
    <Layout>
      <SEOHead
        title="Performance & SEO Dashboard"
        description="Core Web Vitals und SEO-Analyse für GentleHands"
        noIndex={true}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Performance & SEO Dashboard</h1>
          <p className="text-muted-foreground mb-8">
            Überwachen Sie Core Web Vitals, SEO-Metriken und strukturierte Daten
          </p>

          <Tabs defaultValue="vitals" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="vitals" className="flex items-center gap-2">
                <Gauge className="h-4 w-4" />
                Core Web Vitals
              </TabsTrigger>
              <TabsTrigger value="seo" className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                SEO-Audit
              </TabsTrigger>
              <TabsTrigger value="schema" className="flex items-center gap-2">
                <FileSearch className="h-4 w-4" />
                Schema.org
              </TabsTrigger>
            </TabsList>

            <TabsContent value="vitals" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {vitals.map((vital) => {
                  const Icon = vitalIcons[vital.name] || Gauge;
                  return (
                    <Card key={vital.name}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon className="h-5 w-5 text-muted-foreground" />
                            <CardTitle className="text-lg">{vital.name}</CardTitle>
                          </div>
                          <Badge 
                            variant="secondary" 
                            className={`${getRatingColor(vital.rating)} text-white`}
                          >
                            {getRatingLabel(vital.rating)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold mb-2">
                          {vital.value !== null 
                            ? vital.name === 'CLS' 
                              ? vital.value.toFixed(3)
                              : `${Math.round(vital.value)}${vital.unit}`
                            : '—'
                          }
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {vital.description}
                        </p>
                        <div className="mt-3 text-xs text-muted-foreground">
                          <span className="text-green-500">Gut: ≤{vital.threshold.good}{vital.unit}</span>
                          {' • '}
                          <span className="text-red-500">Schlecht: {'>'}{vital.threshold.needsImprovement}{vital.unit}</span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Optimierungsempfehlungen</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3">
                    <div className="p-3 rounded-lg bg-muted/50">
                      <h4 className="font-medium mb-1">LCP optimieren</h4>
                      <p className="text-sm text-muted-foreground">
                        Bilder mit priority-Attribut laden, kritisches CSS inline einbinden, 
                        Hero-Bilder vorladen.
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <h4 className="font-medium mb-1">CLS minimieren</h4>
                      <p className="text-sm text-muted-foreground">
                        Feste Dimensionen für Bilder und eingebettete Elemente, 
                        Fonts mit font-display: swap laden.
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <h4 className="font-medium mb-1">FID/INP verbessern</h4>
                      <p className="text-sm text-muted-foreground">
                        JavaScript aufteilen, lange Tasks vermeiden, 
                        Event-Handler optimieren.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="seo">
              <SEOAuditDashboard />
            </TabsContent>

            <TabsContent value="schema">
              <SchemaValidator />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Performance;
