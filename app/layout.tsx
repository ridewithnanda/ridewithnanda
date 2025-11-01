import type { Metadata } from "next";
import "./globals.css";
import { Poppins, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientTransition from "@/components/ClientTransition";
import AuthProvider from "@/components/AuthProvider";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500"], display: "swap", variable: "--font-poppins" });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700"], display: "swap", variable: "--font-playfair" });

export const metadata: Metadata = {
  metadataBase: new URL("https://ridewithnanda.com"),
  title: {
    default: "RidewithNanda",
    template: "%s · RidewithNanda",
  },
  description: "Trusted Taxi & Travel Network – 15 Years of Reliable Journeys",
  openGraph: {
    title: "RidewithNanda",
    description: "Trusted Taxi & Travel Network – 15 Years of Reliable Journeys",
    url: "https://ridewithnanda.com",
    siteName: "RidewithNanda",
    images: [
      {
        url: "/og-banner.svg",
        width: 1200,
        height: 630,
        alt: "RidewithNanda – Trusted Taxi & Travel Network",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  icons: [
    { rel: "icon", url: "/favicon.svg" },
  ],
  twitter: {
    card: "summary_large_image",
    creator: "@ridewithnanda",
  },
};

export function generateViewport() {
  return {
    themeColor: "#000000",
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${playfair.variable}`}>
      <body className="min-h-screen antialiased">
        <AuthProvider>
          <Navbar />
          <main className="pt-20">
            <ClientTransition>{children}</ClientTransition>
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}


