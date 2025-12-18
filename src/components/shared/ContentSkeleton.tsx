import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => (
  <div className={cn("relative overflow-hidden bg-muted rounded", className)}>
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-background/50 to-transparent"
      initial={{ x: "-100%" }}
      animate={{ x: "100%" }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" as const }}
    />
  </div>
);

export const HeroSkeleton = () => (
  <div className="pt-32 pb-20 bg-gradient-to-b from-secondary/30 to-background">
    <div className="container-wide">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <Skeleton className="h-10 w-48 mx-auto rounded-full" />
        <Skeleton className="h-16 w-full max-w-2xl mx-auto" />
        <Skeleton className="h-8 w-3/4 mx-auto" />
        <div className="flex justify-center gap-4 pt-4">
          <Skeleton className="h-12 w-40 rounded-lg" />
          <Skeleton className="h-12 w-40 rounded-lg" />
        </div>
      </div>
    </div>
  </div>
);

export const CardGridSkeleton = ({ count = 6 }: { count?: number }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="space-y-4">
        <Skeleton className="aspect-[4/3] w-full rounded-xl" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    ))}
  </div>
);

export const TeamSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="text-center space-y-4">
        <Skeleton className="w-48 h-48 rounded-full mx-auto" />
        <Skeleton className="h-6 w-32 mx-auto" />
        <Skeleton className="h-4 w-24 mx-auto" />
        <Skeleton className="h-20 w-full" />
      </div>
    ))}
  </div>
);

export const FormSkeleton = () => (
  <div className="space-y-6 max-w-lg mx-auto">
    <div className="space-y-2">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-12 w-full rounded-lg" />
    </div>
    <div className="space-y-2">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-12 w-full rounded-lg" />
    </div>
    <div className="space-y-2">
      <Skeleton className="h-4 w-28" />
      <Skeleton className="h-32 w-full rounded-lg" />
    </div>
    <Skeleton className="h-12 w-full rounded-lg" />
  </div>
);

export const ContentSkeleton = () => (
  <div className="min-h-screen bg-background">
    <HeroSkeleton />
    <div className="container-wide py-16">
      <CardGridSkeleton />
    </div>
  </div>
);
