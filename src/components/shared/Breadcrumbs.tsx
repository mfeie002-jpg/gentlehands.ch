import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { motion } from "framer-motion";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  showHome?: boolean;
  className?: string;
}

// German route labels mapping
const routeLabels: Record<string, string> = {
  erlebnisse: "Erlebnisse",
  massagen: "Massagen",
  team: "Team",
  "ueber-uns": "Über uns",
  erfahrungen: "Erfahrungen",
  faq: "FAQ",
  kontakt: "Kontakt",
  buchung: "Buchung",
  gutscheine: "Gutscheine",
  preise: "Preise",
  quiz: "Quiz",
  galerie: "Galerie",
  vorbereitung: "Vorbereitung",
  business: "Business",
  membership: "Membership",
  aromatherapie: "Aromatherapie",
  soundtherapie: "Soundtherapie",
  vergleich: "Vergleich",
  saisonal: "Saisonal",
  partner: "Partner",
  presse: "Presse",
  karriere: "Karriere",
  nachhaltigkeit: "Nachhaltigkeit",
  "virtual-tour": "Virtual Tour",
  geschenkideen: "Geschenkideen",
  ratgeber: "Ratgeber",
  rechtliches: "Rechtliches",
  warteliste: "Warteliste",
  empfehlen: "Empfehlen",
  login: "Anmelden",
  dashboard: "Mein Bereich",
  admin: "Admin",
};

export const Breadcrumbs = ({
  items,
  showHome = true,
  className = "",
}: BreadcrumbsProps) => {
  const location = useLocation();
  
  // Auto-generate breadcrumbs from current path if not provided
  const breadcrumbItems: BreadcrumbItem[] = items || (() => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    return pathSegments.map((segment, index) => {
      const href = "/" + pathSegments.slice(0, index + 1).join("/");
      const isLast = index === pathSegments.length - 1;
      return {
        label: routeLabels[segment] || segment,
        href: isLast ? undefined : href,
      };
    });
  })();

  if (breadcrumbItems.length === 0 && location.pathname === "/") {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center text-sm text-muted-foreground ${className}`}
    >
      <ol className="flex items-center gap-1 flex-wrap">
        {showHome && (
          <li className="flex items-center">
            <Link
              to="/"
              className="flex items-center gap-1 hover:text-copper transition-colors p-1 -m-1 rounded"
              aria-label="Startseite"
            >
              <Home size={14} />
              <span className="sr-only sm:not-sr-only">Start</span>
            </Link>
            {breadcrumbItems.length > 0 && (
              <ChevronRight size={14} className="mx-1 text-muted-foreground/50" aria-hidden="true" />
            )}
          </li>
        )}
        
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.href ? (
              <motion.div whileHover={{ x: 2 }}>
                <Link
                  to={item.href}
                  className="hover:text-copper transition-colors p-1 -m-1 rounded"
                >
                  {item.label}
                </Link>
              </motion.div>
            ) : (
              <span className="text-foreground font-medium" aria-current="page">
                {item.label}
              </span>
            )}
            
            {index < breadcrumbItems.length - 1 && (
              <ChevronRight size={14} className="mx-1 text-muted-foreground/50" aria-hidden="true" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
