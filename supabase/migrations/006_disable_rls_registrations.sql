ALTER TABLE course_registrations DISABLE ROW LEVEL SECURITY;
ALTER TABLE masterclass_registrations DISABLE ROW LEVEL SECURITY;
REVOKE SELECT, UPDATE, DELETE ON course_registrations FROM anon;
REVOKE SELECT, UPDATE, DELETE ON masterclass_registrations FROM anon;
GRANT INSERT ON course_registrations TO anon;
GRANT INSERT ON masterclass_registrations TO anon;
GRANT USAGE, SELECT ON SEQUENCE course_registrations_id_seq TO anon;
GRANT USAGE, SELECT ON SEQUENCE masterclass_registrations_id_seq TO anon;
