-- =============================================
-- PART 5: STORAGE BUCKET FOR REVIEWS
-- =============================================

-- Create review-photos bucket (private)
INSERT INTO storage.buckets (id, name, public)
VALUES ('review-photos', 'review-photos', false)
ON CONFLICT (id) DO NOTHING;

-- RLS Policies for review-photos bucket
CREATE POLICY "Authenticated users can upload review photos"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'review-photos' 
  AND auth.uid() IS NOT NULL
);

CREATE POLICY "Anyone can view review photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'review-photos');

CREATE POLICY "Users can delete own review photos"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'review-photos' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);