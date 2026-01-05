import type { Metadata } from "next";
import Link from "next/link";

// SEO
export const metadata: Metadata = {
  title: "Research Lab | PatternRipple",
  description: "Public domain datasets and in silico discoveries from PatternRipple. Open research, freely available.",
  alternates: { canonical: "https://www.patternripple.com/lab" },
  openGraph: {
    title: "Research Lab | PatternRipple",
    description: "Public domain datasets and computational discoveries. Free for research and commercial use.",
    url: "https://www.patternripple.com/lab",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Research Lab | PatternRipple",
    description: "Open datasets and in silico research findings.",
  },
};

export default function ResearchLabPage() {
  return (
    <div className="min-h-screen bg-[#111] text-gray-200">
      {/* Hero */}
      <header className="bg-[#1a1a1a]/80 backdrop-blur-sm border-b border-gray-700 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-thin tracking-wide text-gray-100 mb-3">
            Research Lab
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Public domain datasets and in silico discoveries. All data is freely available for research and commercial use.
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

      {/* Content grid */}
      <main className="max-w-6xl mx-auto px-4 py-14">
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder for datasets */}
          <div className="bg-[#1e1e1e] ring-1 ring-gray-700 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all">
            <h2 className="text-xl font-light text-gray-100">Datasets</h2>
            <p className="mt-2 text-sm text-gray-400">
              Public domain datasets coming soon
            </p>
            <div className="mt-4 text-accent font-semibold">Coming Soon</div>
          </div>

          {/* Placeholder for in silico discoveries */}
          <div className="bg-[#1e1e1e] ring-1 ring-gray-700 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all">
            <h2 className="text-xl font-light text-gray-100">In Silico Research</h2>
            <p className="mt-2 text-sm text-gray-400">
              Computational discoveries and findings
            </p>
            <div className="mt-4 text-accent font-semibold">Coming Soon</div>
          </div>
        </section>

        {/* Contact */}
        <section className="mt-14 text-sm text-gray-500 text-center">
          <p>
            Questions about datasets or research collaboration?{" "}
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
