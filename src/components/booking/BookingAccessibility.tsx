import { useEffect } from "react";

interface BookingAccessibilityProps {
  currentStep: number;
  stepTitle: string;
}

export const BookingAccessibility = ({ currentStep, stepTitle }: BookingAccessibilityProps) => {
  useEffect(() => {
    // Announce step change to screen readers
    const announcement = document.getElementById("booking-announcer");
    if (announcement) {
      announcement.textContent = `Schritt ${currentStep}: ${stepTitle}`;
    }
  }, [currentStep, stepTitle]);

  return (
    <>
      {/* Skip to main content link */}
      <a
        href="#booking-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-background focus:px-4 focus:py-2 focus:rounded-lg focus:border focus:border-copper"
      >
        Zum Buchungsinhalt springen
      </a>
      
      {/* Live region for announcements */}
      <div
        id="booking-announcer"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />
    </>
  );
};
