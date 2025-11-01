"use client";

import { useState, useRef } from "react";

type BookingPayload = {
  fullName: string;
  phone: string;
  pickupCity: string;
  dropCity: string;
  date?: string;
  notes?: string;
};

export default function BookingForm() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setOk(false);
    const formData = new FormData(e.currentTarget);
    const payload: BookingPayload = {
      fullName: String(formData.get("fullName") || ""),
      phone: String(formData.get("phone") || ""),
      pickupCity: String(formData.get("pickupCity") || ""),
      dropCity: String(formData.get("dropCity") || ""),
      date: String(formData.get("date") || ""),
      notes: String(formData.get("notes") || ""),
    };
    if (!payload.fullName || !payload.phone || !payload.pickupCity || !payload.dropCity) {
      setError("Please fill required fields.");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: payload.fullName,
          phone: payload.phone,
          pickup_city: payload.pickupCity,
          drop_city: payload.dropCity,
          date: payload.date || null,
          notes: payload.notes || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit booking");
      setOk(true);
      // reset form fields
      e.currentTarget.reset();
    } catch (e: any) {
      setError(e?.message || "Something went wrong");
      // eslint-disable-next-line no-console
      console.error("Booking submission error:", e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="fullName" className="block text-sm text-white/70">Full Name*</label>
          <input id="fullName" name="fullName" required className="mt-1 w-full rounded-md bg-transparent border border-white/20 px-3 py-2 focus:outline-none focus:border-white/50" />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm text-white/70">Phone (WhatsApp)*</label>
          <input id="phone" name="phone" required inputMode="tel" className="mt-1 w-full rounded-md bg-transparent border border-white/20 px-3 py-2 focus:outline-none focus:border-white/50" />
        </div>
        <div>
          <label htmlFor="pickupCity" className="block text-sm text-white/70">Pickup City*</label>
          <input id="pickupCity" name="pickupCity" required className="mt-1 w-full rounded-md bg-transparent border border-white/20 px-3 py-2 focus:outline-none focus:border-white/50" />
        </div>
        <div>
          <label htmlFor="dropCity" className="block text-sm text-white/70">Drop City*</label>
          <input id="dropCity" name="dropCity" required className="mt-1 w-full rounded-md bg-transparent border border-white/20 px-3 py-2 focus:outline-none focus:border-white/50" />
        </div>
        <div>
          <label htmlFor="date" className="block text-sm text-white/70">Date</label>
          <input id="date" name="date" type="date" className="mt-1 w-full rounded-md bg-transparent border border-white/20 px-3 py-2 focus:outline-none focus:border-white/50" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="notes" className="block text-sm text-white/70">Notes</label>
          <textarea id="notes" name="notes" rows={4} className="mt-1 w-full rounded-md bg-transparent border border-white/20 px-3 py-2 focus:outline-none focus:border-white/50" />
        </div>
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      {ok && <p className="text-sm text-green-400">Thanks! We’ll confirm your ride shortly.</p>}
      <button type="submit" disabled={loading} className="btn-gold">
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}


