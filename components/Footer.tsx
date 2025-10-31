import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20">
      <div className="container-site py-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-brand-gold">
          © 2025 RidewithNanda · Trusted Taxi & Travel Network · All Rights Reserved
        </p>
        <div className="flex items-center gap-4">
          <Link className="hover:text-brand-gold" href="https://instagram.com/ridewithnandaa" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            {/* Instagram icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </Link>
          <Link className="hover:text-brand-gold" href="https://wa.me/919990051602" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            {/* WhatsApp icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.52 3.48A11.77 11.77 0 0 0 12 0a12 12 0 0 0-10 18.47L0 24l5.7-1.47A12 12 0 1 0 20.52 3.48z"></path><path d="M7 12c1.5 3 6 6 8 5 1-.5 1.5-2 1-3-.5-1-1.5-.5-2 0s-1 0-2-1-1-1-1-2 .5-1.5 0-2-2 0-3 1 0 3 1 4z"></path></svg>
          </Link>
          <Link className="hover:text-brand-gold" href="mailto:ridewithnanda@gmail.com" aria-label="Email">
            {/* Mail icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v16H4z"></path><path d="m22 6-10 7L2 6"></path></svg>
          </Link>
        </div>
      </div>
    </footer>
  );
}


