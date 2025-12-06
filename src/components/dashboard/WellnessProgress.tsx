import { motion } from "framer-motion";
import { TrendingUp, Calendar, Heart, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const goals = [
  { label: "Monatliche Massagen", current: 2, target: 4, icon: Calendar },
  { label: "Stresslevel-Reduktion", current: 65, target: 100, icon: Heart },
  { label: "Wellness-Score", current: 78, target: 100, icon: TrendingUp },
];

export const WellnessProgress = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-xl p-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <Target size={20} className="text-copper" />
        <h3 className="font-serif text-lg text-foreground">Ihre Wellness-Ziele</h3>
      </div>
      
      <div className="space-y-6">
        {goals.map((goal, index) => (
          <div key={goal.label}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <goal.icon size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">{goal.label}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {goal.current}/{goal.target}
              </span>
            </div>
            <Progress 
              value={(goal.current / goal.target) * 100} 
              className="h-2"
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
};
