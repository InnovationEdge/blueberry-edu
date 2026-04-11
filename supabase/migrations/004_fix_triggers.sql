DROP TRIGGER IF EXISTS on_course_registration ON course_registrations;
DROP TRIGGER IF EXISTS on_masterclass_registration ON masterclass_registrations;
DROP FUNCTION IF EXISTS notify_course_registration();
DROP FUNCTION IF EXISTS notify_masterclass_registration();

CREATE OR REPLACE FUNCTION notify_course_registration()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM net.http_post(
    url := 'https://fmniknisrfdcmwkdhtfg.supabase.co/functions/v1/on-registration',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := jsonb_build_object('type', 'INSERT', 'table', 'course_registrations', 'record', row_to_json(NEW)::jsonb)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION notify_masterclass_registration()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM net.http_post(
    url := 'https://fmniknisrfdcmwkdhtfg.supabase.co/functions/v1/on-registration',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := jsonb_build_object('type', 'INSERT', 'table', 'masterclass_registrations', 'record', row_to_json(NEW)::jsonb)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_course_registration
  AFTER INSERT ON course_registrations
  FOR EACH ROW EXECUTE FUNCTION notify_course_registration();

CREATE TRIGGER on_masterclass_registration
  AFTER INSERT ON masterclass_registrations
  FOR EACH ROW EXECUTE FUNCTION notify_masterclass_registration();
