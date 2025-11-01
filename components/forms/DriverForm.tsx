"use client";

import { useState, useRef } from "react";

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
  const formRef = useRef<HTMLFormElement | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setOk(false);
    const formData = new FormData(e.currentTarget);
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
        body: JSON.stringify({
          full_name: payload.fullName,
          phone: payload.phone,
          city: payload.city,
          car_model: payload.carModel || null,
          years_experience: payload.yearsExperience || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit driver registration");
      setOk(true);
      e.currentTarget.reset();
    } catch (e: any) {
      setError(e?.message || "Something went wrong");
      // eslint-disable-next-line no-console
      console.error("Driver submission error:", e);
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
          <label htmlFor="city" className="block text-sm text-white/70">City/Operating Region*</label>
          <input id="city" name="city" required className="mt-1 w-full rounded-md bg-transparent border border-white/20 px-3 py-2 focus:outline-none focus:border-white/50" />
        </div>
        <div>
          <label htmlFor="carModel" className="block text-sm text-white/70">Car Model</label>
          <input id="carModel" name="carModel" className="mt-1 w-full rounded-md bg-transparent border border-white/20 px-3 py-2 focus:outline-none focus:border-white/50" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="yearsExperience" className="block text-sm text-white/70">Years of Experience</label>
          <input id="yearsExperience" name="yearsExperience" className="mt-1 w-full rounded-md bg-transparent border border-white/20 px-3 py-2 focus:outline-none focus:border-white/50" />
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

