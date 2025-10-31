import Link from "next/link";
import { getSession } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Ensure session on server; middleware also protects
  await getSession();
  return (
    <div className="container-site py-10">
      <div className="grid md:grid-cols-[220px_1fr] gap-8">
        <aside className="rounded-xl border border-white/10 p-4 h-max sticky top-24">
          <nav className="flex flex-col gap-3 text-sm">
            <Link className="hover:text-brand-gold" href="/admin/dashboard">Dashboard</Link>
            <Link className="hover:text-brand-gold" href="/admin/drivers">Drivers</Link>
            <Link className="hover:text-brand-gold" href="/admin/bookings">Bookings</Link>
            <Link className="hover:text-brand-gold" href="/admin/content">Content</Link>
            <Link className="hover:text-brand-gold" href="/admin/subscribers">Subscribers</Link>
            <LogoutButton />
          </nav>
        </aside>
        <section>{children}</section>
      </div>
    </div>
  );
}


