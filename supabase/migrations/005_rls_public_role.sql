DROP POLICY IF EXISTS "Anyone can register for courses" ON course_registrations;
DROP POLICY IF EXISTS "Anyone can register for masterclasses" ON masterclass_registrations;

CREATE POLICY "Public register courses" ON course_registrations FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Public register masterclasses" ON masterclass_registrations FOR INSERT TO public WITH CHECK (true);
