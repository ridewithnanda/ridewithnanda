import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

async function getDrivers() {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase.from("drivers").select("id, fullName, phone, city, carModel, yearsExperience").order("id", { ascending: false });
  return data ?? [];
}

export default async function AdminDriversPage() {
  const drivers = await getDrivers();

  async function updateDriver(formData: FormData) {
    "use server";
    const supabase = getSupabaseAdmin();
    const id = Number(formData.get("id"));
    const payload = {
      fullName: String(formData.get("fullName") || ""),
      phone: String(formData.get("phone") || ""),
      city: String(formData.get("city") || ""),
      carModel: String(formData.get("carModel") || ""),
      yearsExperience: String(formData.get("yearsExperience") || ""),
    };
    await supabase.from("drivers").update(payload).eq("id", id);
  }

  async function deleteDriver(formData: FormData) {
    "use server";
    const supabase = getSupabaseAdmin();
    const id = Number(formData.get("id"));
    await supabase.from("drivers").delete().eq("id", id);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-[var(--font-playfair)] font-semibold">Drivers</h1>
      <div className="rounded-xl border border-white/10 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-white/70">
            <tr>
              <th className="p-3 text-left">Driver Details</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((d) => (
              <tr key={d.id} className="border-t border-white/10">
                <td className="p-3">
                  <form action={updateDriver} className="inline-flex gap-2 w-full">
                    <input type="hidden" name="id" defaultValue={d.id} />
                    <input name="fullName" defaultValue={d.fullName || ""} placeholder="Name" className="flex-1 rounded-md bg-transparent border border-white/20 px-2 py-1 text-sm" />
                    <input name="phone" defaultValue={d.phone || ""} placeholder="Phone" className="w-32 rounded-md bg-transparent border border-white/20 px-2 py-1 text-sm" />
                    <input name="city" defaultValue={d.city || ""} placeholder="City" className="w-28 rounded-md bg-transparent border border-white/20 px-2 py-1 text-sm" />
                    <input name="carModel" defaultValue={d.carModel || ""} placeholder="Car" className="w-32 rounded-md bg-transparent border border-white/20 px-2 py-1 text-sm" />
                    <input name="yearsExperience" defaultValue={d.yearsExperience || ""} placeholder="Years" className="w-20 rounded-md bg-transparent border border-white/20 px-2 py-1 text-sm" />
                    <button type="submit" className="btn-gold px-3 py-1 text-xs">Save</button>
                  </form>
                </td>
                <td className="p-3">
                  <form action={deleteDriver}>
                    <input type="hidden" name="id" defaultValue={d.id} />
                    <button type="submit" className="text-red-400 hover:underline text-xs">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
            {drivers.length === 0 && (
              <tr><td className="p-4 text-white/60">No drivers yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


