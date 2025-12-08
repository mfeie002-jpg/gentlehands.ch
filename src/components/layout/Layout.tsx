import { ReactNode, useCallback, useEffect } from "react";
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
import { usePullToRefresh } from "@/hooks/usePullToRefresh";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
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
          <main id="main-content" className="flex-1" role="main" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <BackToTop />
        </div>
      </SmoothScrollProvider>
    </ErrorBoundary>
  );
};
