import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Sparkles, Gift, Users, Calendar, MapPin, Star } from 'lucide-react';

interface RelatedLink {
  href: string;
  title: string;
  description: string;
  icon: typeof Sparkles;
}

interface InternalLinkingWidgetProps {
  currentPath: string;
  variant?: 'sidebar' | 'footer' | 'inline';
  maxLinks?: number;
  className?: string;
}

// Define contextual link relationships
const linkRelationships: Record<string, RelatedLink[]> = {
  '/': [
    { href: '/erlebnisse', title: 'Themenräume entdecken', description: '6 einzigartige Atmosphären', icon: Sparkles },
    { href: '/massagen', title: 'Massagen ansehen', description: 'Unsere Behandlungen', icon: Star },
    { href: '/buchung', title: 'Termin buchen', description: 'Jetzt Erlebnis sichern', icon: Calendar },
  ],
  '/erlebnisse': [
    { href: '/massagen', title: 'Passende Massage finden', description: 'Behandlungen für jeden Themenraum', icon: Star },
    { href: '/team', title: 'Therapeut:innen kennenlernen', description: 'Unser professionelles Team', icon: Users },
    { href: '/buchung', title: 'Jetzt buchen', description: 'Ihr persönliches Erlebnis', icon: Calendar },
    { href: '/galerie', title: 'Bildergalerie', description: 'Impressionen unserer Räume', icon: Sparkles },
  ],
  '/massagen': [
    { href: '/erlebnisse', title: 'Themenräume wählen', description: 'Die perfekte Atmosphäre', icon: Sparkles },
    { href: '/preise', title: 'Preisübersicht', description: 'Transparente Preise', icon: Gift },
    { href: '/team', title: 'Team kennenlernen', description: 'Unsere Expert:innen', icon: Users },
    { href: '/buchung', title: 'Termin vereinbaren', description: 'Online buchen', icon: Calendar },
  ],
  '/team': [
    { href: '/erlebnisse', title: 'Themenräume', description: 'Wo wir arbeiten', icon: Sparkles },
    { href: '/massagen', title: 'Behandlungen', description: 'Was wir anbieten', icon: Star },
    { href: '/buchung', title: 'Termin buchen', description: 'Therapeut:in wählen', icon: Calendar },
  ],
  '/preise': [
    { href: '/massagen', title: 'Massage-Details', description: 'Alle Behandlungen', icon: Star },
    { href: '/gutscheine', title: 'Gutscheine', description: 'Entspannung verschenken', icon: Gift },
    { href: '/membership', title: 'Membership', description: 'Exklusive Vorteile', icon: Sparkles },
    { href: '/buchung', title: 'Jetzt buchen', description: 'Termin sichern', icon: Calendar },
  ],
  '/gutscheine': [
    { href: '/geschenkideen', title: 'Geschenkideen', description: 'Inspiration für Wellness', icon: Gift },
    { href: '/erlebnisse', title: 'Erlebnisse entdecken', description: 'Was erwartet Sie', icon: Sparkles },
    { href: '/preise', title: 'Preise ansehen', description: 'Gutscheinwerte', icon: Star },
  ],
  '/kontakt': [
    { href: '/faq', title: 'Häufige Fragen', description: 'Schnelle Antworten', icon: Star },
    { href: '/vorbereitung', title: 'Vorbereitung', description: 'Vor Ihrem Termin', icon: Calendar },
    { href: '/', title: 'Standort', description: 'Anfahrt & Parken', icon: MapPin },
  ],
  '/faq': [
    { href: '/kontakt', title: 'Kontakt aufnehmen', description: 'Wir helfen gerne', icon: Users },
    { href: '/vorbereitung', title: 'Termin-Vorbereitung', description: 'Was Sie wissen sollten', icon: Calendar },
    { href: '/buchung', title: 'Direkt buchen', description: 'Termin vereinbaren', icon: Calendar },
  ],
};

// Default links for pages without specific relationships
const defaultLinks: RelatedLink[] = [
  { href: '/erlebnisse', title: 'Themenräume', description: '6 einzigartige Atmosphären', icon: Sparkles },
  { href: '/massagen', title: 'Massagen', description: 'Unsere Behandlungen', icon: Star },
  { href: '/buchung', title: 'Termin buchen', description: 'Jetzt Erlebnis sichern', icon: Calendar },
];

export function InternalLinkingWidget({ 
  currentPath, 
  variant = 'sidebar',
  maxLinks = 3,
  className = ''
}: InternalLinkingWidgetProps) {
  // Get related links for current page, or use defaults
  const relatedLinks = (linkRelationships[currentPath] || defaultLinks)
    .filter(link => link.href !== currentPath)
    .slice(0, maxLinks);

  if (relatedLinks.length === 0) return null;

  if (variant === 'inline') {
    return (
      <div className={`flex flex-wrap gap-3 ${className}`}>
        {relatedLinks.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20 text-sm font-medium transition-colors"
          >
            <link.icon className="h-4 w-4" />
            {link.title}
            <ArrowRight className="h-3 w-3" />
          </Link>
        ))}
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 ${className}`}>
        {relatedLinks.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className="group p-4 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <link.icon className="h-5 w-5 text-primary" />
              <span className="font-medium group-hover:text-primary transition-colors">
                {link.title}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{link.description}</p>
          </Link>
        ))}
      </div>
    );
  }

  // Default: sidebar variant
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Das könnte Sie interessieren</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {relatedLinks.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
          >
            <div className="p-2 rounded-full bg-primary/10 text-primary">
              <link.icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm group-hover:text-primary transition-colors">
                {link.title}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {link.description}
              </p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
