import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles, User, LogOut, LayoutDashboard, Heart, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo, useScroll } from "framer-motion";
import { Logo } from "@/components/shared/Logo";
import { supabase } from "@/integrations/supabase/client";
import { triggerHaptic } from "@/hooks/useHapticFeedback";
import { useRoutePrefetch } from "@/hooks/useRoutePrefetch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { href: "/erlebnisse", label: "Themenräume" },
  { href: "/massagen", label: "Massagen" },
  { href: "/team", label: "Team" },
  { href: "/erfahrungen", label: "Kundenstimmen" },
  { href: "/faq", label: "FAQ" },
  { href: "/kontakt", label: "Kontakt" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const { prefetchOnHover } = useRoutePrefetch();
  
  // Scroll progress for indicator
  const { scrollYProgress } = useScroll();
  
  // Touch gesture handling
  const dragY = useMotionValue(0);
  const menuOpacity = useTransform(dragY, [-100, 0], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      
      if (session?.user) {
        const { data } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .eq('role', 'admin')
          .maybeSingle();
        setIsAdmin(!!data);
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user || null);
      if (session?.user) {
        const { data } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .eq('role', 'admin')
          .maybeSingle();
        setIsAdmin(!!data);
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleLogout = async () => {
    triggerHaptic('medium');
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y < -80 || info.velocity.y < -500) {
      triggerHaptic('light');
      setIsMobileMenuOpen(false);
    }
    dragY.set(0);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-xl shadow-sm border-b border-border/50 py-3"
            : "bg-transparent py-4 sm:py-5"
        }`}
      >
        {/* Scroll Progress Indicator */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-copper origin-left"
          style={{ scaleX: scrollYProgress }}
        />
        
        <div className="container-wide flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group relative">
            <Logo size="md" />
            <motion.div 
              className="absolute -inset-2 bg-copper/0 group-hover:bg-copper/5 rounded-lg transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                {...prefetchOnHover(link.href)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors hover:text-copper ${
                  location.pathname === link.href
                    ? "text-copper"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
                {location.pathname === link.href && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-copper rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer">
                      <Heart className="w-4 h-4 mr-2" />
                      Mein Bereich
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="cursor-pointer">
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Abmelden
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">
                  <User className="w-4 h-4 mr-2" />
                  Anmelden
                </Link>
              </Button>
            )}

            {/* CTA Button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button variant="copper" asChild className="shadow-copper group">
                <Link to="/buchung">
                  <Sparkles size={16} className="mr-1.5 group-hover:rotate-12 transition-transform" />
                  Termin anfragen
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2.5 text-foreground rounded-xl hover:bg-secondary/80 active:bg-secondary transition-colors touch-manipulation"
            onClick={() => {
              triggerHaptic('light');
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={22} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Menu with Touch Gestures */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            {/* Menu Panel with Drag Gesture */}
            <motion.nav
              ref={menuRef}
              drag="y"
              dragConstraints={{ top: -200, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              style={{ y: dragY, opacity: menuOpacity }}
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.35, type: "spring", stiffness: 300, damping: 30 }}
              className="absolute top-16 sm:top-20 left-3 right-3 sm:left-4 sm:right-4 bg-card rounded-2xl shadow-2xl border border-border/60 overflow-hidden max-h-[calc(100vh-6rem)] overflow-y-auto touch-pan-y"
            >
              {/* Drag Handle */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 bg-muted-foreground/20 rounded-full" />
              </div>
              
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-copper/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              
              <div className="flex flex-col relative px-3 pb-5">
                {/* Navigation Links */}
                <div className="space-y-0.5">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.03 + index * 0.03 }}
                    >
                      <Link
                        to={link.href}
                        className={`flex items-center justify-between px-4 py-4 text-base font-medium rounded-xl transition-all active:scale-[0.98] touch-manipulation min-h-[52px] ${
                          location.pathname === link.href
                            ? "text-copper bg-copper/10 border border-copper/20"
                            : "text-foreground hover:bg-secondary/80 active:bg-secondary"
                        }`}
                      >
                        <span>{link.label}</span>
                        <ChevronRight 
                          size={20} 
                          className={`transition-colors ${location.pathname === link.href ? 'text-copper' : 'text-muted-foreground/40'}`} 
                        />
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* User Actions */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                  className="mt-4 pt-4 border-t border-border/50"
                >
                  {user ? (
                    <div className="space-y-0.5">
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-3 px-4 py-4 text-base font-medium rounded-xl text-foreground hover:bg-secondary/80 active:bg-secondary active:scale-[0.98] transition-all touch-manipulation min-h-[52px]"
                      >
                        <Heart className="w-5 h-5 text-copper" />
                        Mein Bereich
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="flex items-center gap-3 px-4 py-4 text-base font-medium rounded-xl text-foreground hover:bg-secondary/80 active:bg-secondary active:scale-[0.98] transition-all touch-manipulation min-h-[52px]"
                        >
                          <LayoutDashboard className="w-5 h-5 text-petrol" />
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-4 text-base font-medium rounded-xl text-destructive hover:bg-destructive/10 active:bg-destructive/15 active:scale-[0.98] transition-all touch-manipulation min-h-[52px]"
                      >
                        <LogOut className="w-5 h-5" />
                        Abmelden
                      </button>
                    </div>
                  ) : (
                    <Link
                      to="/login"
                      className="flex items-center gap-3 px-4 py-4 text-base font-medium rounded-xl text-foreground hover:bg-secondary/80 active:bg-secondary active:scale-[0.98] transition-all touch-manipulation min-h-[52px]"
                    >
                      <User className="w-5 h-5 text-copper" />
                      Anmelden
                    </Link>
                  )}
                </motion.div>

                {/* Primary CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4"
                >
                  <Button 
                    variant="copper" 
                    className="w-full shadow-lg shadow-copper/25 active:scale-[0.98] transition-transform h-14 text-base font-semibold" 
                    asChild
                  >
                    <Link to="/buchung">
                      <Sparkles size={18} className="mr-2" />
                      Jetzt Termin buchen
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
