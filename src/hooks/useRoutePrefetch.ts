import { useCallback } from "react";

// Map routes to their lazy import functions
const routeImports: Record<string, () => Promise<unknown>> = {
  "/erlebnisse": () => import("@/pages/Erlebnisse"),
  "/massagen": () => import("@/pages/Massagen"),
  "/team": () => import("@/pages/Team"),
  "/buchung": () => import("@/pages/Buchung"),
  "/gutscheine": () => import("@/pages/Gutscheine"),
  "/preise": () => import("@/pages/Preise"),
  "/kontakt": () => import("@/pages/Kontakt"),
  "/faq": () => import("@/pages/FAQ"),
  "/quiz": () => import("@/pages/Quiz"),
  "/membership": () => import("@/pages/Membership"),
  "/galerie": () => import("@/pages/Galerie"),
  "/vorbereitung": () => import("@/pages/Vorbereitung"),
  "/ueber-uns": () => import("@/pages/UeberUns"),
  "/erfahrungen": () => import("@/pages/Erfahrungen"),
  "/login": () => import("@/pages/Login"),
  "/dashboard": () => import("@/pages/Dashboard"),
};

// Track prefetched routes to avoid duplicate requests
const prefetchedRoutes = new Set<string>();

export const useRoutePrefetch = () => {
  const prefetchRoute = useCallback((path: string) => {
    // Normalize path
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    
    // Skip if already prefetched or no import function
    if (prefetchedRoutes.has(normalizedPath) || !routeImports[normalizedPath]) {
      return;
    }

    // Mark as prefetched immediately to prevent race conditions
    prefetchedRoutes.add(normalizedPath);

    // Use requestIdleCallback for non-blocking prefetch
    if ("requestIdleCallback" in window) {
      (window as Window).requestIdleCallback(() => {
        routeImports[normalizedPath]?.();
      });
    } else {
      // Fallback for Safari
      setTimeout(() => {
        routeImports[normalizedPath]?.();
      }, 100);
    }
  }, []);

  const prefetchOnHover = useCallback(
    (path: string) => ({
      onMouseEnter: () => prefetchRoute(path),
      onFocus: () => prefetchRoute(path),
      onTouchStart: () => prefetchRoute(path),
    }),
    [prefetchRoute]
  );

  return { prefetchRoute, prefetchOnHover };
};

// Prefetch multiple routes at once (useful for navigation menus)
export const prefetchRoutes = (paths: string[]) => {
  paths.forEach((path) => {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    
    if (prefetchedRoutes.has(normalizedPath) || !routeImports[normalizedPath]) {
      return;
    }

    prefetchedRoutes.add(normalizedPath);

    if ("requestIdleCallback" in window) {
      (window as Window).requestIdleCallback(() => {
        routeImports[normalizedPath]?.();
      });
    } else {
      setTimeout(() => {
        routeImports[normalizedPath]?.();
      }, 100);
    }
  });
};
