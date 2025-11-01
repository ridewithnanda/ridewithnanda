"use client";

import { useState } from "react";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setMsg(null);
    if (!/^([^\s@]+)@([^\s@]+)\.[^\s@]+$/.test(email)) {
      setErr("Please enter a valid email.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to subscribe");
      setMsg(data.message || "Submitted successfully!");
      setEmail("");
    } catch (e: any) {
      setErr(e?.message || "Something went wrong");
      // eslint-disable-next-line no-console
      console.error("Subscribe error:", e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form role="form" onSubmit={submit} className="w-full max-w-xl mx-auto">
      <div className="flex gap-3">
        <label htmlFor="email" className="sr-only">Email Address</label>
        <input
          id="email"
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 rounded-full bg-transparent border border-white/20 px-4 py-3 focus:outline-none focus:border-white/50"
          aria-label="Email Address"
        />
        <button type="submit" disabled={loading} className="btn-gold whitespace-nowrap">
          {loading ? "Joining..." : "Join Now"}
        </button>
      </div>
      {err && <p className="mt-2 text-sm text-red-400" role="alert">{err}</p>}
      {msg && <p className="mt-2 text-sm text-green-400" role="status">{msg}</p>}
    </form>
  );
}


