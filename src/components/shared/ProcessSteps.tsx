import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface ProcessStepsProps {
  steps: Step[];
  variant?: "horizontal" | "vertical";
}

export const ProcessSteps = ({ steps, variant = "horizontal" }: ProcessStepsProps) => {
  if (variant === "vertical") {
    return (
      <div className="space-y-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex gap-6"
          >
            <div className="shrink-0 flex flex-col items-center">
              <div className="w-14 h-14 rounded-xl bg-copper/10 flex items-center justify-center">
                <step.icon size={28} className="text-copper" />
              </div>
              {index < steps.length - 1 && (
                <div className="w-px h-full bg-border mt-4" />
              )}
            </div>
            <div className="pb-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-medium text-copper uppercase tracking-wider">
                  Schritt {index + 1}
                </span>
              </div>
              <h3 className="font-display text-xl text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {steps.map((step, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative text-center"
        >
          {/* Connector */}
          {index < steps.length - 1 && (
            <div className="hidden lg:block absolute top-7 left-[60%] w-[80%] h-px bg-border" />
          )}

          <div className="relative z-10">
            <div className="w-14 h-14 mx-auto rounded-xl bg-copper/10 flex items-center justify-center mb-4">
              <step.icon size={28} className="text-copper" />
            </div>
            <span className="text-xs font-medium text-copper uppercase tracking-wider">
              Schritt {index + 1}
            </span>
            <h3 className="font-display text-lg text-foreground mt-2 mb-2">
              {step.title}
            </h3>
            <p className="text-muted-foreground text-sm">{step.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
