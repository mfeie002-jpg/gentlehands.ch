import { motion } from "framer-motion";
import { Clock, CheckCircle } from "lucide-react";

interface BookingEstimatedTimeProps {
  currentStep: number;
  totalSteps: number;
}

export const BookingEstimatedTime = ({ currentStep, totalSteps }: BookingEstimatedTimeProps) => {
  // Estimate ~30 seconds per step
  const remainingSteps = totalSteps - currentStep;
  const estimatedMinutes = Math.ceil(remainingSteps * 0.5);
  
  if (currentStep >= totalSteps) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-2 text-green-600 text-sm"
      >
        <CheckCircle size={14} />
        <span>Buchung abgeschlossen!</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-2 text-muted-foreground text-sm"
    >
      <Clock size={14} className="text-copper" />
      <span>
        Noch ca. {estimatedMinutes === 0 ? "< 1" : estimatedMinutes} Min. bis zur Bestätigung
      </span>
    </motion.div>
  );
};
