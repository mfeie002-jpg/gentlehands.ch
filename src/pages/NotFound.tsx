import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <Layout>
      <section className="min-h-[70vh] flex items-center justify-center">
        <div className="container-narrow text-center py-20">
          <h1 className="text-8xl font-display text-copper mb-4">404</h1>
          <h2 className="text-2xl text-foreground mb-4">Seite nicht gefunden</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Die von Ihnen gesuchte Seite existiert leider nicht oder wurde
            verschoben.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button variant="copper" asChild>
              <Link to="/">
                <Home size={16} />
                Zur Startseite
              </Link>
            </Button>
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft size={16} />
              Zurück
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
