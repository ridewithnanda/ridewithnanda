"use client";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container-site py-24 text-center">
      <h1 className="text-3xl font-[var(--font-playfair)] font-semibold">Admin Error</h1>
      <p className="mt-4 text-white/80">{error.message || "An error occurred in the admin panel"}</p>
      <div className="mt-6 flex gap-4 justify-center">
        <button
          onClick={() => reset()}
          className="btn-gold"
        >
          Try again
        </button>
        <a
          href="/admin/login"
          className="inline-flex items-center justify-center rounded-full px-6 py-3 border border-white text-white hover:bg-white hover:text-black transition-colors"
        >
          Back to Login
        </a>
      </div>
    </div>
  );
}

