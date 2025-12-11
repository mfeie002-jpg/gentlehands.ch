import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Smile, 
  Meh, 
  Frown, 
  TrendingUp, 
  Calendar,
  Sparkles,
  Heart,
  Sun,
  Moon,
  Cloud
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface MoodEntry {
  date: string;
  mood: number;
  note?: string;
  energy?: number;
  sleep?: number;
}

interface MoodTrackerProps {
  entries?: MoodEntry[];
  onAddEntry?: (entry: MoodEntry) => void;
}

const moodEmojis = [
  { value: 1, icon: Frown, label: 'Erschöpft', color: 'text-red-400' },
  { value: 2, icon: Meh, label: 'Angespannt', color: 'text-orange-400' },
  { value: 3, icon: Meh, label: 'Neutral', color: 'text-yellow-400' },
  { value: 4, icon: Smile, label: 'Gut', color: 'text-emerald-400' },
  { value: 5, icon: Sparkles, label: 'Fantastisch', color: 'text-primary' },
];

// Sample data for visualization
const sampleEntries: MoodEntry[] = [
  { date: '2024-01-01', mood: 3, energy: 4, sleep: 3 },
  { date: '2024-01-02', mood: 4, energy: 4, sleep: 4 },
  { date: '2024-01-03', mood: 3, energy: 3, sleep: 3 },
  { date: '2024-01-04', mood: 5, energy: 5, sleep: 5 },
  { date: '2024-01-05', mood: 4, energy: 4, sleep: 4 },
  { date: '2024-01-06', mood: 4, energy: 5, sleep: 4 },
  { date: '2024-01-07', mood: 5, energy: 5, sleep: 5 },
  { date: '2024-01-08', mood: 3, energy: 3, sleep: 2 },
  { date: '2024-01-09', mood: 4, energy: 4, sleep: 4 },
  { date: '2024-01-10', mood: 5, energy: 5, sleep: 5 },
  { date: '2024-01-11', mood: 4, energy: 4, sleep: 4 },
  { date: '2024-01-12', mood: 5, energy: 5, sleep: 5 },
  { date: '2024-01-13', mood: 4, energy: 4, sleep: 4 },
  { date: '2024-01-14', mood: 5, energy: 5, sleep: 5 },
];

