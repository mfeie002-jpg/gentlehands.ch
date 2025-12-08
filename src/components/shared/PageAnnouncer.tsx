/**
 * Screen reader announcer for page navigation
 * Improves accessibility by announcing route changes
 */
export const PageAnnouncer = () => {
  return (
    <div
      id="page-announcer"
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    />
  );
};
