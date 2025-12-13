import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Dynamic sitemap configuration
interface PageConfig {
  path: string;
  priority: number;
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  lastmod?: string;
}

// Get last modification date based on changefreq
function getLastModDate(changefreq: PageConfig["changefreq"]): string {
  const now = new Date();
  
  switch (changefreq) {
    case "always":
    case "hourly":
    case "daily":
      return now.toISOString().split("T")[0];
    case "weekly":
      const lastMonday = new Date(now);
      lastMonday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
      return lastMonday.toISOString().split("T")[0];
    case "monthly":
      return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;
    case "yearly":
      return `${now.getFullYear()}-01-01`;
    default:
      return now.toISOString().split("T")[0];
  }
}

// Complete sitemap configuration
const sitemapPages: PageConfig[] = [
  // Main pages - German
  { path: "/", priority: 1.0, changefreq: "weekly" },
  { path: "/buchung", priority: 0.95, changefreq: "weekly" },
  { path: "/erlebnisse", priority: 0.9, changefreq: "monthly" },
  { path: "/massagen", priority: 0.9, changefreq: "monthly" },
  { path: "/team", priority: 0.85, changefreq: "monthly" },
  { path: "/preise", priority: 0.85, changefreq: "monthly" },
  { path: "/erfahrungen", priority: 0.8, changefreq: "weekly" },
  { path: "/faq", priority: 0.8, changefreq: "monthly" },
  { path: "/gutscheine", priority: 0.8, changefreq: "monthly" },
  { path: "/membership", priority: 0.75, changefreq: "monthly" },
  { path: "/geschenkideen", priority: 0.7, changefreq: "monthly" },
  { path: "/quiz", priority: 0.7, changefreq: "monthly" },
  { path: "/ueber-uns", priority: 0.7, changefreq: "monthly" },
  { path: "/kontakt", priority: 0.7, changefreq: "monthly" },
  { path: "/vorbereitung", priority: 0.65, changefreq: "monthly" },
  { path: "/aromatherapie", priority: 0.6, changefreq: "monthly" },
  { path: "/soundtherapie", priority: 0.6, changefreq: "monthly" },
  { path: "/saisonal", priority: 0.6, changefreq: "monthly" },
  { path: "/ratgeber", priority: 0.6, changefreq: "weekly" },
  { path: "/galerie", priority: 0.55, changefreq: "monthly" },
  { path: "/virtual-tour", priority: 0.55, changefreq: "monthly" },
  { path: "/vergleich", priority: 0.5, changefreq: "monthly" },
  { path: "/warteliste", priority: 0.55, changefreq: "monthly" },
  { path: "/empfehlen", priority: 0.5, changefreq: "monthly" },
  { path: "/business", priority: 0.55, changefreq: "monthly" },
  { path: "/partner", priority: 0.45, changefreq: "monthly" },
  { path: "/nachhaltigkeit", priority: 0.45, changefreq: "monthly" },
  { path: "/presse", priority: 0.4, changefreq: "monthly" },
  { path: "/karriere", priority: 0.4, changefreq: "monthly" },
  { path: "/rechtliches", priority: 0.3, changefreq: "yearly" },
  
  // English pages
  { path: "/en", priority: 0.9, changefreq: "weekly" },
  { path: "/en/experiences", priority: 0.8, changefreq: "monthly" },
  { path: "/en/massages", priority: 0.8, changefreq: "monthly" },
];

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const format = url.searchParams.get("format") || "xml";
    const baseUrl = "https://gentlehands.ch";

    if (format === "json") {
      // Return JSON format for debugging/API use
      const pages = sitemapPages.map((page) => ({
        ...page,
        fullUrl: `${baseUrl}${page.path}`,
        lastmod: getLastModDate(page.changefreq),
      }));

      return new Response(JSON.stringify({ pages, generatedAt: new Date().toISOString() }), {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      });
    }

    // Generate XML sitemap
    const urlEntries = sitemapPages
      .sort((a, b) => b.priority - a.priority)
      .map(
        (page) => `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${getLastModDate(page.changefreq)}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority.toFixed(2)}</priority>
  </url>`
      )
      .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <!-- 
    GentleHands Dynamic Sitemap
    Generated: ${new Date().toISOString()}
    Total URLs: ${sitemapPages.length}
  -->
${urlEntries}
</urlset>`;

    return new Response(xml, {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return new Response(JSON.stringify({ error: "Failed to generate sitemap" }), {
      status: 500,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  }
});
