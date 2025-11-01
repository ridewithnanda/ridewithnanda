"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="container-site py-24 text-center">
          <h1 className="text-3xl font-semibold">Something went wrong!</h1>
          <p className="mt-4 text-white/80">{error.message || "An unexpected error occurred"}</p>
          <button
            onClick={() => reset()}
            className="mt-6 btn-gold"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}

