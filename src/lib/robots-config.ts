/**
 * Robots.txt Configuration
 * This file defines the rules for robots.txt generation
 */

export interface RobotsRule {
  userAgent: string;
  allow?: string[];
  disallow?: string[];
  crawlDelay?: number;
}

export const robotsConfig: RobotsRule[] = [
  // Default rules for all bots
  {
    userAgent: '*',
    allow: ['/'],
    disallow: [
      '/admin',
      '/admin/*',
      '/dashboard',
      '/dashboard/*',
      '/login',
      '/buchung/bestaetigung',
      '/buchung/verifizieren',
      '/performance',
      '/api/',
      '/_next/',
      '/supabase/',
      '/*?token=',
      '/*?verification=',
    ],
    crawlDelay: 1,
  },
  
  // Major search engines - full access
  {
    userAgent: 'Googlebot',
    allow: ['/'],
    crawlDelay: 0,
  },
  {
    userAgent: 'Googlebot-Image',
    allow: ['/'],
  },
  {
    userAgent: 'Bingbot',
    allow: ['/'],
    crawlDelay: 1,
  },
  {
    userAgent: 'Slurp',
    allow: ['/'],
    crawlDelay: 1,
  },
  {
    userAgent: 'DuckDuckBot',
    allow: ['/'],
    crawlDelay: 1,
  },
  
  // Social media bots - full access for rich previews
  {
    userAgent: 'Twitterbot',
    allow: ['/'],
  },
  {
    userAgent: 'facebookexternalhit',
    allow: ['/'],
  },
  {
    userAgent: 'LinkedInBot',
    allow: ['/'],
  },
  {
    userAgent: 'Pinterest',
    allow: ['/'],
  },
  {
    userAgent: 'WhatsApp',
    allow: ['/'],
  },
  {
    userAgent: 'TelegramBot',
    allow: ['/'],
  },
  
  // SEO tools - allow for analysis
  {
    userAgent: 'Screaming Frog SEO Spider',
    allow: ['/'],
  },
  {
    userAgent: 'AhrefsBot',
    allow: ['/'],
    crawlDelay: 2,
  },
  {
    userAgent: 'SemrushBot',
    allow: ['/'],
    crawlDelay: 2,
  },
  
  // Block AI training scrapers
  {
    userAgent: 'GPTBot',
    disallow: ['/'],
  },
  {
    userAgent: 'ChatGPT-User',
    disallow: ['/'],
  },
  {
    userAgent: 'Google-Extended',
    disallow: ['/'],
  },
  {
    userAgent: 'anthropic-ai',
    disallow: ['/'],
  },
  {
    userAgent: 'Claude-Web',
    disallow: ['/'],
  },
  {
    userAgent: 'CCBot',
    disallow: ['/'],
  },
  {
    userAgent: 'Omgilibot',
    disallow: ['/'],
  },
  {
    userAgent: 'FacebookBot',
    disallow: ['/'],
  },
  
  // Block bad bots and scrapers
  {
    userAgent: 'MJ12bot',
    disallow: ['/'],
  },
  {
    userAgent: 'DotBot',
    disallow: ['/'],
  },
  {
    userAgent: 'BLEXBot',
    disallow: ['/'],
  },
  {
    userAgent: 'DataForSeoBot',
    disallow: ['/'],
  },
  {
    userAgent: 'magpie-crawler',
    disallow: ['/'],
  },
];

/**
 * Generate robots.txt content from config
 */
export function generateRobotsTxt(sitemapUrl: string = 'https://gentlehands.ch/sitemap.xml'): string {
  const lines: string[] = [
    '# GentleHands - Exklusive Massage-Erlebnisse für Frauen in Zürich',
    '# https://gentlehands.ch',
    '',
  ];

  robotsConfig.forEach((rule) => {
    lines.push(`User-agent: ${rule.userAgent}`);
    
    if (rule.allow) {
      rule.allow.forEach(path => lines.push(`Allow: ${path}`));
    }
    
    if (rule.disallow) {
      rule.disallow.forEach(path => lines.push(`Disallow: ${path}`));
    }
    
    if (rule.crawlDelay !== undefined) {
      lines.push(`Crawl-delay: ${rule.crawlDelay}`);
    }
    
    lines.push('');
  });

  // Add sitemap and host
  lines.push(`Sitemap: ${sitemapUrl}`);
  lines.push('');
  lines.push('Host: https://gentlehands.ch');

  return lines.join('\n');
}
