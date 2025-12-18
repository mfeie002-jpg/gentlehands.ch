import { useMemo, useState, useEffect } from "react";
import { SEOHead } from "@/components/shared/SEOHead";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Mail, Lock, Eye, EyeOff, User, AlertCircle, X } from "lucide-react";
import { loginSchema, signupSchema } from "@/lib/validations";
import { cn } from "@/lib/utils";

// Inline error component - minimalist style
const InlineError = ({ message, onDismiss }: { message: string; onDismiss?: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: -8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20"
  >
    <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
    <p className="text-sm text-destructive flex-1">{message}</p>
    {onDismiss && (
      <button onClick={onDismiss} className="text-destructive/60 hover:text-destructive">
        <X className="w-4 h-4" />
      </button>
    )}
  </motion.div>
);

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";
  
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [authError, setAuthError] = useState<string | null>(null);

  // Check if already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate(redirect, { replace: true });
      }
    };
    checkSession();
  }, [navigate, redirect]);

  const pageCopy = useMemo(
    () =>
      isLogin
        ? {
            title: "Amälde",
            heading: "Amälde",
            sub: "Zuegriff uf Ihres Dashboard und Ihre Buechige.",
            primaryCta: "Amälde",
            toggleText: "Nonig es Konto?",
            toggleCta: "Registriere",
          }
        : {
            title: "Registriere",
            heading: "Konto erstelle",
            sub: "Erstelled Sie es Konto für exklusive Vorteil bi GentleHands.",
            primaryCta: "Konto erstelle",
            toggleText: "Scho registriert?",
            toggleCta: "Amälde",
          },
    [isLogin]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setAuthError(null);

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
          title: "Willkommä zrugg!",
          description: "Sie sind erfolgriich aamäldet.",
        });
        navigate(redirect, { replace: true });
      } else {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: { full_name: formData.fullName },
            emailRedirectTo: `${window.location.origin}${redirect}`,
          },
        });

        if (error) throw error;

        toast({
          title: "Konto erstellt!",
          description: "Bitte bestätiged Sie Ihri E-Mail-Adrässe.",
        });
      }
    } catch (error: any) {
      const message = getAuthErrorMessage(error);
      setAuthError(message);
      toast({
        title: "Fehler",
        description: message,
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  // Translate common Supabase auth errors to Swiss German
  const getAuthErrorMessage = (error: any): string => {
    const code = error?.code || error?.message || "";
    
    if (code.includes("invalid_credentials") || code.includes("Invalid login")) {
      return "E-Mail oder Passwort isch falsch.";
    }
    if (code.includes("email_not_confirmed")) {
      return "Bitte bestätiged Sie zerscht Ihri E-Mail-Adrässe.";
    }
    if (code.includes("user_already_exists") || code.includes("already registered")) {
      return "Es git scho en Benutzer mit dere E-Mail.";
    }
    if (code.includes("weak_password")) {
      return "S Passwort muess mindestens 6 Zeiche ha.";
    }
    if (code.includes("rate_limit")) {
      return "Zu vill Versüech. Bitte warted Sie chli.";
    }
    
    return error?.message || "Es isch en Fehler passiert.";
  };

  return (
    <>
      <SEOHead
        title={`${pageCopy.title} | GentleHands Züri`}
        description="Amälde oder registriere bi GentleHands Züri."
        canonical="/login"
        noIndex={true}
      />

      <main className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-sm"
        >
          {/* Logo */}
          <header className="text-center mb-10">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <span className="font-playfair text-2xl font-bold text-primary-foreground">G</span>
              </div>
              <span className="font-playfair text-3xl font-semibold text-foreground tracking-tight">
                GentleHands
              </span>
            </Link>
          </header>

          {/* Auth Error Banner */}
          <AnimatePresence>
            {authError && (
              <div className="mb-6">
                <InlineError message={authError} onDismiss={() => setAuthError(null)} />
              </div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-1.5">
                <label htmlFor="fullName" className="sr-only">Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Ihr Name"
                    className={cn(
                      "pl-10 h-12 bg-background",
                      errors.fullName && "border-destructive focus-visible:ring-destructive/30"
                    )}
                    aria-invalid={!!errors.fullName}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-xs text-destructive pl-1">{errors.fullName}</p>
                )}
              </div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="email" className="sr-only">E-Mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="ihre@email.ch"
                  className={cn(
                    "pl-10 h-12 bg-background",
                    errors.email && "border-destructive focus-visible:ring-destructive/30"
                  )}
                  aria-invalid={!!errors.email}
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-destructive pl-1">{errors.email}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="sr-only">Passwort</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className={cn(
                    "pl-10 pr-12 h-12 bg-background",
                    errors.password && "border-destructive focus-visible:ring-destructive/30"
                  )}
                  aria-invalid={!!errors.password}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label={showPassword ? "Passwort verstecke" : "Passwort zeige"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-destructive pl-1">{errors.password}</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 font-medium text-base" 
              disabled={loading}
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-background border-t-transparent rounded-full"
                />
              ) : (
                pageCopy.primaryCta
              )}
            </Button>
          </form>

          {/* Toggle & Links */}
          <div className="mt-6 text-center space-y-3">
            <p className="text-sm text-muted-foreground">
              {pageCopy.toggleText}{" "}
              <button
                type="button"
                onClick={() => {
                  setIsLogin((v) => !v);
                  setErrors({});
                  setAuthError(null);
                }}
                className="font-medium text-foreground hover:underline underline-offset-4"
              >
                {pageCopy.toggleCta}
              </button>
            </p>

            {isLogin && (
              <button
                type="button"
                onClick={() =>
                  toast({
                    title: "Passwort zruggsetze",
                    description: "Bitte kontaktiere Sie ois under kontakt@gentlehands.ch",
                  })
                }
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Passwort vergässe?
              </button>
            )}
          </div>

          {/* Legal */}
          <footer className="mt-10 text-center text-xs text-muted-foreground">
            Mit em Amälde akzeptiered Sie oiseri{" "}
            <Link to="/rechtliches" className="underline underline-offset-2 hover:text-foreground">
              AGB
            </Link>
            {" "}und{" "}
            <Link to="/rechtliches" className="underline underline-offset-2 hover:text-foreground">
              Dateschutzerklärig
            </Link>
            .
          </footer>
        </motion.div>
      </main>
    </>
  );
};

export default Login;
