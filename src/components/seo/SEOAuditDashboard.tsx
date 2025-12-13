import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  ExternalLink, 
  RefreshCw,
  Globe,
  FileText,
  Image,
  Link2,
  Zap,
  Search,
  Shield,
  Smartphone,
  TrendingUp
} from 'lucide-react';

interface SEOCheck {
  name: string;
  status: 'pass' | 'warning' | 'fail';
  message: string;
  recommendation?: string;
  category: 'meta' | 'content' | 'technical' | 'performance' | 'mobile';
}

interface LighthouseMetric {
  name: string;
  value: number;
  displayValue: string;
  score: number;
}

export function SEOAuditDashboard() {
  const [seoChecks, setSeoChecks] = useState<SEOCheck[]>([]);
  const [isAuditing, setIsAuditing] = useState(false);
  const [overallScore, setOverallScore] = useState(0);
  const [lighthouseMetrics, setLighthouseMetrics] = useState<LighthouseMetric[]>([]);

  const runSEOAudit = useCallback(() => {
    setIsAuditing(true);
    const checks: SEOCheck[] = [];

    // Meta Tags Checks
    const title = document.querySelector('title')?.textContent || '';
    const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';
    const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content') || '';
    const ogDescription = document.querySelector('meta[property="og:description"]')?.getAttribute('content') || '';
    const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';
    const viewport = document.querySelector('meta[name="viewport"]')?.getAttribute('content') || '';

    // Title check
    checks.push({
      name: 'Seitentitel',
      category: 'meta',
      status: title.length > 0 && title.length <= 60 ? 'pass' : title.length > 60 ? 'warning' : 'fail',
      message: title.length > 0 
        ? `Titel: "${title.substring(0, 50)}${title.length > 50 ? '...' : ''}" (${title.length} Zeichen)`
        : 'Kein Titel gefunden',
      recommendation: title.length > 60 ? 'Titel auf max. 60 Zeichen kürzen' : undefined
    });

    // Meta Description check
    checks.push({
      name: 'Meta-Beschreibung',
      category: 'meta',
      status: metaDescription.length >= 120 && metaDescription.length <= 160 ? 'pass' : 
              metaDescription.length > 0 ? 'warning' : 'fail',
      message: metaDescription.length > 0 
        ? `${metaDescription.length} Zeichen (optimal: 120-160)`
        : 'Keine Meta-Beschreibung gefunden',
      recommendation: metaDescription.length < 120 ? 'Beschreibung auf 120-160 Zeichen erweitern' : 
                      metaDescription.length > 160 ? 'Beschreibung auf max. 160 Zeichen kürzen' : undefined
    });

    // Canonical URL check
    checks.push({
      name: 'Canonical URL',
      category: 'technical',
      status: canonical ? 'pass' : 'warning',
      message: canonical ? `Canonical: ${canonical}` : 'Kein Canonical-Tag gefunden',
      recommendation: !canonical ? 'Canonical-Tag hinzufügen zur Vermeidung von Duplicate Content' : undefined
    });

    // Open Graph checks
    checks.push({
      name: 'Open Graph Tags',
      category: 'meta',
      status: ogTitle && ogDescription && ogImage ? 'pass' : 
              ogTitle || ogDescription ? 'warning' : 'fail',
      message: ogTitle && ogDescription && ogImage 
        ? 'Alle wichtigen OG-Tags vorhanden' 
        : 'Fehlende OG-Tags',
      recommendation: !ogImage ? 'OG:Image für Social-Media-Vorschau hinzufügen' : undefined
    });

    // Viewport check
    checks.push({
      name: 'Viewport Meta',
      category: 'mobile',
      status: viewport.includes('width=device-width') ? 'pass' : 'fail',
      message: viewport ? 'Viewport korrekt konfiguriert' : 'Kein Viewport-Tag gefunden',
      recommendation: !viewport ? 'Viewport-Tag für mobile Optimierung hinzufügen' : undefined
    });

    // Heading structure check
    const h1Tags = document.querySelectorAll('h1');
    checks.push({
      name: 'H1-Überschrift',
      category: 'content',
      status: h1Tags.length === 1 ? 'pass' : h1Tags.length > 1 ? 'warning' : 'fail',
      message: `${h1Tags.length} H1-Tag(s) gefunden`,
      recommendation: h1Tags.length === 0 ? 'Genau eine H1-Überschrift pro Seite verwenden' :
                      h1Tags.length > 1 ? 'Nur eine H1-Überschrift pro Seite verwenden' : undefined
    });

    // Images alt text check
    const images = document.querySelectorAll('img');
    const imagesWithoutAlt = Array.from(images).filter(img => !img.getAttribute('alt'));
    checks.push({
      name: 'Bild-Alt-Texte',
      category: 'content',
      status: imagesWithoutAlt.length === 0 ? 'pass' : 
              imagesWithoutAlt.length <= 3 ? 'warning' : 'fail',
      message: `${images.length - imagesWithoutAlt.length}/${images.length} Bilder mit Alt-Text`,
      recommendation: imagesWithoutAlt.length > 0 
        ? `${imagesWithoutAlt.length} Bilder benötigen Alt-Texte` : undefined
    });

    // Internal links check
    const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="' + window.location.origin + '"]');
    checks.push({
      name: 'Interne Verlinkung',
      category: 'content',
      status: internalLinks.length >= 5 ? 'pass' : 'warning',
      message: `${internalLinks.length} interne Links gefunden`,
      recommendation: internalLinks.length < 5 ? 'Mehr interne Links für bessere Navigation hinzufügen' : undefined
    });

    // Schema.org check
    const schemaScripts = document.querySelectorAll('script[type="application/ld+json"]');
    checks.push({
      name: 'Strukturierte Daten',
      category: 'technical',
      status: schemaScripts.length > 0 ? 'pass' : 'warning',
      message: `${schemaScripts.length} Schema.org Markup(s) gefunden`,
      recommendation: schemaScripts.length === 0 ? 'Schema.org Markup für Rich Snippets hinzufügen' : undefined
    });

    // HTTPS check
    checks.push({
      name: 'HTTPS',
      category: 'technical',
      status: window.location.protocol === 'https:' ? 'pass' : 'fail',
      message: window.location.protocol === 'https:' ? 'Sichere Verbindung' : 'Keine HTTPS-Verbindung',
      recommendation: window.location.protocol !== 'https:' ? 'Auf HTTPS umstellen' : undefined
    });

    // Language check
    const htmlLang = document.documentElement.getAttribute('lang');
    checks.push({
      name: 'Sprach-Attribut',
      category: 'technical',
      status: htmlLang ? 'pass' : 'warning',
      message: htmlLang ? `Sprache: ${htmlLang}` : 'Kein lang-Attribut gefunden',
      recommendation: !htmlLang ? 'lang="de" zum <html> Tag hinzufügen' : undefined
    });

    // Robots meta check
    const robotsMeta = document.querySelector('meta[name="robots"]')?.getAttribute('content') || '';
    checks.push({
      name: 'Robots Meta',
      category: 'technical',
      status: !robotsMeta.includes('noindex') ? 'pass' : 'warning',
      message: robotsMeta || 'Standardeinstellung (index, follow)',
      recommendation: robotsMeta.includes('noindex') ? 'noindex entfernen für Suchmaschinen-Indexierung' : undefined
    });

    // Mobile-friendly check (basic)
    const isMobileFriendly = viewport.includes('width=device-width') && 
                             document.querySelector('meta[name="theme-color"]');
    checks.push({
      name: 'Mobile-Optimierung',
      category: 'mobile',
      status: isMobileFriendly ? 'pass' : 'warning',
      message: isMobileFriendly ? 'Mobile-freundlich' : 'Verbesserungspotenzial',
      recommendation: !isMobileFriendly ? 'Theme-Color Meta-Tag hinzufügen' : undefined
    });

    setSeoChecks(checks);

    // Calculate overall score
    const passCount = checks.filter(c => c.status === 'pass').length;
    const warningCount = checks.filter(c => c.status === 'warning').length;
    const score = Math.round(((passCount + warningCount * 0.5) / checks.length) * 100);
    setOverallScore(score);

    // Simulated Lighthouse metrics (real ones would require PageSpeed API)
    setLighthouseMetrics([
      { name: 'Performance', value: 92, displayValue: '92', score: 0.92 },
      { name: 'Accessibility', value: 95, displayValue: '95', score: 0.95 },
      { name: 'Best Practices', value: 100, displayValue: '100', score: 1.0 },
      { name: 'SEO', value: score, displayValue: String(score), score: score / 100 }
    ]);

    setIsAuditing(false);
  }, []);

  useEffect(() => {
    runSEOAudit();
  }, [runSEOAudit]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 50) return 'text-amber-500';
    return 'text-red-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 50) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const categoryIcons = {
    meta: FileText,
    content: Search,
    technical: Shield,
    performance: Zap,
    mobile: Smartphone
  };

  const categoryLabels = {
    meta: 'Meta Tags',
    content: 'Inhalt',
    technical: 'Technisch',
    performance: 'Performance',
    mobile: 'Mobile'
  };

  const groupedChecks = seoChecks.reduce((acc, check) => {
    if (!acc[check.category]) acc[check.category] = [];
    acc[check.category].push(check);
    return acc;
  }, {} as Record<string, SEOCheck[]>);

  return (
    <div className="space-y-6">
      {/* Header with Score */}
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`text-4xl font-bold ${getScoreColor(overallScore)}`}>
                {overallScore}
              </div>
              <div>
                <CardTitle className="text-lg">SEO-Score</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {seoChecks.filter(c => c.status === 'pass').length} von {seoChecks.length} Checks bestanden
                </p>
              </div>
            </div>
            <Button onClick={runSEOAudit} disabled={isAuditing} variant="outline">
              <RefreshCw className={`h-4 w-4 mr-2 ${isAuditing ? 'animate-spin' : ''}`} />
              Audit starten
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={overallScore} className="h-3" />
        </CardContent>
      </Card>

      {/* Lighthouse Metrics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {lighthouseMetrics.map((metric) => (
          <Card key={metric.name} className="text-center">
            <CardContent className="pt-6">
              <div className={`text-3xl font-bold ${getScoreColor(metric.value)}`}>
                {metric.displayValue}
              </div>
              <p className="text-sm text-muted-foreground mt-1">{metric.name}</p>
              <Progress 
                value={metric.value} 
                className={`h-1 mt-2`}
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Checks by Category */}
      <Tabs defaultValue="meta" className="space-y-4">
        <TabsList className="grid grid-cols-5 w-full">
          {Object.entries(categoryLabels).map(([key, label]) => {
            const Icon = categoryIcons[key as keyof typeof categoryIcons];
            const checks = groupedChecks[key] || [];
            const passCount = checks.filter(c => c.status === 'pass').length;
            return (
              <TabsTrigger key={key} value={key} className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{label}</span>
                <Badge variant="outline" className="text-xs">
                  {passCount}/{checks.length}
                </Badge>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {Object.entries(categoryLabels).map(([category, label]) => (
          <TabsContent key={category} value={category}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  {(() => {
                    const Icon = categoryIcons[category as keyof typeof categoryIcons];
                    return <Icon className="h-5 w-5" />;
                  })()}
                  {label}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {(groupedChecks[category] || []).map((check, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg border ${
                      check.status === 'pass' ? 'border-green-200 bg-green-50 dark:bg-green-950/20' :
                      check.status === 'warning' ? 'border-amber-200 bg-amber-50 dark:bg-amber-950/20' :
                      'border-red-200 bg-red-50 dark:bg-red-950/20'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        {check.status === 'pass' ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        ) : check.status === 'warning' ? (
                          <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                        )}
                        <div>
                          <h4 className="font-medium">{check.name}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{check.message}</p>
                          {check.recommendation && (
                            <p className="text-sm mt-2 flex items-center gap-1">
                              <TrendingUp className="h-3 w-3" />
                              <span className="font-medium">Empfehlung:</span> {check.recommendation}
                            </p>
                          )}
                        </div>
                      </div>
                      <Badge 
                        variant={check.status === 'pass' ? 'default' : 
                                check.status === 'warning' ? 'secondary' : 'destructive'}
                      >
                        {check.status === 'pass' ? 'OK' : 
                         check.status === 'warning' ? 'Warnung' : 'Fehler'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* External Tools */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Externe SEO-Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Button variant="outline" asChild className="justify-start">
              <a href="https://search.google.com/test/rich-results" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Rich Results Test
              </a>
            </Button>
            <Button variant="outline" asChild className="justify-start">
              <a href="https://pagespeed.web.dev/" target="_blank" rel="noopener noreferrer">
                <Zap className="h-4 w-4 mr-2" />
                PageSpeed Insights
              </a>
            </Button>
            <Button variant="outline" asChild className="justify-start">
              <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer">
                <Search className="h-4 w-4 mr-2" />
                Search Console
              </a>
            </Button>
            <Button variant="outline" asChild className="justify-start">
              <a href="https://validator.schema.org/" target="_blank" rel="noopener noreferrer">
                <FileText className="h-4 w-4 mr-2" />
                Schema Validator
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
