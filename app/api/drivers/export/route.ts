import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = 'force-dynamic';

export async function GET() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("drivers")
    .select("fullName, phone, city, carModel, yearsExperience, submittedAt")
    .order("id", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const rows = [
    ["Full Name", "Phone", "City", "Car Model", "Years Experience", "Submitted At"],
    ...(data || []).map((r: any) => [
      r.fullName,
      r.phone,
      r.city,
      r.carModel || "",
      r.yearsExperience || "",
      r.submittedAt
    ])
  ];

  const csv = rows.map((r: any) => r.map((v: any) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
  
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=drivers.csv",
    },
  });
}