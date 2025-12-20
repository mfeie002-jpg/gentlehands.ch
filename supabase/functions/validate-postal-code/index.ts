import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Swiss postal codes database (subset of most common)
const swissPostalCodes: Record<string, { city: string; canton: string }> = {
  // Zürich
  "8000": { city: "Zürich", canton: "ZH" },
  "8001": { city: "Zürich", canton: "ZH" },
  "8002": { city: "Zürich", canton: "ZH" },
  "8003": { city: "Zürich", canton: "ZH" },
  "8004": { city: "Zürich", canton: "ZH" },
  "8005": { city: "Zürich", canton: "ZH" },
  "8006": { city: "Zürich", canton: "ZH" },
  "8008": { city: "Zürich", canton: "ZH" },
  "8032": { city: "Zürich", canton: "ZH" },
  "8037": { city: "Zürich", canton: "ZH" },
  "8038": { city: "Zürich", canton: "ZH" },
  "8041": { city: "Zürich", canton: "ZH" },
  "8044": { city: "Zürich", canton: "ZH" },
  "8045": { city: "Zürich", canton: "ZH" },
  "8046": { city: "Zürich", canton: "ZH" },
  "8047": { city: "Zürich", canton: "ZH" },
  "8048": { city: "Zürich", canton: "ZH" },
  "8049": { city: "Zürich", canton: "ZH" },
  "8050": { city: "Zürich", canton: "ZH" },
  "8051": { city: "Zürich", canton: "ZH" },
  "8052": { city: "Zürich", canton: "ZH" },
  "8053": { city: "Zürich", canton: "ZH" },
  "8055": { city: "Zürich", canton: "ZH" },
  "8057": { city: "Zürich", canton: "ZH" },
  "8063": { city: "Zürich", canton: "ZH" },
  "8064": { city: "Zürich", canton: "ZH" },
  "8400": { city: "Winterthur", canton: "ZH" },
  "8401": { city: "Winterthur", canton: "ZH" },
  "8404": { city: "Winterthur", canton: "ZH" },
  "8405": { city: "Winterthur", canton: "ZH" },
  "8600": { city: "Dübendorf", canton: "ZH" },
  "8610": { city: "Uster", canton: "ZH" },
  "8620": { city: "Wetzikon", canton: "ZH" },
  "8700": { city: "Küsnacht", canton: "ZH" },
  "8702": { city: "Zollikon", canton: "ZH" },
  "8800": { city: "Thalwil", canton: "ZH" },
  "8802": { city: "Kilchberg", canton: "ZH" },
  "8810": { city: "Horgen", canton: "ZH" },
  // Bern
  "3000": { city: "Bern", canton: "BE" },
  "3001": { city: "Bern", canton: "BE" },
  "3004": { city: "Bern", canton: "BE" },
  "3005": { city: "Bern", canton: "BE" },
  "3006": { city: "Bern", canton: "BE" },
  "3007": { city: "Bern", canton: "BE" },
  "3008": { city: "Bern", canton: "BE" },
  "3010": { city: "Bern", canton: "BE" },
  "3011": { city: "Bern", canton: "BE" },
  "3012": { city: "Bern", canton: "BE" },
  "3013": { city: "Bern", canton: "BE" },
  "3014": { city: "Bern", canton: "BE" },
  "3015": { city: "Bern", canton: "BE" },
  "3018": { city: "Bern", canton: "BE" },
  "3027": { city: "Bern", canton: "BE" },
  "3400": { city: "Burgdorf", canton: "BE" },
  "3600": { city: "Thun", canton: "BE" },
  "2500": { city: "Biel/Bienne", canton: "BE" },
  // Basel
  "4000": { city: "Basel", canton: "BS" },
  "4001": { city: "Basel", canton: "BS" },
  "4051": { city: "Basel", canton: "BS" },
  "4052": { city: "Basel", canton: "BS" },
  "4053": { city: "Basel", canton: "BS" },
  "4054": { city: "Basel", canton: "BS" },
  "4055": { city: "Basel", canton: "BS" },
  "4056": { city: "Basel", canton: "BS" },
  "4057": { city: "Basel", canton: "BS" },
  "4058": { city: "Basel", canton: "BS" },
  "4059": { city: "Basel", canton: "BS" },
  // Genève
  "1200": { city: "Genève", canton: "GE" },
  "1201": { city: "Genève", canton: "GE" },
  "1202": { city: "Genève", canton: "GE" },
  "1203": { city: "Genève", canton: "GE" },
  "1204": { city: "Genève", canton: "GE" },
  "1205": { city: "Genève", canton: "GE" },
  "1206": { city: "Genève", canton: "GE" },
  "1207": { city: "Genève", canton: "GE" },
  "1208": { city: "Genève", canton: "GE" },
  "1209": { city: "Genève", canton: "GE" },
  // Lausanne
  "1000": { city: "Lausanne", canton: "VD" },
  "1003": { city: "Lausanne", canton: "VD" },
  "1004": { city: "Lausanne", canton: "VD" },
  "1005": { city: "Lausanne", canton: "VD" },
  "1006": { city: "Lausanne", canton: "VD" },
  "1007": { city: "Lausanne", canton: "VD" },
  "1010": { city: "Lausanne", canton: "VD" },
  "1011": { city: "Lausanne", canton: "VD" },
  "1012": { city: "Lausanne", canton: "VD" },
  "1018": { city: "Lausanne", canton: "VD" },
  // Luzern
  "6000": { city: "Luzern", canton: "LU" },
  "6002": { city: "Luzern", canton: "LU" },
  "6003": { city: "Luzern", canton: "LU" },
  "6004": { city: "Luzern", canton: "LU" },
  "6005": { city: "Luzern", canton: "LU" },
  "6006": { city: "Luzern", canton: "LU" },
  "6010": { city: "Kriens", canton: "LU" },
  "6014": { city: "Luzern", canton: "LU" },
  "6015": { city: "Luzern", canton: "LU" },
  // St. Gallen
  "9000": { city: "St. Gallen", canton: "SG" },
  "9001": { city: "St. Gallen", canton: "SG" },
  "9004": { city: "St. Gallen", canton: "SG" },
  "9006": { city: "St. Gallen", canton: "SG" },
  "9008": { city: "St. Gallen", canton: "SG" },
  "9010": { city: "St. Gallen", canton: "SG" },
  "9011": { city: "St. Gallen", canton: "SG" },
  "9012": { city: "St. Gallen", canton: "SG" },
  "9014": { city: "St. Gallen", canton: "SG" },
  // Lugano
  "6900": { city: "Lugano", canton: "TI" },
  "6901": { city: "Lugano", canton: "TI" },
  "6902": { city: "Lugano", canton: "TI" },
  "6903": { city: "Lugano", canton: "TI" },
  "6904": { city: "Lugano", canton: "TI" },
  // Zug
  "6300": { city: "Zug", canton: "ZG" },
  "6301": { city: "Zug", canton: "ZG" },
  "6302": { city: "Zug", canton: "ZG" },
  "6303": { city: "Zug", canton: "ZG" },
  "6304": { city: "Zug", canton: "ZG" },
  "6312": { city: "Steinhausen", canton: "ZG" },
  "6330": { city: "Cham", canton: "ZG" },
  "6340": { city: "Baar", canton: "ZG" },
  // Aarau / Aargau
  "5000": { city: "Aarau", canton: "AG" },
  "5001": { city: "Aarau", canton: "AG" },
  "5004": { city: "Aarau", canton: "AG" },
  "5400": { city: "Baden", canton: "AG" },
  "5430": { city: "Wettingen", canton: "AG" },
  // Solothurn
  "4500": { city: "Solothurn", canton: "SO" },
  "4502": { city: "Solothurn", canton: "SO" },
  "4600": { city: "Olten", canton: "SO" },
  // Chur
  "7000": { city: "Chur", canton: "GR" },
  "7001": { city: "Chur", canton: "GR" },
  "7002": { city: "Chur", canton: "GR" },
  "7004": { city: "Chur", canton: "GR" },
  // Schaffhausen
  "8200": { city: "Schaffhausen", canton: "SH" },
  "8201": { city: "Schaffhausen", canton: "SH" },
  // Fribourg
  "1700": { city: "Fribourg", canton: "FR" },
  "1701": { city: "Fribourg", canton: "FR" },
  // Neuchâtel
  "2000": { city: "Neuchâtel", canton: "NE" },
  "2001": { city: "Neuchâtel", canton: "NE" },
  // Sion
  "1950": { city: "Sion", canton: "VS" },
  "1951": { city: "Sion", canton: "VS" },
};

