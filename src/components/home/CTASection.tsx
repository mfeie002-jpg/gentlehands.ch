import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Gift } from "lucide-react";
import { AnimatedGradient } from "@/components/shared/AnimatedGradient";

export const CTASection = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <AnimatedGradient />
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 border border-copper/20 rounded-full" />
      <div className="absolute bottom-10 right-10 w-48 h-48 border border-copper/10 rounded-full" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <span className="text-copper uppercase tracking-[0.3em] text-sm font-medium">
            Bereit für Entspannung?
          </span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-foreground mt-6 mb-8 leading-tight">
            Ihr Moment der <br />
            <span className="text-copper">Tiefenentspannung</span> wartet
          </h2>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Gönnen Sie sich eine Auszeit vom Alltag. Begrenzte Verfügbarkeit – 
            reservieren Sie jetzt Ihren persönlichen Termin.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button asChild size="xl" className="group">
                <Link to="/buchung">
                  <Calendar className="w-5 h-5 mr-2" />
                  Termin reservieren
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button asChild variant="outline" size="xl" className="group border-copper/30 hover:border-copper hover:bg-copper/5">
                <Link to="/gutscheine">
                  <Gift className="w-5 h-5 mr-2" />
                  Gutschein verschenken
                </Link>
              </Button>
            </motion.div>
          </div>
          
          <p className="text-sm text-muted-foreground mt-8">
            Aktuell limitierte Verfügbarkeit • Persönliche Beratung möglich
          </p>
        </motion.div>
      </div>
    </section>
  );
};
