import { motion } from "framer-motion";
import { Award, Gift, Star, Sparkles, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LoyaltyRewardsProps {
  points: number;
  totalBookings: number;
}

const rewards = [
  { id: 1, name: "10% Rabatt", points: 100, icon: Gift, description: "Auf Ihre nächste Buchung" },
  { id: 2, name: "Gratis Aromatherapie", points: 250, icon: Sparkles, description: "Bei Ihrer nächsten Session" },
  { id: 3, name: "VIP Upgrade", points: 500, icon: Star, description: "Premium Erlebnis gratis" },
  { id: 4, name: "Gratis Massage", points: 1000, icon: Award, description: "60min Classic Massage" },
];

const tiers = [
  { name: "Bronze", minBookings: 0, color: "bg-amber-600" },
  { name: "Silber", minBookings: 5, color: "bg-gray-400" },
  { name: "Gold", minBookings: 15, color: "bg-amber-400" },
  { name: "Platin", minBookings: 30, color: "bg-gradient-to-r from-gray-300 to-gray-500" },
];

export const LoyaltyRewards = ({ points, totalBookings }: LoyaltyRewardsProps) => {
  const currentTier = tiers.reduce((acc, tier) => 
    totalBookings >= tier.minBookings ? tier : acc, tiers[0]);
  
  const nextTier = tiers.find(t => t.minBookings > totalBookings);
  const bookingsToNextTier = nextTier ? nextTier.minBookings - totalBookings : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Current Status */}
      <div className="glass rounded-2xl p-6 border border-border/50">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-display font-semibold text-foreground">Treueprogramm</h3>
            <p className="text-sm text-muted-foreground">Sammeln Sie Punkte bei jeder Buchung</p>
          </div>
          <div className={`px-4 py-2 rounded-full text-sm font-bold text-white ${currentTier.color}`}>
            {currentTier.name}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-copper/10 border border-copper/20">
            <p className="text-sm text-copper mb-1">Aktuelle Punkte</p>
            <p className="text-3xl font-bold text-foreground">{points}</p>
          </div>
          <div className="p-4 rounded-xl bg-petrol/10 border border-petrol/20">
            <p className="text-sm text-petrol mb-1">Erlebnisse gesamt</p>
            <p className="text-3xl font-bold text-foreground">{totalBookings}</p>
          </div>
        </div>

        {nextTier && (
          <div className="p-4 rounded-xl bg-muted/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Nächste Stufe: {nextTier.name}</span>
              <span className="text-sm font-medium text-foreground">
                Noch {bookingsToNextTier} Buchung{bookingsToNextTier !== 1 ? 'en' : ''}
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(totalBookings / nextTier.minBookings) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-copper rounded-full"
              />
            </div>
          </div>
        )}
      </div>

      {/* Available Rewards */}
      <div className="glass rounded-2xl p-6 border border-border/50">
        <h4 className="font-display font-semibold text-foreground mb-4">Verfügbare Prämien</h4>
        <div className="grid sm:grid-cols-2 gap-3">
          {rewards.map((reward) => {
            const canRedeem = points >= reward.points;
            const Icon = reward.icon;
            
            return (
              <div
                key={reward.id}
                className={`p-4 rounded-xl border transition-all ${
                  canRedeem 
                    ? 'bg-copper/5 border-copper/30 hover:border-copper/50' 
                    : 'bg-muted/30 border-border/50 opacity-60'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    canRedeem ? 'bg-copper/10' : 'bg-muted/50'
                  }`}>
                    {canRedeem ? (
                      <Icon className="w-5 h-5 text-copper" />
                    ) : (
                      <Lock className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{reward.name}</p>
                    <p className="text-xs text-muted-foreground">{reward.description}</p>
                    <p className={`text-sm mt-1 font-medium ${canRedeem ? 'text-copper' : 'text-muted-foreground'}`}>
                      {reward.points} Punkte
                    </p>
                  </div>
                </div>
                {canRedeem && (
                  <Button variant="copper" size="sm" className="w-full mt-3">
                    Einlösen
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Points History */}
      <div className="glass rounded-2xl p-6 border border-border/50">
        <h4 className="font-display font-semibold text-foreground mb-4">So sammeln Sie Punkte</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
            <span className="text-sm text-foreground">Pro Buchung</span>
            <span className="text-sm font-medium text-copper">+50 Punkte</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
            <span className="text-sm text-foreground">Bewertung abgeben</span>
            <span className="text-sm font-medium text-copper">+20 Punkte</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
            <span className="text-sm text-foreground">Freund:in empfehlen</span>
            <span className="text-sm font-medium text-copper">+100 Punkte</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
            <span className="text-sm text-foreground">Geburtstags-Bonus</span>
            <span className="text-sm font-medium text-copper">+50 Punkte</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
