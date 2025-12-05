import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Save, User, Bell, Shield } from "lucide-react";
import { toast } from "sonner";

interface SettingsTabProps {
  userId: string;
  userEmail: string;
}

export const SettingsTab = ({ userId, userEmail }: SettingsTabProps) => {
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    full_name: "",
    phone: "",
    preferred_therapist: "",
    preferred_theme: "",
    newsletter_subscribed: false,
  });

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  const fetchProfile = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (data) {
      setProfile({
        full_name: data.full_name || "",
        phone: data.phone || "",
        preferred_therapist: data.preferred_therapist || "",
        preferred_theme: data.preferred_theme || "",
        newsletter_subscribed: data.newsletter_subscribed || false,
      });
    }
  };

  const saveProfile = async () => {
    setSaving(true);
    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        ...profile,
        updated_at: new Date().toISOString(),
      });

    setSaving(false);

    if (error) {
      toast.error("Fehler beim Speichern");
    } else {
      toast.success("Einstellungen gespeichert");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Profile Settings */}
      <div className="glass rounded-2xl p-6 border border-border/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-copper/10 flex items-center justify-center">
            <User className="w-5 h-5 text-copper" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-foreground">Profil</h3>
            <p className="text-sm text-muted-foreground">Ihre persönlichen Daten</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">E-Mail</label>
            <input
              type="email"
              value={userEmail}
              disabled
              className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-muted-foreground cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Name</label>
            <input
              type="text"
              value={profile.full_name}
              onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
              placeholder="Ihr vollständiger Name"
              className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-copper outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Telefon</label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              placeholder="+41 79 123 45 67"
              className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-copper outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="glass rounded-2xl p-6 border border-border/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-petrol/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-petrol" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-foreground">Präferenzen</h3>
            <p className="text-sm text-muted-foreground">Ihre bevorzugten Einstellungen</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Bevorzugte/r Therapeut:in
            </label>
            <select
              value={profile.preferred_therapist}
              onChange={(e) => setProfile({ ...profile, preferred_therapist: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-copper outline-none transition-colors"
            >
              <option value="">Keine Präferenz</option>
              <option value="anna">Anna</option>
              <option value="luca">Luca</option>
              <option value="morris">Morris</option>
              <option value="sophie">Sophie</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Lieblings-Erlebnis
            </label>
            <select
              value={profile.preferred_theme}
              onChange={(e) => setProfile({ ...profile, preferred_theme: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-copper outline-none transition-colors"
            >
              <option value="">Keine Präferenz</option>
              <option value="ozean">Ozean & Palmen</option>
              <option value="alpine">Alpine Stille</option>
              <option value="dark">Deep Dark Relax</option>
              <option value="urban">Urban Loft</option>
              <option value="zen">Zen Garden</option>
              <option value="surprise">Surprise Experience</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="glass rounded-2xl p-6 border border-border/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
            <Bell className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-foreground">Benachrichtigungen</h3>
            <p className="text-sm text-muted-foreground">E-Mail-Einstellungen</p>
          </div>
        </div>

        <label className="flex items-center gap-3 p-4 rounded-xl bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors">
          <input
            type="checkbox"
            checked={profile.newsletter_subscribed}
            onChange={(e) => setProfile({ ...profile, newsletter_subscribed: e.target.checked })}
            className="w-5 h-5 rounded border-border text-copper focus:ring-copper"
          />
          <div>
            <p className="font-medium text-foreground">Newsletter abonnieren</p>
            <p className="text-sm text-muted-foreground">
              Erhalten Sie exklusive Angebote und Wellness-Tipps
            </p>
          </div>
        </label>
      </div>

      {/* Save Button */}
      <Button 
        variant="copper" 
        onClick={saveProfile} 
        disabled={saving}
        className="w-full"
      >
        <Save className="w-4 h-4 mr-2" />
        {saving ? "Speichern..." : "Änderungen speichern"}
      </Button>
    </motion.div>
  );
};
