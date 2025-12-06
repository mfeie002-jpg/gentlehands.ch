import { motion } from "framer-motion";
import { Calendar, Star, ChevronRight } from "lucide-react";

const sessions = [
  {
    date: "15. November 2024",
    massage: "Entspannungsmassage",
    therapist: "Anna",
    theme: "Zen Garden",
    rating: 5,
  },
  {
    date: "28. Oktober 2024",
    massage: "Deep Release",
    therapist: "Sophie",
    theme: "Alpine Stille",
    rating: 5,
  },
  {
    date: "10. Oktober 2024",
    massage: "Stress Reset",
    therapist: "Anna",
    theme: "Ozean & Palmen",
    rating: 4,
  },
];

export const RecentSessions = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-lg text-foreground">Letzte Besuche</h3>
        <button className="text-sm text-copper hover:underline">Alle ansehen</button>
      </div>
      
      <div className="space-y-4">
        {sessions.map((session, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-copper/10 flex items-center justify-center">
                <Calendar size={18} className="text-copper" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">{session.massage}</p>
                <p className="text-xs text-muted-foreground">
                  {session.date} • {session.therapist} • {session.theme}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(session.rating)].map((_, i) => (
                  <Star key={i} size={12} className="text-copper fill-copper" />
                ))}
              </div>
              <ChevronRight size={16} className="text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
