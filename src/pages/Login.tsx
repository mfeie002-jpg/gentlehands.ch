import { useMemo, useState, useEffect } from "react";
import { SEOHead } from "@/components/shared/SEOHead";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Mail, Lock, Eye, EyeOff, User, AlertCircle, X, Loader2 } from "lucide-react";
import { loginSchema, signupSchema } from "@/lib/validations";
import { cn } from "@/lib/utils";

// Google Icon SVG
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

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
  const [googleLoading, setGoogleLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [authError, setAuthError] = useState<string | null>(null);

  // Google OAuth handler
  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setAuthError(null);
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}${redirect}`,
        },
      });
      
      if (error) throw error;
    } catch (error: any) {
      const message = getAuthErrorMessage(error);
      setAuthError(message);
      toast({
        title: "Google-Amäldig gscheiteret",
        description: message,
        variant: "destructive",
      });
      setGoogleLoading(false);
    }
  };

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
              disabled={loading || googleLoading}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                pageCopy.primaryCta
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-muted/40 px-3 text-muted-foreground">oder</span>
            </div>
          </div>

          {/* Google Login */}
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleLogin}
            disabled={loading || googleLoading}
            className="w-full h-12 font-medium text-base gap-3 bg-background hover:bg-muted/50"
          >
            {googleLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <GoogleIcon />
                Mit Google {isLogin ? "amälde" : "registriere"}
              </>
            )}
          </Button>

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
