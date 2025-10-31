import { Metadata } from "next";
import BookingForm from "@/components/forms/BookingForm";

export const metadata: Metadata = {
  title: "Book a Ride",
};

export default function BookPage() {
  return (
    <div className="container-site py-20 md:py-28">
      <h1 className="text-3xl md:text-5xl font-[var(--font-playfair)] font-semibold">Book Your Ride with RidewithNanda</h1>
      <p className="mt-4 text-white/80">Safe, reliable, and verified travel across India.</p>

      <div className="mt-10 rounded-xl border border-white/10 p-6">
        <BookingForm />
      </div>
    </div>
  );
}


