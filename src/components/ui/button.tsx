import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { triggerHaptic } from "@/hooks/useHapticFeedback";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 ease-smooth-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 touch-manipulation active:scale-[0.97] select-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-petrol-light shadow-sm hover:shadow-petrol",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-border bg-transparent hover:bg-secondary hover:text-secondary-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-sand-dark",
        ghost: "hover:bg-secondary hover:text-secondary-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // GentleHands Custom Variants
        copper: "bg-copper text-accent-foreground hover:bg-copper-dark shadow-copper hover:shadow-lg focus-visible:ring-copper-light",
        "copper-outline": "border-2 border-copper text-copper hover:bg-copper hover:text-accent-foreground",
        petrol: "bg-primary text-primary-foreground hover:bg-petrol-dark shadow-petrol hover:shadow-lg",
        "petrol-outline": "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",
        hero: "bg-copper text-accent-foreground hover:bg-copper-dark shadow-copper hover:shadow-lg text-base font-medium px-6 sm:px-8 py-3 sm:py-4",
        "hero-secondary": "bg-card/80 backdrop-blur-sm border border-border text-foreground hover:bg-card hover:border-copper/30 text-base font-medium px-6 sm:px-8 py-3 sm:py-4",
        nav: "text-foreground hover:text-primary font-normal",
        // Premium variants with enhanced visuals
        premium: "relative bg-gradient-to-r from-copper to-copper-light text-accent-foreground shadow-copper hover:shadow-copper-lg overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700",
        "glass": "backdrop-blur-md bg-card/60 border border-border/50 text-foreground hover:bg-card/80 hover:border-copper/30",
        "glow": "bg-copper text-accent-foreground shadow-glow-copper hover:shadow-copper-lg",
        // Loading state variant
        loading: "bg-secondary text-secondary-foreground cursor-wait",
      },
      size: {
        default: "h-11 px-5 sm:px-6 py-2.5",
        sm: "h-10 rounded-md px-3 sm:px-4 text-xs sm:text-sm",
        lg: "h-11 sm:h-12 rounded-lg px-6 sm:px-8 text-sm sm:text-base",
        xl: "h-12 sm:h-14 rounded-xl px-8 sm:px-10 text-base sm:text-lg",
        icon: "h-10 w-10 sm:h-11 sm:w-11 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  haptic?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, haptic = true, onClick, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (haptic) {
        triggerHaptic('light');
      }
      onClick?.(e);
    };
    
    return (
      <Comp 
        className={cn(buttonVariants({ variant, size, className }))} 
        ref={ref} 
        onClick={handleClick}
        {...props} 
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
