import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from("subscribers").select("email, created_at").order("id", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const rows = [["email", "created_at"], ...(data || []).map((r: any) => [r.email, r.created_at])];
  const csv = rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}` + `"`).join(",")).join("\n");
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=subscribers.csv",
    },
  });
}


