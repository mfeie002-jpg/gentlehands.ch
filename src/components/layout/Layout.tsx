import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CustomCursor } from "@/components/shared/CustomCursor";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import { BackToTop } from "@/components/shared/BackToTop";
import { SmoothScrollProvider } from "@/components/shared/SmoothScroll";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen flex flex-col">
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
