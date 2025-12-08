import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Heart, CheckCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const permissions = [
  "Zeit nur für sich selbst zu nehmen",
  "Sich berühren und verwöhnen zu lassen",
  "Loszulassen ohne Schuldgefühle",
  "Den Kopf einmal wirklich auszuschalten",
  "Sich verletzlich zeigen zu dürfen",
  "Einfach nur zu sein – ohne zu funktionieren",
];

export const SelfCarePermissionSection = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-secondary/20 via-background to-secondary/10 relative overflow-hidden">
      {/* Warm ambient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-500/3 via-transparent to-copper/3 pointer-events-none" />

      <div className="container-narrow relative">
        <ScrollReveal className="text-center">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-copper/10 border border-copper/20 mb-8"
            whileHover={{ scale: 1.02 }}
          >
            <Heart size={16} className="text-copper" />
            <span className="text-copper text-sm font-medium">Ein Reminder für Sie</span>
          </motion.div>

          <h2 className="text-foreground text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight">
            Hiermit erhalten Sie die <span className="text-gradient-copper">Erlaubnis</span>
          </h2>

          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-12">
            Falls Sie sie brauchen – von uns an Sie:
          </p>

          <div className="max-w-2xl mx-auto mb-12">
            <div className="grid gap-4">
              {permissions.map((permission, index) => (
                <motion.div
                  key={permission}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border hover:border-copper/30 transition-colors group"
                >
                  <motion.div
                    className="w-8 h-8 rounded-full bg-copper/10 flex items-center justify-center flex-shrink-0 group-hover:bg-copper/20 transition-colors"
                    whileHover={{ scale: 1.1 }}
                  >
                    <CheckCircle size={18} className="text-copper" />
                  </motion.div>
                  <span className="text-foreground text-left">{permission}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center gap-4"
          >
            <Button variant="copper" size="lg" asChild>
              <Link to="/buchung">
                <Sparkles size={18} className="mr-2" />
                Jetzt Auszeit buchen
              </Link>
            </Button>
            <p className="text-muted-foreground text-sm">
              Sie haben es sich verdient. Wirklich.
            </p>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
};
