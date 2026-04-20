import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? 'https://fmniknisrfdcmwkdhtfg.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? 'sb_publishable_OyneDzs_3yhJ6hJOWUZKlg_uF4CYVDj';

// Service role key for admin operations (bypasses RLS)
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_KEY ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtbmlrbmlzcmZkY213a2RodGZnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTYzMzE2NSwiZXhwIjoyMDkxMjA5MTY1fQ.eTpSwzv1CY9boixuG29A0ra7C7KoL8KyTX5S0x8mr4s';

// Auth client (for login/logout — uses anon key)
export const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey);

// Data client (for CRUD — uses service_role to bypass RLS)
// Disable auth persistence so it always uses the service_role key, not user JWT
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
});
