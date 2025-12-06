import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Play, Volume2, Pause } from "lucide-react";
import { useState } from "react";
import heroImage from "@/assets/spa-reception-hero.jpg";

export const WelcomeVideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="section-padding bg-foreground text-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-petrol/20 via-transparent to-copper/10" />
      
      <div className="container-wide relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Video/Image Preview */}
          <ScrollReveal direction="left">
            <motion.div
              className="relative rounded-2xl overflow-hidden aspect-video cursor-pointer group"
              whileHover={{ scale: 1.02 }}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              <img
                src={heroImage}
                alt="GentleHands Studio Tour"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-foreground/40 group-hover:bg-foreground/30 transition-colors" />
              
              {/* Play Button */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
              >
                <div className="w-20 h-20 rounded-full bg-copper flex items-center justify-center shadow-copper-lg">
                  {isPlaying ? (
                    <Pause size={32} className="text-background" />
                  ) : (
                    <Play size={32} className="text-background ml-1" />
                  )}
                </div>
              </motion.div>

              {/* Duration Badge */}
              <div className="absolute bottom-4 right-4 bg-foreground/80 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2">
                <Volume2 size={14} className="text-copper" />
                <span className="text-background text-sm">2:34</span>
              </div>
            </motion.div>
          </ScrollReveal>

          {/* Content */}
          <ScrollReveal direction="right">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px bg-gradient-to-r from-copper to-transparent w-8" />
                <span className="text-copper font-medium tracking-[0.2em] uppercase text-xs">
                  Willkommen
                </span>
              </div>

              <h2 className="text-background text-3xl md:text-4xl mb-6">
                Erleben Sie einen <span className="text-copper">virtuellen Rundgang</span>
              </h2>

              <p className="text-background/80 text-lg mb-6 leading-relaxed">
                Bevor Sie uns besuchen, laden wir Sie ein, unsere Räumlichkeiten kennenzulernen. 
                Entdecken Sie die Atmosphäre, die auf Sie wartet.
              </p>

              <ul className="space-y-3 mb-8">
                {["Alle Themenräume im Überblick", "Empfangsbereich & Lounge", "Unsere Philosophie erklärt"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-background/70">
                    <div className="w-2 h-2 rounded-full bg-copper" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
