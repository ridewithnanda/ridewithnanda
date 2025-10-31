import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About RidewithNanda",
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="container-site py-20 md:py-28">
        <h1 className="text-3xl md:text-5xl font-[var(--font-playfair)] font-semibold">About RidewithNanda</h1>
        <p className="mt-4 text-white/80 max-w-3xl">At RideWithNandaa, we make road travel safe, reliable, and personal. With over 15 years of experience, we’ve built a trusted network of verified drivers and transport partners who serve travelers across destinations all over India.</p>
      </section>

      {/* Story */}
      <section className="container-site py-10 grid md:grid-cols-2 gap-10">
        <div className="space-y-4 text-white/85 leading-relaxed">
          <p>
            From airport pickups to outstation journeys and multi‑day trips, our services are designed to provide complete travel support. Our drivers don’t just drop customers—they stay with them, ensuring comfort and reliability until the journey is complete.
          </p>
          <p>
            Whether it’s a ride from Delhi to Uttarakhand’s hill stations, a weekend trip to Jaipur, or longer tours across India, we bring regional insight, transparent coordination, and end‑to‑end care.
          </p>
          <p>
            We’ve delivered thousands of successful journeys over 15 years—maintaining operational excellence, customer trust, and local expertise across India.
          </p>
        </div>
        <div className="space-y-4">
          <div className="rounded-xl border border-white/10 p-6">
            <h3 className="text-xl">Our Mission</h3>
            <p className="mt-2 text-white/75">Make road travel safe, reliable, and personal by connecting travelers with verified local drivers and premium service standards.</p>
          </div>
          <div className="rounded-xl border border-white/10 p-6">
            <h3 className="text-xl">Our Vision</h3>
            <p className="mt-2 text-white/75">To be India’s most trusted road travel network—recognized for professionalism, transparency, and human-centered experiences.</p>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="container-site py-10">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: "15 Years of Proven Trust – Thousands of journeys completed" },
            { title: "Regional & Outstation Expertise – Deep knowledge of Uttarakhand and intercity logistics" },
            { title: "End‑to‑End Service – Drivers who stay with customers for multi‑day travel" },
          ].map((h) => (
            <div key={h.title} className="rounded-xl border border-white/10 p-6 hover:border-brand-gold/60 transition-colors">
              <h3 className="text-lg font-medium">{h.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Routes Focus */}
      <section className="container-site py-10">
        <div className="rounded-xl border border-white/10 p-6">
          <h3 className="text-xl font-medium">Specialized Routes</h3>
          <p className="mt-2 text-white/75">Delhi ↔ Uttarakhand hill stations, Jaipur weekend getaways, and bespoke intercity tours across India.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="container-site py-16 text-center">
        <div className="inline-flex gap-4">
          <Link href="/book" className="btn-gold">Book a Ride</Link>
          <Link href="/drivers" className="inline-flex items-center justify-center rounded-full px-6 py-3 border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-black transition-colors">Join as Driver</Link>
        </div>
      </section>
    </div>
  );
}


