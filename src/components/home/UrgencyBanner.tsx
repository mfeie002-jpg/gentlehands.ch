import { motion } from "framer-motion";
import { AlertCircle, Calendar, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const UrgencyBanner = () => {
  return (
    <motion.section
      className="py-4 bg-copper/10 border-y border-copper/20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
    >
      <div className="container-wide">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <AlertCircle size={18} className="text-copper" />
            </motion.div>
            <span className="text-foreground text-sm">
              <span className="font-medium">Nur noch 3 Termine</span> diese Woche verfügbar
            </span>
          </div>
          <Button variant="copper" size="sm" asChild>
            <Link to="/buchung" className="flex items-center gap-2">
              <Sparkles size={14} />
              Jetzt sichern
            </Link>
          </Button>
        </div>
      </div>
    </motion.section>
  );
};
