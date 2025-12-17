import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  UserCheck, 
  UserX, 
  Search, 
  Star, 
  Clock, 
  Mail, 
  Phone,
  Calendar,
  Loader2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye
} from "lucide-react";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Therapist {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  bio: string | null;
  photo_url: string | null;
  specialty: string[] | null;
  qualifications: string[] | null;
  experience_years: number | null;
  status: "pending" | "approved" | "rejected" | "suspended";
  average_rating: number | null;
  total_bookings: number | null;
  created_at: string;
}

export const TherapistsManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);

  const { data: therapists = [], isLoading } = useQuery({
    queryKey: ["admin-therapists"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("therapists")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Therapist[];
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const updateData: Record<string, unknown> = { status };
      if (status === "approved") {
        updateData.approved_at = new Date().toISOString();
      }
      const { error } = await supabase
        .from("therapists")
        .update(updateData)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-therapists"] });
      toast({ title: "Status aktualisiert" });
    },
    onError: () => {
      toast({ title: "Fehler", variant: "destructive" });
    },
  });

  const filteredTherapists = therapists.filter((t) => {
    const matchesSearch = 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Aktiv</Badge>;
      case "pending":
        return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Ausstehend</Badge>;
      case "rejected":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Abgelehnt</Badge>;
      case "suspended":
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">Gesperrt</Badge>;
      default:
        return null;
    }
  };

  const pendingCount = therapists.filter(t => t.status === "pending").length;

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-card border border-border"
        >
          <p className="text-sm text-muted-foreground">Gesamt</p>
          <p className="text-2xl font-bold">{therapists.length}</p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30"
        >
          <p className="text-sm text-emerald-400">Aktiv</p>
          <p className="text-2xl font-bold text-emerald-400">
            {therapists.filter(t => t.status === "approved").length}
          </p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30"
        >
          <p className="text-sm text-amber-400">Ausstehend</p>
          <p className="text-2xl font-bold text-amber-400">{pendingCount}</p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-4 rounded-xl bg-card border border-border"
        >
          <p className="text-sm text-muted-foreground">Ø Bewertung</p>
          <p className="text-2xl font-bold">
            {therapists.filter(t => t.average_rating).length > 0
              ? (therapists.reduce((sum, t) => sum + (t.average_rating || 0), 0) / 
                 therapists.filter(t => t.average_rating).length).toFixed(1)
              : "-"}
          </p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Suchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          {["all", "pending", "approved", "rejected", "suspended"].map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(status)}
              className="relative"
            >
              {status === "all" ? "Alle" : 
               status === "pending" ? "Ausstehend" :
               status === "approved" ? "Aktiv" :
               status === "rejected" ? "Abgelehnt" : "Gesperrt"}
              {status === "pending" && pendingCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full text-[10px] flex items-center justify-center text-white">
                  {pendingCount}
                </span>
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Therapists List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      ) : filteredTherapists.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          Keine Therapeut:innen gefunden
        </div>
      ) : (
        <div className="grid gap-4">
          <AnimatePresence>
            {filteredTherapists.map((therapist, index) => (
              <motion.div
                key={therapist.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all"
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                    {therapist.photo_url ? (
                      <img 
                        src={therapist.photo_url} 
                        alt={therapist.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-primary">
                        {therapist.name.charAt(0)}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">{therapist.name}</h3>
                      {getStatusBadge(therapist.status)}
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {therapist.email}
                      </span>
                      {therapist.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {therapist.phone}
                        </span>
                      )}
                      {therapist.experience_years && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {therapist.experience_years} Jahre
                        </span>
                      )}
                      {therapist.average_rating && (
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-amber-400" />
                          {therapist.average_rating.toFixed(1)}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {therapist.total_bookings || 0} Buchungen
                      </span>
                    </div>

                    {therapist.specialty && therapist.specialty.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {therapist.specialty.map((s) => (
                          <Badge key={s} variant="secondary" className="text-xs">
                            {s}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedTherapist(therapist)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Details
                    </Button>
                    
                    {therapist.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          className="bg-emerald-600 hover:bg-emerald-700"
                          onClick={() => updateStatusMutation.mutate({ 
                            id: therapist.id, 
                            status: "approved" 
                          })}
                          disabled={updateStatusMutation.isPending}
                        >
                          <UserCheck className="w-4 h-4 mr-1" />
                          Freigeben
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => updateStatusMutation.mutate({ 
                            id: therapist.id, 
                            status: "rejected" 
                          })}
                          disabled={updateStatusMutation.isPending}
                        >
                          <UserX className="w-4 h-4 mr-1" />
                          Ablehnen
                        </Button>
                      </>
                    )}
                    
                    {therapist.status === "approved" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive border-destructive/30"
                        onClick={() => updateStatusMutation.mutate({ 
                          id: therapist.id, 
                          status: "suspended" 
                        })}
                        disabled={updateStatusMutation.isPending}
                      >
                        <AlertCircle className="w-4 h-4 mr-1" />
                        Sperren
                      </Button>
                    )}
                    
                    {therapist.status === "suspended" && (
                      <Button
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700"
                        onClick={() => updateStatusMutation.mutate({ 
                          id: therapist.id, 
                          status: "approved" 
                        })}
                        disabled={updateStatusMutation.isPending}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Reaktivieren
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Detail Dialog */}
      <Dialog open={!!selectedTherapist} onOpenChange={() => setSelectedTherapist(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Therapeut:in Details</DialogTitle>
          </DialogHeader>
          {selectedTherapist && (
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-24 h-24 rounded-xl bg-primary/10 flex items-center justify-center overflow-hidden">
                  {selectedTherapist.photo_url ? (
                    <img 
                      src={selectedTherapist.photo_url} 
                      alt={selectedTherapist.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl font-bold text-primary">
                      {selectedTherapist.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{selectedTherapist.name}</h2>
                  {getStatusBadge(selectedTherapist.status)}
                  <p className="text-sm text-muted-foreground mt-2">
                    Registriert am {format(new Date(selectedTherapist.created_at), "d. MMMM yyyy", { locale: de })}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">E-Mail</p>
                  <p>{selectedTherapist.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Telefon</p>
                  <p>{selectedTherapist.phone || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Erfahrung</p>
                  <p>{selectedTherapist.experience_years ? `${selectedTherapist.experience_years} Jahre` : "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Buchungen</p>
                  <p>{selectedTherapist.total_bookings || 0}</p>
                </div>
              </div>

              {selectedTherapist.bio && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Über mich</p>
                  <p className="text-sm">{selectedTherapist.bio}</p>
                </div>
              )}

              {selectedTherapist.specialty && selectedTherapist.specialty.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Spezialisierungen</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedTherapist.specialty.map((s) => (
                      <Badge key={s}>{s}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {selectedTherapist.qualifications && selectedTherapist.qualifications.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Qualifikationen</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedTherapist.qualifications.map((q) => (
                      <Badge key={q} variant="outline">{q}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