export const MoodTracker = ({ entries = sampleEntries, onAddEntry }: MoodTrackerProps) => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [showAddEntry, setShowAddEntry] = useState(false);

  const averageMood = entries.length > 0 
    ? entries.reduce((sum, e) => sum + e.mood, 0) / entries.length 
    : 0;

  const averageEnergy = entries.length > 0
    ? entries.filter(e => e.energy).reduce((sum, e) => sum + (e.energy || 0), 0) / entries.filter(e => e.energy).length
    : 0;

  const averageSleep = entries.length > 0
    ? entries.filter(e => e.sleep).reduce((sum, e) => sum + (e.sleep || 0), 0) / entries.filter(e => e.sleep).length
    : 0;

  const trend = entries.length >= 2 
    ? entries[entries.length - 1].mood - entries[0].mood 
    : 0;

  const getMoodColor = (mood: number) => {
    if (mood >= 4.5) return 'bg-primary/20 border-primary';
    if (mood >= 3.5) return 'bg-emerald-500/20 border-emerald-500';
    if (mood >= 2.5) return 'bg-yellow-500/20 border-yellow-500';
    if (mood >= 1.5) return 'bg-orange-500/20 border-orange-500';
    return 'bg-red-500/20 border-red-500';
  };

  const handleAddEntry = () => {
    if (selectedMood && onAddEntry) {
      onAddEntry({
        date: new Date().toISOString().split('T')[0],
        mood: selectedMood,
      });
      setSelectedMood(null);
      setShowAddEntry(false);
    }
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Heart className="w-5 h-5 text-primary" />
          Wellness-Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center p-4 rounded-xl bg-muted/30"
          >
            <div className="flex items-center justify-center gap-1 mb-1">
              <Smile className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Stimmung</span>
            </div>
            <p className="text-2xl font-bold text-primary">{averageMood.toFixed(1)}</p>
            <p className="text-xs text-muted-foreground">von 5</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center p-4 rounded-xl bg-muted/30"
          >
            <div className="flex items-center justify-center gap-1 mb-1">
              <Sun className="w-4 h-4 text-amber-500" />
              <span className="text-xs text-muted-foreground">Energie</span>
            </div>
            <p className="text-2xl font-bold text-amber-500">{averageEnergy.toFixed(1)}</p>
            <p className="text-xs text-muted-foreground">von 5</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center p-4 rounded-xl bg-muted/30"
          >
            <div className="flex items-center justify-center gap-1 mb-1">
              <Moon className="w-4 h-4 text-indigo-400" />
              <span className="text-xs text-muted-foreground">Schlaf</span>
            </div>
            <p className="text-2xl font-bold text-indigo-400">{averageSleep.toFixed(1)}</p>
            <p className="text-xs text-muted-foreground">von 5</p>
          </motion.div>
        </div>

        {/* Trend Indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`p-4 rounded-xl border ${
            trend > 0 ? 'bg-emerald-500/10 border-emerald-500/30' : 
            trend < 0 ? 'bg-red-500/10 border-red-500/30' : 
            'bg-muted/30 border-border/50'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Trend der letzten 14 Tage</p>
              <p className={`text-lg font-semibold ${
                trend > 0 ? 'text-emerald-500' : trend < 0 ? 'text-red-500' : 'text-muted-foreground'
              }`}>
                {trend > 0 ? 'Aufwärtstrend' : trend < 0 ? 'Abwärtstrend' : 'Stabil'}
              </p>
            </div>
            <TrendingUp className={`w-8 h-8 ${
              trend > 0 ? 'text-emerald-500' : trend < 0 ? 'text-red-500 rotate-180' : 'text-muted-foreground'
            }`} />
          </div>
        </motion.div>

        {/* Mood Graph */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Verlauf</p>
          <div className="flex items-end gap-1 h-24">
            {entries.slice(-14).map((entry, index) => (
              <motion.div
                key={entry.date}
                initial={{ height: 0 }}
                animate={{ height: `${(entry.mood / 5) * 100}%` }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className={`flex-1 rounded-t-sm ${getMoodColor(entry.mood)} border-t-2`}
                title={`${entry.date}: ${moodEmojis[entry.mood - 1]?.label}`}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Vor 14 Tagen</span>
            <span>Heute</span>
          </div>
        </div>

        {/* Quick Add Entry */}
        {showAddEntry ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-4 p-4 rounded-xl bg-muted/30"
          >
            <p className="text-sm font-medium">Wie fühlen Sie sich heute?</p>
            <div className="flex justify-between">
              {moodEmojis.map((mood) => {
                const Icon = mood.icon;
                return (
                  <motion.button
                    key={mood.value}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedMood(mood.value)}
                    className={`p-3 rounded-xl transition-all ${
                      selectedMood === mood.value 
                        ? 'bg-primary/20 ring-2 ring-primary' 
                        : 'bg-background hover:bg-muted'
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${mood.color}`} />
                    <p className="text-xs mt-1 text-muted-foreground">{mood.label}</p>
                  </motion.button>
                );
              })}
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddEntry(false)}
                className="flex-1"
              >
                Abbrechen
              </Button>
              <Button
                size="sm"
                onClick={handleAddEntry}
                disabled={!selectedMood}
                className="flex-1"
              >
                Speichern
              </Button>
            </div>
          </motion.div>
        ) : (
          <Button
            variant="outline"
            onClick={() => setShowAddEntry(true)}
            className="w-full"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Heutigen Eintrag hinzufügen
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodTracker;
