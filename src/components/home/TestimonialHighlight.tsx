import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Quote, Star } from "lucide-react";

export const TestimonialHighlight = () => {
  return (
    <section className="section-padding-sm bg-gradient-to-r from-petrol/5 via-background to-copper/5 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-copper/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-petrol/5 rounded-full blur-[100px]" />
      </div>

      <div className="container-narrow relative">
        <ScrollReveal>
          <motion.div
            className="text-center py-8"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            {/* Quote Icon */}
            <motion.div
              initial={{ rotate: -10, opacity: 0 }}
              whileInView={{ rotate: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <Quote size={48} className="text-copper/20 mx-auto" />
            </motion.div>

            {/* Quote */}
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-display text-foreground leading-relaxed mb-8">
              „Nach Jahren des Funktionierens habe ich bei GentleHands zum ersten Mal 
              wieder <span className="text-gradient-copper">gespürt, was Loslassen bedeutet</span>."
            </blockquote>

            {/* Author */}
            <div className="flex items-center justify-center gap-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-copper fill-copper" />
                ))}
              </div>
              <div className="h-4 w-px bg-border" />
              <p className="text-muted-foreground">
                <span className="text-foreground font-medium">Martina S.</span>, 51 Jahre
              </p>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
};
