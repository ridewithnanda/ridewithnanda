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
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">City</th>
              <th className="p-3 text-left">Car</th>
              <th className="p-3 text-left">Years</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((d) => (
              <tr key={d.id} className="border-t border-white/10">
                <td className="p-3">
                  <form action={updateDriver} className="flex gap-2 items-center">
                    <input type="hidden" name="id" defaultValue={d.id} />
                    <input name="fullName" defaultValue={d.fullName || ""} className="w-44 rounded-md bg-transparent border border-white/20 px-2 py-1" />
                    <input name="phone" defaultValue={d.phone || ""} className="w-40 rounded-md bg-transparent border border-white/20 px-2 py-1" />
                    <input name="city" defaultValue={d.city || ""} className="w-36 rounded-md bg-transparent border border-white/20 px-2 py-1" />
                    <input name="carModel" defaultValue={d.carModel || ""} className="w-40 rounded-md bg-transparent border border-white/20 px-2 py-1" />
                    <input name="yearsExperience" defaultValue={d.yearsExperience || ""} className="w-24 rounded-md bg-transparent border border-white/20 px-2 py-1" />
                    <button className="btn-gold px-4 py-2">Save</button>
                  </form>
                </td>
                <td colSpan={4}></td>
                <td className="p-3 text-right">
                  <form action={deleteDriver}>
                    <input type="hidden" name="id" defaultValue={d.id} />
                    <button className="text-red-400 hover:underline">Delete</button>
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


