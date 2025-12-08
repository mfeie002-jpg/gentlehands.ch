import { useEffect } from "react";

/**
 * Preloads images in the background for faster rendering
 * @param imageSources - Array of image sources to preload
 */
export const useImagePreload = (imageSources: string[]) => {
  useEffect(() => {
    const preloadImages = imageSources.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });

    return () => {
      // Cleanup - cancel any pending loads
      preloadImages.forEach((img) => {
        img.src = "";
      });
    };
  }, [imageSources]);
};

/**
 * Preloads a single critical image with high priority
 * @param imageSrc - Image source to preload
 */
export const preloadCriticalImage = (imageSrc: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = imageSrc;
  });
};

/**
 * Creates a preload link element for an image
 * Used for adding to document head programmatically
 */
export const createPreloadLink = (imageSrc: string): HTMLLinkElement => {
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = imageSrc;
  link.fetchPriority = "high";
  return link;
};
