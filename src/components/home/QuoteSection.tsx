import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Quote } from "lucide-react";

export const QuoteSection = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
      {/* Ambient effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-copper/5 rounded-full blur-[180px] pointer-events-none" />
      
      <div className="container-narrow relative">
        <ScrollReveal>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="mb-8"
              animate={{ rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Quote size={48} className="text-copper/30 mx-auto" />
            </motion.div>
            
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-display text-foreground leading-relaxed mb-8">
              „Eine Stunde bei GentleHands hat mir mehr gegeben als ein ganzes Wochenende Wellness-Hotel."
            </blockquote>
            
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-copper/20 to-copper/10 flex items-center justify-center">
                <span className="text-copper font-display font-bold">CK</span>
              </div>
              <div className="text-left">
                <p className="font-display text-foreground">Christina K.</p>
                <p className="text-sm text-muted-foreground">Zürich, Stammkundin seit 2022</p>
              </div>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
};
