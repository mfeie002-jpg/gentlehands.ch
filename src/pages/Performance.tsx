import { useState, useEffect, useCallback } from "react";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Activity, Gauge, Timer, LayoutDashboard, CheckCircle, AlertTriangle, XCircle, RefreshCw } from "lucide-react";
import { SEOHead } from "@/components/shared/SEOHead";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/shared/GlowCard";

interface WebVital {
  name: string;
  value: number | null;
  rating: "good" | "needs-improvement" | "poor" | "unknown";
  unit: string;
  description: string;
  thresholds: { good: number; poor: number };
}

const Performance = () => {
  const [metrics, setMetrics] = useState<WebVital[]>([
    {
      name: "LCP",
      value: null,
      rating: "unknown",
      unit: "ms",
      description: "Largest Contentful Paint - Zeit bis das grösste sichtbare Element geladen ist",
      thresholds: { good: 2500, poor: 4000 }
    },
    {
      name: "FID",
      value: null,
      rating: "unknown",
      unit: "ms",
      description: "First Input Delay - Reaktionszeit auf erste Benutzerinteraktion",
      thresholds: { good: 100, poor: 300 }
    },
    {
      name: "CLS",
      value: null,
      rating: "unknown",
      unit: "",
      description: "Cumulative Layout Shift - Visuelle Stabilität der Seite",
      thresholds: { good: 0.1, poor: 0.25 }
    },
    {
      name: "FCP",
      value: null,
      rating: "unknown",
      unit: "ms",
      description: "First Contentful Paint - Zeit bis zum ersten sichtbaren Inhalt",
      thresholds: { good: 1800, poor: 3000 }
    },
    {
      name: "TTFB",
      value: null,
      rating: "unknown",
      unit: "ms",
      description: "Time to First Byte - Server-Antwortzeit",
      thresholds: { good: 800, poor: 1800 }
    },
    {
      name: "INP",
      value: null,
      rating: "unknown",
      unit: "ms",
      description: "Interaction to Next Paint - Reaktionszeit auf Benutzerinteraktionen",
      thresholds: { good: 200, poor: 500 }
    }
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const getRating = (name: string, value: number): "good" | "needs-improvement" | "poor" => {
    const metric = metrics.find(m => m.name === name);
    if (!metric) return "unknown" as any;
    
    if (value <= metric.thresholds.good) return "good";
    if (value <= metric.thresholds.poor) return "needs-improvement";
    return "poor";
  };

  const updateMetric = useCallback((name: string, value: number) => {
    setMetrics(prev => prev.map(m => 
      m.name === name 
        ? { ...m, value, rating: getRating(name, value) }
        : m
    ));
  }, []);

  const collectMetrics = useCallback(() => {
    setIsLoading(true);
    
    if (typeof window === "undefined" || !("PerformanceObserver" in window)) {
      setIsLoading(false);
      return;
    }

    // LCP
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          updateMetric("LCP", lastEntry.startTime);
        }
      });
      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
    } catch (e) {}

    // FID
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if ("processingStart" in entry) {
            const fidEntry = entry as PerformanceEventTiming;
            updateMetric("FID", fidEntry.processingStart - fidEntry.startTime);
          }
        });
      });
      fidObserver.observe({ type: "first-input", buffered: true });
    } catch (e) {}

    // CLS
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        updateMetric("CLS", clsValue);
      });
      clsObserver.observe({ type: "layout-shift", buffered: true });
    } catch (e) {}

    // FCP
    try {
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fcpEntry = entries.find((entry) => entry.name === "first-contentful-paint");
        if (fcpEntry) {
          updateMetric("FCP", fcpEntry.startTime);
        }
      });
      fcpObserver.observe({ type: "paint", buffered: true });
    } catch (e) {}

    // TTFB
    try {
      const navEntries = performance.getEntriesByType("navigation");
      if (navEntries.length > 0) {
        const navEntry = navEntries[0] as PerformanceNavigationTiming;
        updateMetric("TTFB", navEntry.responseStart - navEntry.requestStart);
      }
    } catch (e) {}

    // INP (Interaction to Next Paint)
    try {
      const inpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        let maxDuration = 0;
        entries.forEach((entry) => {
          if ("duration" in entry && entry.duration > maxDuration) {
            maxDuration = entry.duration;
          }
        });
        if (maxDuration > 0) {
          updateMetric("INP", maxDuration);
        }
      });
      inpObserver.observe({ type: "event", buffered: true });
    } catch (e) {}

    setLastUpdated(new Date());
    setTimeout(() => setIsLoading(false), 1000);
  }, [updateMetric]);

  useEffect(() => {
    collectMetrics();
  }, [collectMetrics]);

  const getRatingIcon = (rating: string) => {
    switch (rating) {
      case "good":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "needs-improvement":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case "poor":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Activity className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case "good":
        return "text-green-500";
      case "needs-improvement":
        return "text-yellow-500";
      case "poor":
        return "text-red-500";
      default:
        return "text-muted-foreground";
    }
  };

  const getRatingBg = (rating: string) => {
    switch (rating) {
      case "good":
        return "bg-green-500/10 border-green-500/20";
      case "needs-improvement":
        return "bg-yellow-500/10 border-yellow-500/20";
      case "poor":
        return "bg-red-500/10 border-red-500/20";
      default:
        return "bg-secondary border-border";
    }
  };

  const overallScore = metrics.filter(m => m.value !== null).length > 0
    ? Math.round(
        (metrics.filter(m => m.rating === "good").length / 
         metrics.filter(m => m.value !== null).length) * 100
      )
    : 0;

  return (
    <Layout>
      <SEOHead 
        title="Core Web Vitals Report | GentleHands"
        description="Analyse der Core Web Vitals: LCP, CLS, FID und weitere Performance-Metriken."
        canonical="/performance"
        noIndex={true}
      />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="w-16 h-16 rounded-2xl bg-copper/10 flex items-center justify-center mx-auto mb-6">
              <Gauge size={32} className="text-copper" />
            </div>
            <h1 className="text-foreground mb-4">Core Web Vitals Report</h1>
            <p className="text-muted-foreground text-lg">
              Echtzeit-Analyse der Performance-Metriken für diese Seite
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overall Score */}
      <section className="py-8 border-b border-border">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <motion.div
                className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold ${
                  overallScore >= 80 ? "bg-green-500/10 text-green-500" :
                  overallScore >= 50 ? "bg-yellow-500/10 text-yellow-500" :
                  "bg-red-500/10 text-red-500"
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                {overallScore}%
              </motion.div>
              <div>
                <h2 className="font-display text-xl text-foreground">Gesamtbewertung</h2>
                <p className="text-muted-foreground text-sm">
                  {overallScore >= 80 ? "Ausgezeichnete Performance" :
                   overallScore >= 50 ? "Verbesserungspotenzial" :
                   "Optimierung erforderlich"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {lastUpdated && (
                <span className="text-sm text-muted-foreground">
                  Aktualisiert: {lastUpdated.toLocaleTimeString("de-CH")}
                </span>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={collectMetrics}
                disabled={isLoading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                Neu messen
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Grid */}
      <section className="section-padding-sm">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlowCard className={`p-6 h-full ${getRatingBg(metric.rating)}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {metric.name === "LCP" && <LayoutDashboard className="w-5 h-5 text-copper" />}
                      {metric.name === "FID" && <Timer className="w-5 h-5 text-copper" />}
                      {metric.name === "CLS" && <Activity className="w-5 h-5 text-copper" />}
                      {metric.name === "FCP" && <Gauge className="w-5 h-5 text-copper" />}
                      {metric.name === "TTFB" && <Timer className="w-5 h-5 text-copper" />}
                      {metric.name === "INP" && <Activity className="w-5 h-5 text-copper" />}
                      <span className="font-bold text-foreground">{metric.name}</span>
                    </div>
                    {getRatingIcon(metric.rating)}
                  </div>
                  
                  <div className="mb-4">
                    {metric.value !== null ? (
                      <span className={`text-3xl font-bold ${getRatingColor(metric.rating)}`}>
                        {metric.name === "CLS" 
                          ? metric.value.toFixed(3) 
                          : Math.round(metric.value)}
                        <span className="text-lg ml-1">{metric.unit}</span>
                      </span>
                    ) : (
                      <span className="text-2xl text-muted-foreground">Messung...</span>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">{metric.description}</p>
                  
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-green-500">
                      Gut: ≤{metric.name === "CLS" ? metric.thresholds.good : `${metric.thresholds.good}ms`}
                    </span>
                    <span className="text-red-500">
                      Schlecht: &gt;{metric.name === "CLS" ? metric.thresholds.poor : `${metric.thresholds.poor}ms`}
                    </span>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section className="section-padding bg-secondary/30">
        <div className="container-narrow">
          <h2 className="font-display text-2xl text-foreground mb-8 text-center">Optimierungsempfehlungen</h2>
          
          <div className="space-y-4">
            {metrics.filter(m => m.rating === "needs-improvement" || m.rating === "poor").map(metric => (
              <GlowCard key={metric.name} className="p-6">
                <div className="flex items-start gap-4">
                  {getRatingIcon(metric.rating)}
                  <div>
                    <h3 className="font-medium text-foreground mb-1">{metric.name} optimieren</h3>
                    <p className="text-sm text-muted-foreground">
                      {metric.name === "LCP" && "Bilder komprimieren, kritische Ressourcen vorladen, Server-Response-Zeit verbessern."}
                      {metric.name === "FID" && "JavaScript-Ausführung optimieren, lange Tasks aufteilen, Third-Party-Scripts reduzieren."}
                      {metric.name === "CLS" && "Bildgrössen explizit angeben, Schriften vorladen, dynamische Inhalte reservieren."}
                      {metric.name === "FCP" && "Kritisches CSS inlinen, Render-blockierende Ressourcen eliminieren."}
                      {metric.name === "TTFB" && "Server-Caching verbessern, CDN nutzen, Datenbankabfragen optimieren."}
                      {metric.name === "INP" && "Event-Handler optimieren, UI-Updates batchen, React-Rendering verbessern."}
                    </p>
                  </div>
                </div>
              </GlowCard>
            ))}
            
            {metrics.filter(m => m.rating === "needs-improvement" || m.rating === "poor").length === 0 && (
              <GlowCard className="p-8 text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-display text-xl text-foreground mb-2">Ausgezeichnete Performance!</h3>
                <p className="text-muted-foreground">
                  Alle Core Web Vitals sind im grünen Bereich. Weiter so!
                </p>
              </GlowCard>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Performance;
