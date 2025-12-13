/**
 * Performance optimization utilities for Core Web Vitals
 */

/**
 * Preload critical resources
 */
export function preloadCriticalResources(resources: Array<{
  href: string;
  as: 'image' | 'script' | 'style' | 'font';
  type?: string;
  crossOrigin?: 'anonymous' | 'use-credentials';
}>) {
  resources.forEach(({ href, as, type, crossOrigin }) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    if (type) link.type = type;
    if (crossOrigin) link.crossOrigin = crossOrigin;
    document.head.appendChild(link);
  });
}

/**
 * Defer non-critical JavaScript
 */
export function deferNonCriticalJS(callback: () => void) {
  if ('requestIdleCallback' in window) {
    (window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(callback);
  } else {
    setTimeout(callback, 200);
  }
}

/**
 * Optimize image loading with native lazy loading support check
 */
export function supportsNativeLazyLoading(): boolean {
  return 'loading' in HTMLImageElement.prototype;
}

/**
 * Create intersection observer for lazy loading
 */
export function createLazyLoadObserver(
  callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver | null {
  if (!('IntersectionObserver' in window)) {
    return null;
  }

  const defaultOptions: IntersectionObserverInit = {
    rootMargin: '50px 0px',
    threshold: 0.01,
    ...options
  };

  return new IntersectionObserver((entries) => {
    entries.forEach(callback);
  }, defaultOptions);
}

/**
 * Resource hints for external domains
 */
export function addResourceHints(domains: string[]) {
  domains.forEach(domain => {
    // DNS prefetch
    const dnsPrefetch = document.createElement('link');
    dnsPrefetch.rel = 'dns-prefetch';
    dnsPrefetch.href = domain;
    document.head.appendChild(dnsPrefetch);

    // Preconnect
    const preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = domain;
    preconnect.crossOrigin = 'anonymous';
    document.head.appendChild(preconnect);
  });
}

/**
 * Measure and report Core Web Vitals
 */
export interface WebVitalsMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

export function measureWebVitals(onReport: (metric: WebVitalsMetric) => void) {
  if (!('PerformanceObserver' in window)) return;

  // LCP
  try {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as PerformanceEntry & { startTime: number };
      const value = lastEntry.startTime;
      onReport({
        name: 'LCP',
        value,
        rating: value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor'
      });
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch {}

  // FID
  try {
    const fidObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry: PerformanceEntry & { processingStart: number; startTime: number }) => {
        const value = entry.processingStart - entry.startTime;
        onReport({
          name: 'FID',
          value,
          rating: value <= 100 ? 'good' : value <= 300 ? 'needs-improvement' : 'poor'
        });
      });
    });
    fidObserver.observe({ type: 'first-input', buffered: true });
  } catch {}

  // CLS
  try {
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry: PerformanceEntry & { hadRecentInput: boolean; value: number }) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          onReport({
            name: 'CLS',
            value: clsValue,
            rating: clsValue <= 0.1 ? 'good' : clsValue <= 0.25 ? 'needs-improvement' : 'poor'
          });
        }
      });
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });
  } catch {}
}

/**
 * Optimize font loading
 */
export function optimizeFontLoading() {
  if ('fonts' in document) {
    // Mark fonts as optional for initial render
    document.fonts.ready.then(() => {
      document.documentElement.classList.add('fonts-loaded');
    });
  }
}

/**
 * Prevent layout shifts from images
 */
export function getAspectRatioPadding(width: number, height: number): string {
  return `${(height / width) * 100}%`;
}

/**
 * Debounce function for scroll handlers
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return function executedFunction(...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle function for frequent events
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
