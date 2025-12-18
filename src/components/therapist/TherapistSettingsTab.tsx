import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Save, User, Phone, Mail, Clock, Briefcase } from "lucide-react";

interface TherapistSettingsTabProps {
  therapistId: string;
  initialData: {
    name: string;
    email: string;
    phone?: string | null;
    bio?: string | null;
    experience_years?: number | null;
    hourly_rate?: number | null;
    working_hours_start?: string | null;
    working_hours_end?: string | null;
    specialty?: string[] | null;
  };
}

export const TherapistSettingsTab = ({ therapistId, initialData }: TherapistSettingsTabProps) => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    name: initialData.name || "",
    phone: initialData.phone || "",
    bio: initialData.bio || "",
    experience_years: initialData.experience_years || 0,
    hourly_rate: initialData.hourly_rate || 120,
    working_hours_start: initialData.working_hours_start || "09:00",
    working_hours_end: initialData.working_hours_end || "20:00",
  });

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('therapists')
        .update({
          name: profile.name,
          phone: profile.phone || null,
          bio: profile.bio || null,
          experience_years: profile.experience_years,
          hourly_rate: profile.hourly_rate,
          working_hours_start: profile.working_hours_start,
          working_hours_end: profile.working_hours_end,
          updated_at: new Date().toISOString(),
        })
        .eq('id', therapistId);

      if (error) throw error;

      toast({
        title: "Gespeichert",
        description: "Ihre Einstellungen wurden aktualisiert.",
      });
    } catch (err) {
      console.error('Failed to save settings:', err);
      toast({
        title: "Fehler",
        description: "Einstellungen konnten nicht gespeichert werden.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User size={20} />
            Profil
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                placeholder="Ihr vollständiger Name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefon</Label>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  placeholder="+41 ..."
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-Mail (nicht änderbar)</Label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                value={initialData.email}
                disabled
                className="pl-10 bg-muted"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Biografie</Label>
            <Textarea
              id="bio"
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              placeholder="Erzählen Sie etwas über sich und Ihre Erfahrung..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Professional Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase size={20} />
            Berufliche Angaben
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="experience">Erfahrung (Jahre)</Label>
              <Input
                id="experience"
                type="number"
                min={0}
                value={profile.experience_years}
                onChange={(e) => setProfile({ ...profile, experience_years: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rate">Stundensatz (CHF)</Label>
              <Input
                id="rate"
                type="number"
                min={0}
                value={profile.hourly_rate}
                onChange={(e) => setProfile({ ...profile, hourly_rate: parseFloat(e.target.value) || 0 })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Working Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock size={20} />
            Arbeitszeiten
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="start">Arbeitsbeginn</Label>
              <Input
                id="start"
                type="time"
                value={profile.working_hours_start}
                onChange={(e) => setProfile({ ...profile, working_hours_start: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end">Arbeitsende</Label>
              <Input
                id="end"
                type="time"
                value={profile.working_hours_end}
                onChange={(e) => setProfile({ ...profile, working_hours_end: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving} className="min-w-[140px]">
          {saving ? (
            <>
              <Loader2 size={16} className="animate-spin mr-2" />
              Speichern...
            </>
          ) : (
            <>
              <Save size={16} className="mr-2" />
              Speichern
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
