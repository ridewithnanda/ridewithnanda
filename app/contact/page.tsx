import Link from "next/link";
import { Metadata } from "next";
import SubscribeForm from "@/components/SubscribeForm";

export const metadata: Metadata = {
  title: "Get in Touch",
};

export default function ContactPage() {
  return (
    <div className="container-site py-20 md:py-28">
      <h1 className="text-3xl md:text-5xl font-[var(--font-playfair)] font-semibold">Get in Touch</h1>
      <p className="mt-4 text-white/80">We’d love to help you plan your journey.</p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-white/10 p-6">
          <h3 className="text-lg font-medium">WhatsApp</h3>
          <p className="mt-1 text-white/70 text-sm">Quickest way to chat with us.</p>
          <div className="mt-4">
            <Link href="https://wa.me/919990051602" target="_blank" className="btn-gold">Open WhatsApp</Link>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 p-6">
          <h3 className="text-lg font-medium">Email</h3>
          <p className="mt-1 text-white/70 text-sm">For detailed itineraries or group bookings.</p>
          <div className="mt-4">
            <Link href="mailto:ridewithnanda@gmail.com" className="btn-gold">ridewithnanda@gmail.com</Link>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 p-6">
          <h3 className="text-lg font-medium">Instagram</h3>
          <p className="mt-1 text-white/70 text-sm">Travel stories and highlights.</p>
          <div className="mt-4">
            <Link href="https://instagram.com/ridewithnandaa" target="_blank" className="btn-gold">@ridewithnandaa</Link>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 p-6">
          <h3 className="text-lg font-medium">Linktree</h3>
          <p className="mt-1 text-white/70 text-sm">All links in one place.</p>
          <div className="mt-4">
            <Link href="https://linktr.ee/ridewithnandaa" target="_blank" className="btn-gold">Open Linktree</Link>
          </div>
        </div>
      </div>

      <section className="mt-16 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold font-[var(--font-playfair)]">Join our Travel Club</h2>
        <p className="mt-2 text-white/80">Get exclusive travel deals, trip ideas, and driver offers.</p>
        <div className="mt-6">
          <SubscribeForm />
        </div>
      </section>
    </div>
  );
}


