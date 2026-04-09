-- RLS policy for reading registrations (admin)
CREATE POLICY "Authenticated read course_registrations" ON course_registrations FOR SELECT USING (true);
CREATE POLICY "Authenticated read masterclass_registrations" ON masterclass_registrations FOR SELECT USING (true);

-- Note: Database webhooks are configured in Supabase Dashboard:
-- Database → Webhooks → New Webhook
-- Table: course_registrations, Event: INSERT
-- URL: https://fmniknisrfdcmwkdhtfg.supabase.co/functions/v1/on-registration
-- Headers: Authorization: Bearer <service_role_key>
--
-- Same for masterclass_registrations table.
