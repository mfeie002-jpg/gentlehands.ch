import { motion } from "framer-motion";
import { ArrowRight, Calendar, Gift, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";

const quickLinks = [
  {
    icon: Calendar,
    title: "Termin buchen",
    description: "Jetzt Ihr Erlebnis reservieren",
    link: "/buchung",
  },
  {
    icon: Gift,
    title: "Gutscheine",
    description: "Das perfekte Geschenk",
    link: "/gutscheine",
  },
  {
    icon: Users,
    title: "Team kennenlernen",
    description: "Unsere Therapeut:innen",
    link: "/team",
  },
  {
    icon: MapPin,
    title: "Standort",
    description: "So finden Sie uns",
    link: "/kontakt",
  },
];

export const FAQQuickLinks = () => {
  return (
    <section className="py-12 bg-secondary/30">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={item.link}
                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-copper/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-copper/10 flex items-center justify-center group-hover:bg-copper/20 transition-colors">
                  <item.icon size={24} className="text-copper" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <ArrowRight size={18} className="text-muted-foreground group-hover:text-copper group-hover:translate-x-1 transition-all" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
