import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Custom fetch removes the Authorization header so the new sb_publishable_* keys
// are only sent via the apikey header. GoTrue rejects them when also presented as Bearer.
const customFetch: typeof fetch = (input, init) => {
  const headers = new Headers(init?.headers);
  headers.delete('authorization');
  return fetch(input, { ...init, headers });
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: { fetch: customFetch },
  auth: { persistSession: false, autoRefreshToken: false },
});
