import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Monitor, Smartphone, Download, Loader2, Plus, X, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import JSZip from "jszip";
import { saveAs } from "file-saver";

interface CapturedScreenshot {
  id: string;
  url: string;
  domain: string;
  dimension: string;
  image: string;
  capturedAt: string;
}

export const ScreenshotMachine = () => {
  const [singleUrl, setSingleUrl] = useState("");
  const [bulkUrls, setBulkUrls] = useState("");
  const [resolution, setResolution] = useState<"desktop" | "mobile" | "both">("both");
  const [isCapturing, setIsCapturing] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [screenshots, setScreenshots] = useState<CapturedScreenshot[]>([]);

  const captureScreenshot = async (url: string, dimension: string): Promise<CapturedScreenshot | null> => {
    try {
      const { data, error } = await supabase.functions.invoke("capture-screenshot", {
        body: { url, dimension, delay: 5000, format: "png" },
      });

      if (error) throw error;
      if (!data.success) throw new Error(data.error);

      return {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        url: data.url,
        domain: data.domain,
        dimension: dimension,
        image: data.image,
        capturedAt: data.capturedAt,
      };
    } catch (error) {
      console.error(`Error capturing ${url} at ${dimension}:`, error);
      return null;
    }
  };

  const handleSingleCapture = async () => {
    if (!singleUrl.trim()) {
      toast.error("Bitte geben Sie eine URL ein");
      return;
    }

    setIsCapturing(true);
    const dimensions = resolution === "both" 
      ? ["1920xfull", "375xfull"] 
      : [resolution === "desktop" ? "1920xfull" : "375xfull"];
    
    setProgress({ current: 0, total: dimensions.length });
    const newScreenshots: CapturedScreenshot[] = [];

    for (let i = 0; i < dimensions.length; i++) {
      setProgress({ current: i + 1, total: dimensions.length });
      const screenshot = await captureScreenshot(singleUrl, dimensions[i]);
      if (screenshot) {
        newScreenshots.push(screenshot);
      }
    }

    setScreenshots(prev => [...prev, ...newScreenshots]);
    setIsCapturing(false);
    toast.success(`${newScreenshots.length} Screenshot(s) erfolgreich erstellt`);
  };

  const handleBulkCapture = async () => {
    const urls = bulkUrls.split("\n").map(u => u.trim()).filter(u => u);
    if (urls.length === 0) {
      toast.error("Bitte geben Sie mindestens eine URL ein");
      return;
    }

    setIsCapturing(true);
    const dimensions = resolution === "both" 
      ? ["1920xfull", "375xfull"] 
      : [resolution === "desktop" ? "1920xfull" : "375xfull"];
    
    const totalCaptures = urls.length * dimensions.length;
    setProgress({ current: 0, total: totalCaptures });
    const newScreenshots: CapturedScreenshot[] = [];
    let currentProgress = 0;

    for (const url of urls) {
      for (const dim of dimensions) {
        currentProgress++;
        setProgress({ current: currentProgress, total: totalCaptures });
        const screenshot = await captureScreenshot(url, dim);
        if (screenshot) {
          newScreenshots.push(screenshot);
        }
      }
    }

    setScreenshots(prev => [...prev, ...newScreenshots]);
    setIsCapturing(false);
    toast.success(`${newScreenshots.length} Screenshot(s) erfolgreich erstellt`);
  };

  const downloadSingle = (screenshot: CapturedScreenshot) => {
    const byteCharacters = atob(screenshot.image);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/png" });
    
    const filename = `${screenshot.domain}_${screenshot.dimension.replace("xfull", "")}.png`;
    saveAs(blob, filename);
  };

  const downloadAllAsZip = async () => {
    if (screenshots.length === 0) {
      toast.error("Keine Screenshots zum Herunterladen");
      return;
    }

    const zip = new JSZip();
    const desktopFolder = zip.folder("desktop");
    const mobileFolder = zip.folder("mobile");

    screenshots.forEach((screenshot) => {
      const byteCharacters = atob(screenshot.image);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      
      const filename = `${screenshot.domain}_${new Date(screenshot.capturedAt).getTime()}.png`;
      const folder = screenshot.dimension.startsWith("1920") ? desktopFolder : mobileFolder;
      folder?.file(filename, byteArray);
    });

    // Add metadata
    const metadata = {
      capturedAt: new Date().toISOString(),
      totalScreenshots: screenshots.length,
      screenshots: screenshots.map(s => ({
        url: s.url,
        domain: s.domain,
        dimension: s.dimension,
        capturedAt: s.capturedAt,
      })),
    };
    zip.file("metadata.json", JSON.stringify(metadata, null, 2));

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `screenshots_${new Date().toISOString().split("T")[0]}.zip`);
    toast.success("ZIP-Datei wird heruntergeladen");
  };

  const removeScreenshot = (id: string) => {
    setScreenshots(prev => prev.filter(s => s.id !== id));
  };

  const clearAll = () => {
    setScreenshots([]);
    toast.success("Alle Screenshots gelöscht");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Screenshot Machine</h2>
          <p className="text-muted-foreground">Erfassen Sie Screenshots von Websites</p>
        </div>
        {screenshots.length > 0 && (
          <div className="flex gap-2">
            <Button variant="outline" onClick={clearAll}>
              <X className="w-4 h-4 mr-2" />
              Alle löschen
            </Button>
            <Button onClick={downloadAllAsZip}>
              <Download className="w-4 h-4 mr-2" />
              Alle als ZIP
            </Button>
          </div>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Screenshot-Einstellungen
          </CardTitle>
          <CardDescription>Wählen Sie Auflösung und geben Sie URLs ein</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Resolution Selector */}
          <div className="space-y-2">
            <Label>Auflösung</Label>
            <div className="flex gap-2">
              <Button 
                variant={resolution === "desktop" ? "default" : "outline"}
                onClick={() => setResolution("desktop")}
                className="flex-1"
              >
                <Monitor className="w-4 h-4 mr-2" />
                Desktop (1920px)
              </Button>
              <Button 
                variant={resolution === "mobile" ? "default" : "outline"}
                onClick={() => setResolution("mobile")}
                className="flex-1"
              >
                <Smartphone className="w-4 h-4 mr-2" />
                Mobile (375px)
              </Button>
              <Button 
                variant={resolution === "both" ? "default" : "outline"}
                onClick={() => setResolution("both")}
                className="flex-1"
              >
                <Monitor className="w-4 h-4 mr-1" />
                <Smartphone className="w-4 h-4 mr-2" />
                Beide
              </Button>
            </div>
          </div>

          <Tabs defaultValue="single" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="single">Einzelne URL</TabsTrigger>
              <TabsTrigger value="bulk">Mehrere URLs</TabsTrigger>
            </TabsList>

            <TabsContent value="single" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="single-url">Website-URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="single-url"
                    placeholder="https://example.com"
                    value={singleUrl}
                    onChange={(e) => setSingleUrl(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSingleCapture} 
                    disabled={isCapturing}
                  >
                    {isCapturing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {progress.current}/{progress.total}
                      </>
                    ) : (
                      <>
                        <Camera className="w-4 h-4 mr-2" />
                        Erfassen
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bulk" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bulk-urls">URLs (eine pro Zeile)</Label>
                <Textarea
                  id="bulk-urls"
                  placeholder="https://example1.com&#10;https://example2.com&#10;https://example3.com"
                  value={bulkUrls}
                  onChange={(e) => setBulkUrls(e.target.value)}
                  rows={5}
                />
                <Button 
                  onClick={handleBulkCapture} 
                  disabled={isCapturing}
                  className="w-full"
                >
                  {isCapturing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Erfasse {progress.current}/{progress.total}...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Alle erfassen
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Screenshots Gallery */}
      {screenshots.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image className="w-5 h-5" />
              Erfasste Screenshots
              <Badge variant="secondary">{screenshots.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {screenshots.map((screenshot) => (
                <motion.div
                  key={screenshot.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative group"
                >
                  <div className="relative aspect-video bg-muted rounded-lg overflow-hidden border">
                    <img
                      src={`data:image/png;base64,${screenshot.image}`}
                      alt={screenshot.domain}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button size="sm" variant="secondary" onClick={() => downloadSingle(screenshot)}>
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => removeScreenshot(screenshot.id)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <Badge 
                      className="absolute top-2 right-2" 
                      variant={screenshot.dimension.startsWith("1920") ? "default" : "secondary"}
                    >
                      {screenshot.dimension.startsWith("1920") ? "Desktop" : "Mobile"}
                    </Badge>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm font-medium truncate">{screenshot.domain}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(screenshot.capturedAt).toLocaleString("de-DE")}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
