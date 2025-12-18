import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface TrainingScriptRequest {
  massageType: string;
  massageDescription: string;
  techniques: string[];
  benefits: string[];
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { massageType, massageDescription, techniques, benefits }: TrainingScriptRequest = await req.json();

    if (!massageType) {
      return new Response(
        JSON.stringify({ error: "Massage type is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate a detailed training script
    const script = generateTrainingScript(massageType, massageDescription, techniques, benefits);

    console.log(`Generated training script for: ${massageType}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        script,
        estimatedDuration: Math.ceil(script.split(' ').length / 150) // ~150 words per minute
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: unknown) {
    console.error("Error generating training script:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

function generateTrainingScript(
  massageType: string, 
  description: string, 
  techniques: string[], 
  benefits: string[]
): string {
  const techniquesText = techniques?.length > 0 
    ? techniques.map(t => `- ${t}`).join('\n')
    : '- Klassische Massagetechniken\n- Druckpunktarbeit\n- Streichungen und Knetungen';

  const benefitsText = benefits?.length > 0
    ? benefits.map(b => `- ${b}`).join('\n')
    : '- Entspannung\n- Stressabbau\n- Wohlbefinden';

  return `
# Schulungsvideo: ${massageType}

## Einleitung (0:00 - 1:00)

Willkommen zur GentleHands Schulung für ${massageType}. 
${description || `Diese Massage ist eine unserer beliebtesten Behandlungen und bietet tiefe Entspannung für unsere Kundinnen.`}

In diesem Video lernen Sie alle wichtigen Techniken, die Sie für eine professionelle ${massageType} benötigen.

## Vorbereitung (1:00 - 3:00)

Bevor Sie mit der Massage beginnen, stellen Sie sicher, dass:

1. Der Raum eine angenehme Temperatur hat (ca. 24-26°C)
2. Gedämpftes Licht und beruhigende Musik vorbereitet sind
3. Hochwertige Massageöle oder -cremes bereitstehen
4. Frische, warme Handtücher verfügbar sind
5. Die Massageliege mit frischen Laken bezogen ist

Sprechen Sie vor der Behandlung mit der Kundin über:
- Eventuelle Beschwerden oder Problemzonen
- Bevorzugte Druckintensität
- Bereiche, die vermieden werden sollen

## Haupttechniken (3:00 - 12:00)

### Grundlegende Techniken für ${massageType}:

${techniquesText}

### Detaillierte Anleitung:

**Schritt 1: Einstimmung**
Beginnen Sie mit sanften Streichungen über den gesamten Rücken. Dies wärmt das Gewebe auf und bereitet die Kundin auf die tiefere Arbeit vor.

**Schritt 2: Aufwärmphase**
Verwenden Sie Effleurage (lange, gleitende Bewegungen) um das Öl zu verteilen und die Muskulatur zu erwärmen. Arbeiten Sie immer in Richtung des Herzens.

**Schritt 3: Hauptbehandlung**
Wenden Sie die spezifischen Techniken für ${massageType} an. Achten Sie dabei auf:
- Gleichmässigen Druck
- Fliessende Übergänge zwischen den Techniken
- Regelmässige Rückfragen zum Wohlbefinden

**Schritt 4: Abschluss**
Beenden Sie die Massage mit sanften, ausstreifenden Bewegungen. Geben Sie der Kundin Zeit, langsam wieder zu sich zu kommen.

## Vorteile dieser Massage (12:00 - 14:00)

${massageType} bietet folgende Vorteile:

${benefitsText}

Kommunizieren Sie diese Vorteile der Kundin, um den Wert der Behandlung zu unterstreichen.

## Wichtige Hinweise (14:00 - 15:00)

### Sicherheit und Professionalität:

- Achten Sie stets auf die Grenzen der Kundin
- Fragen Sie regelmässig nach dem Druckempfinden
- Dokumentieren Sie besondere Vorlieben für zukünftige Termine
- Halten Sie höchste Hygienestandards ein

### Kontraindikationen:
- Akute Entzündungen
- Fieber
- Offene Wunden
- Schwangerschaft (je nach Massageart)

Bei Unsicherheiten: Immer die Teamleitung konsultieren.

## Zusammenfassung (15:00 - 16:00)

Sie haben nun alle wichtigen Aspekte der ${massageType} kennengelernt:

1. Professionelle Vorbereitung des Raums und Materials
2. Einfühlsame Kommunikation mit der Kundin
3. Korrekte Anwendung der Massagetechniken
4. Sicherer und respektvoller Umgang

Nach Abschluss dieses Videos können Sie das Quiz absolvieren, um Ihre Zertifizierung zu erhalten.

Viel Erfolg bei GentleHands!
`.trim();
}
