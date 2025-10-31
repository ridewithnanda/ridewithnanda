"use client";

import { useState } from "react";

type DriverPayload = {
  fullName: string;
  phone: string;
  city: string;
  carModel?: string;
  yearsExperience?: string;
};

export default function DriverForm() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setError(null);
    setLoading(true);
    setOk(false);
    const payload: DriverPayload = {
      fullName: String(formData.get("fullName") || ""),
      phone: String(formData.get("phone") || ""),
      city: String(formData.get("city") || ""),
      carModel: String(formData.get("carModel") || ""),
      yearsExperience: String(formData.get("yearsExperience") || ""),
    };
    if (!payload.fullName || !payload.phone || !payload.city) {
      setError("Please fill all required fields.");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/driver", {
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
          <label className="block text-sm text-white/70">City/Operating Region*</label>
          <input name="city" required className="mt-1 w-full rounded-md bg-transparent border border-white/20 px-3 py-2 focus:outline-none focus:border-white/50" />
        </div>
        <div>
          <label className="block text-sm text-white/70">Car Model</label>
          <input name="carModel" className="mt-1 w-full rounded-md bg-transparent border border-white/20 px-3 py-2 focus:outline-none focus:border-white/50" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm text-white/70">Years of Experience</label>
          <input name="yearsExperience" className="mt-1 w-full rounded-md bg-transparent border border-white/20 px-3 py-2 focus:outline-none focus:border-white/50" />
        </div>
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      {ok && <p className="text-sm text-green-400">Thanks! We’ll review and contact you shortly.</p>}
      <button type="submit" disabled={loading} className="btn-gold">
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}


