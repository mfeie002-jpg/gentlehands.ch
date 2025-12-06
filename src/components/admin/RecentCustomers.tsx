import { motion } from "framer-motion";
import { Users, Mail, Calendar, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { de } from "date-fns/locale";

interface Customer {
  name: string;
  email: string;
  phone: string;
  lastBooking: string;
  totalBookings: number;
}

export const RecentCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      const { data } = await supabase
        .from('bookings')
        .select('customer_name, customer_email, customer_phone, created_at')
        .order('created_at', { ascending: false })
        .limit(50);

      if (data) {
        // Group by email to get unique customers
        const customerMap: Record<string, Customer> = {};
        
        data.forEach(booking => {
          const email = booking.customer_email;
          if (!customerMap[email]) {
            customerMap[email] = {
              name: booking.customer_name,
              email: booking.customer_email,
              phone: booking.customer_phone,
              lastBooking: booking.created_at,
              totalBookings: 1
            };
          } else {
            customerMap[email].totalBookings++;
            if (new Date(booking.created_at) > new Date(customerMap[email].lastBooking)) {
              customerMap[email].lastBooking = booking.created_at;
            }
          }
        });

        const sorted = Object.values(customerMap)
          .sort((a, b) => new Date(b.lastBooking).getTime() - new Date(a.lastBooking).getTime())
          .slice(0, 5);

        setCustomers(sorted);
      }
      setIsLoading(false);
    };

    fetchCustomers();
  }, []);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 animate-pulse">
        <div className="h-6 w-40 bg-muted rounded mb-6" />
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-muted" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 bg-muted rounded" />
                <div className="h-3 w-48 bg-muted rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border bg-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Users className="w-5 h-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold">Letzte Kunden</h3>
        </div>
      </div>

      {customers.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Noch keine Kunden</p>
        </div>
      ) : (
        <div className="space-y-4">
          {customers.map((customer, index) => (
            <motion.div
              key={customer.email}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors group"
            >
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                  {getInitials(customer.name)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium truncate">{customer.name}</p>
                  {customer.totalBookings > 1 && (
                    <span className="text-xs px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">
                      {customer.totalBookings}x
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground truncate">{customer.email}</p>
              </div>

              <div className="hidden group-hover:flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Mail className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Phone className="w-4 h-4" />
                </Button>
              </div>

              <div className="text-right group-hover:hidden">
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(customer.lastBooking), { 
                    addSuffix: true, 
                    locale: de 
                  })}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};
