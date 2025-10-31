"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/admin/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await signIn("credentials", { redirect: false, email, password, callbackUrl });
    if (res?.error) {
      setError("Invalid credentials");
    } else if (res?.ok) {
      window.location.href = callbackUrl;
    }
    setLoading(false);
  }

  return (
    <div className="container-site py-24 max-w-md">
      <h1 className="text-3xl font-[var(--font-playfair)] font-semibold">Admin Login</h1>
      <form onSubmit={submit} className="mt-8 space-y-4">
        <div>
          <label className="block text-sm text-white/70">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="mt-1 w-full rounded-md bg-transparent border border-white/20 px-3 py-2 focus:outline-none focus:border-white/50" />
        </div>
        <div>
          <label className="block text-sm text-white/70">Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="mt-1 w-full rounded-md bg-transparent border border-white/20 px-3 py-2 focus:outline-none focus:border-white/50" />
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button className="btn-gold" disabled={loading}>{loading ? "Signing in..." : "Sign In"}</button>
      </form>
    </div>
  );
}


