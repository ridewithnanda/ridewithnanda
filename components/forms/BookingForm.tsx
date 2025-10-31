"use client";

import { useState } from "react";

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

  async function onSubmit(formData: FormData) {
    setError(null);
    setLoading(true);
    setOk(false);
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
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Submission failed");
      setOk(true);
    } catch (e: any) {
      setError(e?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form action={onSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-white/70">Full Name*</label>
          <input name="fullName" required className="mt-1 w-full rounded-md bg-transparent border border-white/20 px-3 py-2 focus:outline-none focus:border-white/50" />
        </div>
        <div>
          <label className="block text-sm text-white/70">Phone (WhatsApp)*</label>
          <input name="phone" required inputMode="tel" className="mt-1 w-full rounded-md bg-transparent border border-white/20 px-3 py-2 focus:outline-none focus:border-white/50" />
        </div>
        <div>
          <label className="block text-sm text-white/70">Pickup City*</label>
          <input name="pickupCity" required className="mt-1 w-full rounded-md bg-transparent border border-white/20 px-3 py-2 focus:outline-none focus:border-white/50" />
        </div>
        <div>
          <label className="block text-sm text-white/70">Drop City*</label>
          <input name="dropCity" required className="mt-1 w-full rounded-md bg-transparent border border-white/20 px-3 py-2 focus:outline-none focus:border-white/50" />
        </div>
        <div>
          <label className="block text-sm text-white/70">Date</label>
          <input name="date" type="date" className="mt-1 w-full rounded-md bg-transparent border border-white/20 px-3 py-2 focus:outline-none focus:border-white/50" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm text-white/70">Notes</label>
          <textarea name="notes" rows={4} className="mt-1 w-full rounded-md bg-transparent border border-white/20 px-3 py-2 focus:outline-none focus:border-white/50" />
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


