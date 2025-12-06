import { motion } from "framer-motion";
import { Sparkles, Sun, Moon, Cloud } from "lucide-react";

interface WelcomeCardProps {
  userName?: string;
}

export const WelcomeCard = ({ userName = "Gast" }: WelcomeCardProps) => {
  const hour = new Date().getHours();
  
  const getGreeting = () => {
    if (hour < 12) return { text: "Guten Morgen", icon: Sun };
    if (hour < 18) return { text: "Guten Tag", icon: Cloud };
    return { text: "Guten Abend", icon: Moon };
  };
  
  const greeting = getGreeting();
  const GreetingIcon = greeting.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-petrol/10 via-petrol/5 to-copper/10 border border-petrol/20 rounded-xl p-6"
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <GreetingIcon size={20} className="text-copper" />
            <span className="text-muted-foreground">{greeting.text}</span>
          </div>
          <h2 className="text-2xl font-serif text-foreground mb-2">
            Willkommen zurück, {userName}
          </h2>
          <p className="text-muted-foreground">
            Schön, dass Sie wieder da sind. Wie können wir Ihnen heute helfen?
          </p>
        </div>
        <div className="w-12 h-12 rounded-full bg-copper/20 flex items-center justify-center">
          <Sparkles size={24} className="text-copper" />
        </div>
      </div>
    </motion.div>
  );
};
