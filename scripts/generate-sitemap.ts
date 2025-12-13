/**
 * Automatic XML Sitemap Generator for GentleHands
 * Run with: npx ts-node scripts/generate-sitemap.ts
 */

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

// Define all routes with their SEO priorities
const routes: SitemapEntry[] = [
  // Hauptseiten (Höchste Priorität)
  { loc: '/', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: 1.0 },
  { loc: '/buchung', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: 0.95 },
  
  // Kernangebot (Hohe Priorität)
  { loc: '/erlebnisse', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.9 },
  { loc: '/massagen', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.9 },
  { loc: '/team', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.85 },
  { loc: '/preise', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.85 },
  
  // Trust & Social Proof
  { loc: '/erfahrungen', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: 0.8 },
  { loc: '/faq', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.8 },
  
  // Conversion-Seiten
  { loc: '/gutscheine', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.8 },
  { loc: '/membership', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.75 },
  { loc: '/geschenkideen', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.7 },
  { loc: '/quiz', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.7 },
  
  // Über uns & Vertrauen
  { loc: '/ueber-uns', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.7 },
  { loc: '/kontakt', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.7 },
  { loc: '/vorbereitung', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.65 },
  
  // Zusatzangebote
  { loc: '/aromatherapie', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.6 },
  { loc: '/soundtherapie', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.6 },
  { loc: '/saisonal', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.6 },
  
  // Content & Engagement
  { loc: '/ratgeber', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: 0.6 },
  { loc: '/galerie', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.55 },
  { loc: '/virtual-tour', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.55 },
  { loc: '/vergleich', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.5 },
  
  // Warteliste & Empfehlungen
  { loc: '/warteliste', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.55 },
  { loc: '/empfehlen', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.5 },
  
  // Business & Partner
  { loc: '/business', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.55 },
  { loc: '/partner', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.45 },
  
  // Unternehmensinformationen
  { loc: '/nachhaltigkeit', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.45 },
  { loc: '/presse', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.4 },
  { loc: '/karriere', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.4 },
  
  // Rechtliches (Niedrigste Priorität)
  { loc: '/rechtliches', lastmod: new Date().toISOString().split('T')[0], changefreq: 'yearly', priority: 0.3 },
];

// Pages to exclude from sitemap (internal/auth pages)
const excludedRoutes = [
  '/admin',
  '/dashboard',
  '/login',
  '/buchung/bestaetigung',
  '/buchung/verifizieren',
  '/performance',
];

const baseUrl = 'https://gentlehands.ch';

function generateSitemap(): string {
  const urlEntries = routes
    .filter(route => !excludedRoutes.includes(route.loc))
    .map(route => `  <url>
    <loc>${baseUrl}${route.loc}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(2)}</priority>
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
    Total URLs: ${routes.filter(r => !excludedRoutes.includes(r.loc)).length}
  -->
${urlEntries}
</urlset>`;
}

// Export for use in build scripts
export { generateSitemap, routes, excludedRoutes };

// Run if executed directly
if (typeof require !== 'undefined' && require.main === module) {
  console.log(generateSitemap());
}
