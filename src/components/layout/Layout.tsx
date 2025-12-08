import { ReactNode, useCallback, useEffect, memo } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CustomCursor } from "@/components/shared/CustomCursor";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import { BackToTop } from "@/components/shared/BackToTop";
import { SmoothScrollProvider } from "@/components/shared/SmoothScroll";
import { PullToRefreshIndicator } from "@/components/shared/PullToRefreshIndicator";
import { SkipToContent } from "@/components/shared/SkipToContent";
import { PageAnnouncer } from "@/components/shared/PageAnnouncer";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { SkipLinks } from "@/components/shared/SkipLinks";
import { usePullToRefresh } from "@/hooks/usePullToRefresh";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = memo(({ children }: LayoutProps) => {
  const location = useLocation();
  
  // Performance monitoring (only logs in development)
  usePerformanceMonitor(process.env.NODE_ENV === "development");
  
  // Scroll to top on route change with smooth behavior for internal navigation
  useEffect(() => {
    // Use instant scroll for route changes to prevent janky animations
    window.scrollTo({ top: 0, behavior: "instant" });
    
    // Announce page change to screen readers
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.focus({ preventScroll: true });
    }
  }, [location.pathname]);

  const handleRefresh = useCallback(async () => {
    // Simulate refresh - in a real app this would refetch data
    await new Promise(resolve => setTimeout(resolve, 1000));
    window.location.reload();
  }, []);

  const { isPulling, isRefreshing, pullProgress } = usePullToRefresh({
    onRefresh: handleRefresh,
    threshold: 80,
  });

  return (
    <ErrorBoundary>
      <SmoothScrollProvider>
        <div className="min-h-screen flex flex-col">
          <SkipLinks />
          <SkipToContent />
          <PageAnnouncer />
          <PullToRefreshIndicator 
            isPulling={isPulling} 
            isRefreshing={isRefreshing} 
            progress={pullProgress} 
          />
          <CustomCursor />
          <ScrollProgress />
          <Header />
          <main 
            id="main-content" 
            className="flex-1 focus:outline-none" 
            role="main" 
            tabIndex={-1}
            aria-label="Hauptinhalt"
          >
            {children}
          </main>
          <Footer />
          <BackToTop />
        </div>
      </SmoothScrollProvider>
    </ErrorBoundary>
  );
});

Layout.displayName = "Layout";
