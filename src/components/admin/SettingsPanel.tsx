import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Settings, 
  Bell, 
  Mail, 
  Globe, 
  Palette,
  Shield,
  Database,
  Save,
  RotateCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface SettingSection {
  id: string;
  icon: any;
  label: string;
}

const sections: SettingSection[] = [
  { id: 'general', icon: Settings, label: 'Allgemein' },
  { id: 'notifications', icon: Bell, label: 'Benachrichtigungen' },
  { id: 'email', icon: Mail, label: 'E-Mail' },
  { id: 'appearance', icon: Palette, label: 'Erscheinung' },
  { id: 'security', icon: Shield, label: 'Sicherheit' },
];

export const SettingsPanel = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [settings, setSettings] = useState({
    // General
    businessName: 'GentleHands',
    businessEmail: 'info@gentlehands.ch',
    businessPhone: '+41 44 123 45 67',
    timezone: 'Europe/Zurich',
    
    // Notifications
    notifyNewBooking: true,
    notifyNewTestimonial: true,
    notifyLowAvailability: true,
    notifyGiftCard: false,
    
    // Email
    emailFromName: 'GentleHands Team',
    emailReplyTo: 'info@gentlehands.ch',
    emailFooter: 'Mit herzlichen Grüssen,\nIhr GentleHands Team',
    
    // Appearance
    primaryColor: '#C9A86C',
    darkMode: false,
    
    // Security
    requireEmailConfirmation: false,
    maxLoginAttempts: 5,
    sessionTimeout: 60,
  });
  const { toast } = useToast();

  const handleSave = () => {
    // In production, save to database
    toast({ title: 'Gespeichert', description: 'Einstellungen wurden gespeichert' });
  };

  const handleReset = () => {
    toast({ title: 'Zurückgesetzt', description: 'Einstellungen wurden zurückgesetzt' });
  };

  return (
    <div className="flex gap-6">
      {/* Sidebar */}
      <div className="w-64 space-y-2">
        {sections.map((section) => (
          <motion.button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left",
              activeSection === section.id
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            <section.icon className="w-5 h-5" />
            <span className="font-medium">{section.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 rounded-2xl border border-border bg-card p-6">
        {activeSection === 'general' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-semibold mb-4">Allgemeine Einstellungen</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Geschäftsname</Label>
                  <Input
                    value={settings.businessName}
                    onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>E-Mail</Label>
                  <Input
                    type="email"
                    value={settings.businessEmail}
                    onChange={(e) => setSettings({ ...settings, businessEmail: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Telefon</Label>
                  <Input
                    value={settings.businessPhone}
                    onChange={(e) => setSettings({ ...settings, businessPhone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Zeitzone</Label>
                  <Select value={settings.timezone} onValueChange={(v) => setSettings({ ...settings, timezone: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Europe/Zurich">Europe/Zurich</SelectItem>
                      <SelectItem value="Europe/Berlin">Europe/Berlin</SelectItem>
                      <SelectItem value="Europe/Vienna">Europe/Vienna</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'notifications' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-semibold mb-4">Benachrichtigungen</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                  <div>
                    <p className="font-medium">Neue Buchungen</p>
                    <p className="text-sm text-muted-foreground">Benachrichtigung bei neuen Buchungen</p>
                  </div>
                  <Switch
                    checked={settings.notifyNewBooking}
                    onCheckedChange={(v) => setSettings({ ...settings, notifyNewBooking: v })}
                  />
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                  <div>
                    <p className="font-medium">Neue Testimonials</p>
                    <p className="text-sm text-muted-foreground">Benachrichtigung bei neuen Bewertungen</p>
                  </div>
                  <Switch
                    checked={settings.notifyNewTestimonial}
                    onCheckedChange={(v) => setSettings({ ...settings, notifyNewTestimonial: v })}
                  />
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                  <div>
                    <p className="font-medium">Geringe Verfügbarkeit</p>
                    <p className="text-sm text-muted-foreground">Warnung bei wenigen freien Terminen</p>
                  </div>
                  <Switch
                    checked={settings.notifyLowAvailability}
                    onCheckedChange={(v) => setSettings({ ...settings, notifyLowAvailability: v })}
                  />
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                  <div>
                    <p className="font-medium">Gutschein-Käufe</p>
                    <p className="text-sm text-muted-foreground">Benachrichtigung bei neuen Gutscheinen</p>
                  </div>
                  <Switch
                    checked={settings.notifyGiftCard}
                    onCheckedChange={(v) => setSettings({ ...settings, notifyGiftCard: v })}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'email' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-semibold mb-4">E-Mail Einstellungen</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Absender Name</Label>
                  <Input
                    value={settings.emailFromName}
                    onChange={(e) => setSettings({ ...settings, emailFromName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Antwort-Adresse</Label>
                  <Input
                    type="email"
                    value={settings.emailReplyTo}
                    onChange={(e) => setSettings({ ...settings, emailReplyTo: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>E-Mail Signatur</Label>
                  <Textarea
                    value={settings.emailFooter}
                    onChange={(e) => setSettings({ ...settings, emailFooter: e.target.value })}
                    rows={4}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'appearance' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-semibold mb-4">Erscheinung</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Primärfarbe</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={settings.primaryColor}
                      onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={settings.primaryColor}
                      onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                  <div>
                    <p className="font-medium">Dunkelmodus</p>
                    <p className="text-sm text-muted-foreground">Standard-Theme für Admin-Bereich</p>
                  </div>
                  <Switch
                    checked={settings.darkMode}
                    onCheckedChange={(v) => setSettings({ ...settings, darkMode: v })}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'security' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-semibold mb-4">Sicherheit</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                  <div>
                    <p className="font-medium">E-Mail Bestätigung</p>
                    <p className="text-sm text-muted-foreground">Benutzer müssen E-Mail bestätigen</p>
                  </div>
                  <Switch
                    checked={settings.requireEmailConfirmation}
                    onCheckedChange={(v) => setSettings({ ...settings, requireEmailConfirmation: v })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Max. Login-Versuche</Label>
                    <Input
                      type="number"
                      value={settings.maxLoginAttempts}
                      onChange={(e) => setSettings({ ...settings, maxLoginAttempts: parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Session Timeout (Min.)</Label>
                    <Input
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => setSettings({ ...settings, sessionTimeout: parseInt(e.target.value) })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-border">
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Zurücksetzen
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Speichern
          </Button>
        </div>
      </div>
    </div>
  );
};
