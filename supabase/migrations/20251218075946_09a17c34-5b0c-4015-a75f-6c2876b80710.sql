
-- Create storage bucket for therapist photos if not exists
INSERT INTO storage.buckets (id, name, public) 
VALUES ('therapist-photos', 'therapist-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to view photos
CREATE POLICY "Public can view therapist photos" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'therapist-photos');

-- Allow authenticated users to upload photos
CREATE POLICY "Authenticated users can upload therapist photos" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'therapist-photos' AND auth.role() = 'authenticated');
