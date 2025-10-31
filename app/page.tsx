"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SubscribeForm from "@/components/SubscribeForm";

// Title is set via layout template

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="gold-gradient absolute inset-0 pointer-events-none" />
        <div className="container-site py-24 md:py-32 text-center">
          <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-[var(--font-playfair)] text-4xl md:text-6xl font-semibold">
            RidewithNanda
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mt-4 text-lg md:text-xl text-white/80">
            Trusted Taxi & Travel Network – 15 Years of Reliable Journeys
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-8 flex items-center justify-center gap-4">
            <Link href="/book" className="btn-gold">Book a Ride</Link>
            <Link href="/drivers" className="inline-flex items-center justify-center rounded-full px-6 py-3 border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-black transition-colors">Join as Driver</Link>
          </motion.div>
        </div>
      </section>

      {/* About Preview */}
      <section className="container-site py-16">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2">
            <h2 className="text-2xl md:text-3xl font-semibold font-[var(--font-playfair)]">About RidewithNanda</h2>
            <p className="mt-4 text-white/80">At RideWithNandaa, we make road travel safe, reliable, and personal. With a trusted network of verified drivers across India, we support airport pickups, outstation journeys, and multi‑day trips—with drivers who stay with you till your journey is complete.</p>
          </div>
          <div className="md:text-right">
            <Link href="/about" className="btn-gold">Learn More</Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="container-site py-16">
        <h2 className="text-2xl md:text-3xl font-semibold font-[var(--font-playfair)] text-center">Our Services</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {[
            { title: "Airport Pickups", desc: "Timely airport pickups and drops when you book with us." },
            { title: "Outstation Trips", desc: "Comfortable intercity journeys with trusted drivers." },
            { title: "Multi-Day Tours", desc: "Curated itineraries and experienced tour drivers." },
          ].map((s) => (
            <div key={s.title} className="rounded-xl border border-white/10 p-6 hover:border-brand-gold/60 transition-colors">
              <h3 className="mt-3 text-xl font-medium">{s.title}</h3>
              <p className="mt-2 text-white/70 text-sm">{s.desc}</p>
              <div className="mt-5">
                <Link href="/book" className="inline-flex text-brand-gold hover:underline">Book Now →</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Placeholder */}
      <section className="container-site py-16 text-center">
        <p className="text-white/80">Thousands of happy journeys completed across India.</p>
      </section>

      {/* CTA Footer */}
      <section className="py-16">
        <div className="container-site bg-brand-gold/10 border border-brand-gold/30 rounded-2xl p-10 text-center">
          <h3 className="text-2xl md:text-3xl font-semibold font-[var(--font-playfair)]">Ready to Ride?</h3>
          <p className="mt-2 text-white/80">Chat on WhatsApp or book your ride in seconds.</p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <Link href="https://wa.me/919990051602" target="_blank" className="btn-gold">WhatsApp</Link>
            <Link href="/book" className="inline-flex items-center justify-center rounded-full px-6 py-3 border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-black transition-colors">Book Now</Link>
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <section className="container-site py-16 text-center">
        <h3 className="text-2xl md:text-3xl font-semibold font-[var(--font-playfair)]">Join our Travel Club</h3>
        <p className="mt-2 text-white/80">Get exclusive travel deals, trip ideas, and driver offers straight to your inbox.</p>
        <div className="mt-6">
          <SubscribeForm />
        </div>
      </section>
    </div>
  );
}


