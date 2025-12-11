import { motion } from "framer-motion";
import { Award, Gift, Star, Sparkles, Lock, TrendingUp, Calendar, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LoyaltyDashboardProps {
  points: number;
  totalBookings: number;
  memberSince?: string;
}

const rewards = [
  { id: 1, name: "10% Rabatt", points: 100, icon: Gift, description: "Auf Ihre nächste Buchung" },
  { id: 2, name: "Gratis Aromatherapie", points: 250, icon: Sparkles, description: "Bei Ihrer nächsten Session" },
  { id: 3, name: "VIP Upgrade", points: 500, icon: Star, description: "Premium Erlebnis gratis" },
  { id: 4, name: "Gratis Massage", points: 1000, icon: Award, description: "60min Classic Massage" },
];

const tiers = [
  { name: "Bronze", minBookings: 0, maxBookings: 4, color: "from-amber-700 to-amber-500", icon: "🥉" },
  { name: "Silber", minBookings: 5, maxBookings: 14, color: "from-gray-400 to-gray-300", icon: "🥈" },
  { name: "Gold", minBookings: 15, maxBookings: 29, color: "from-amber-500 to-amber-300", icon: "🥇" },
  { name: "Platin", minBookings: 30, maxBookings: Infinity, color: "from-gray-300 to-white", icon: "💎" },
];

const pointsHistory = [
  { action: "Buchung abgeschlossen", points: 50, date: "Heute" },
  { action: "Bewertung abgegeben", points: 20, date: "Gestern" },
  { action: "Freundin empfohlen", points: 100, date: "Letzte Woche" },
];

export const LoyaltyDashboard = ({ points, totalBookings, memberSince }: LoyaltyDashboardProps) => {
  const currentTier = tiers.reduce((acc, tier) => 
    totalBookings >= tier.minBookings && totalBookings <= tier.maxBookings ? tier : acc, tiers[0]);
  
  const nextTier = tiers.find(t => t.minBookings > totalBookings);
  const bookingsToNextTier = nextTier ? nextTier.minBookings - totalBookings : 0;
  const progressToNextTier = nextTier 
    ? ((totalBookings - currentTier.minBookings) / (nextTier.minBookings - currentTier.minBookings)) * 100
    : 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Hero Stats Card */}
      <div className="glass rounded-3xl p-8 border border-border/50 overflow-hidden relative">
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${currentTier.color} opacity-10`} />
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">{currentTier.icon}</span>
                <div className={`px-4 py-2 rounded-full text-sm font-bold text-foreground bg-gradient-to-r ${currentTier.color}`}>
                  {currentTier.name} Status
                </div>
              </div>
              <h3 className="font-display text-2xl font-semibold text-foreground">Willkommen zurück!</h3>
              {memberSince && (
                <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                  <Calendar className="w-4 h-4" />
                  Mitglied seit {memberSince}
                </p>
              )}
            </div>
            
            <div className="flex gap-6">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 rounded-2xl bg-copper/10 border border-copper/20"
              >
                <motion.p 
                  key={points}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="text-4xl font-bold text-copper"
                >
                  {points}
                </motion.p>
                <p className="text-sm text-muted-foreground">Punkte</p>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 rounded-2xl bg-petrol/10 border border-petrol/20"
              >
                <p className="text-4xl font-bold text-petrol">{totalBookings}</p>
                <p className="text-sm text-muted-foreground">Erlebnisse</p>
              </motion.div>
            </div>
          </div>

          {/* Progress to Next Tier */}
          {nextTier && (
            <div className="p-5 rounded-2xl bg-muted/30 border border-border/30">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-copper" />
                  <span className="text-sm font-medium text-foreground">Nächste Stufe: {nextTier.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Noch {bookingsToNextTier} Buchung{bookingsToNextTier !== 1 ? 'en' : ''}
                </span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressToNextTier}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className={`h-full bg-gradient-to-r ${nextTier.color} rounded-full relative`}
                >
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-white/30"
                  />
                </motion.div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>{currentTier.name}</span>
                <span>{nextTier.name}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Available Rewards */}
      <div className="glass rounded-3xl p-8 border border-border/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-copper/10 flex items-center justify-center">
            <Gift className="w-5 h-5 text-copper" />
          </div>
          <h4 className="font-display text-xl font-semibold text-foreground">Verfügbare Prämien</h4>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-4">
          {rewards.map((reward, index) => {
            const canRedeem = points >= reward.points;
            const Icon = reward.icon;
            const progress = Math.min((points / reward.points) * 100, 100);
            
            return (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: canRedeem ? 1.02 : 1 }}
                className={`relative p-5 rounded-2xl border transition-all overflow-hidden ${
                  canRedeem 
                    ? 'bg-copper/5 border-copper/30 hover:border-copper/50 cursor-pointer' 
                    : 'bg-muted/30 border-border/50'
                }`}
              >
                {/* Progress Background */}
                {!canRedeem && (
                  <div 
                    className="absolute inset-0 bg-copper/5 transition-all"
                    style={{ width: `${progress}%` }}
                  />
                )}
                
                <div className="relative z-10 flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    canRedeem ? 'bg-copper/20' : 'bg-muted/50'
                  }`}>
                    {canRedeem ? (
                      <Icon className="w-6 h-6 text-copper" />
                    ) : (
                      <Lock className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{reward.name}</p>
                    <p className="text-sm text-muted-foreground mb-2">{reward.description}</p>
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-medium ${canRedeem ? 'text-copper' : 'text-muted-foreground'}`}>
                        {reward.points} Punkte
                      </p>
                      {!canRedeem && (
                        <span className="text-xs text-muted-foreground">
                          Noch {reward.points - points} Punkte
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                {canRedeem && (
                  <Button variant="copper" size="sm" className="w-full mt-4">
                    Einlösen
                  </Button>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Points History & How to Earn */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="glass rounded-2xl p-6 border border-border/50">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-copper" />
            <h4 className="font-display font-semibold text-foreground">Letzte Aktivitäten</h4>
          </div>
          <div className="space-y-3">
            {pointsHistory.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-xl bg-muted/30"
              >
                <div>
                  <span className="text-sm font-medium text-foreground">{item.action}</span>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </div>
                <span className="text-sm font-bold text-copper">+{item.points}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* How to Earn */}
        <div className="glass rounded-2xl p-6 border border-border/50">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-copper" />
            <h4 className="font-display font-semibold text-foreground">So sammeln Sie Punkte</h4>
          </div>
          <div className="space-y-3">
            {[
              { action: "Pro Buchung", points: 50 },
              { action: "Bewertung abgeben", points: 20 },
              { action: "Freund:in empfehlen", points: 100 },
              { action: "Geburtstags-Bonus", points: 50 },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <span className="text-sm text-foreground">{item.action}</span>
                <span className="text-sm font-bold text-copper">+{item.points} Punkte</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
