import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  TrendingUp,
  MessageSquare,
  Gift,
  Wallet,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardsProps {
  stats: {
    totalBookings: number;
    pendingBookings: number;
    confirmedBookings: number;
    totalRevenue: number;
    totalTestimonials: number;
    pendingTestimonials: number;
    totalGiftCards: number;
    giftCardValue: number;
    todayBookings: number;
    weekBookings: number;
    monthBookings: number;
  };
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const StatsCards = ({ stats }: StatsCardsProps) => {
  const cards = [
    {
      title: "Buchungen Total",
      value: stats.totalBookings,
      icon: Calendar,
      change: `+${stats.weekBookings} diese Woche`,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10"
    },
    {
      title: "Ausstehend",
      value: stats.pendingBookings,
      icon: Clock,
      change: "Warten auf Bestätigung",
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-500/10"
    },
    {
      title: "Bestätigt",
      value: stats.confirmedBookings,
      icon: CheckCircle2,
      change: `${stats.todayBookings} heute`,
      color: "from-emerald-500 to-green-500",
      bgColor: "bg-emerald-500/10"
    },
    {
      title: "Umsatz",
      value: `CHF ${stats.totalRevenue.toLocaleString()}`,
      icon: TrendingUp,
      change: "Bestätigte Buchungen",
      color: "from-violet-500 to-purple-500",
      bgColor: "bg-violet-500/10"
    },
    {
      title: "Testimonials",
      value: stats.totalTestimonials,
      icon: MessageSquare,
      change: `${stats.pendingTestimonials} ausstehend`,
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-500/10"
    },
    {
      title: "Gutscheine",
      value: stats.totalGiftCards,
      icon: Gift,
      change: `CHF ${stats.giftCardValue.toLocaleString()} Guthaben`,
      color: "from-teal-500 to-cyan-500",
      bgColor: "bg-teal-500/10"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          custom={index}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.02, y: -4 }}
          className="relative overflow-hidden rounded-2xl bg-card border border-border p-6 group"
        >
          {/* Gradient Background */}
          <div className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br",
            card.color
          )} style={{ opacity: 0.05 }} />

          {/* Icon */}
          <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4", card.bgColor)}>
            <card.icon className={cn("w-6 h-6 bg-gradient-to-br bg-clip-text", card.color)} 
              style={{ color: 'transparent', backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }} />
          </div>

          {/* Content */}
          <p className="text-sm text-muted-foreground mb-1">{card.title}</p>
          <p className="text-3xl font-bold font-playfair mb-2">
            {typeof card.value === 'number' ? card.value.toLocaleString() : card.value}
          </p>
          <p className="text-xs text-muted-foreground">{card.change}</p>

          {/* Decorative Element */}
          <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-gradient-to-br opacity-10 blur-2xl" 
            style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }} />
        </motion.div>
      ))}
    </div>
  );
};
