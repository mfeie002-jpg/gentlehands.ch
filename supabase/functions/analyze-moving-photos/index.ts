import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!lovableApiKey) {
      console.error('LOVABLE_API_KEY not configured');
      return new Response(JSON.stringify({ error: 'AI service not configured' }), {
        status: 503,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { images, room_type, additional_info } = await req.json();

    if (!images || !Array.isArray(images) || images.length === 0) {
      return new Response(JSON.stringify({ error: 'images array is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Analyzing ${images.length} photos for room: ${room_type || 'unknown'}`);

    // Build the prompt for room/inventory analysis
    const systemPrompt = `Du bist ein Experte für Umzugsschätzungen. Analysiere die Fotos und identifiziere:
1. Alle sichtbaren Möbel und Gegenstände
2. Geschätzte Größe/Gewicht der Objekte
3. Besondere Anforderungen (schwer, zerbrechlich, sperrig)
4. Geschätztes Volumen in Kubikmetern

Antworte immer im JSON-Format mit dieser Struktur:
{
  "room_analysis": {
    "room_type": "Wohnzimmer/Schlafzimmer/etc.",
    "estimated_volume_m3": 5.5,
    "complexity": "einfach/mittel/komplex"
  },
  "items": [
    {
      "name": "Sofa 3-Sitzer",
      "category": "Möbel",
      "quantity": 1,
      "estimated_volume_m3": 1.2,
      "weight_kg": 45,
      "special_handling": ["schwer"],
      "notes": "Muss eventuell zerlegt werden"
    }
  ],
  "summary": {
    "total_items": 12,
    "total_volume_m3": 8.5,
    "special_items_count": 2,
    "recommendations": ["Professionelle Verpackung für Glasvitrine empfohlen"]
  }
}`;

    const userPrompt = `Analysiere diese Fotos eines ${room_type || 'Raums'} für eine Umzugsschätzung.
${additional_info ? `Zusätzliche Informationen: ${additional_info}` : ''}

Identifiziere alle Möbel und Gegenstände und schätze das Volumen.`;

    // Prepare image content for the AI
    const imageContents = images.map((img: string) => ({
      type: 'image_url',
      image_url: {
        url: img.startsWith('data:') ? img : `data:image/jpeg;base64,${img}`
      }
    }));

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { 
            role: 'user', 
            content: [
              { type: 'text', text: userPrompt },
              ...imageContents
            ]
          }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', errorText);
      return new Response(JSON.stringify({ error: 'AI analysis failed' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const aiResult = await response.json();
    const analysisText = aiResult.choices?.[0]?.message?.content || '';

    // Try to parse JSON from the response
    let analysis;
    try {
      // Find JSON in the response
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      // Return raw analysis if JSON parsing fails
      analysis = {
        raw_analysis: analysisText,
        parse_error: true
      };
    }

    // Calculate price estimate based on volume
    const totalVolume = analysis?.summary?.total_volume_m3 || 0;
    const priceEstimate = calculatePriceEstimate(totalVolume, analysis?.room_analysis?.complexity);

    return new Response(JSON.stringify({ 
      success: true,
      analysis,
      price_estimate: priceEstimate,
      images_analyzed: images.length
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    console.error('Error in analyze-moving-photos:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function calculatePriceEstimate(volumeM3: number, complexity: string = 'mittel') {
  // Base price per cubic meter (CHF)
  const basePricePerM3 = 80;
  
  // Complexity multipliers
  const complexityMultipliers: Record<string, number> = {
    'einfach': 0.9,
    'mittel': 1.0,
    'komplex': 1.3
  };

  const multiplier = complexityMultipliers[complexity] || 1.0;
  const basePrice = volumeM3 * basePricePerM3 * multiplier;

  // Add fixed costs
  const fixedCosts = 200; // Base transport fee
  
  const priceMin = Math.round(basePrice + fixedCosts);
  const priceMax = Math.round(priceMin * 1.4);
  const priceMid = Math.round((priceMin + priceMax) / 2);

  return {
    volume_m3: volumeM3,
    complexity,
    price_min_chf: priceMin,
    price_mid_chf: priceMid,
    price_max_chf: priceMax,
    note: 'Schätzung basierend auf Fotoanalyse. Endpreis kann variieren.'
  };
}
