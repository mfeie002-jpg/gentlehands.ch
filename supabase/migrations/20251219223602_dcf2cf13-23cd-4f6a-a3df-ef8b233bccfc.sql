-- Create storage bucket for screenshots
INSERT INTO storage.buckets (id, name, public)
VALUES ('screenshots-archive', 'screenshots-archive', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policy for public read access
CREATE POLICY "Public can view screenshots" ON storage.objects
FOR SELECT USING (bucket_id = 'screenshots-archive');

-- Create policy for authenticated admins to upload
CREATE POLICY "Admins can upload screenshots" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'screenshots-archive' 
  AND auth.uid() IS NOT NULL
);

-- Create policy for admins to delete
CREATE POLICY "Admins can delete screenshots" ON storage.objects
FOR DELETE USING (
  bucket_id = 'screenshots-archive'
  AND auth.uid() IS NOT NULL
);