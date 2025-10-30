import type { Metadata } from "next";
import Link from "next/link";

// SEO
export const metadata: Metadata = {
  title: "Paid Tools | PatternRipple",
  description: "One-time purchase browser tools from PatternRipple. No subscriptions, ever.",
  alternates: { canonical: "https://www.patternripple.com/tools" },
  openGraph: {
    title: "Paid Tools | PatternRipple",
    description: "Buy once, use forever. Browser-based creative tools built with privacy and speed in mind.",
    url: "https://www.patternripple.com/tools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paid Tools | PatternRipple",
    description: "One-time payment tools for creatives. No SaaS traps.",
  },
};

export default function PaidToolsPage() {
  return (
    <div className="min-h-screen bg-[#111] text-gray-200">
      {/* Hero */}
      <header className="bg-[#1a1a1a]/80 backdrop-blur-sm border-b border-gray-700 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-thin tracking-wide text-gray-100 mb-3">
            Paid Tools
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Buy once. Use forever. No subscriptions, no tracking, no fluff.
          </p>
          <div className="mt-5">
            <Link
              href="/"
              className="inline-block border border-accent text-accent px-5 py-3 rounded-lg hover:bg-accent hover:text-white transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Placeholder product grid */}
      <main className="max-w-6xl mx-auto px-4 py-14">
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example product */}
          <div className="bg-[#1e1e1e] ring-1 ring-gray-700 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all">
            <h2 className="text-xl font-light text-gray-100">Coming Soon</h2>
            <p className="mt-2 text-sm text-gray-400">
              Descriptions coming soon
            </p>
            <div className="mt-4 text-accent font-semibold">Coming Soon</div>
          </div>
        </section>

        {/* Contact or support */}
        <section className="mt-14 text-sm text-gray-500 text-center">
          <p>
            Need help? Email{" "}
            <a
              href="mailto:nick@patternripple.com"
              className="underline hover:text-accent"
            >
              nick@patternripple.com
            </a>
          </p>
        </section>
      </main>
    </div>
  );
}
