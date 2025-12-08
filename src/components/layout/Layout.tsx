import { ReactNode, useCallback } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CustomCursor } from "@/components/shared/CustomCursor";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import { BackToTop } from "@/components/shared/BackToTop";
import { SmoothScrollProvider } from "@/components/shared/SmoothScroll";
import { PullToRefreshIndicator } from "@/components/shared/PullToRefreshIndicator";
import { usePullToRefresh } from "@/hooks/usePullToRefresh";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
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
    <SmoothScrollProvider>
      <div className="min-h-screen flex flex-col">
        <PullToRefreshIndicator 
          isPulling={isPulling} 
          isRefreshing={isRefreshing} 
          progress={pullProgress} 
        />
        <CustomCursor />
        <ScrollProgress />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <BackToTop />
      </div>
    </SmoothScrollProvider>
  );
};