// Canton lookup by first digits
function getCantonFromPrefix(postal: string): string | null {
  const prefix = postal.substring(0, 2);
  const cantonMap: Record<string, string> = {
    "10": "VD", "11": "VD", "12": "GE", "13": "VD", "14": "VD",
    "15": "FR", "16": "FR", "17": "FR", "18": "VS", "19": "VS",
    "20": "NE", "21": "NE", "22": "NE", "23": "NE", "24": "NE",
    "25": "BE", "26": "JU", "27": "BE", "28": "BE", "29": "BE",
    "30": "BE", "31": "BE", "32": "BE", "33": "BE", "34": "BE",
    "35": "BE", "36": "BE", "37": "BE", "38": "BE", "39": "VS",
    "40": "BS", "41": "BL", "42": "BL", "43": "BL", "44": "BL",
    "45": "SO", "46": "SO", "47": "SO", "48": "SO", "49": "AG",
    "50": "AG", "51": "AG", "52": "AG", "53": "AG", "54": "AG",
    "55": "AG", "56": "AG", "57": "AG", "58": "AG", "59": "AG",
    "60": "LU", "61": "LU", "62": "LU", "63": "OW", "64": "NW",
    "65": "TI", "66": "TI", "67": "TI", "68": "TI", "69": "TI",
    "70": "GR", "71": "GR", "72": "GR", "73": "GR", "74": "GR",
    "75": "GR", "76": "GR", "77": "GR", "78": "GR", "79": "GR",
    "80": "ZH", "81": "ZH", "82": "ZH", "83": "ZH", "84": "SH",
    "85": "TG", "86": "ZH", "87": "ZH", "88": "SG", "89": "SG",
    "90": "SG", "91": "SG", "92": "SG", "93": "SG", "94": "AR",
    "95": "TG", "96": "TG", "97": "AI",
  };
  return cantonMap[prefix] || null;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { postal_code } = await req.json();

    if (!postal_code) {
      return new Response(JSON.stringify({ 
        valid: false, 
        error: 'postal_code is required' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const cleanPostal = postal_code.toString().trim();

    // Validate format (4 digits for Swiss postal codes)
    if (!/^\d{4}$/.test(cleanPostal)) {
      return new Response(JSON.stringify({ 
        valid: false, 
        error: 'Invalid Swiss postal code format. Must be 4 digits.' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check exact match first
    const exactMatch = swissPostalCodes[cleanPostal];
    if (exactMatch) {
      return new Response(JSON.stringify({ 
        valid: true,
        postal_code: cleanPostal,
        city: exactMatch.city,
        canton: exactMatch.canton,
        country: 'CH'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Try canton lookup by prefix
    const canton = getCantonFromPrefix(cleanPostal);
    if (canton) {
      // Valid Swiss postal code range but not in our detailed list
      return new Response(JSON.stringify({ 
        valid: true,
        postal_code: cleanPostal,
        city: null,
        canton: canton,
        country: 'CH',
        note: 'City lookup not available for this postal code'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Invalid postal code
    return new Response(JSON.stringify({ 
      valid: false, 
      error: 'Invalid Swiss postal code' 
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    console.error('Error in validate-postal-code:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
