-- Add position_x and position_y columns to room_setup_checklist for product positions
ALTER TABLE public.room_setup_checklist 
ADD COLUMN IF NOT EXISTS position_x numeric DEFAULT 50,
ADD COLUMN IF NOT EXISTS position_y numeric DEFAULT 50;

-- Add phase_image_url to room_phases for AI-generated room images
ALTER TABLE public.room_phases 
ADD COLUMN IF NOT EXISTS phase_image_url text;

-- Create an index for faster lookups
CREATE INDEX IF NOT EXISTS idx_room_setup_checklist_room_phase 
ON public.room_setup_checklist(room_phase_id);

-- Update RLS policies to allow authenticated users to update positions
CREATE POLICY "Authenticated users can update checklist positions" 
ON public.room_setup_checklist 
FOR UPDATE 
USING (true)
WITH CHECK (true);