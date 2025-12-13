import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Clock, Loader2, Mail } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

type VerificationStatus = "loading" | "success" | "already_verified" | "expired" | "error";

interface VerificationResult {
  status: VerificationStatus;
  bookingNumber?: string;
  customerName?: string;
  errorMessage?: string;
}

const BuchungVerifizieren = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [result, setResult] = useState<VerificationResult>({ status: "loading" });

  const token = searchParams.get("token");

  useEffect(() => {
    const verifyBooking = async () => {
      if (!token) {
        setResult({ 
          status: "error", 
          errorMessage: "Kein Verifizierungstoken gefunden" 
        });
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke("verify-booking", {
          body: { token }
        });

        if (error) {
          throw error;
        }

        if (data.success) {
          setResult({
            status: data.already_verified ? "already_verified" : "success",
            bookingNumber: data.booking_number,
            customerName: data.customer_name
          });
        } else if (data.expired) {
          setResult({ status: "expired", errorMessage: data.error });
        } else {
          setResult({ status: "error", errorMessage: data.error });
        }
      } catch (error: any) {
        console.error("Verification failed:", error);
        setResult({ 
          status: "error", 
          errorMessage: "Verifizierung fehlgeschlagen. Bitte versuchen Sie es später erneut." 
        });
      }
    };

    verifyBooking();
  }, [token]);

  const renderContent = () => {
    switch (result.status) {
      case "loading":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <Loader2 className="w-16 h-16 mx-auto mb-6 text-primary animate-spin" />
            <h1 className="text-2xl font-display mb-4">Verifizierung läuft...</h1>
            <p className="text-muted-foreground">Bitte warten Sie einen Moment.</p>
          </motion.div>
        );

      case "success":
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
            >
              <CheckCircle className="w-20 h-20 mx-auto mb-6 text-green-500" />
            </motion.div>
            <h1 className="text-3xl font-display mb-4">Buchung bestätigt!</h1>
            <p className="text-lg text-muted-foreground mb-2">
              Vielen Dank, {result.customerName}!
            </p>
            <p className="text-muted-foreground mb-8">
              Ihre Buchung <span className="font-mono bg-muted px-2 py-1 rounded">{result.bookingNumber}</span> wurde erfolgreich bestätigt.
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Wir werden Ihre Anfrage bearbeiten und Sie in Kürze kontaktieren, um Ihren Termin zu bestätigen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate("/buchung/bestaetigung?booking=" + result.bookingNumber)}>
                Buchungsdetails ansehen
              </Button>
              <Button variant="outline" onClick={() => navigate("/")}>
                Zur Startseite
              </Button>
            </div>
          </motion.div>
        );

      case "already_verified":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <CheckCircle className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h1 className="text-2xl font-display mb-4">Bereits bestätigt</h1>
            <p className="text-muted-foreground mb-2">
              Diese Buchung wurde bereits verifiziert.
            </p>
            <p className="text-muted-foreground mb-8">
              Buchungsnummer: <span className="font-mono bg-muted px-2 py-1 rounded">{result.bookingNumber}</span>
            </p>
            <Button onClick={() => navigate("/")}>
              Zur Startseite
            </Button>
          </motion.div>
        );

      case "expired":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <Clock className="w-16 h-16 mx-auto mb-6 text-amber-500" />
            <h1 className="text-2xl font-display mb-4">Link abgelaufen</h1>
            <p className="text-muted-foreground mb-8">
              Der Verifizierungslink ist leider abgelaufen. Bitte kontaktieren Sie uns, 
              um Ihre Buchung zu bestätigen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate("/kontakt")}>
                <Mail className="w-4 h-4 mr-2" />
                Kontakt aufnehmen
              </Button>
              <Button variant="outline" onClick={() => navigate("/buchung")}>
                Neue Buchung erstellen
              </Button>
            </div>
          </motion.div>
        );

      case "error":
      default:
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <XCircle className="w-16 h-16 mx-auto mb-6 text-destructive" />
            <h1 className="text-2xl font-display mb-4">Verifizierung fehlgeschlagen</h1>
            <p className="text-muted-foreground mb-8">
              {result.errorMessage || "Der Verifizierungslink ist ungültig oder abgelaufen."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate("/kontakt")}>
                Kontakt aufnehmen
              </Button>
              <Button variant="outline" onClick={() => navigate("/buchung")}>
                Neue Buchung erstellen
              </Button>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Buchung verifizieren | GentleHands</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <section className="min-h-[70vh] flex items-center justify-center py-20">
        <div className="container max-w-lg">
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-lg">
            {renderContent()}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BuchungVerifizieren;
