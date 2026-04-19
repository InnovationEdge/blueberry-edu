-- Fix: Allow authenticated users (admin) to manage courses, syllabus, FAQ
-- Previously only SELECT was allowed, blocking INSERT/UPDATE/DELETE from admin panel

-- Courses: admin can do everything
CREATE POLICY "Admin insert courses" ON courses FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update courses" ON courses FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete courses" ON courses FOR DELETE TO authenticated USING (true);

-- Course syllabus: enable RLS + policies
ALTER TABLE course_syllabus ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read syllabus" ON course_syllabus FOR SELECT USING (true);
CREATE POLICY "Admin insert syllabus" ON course_syllabus FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update syllabus" ON course_syllabus FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete syllabus" ON course_syllabus FOR DELETE TO authenticated USING (true);

-- Course FAQ: enable RLS + policies
ALTER TABLE course_faq ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read faq" ON course_faq FOR SELECT USING (true);
CREATE POLICY "Admin insert faq" ON course_faq FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update faq" ON course_faq FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete faq" ON course_faq FOR DELETE TO authenticated USING (true);

-- Masterclasses: enable RLS + policies
ALTER TABLE masterclasses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read masterclasses" ON masterclasses FOR SELECT USING (true);
CREATE POLICY "Admin insert masterclasses" ON masterclasses FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update masterclasses" ON masterclasses FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete masterclasses" ON masterclasses FOR DELETE TO authenticated USING (true);

-- Landing content tables: admin management
ALTER TABLE landing_stats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read stats" ON landing_stats FOR SELECT USING (true);
CREATE POLICY "Admin manage stats" ON landing_stats FOR ALL TO authenticated USING (true) WITH CHECK (true);

ALTER TABLE landing_testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read testimonials" ON landing_testimonials FOR SELECT USING (true);
CREATE POLICY "Admin manage testimonials" ON landing_testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);

ALTER TABLE landing_faq ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read landing_faq" ON landing_faq FOR SELECT USING (true);
CREATE POLICY "Admin manage landing_faq" ON landing_faq FOR ALL TO authenticated USING (true) WITH CHECK (true);
