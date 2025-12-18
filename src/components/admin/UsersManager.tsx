import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Users, 
  Shield, 
  ShieldCheck, 
  ShieldX,
  Search,
  Mail,
  Calendar,
  MoreHorizontal,
  UserPlus,
  Link2
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface UserProfile {
  id: string;
  full_name: string | null;
  phone: string | null;
  total_bookings: number | null;
  loyalty_points: number | null;
  member_since: string | null;
  created_at: string | null;
}

interface UserRole {
  user_id: string;
  role: 'admin' | 'moderator' | 'user';
}

export const UsersManager = () => {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>("");
  
  // Admin tools state
  const [adminEmail, setAdminEmail] = useState("");
  const [therapistEmail, setTherapistEmail] = useState("");
  const [isGrantingAdmin, setIsGrantingAdmin] = useState(false);
  const [isLinkingTherapist, setIsLinkingTherapist] = useState(false);
  
  const { toast } = useToast();

  const fetchData = async () => {
    setIsLoading(true);
    
    const [profilesRes, rolesRes] = await Promise.all([
      supabase.from('profiles').select('*').order('created_at', { ascending: false }),
      supabase.from('user_roles').select('user_id, role')
    ]);

    if (profilesRes.data) setProfiles(profilesRes.data);
    if (rolesRes.data) setRoles(rolesRes.data as UserRole[]);
    
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getUserRole = (userId: string): string => {
    const userRole = roles.find(r => r.user_id === userId);
    return userRole?.role || 'user';
  };

  const handleRoleChange = async () => {
    if (!selectedUser || !selectedRole) return;

    const existingRole = roles.find(r => r.user_id === selectedUser.id);

    if (existingRole) {
      const { error } = await supabase
        .from('user_roles')
        .update({ role: selectedRole as 'admin' | 'moderator' | 'user' })
        .eq('user_id', selectedUser.id);

      if (error) {
        toast({ title: 'Fehler', description: error.message, variant: 'destructive' });
        return;
      }
    } else {
      const { error } = await supabase
        .from('user_roles')
        .insert({ user_id: selectedUser.id, role: selectedRole as 'admin' | 'moderator' | 'user' });

      if (error) {
        toast({ title: 'Fehler', description: error.message, variant: 'destructive' });
        return;
      }
    }

    toast({ title: 'Erfolg', description: 'Rolle aktualisiert' });
    setIsRoleDialogOpen(false);
    fetchData();
  };

  const handleGrantAdmin = async () => {
    if (!adminEmail.trim()) return;
    setIsGrantingAdmin(true);

    try {
      const { data, error } = await supabase.functions.invoke('admin-tools', {
        body: { action: 'grant_admin', target_email: adminEmail.trim() }
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      toast({ title: 'Erfolg', description: `${adminEmail} ist jetzt Admin` });
      setAdminEmail("");
      fetchData();
    } catch (err: any) {
      toast({ title: 'Fehler', description: err.message, variant: 'destructive' });
    } finally {
      setIsGrantingAdmin(false);
    }
  };

  const handleLinkTherapist = async () => {
    if (!therapistEmail.trim()) return;
    setIsLinkingTherapist(true);

    try {
      const { data, error } = await supabase.functions.invoke('admin-tools', {
        body: { action: 'link_therapist_admin', therapist_email: therapistEmail.trim() }
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      toast({ 
        title: 'Erfolg', 
        description: `${data.therapist_name || therapistEmail} wurde verknüpft` 
      });
      setTherapistEmail("");
    } catch (err: any) {
      toast({ title: 'Fehler', description: err.message, variant: 'destructive' });
    } finally {
      setIsLinkingTherapist(false);
    }
  };

  const filteredProfiles = profiles.filter(p => {
    const query = searchQuery.toLowerCase();
    return (
      p.full_name?.toLowerCase().includes(query) ||
      p.id.toLowerCase().includes(query)
    );
  });

  const roleConfig = {
    admin: { label: 'Admin', color: 'bg-red-500/20 text-red-600 border-red-500/30', icon: ShieldCheck },
    moderator: { label: 'Moderator', color: 'bg-amber-500/20 text-amber-600 border-amber-500/30', icon: Shield },
    user: { label: 'Benutzer', color: 'bg-blue-500/20 text-blue-600 border-blue-500/30', icon: Users },
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-20 rounded-xl bg-muted/30 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Admin Tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Grant Admin */}
          <div className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-5 h-5 text-red-500" />
              <h4 className="font-medium">Admin ernennen</h4>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="E-Mail-Adresse"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={handleGrantAdmin} 
                disabled={isGrantingAdmin || !adminEmail.trim()}
                size="sm"
              >
                {isGrantingAdmin ? "..." : "Ernennen"}
              </Button>
            </div>
          </div>

          {/* Link Therapist */}
          <div className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 mb-3">
              <Link2 className="w-5 h-5 text-primary" />
              <h4 className="font-medium">Therapeut:in verknüpfen</h4>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="E-Mail (Therapeut + Login)"
                value={therapistEmail}
                onChange={(e) => setTherapistEmail(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={handleLinkTherapist} 
                disabled={isLinkingTherapist || !therapistEmail.trim()}
                size="sm"
              >
                {isLinkingTherapist ? "..." : "Verknüpfen"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Verknüpft Therapeut:in-Profil mit dem Benutzeraccount (gleiche E-Mail)
            </p>
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Benutzerverwaltung</h3>
            <p className="text-sm text-muted-foreground">{profiles.length} registrierte Benutzer</p>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Suchen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20">
            <p className="text-sm text-muted-foreground">Gesamt</p>
            <p className="text-2xl font-bold font-playfair">{profiles.length}</p>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20">
            <p className="text-sm text-muted-foreground">Admins</p>
            <p className="text-2xl font-bold font-playfair">{roles.filter(r => r.role === 'admin').length}</p>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-muted-foreground">Moderatoren</p>
            <p className="text-2xl font-bold font-playfair">{roles.filter(r => r.role === 'moderator').length}</p>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-muted-foreground">Gesamte Buchungen</p>
            <p className="text-2xl font-bold font-playfair">{profiles.reduce((sum, p) => sum + (p.total_bookings || 0), 0)}</p>
          </div>
        </div>

        {/* Users List */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-4 font-medium text-muted-foreground">Benutzer</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Rolle</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Buchungen</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Punkte</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Mitglied seit</th>
                <th className="text-right p-4 font-medium text-muted-foreground">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredProfiles.map((profile, index) => {
                  const role = getUserRole(profile.id);
                  const config = roleConfig[role as keyof typeof roleConfig];
                  const RoleIcon = config.icon;

                  return (
                    <motion.tr
                      key={profile.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Users className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{profile.full_name || 'Unbenannt'}</p>
                            <p className="text-xs text-muted-foreground font-mono">{profile.id.slice(0, 8)}...</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className={cn("gap-1", config.color)}>
                          <RoleIcon className="w-3 h-3" />
                          {config.label}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <span className="font-medium">{profile.total_bookings || 0}</span>
                      </td>
                      <td className="p-4">
                        <span className="font-medium">{profile.loyalty_points || 0}</span>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {profile.member_since 
                          ? new Date(profile.member_since).toLocaleDateString('de-CH')
                          : '-'}
                      </td>
                      <td className="p-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => {
                              setSelectedUser(profile);
                              setSelectedRole(role);
                              setIsRoleDialogOpen(true);
                            }}>
                              <Shield className="w-4 h-4 mr-2" />
                              Rolle ändern
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>

          {filteredProfiles.length === 0 && (
            <div className="p-12 text-center text-muted-foreground">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Keine Benutzer gefunden</p>
            </div>
          )}
        </div>
      </div>

      {/* Role Dialog */}
      <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-playfair text-2xl">Rolle ändern</DialogTitle>
            <DialogDescription>
              Rolle für {selectedUser?.full_name || 'Benutzer'} ändern
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue placeholder="Rolle auswählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">Benutzer</SelectItem>
                <SelectItem value="moderator">Moderator</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsRoleDialogOpen(false)}>
                Abbrechen
              </Button>
              <Button onClick={handleRoleChange}>
                Speichern
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};