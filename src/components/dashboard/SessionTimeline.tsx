import { motion } from "framer-motion";
import { Calendar, Clock, User, MapPin, Star, Sparkles, Heart } from "lucide-react";

interface Session {
  id: string;
  date: string;
  time: string;
  massage: string;
  therapist: string;
  theme: string;
  duration: string;
  rating?: number;
  notes?: string;
  moodBefore?: string;
  moodAfter?: string;
}

interface SessionTimelineProps {
  sessions: Session[];
}

export const SessionTimeline = ({ sessions }: SessionTimelineProps) => {
  const getMoodEmoji = (mood?: string) => {
    switch (mood) {
      case "sehr_gut": return "😊";
      case "gut": return "🙂";
      case "neutral": return "😐";
      case "angespannt": return "😣";
      case "sehr_angespannt": return "😰";
      default: return "•";
    }
  };

  const getThemeColor = (theme: string) => {
    switch (theme.toLowerCase()) {
      case "ozean": return "from-blue-500/20 to-cyan-500/20 border-blue-500/30";
      case "alpine": return "from-emerald-500/20 to-green-500/20 border-emerald-500/30";
      case "zen": return "from-amber-500/20 to-yellow-500/20 border-amber-500/30";
      case "urban": return "from-slate-500/20 to-gray-500/20 border-slate-500/30";
      case "dark": return "from-purple-500/20 to-indigo-500/20 border-purple-500/30";
      default: return "from-copper/20 to-copper-light/20 border-copper/30";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border/50 rounded-2xl p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-copper/20 to-copper-light/20 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-copper" />
        </div>
        <div>
          <h3 className="font-display text-xl text-foreground">Ihre Wellness-Reise</h3>
          <p className="text-sm text-muted-foreground">{sessions.length} Behandlungen</p>
        </div>
      </div>

      {sessions.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground">Noch keine Behandlungen vorhanden.</p>
          <p className="text-sm text-muted-foreground/70 mt-1">Buchen Sie Ihre erste Massage!</p>
        </div>
      ) : (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-copper via-copper/50 to-transparent" />

          <div className="space-y-6">
            {sessions.map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-16"
              >
                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                  className="absolute left-4 top-4 w-5 h-5 rounded-full bg-card border-2 border-copper flex items-center justify-center"
                >
                  <div className="w-2 h-2 rounded-full bg-copper" />
                </motion.div>

                {/* Session card */}
                <div className={`p-4 rounded-xl bg-gradient-to-br ${getThemeColor(session.theme)} border backdrop-blur-sm`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-foreground">{session.massage}</h4>
                      <p className="text-sm text-muted-foreground">{session.theme} Erlebnis</p>
                    </div>
                    {session.rating && (
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i < session.rating! ? "text-copper fill-copper" : "text-muted-foreground/30"}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar size={14} className="text-copper" />
                      <span>{session.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock size={14} className="text-copper" />
                      <span>{session.time} • {session.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <User size={14} className="text-copper" />
                      <span>{session.therapist}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin size={14} className="text-copper" />
                      <span>{session.theme}</span>
                    </div>
                  </div>

                  {/* Mood transformation */}
                  {(session.moodBefore || session.moodAfter) && (
                    <div className="flex items-center gap-3 pt-3 border-t border-border/30">
                      <span className="text-xs text-muted-foreground">Stimmung:</span>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getMoodEmoji(session.moodBefore)}</span>
                        <span className="text-muted-foreground">→</span>
                        <span className="text-lg">{getMoodEmoji(session.moodAfter)}</span>
                      </div>
                    </div>
                  )}

                  {session.notes && (
                    <p className="text-sm text-muted-foreground/80 italic mt-3 pt-3 border-t border-border/30">
                      "{session.notes}"
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};
