import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { StickyNote, Plus, Trash2, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Note {
  id: string;
  content: string;
  createdAt: string;
  color: string;
}

const colors = [
  'bg-amber-100 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800',
  'bg-rose-100 dark:bg-rose-900/30 border-rose-200 dark:border-rose-800',
  'bg-emerald-100 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800',
  'bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800',
  'bg-purple-100 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800',
];

export const QuickNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem('admin-quick-notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes to localStorage
  const saveNotes = (updatedNotes: Note[]) => {
    localStorage.setItem('admin-quick-notes', JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  };

  const addNote = () => {
    if (!newNote.trim()) return;
    
    const note: Note = {
      id: Date.now().toString(),
      content: newNote,
      createdAt: new Date().toISOString(),
      color: colors[Math.floor(Math.random() * colors.length)]
    };
    
    saveNotes([note, ...notes]);
    setNewNote("");
    setIsAdding(false);
  };

  const deleteNote = (id: string) => {
    saveNotes(notes.filter(n => n.id !== id));
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <StickyNote className="w-5 h-5 text-amber-500" />
            Schnelle Notizen
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsAdding(!isAdding)}
            className="h-8 w-8 p-0"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Add Note Form */}
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            <Textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Notiz eingeben..."
              className="min-h-[80px] resize-none"
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={addNote} className="flex-1">
                <Save className="w-4 h-4 mr-1" />
                Speichern
              </Button>
              <Button size="sm" variant="outline" onClick={() => setIsAdding(false)}>
                Abbrechen
              </Button>
            </div>
          </motion.div>
        )}

        {/* Notes List */}
        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          {notes.map((note, index) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-3 rounded-lg border ${note.color} group relative`}
            >
              <p className="text-sm whitespace-pre-wrap pr-6">{note.content}</p>
              <p className="text-[10px] text-muted-foreground mt-2">
                {new Date(note.createdAt).toLocaleDateString('de-CH', {
                  day: '2-digit',
                  month: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
              <button
                onClick={() => deleteNote(note.id)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded"
              >
                <Trash2 className="w-3 h-3 text-red-500" />
              </button>
            </motion.div>
          ))}
        </div>

        {notes.length === 0 && !isAdding && (
          <div className="text-center py-6 text-muted-foreground text-sm">
            <StickyNote className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p>Keine Notizen vorhanden</p>
            <button 
              onClick={() => setIsAdding(true)}
              className="text-primary hover:underline text-xs mt-1"
            >
              Erste Notiz erstellen
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
