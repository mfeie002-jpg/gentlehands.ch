import { Logo } from "@/components/shared/Logo";

/** Reduzierter Header: nur Logo, keine Hauptnavigation. */
export const LpHeader = () => (
  <header className="w-full border-b border-copper/15 bg-cream/90 backdrop-blur-sm">
    <div className="mx-auto flex max-w-3xl items-center justify-center px-4 py-4">
      <Logo size="sm" />
    </div>
  </header>
);
