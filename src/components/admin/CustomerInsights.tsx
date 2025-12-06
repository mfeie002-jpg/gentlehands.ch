import { motion } from "framer-motion";
import { Users, TrendingUp, Heart, Clock, Star, Repeat } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CustomerInsightsProps {
  bookings: any[];
}

export const CustomerInsights = ({ bookings }: CustomerInsightsProps) => {
  // Calculate customer insights
  const customerMap = new Map<string, { count: number; lastVisit: string; email: string }>();
  
  bookings.forEach(booking => {
    const existing = customerMap.get(booking.customer_email);
    if (existing) {
      existing.count++;
      if (new Date(booking.appointment_date) > new Date(existing.lastVisit)) {
        existing.lastVisit = booking.appointment_date;
      }
    } else {
      customerMap.set(booking.customer_email, {
        count: 1,
        lastVisit: booking.appointment_date,
        email: booking.customer_email
      });
    }
  });

  const totalCustomers = customerMap.size;
  const returningCustomers = Array.from(customerMap.values()).filter(c => c.count > 1).length;
  const returnRate = totalCustomers > 0 ? Math.round((returningCustomers / totalCustomers) * 100) : 0;
  const avgBookingsPerCustomer = totalCustomers > 0 ? (bookings.length / totalCustomers).toFixed(1) : "0";

  const insights = [
    {
      icon: Users,
      label: "Unique Kunden",
      value: totalCustomers,
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      icon: Repeat,
      label: "Wiederkehrend",
      value: `${returnRate}%`,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    {
      icon: TrendingUp,
      label: "Ø Buchungen/Kunde",
      value: avgBookingsPerCustomer,
      color: "text-amber-500",
      bg: "bg-amber-500/10"
    },
    {
      icon: Star,
      label: "VIP Kunden",
      value: Array.from(customerMap.values()).filter(c => c.count >= 5).length,
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    }
  ];

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Heart className="w-5 h-5 text-rose-500" />
          Kunden-Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-xl ${insight.bg}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <insight.icon className={`w-4 h-4 ${insight.color}`} />
                <span className="text-xs text-muted-foreground">{insight.label}</span>
              </div>
              <p className={`text-2xl font-bold ${insight.color}`}>{insight.value}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Top Returning Customers */}
        <div className="mt-4 pt-4 border-t border-border/50">
          <p className="text-xs text-muted-foreground mb-3">Top wiederkehrende Kunden</p>
          <div className="space-y-2">
            {Array.from(customerMap.entries())
              .sort((a, b) => b[1].count - a[1].count)
              .slice(0, 3)
              .map(([email, data], index) => (
                <div key={email} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                      index === 0 ? 'bg-amber-500/20 text-amber-500' : 
                      index === 1 ? 'bg-slate-400/20 text-slate-400' : 
                      'bg-amber-700/20 text-amber-700'
                    }`}>
                      {index + 1}
                    </span>
                    <span className="truncate max-w-[140px]">{email}</span>
                  </div>
                  <span className="text-muted-foreground">{data.count} Buchungen</span>
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
