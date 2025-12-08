import { memo, useId, forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface AccessibleInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  hideLabel?: boolean;
}

/**
 * Accessible input component with proper ARIA attributes
 * Includes label, error state, and hint text
 */
export const AccessibleInput = memo(forwardRef<HTMLInputElement, AccessibleInputProps>(({
  label,
  error,
  hint,
  required = false,
  hideLabel = false,
  className,
  id: providedId,
  ...props
}, ref) => {
  const generatedId = useId();
  const id = providedId || generatedId;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  
  const describedBy = [
    error && errorId,
    hint && hintId,
  ].filter(Boolean).join(" ") || undefined;

  return (
    <div className="space-y-1.5">
      <label 
        htmlFor={id}
        className={cn(
          "block text-sm font-medium text-foreground",
          hideLabel && "sr-only"
        )}
      >
        {label}
        {required && (
          <span className="text-destructive ml-1" aria-hidden="true">*</span>
        )}
      </label>
      
      <input
        ref={ref}
        id={id}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        className={cn(
          "flex h-11 w-full rounded-lg border bg-background px-4 py-2.5 text-sm transition-colors",
          "placeholder:text-muted-foreground",
          "focus:outline-none focus:ring-2 focus:ring-copper focus:ring-offset-1",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error 
            ? "border-destructive focus:ring-destructive" 
            : "border-input hover:border-copper/50",
          className
        )}
        {...props}
      />
      
      {hint && !error && (
        <p id={hintId} className="text-xs text-muted-foreground">
          {hint}
        </p>
      )}
      
      {error && (
        <p id={errorId} className="text-xs text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}));

AccessibleInput.displayName = "AccessibleInput";

/**
 * Accessible button with loading state
 */
interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
}

export const AccessibleButton = memo(forwardRef<HTMLButtonElement, AccessibleButtonProps>(({
  children,
  loading = false,
  loadingText = "Wird geladen...",
  disabled,
  className,
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      aria-busy={loading}
      className={cn(
        "relative inline-flex items-center justify-center",
        className
      )}
      {...props}
    >
      {loading && (
        <span className="sr-only">{loadingText}</span>
      )}
      <span className={cn(loading && "opacity-0")}>
        {children}
      </span>
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <svg 
            className="h-5 w-5 animate-spin" 
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        </span>
      )}
    </button>
  );
}));

AccessibleButton.displayName = "AccessibleButton";

/**
 * Visually hidden component for screen readers only
 */
export const VisuallyHidden = memo(({ children }: { children: React.ReactNode }) => (
  <span className="sr-only">{children}</span>
));

VisuallyHidden.displayName = "VisuallyHidden";

/**
 * Live region for announcing dynamic content changes
 */
interface LiveRegionProps {
  message: string;
  politeness?: "polite" | "assertive";
}

export const LiveRegion = memo(({ message, politeness = "polite" }: LiveRegionProps) => (
  <div
    role="status"
    aria-live={politeness}
    aria-atomic="true"
    className="sr-only"
  >
    {message}
  </div>
));

LiveRegion.displayName = "LiveRegion";
