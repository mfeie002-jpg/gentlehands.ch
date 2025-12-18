import { useMemo, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/shared/SEOHead";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { loginSchema, signupSchema } from "@/lib/validations";
import { cn } from "@/lib/utils";

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const pageCopy = useMemo(
    () =>
      isLogin
        ? {
            title: "Anmelden",
            heading: "Anmelden",
            sub: "Zugriff auf Ihr Dashboard, Buchungen und Favoriten.",
            primaryCta: "Anmelden",
            toggleText: "Noch kein Konto?",
            toggleCta: "Registrieren",
          }
        : {
            title: "Registrieren",
            heading: "Konto erstellen",
            sub: "Erstellen Sie ein Konto für exklusive Vorteile bei GentleHands.",
            primaryCta: "Konto erstellen",
            toggleText: "Bereits registriert?",
            toggleCta: "Anmelden",
          },
    [isLogin]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const schema = isLogin ? loginSchema : signupSchema;
    const result = schema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        if (error) throw error;

        toast({
          title: "Willkommen zurück!",
          description: "Sie wurden erfolgreich angemeldet.",
        });
        navigate("/dashboard");
      } else {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
            },
            emailRedirectTo: `${window.location.origin}/dashboard`,
          },
        });

        if (error) throw error;

        toast({
          title: "Konto erstellt!",
          description: "Bitte bestätigen Sie Ihre E-Mail-Adresse.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Fehler",
        description: error.message || "Ein Fehler ist aufgetreten.",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  return (
    <Layout>
      <SEOHead
        title={`${pageCopy.title} | GentleHands Zürich`}
        description="Anmelden oder registrieren bei GentleHands Zürich – Dashboard, Buchungen und persönliche Vorteile."
        canonical="/login"
        noIndex={true}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: pageCopy.title,
          description:
            "Anmelden oder registrieren bei GentleHands Zürich – Dashboard, Buchungen und persönliche Vorteile.",
          url: "https://gentlehands.ch/login",
        }}
      />

      <main className="min-h-screen pt-24 pb-16 flex items-center bg-muted/20">
        <section className="w-full">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <motion.header
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="inline-flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl border border-border bg-card shadow-sm flex items-center justify-center">
                    <span className="font-playfair text-lg text-foreground">GH</span>
                    <span className="sr-only">GentleHands</span>
                  </div>
                  <div className="text-left">
                    <p className="font-playfair text-xl text-foreground leading-none">GentleHands</p>
                    <p className="text-sm text-muted-foreground leading-none mt-1">Zürich</p>
                  </div>
                </div>

                <h1 className="mt-8 text-3xl font-playfair font-semibold text-foreground">
                  {pageCopy.heading}
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">{pageCopy.sub}</p>
              </motion.header>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 }}
                className="mt-8 rounded-2xl border border-border bg-card shadow-md"
              >
                <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
                  {!isLogin && (
                    <div className="space-y-2">
                      <label htmlFor="fullName" className="text-sm font-medium">
                        Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="Ihr vollständiger Name"
                          className={cn(
                            "pl-9",
                            errors.fullName &&
                              "border-destructive focus-visible:ring-destructive/30"
                          )}
                          aria-invalid={!!errors.fullName}
                        />
                      </div>
                      {errors.fullName && (
                        <p className="text-sm text-destructive">{errors.fullName}</p>
                      )}
                    </div>
                  )}

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      E-Mail
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ihre@email.ch"
                        className={cn(
                          "pl-9",
                          errors.email && "border-destructive focus-visible:ring-destructive/30"
                        )}
                        aria-invalid={!!errors.email}
                        autoComplete="email"
                      />
                    </div>
                    {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium">
                      Passwort
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="••••••••"
                        className={cn(
                          "pl-9 pr-11",
                          errors.password &&
                            "border-destructive focus-visible:ring-destructive/30"
                        )}
                        aria-invalid={!!errors.password}
                        autoComplete={isLogin ? "current-password" : "new-password"}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-2 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        aria-label={showPassword ? "Passwort verbergen" : "Passwort anzeigen"}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-destructive">{errors.password}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    {isLogin ? (
                      <button
                        type="button"
                        onClick={() =>
                          toast({
                            title: "Passwort zurücksetzen",
                            description:
                              "Bitte kontaktieren Sie uns unter kontakt@gentlehands.ch",
                          })
                        }
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        Passwort vergessen?
                      </button>
                    ) : (
                      <span className="text-sm text-muted-foreground">&nbsp;</span>
                    )}

                    <button
                      type="button"
                      onClick={() => setIsLogin((v) => !v)}
                      className="text-sm font-medium text-foreground hover:underline"
                    >
                      {pageCopy.toggleCta}
                    </button>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "…" : pageCopy.primaryCta}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    {pageCopy.toggleText}{" "}
                    <button
                      type="button"
                      onClick={() => setIsLogin((v) => !v)}
                      className="font-medium text-foreground hover:underline"
                    >
                      {pageCopy.toggleCta}
                    </button>
                  </p>
                </form>

                <footer className="border-t border-border px-6 sm:px-8 py-4 text-center text-xs text-muted-foreground">
                  Mit der Anmeldung akzeptieren Sie unsere{" "}
                  <Link to="/rechtliches" className="text-foreground hover:underline">
                    AGB
                  </Link>
                  {" "}und{" "}
                  <Link to="/rechtliches" className="text-foreground hover:underline">
                    Datenschutzerklärung
                  </Link>
                  .
                </footer>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Login;

