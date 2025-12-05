import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight } from "lucide-react";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      <Helmet>
        <title>{isLogin ? "Anmelden" : "Registrieren"} | GentleHands Zürich</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <section className="min-h-screen pt-24 pb-16 flex items-center bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
        {/* Ambient effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-copper/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-petrol/10 rounded-full blur-[150px]" />

        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-copper/10 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-copper" />
              </div>
              <h1 className="text-3xl font-display font-bold text-foreground mb-2">
                {isLogin ? "Willkommen zurück" : "Konto erstellen"}
              </h1>
              <p className="text-muted-foreground">
                {isLogin 
                  ? "Melden Sie sich an, um Ihre Buchungen zu verwalten"
                  : "Erstellen Sie ein Konto für exklusive Vorteile"
                }
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-2xl p-8 border border-border/50"
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-copper focus:ring-2 focus:ring-copper/20 outline-none"
                      placeholder="Ihr vollständiger Name"
                      required={!isLogin}
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">E-Mail</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-muted border border-border focus:border-copper focus:ring-2 focus:ring-copper/20 outline-none"
                      placeholder="ihre@email.ch"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Passwort</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-12 pr-12 py-3 rounded-xl bg-muted border border-border focus:border-copper focus:ring-2 focus:ring-copper/20 outline-none"
                      placeholder="••••••••"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {isLogin && (
                  <div className="text-right">
                    <a href="#" className="text-sm text-copper hover:underline">
                      Passwort vergessen?
                    </a>
                  </div>
                )}

                <Button type="submit" variant="copper" className="w-full" disabled={loading}>
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-background border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      {isLogin ? "Anmelden" : "Registrieren"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  {isLogin ? "Noch kein Konto?" : "Bereits registriert?"}{" "}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-copper hover:underline font-medium"
                  >
                    {isLogin ? "Jetzt registrieren" : "Jetzt anmelden"}
                  </button>
                </p>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center text-sm text-muted-foreground mt-6"
            >
              Mit der Anmeldung akzeptieren Sie unsere{" "}
              <Link to="/rechtliches" className="text-copper hover:underline">AGB</Link>
              {" "}und{" "}
              <Link to="/rechtliches" className="text-copper hover:underline">Datenschutzerklärung</Link>
            </motion.p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
