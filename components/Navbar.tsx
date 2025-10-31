"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/drivers", label: "Drivers" },
  { href: "/book", label: "Book" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`fixed inset-x-0 top-0 z-50 transition-colors ${scrolled ? "bg-black/70 backdrop-blur supports-[backdrop-filter]:bg-black/50" : "bg-transparent"}`}>
      <nav className="container-site flex items-center justify-between py-4">
        <Link href="/" className="text-xl font-semibold text-brand-gold tracking-wide" aria-label="RidewithNanda">
          RidewithNanda
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-white/90 hover:text-brand-gold transition-colors">
              {l.label}
            </Link>
          ))}
          <Link href="/book" className="btn-gold text-sm">Book a Ride</Link>
        </div>
        <button aria-label="Toggle menu" className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/15 hover:border-brand-gold/60" onClick={() => setOpen((s) => !s)}>
          <div className="relative w-5 h-5">
            <span className={`absolute h-0.5 w-5 bg-white transition-transform ${open ? "rotate-45 top-2.5" : "-top-0.5"}`} />
            <span className={`absolute h-0.5 w-5 bg-white transition-opacity top-2.5 ${open ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute h-0.5 w-5 bg-white transition-transform ${open ? "-rotate-45 top-2.5" : "top-5"}`} />
          </div>
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden border-t border-white/10">
            <div className="container-site py-4 flex flex-col gap-3">
              {links.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-white/90 hover:text-brand-gold">
                  {l.label}
                </Link>
              ))}
              <Link href="/book" onClick={() => setOpen(false)} className="btn-gold">Book a Ride</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


