import { motion } from "framer-motion";
import { Users, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { de } from "date-fns/locale";

interface RecentCustomersProps {
  bookings: any[];
}

export const RecentCustomers = ({ bookings }: RecentCustomersProps) => {
  const customerMap = new Map<string, any>();
  
  bookings
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .forEach(booking => {
      if (!customerMap.has(booking.customer_email)) {
        customerMap.set(booking.customer_email, {
          name: booking.customer_name,
          email: booking.customer_email,
          lastBooking: booking.created_at,
          massage: booking.massage
        });
      }
    });

  const recentCustomers = Array.from(customerMap.values()).slice(0, 5);

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          Neueste Kunden
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentCustomers.length > 0 ? (
          recentCustomers.map((customer, index) => (
            <motion.div
              key={customer.email}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-sm">{customer.name}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <Mail className="w-3 h-3" />
                    <span className="truncate max-w-[120px]">{customer.email}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(customer.lastBooking), { addSuffix: true, locale: de })}
                  </p>
                  <p className="text-xs text-primary mt-1">{customer.massage}</p>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-4 text-muted-foreground text-sm">
            Keine Kunden vorhanden
          </div>
        )}
      </CardContent>
    </Card>
  );
};
