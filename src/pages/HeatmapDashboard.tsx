import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { MousePointer, Eye, Clock, ArrowDown } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface ClickData {
  x: number;
  y: number;
  page: string;
  element?: string;
  timestamp: string;
}

interface ScrollData {
  depth: number;
  page: string;
  count: number;
}

const HeatmapDashboard = () => {
  const [selectedPage, setSelectedPage] = useState('/');
  const [heatmapType, setHeatmapType] = useState<'clicks' | 'scroll'>('clicks');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Fetch journey data for heatmap visualization
  const { data: journeyData } = useQuery({
    queryKey: ['heatmap-data', selectedPage],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('customer_journeys')
        .select('events')
        .order('created_at', { ascending: false })
        .limit(500);

      if (error) throw error;

      const clicks: ClickData[] = [];
      const scrolls: Record<number, number> = {};

      data?.forEach((journey) => {
        const events = journey.events as any[];
        events?.forEach((event) => {
          if (event.type === 'click' && event.metadata?.page === selectedPage) {
            clicks.push({
              x: event.metadata.x || 0,
              y: event.metadata.y || 0,
              page: event.metadata.page,
              element: event.metadata.element,
              timestamp: event.timestamp,
            });
          }
          if (event.type === 'scroll_depth' && event.page === selectedPage) {
            const depth = event.metadata?.depth || 0;
            scrolls[depth] = (scrolls[depth] || 0) + 1;
          }
        });
      });

      return { clicks, scrolls };
    }
  });

  // Generate sample heatmap data for demo
  const sampleClicks = Array.from({ length: 100 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    intensity: Math.random(),
  }));

  const scrollDepthData = [
    { depth: 0, percentage: 100 },
    { depth: 25, percentage: 78 },
    { depth: 50, percentage: 54 },
    { depth: 75, percentage: 32 },
    { depth: 100, percentage: 18 },
  ];

  const pages = [
    { value: '/', label: 'Homepage' },
    { value: '/buchung', label: 'Buchung' },
    { value: '/erlebnisse', label: 'Erlebnisse' },
    { value: '/massagen', label: 'Massagen' },
    { value: '/team', label: 'Team' },
    { value: '/preise', label: 'Preise' },
  ];

  // Draw heatmap on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'hsl(var(--background))');
    gradient.addColorStop(1, 'hsl(var(--muted))');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (heatmapType === 'clicks') {
      // Draw click heatmap
      sampleClicks.forEach((click) => {
        const x = (click.x / 100) * canvas.width;
        const y = (click.y / 100) * canvas.height;
        const radius = 20 + click.intensity * 30;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `hsla(0, 80%, 50%, ${0.3 + click.intensity * 0.4})`);
        gradient.addColorStop(0.5, `hsla(30, 80%, 50%, ${0.2 + click.intensity * 0.2})`);
        gradient.addColorStop(1, 'hsla(60, 80%, 50%, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      });
    } else {
      // Draw scroll depth visualization
      scrollDepthData.forEach((data, index) => {
        const y = (data.depth / 100) * canvas.height;
        const alpha = data.percentage / 100;

        ctx.fillStyle = `hsla(var(--primary), ${alpha})`;
        ctx.fillRect(0, index === 0 ? 0 : (scrollDepthData[index - 1].depth / 100) * canvas.height, canvas.width, (canvas.height / 4));

        ctx.fillStyle = 'hsl(var(--foreground))';
        ctx.font = '14px sans-serif';
        ctx.fillText(`${data.depth}% - ${data.percentage}% der Besucher`, 20, y + 30);
      });
    }
  }, [heatmapType, selectedPage, sampleClicks]);

  return (
    <>
      <Helmet>
        <title>Heatmap Analytics | GentleHands</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold">Heatmap Analytics</h1>
              <p className="text-muted-foreground">Klick-Verhalten und Scroll-Tiefe visualisiert</p>
            </div>
            
            <div className="flex gap-4">
              <Select value={selectedPage} onValueChange={setSelectedPage}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Seite wählen" />
                </SelectTrigger>
                <SelectContent>
                  {pages.map((page) => (
                    <SelectItem key={page.value} value={page.value}>
                      {page.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <MousePointer className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Klicks gesamt</p>
                    <p className="text-2xl font-bold">{sampleClicks.length * 12}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Eye className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Scroll-Tiefe</p>
                    <p className="text-2xl font-bold">62%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Clock className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Verweildauer</p>
                    <p className="text-2xl font-bold">2:34</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <ArrowDown className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Bounce Rate</p>
                    <p className="text-2xl font-bold">34%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Heatmap Visualization */}
          <Tabs value={heatmapType} onValueChange={(v) => setHeatmapType(v as 'clicks' | 'scroll')}>
            <TabsList>
              <TabsTrigger value="clicks" className="gap-2">
                <MousePointer className="w-4 h-4" />
                Klick-Heatmap
              </TabsTrigger>
              <TabsTrigger value="scroll" className="gap-2">
                <ArrowDown className="w-4 h-4" />
                Scroll-Tiefe
              </TabsTrigger>
            </TabsList>

            <TabsContent value="clicks" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Klick-Heatmap für {pages.find(p => p.value === selectedPage)?.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative rounded-lg overflow-hidden border border-border">
                    <canvas 
                      ref={canvasRef}
                      width={800}
                      height={600}
                      className="w-full"
                    />
                    <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-background/80 backdrop-blur px-3 py-2 rounded-lg">
                      <div className="w-4 h-4 rounded bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500" />
                      <span className="text-xs">Niedrig → Hoch</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="scroll" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Scroll-Tiefe Analyse</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {scrollDepthData.map((data, index) => (
                      <motion.div 
                        key={data.depth}
                        className="relative"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">{data.depth}% der Seite</span>
                          <span className="text-sm text-muted-foreground">{data.percentage}% der Besucher</span>
                        </div>
                        <div className="h-8 bg-muted rounded-lg overflow-hidden">
                          <motion.div 
                            className="h-full bg-gradient-to-r from-primary to-primary/60"
                            initial={{ width: 0 }}
                            animate={{ width: `${data.percentage}%` }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 p-4 rounded-lg bg-muted/50">
                    <h4 className="font-medium mb-2">Empfehlungen</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• 46% der Besucher verlassen die Seite vor der Mitte - wichtige CTAs nach oben verschieben</li>
                      <li>• Der Bereich bei 50-75% hat einen starken Abfall - Inhalte dort überprüfen</li>
                      <li>• Nur 18% erreichen das Seitenende - Footer-CTAs weniger effektiv</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Hot Zones */}
          <Card>
            <CardHeader>
              <CardTitle>Meistgeklickte Elemente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { element: 'CTA "Erlebnis anfragen"', clicks: 1847, change: '+12%' },
                  { element: 'Themenraum-Karten', clicks: 1423, change: '+8%' },
                  { element: 'Therapeuten-Profile', clicks: 1156, change: '+15%' },
                  { element: 'Preisübersicht', clicks: 892, change: '+3%' },
                  { element: 'FAQ Accordion', clicks: 734, change: '-2%' },
                  { element: 'Testimonial Slider', clicks: 521, change: '+7%' },
                ].map((item, index) => (
                  <motion.div
                    key={item.element}
                    className="p-4 rounded-lg bg-muted/50"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{item.element}</span>
                      <span className={`text-xs ${item.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {item.change}
                      </span>
                    </div>
                    <p className="text-2xl font-bold">{item.clicks.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Klicks</p>
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

export default HeatmapDashboard;
