ALTER TABLE courses ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS mentor_photo TEXT;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS mentor_bio TEXT;

-- Storage bucket for course-related assets (public read)
INSERT INTO storage.buckets (id, name, public)
VALUES ('course-assets', 'course-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users (admin) to upload/update/delete
CREATE POLICY "Authenticated upload course-assets" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'course-assets');

CREATE POLICY "Authenticated update course-assets" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'course-assets');

CREATE POLICY "Authenticated delete course-assets" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'course-assets');

CREATE POLICY "Public read course-assets" ON storage.objects
  FOR SELECT TO public USING (bucket_id = 'course-assets');
