import { memo } from "react";

/**
 * Accessibility skip links for keyboard navigation
 * Allows users to skip to main content or navigation
 */
export const SkipLinks = memo(() => {
  return (
    <div className="sr-only focus-within:not-sr-only">
      <a
        href="#main-content"
        className="fixed top-4 left-4 z-[100] bg-copper text-accent-foreground px-6 py-3 rounded-lg font-medium shadow-lg transform -translate-y-full focus:translate-y-0 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-copper-light focus:ring-offset-2"
        tabIndex={0}
      >
        Zum Hauptinhalt springen
      </a>
      <a
        href="#footer"
        className="fixed top-4 left-64 z-[100] bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium shadow-lg transform -translate-y-full focus:translate-y-0 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        tabIndex={0}
      >
        Zum Footer springen
      </a>
    </div>
  );
});

SkipLinks.displayName = "SkipLinks";
