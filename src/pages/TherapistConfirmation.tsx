import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/shared/SEOHead";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle, Mail, ArrowLeft } from "lucide-react";

const TherapistConfirmation = () => {
  return (
    <Layout>
      <SEOHead
        title="Bewerbung eingereicht | GentleHands"
        description="Ihre Bewerbung als Therapeut:in wurde erfolgreich eingereicht."
        noIndex
      />

      <div className="min-h-screen bg-gradient-to-b from-background to-sand/20 flex items-center justify-center py-12 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center"
          >
            <CheckCircle className="text-green-600" size={40} />
          </motion.div>

          <h1 className="font-display text-2xl sm:text-3xl text-foreground mb-4">
            Bewerbung eingereicht!
          </h1>
          
          <p className="text-muted-foreground mb-8">
            Vielen Dank für Ihr Interesse an GentleHands. Wir haben Ihre Bewerbung erhalten 
            und werden diese sorgfältig prüfen.
          </p>

          <div className="p-6 rounded-2xl bg-card border border-border mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Mail className="text-copper" size={24} />
              <h2 className="font-medium text-foreground">Nächste Schritte</h2>
            </div>
            <ol className="text-left text-sm text-muted-foreground space-y-3">
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-copper/10 text-copper flex items-center justify-center text-xs font-medium flex-shrink-0">1</span>
                <span>Wir prüfen Ihre Qualifikationen und Ihren Hintergrund.</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-copper/10 text-copper flex items-center justify-center text-xs font-medium flex-shrink-0">2</span>
                <span>Bei Interesse kontaktieren wir Sie für ein persönliches Gespräch.</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-copper/10 text-copper flex items-center justify-center text-xs font-medium flex-shrink-0">3</span>
                <span>Nach Freigabe erhalten Sie Zugang zu Ihrem Therapeuten-Portal.</span>
              </li>
            </ol>
          </div>

          <p className="text-sm text-muted-foreground mb-6">
            Die Bearbeitung dauert in der Regel 3-5 Werktage.
            Sie erhalten eine E-Mail-Benachrichtigung über das Ergebnis.
          </p>

          <Link to="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft size={16} />
              Zurück zur Startseite
            </Button>
          </Link>
        </motion.div>
      </div>
    </Layout>
  );
};

export default TherapistConfirmation;
