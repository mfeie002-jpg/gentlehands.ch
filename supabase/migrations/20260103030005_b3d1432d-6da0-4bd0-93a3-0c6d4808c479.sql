-- Create room_phases table for storing room development phases
CREATE TABLE public.room_phases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id TEXT NOT NULL,
  room_name TEXT NOT NULL,
  phase INTEGER NOT NULL CHECK (phase >= 1 AND phase <= 3),
  phase_name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  equipment_list JSONB DEFAULT '[]'::jsonb,
  estimated_cost NUMERIC DEFAULT 0,
  actual_cost NUMERIC DEFAULT 0,
  completion_percentage INTEGER DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
  is_current BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(room_id, phase)
);

-- Create room_setup_checklist table for tracking setup items
CREATE TABLE public.room_setup_checklist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  room_phase_id UUID REFERENCES public.room_phases(id) ON DELETE CASCADE,
  item_name TEXT NOT NULL,
  item_description TEXT,
  category TEXT DEFAULT 'equipment',
  is_completed BOOLEAN DEFAULT false,
  estimated_cost NUMERIC DEFAULT 0,
  actual_cost NUMERIC DEFAULT 0,
  purchase_link TEXT,
  priority INTEGER DEFAULT 1,
  notes TEXT,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.room_phases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_setup_checklist ENABLE ROW LEVEL SECURITY;

-- Policies for room_phases
CREATE POLICY "Anyone can view room phases" 
ON public.room_phases 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage room phases" 
ON public.room_phases 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Policies for room_setup_checklist
CREATE POLICY "Anyone can view checklist items" 
ON public.room_setup_checklist 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage checklist items" 
ON public.room_setup_checklist 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_room_phases_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_room_phases_updated_at
BEFORE UPDATE ON public.room_phases
FOR EACH ROW
EXECUTE FUNCTION public.update_room_phases_updated_at();

CREATE TRIGGER update_room_setup_checklist_updated_at
BEFORE UPDATE ON public.room_setup_checklist
FOR EACH ROW
EXECUTE FUNCTION public.update_room_phases_updated_at();

-- Insert initial data for all 6 rooms with 3 phases each
INSERT INTO public.room_phases (room_id, room_name, phase, phase_name, description, estimated_cost, is_current) VALUES
-- Ozean & Palmen
('ozean', 'Ozean & Palmen', 1, 'Basic', 'Grundausstattung mit Premium-Liege, blauen LED-Akzenten und Strand-Atmosphäre', 200, true),
('ozean', 'Ozean & Palmen', 2, 'Standard', 'Projektor mit Wellenanimation, hochwertigere Beleuchtung und Sound', 500, false),
('ozean', 'Ozean & Palmen', 3, 'Premium', '360-Grad Immersion mit Surround-Sound und Profi-Wellness-Setup', 1000, false),

-- Alpine Stille
('alpine', 'Alpine Stille', 1, 'Basic', 'Holzdeko, LED-Kerzen und warme Beleuchtung mit Kamin-Liege', 150, true),
('alpine', 'Alpine Stille', 2, 'Standard', 'Holzwand-Panels, Kuhfell-Elemente und Philips Hue Lichtsteuerung', 600, false),
('alpine', 'Alpine Stille', 3, 'Premium', 'Echte Holzverkleidung, Smart Home Steuerung und Hi-Fi Sound', 1200, false),

-- Deep Dark Relax
('dark', 'Deep Dark Relax', 1, 'Basic', 'Blackout-Vorhänge, Salzlampen und minimalistisches Setup', 100, true),
('dark', 'Deep Dark Relax', 2, 'Standard', 'Sternenhimmel-Projektor, Akustik-Panels und Vibrations-System', 400, false),
('dark', 'Deep Dark Relax', 3, 'Premium', 'Float-Elemente, Körperschall-Liege und App-Steuerung', 800, false),

-- Urban Loft
('urban', 'Urban Loft', 1, 'Basic', 'Industrial-Deko, LED-Spots und moderne Akzente', 200, true),
('urban', 'Urban Loft', 2, 'Standard', 'Beton-Panels, Smart-LEDs und Premium-Speaker', 600, false),
('urban', 'Urban Loft', 3, 'Premium', 'Designer-Möbel, B&O Sound und Espresso-Ecke', 1000, false),

-- Zen Garden
('zen', 'Zen Garden', 1, 'Basic', 'Bambus-Elemente, warme Lampen und Räucherstäbchen', 150, true),
('zen', 'Zen Garden', 2, 'Standard', 'Mini-Brunnen, Papierlampen und echte Klangschalen', 500, false),
('zen', 'Zen Garden', 3, 'Premium', 'Tatami-Matten, Shoji-Wände und Matcha-Ecke', 1000, false),

-- Surprise Experience
('surprise', 'Surprise Experience', 1, 'Basic', 'Flexible Basis-Elemente aller Themen kombiniert', 300, true),
('surprise', 'Surprise Experience', 2, 'Standard', 'Multi-Projektion und Smart-Steuerung für Themenwechsel', 700, false),
('surprise', 'Surprise Experience', 3, 'Premium', 'Vollständig transformierbarer Raum per iPad-App', 1500, false);