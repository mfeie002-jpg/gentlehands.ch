/**
 * Sitemap Configuration for GentleHands
 * Used for automatic sitemap generation and SEO management
 */

export interface PageConfig {
  path: string;
  priority: number;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  title: string;
  description: string;
  includeInSitemap: boolean;
  schemaType?: 'WebPage' | 'FAQPage' | 'Product' | 'Service' | 'LocalBusiness' | 'Article';
}

export const sitemapConfig: PageConfig[] = [
  // Hauptseiten
  {
    path: '/',
    priority: 1.0,
    changefreq: 'weekly',
    title: 'Premium Erlebnismassagen für Frauen',
    description: 'Exklusive Wellness-Erfahrungen in atmosphärischen Themenwelten in Zürich.',
    includeInSitemap: true,
    schemaType: 'LocalBusiness',
  },
  {
    path: '/buchung',
    priority: 0.95,
    changefreq: 'weekly',
    title: 'Termin buchen',
    description: 'Buchen Sie Ihre persönliche Massage-Erfahrung.',
    includeInSitemap: true,
    schemaType: 'WebPage',
  },
  
  // Kernangebot
  {
    path: '/erlebnisse',
    priority: 0.9,
    changefreq: 'monthly',
    title: 'Themenräume',
    description: 'Entdecken Sie unsere einzigartigen Themenräume.',
    includeInSitemap: true,
    schemaType: 'Service',
  },
  {
    path: '/massagen',
    priority: 0.9,
    changefreq: 'monthly',
    title: 'Massagen',
    description: 'Unsere professionellen Massage-Angebote.',
    includeInSitemap: true,
    schemaType: 'Service',
  },
  {
    path: '/team',
    priority: 0.85,
    changefreq: 'monthly',
    title: 'Team',
    description: 'Lernen Sie unser professionelles Therapeuten-Team kennen.',
    includeInSitemap: true,
    schemaType: 'WebPage',
  },
  {
    path: '/preise',
    priority: 0.85,
    changefreq: 'monthly',
    title: 'Preise',
    description: 'Transparente Preisübersicht für alle Massagen.',
    includeInSitemap: true,
    schemaType: 'WebPage',
  },
  
  // Trust & Social Proof
  {
    path: '/erfahrungen',
    priority: 0.8,
    changefreq: 'weekly',
    title: 'Kundenstimmen',
    description: 'Erfahrungen unserer zufriedenen Kundinnen.',
    includeInSitemap: true,
    schemaType: 'WebPage',
  },
  {
    path: '/faq',
    priority: 0.8,
    changefreq: 'monthly',
    title: 'FAQ',
    description: 'Häufig gestellte Fragen und Antworten.',
    includeInSitemap: true,
    schemaType: 'FAQPage',
  },
  
  // Conversion-Seiten
  {
    path: '/gutscheine',
    priority: 0.8,
    changefreq: 'monthly',
    title: 'Gutscheine',
    description: 'Verschenken Sie Entspannung mit unseren Wellness-Gutscheinen.',
    includeInSitemap: true,
    schemaType: 'Product',
  },
  {
    path: '/membership',
    priority: 0.75,
    changefreq: 'monthly',
    title: 'Membership',
    description: 'Exklusive Vorteile mit unserer Mitgliedschaft.',
    includeInSitemap: true,
    schemaType: 'Service',
  },
  {
    path: '/geschenkideen',
    priority: 0.7,
    changefreq: 'monthly',
    title: 'Geschenkideen',
    description: 'Inspirierende Geschenkideen für Wellness-Liebhaber.',
    includeInSitemap: true,
    schemaType: 'WebPage',
  },
  {
    path: '/quiz',
    priority: 0.7,
    changefreq: 'monthly',
    title: 'Persönlichkeitsquiz',
    description: 'Finden Sie Ihre perfekte Massage-Erfahrung.',
    includeInSitemap: true,
    schemaType: 'WebPage',
  },
  
  // Über uns & Vertrauen
  {
    path: '/ueber-uns',
    priority: 0.7,
    changefreq: 'monthly',
    title: 'Über uns',
    description: 'Lernen Sie GentleHands und unsere Philosophie kennen.',
    includeInSitemap: true,
    schemaType: 'WebPage',
  },
  {
    path: '/kontakt',
    priority: 0.7,
    changefreq: 'monthly',
    title: 'Kontakt',
    description: 'Kontaktieren Sie uns für Fragen und Buchungen.',
    includeInSitemap: true,
    schemaType: 'WebPage',
  },
  {
    path: '/vorbereitung',
    priority: 0.65,
    changefreq: 'monthly',
    title: 'Vorbereitung',
    description: 'So bereiten Sie sich optimal auf Ihren Termin vor.',
    includeInSitemap: true,
    schemaType: 'Article',
  },
  
  // Zusatzangebote
  {
    path: '/aromatherapie',
    priority: 0.6,
    changefreq: 'monthly',
    title: 'Aromatherapie',
    description: 'Ergänzen Sie Ihre Massage mit ausgewählten Düften.',
    includeInSitemap: true,
    schemaType: 'Service',
  },
  {
    path: '/soundtherapie',
    priority: 0.6,
    changefreq: 'monthly',
    title: 'Soundtherapie',
    description: 'Klangschalen und Musik für tiefe Entspannung.',
    includeInSitemap: true,
    schemaType: 'Service',
  },
  {
    path: '/saisonal',
    priority: 0.6,
    changefreq: 'monthly',
    title: 'Saisonale Angebote',
    description: 'Aktuelle saisonale Wellness-Specials.',
    includeInSitemap: true,
    schemaType: 'WebPage',
  },
  
  // Content & Engagement
  {
    path: '/ratgeber',
    priority: 0.6,
    changefreq: 'weekly',
    title: 'Ratgeber',
    description: 'Tipps und Wissen rund um Wellness und Selbstfürsorge.',
    includeInSitemap: true,
    schemaType: 'Article',
  },
  {
    path: '/galerie',
    priority: 0.55,
    changefreq: 'monthly',
    title: 'Galerie',
    description: 'Impressionen aus unseren Räumlichkeiten.',
    includeInSitemap: true,
    schemaType: 'WebPage',
  },
  {
    path: '/virtual-tour',
    priority: 0.55,
    changefreq: 'monthly',
    title: 'Virtuelle Tour',
    description: 'Erkunden Sie unsere Räume virtuell.',
    includeInSitemap: true,
    schemaType: 'WebPage',
  },
  {
    path: '/vergleich',
    priority: 0.5,
    changefreq: 'monthly',
    title: 'Vergleich',
    description: 'Vergleichen Sie unsere Massage-Angebote.',
    includeInSitemap: true,
    schemaType: 'WebPage',
  },
  
  // Warteliste & Empfehlungen
  {
    path: '/warteliste',
    priority: 0.55,
    changefreq: 'monthly',
    title: 'Warteliste',
    description: 'Tragen Sie sich auf unsere Warteliste ein.',
    includeInSitemap: true,
    schemaType: 'WebPage',
  },
  {
    path: '/empfehlen',
    priority: 0.5,
    changefreq: 'monthly',
    title: 'Empfehlungsprogramm',
    description: 'Empfehlen Sie uns weiter und profitieren Sie.',
    includeInSitemap: true,
    schemaType: 'WebPage',
  },
  
  // Business & Partner
  {
    path: '/business',
    priority: 0.55,
    changefreq: 'monthly',
    title: 'Business Wellness',
    description: 'Corporate Wellness-Lösungen für Unternehmen.',
    includeInSitemap: true,
    schemaType: 'Service',
  },
  {
    path: '/partner',
    priority: 0.45,
    changefreq: 'monthly',
    title: 'Partner',
    description: 'Werden Sie Partner von GentleHands.',
    includeInSitemap: true,
    schemaType: 'WebPage',
  },
  
  // Unternehmensinformationen
  {
    path: '/nachhaltigkeit',
    priority: 0.45,
    changefreq: 'monthly',
    title: 'Nachhaltigkeit',
    description: 'Unser Engagement für Nachhaltigkeit.',
    includeInSitemap: true,
    schemaType: 'WebPage',
  },
  {
    path: '/presse',
    priority: 0.4,
    changefreq: 'monthly',
    title: 'Presse',
    description: 'Pressematerialien und Medienanfragen.',
    includeInSitemap: true,
    schemaType: 'WebPage',
  },
  {
    path: '/karriere',
    priority: 0.4,
    changefreq: 'monthly',
    title: 'Karriere',
    description: 'Karrieremöglichkeiten bei GentleHands.',
    includeInSitemap: true,
    schemaType: 'WebPage',
  },
  
  // Rechtliches
  {
    path: '/rechtliches',
    priority: 0.3,
    changefreq: 'yearly',
    title: 'Rechtliches',
    description: 'Impressum, Datenschutz und AGB.',
    includeInSitemap: true,
    schemaType: 'WebPage',
  },
  
  // Interne Seiten (nicht in Sitemap)
  {
    path: '/admin',
    priority: 0,
    changefreq: 'never',
    title: 'Admin',
    description: 'Admin Dashboard',
    includeInSitemap: false,
  },
  {
    path: '/dashboard',
    priority: 0,
    changefreq: 'never',
    title: 'Dashboard',
    description: 'Benutzer Dashboard',
    includeInSitemap: false,
  },
  {
    path: '/login',
    priority: 0,
    changefreq: 'never',
    title: 'Login',
    description: 'Anmeldung',
    includeInSitemap: false,
  },
  {
    path: '/buchung/bestaetigung',
    priority: 0,
    changefreq: 'never',
    title: 'Buchungsbestätigung',
    description: 'Buchungsbestätigung',
    includeInSitemap: false,
  },
  {
    path: '/buchung/verifizieren',
    priority: 0,
    changefreq: 'never',
    title: 'Verifizierung',
    description: 'E-Mail-Verifizierung',
    includeInSitemap: false,
  },
  {
    path: '/performance',
    priority: 0,
    changefreq: 'never',
    title: 'Performance',
    description: 'Performance Dashboard',
    includeInSitemap: false,
  },
];

