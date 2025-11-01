import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-site py-24 text-center">
      <h1 className="text-4xl font-[var(--font-playfair)] font-semibold">404</h1>
      <p className="mt-4 text-white/80">Page not found</p>
      <Link href="/" className="mt-6 btn-gold inline-block">
        Go Home
      </Link>
    </div>
  );
}

