import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

type BookingSubmission = {
  full_name: string;
  phone: string;
  pickup_city: string;
  drop_city: string;
  date?: string;
  notes?: string;
  status: 'pending';
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate required fields
    const { full_name, phone, pickup_city, drop_city } = body;
    if (!full_name || !phone || !pickup_city || !drop_city) {
      return NextResponse.json(
        { error: "Please provide all required fields: name, phone, pickup city, and drop city" },
        { status: 400 }
      );
    }

    // Prepare data for insertion
    const bookingData: BookingSubmission = {
      full_name,
      phone,
      pickup_city,
      drop_city,
      date: body.date || null,
      notes: body.notes || null,
      status: 'pending'
    };

    // Insert into Supabase using admin client
    const { error } = await supabaseAdmin
      .from('bookings')
      .insert(bookingData);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: "Failed to submit booking. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Booking submitted successfully!",
      ok: true
    });
  } catch (e: any) {
    console.error('Booking API error:', e);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}


