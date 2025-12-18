import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BookingLoadingSkeletonProps {
  type: "therapists" | "themes" | "massages" | "calendar";
}

export const BookingLoadingSkeleton = ({ type }: BookingLoadingSkeletonProps) => {
  const shimmer = "animate-pulse bg-gradient-to-r from-muted via-muted/50 to-muted";
  
  if (type === "therapists") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="p-4 rounded-xl border border-border"
          >
            <div className="flex items-start gap-4">
              <div className={cn("w-16 h-16 rounded-xl", shimmer)} />
              <div className="flex-1 space-y-2">
                <div className={cn("h-5 w-24 rounded", shimmer)} />
                <div className={cn("h-4 w-32 rounded", shimmer)} />
                <div className="flex gap-2">
                  <div className={cn("h-6 w-16 rounded-full", shimmer)} />
                  <div className={cn("h-6 w-20 rounded-full", shimmer)} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }
  
  if (type === "themes") {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className={cn("aspect-[4/3] rounded-xl", shimmer)}
          />
        ))}
      </div>
    );
  }
  
  if (type === "massages") {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className={cn("aspect-[4/3] rounded-xl", shimmer)}
          />
        ))}
      </div>
    );
  }
  
  if (type === "calendar") {
    return (
      <div className="space-y-4">
        <div className={cn("h-64 rounded-xl", shimmer)} />
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className={cn("h-10 w-16 rounded-lg", shimmer)} />
          ))}
        </div>
      </div>
    );
  }
  
  return null;
};
