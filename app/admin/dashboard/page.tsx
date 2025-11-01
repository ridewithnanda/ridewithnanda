import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const supabase = getSupabaseAdmin();
  const [driversRes, bookingsRes, subsRes] = await Promise.all([
    supabase.from("drivers").select("id", { count: "exact", head: true }),
    supabase.from("bookings").select("id", { count: "exact", head: true }),
    supabase.from("subscribers").select("id", { count: "exact", head: true }),
  ]);
  const drivers = driversRes?.count ?? 0;
  const bookings = bookingsRes?.count ?? 0;
  const subs = subsRes?.count ?? 0;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-[var(--font-playfair)] font-semibold">Dashboard</h1>
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-white/10 p-5"><div className="text-sm text-white/70">Drivers</div><div className="mt-1 text-3xl">{drivers ?? 0}</div></div>
        <div className="rounded-xl border border-white/10 p-5"><div className="text-sm text-white/70">Bookings</div><div className="mt-1 text-3xl">{bookings ?? 0}</div></div>
        <div className="rounded-xl border border-white/10 p-5"><div className="text-sm text-white/70">Subscribers</div><div className="mt-1 text-3xl">{subs ?? 0}</div></div>
      </div>
    </div>
  );
}


