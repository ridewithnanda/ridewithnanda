import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

type DriverSubmission = {
  full_name: string;
  phone: string;
  city: string;
  car_model?: string;
  years_experience?: string;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate required fields
    const { full_name, phone, city } = body;
    if (!full_name || !phone || !city) {
      return NextResponse.json(
        { error: "Please provide name, phone, and city" },
        { status: 400 }
      );
    }

    // Prepare data for insertion
    const driverData: DriverSubmission = {
      full_name,
      phone,
      city,
      car_model: body.car_model || null,
      years_experience: body.years_experience || null,
    };

    // Insert into Supabase using admin client
    const { error } = await supabaseAdmin
      .from('drivers')
      .insert(driverData);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: "Failed to submit driver registration. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Driver registration successful!",
      ok: true
    });
  } catch (e: any) {
    console.error('Driver API error:', e);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}


