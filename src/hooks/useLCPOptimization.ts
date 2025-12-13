import { useEffect } from 'react';

/**
 * Hook for preloading LCP (Largest Contentful Paint) critical images
 * This helps improve Core Web Vitals by ensuring hero images load ASAP
 */
export function useLCPOptimization(imageSrc: string | string[]) {
  useEffect(() => {
    const images = Array.isArray(imageSrc) ? imageSrc : [imageSrc];
    
    images.forEach((src) => {
      // Create preload link
      const existingLink = document.querySelector(`link[href="${src}"]`);
      if (!existingLink) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        link.fetchPriority = 'high';
        document.head.appendChild(link);
      }

      // Also preload the image in memory
      const img = new Image();
      img.fetchPriority = 'high';
      img.src = src;
    });
  }, [imageSrc]);
}

/**
 * Critical CSS to be inlined in the document head
 * These styles are essential for above-the-fold content
 */
export const criticalCSS = `
/* Critical layout styles */
html { scroll-behavior: smooth; }
body { margin: 0; font-family: 'DM Sans', system-ui, sans-serif; }

/* Hero section critical styles */
.hero-section {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

/* Prevent CLS from font loading */
.font-serif { font-family: 'Playfair Display', Georgia, serif; }
.font-sans { font-family: 'DM Sans', system-ui, sans-serif; }

/* Critical image container */
.hero-image-container {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/* Prevent layout shift for aspect ratios */
.aspect-video { aspect-ratio: 16/9; }
.aspect-square { aspect-ratio: 1/1; }

/* Header placeholder to prevent CLS */
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  height: 80px;
}

/* Loading skeleton */
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Critical button styles */
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.2s;
}
`;

/**
 * Inject critical CSS into document head
 */
export function injectCriticalCSS() {
  if (typeof window === 'undefined') return;
  
  const existingStyle = document.getElementById('critical-css');
  if (existingStyle) return;
  
  const style = document.createElement('style');
  style.id = 'critical-css';
  style.textContent = criticalCSS;
  document.head.insertBefore(style, document.head.firstChild);
}

/**
 * Resource hints for faster loading
 */
export function addResourceHints() {
  if (typeof window === 'undefined') return;
  
  const hints = [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
    { rel: 'dns-prefetch', href: 'https://hrindypsfxbiijxgtdmi.supabase.co' },
  ];
  
  hints.forEach(({ rel, href, crossOrigin }) => {
    const existing = document.querySelector(`link[rel="${rel}"][href="${href}"]`);
    if (existing) return;
    
    const link = document.createElement('link');
    link.rel = rel;
    link.href = href;
    if (crossOrigin) link.crossOrigin = crossOrigin;
    document.head.appendChild(link);
  });
}

/**
 * Initialize all performance optimizations
 */
export function initPerformanceOptimizations() {
  injectCriticalCSS();
  addResourceHints();
}
