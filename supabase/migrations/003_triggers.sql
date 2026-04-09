CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

CREATE OR REPLACE FUNCTION notify_course_registration()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM extensions.http_post(
    'https://fmniknisrfdcmwkdhtfg.supabase.co/functions/v1/on-registration',
    jsonb_build_object('type', 'INSERT', 'table', 'course_registrations', 'record', row_to_json(NEW)::jsonb)::text,
    'application/json'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION notify_masterclass_registration()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM extensions.http_post(
    'https://fmniknisrfdcmwkdhtfg.supabase.co/functions/v1/on-registration',
    jsonb_build_object('type', 'INSERT', 'table', 'masterclass_registrations', 'record', row_to_json(NEW)::jsonb)::text,
    'application/json'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_course_registration ON course_registrations;
CREATE TRIGGER on_course_registration
  AFTER INSERT ON course_registrations
  FOR EACH ROW EXECUTE FUNCTION notify_course_registration();

DROP TRIGGER IF EXISTS on_masterclass_registration ON masterclass_registrations;
CREATE TRIGGER on_masterclass_registration
  AFTER INSERT ON masterclass_registrations
  FOR EACH ROW EXECUTE FUNCTION notify_masterclass_registration();
