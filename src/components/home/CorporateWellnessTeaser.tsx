import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase, Users, Calendar, ChevronRight } from "lucide-react";

export const CorporateWellnessTeaser = () => {
  return (
    <section className="py-12 bg-petrol text-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-petrol-dark/50 via-transparent to-petrol-dark/50" />
      
      <div className="container-wide relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <ScrollReveal direction="left" className="lg:w-2/3">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-background/10 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-copper" />
              </div>
              <div>
                <span className="text-copper text-xs font-medium uppercase tracking-wider">Für Unternehmen</span>
                <h3 className="text-xl font-display text-background">Corporate Wellness</h3>
              </div>
            </div>
            <p className="text-background/80 text-lg mb-4 max-w-xl">
              Steigern Sie das Wohlbefinden und die Produktivität Ihres Teams mit 
              exklusiven Wellness-Paketen für Unternehmen.
            </p>
            <div className="flex flex-wrap gap-4">
              {[
                { icon: Users, label: "Team-Events" },
                { icon: Calendar, label: "Regelmässige Sessions" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-background/70 text-sm">
                  <item.icon size={14} className="text-copper" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <Button variant="outline" size="lg" asChild className="border-background/30 text-background hover:bg-background/10 hover:border-background/50">
              <Link to="/business" className="flex items-center gap-2">
                Mehr erfahren
                <ChevronRight size={16} />
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
