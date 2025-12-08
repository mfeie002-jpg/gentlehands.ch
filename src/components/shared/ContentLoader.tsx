import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

interface ContentLoaderProps {
  variant?: "card" | "list" | "hero" | "text";
  count?: number;
  className?: string;
}

/**
 * Reusable content loading skeleton component
 * Provides consistent loading states across the app
 */
export const ContentLoader = ({
  variant = "card",
  count = 1,
  className = "",
}: ContentLoaderProps) => {
  const items = Array.from({ length: count }, (_, i) => i);

  const renderCard = (index: number) => (
    <motion.div
      key={index}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.1 }}
      className="rounded-2xl border border-border/50 overflow-hidden"
    >
      <Skeleton className="aspect-[4/3] w-full" />
      <div className="p-6 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="pt-2">
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </motion.div>
  );

  const renderList = (index: number) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex items-center gap-4 p-4 rounded-xl border border-border/50"
    >
      <Skeleton className="h-12 w-12 rounded-full shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <Skeleton className="h-8 w-20" />
    </motion.div>
  );

  const renderHero = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 text-center py-12"
    >
      <Skeleton className="h-8 w-40 mx-auto rounded-full" />
      <Skeleton className="h-12 w-3/4 mx-auto" />
      <Skeleton className="h-12 w-1/2 mx-auto" />
      <Skeleton className="h-6 w-2/3 mx-auto" />
      <div className="flex gap-4 justify-center pt-4">
        <Skeleton className="h-12 w-40" />
        <Skeleton className="h-12 w-32" />
      </div>
    </motion.div>
  );

  const renderText = (index: number) => (
    <motion.div
      key={index}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.05 }}
      className="space-y-2"
    >
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-11/12" />
      <Skeleton className="h-4 w-4/5" />
    </motion.div>
  );

  return (
    <div className={className}>
      {variant === "hero" && renderHero()}
      {variant === "card" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(renderCard)}
        </div>
      )}
      {variant === "list" && (
        <div className="space-y-3">
          {items.map(renderList)}
        </div>
      )}
      {variant === "text" && (
        <div className="space-y-6">
          {items.map(renderText)}
        </div>
      )}
    </div>
  );
};
