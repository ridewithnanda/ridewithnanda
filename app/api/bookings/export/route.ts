import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = 'force-dynamic';

export async function GET() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("bookings")
    .select("fullName, phone, pickupCity, dropCity, date, notes, status, submittedAt")
    .order("id", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const rows = [
    ["Full Name", "Phone", "Pickup City", "Drop City", "Date", "Notes", "Status", "Submitted At"],
    ...(data || []).map((r: any) => [
      r.fullName,
      r.phone,
      r.pickupCity,
      r.dropCity,
      r.date || "",
      r.notes || "",
      r.status,
      r.submittedAt
    ])
  ];

    const csv = rows.map((r: any) => r.map((v: any) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
  
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=bookings.csv",
    },
  });
}