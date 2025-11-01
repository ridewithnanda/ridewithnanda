import { createClient } from "@supabase/supabase-js";

// Create a single instance of the admin client.
// We avoid exporting from inside conditional blocks so module exports remain static.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceKey = process.env.SUPABASE_SERVICE_KEY || '';

const mockClient = {
  from: () => ({
    select: () => ({
      order: () => Promise.resolve({ data: [], error: null }),
      limit: () => ({ maybeSingle: () => Promise.resolve({ data: null, error: null }) }),
    }),
    insert: () => Promise.resolve({ data: null, error: null }),
    update: () => ({ eq: () => Promise.resolve({ data: null, error: null }) }),
    delete: () => ({ eq: () => Promise.resolve({ data: null, error: null }) }),
  }),
};

function createAdminClient() {
  // If service key or url are missing at build time, fall back to mockClient.
  if (!serviceKey || !url) {
    // During Next.js build, environment variables may not be available — use mock to avoid build-time failures.
    // At runtime (production), ensure you set SUPABASE_SERVICE_KEY and NEXT_PUBLIC_SUPABASE_URL.
    // eslint-disable-next-line no-console
    console.warn('Supabase admin keys missing; using mock supabaseAdmin client.');
    return mockClient as any;
  }

  return createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export const supabaseAdmin = createAdminClient();

export default supabaseAdmin;

// Named helper for code that expects a factory-style getter.
export function getSupabaseAdmin() {
  return supabaseAdmin;
}
