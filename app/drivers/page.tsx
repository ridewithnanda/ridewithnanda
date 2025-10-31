import Link from "next/link";
import { Metadata } from "next";
import DriverForm from "@/components/forms/DriverForm";

export const metadata: Metadata = {
  title: "Drivers – Join the Network",
};

const benefits = [
  { title: "Steady Rides", desc: "Consistent bookings from verified travelers and partners." },
  { title: "Verified Listings", desc: "Showcase your car, routes, and ratings to the right audience." },
  { title: "Simple Subscription", desc: "₹499/month to access the network and tools." },
];

export default function DriversPage() {
  return (
    <div className="container-site py-20 md:py-28">
      <h1 className="text-3xl md:text-5xl font-[var(--font-playfair)] font-semibold">Join India’s Most Trusted Driver Network</h1>
      <p className="mt-4 text-white/80 max-w-2xl">Grow your business with steady rides, verified listings, and premium customers.</p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {benefits.map((b) => (
          <div key={b.title} className="rounded-xl border border-white/10 p-6">
            <h3 className="text-lg font-medium">{b.title}</h3>
            <p className="mt-2 text-white/70 text-sm">{b.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-white/10 p-6">
        <h2 className="text-xl font-medium">Driver Registration</h2>
        <p className="mt-2 text-white/70 text-sm">Fill the form below. We’ll verify your details and get in touch.</p>
        <div className="mt-6">
          <DriverForm />
        </div>
      </div>
    </div>
  );
}


