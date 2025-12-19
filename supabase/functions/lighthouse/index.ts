import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface LighthouseRequest {
  url: string;
  strategy?: 'mobile' | 'desktop';
  categories?: string[]; // performance, accessibility, best-practices, seo, pwa
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      url, 
      strategy = 'mobile',
      categories = ['performance', 'accessibility', 'best-practices', 'seo']
    }: LighthouseRequest = await req.json();

    if (!url) {
      return new Response(
        JSON.stringify({ error: 'URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Running PageSpeed Insights for: ${url}`);
    console.log(`Strategy: ${strategy}, Categories: ${categories.join(', ')}`);

    // Build PageSpeed Insights API URL (free, no API key required for basic usage)
    const params = new URLSearchParams({
      url: url,
      strategy: strategy,
    });

    // Add categories
    categories.forEach(cat => params.append('category', cat));

    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params.toString()}`;

    console.log(`Calling PageSpeed Insights API...`);

    const response = await fetch(apiUrl);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('PageSpeed API error:', errorText);
      throw new Error(`PageSpeed API error: ${response.status}`);
    }

    const data = await response.json();

    // Extract scores
    const lighthouseResult = data.lighthouseResult;
    const scores: Record<string, number> = {};
    
    if (lighthouseResult?.categories) {
      Object.entries(lighthouseResult.categories).forEach(([key, value]: [string, any]) => {
        scores[key] = Math.round(value.score * 100);
      });
    }

    // Extract Core Web Vitals
    const audits = lighthouseResult?.audits || {};
    const coreWebVitals = {
      lcp: {
        value: audits['largest-contentful-paint']?.displayValue || 'N/A',
        score: Math.round((audits['largest-contentful-paint']?.score || 0) * 100),
        description: 'Largest Contentful Paint',
      },
      fid: {
        value: audits['max-potential-fid']?.displayValue || 'N/A',
        score: Math.round((audits['max-potential-fid']?.score || 0) * 100),
        description: 'Max Potential First Input Delay',
      },
      cls: {
        value: audits['cumulative-layout-shift']?.displayValue || 'N/A',
        score: Math.round((audits['cumulative-layout-shift']?.score || 0) * 100),
        description: 'Cumulative Layout Shift',
      },
      fcp: {
        value: audits['first-contentful-paint']?.displayValue || 'N/A',
        score: Math.round((audits['first-contentful-paint']?.score || 0) * 100),
        description: 'First Contentful Paint',
      },
      ttfb: {
        value: audits['server-response-time']?.displayValue || 'N/A',
        score: Math.round((audits['server-response-time']?.score || 0) * 100),
        description: 'Time to First Byte',
      },
      tbt: {
        value: audits['total-blocking-time']?.displayValue || 'N/A',
        score: Math.round((audits['total-blocking-time']?.score || 0) * 100),
        description: 'Total Blocking Time',
      },
      si: {
        value: audits['speed-index']?.displayValue || 'N/A',
        score: Math.round((audits['speed-index']?.score || 0) * 100),
        description: 'Speed Index',
      },
    };

    // Extract opportunities/recommendations
    const opportunities: Array<{
      title: string;
      description: string;
      savings: string;
    }> = [];

    Object.values(audits).forEach((audit: any) => {
      if (audit.details?.type === 'opportunity' && audit.score !== null && audit.score < 1) {
        opportunities.push({
          title: audit.title,
          description: audit.description || '',
          savings: audit.displayValue || '',
        });
      }
    });

    // Sort by impact (approximated by savings value)
    opportunities.sort((a, b) => {
      const aNum = parseFloat(a.savings) || 0;
      const bNum = parseFloat(b.savings) || 0;
      return bNum - aNum;
    });

    const urlObj = new URL(url);
    const domain = urlObj.hostname;

    console.log(`Lighthouse audit completed for ${domain}`);

    return new Response(
      JSON.stringify({
        success: true,
        url: url,
        domain: domain,
        strategy: strategy,
        scores: scores,
        coreWebVitals: coreWebVitals,
        opportunities: opportunities.slice(0, 10), // Top 10 recommendations
        auditedAt: new Date().toISOString(),
        fullReport: lighthouseResult, // Include full report for detailed view
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error running Lighthouse:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
