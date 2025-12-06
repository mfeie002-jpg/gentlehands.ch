import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Volume2, Droplets, Palette, Sparkles } from "lucide-react";

const rooms = [
  { name: "Ocean & Palmen", sound: "Wellen", scent: "Meersalz", mood: "Leichtigkeit", color: "bg-blue-500/20" },
  { name: "Alpine Stille", sound: "Bergbach", scent: "Zirbe", mood: "Erdung", color: "bg-green-500/20" },
  { name: "Deep Dark", sound: "Stille", scent: "Sandelholz", mood: "Tiefe", color: "bg-slate-800/30" },
  { name: "Zen Garden", sound: "Klangschalen", scent: "Bambus", mood: "Harmonie", color: "bg-amber-500/20" },
  { name: "Urban Loft", sound: "Ambient", scent: "Zedernholz", mood: "Klarheit", color: "bg-stone-500/20" },
];

export const RoomComparisonSection = () => {
  return (
    <section className="section-padding-sm bg-gradient-to-b from-secondary/10 to-background">
      <div className="container-wide">
        <ScrollReveal className="text-center mb-10">
          <h2 className="text-foreground text-2xl md:text-3xl mb-4">
            Finden Sie <span className="text-gradient-copper">Ihren</span> Raum
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Jeder Themenraum bietet ein einzigartiges Sinneserlebnis.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground text-sm font-medium">Raum</th>
                  <th className="text-center py-3 px-4 text-muted-foreground text-sm font-medium">
                    <div className="flex items-center justify-center gap-1">
                      <Volume2 size={14} />
                      <span>Sound</span>
                    </div>
                  </th>
                  <th className="text-center py-3 px-4 text-muted-foreground text-sm font-medium">
                    <div className="flex items-center justify-center gap-1">
                      <Droplets size={14} />
                      <span>Duft</span>
                    </div>
                  </th>
                  <th className="text-center py-3 px-4 text-muted-foreground text-sm font-medium">
                    <div className="flex items-center justify-center gap-1">
                      <Sparkles size={14} />
                      <span>Stimmung</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room, index) => (
                  <motion.tr
                    key={room.name}
                    className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${room.color}`} />
                        <span className="text-foreground font-medium">{room.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center text-muted-foreground text-sm">{room.sound}</td>
                    <td className="py-4 px-4 text-center text-muted-foreground text-sm">{room.scent}</td>
                    <td className="py-4 px-4 text-center">
                      <span className="text-copper text-sm font-medium">{room.mood}</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>

        <ScrollReveal className="text-center mt-8">
          <Button variant="outline" asChild className="border-copper/30 hover:border-copper">
            <Link to="/erlebnisse">Alle Räume im Detail</Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
};
