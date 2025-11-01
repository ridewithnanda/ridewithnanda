import { createClient } from "@supabase/supabase-js";

export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) {
    // During build time (when NEXT_PHASE is set), return mock to prevent build errors
    // Pages with dynamic='force-dynamic' won't be statically generated, but Next.js still checks them
    if (process.env.NEXT_PHASE === 'phase-production-build' || process.env.NEXT_PHASE === 'phase-production-compile') {
      return {
        from: () => ({
          select: (cols: string, opts?: { count?: string; head?: boolean }) => {
            // Handle count queries
            if (opts?.count) {
              return Promise.resolve({ data: null, count: 0, error: null });
            }
            // Regular select queries
            return {
              order: () => Promise.resolve({ data: [], error: null }),
              limit: () => ({ maybeSingle: () => Promise.resolve({ data: null, error: null }) }),
            };
          },
          insert: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
          update: () => ({ eq: () => Promise.resolve({ data: null, error: null }) }),
          delete: () => ({ eq: () => Promise.resolve({ data: null, error: null }) }),
        }),
      } as any;
    }
    throw new Error("Missing Supabase environment variables: SUPABASE_URL and SUPABASE_SERVICE_KEY must be set");
  }
  return createClient(url, key, {
    auth: {
      persistSession: false,
    },
  });
}
