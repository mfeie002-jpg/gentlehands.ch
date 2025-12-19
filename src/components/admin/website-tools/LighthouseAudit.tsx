import { useState } from "react";
import { motion } from "framer-motion";
import { Gauge, Loader2, Download, AlertTriangle, CheckCircle, Info, Zap, Eye, Search, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { saveAs } from "file-saver";

interface AuditResult {
  url: string;
  domain: string;
  strategy: string;
  scores: Record<string, number>;
  coreWebVitals: Record<string, {
    value: string;
    score: number;
    description: string;
  }>;
  opportunities: Array<{
    title: string;
    description: string;
    savings: string;
  }>;
  auditedAt: string;
  fullReport?: any;
}

const ScoreGauge = ({ score, label, icon: Icon }: { score: number; label: string; icon: React.ElementType }) => {
  const getColor = (score: number) => {
    if (score >= 90) return "text-green-500";
    if (score >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  const getBgColor = (score: number) => {
    if (score >= 90) return "bg-green-500/10";
    if (score >= 50) return "bg-yellow-500/10";
    return "bg-red-500/10";
  };

  return (
    <div className={`p-4 rounded-xl ${getBgColor(score)} text-center`}>
      <div className="relative w-20 h-20 mx-auto mb-2">
        <svg className="w-20 h-20 transform -rotate-90">
          <circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-muted/30"
          />
          <circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray={`${score * 2.26} 226`}
            className={getColor(score)}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-xl font-bold ${getColor(score)}`}>{score}</span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-1">
        <Icon className="w-4 h-4" />
        <span className="text-sm font-medium">{label}</span>
      </div>
    </div>
  );
};

const MetricCard = ({ metric, value, score }: { metric: string; value: string; score: number }) => {
  const getColor = (score: number) => {
    if (score >= 90) return "text-green-500";
    if (score >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  const getIcon = (score: number) => {
    if (score >= 90) return CheckCircle;
    if (score >= 50) return AlertTriangle;
    return AlertTriangle;
  };

  const Icon = getIcon(score);

  return (
    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
      <div className="flex items-center gap-3">
        <Icon className={`w-5 h-5 ${getColor(score)}`} />
        <div>
          <p className="text-sm font-medium">{metric}</p>
          <p className="text-xs text-muted-foreground">{value}</p>
        </div>
      </div>
      <Badge variant={score >= 90 ? "default" : score >= 50 ? "secondary" : "destructive"}>
        {score}
      </Badge>
    </div>
  );
};

export const LighthouseAudit = () => {
  const [url, setUrl] = useState("");
  const [strategy, setStrategy] = useState<"mobile" | "desktop">("mobile");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);

  const runAudit = async () => {
    if (!url.trim()) {
      toast.error("Bitte geben Sie eine URL ein");
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke("lighthouse", {
        body: { url, strategy },
      });

      if (error) throw error;
      if (!data.success) throw new Error(data.error);

      setResult(data);
      toast.success("Audit erfolgreich abgeschlossen");
    } catch (error) {
      console.error("Lighthouse error:", error);
      toast.error("Fehler beim Ausführen des Audits");
    } finally {
      setIsLoading(false);
    }
  };

  const exportReport = () => {
    if (!result) return;

    const report = {
      url: result.url,
      domain: result.domain,
      strategy: result.strategy,
      scores: result.scores,
      coreWebVitals: result.coreWebVitals,
      opportunities: result.opportunities,
      auditedAt: result.auditedAt,
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    saveAs(blob, `lighthouse-${result.domain}-${strategy}.json`);
    toast.success("Report exportiert");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Lighthouse Audit</h2>
        <p className="text-muted-foreground">Analysieren Sie die Performance Ihrer Website</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gauge className="w-5 h-5" />
            Performance-Analyse
          </CardTitle>
          <CardDescription>Führen Sie einen PageSpeed Insights Audit durch</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="audit-url">Website-URL</Label>
            <div className="flex gap-2">
              <Input
                id="audit-url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant={strategy === "mobile" ? "default" : "outline"}
              onClick={() => setStrategy("mobile")}
              className="flex-1"
            >
              📱 Mobile
            </Button>
            <Button
              variant={strategy === "desktop" ? "default" : "outline"}
              onClick={() => setStrategy("desktop")}
              className="flex-1"
            >
              🖥️ Desktop
            </Button>
          </div>

          <Button onClick={runAudit} disabled={isLoading} className="w-full" size="lg">
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyse läuft...
              </>
            ) : (
              <>
                <Gauge className="w-4 h-4 mr-2" />
                Audit starten
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Scores Overview */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{result.domain}</CardTitle>
                <CardDescription>
                  Audit vom {new Date(result.auditedAt).toLocaleString("de-DE")} • {strategy === "mobile" ? "Mobile" : "Desktop"}
                </CardDescription>
              </div>
              <Button variant="outline" onClick={exportReport}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <ScoreGauge score={result.scores.performance || 0} label="Performance" icon={Zap} />
                <ScoreGauge score={result.scores.accessibility || 0} label="Barrierefreiheit" icon={Eye} />
                <ScoreGauge score={result.scores["best-practices"] || 0} label="Best Practices" icon={ShieldCheck} />
                <ScoreGauge score={result.scores.seo || 0} label="SEO" icon={Search} />
              </div>
            </CardContent>
          </Card>

          {/* Tabs for Details */}
          <Tabs defaultValue="vitals" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="vitals">Core Web Vitals</TabsTrigger>
              <TabsTrigger value="opportunities">Empfehlungen</TabsTrigger>
            </TabsList>

            <TabsContent value="vitals">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Core Web Vitals</CardTitle>
                  <CardDescription>Wichtige Metriken für die Nutzererfahrung</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(result.coreWebVitals).map(([key, data]) => (
                    <MetricCard
                      key={key}
                      metric={data.description}
                      value={data.value}
                      score={data.score}
                    />
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="opportunities">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Optimierungsempfehlungen</CardTitle>
                  <CardDescription>Möglichkeiten zur Verbesserung der Performance</CardDescription>
                </CardHeader>
                <CardContent>
                  {result.opportunities.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-500" />
                      <p>Keine Verbesserungen nötig!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {result.opportunities.map((opp, index) => (
                        <div key={index} className="p-4 bg-muted/30 rounded-lg space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-start gap-2">
                              <Info className="w-4 h-4 mt-1 text-blue-500 flex-shrink-0" />
                              <div>
                                <p className="font-medium text-sm">{opp.title}</p>
                                <p className="text-xs text-muted-foreground mt-1">{opp.description}</p>
                              </div>
                            </div>
                            {opp.savings && (
                              <Badge variant="secondary" className="flex-shrink-0">
                                {opp.savings}
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      )}
    </div>
  );
};
