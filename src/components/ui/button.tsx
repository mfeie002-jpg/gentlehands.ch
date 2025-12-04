import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
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
        copper: "bg-copper text-accent-foreground hover:bg-copper-dark shadow-copper hover:shadow-lg",
        "copper-outline": "border-2 border-copper text-copper hover:bg-copper hover:text-accent-foreground",
        petrol: "bg-primary text-primary-foreground hover:bg-petrol-dark shadow-petrol hover:shadow-lg",
        "petrol-outline": "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",
        hero: "bg-copper text-accent-foreground hover:bg-copper-dark shadow-copper hover:shadow-lg text-base font-medium px-8 py-4",
        "hero-secondary": "bg-card/80 backdrop-blur-sm border border-border text-foreground hover:bg-card hover:border-copper/30 text-base font-medium px-8 py-4",
        nav: "text-foreground hover:text-primary font-normal",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 rounded-md px-4",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10",
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
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
