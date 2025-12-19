import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ScreenshotRequest {
  url: string;
  dimension?: string; // "1920xfull" for desktop, "375xfull" for mobile
  delay?: number; // milliseconds to wait for JS
  format?: string; // png, jpg, gif
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('SCREENSHOT_MACHINE_KEY');
    if (!apiKey) {
      throw new Error('SCREENSHOT_MACHINE_KEY not configured');
    }

    const { url, dimension = '1920xfull', delay = 5000, format = 'png' }: ScreenshotRequest = await req.json();

    if (!url) {
      return new Response(
        JSON.stringify({ error: 'URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Capturing screenshot for: ${url}`);
    console.log(`Dimension: ${dimension}, Delay: ${delay}ms, Format: ${format}`);

    // Build ScreenshotMachine API URL
    const params = new URLSearchParams({
      key: apiKey,
      url: url,
      dimension: dimension,
      delay: delay.toString(),
      format: format,
      cacheLimit: '0', // Always fresh screenshots
    });

    const screenshotUrl = `https://api.screenshotmachine.com/?${params.toString()}`;
    
    console.log(`Fetching screenshot from ScreenshotMachine API...`);

    const response = await fetch(screenshotUrl);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ScreenshotMachine API error:', errorText);
      throw new Error(`ScreenshotMachine API error: ${response.status}`);
    }

    // Get the image as ArrayBuffer
    const imageBuffer = await response.arrayBuffer();
    
    // Convert to base64 for easier transport
    const base64Image = btoa(
      new Uint8Array(imageBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
    );

    // Extract domain for metadata
    const urlObj = new URL(url);
    const domain = urlObj.hostname;

    console.log(`Screenshot captured successfully for ${domain}`);

    return new Response(
      JSON.stringify({
        success: true,
        image: base64Image,
        format: format,
        dimension: dimension,
        url: url,
        domain: domain,
        capturedAt: new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error capturing screenshot:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
