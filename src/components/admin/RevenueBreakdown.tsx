import { motion } from "framer-motion";
import { PieChart, DollarSign, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RevenueBreakdownProps {
  bookings: any[];
}

const massagePrices: Record<string, number> = {
  "Tiefenentspannung": 180,
  "Deep Release": 200,
  "Stress Reset": 150,
  "Signature Touch": 220,
  "Hot Stone": 190,
  "Aromatherapie": 170,
  "default": 160
};

const durationMultipliers: Record<string, number> = {
  "60": 1,
  "90": 1.4,
  "120": 1.8,
  "60 Min": 1,
  "90 Min": 1.4,
  "120 Min": 1.8,
  "default": 1
};

export const RevenueBreakdown = ({ bookings }: RevenueBreakdownProps) => {
  // Calculate revenue by massage type
  const revenueByMassage = new Map<string, number>();
  let totalRevenue = 0;

  bookings.forEach(booking => {
    if (booking.status === 'cancelled') return;
    
    const basePrice = massagePrices[booking.massage] || massagePrices.default;
    const multiplier = durationMultipliers[booking.duration] || durationMultipliers.default;
    const price = basePrice * multiplier;
    
    const existing = revenueByMassage.get(booking.massage) || 0;
    revenueByMassage.set(booking.massage, existing + price);
    totalRevenue += price;
  });

  const breakdown = Array.from(revenueByMassage.entries())
    .map(([massage, revenue]) => ({
      massage,
      revenue,
      percentage: totalRevenue > 0 ? Math.round((revenue / totalRevenue) * 100) : 0
    }))
    .sort((a, b) => b.revenue - a.revenue);

  const colors = [
    'bg-primary',
    'bg-emerald-500',
    'bg-amber-500',
    'bg-purple-500',
    'bg-blue-500',
    'bg-rose-500'
  ];

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <PieChart className="w-5 h-5 text-primary" />
          Umsatz nach Massage
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Total Revenue */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-4 rounded-xl bg-primary/5 border border-primary/10"
        >
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Gesamtumsatz (geschätzt)</span>
          </div>
          <p className="text-2xl font-bold">CHF {totalRevenue.toLocaleString()}</p>
        </motion.div>

        {/* Breakdown Chart */}
        <div className="mb-4">
          <div className="flex h-3 rounded-full overflow-hidden bg-muted/30">
            {breakdown.map((item, index) => (
              <motion.div
                key={item.massage}
                initial={{ width: 0 }}
                animate={{ width: `${item.percentage}%` }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`${colors[index % colors.length]}`}
                title={`${item.massage}: ${item.percentage}%`}
              />
            ))}
          </div>
        </div>

        {/* Breakdown List */}
        <div className="space-y-2">
          {breakdown.slice(0, 5).map((item, index) => (
            <motion.div
              key={item.massage}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between py-2 border-b border-border/30 last:border-0"
            >
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${colors[index % colors.length]}`} />
                <span className="text-sm">{item.massage}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">CHF {item.revenue.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{item.percentage}%</p>
              </div>
            </motion.div>
          ))}
        </div>

        {breakdown.length === 0 && (
          <div className="text-center py-4 text-muted-foreground text-sm">
            Keine Umsatzdaten verfügbar
          </div>
        )}
      </CardContent>
    </Card>
  );
};
