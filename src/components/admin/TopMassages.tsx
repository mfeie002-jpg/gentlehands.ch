import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface TopMassagesProps {
  bookings: any[];
}

export const TopMassages = ({ bookings }: TopMassagesProps) => {
  const massageCounts = new Map<string, number>();
  bookings.forEach(booking => {
    const massage = booking.massage || 'Unbekannt';
    massageCounts.set(massage, (massageCounts.get(massage) || 0) + 1);
  });

  const sortedMassages = Array.from(massageCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const maxCount = sortedMassages[0]?.[1] || 1;

  const colors = ['bg-primary', 'bg-emerald-500', 'bg-amber-500', 'bg-purple-500', 'bg-blue-500'];

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          Top Massagen
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sortedMassages.length > 0 ? (
          sortedMassages.map(([massage, count], index) => {
            const percentage = (count / maxCount) * 100;
            return (
              <motion.div
                key={massage}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${colors[index]}`} />
                    <span className="text-sm font-medium truncate max-w-[150px]">{massage}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{count}x</span>
                </div>
                <Progress value={percentage} className="h-2" />
              </motion.div>
            );
          })
        ) : (
          <div className="text-center py-4 text-muted-foreground text-sm">
            Keine Daten verfügbar
          </div>
        )}
      </CardContent>
    </Card>
  );
};
