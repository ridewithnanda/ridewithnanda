import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = 'force-dynamic';

type Booking = {
  id: number;
  fullName: string | null;
  phone: string | null;
  pickupCity: string | null;
  dropCity: string | null;
  date: string | null;
  notes: string | null;
  status: string | null;
};

async function getBookings(): Promise<Booking[]> {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from("bookings")
    .select("id, fullName, phone, pickupCity, dropCity, date, notes, status")
    .order("id", { ascending: false });
  return (data ?? []) as Booking[];
}

export default async function AdminBookingsPage() {
  const bookings = await getBookings();

  async function markCompleted(formData: FormData) {
    "use server";
    const supabase = getSupabaseAdmin();
    const id = Number(formData.get("id"));
    await supabase.from("bookings").update({ status: "completed" }).eq("id", id);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-[var(--font-playfair)] font-semibold">Bookings</h1>
      <div className="rounded-xl border border-white/10 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-white/70">
            <tr>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Route</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b: Booking) => (
              <tr key={b.id} className="border-t border-white/10">
                <td className="p-3">{b.fullName} · {b.phone}</td>
                <td className="p-3">{b.pickupCity} → {b.dropCity}</td>
                <td className="p-3">{b.date || "—"}</td>
                <td className="p-3">{b.status || "pending"}</td>
                <td className="p-3 text-right">
                  {b.status !== "completed" && (
                    <form action={markCompleted}>
                      <input type="hidden" name="id" defaultValue={b.id} />
                      <button className="btn-gold px-4 py-2">Mark completed</button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr><td className="p-4 text-white/60">No bookings yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


