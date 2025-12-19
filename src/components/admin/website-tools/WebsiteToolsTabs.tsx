import { useState } from "react";
import { Camera, Package, Gauge } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScreenshotMachine } from "./ScreenshotMachine";
import { UltimateZipPackage } from "./UltimateZipPackage";
import { LighthouseAudit } from "./LighthouseAudit";

export const WebsiteToolsTabs = () => {
  const [activeTab, setActiveTab] = useState("screenshots");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Website-Tools</h1>
        <p className="text-muted-foreground mt-1">
          Erfassen Sie Screenshots, erstellen Sie Analyse-Pakete und führen Sie Performance-Audits durch
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-12">
          <TabsTrigger value="screenshots" className="flex items-center gap-2 text-sm">
            <Camera className="w-4 h-4" />
            Screenshots
          </TabsTrigger>
          <TabsTrigger value="zippackage" className="flex items-center gap-2 text-sm">
            <Package className="w-4 h-4" />
            ZIP-Paket
          </TabsTrigger>
          <TabsTrigger value="lighthouse" className="flex items-center gap-2 text-sm">
            <Gauge className="w-4 h-4" />
            Lighthouse
          </TabsTrigger>
        </TabsList>

        <TabsContent value="screenshots" className="mt-6">
          <ScreenshotMachine />
        </TabsContent>

        <TabsContent value="zippackage" className="mt-6">
          <UltimateZipPackage />
        </TabsContent>

        <TabsContent value="lighthouse" className="mt-6">
          <LighthouseAudit />
        </TabsContent>
      </Tabs>
    </div>
  );
};
