import { useState } from "react";
import { motion } from "framer-motion";
import { Package, Download, Loader2, Check, FileCode, Image, BarChart3, Upload, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import JSZip from "jszip";
import { saveAs } from "file-saver";

interface PackageOptions {
  screenshots: boolean;
  html: boolean;
  lighthouse: boolean;
  desktopOnly: boolean;
  mobileOnly: boolean;
}

interface GeneratedPackage {
  id: string;
  filename: string;
  size: string;
  urls: string[];
  createdAt: string;
  publicUrl?: string;
}

export const UltimateZipPackage = () => {
  const [urls, setUrls] = useState("");
  const [options, setOptions] = useState<PackageOptions>({
    screenshots: true,
    html: true,
    lighthouse: true,
    desktopOnly: false,
    mobileOnly: false,
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0, status: "" });
  const [packages, setPackages] = useState<GeneratedPackage[]>([]);

  const generatePackage = async () => {
    const urlList = urls.split("\n").map(u => u.trim()).filter(u => u);
    if (urlList.length === 0) {
      toast.error("Bitte geben Sie mindestens eine URL ein");
      return;
    }

    setIsGenerating(true);
    const zip = new JSZip();
    const screenshotsDesktop = zip.folder("screenshots/desktop");
    const screenshotsMobile = zip.folder("screenshots/mobile");
    const htmlFolder = zip.folder("html");
    const reportsFolder = zip.folder("reports");

    const dimensions: string[] = [];
    if (!options.mobileOnly) dimensions.push("1920xfull");
    if (!options.desktopOnly) dimensions.push("375xfull");

    let totalSteps = 0;
    if (options.screenshots) totalSteps += urlList.length * dimensions.length;
    if (options.html) totalSteps += urlList.length;
    if (options.lighthouse) totalSteps += urlList.length;

    let currentStep = 0;
    const results: any[] = [];

    // Capture screenshots
    if (options.screenshots) {
      setProgress({ current: currentStep, total: totalSteps, status: "Screenshots erfassen..." });
      
      for (const url of urlList) {
        const urlObj = new URL(url);
        const domain = urlObj.hostname.replace(/\./g, "_");

        for (const dimension of dimensions) {
          try {
            const { data, error } = await supabase.functions.invoke("capture-screenshot", {
              body: { url, dimension, delay: 5000, format: "png" },
            });

            if (!error && data.success) {
              const byteCharacters = atob(data.image);
              const byteNumbers = new Array(byteCharacters.length);
              for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
              }
              const byteArray = new Uint8Array(byteNumbers);
              
              const folder = dimension.startsWith("1920") ? screenshotsDesktop : screenshotsMobile;
              folder?.file(`${domain}.png`, byteArray);
              
              results.push({
                type: "screenshot",
                url,
                dimension,
                success: true,
              });
            }
          } catch (error) {
            console.error(`Screenshot error for ${url}:`, error);
            results.push({
              type: "screenshot",
              url,
              dimension,
              success: false,
              error: String(error),
            });
          }
          currentStep++;
          setProgress({ current: currentStep, total: totalSteps, status: `Screenshots erfassen... (${currentStep}/${totalSteps})` });
        }
      }
    }

    // Fetch HTML
    if (options.html) {
      setProgress({ current: currentStep, total: totalSteps, status: "HTML abrufen..." });
      
      for (const url of urlList) {
        try {
          const urlObj = new URL(url);
          const domain = urlObj.hostname.replace(/\./g, "_");
          const path = urlObj.pathname.replace(/\//g, "_") || "index";

          const { data, error } = await supabase.functions.invoke("fetch-html", {
            body: { url, clean: false },
          });

          if (!error && data.success) {
            htmlFolder?.file(`${domain}${path}.html`, data.html);
            
            results.push({
              type: "html",
              url,
              metadata: data.metadata,
              success: true,
            });
          }
        } catch (error) {
          console.error(`HTML error for ${url}:`, error);
          results.push({
            type: "html",
            url,
            success: false,
            error: String(error),
          });
        }
        currentStep++;
        setProgress({ current: currentStep, total: totalSteps, status: `HTML abrufen... (${currentStep}/${totalSteps})` });
      }
    }

    // Run Lighthouse
    if (options.lighthouse) {
      setProgress({ current: currentStep, total: totalSteps, status: "Lighthouse-Audits ausführen..." });
      const lighthouseResults: any[] = [];

      for (const url of urlList) {
        try {
          const { data, error } = await supabase.functions.invoke("lighthouse", {
            body: { url, strategy: "mobile" },
          });

          if (!error && data.success) {
            lighthouseResults.push({
              url,
              domain: data.domain,
              scores: data.scores,
              coreWebVitals: data.coreWebVitals,
              opportunities: data.opportunities,
              auditedAt: data.auditedAt,
            });
            
            results.push({
              type: "lighthouse",
              url,
              scores: data.scores,
              success: true,
            });
          }
        } catch (error) {
          console.error(`Lighthouse error for ${url}:`, error);
          results.push({
            type: "lighthouse",
            url,
            success: false,
            error: String(error),
          });
        }
        currentStep++;
        setProgress({ current: currentStep, total: totalSteps, status: `Lighthouse-Audits... (${currentStep}/${totalSteps})` });
      }

      if (lighthouseResults.length > 0) {
        reportsFolder?.file("lighthouse-report.json", JSON.stringify(lighthouseResults, null, 2));
      }
    }

    // Add metadata
    const metadata = {
      generatedAt: new Date().toISOString(),
      urls: urlList,
      options: options,
      results: results,
      summary: {
        total: results.length,
        successful: results.filter(r => r.success).length,
        failed: results.filter(r => !r.success).length,
      },
    };
    zip.file("metadata.json", JSON.stringify(metadata, null, 2));

    // Generate and download
    setProgress({ current: totalSteps, total: totalSteps, status: "ZIP erstellen..." });
    const content = await zip.generateAsync({ type: "blob" });
    const filename = `website-analysis_${new Date().toISOString().split("T")[0]}.zip`;
    
    saveAs(content, filename);

    // Try to upload to storage
    let publicUrl: string | undefined;
    try {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("screenshots-archive")
        .upload(`packages/${filename}`, content, {
          contentType: "application/zip",
          upsert: true,
        });

      if (!uploadError && uploadData) {
        const { data: urlData } = supabase.storage
          .from("screenshots-archive")
          .getPublicUrl(`packages/${filename}`);
        publicUrl = urlData.publicUrl;
      }
    } catch (error) {
      console.error("Upload error:", error);
    }

    // Add to packages list
    const newPackage: GeneratedPackage = {
      id: Date.now().toString(),
      filename,
      size: `${(content.size / 1024 / 1024).toFixed(2)} MB`,
      urls: urlList,
      createdAt: new Date().toISOString(),
      publicUrl,
    };
    setPackages(prev => [newPackage, ...prev]);

    setIsGenerating(false);
    setProgress({ current: 0, total: 0, status: "" });
    toast.success(`Paket erstellt: ${metadata.summary.successful}/${metadata.summary.total} erfolgreich`);
  };

  const copyPublicUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("URL kopiert");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">ZIP-Paket Generator</h2>
        <p className="text-muted-foreground">Erstellen Sie umfassende Analyse-Pakete</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Paket-Konfiguration
            </CardTitle>
            <CardDescription>Wählen Sie die Inhalte für Ihr Analyse-Paket</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* URLs Input */}
            <div className="space-y-2">
              <Label htmlFor="urls">URLs (eine pro Zeile)</Label>
              <Textarea
                id="urls"
                placeholder="https://example1.com&#10;https://example2.com&#10;https://example3.com"
                value={urls}
                onChange={(e) => setUrls(e.target.value)}
                rows={6}
              />
            </div>

            {/* Options */}
            <div className="space-y-4">
              <Label>Inhalte</Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="screenshots"
                    checked={options.screenshots}
                    onCheckedChange={(checked) => 
                      setOptions(prev => ({ ...prev, screenshots: !!checked }))
                    }
                  />
                  <Label htmlFor="screenshots" className="flex items-center gap-2 cursor-pointer">
                    <Image className="w-4 h-4" />
                    Screenshots (Desktop & Mobile)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="html"
                    checked={options.html}
                    onCheckedChange={(checked) => 
                      setOptions(prev => ({ ...prev, html: !!checked }))
                    }
                  />
                  <Label htmlFor="html" className="flex items-center gap-2 cursor-pointer">
                    <FileCode className="w-4 h-4" />
                    HTML-Quelltexte
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="lighthouse"
                    checked={options.lighthouse}
                    onCheckedChange={(checked) => 
                      setOptions(prev => ({ ...prev, lighthouse: !!checked }))
                    }
                  />
                  <Label htmlFor="lighthouse" className="flex items-center gap-2 cursor-pointer">
                    <BarChart3 className="w-4 h-4" />
                    Lighthouse-Audits
                  </Label>
                </div>
              </div>
            </div>

            {/* Resolution Options */}
            {options.screenshots && (
              <div className="space-y-3 pl-6 border-l-2 border-muted">
                <Label className="text-sm text-muted-foreground">Screenshot-Optionen</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="desktopOnly"
                    checked={options.desktopOnly}
                    onCheckedChange={(checked) => 
                      setOptions(prev => ({ ...prev, desktopOnly: !!checked, mobileOnly: false }))
                    }
                  />
                  <Label htmlFor="desktopOnly" className="text-sm cursor-pointer">
                    Nur Desktop
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="mobileOnly"
                    checked={options.mobileOnly}
                    onCheckedChange={(checked) => 
                      setOptions(prev => ({ ...prev, mobileOnly: !!checked, desktopOnly: false }))
                    }
                  />
                  <Label htmlFor="mobileOnly" className="text-sm cursor-pointer">
                    Nur Mobile
                  </Label>
                </div>
              </div>
            )}

            {/* Progress */}
            {isGenerating && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>{progress.status}</span>
                  <span>{Math.round((progress.current / progress.total) * 100)}%</span>
                </div>
                <Progress value={(progress.current / progress.total) * 100} />
              </div>
            )}

            <Button 
              onClick={generatePackage} 
              disabled={isGenerating}
              className="w-full"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generiere Paket...
                </>
              ) : (
                <>
                  <Package className="w-4 h-4 mr-2" />
                  Paket generieren
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Generated Packages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              Erstellte Pakete
            </CardTitle>
            <CardDescription>Ihre generierten Analyse-Pakete</CardDescription>
          </CardHeader>
          <CardContent>
            {packages.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Noch keine Pakete erstellt</p>
              </div>
            ) : (
              <div className="space-y-3">
                {packages.map((pkg) => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-muted/50 rounded-lg space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="font-medium text-sm">{pkg.filename}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{pkg.size}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {pkg.urls.length} URL(s) • {new Date(pkg.createdAt).toLocaleString("de-DE")}
                    </p>
                    {pkg.publicUrl && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => copyPublicUrl(pkg.publicUrl!)}
                        className="w-full mt-2"
                      >
                        <Link2 className="w-3 h-3 mr-2" />
                        Öffentlichen Link kopieren
                      </Button>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