/**
 * Get build date for lastmod
 * Uses current date as fallback, but in production this should be replaced
 * with actual Git commit date or file modification date
 */
export function getBuildDate(): string {
  // In a real build, this would be replaced with the actual build timestamp
  // from environment variables or build-time injection
  const buildDate = import.meta.env.VITE_BUILD_DATE || new Date().toISOString();
  return buildDate.split('T')[0];
}

/**
 * Get lastmod date based on changefreq
 * Pages with higher update frequency get more recent dates
 */
export function getLastModDate(changefreq: PageConfig['changefreq']): string {
  const now = new Date();
  
  switch (changefreq) {
    case 'always':
    case 'hourly':
    case 'daily':
      return now.toISOString().split('T')[0];
    case 'weekly':
      // Set to last Monday
      const lastMonday = new Date(now);
      lastMonday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
      return lastMonday.toISOString().split('T')[0];
    case 'monthly':
      // Set to first of current month
      return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
    case 'yearly':
      // Set to first of current year
      return `${now.getFullYear()}-01-01`;
    case 'never':
    default:
      return getBuildDate();
  }
}

/**
 * Generate XML sitemap string with dynamic lastmod dates
 */
export function generateSitemapXML(): string {
  const baseUrl = 'https://gentlehands.ch';
  const buildDate = getBuildDate();
  
  const urlEntries = sitemapConfig
    .filter(page => page.includeInSitemap)
    .sort((a, b) => b.priority - a.priority)
    .map(page => `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${getLastModDate(page.changefreq)}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority.toFixed(2)}</priority>
  </url>`)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <!-- 
    GentleHands Sitemap
    Generated: ${new Date().toISOString()}
    Build Date: ${buildDate}
    Total URLs: ${sitemapConfig.filter(p => p.includeInSitemap).length}
  -->
${urlEntries}
</urlset>`;
}

/**
 * Get page config by path
 */
export function getPageConfig(path: string): PageConfig | undefined {
  return sitemapConfig.find(page => page.path === path);
}

/**
 * Generate sitemap index for multiple sitemaps (future use)
 */
export function generateSitemapIndex(): string {
  const baseUrl = 'https://gentlehands.ch';
  const buildDate = getBuildDate();
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap.xml</loc>
    <lastmod>${buildDate}</lastmod>
  </sitemap>
</sitemapindex>`;
}
