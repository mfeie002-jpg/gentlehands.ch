import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Import critical hero images
import heroMassageBack from "@/assets/massage-hands-back.jpg";
import spaReception from "@/assets/spa-reception-hero.jpg";
import teamAnna from "@/assets/team-anna.jpg";
import experienceZen from "@/assets/experience-zen.jpg";
import giftCardPresentation from "@/assets/gift-card-presentation.jpg";
import membershipVip from "@/assets/membership-vip.jpg";
import quizConcept from "@/assets/quiz-concept.jpg";
import preparationScene from "@/assets/preparation-scene.jpg";

// Route-based critical images mapping
const routeCriticalImages: Record<string, string[]> = {
  "/": [heroMassageBack],
  "/erlebnisse": [experienceZen],
  "/massagen": [heroMassageBack],
  "/team": [teamAnna],
  "/gutscheine": [giftCardPresentation],
  "/membership": [membershipVip],
  "/quiz": [quizConcept],
  "/vorbereitung": [preparationScene],
  "/buchung": [spaReception],
  "/kontakt": [spaReception],
};

// Images to preload on initial load (most critical)
const globalCriticalImages = [heroMassageBack];

export const CriticalImagePreloader = () => {
  const location = useLocation();

  // Preload global critical images on mount
  useEffect(() => {
    globalCriticalImages.forEach((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      link.fetchPriority = "high";
      
      // Avoid duplicates
      if (!document.head.querySelector(`link[href="${src}"]`)) {
        document.head.appendChild(link);
      }
    });
  }, []);

  // Preload route-specific images on navigation
  useEffect(() => {
    const currentPath = location.pathname;
    const imagesToPreload = routeCriticalImages[currentPath] || [];

    imagesToPreload.forEach((src) => {
      // Use Image constructor for immediate preloading
      const img = new Image();
      img.fetchPriority = "high";
      img.src = src;
    });

    // Prefetch likely next routes
    const prefetchRoutes = getPrefetchRoutes(currentPath);
    prefetchRoutes.forEach((route) => {
      const images = routeCriticalImages[route] || [];
      images.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    });
  }, [location.pathname]);

  return null;
};

// Determine which routes to prefetch based on current route
const getPrefetchRoutes = (currentPath: string): string[] => {
  switch (currentPath) {
    case "/":
      return ["/erlebnisse", "/buchung", "/massagen"];
    case "/erlebnisse":
      return ["/buchung", "/massagen"];
    case "/massagen":
      return ["/buchung", "/team"];
    case "/team":
      return ["/buchung"];
    default:
      return ["/buchung"];
  }
};
