import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
};

const services = [
  {
    title: "Airport Transfers",
    desc: "Punctual airport pickups and drops when you book with us.",
  },
  {
    title: "Outstation Journeys",
    desc: "Reliable intercity travel with clean cars and transparent pricing.",
  },
  {
    title: "Multi-Day Trips",
    desc: "Curated tours with experienced drivers and flexible itineraries.",
  },
  {
    title: "Corporate & Group Travel",
    desc: "Coordinated fleet management for events, offsites, and delegations.",
  },
];

export default function ServicesPage() {
  return (
    <div className="container-site py-20 md:py-28">
      <h1 className="text-3xl md:text-5xl font-[var(--font-playfair)] font-semibold">Services</h1>
      <p className="mt-4 text-white/80 max-w-2xl">Premium, safe, and reliable rides for every journey—short or long.</p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {services.map((s) => (
          <div key={s.title} className="rounded-xl border border-white/10 p-6 hover:border-brand-gold/60 transition-colors">
            <h3 className="mt-3 text-xl font-medium">{s.title}</h3>
            <p className="mt-2 text-white/70 text-sm">{s.desc}</p>
            <div className="mt-5">
              <Link href="/book" className="btn-gold">Book Now</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


