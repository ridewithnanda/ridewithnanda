import Link from "next/link";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

async function getSubscribers() {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase.from("subscribers").select("id, email, created_at").order("id", { ascending: false });
  return data ?? [];
}

export default async function SubscribersPage() {
  const subs = await getSubscribers();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-[var(--font-playfair)] font-semibold">Subscribers</h1>
        <Link href="/api/subscribers/export" className="btn-gold">Export CSV</Link>
      </div>
      <div className="rounded-xl border border-white/10 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-white/70"><tr><th className="p-3 text-left">Email</th><th className="p-3 text-left">Date</th></tr></thead>
          <tbody>
            {subs.map((s: any) => (
              <tr key={s.id} className="border-t border-white/10"><td className="p-3">{s.email}</td><td className="p-3">{new Date(s.created_at).toLocaleString()}</td></tr>
            ))}
            {subs.length === 0 && (<tr><td className="p-4 text-white/60">No subscribers yet.</td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}


