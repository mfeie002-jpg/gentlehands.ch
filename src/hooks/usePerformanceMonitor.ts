import { useEffect, useCallback } from "react";

interface PerformanceMetrics {
  fcp: number | null;
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  ttfb: number | null;
}

/**
 * Hook to monitor Core Web Vitals and performance metrics
 * Useful for debugging and optimizing page performance
 */
export const usePerformanceMonitor = (enableLogging = false) => {
  const logMetric = useCallback((name: string, value: number) => {
    if (enableLogging && process.env.NODE_ENV === "development") {
      const rating = 
        name === "LCP" ? (value < 2500 ? "good" : value < 4000 ? "needs-improvement" : "poor") :
        name === "FID" ? (value < 100 ? "good" : value < 300 ? "needs-improvement" : "poor") :
        name === "CLS" ? (value < 0.1 ? "good" : value < 0.25 ? "needs-improvement" : "poor") :
        name === "FCP" ? (value < 1800 ? "good" : value < 3000 ? "needs-improvement" : "poor") :
        name === "TTFB" ? (value < 800 ? "good" : value < 1800 ? "needs-improvement" : "poor") :
        "unknown";
      
      console.log(
        `%c[Performance] ${name}: ${value.toFixed(2)}ms (${rating})`,
        `color: ${rating === "good" ? "#22c55e" : rating === "needs-improvement" ? "#eab308" : "#ef4444"}`
      );
    }
  }, [enableLogging]);

  useEffect(() => {
    if (typeof window === "undefined" || !("PerformanceObserver" in window)) {
      return;
    }

    // Largest Contentful Paint
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          logMetric("LCP", lastEntry.startTime);
        }
      });
      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
    } catch (e) {
      // LCP not supported
    }

    // First Input Delay
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if ("processingStart" in entry) {
            const fidEntry = entry as PerformanceEventTiming;
            logMetric("FID", fidEntry.processingStart - fidEntry.startTime);
          }
        });
      });
      fidObserver.observe({ type: "first-input", buffered: true });
    } catch (e) {
      // FID not supported
    }

    // Cumulative Layout Shift
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        logMetric("CLS", clsValue);
      });
      clsObserver.observe({ type: "layout-shift", buffered: true });
    } catch (e) {
      // CLS not supported
    }

    // First Contentful Paint
    try {
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fcpEntry = entries.find((entry) => entry.name === "first-contentful-paint");
        if (fcpEntry) {
          logMetric("FCP", fcpEntry.startTime);
        }
      });
      fcpObserver.observe({ type: "paint", buffered: true });
    } catch (e) {
      // FCP not supported
    }

    // Time to First Byte
    try {
      const navEntries = performance.getEntriesByType("navigation");
      if (navEntries.length > 0) {
        const navEntry = navEntries[0] as PerformanceNavigationTiming;
        logMetric("TTFB", navEntry.responseStart - navEntry.requestStart);
      }
    } catch (e) {
      // TTFB not supported
    }
  }, [logMetric]);
};

export default usePerformanceMonitor;
