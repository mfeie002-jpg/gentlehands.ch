import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface TimelineItem {
  icon: LucideIcon;
  title: string;
  description: string;
  time?: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export const Timeline = ({ items }: TimelineProps) => {
  return (
    <div className="relative">
      {/* Line */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

      <div className="space-y-12 md:space-y-16">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative flex items-start gap-6 md:gap-12 ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* Content - Left on desktop */}
            <div className={`hidden md:block flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
              {index % 2 === 0 && (
                <>
                  {item.time && (
                    <span className="text-sm text-copper font-medium">{item.time}</span>
                  )}
                  <h3 className="font-display text-xl text-foreground mt-1 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </>
              )}
            </div>

            {/* Icon */}
            <div className="relative z-10 shrink-0">
              <div className="w-12 h-12 rounded-full bg-copper flex items-center justify-center shadow-copper">
                <item.icon size={24} className="text-accent-foreground" />
              </div>
            </div>

            {/* Content - Right on desktop */}
            <div className={`flex-1 ${index % 2 === 0 ? "md:opacity-0 md:pointer-events-none" : ""}`}>
              {item.time && (
                <span className="text-sm text-copper font-medium md:hidden">{item.time}</span>
              )}
              <span className={`text-sm text-copper font-medium hidden ${index % 2 === 1 ? "md:block" : ""}`}>
                {item.time}
              </span>
              <h3 className="font-display text-xl text-foreground mt-1 mb-2 md:hidden">
                {item.title}
              </h3>
              <h3 className={`font-display text-xl text-foreground mt-1 mb-2 hidden ${index % 2 === 1 ? "md:block" : ""}`}>
                {item.title}
              </h3>
              <p className="text-muted-foreground md:hidden">{item.description}</p>
              <p className={`text-muted-foreground hidden ${index % 2 === 1 ? "md:block" : ""}`}>
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
