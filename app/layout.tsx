// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Script from "next/script";

// stop Next from preloading the font to remove preload warnings
const inter = Inter({ subsets: ["latin"], display: "swap", preload: false });

export const metadata: Metadata = {
  title: "PatternRipple - Creative Tools and Utilities",
  description:
    "Free and paid creative tools that run in your browser. Built without subscriptions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="referrer" content="strict-origin-when-cross-origin" />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SEHPVEP1TM"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SEHPVEP1TM', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body className={`${inter.className} bg-[#111] text-gray-300 min-h-screen`}>
        <nav className="bg-[#1a1a1a]/90 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
            <Link href="/" className="text-xl font-bold text-accent">
              PatternRipple
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
