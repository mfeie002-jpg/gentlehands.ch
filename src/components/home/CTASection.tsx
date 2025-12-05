import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Gift, Sparkles } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Multi-layer gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sand via-background to-secondary/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-copper/5 via-transparent to-petrol/5" />
      
      {/* Animated gradient orbs */}
      <motion.div 
        className="absolute top-1/4 -left-32 w-96 h-96 bg-copper/10 rounded-full blur-[100px]"
        animate={{ 
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-petrol/10 rounded-full blur-[100px]"
        animate={{ 
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-40 h-40 border border-copper/10 rounded-full" />
      <div className="absolute top-20 left-20 w-24 h-24 border border-copper/20 rounded-full" />
      <div className="absolute bottom-10 right-10 w-56 h-56 border border-petrol/10 rounded-full" />
      <div className="absolute bottom-20 right-20 w-32 h-32 border border-petrol/15 rounded-full" />
      
      {/* Sparkle decorations */}
      <motion.div
        className="absolute top-1/4 right-1/4 text-copper/30"
        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        <Sparkles size={24} />
      </motion.div>
      <motion.div
        className="absolute bottom-1/3 left-1/3 text-petrol/30"
        animate={{ rotate: -360, scale: [1, 1.3, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
      >
        <Sparkles size={20} />
      </motion.div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div 
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-copper" />
            <span className="text-copper uppercase tracking-[0.3em] text-xs font-medium">
              Bereit für Entspannung?
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-copper" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-foreground mt-6 mb-4 leading-tight">
            Ihr Moment der
          </h2>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display mb-8 leading-tight">
            <span className="text-gradient-copper">Tiefenentspannung</span> wartet
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Gönnen Sie sich eine Auszeit vom Alltag. Begrenzte Verfügbarkeit – 
            reservieren Sie jetzt Ihren persönlichen Termin.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button asChild variant="copper" size="xl" className="group shadow-copper-lg min-w-[220px]">
                <Link to="/buchung">
                  <Calendar className="w-5 h-5 mr-2" />
                  Termin reservieren
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button asChild variant="outline" size="xl" className="group border-copper/30 hover:border-copper hover:bg-copper/5 min-w-[220px]">
                <Link to="/gutscheine">
                  <Gift className="w-5 h-5 mr-2 text-copper" />
                  Gutschein verschenken
                </Link>
              </Button>
            </motion.div>
          </div>
          
          <motion.p 
            className="text-sm text-muted-foreground mt-10 flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <span className="w-2 h-2 bg-copper/60 rounded-full animate-pulse" />
            Aktuell limitierte Verfügbarkeit
            <span className="mx-2 text-border">•</span>
            Persönliche Beratung möglich
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};
