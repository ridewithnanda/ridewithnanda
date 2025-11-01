import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    
    // Validate email format
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Insert into Supabase using admin client
    const { error } = await supabaseAdmin
      .from('subscribers')
      .insert({ email });

    if (error) {
      // Handle unique constraint violation
      if (error.code === '23505') {
        return NextResponse.json(
          { error: "This email is already subscribed" },
          { status: 400 }
        );
      }
      
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: "Failed to subscribe. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Successfully subscribed!",
      ok: true
    });
  } catch (e: any) {
    console.error('Subscribe API error:', e);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}


