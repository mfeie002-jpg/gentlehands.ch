import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 30; // requests per minute
const RATE_WINDOW = 60000;

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const existing = rateLimitMap.get(identifier);
  
  if (!existing || now > existing.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }
  
  if (existing.count >= RATE_LIMIT) {
    return false;
  }
  
  existing.count++;
  return true;
}

const SYSTEM_PROMPT = `Du bist der freundliche und professionelle Kundenservice-Assistent von GentleHands, einem exklusiven Wellness-Studio für Frauen in Zürich.

Wichtige Informationen über GentleHands:
- Premium Massage-Erlebnisse für Frauen (25-65 Jahre)
- 6 thematische Erlebnisräume: Ozean & Palmen, Alpine Stille, Deep Dark Relax, Urban Loft, Zen Garden, Surprise Experience
- Therapeut:innen: Anna (spezialisiert auf Aromatherapie), Luca (Tiefengewebsmassage), Morris (ganzheitliche Wellness), Sophie (Hot Stone & Entspannung)
- Preise: ab CHF 150 für 60 Minuten, CHF 220 für 90 Minuten, CHF 290 für 120 Minuten
- Öffnungszeiten: Mo-Sa 10:00-21:00 Uhr (Sonntags geschlossen)
- Adresse: Bahnhofstrasse 42, 8001 Zürich
- Telefon: +41 44 123 45 67

Antworte immer:
- Auf Deutsch mit formeller "Sie"-Anrede
- Freundlich, warmherzig aber professionell
- Kurz und präzise (max 2-3 Sätze pro Antwort)
- Bei Buchungsanfragen: Verweise auf die Buchungsseite /buchung
- Bei komplexen Anfragen: Biete an, mit dem Team zu verbinden

Du repräsentierst ein seriöses, professionelles Wellness-Unternehmen. Betone Diskretion, Sicherheit und Qualität.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const clientIP = req.headers.get('x-forwarded-for') || 'unknown';
    
    if (!checkRateLimit(clientIP)) {
      return new Response(
        JSON.stringify({ error: 'Zu viele Anfragen. Bitte warten Sie einen Moment.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: 'Invalid request format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'AI service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages.slice(-10) // Keep last 10 messages for context
        ],
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Dienst ist ausgelastet. Bitte versuchen Sie es später.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Dienst vorübergehend nicht verfügbar.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message?.content || 'Entschuldigung, ich konnte Ihre Anfrage nicht verarbeiten.';

    return new Response(
      JSON.stringify({ message: assistantMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Chat support error:', error instanceof Error ? error.message : 'Unknown error');
    return new Response(
      JSON.stringify({ 
        error: 'Ein Fehler ist aufgetreten. Bitte kontaktieren Sie uns telefonisch: +41 44 123 45 67' 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
