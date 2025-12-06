import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock, Sparkles, ArrowRight } from "lucide-react";

export const BookingReminderBanner = () => {
  return (
    <motion.section 
      className="py-6 bg-gradient-to-r from-copper/10 via-copper/5 to-copper/10 border-y border-copper/20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="container-wide">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-copper/20 flex items-center justify-center">
              <Clock size={18} className="text-copper" />
            </div>
            <div>
              <p className="text-foreground font-medium">Limitierte Termine diese Woche</p>
              <p className="text-muted-foreground text-sm">Sichern Sie sich Ihren Wunschtermin</p>
            </div>
          </div>
          
          <Button variant="copper" size="lg" asChild>
            <Link to="/buchung" className="flex items-center gap-2">
              <Sparkles size={16} />
              Jetzt buchen
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </motion.section>
  );
};
