// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

// stop Next from preloading the font to remove preload warnings
const inter = Inter({ subsets: ["latin"], display: "swap", preload: false });

export const metadata: Metadata = {
  title: "PatternRipple - Exclusive Digital Patterns",
  description:
    "Exclusive digital patterns that no one else will have. Once sold, it's yours forever.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* keep it lean - no analytics/beacon scripts here */}
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>
      <body className={`${inter.className} bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen`}>
        <nav className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <Link
              href="/"
              className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
            >
              PatternRipple
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
