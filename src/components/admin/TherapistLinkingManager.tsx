import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Users, 
  Link2, 
  Link2Off,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Mail
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Therapist {
  id: string;
  name: string;
  email: string;
  user_id: string | null;
  status: string;
  photo_url: string | null;
}

export const TherapistLinkingManager = () => {
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [linkingId, setLinkingId] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchTherapists = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('therapists')
      .select('id, name, email, user_id, status, photo_url')
      .order('name');
    
    if (data) setTherapists(data);
    if (error) console.error('Error fetching therapists:', error);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTherapists();
  }, []);

  const handleLinkTherapist = async (therapist: Therapist) => {
    setLinkingId(therapist.id);
    
    try {
      const { data, error } = await supabase.functions.invoke('admin-tools', {
        body: { 
          action: 'link_therapist_admin', 
          therapist_email: therapist.email 
        }
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      toast({ 
        title: 'Erfolg', 
        description: `${therapist.name} wurde verknüpft` 
      });
      fetchTherapists();
    } catch (err: any) {
      toast({ 
        title: 'Fehler', 
        description: err.message, 
        variant: 'destructive' 
      });
    } finally {
      setLinkingId(null);
    }
  };

  const linkedCount = therapists.filter(t => t.user_id).length;
  const unlinkedCount = therapists.filter(t => !t.user_id).length;

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-16 rounded-xl bg-muted/30 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Therapeut:innen Verknüpfung</h3>
          <p className="text-sm text-muted-foreground">
            {therapists.length} Therapeut:innen • {linkedCount} verknüpft • {unlinkedCount} offen
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchTherapists}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Aktualisieren
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <p className="text-sm text-muted-foreground">Verknüpft</p>
          </div>
          <p className="text-2xl font-bold font-playfair">{linkedCount}</p>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20">
          <div className="flex items-center gap-2 mb-1">
            <Link2Off className="w-4 h-4 text-amber-500" />
            <p className="text-sm text-muted-foreground">Nicht verknüpft</p>
          </div>
          <p className="text-2xl font-bold font-playfair">{unlinkedCount}</p>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-blue-500" />
            <p className="text-sm text-muted-foreground">Gesamt</p>
          </div>
          <p className="text-2xl font-bold font-playfair">{therapists.length}</p>
        </div>
      </div>

      {/* Therapist List */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left p-4 font-medium text-muted-foreground">Therapeut:in</th>
              <th className="text-left p-4 font-medium text-muted-foreground">E-Mail</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Verknüpfung</th>
              <th className="text-right p-4 font-medium text-muted-foreground">Aktion</th>
            </tr>
          </thead>
          <tbody>
            {therapists.map((therapist, index) => (
              <motion.tr
                key={therapist.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 overflow-hidden flex items-center justify-center">
                      {therapist.photo_url ? (
                        <img 
                          src={therapist.photo_url} 
                          alt={therapist.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Users className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <span className="font-medium">{therapist.name}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    {therapist.email}
                  </div>
                </td>
                <td className="p-4">
                  <Badge 
                    variant="outline" 
                    className={cn(
                      therapist.status === 'approved' 
                        ? 'bg-emerald-500/20 text-emerald-600 border-emerald-500/30'
                        : therapist.status === 'pending'
                        ? 'bg-amber-500/20 text-amber-600 border-amber-500/30'
                        : 'bg-red-500/20 text-red-600 border-red-500/30'
                    )}
                  >
                    {therapist.status === 'approved' ? 'Genehmigt' : 
                     therapist.status === 'pending' ? 'Ausstehend' : 'Abgelehnt'}
                  </Badge>
                </td>
                <td className="p-4">
                  {therapist.user_id ? (
                    <div className="flex items-center gap-2 text-emerald-600">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="text-sm">Verknüpft</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-amber-600">
                      <XCircle className="w-4 h-4" />
                      <span className="text-sm">Nicht verknüpft</span>
                    </div>
                  )}
                </td>
                <td className="p-4 text-right">
                  {!therapist.user_id && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleLinkTherapist(therapist)}
                      disabled={linkingId === therapist.id}
                    >
                      {linkingId === therapist.id ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <Link2 className="w-4 h-4 mr-2" />
                          Verknüpfen
                        </>
                      )}
                    </Button>
                  )}
                  {therapist.user_id && (
                    <span className="text-xs text-muted-foreground font-mono">
                      {therapist.user_id.slice(0, 8)}...
                    </span>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {therapists.length === 0 && (
          <div className="p-12 text-center text-muted-foreground">
            <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Keine Therapeut:innen gefunden</p>
          </div>
        )}
      </div>
    </div>
  );
};
