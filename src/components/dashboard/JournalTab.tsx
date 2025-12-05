import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { 
  BookOpen, Plus, Calendar, Smile, Meh, Frown, 
  Save, X, Sparkles, TrendingUp, Heart
} from "lucide-react";
import { toast } from "sonner";

interface SessionNote {
  id: string;
  booking_id: string | null;
  note_date: string;
  mood_before: string | null;
  mood_after: string | null;
  notes: string | null;
  private_reflection: string | null;
  created_at: string;
}

interface Booking {
  id: string;
  massage: string;
  theme: string;
  appointment_date: string;
}

interface JournalTabProps {
  userId: string;
  userEmail: string;
}

const moodIcons = {
  great: { icon: Smile, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  okay: { icon: Meh, color: "text-amber-500", bg: "bg-amber-500/10" },
  low: { icon: Frown, color: "text-rose-500", bg: "bg-rose-500/10" },
};

export const JournalTab = ({ userId, userEmail }: JournalTabProps) => {
  const [notes, setNotes] = useState<SessionNote[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const [newNote, setNewNote] = useState({
    booking_id: "",
    mood_before: "",
    mood_after: "",
    notes: "",
    private_reflection: "",
  });

  useEffect(() => {
    fetchData();
  }, [userId]);

  const fetchData = async () => {
    const [notesRes, bookingsRes] = await Promise.all([
      supabase
        .from('session_notes')
        .select('*')
        .eq('user_id', userId)
        .order('note_date', { ascending: false }),
      supabase
        .from('bookings')
        .select('id, massage, theme, appointment_date')
        .eq('customer_email', userEmail)
        .order('appointment_date', { ascending: false })
        .limit(20)
    ]);

    if (notesRes.data) setNotes(notesRes.data);
    if (bookingsRes.data) setBookings(bookingsRes.data);
    setLoading(false);
  };

  const saveNote = async () => {
    if (!newNote.notes && !newNote.private_reflection) {
      toast.error("Bitte fügen Sie Notizen hinzu");
      return;
    }

    setSaving(true);
    const { data, error } = await supabase
      .from('session_notes')
      .insert({
        user_id: userId,
        booking_id: newNote.booking_id || null,
        note_date: new Date().toISOString().split('T')[0],
        mood_before: newNote.mood_before || null,
        mood_after: newNote.mood_after || null,
        notes: newNote.notes || null,
        private_reflection: newNote.private_reflection || null,
      })
      .select()
      .single();

    setSaving(false);

    if (error) {
      toast.error("Fehler beim Speichern");
    } else {
      setNotes([data, ...notes]);
      setNewNote({ booking_id: "", mood_before: "", mood_after: "", notes: "", private_reflection: "" });
      setShowForm(false);
      toast.success("Eintrag gespeichert");
    }
  };

  const deleteNote = async (id: string) => {
    const { error } = await supabase
      .from('session_notes')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error("Fehler beim Löschen");
    } else {
      setNotes(notes.filter(n => n.id !== id));
      toast.success("Eintrag gelöscht");
    }
  };

  const getBookingDetails = (bookingId: string | null) => {
    if (!bookingId) return null;
    return bookings.find(b => b.id === bookingId);
  };

  const getMoodStats = () => {
    const moods = notes.map(n => n.mood_after).filter(Boolean);
    const great = moods.filter(m => m === 'great').length;
    const okay = moods.filter(m => m === 'okay').length;
    const low = moods.filter(m => m === 'low').length;
    return { great, okay, low, total: moods.length };
  };

  const stats = getMoodStats();

  if (loading) {
    return (
      <div className="glass rounded-2xl p-6 border border-border/50">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted rounded w-1/3"></div>
          <div className="h-32 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Stats Overview */}
      {notes.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          <div className="glass rounded-xl p-4 border border-border/50 text-center">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-2">
              <Smile className="w-5 h-5 text-emerald-500" />
            </div>
            <p className="text-2xl font-bold text-foreground">{stats.great}</p>
            <p className="text-xs text-muted-foreground">Sehr gut</p>
          </div>
          <div className="glass rounded-xl p-4 border border-border/50 text-center">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-2">
              <Meh className="w-5 h-5 text-amber-500" />
            </div>
            <p className="text-2xl font-bold text-foreground">{stats.okay}</p>
            <p className="text-xs text-muted-foreground">Okay</p>
          </div>
          <div className="glass rounded-xl p-4 border border-border/50 text-center">
            <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-5 h-5 text-rose-500" />
            </div>
            <p className="text-2xl font-bold text-foreground">{notes.length}</p>
            <p className="text-xs text-muted-foreground">Einträge</p>
          </div>
        </div>
      )}

      {/* Main Journal Card */}
      <div className="glass rounded-2xl p-6 border border-border/50">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-display font-semibold text-foreground">Mein Wellness-Journal</h3>
            <p className="text-sm text-muted-foreground">Dokumentieren Sie Ihre Erfahrungen</p>
          </div>
          <Button 
            variant="copper" 
            size="sm"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? <X className="w-4 h-4 mr-1" /> : <Plus className="w-4 h-4 mr-1" />}
            {showForm ? "Abbrechen" : "Neuer Eintrag"}
          </Button>
        </div>

        {/* New Entry Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="p-4 rounded-xl bg-muted/30 border border-border/50 mb-6 space-y-4">
                {/* Booking Selection */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Verknüpftes Erlebnis (optional)
                  </label>
                  <select
                    value={newNote.booking_id}
                    onChange={(e) => setNewNote({ ...newNote, booking_id: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-background border border-border focus:border-copper outline-none"
                  >
                    <option value="">Kein Erlebnis</option>
                    {bookings.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.massage} - {b.theme} ({new Date(b.appointment_date).toLocaleDateString('de-CH')})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Mood Selection */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Stimmung vorher
                    </label>
                    <div className="flex gap-2">
                      {Object.entries(moodIcons).map(([key, { icon: Icon, color, bg }]) => (
                        <button
                          key={key}
                          onClick={() => setNewNote({ ...newNote, mood_before: key })}
                          className={`flex-1 p-3 rounded-xl transition-all ${
                            newNote.mood_before === key 
                              ? `${bg} border-2 border-current ${color}` 
                              : 'bg-background border border-border hover:bg-muted/50'
                          }`}
                        >
                          <Icon className={`w-5 h-5 mx-auto ${newNote.mood_before === key ? color : 'text-muted-foreground'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Stimmung nachher
                    </label>
                    <div className="flex gap-2">
                      {Object.entries(moodIcons).map(([key, { icon: Icon, color, bg }]) => (
                        <button
                          key={key}
                          onClick={() => setNewNote({ ...newNote, mood_after: key })}
                          className={`flex-1 p-3 rounded-xl transition-all ${
                            newNote.mood_after === key 
                              ? `${bg} border-2 border-current ${color}` 
                              : 'bg-background border border-border hover:bg-muted/50'
                          }`}
                        >
                          <Icon className={`w-5 h-5 mx-auto ${newNote.mood_after === key ? color : 'text-muted-foreground'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Notizen zur Session
                  </label>
                  <textarea
                    value={newNote.notes}
                    onChange={(e) => setNewNote({ ...newNote, notes: e.target.value })}
                    placeholder="Wie haben Sie sich gefühlt? Was war besonders?"
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-copper outline-none resize-none"
                  />
                </div>

                {/* Private Reflection */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Private Reflexion
                    <span className="text-xs text-muted-foreground ml-2">(nur für Sie sichtbar)</span>
                  </label>
                  <textarea
                    value={newNote.private_reflection}
                    onChange={(e) => setNewNote({ ...newNote, private_reflection: e.target.value })}
                    placeholder="Gedanken, Erkenntnisse, Ziele..."
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-copper outline-none resize-none"
                  />
                </div>

                <Button 
                  variant="copper" 
                  onClick={saveNote} 
                  disabled={saving}
                  className="w-full"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? "Speichern..." : "Eintrag speichern"}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Journal Entries */}
        {notes.length > 0 ? (
          <div className="space-y-4">
            {notes.map((note) => {
              const booking = getBookingDetails(note.booking_id);
              const MoodBeforeIcon = note.mood_before ? moodIcons[note.mood_before as keyof typeof moodIcons]?.icon : null;
              const MoodAfterIcon = note.mood_after ? moodIcons[note.mood_after as keyof typeof moodIcons]?.icon : null;
              
              return (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-muted/30 border border-border/50"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {new Date(note.note_date).toLocaleDateString('de-CH', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                    <button 
                      onClick={() => deleteNote(note.id)}
                      className="text-xs text-muted-foreground hover:text-destructive"
                    >
                      Löschen
                    </button>
                  </div>

                  {booking && (
                    <div className="flex items-center gap-2 mb-3 p-2 rounded-lg bg-copper/5 border border-copper/20">
                      <Sparkles className="w-4 h-4 text-copper" />
                      <span className="text-sm text-copper">{booking.massage} • {booking.theme}</span>
                    </div>
                  )}

                  {(note.mood_before || note.mood_after) && (
                    <div className="flex items-center gap-4 mb-3">
                      {MoodBeforeIcon && (
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-muted-foreground">Vorher:</span>
                          <MoodBeforeIcon className={`w-4 h-4 ${moodIcons[note.mood_before as keyof typeof moodIcons]?.color}`} />
                        </div>
                      )}
                      {MoodAfterIcon && (
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-muted-foreground">Nachher:</span>
                          <MoodAfterIcon className={`w-4 h-4 ${moodIcons[note.mood_after as keyof typeof moodIcons]?.color}`} />
                        </div>
                      )}
                    </div>
                  )}

                  {note.notes && (
                    <p className="text-sm text-foreground mb-2">{note.notes}</p>
                  )}

                  {note.private_reflection && (
                    <div className="mt-3 pt-3 border-t border-border/50">
                      <p className="text-xs text-muted-foreground italic flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {note.private_reflection}
                      </p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-petrol/10 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-petrol" />
            </div>
            <h4 className="font-medium text-foreground mb-2">Starten Sie Ihr Journal</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Dokumentieren Sie Ihre Wellness-Reise und verfolgen Sie Ihre Fortschritte.
            </p>
            <Button variant="copper" onClick={() => setShowForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Ersten Eintrag erstellen
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};
