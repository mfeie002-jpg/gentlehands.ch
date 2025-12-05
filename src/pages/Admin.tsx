import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { Tables } from "@/integrations/supabase/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar, Clock, User, Mail, Phone, Search, RefreshCw, Eye } from "lucide-react";

type Booking = Tables<"bookings">;

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  confirmed: "bg-green-500/20 text-green-400 border-green-500/30",
  cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
  completed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

const statusLabels: Record<string, string> = {
  pending: "Ausstehend",
  confirmed: "Bestätigt",
  cancelled: "Storniert",
  completed: "Abgeschlossen",
};

const Admin = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const { toast } = useToast();

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast({
        title: "Fehler",
        description: "Buchungen konnten nicht geladen werden.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (bookingId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status: newStatus })
        .eq("id", bookingId);

      if (error) throw error;

      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
      );

      toast({
        title: "Status aktualisiert",
        description: `Buchung wurde auf "${statusLabels[newStatus]}" gesetzt.`,
      });
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Fehler",
        description: "Status konnte nicht aktualisiert werden.",
        variant: "destructive",
      });
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.booking_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customer_email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <Layout>
      <Helmet>
        <title>Admin - Buchungsverwaltung | GentleHands</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <section className="min-h-screen pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
              Buchungsverwaltung
            </h1>
            <p className="text-muted-foreground text-lg">
              Alle Buchungen verwalten und bearbeiten
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col md:flex-row gap-4 mb-6"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Suche nach Buchungsnummer, Name oder E-Mail..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status filtern" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Status</SelectItem>
                <SelectItem value="pending">Ausstehend</SelectItem>
                <SelectItem value="confirmed">Bestätigt</SelectItem>
                <SelectItem value="cancelled">Storniert</SelectItem>
                <SelectItem value="completed">Abgeschlossen</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={fetchBookings}
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Aktualisieren
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            <div className="glass rounded-xl p-4">
              <p className="text-muted-foreground text-sm">Gesamt</p>
              <p className="text-2xl font-display text-foreground">{bookings.length}</p>
            </div>
            <div className="glass rounded-xl p-4">
              <p className="text-muted-foreground text-sm">Ausstehend</p>
              <p className="text-2xl font-display text-yellow-400">
                {bookings.filter((b) => b.status === "pending").length}
              </p>
            </div>
            <div className="glass rounded-xl p-4">
              <p className="text-muted-foreground text-sm">Bestätigt</p>
              <p className="text-2xl font-display text-green-400">
                {bookings.filter((b) => b.status === "confirmed").length}
              </p>
            </div>
            <div className="glass rounded-xl p-4">
              <p className="text-muted-foreground text-sm">Abgeschlossen</p>
              <p className="text-2xl font-display text-blue-400">
                {bookings.filter((b) => b.status === "completed").length}
              </p>
            </div>
          </motion.div>

          {/* Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl overflow-hidden"
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Buchungsnr.</TableHead>
                  <TableHead>Kunde</TableHead>
                  <TableHead>Termin</TableHead>
                  <TableHead>Massage</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aktionen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
                    </TableCell>
                  </TableRow>
                ) : filteredBookings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      Keine Buchungen gefunden
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-mono text-sm">
                        {booking.booking_number}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{booking.customer_name}</p>
                          <p className="text-sm text-muted-foreground">{booking.customer_email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {booking.appointment_date ? (
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            {format(new Date(booking.appointment_date), "dd.MM.yyyy", { locale: de })}
                            {booking.appointment_time && (
                              <>
                                <Clock className="w-4 h-4 text-muted-foreground ml-2" />
                                {booking.appointment_time}
                              </>
                            )}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{booking.massage || "-"}</p>
                          {booking.duration && (
                            <p className="text-xs text-muted-foreground">{booking.duration}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={booking.status || "pending"}
                          onValueChange={(value) => updateStatus(booking.id, value)}
                        >
                          <SelectTrigger className="w-32 h-8">
                            <Badge
                              variant="outline"
                              className={statusColors[booking.status || "pending"]}
                            >
                              {statusLabels[booking.status || "pending"]}
                            </Badge>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Ausstehend</SelectItem>
                            <SelectItem value="confirmed">Bestätigt</SelectItem>
                            <SelectItem value="cancelled">Storniert</SelectItem>
                            <SelectItem value="completed">Abgeschlossen</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedBooking(booking)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </motion.div>
        </div>
      </section>

      {/* Detail Dialog */}
      <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">
              Buchung {selectedBooking?.booking_number}
            </DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-6">
              {/* Customer Info */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Kundeninformationen</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span>{selectedBooking.customer_name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{selectedBooking.customer_email}</span>
                  </div>
                  {selectedBooking.customer_phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedBooking.customer_phone}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Booking Details */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Buchungsdetails</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Masseur:in</p>
                    <p>{selectedBooking.masseur || "-"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Thema</p>
                    <p>{selectedBooking.theme || "-"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Massage</p>
                    <p>{selectedBooking.massage || "-"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Dauer</p>
                    <p>{selectedBooking.duration || "-"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Datum</p>
                    <p>
                      {selectedBooking.appointment_date
                        ? format(new Date(selectedBooking.appointment_date), "dd.MM.yyyy", { locale: de })
                        : "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Uhrzeit</p>
                    <p>{selectedBooking.appointment_time || "-"}</p>
                  </div>
                </div>
              </div>

              {/* Preferences */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Präferenzen</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {selectedBooking.music_preference && (
                    <div>
                      <p className="text-muted-foreground">Musik</p>
                      <p>{selectedBooking.music_preference}</p>
                    </div>
                  )}
                  {selectedBooking.conversation_preference && (
                    <div>
                      <p className="text-muted-foreground">Gespräch</p>
                      <p>{selectedBooking.conversation_preference}</p>
                    </div>
                  )}
                  {selectedBooking.intensity_preference && (
                    <div>
                      <p className="text-muted-foreground">Druckstärke</p>
                      <p>{selectedBooking.intensity_preference}</p>
                    </div>
                  )}
                  {selectedBooking.avoid_areas && (
                    <div>
                      <p className="text-muted-foreground">Ausgeschlossene Bereiche</p>
                      <p>{selectedBooking.avoid_areas}</p>
                    </div>
                  )}
                  {selectedBooking.intuitive !== null && (
                    <div>
                      <p className="text-muted-foreground">Intuitiv</p>
                      <p>{selectedBooking.intuitive ? "Ja" : "Nein"}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Special Notes */}
              {selectedBooking.additional_notes && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Besondere Hinweise</h3>
                  <p className="text-sm bg-muted/50 p-3 rounded-lg">
                    {selectedBooking.additional_notes}
                  </p>
                </div>
              )}

              {/* Meta Info */}
              <div className="pt-4 border-t border-border text-xs text-muted-foreground">
                Erstellt am: {format(new Date(selectedBooking.created_at), "dd.MM.yyyy HH:mm", { locale: de })}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Admin;
