import type { Metadata } from "next";
import Link from "next/link";

// SEO
export const metadata: Metadata = {
  title: "Research Lab - Public Domain Datasets & In Silico Discoveries | PatternRipple",
  description: "Access free public domain datasets and computational biology discoveries. Open research data for scientists, researchers, and developers. In silico experiments and findings available for commercial and academic use.",
  keywords: "public domain datasets, in silico research, computational biology, open data, research datasets, free datasets, scientific data, bioinformatics, computational discoveries, open research",
  alternates: { canonical: "https://www.patternripple.com/lab" },
  openGraph: {
    title: "Research Lab - Free Public Domain Datasets | PatternRipple",
    description: "Public domain datasets and in silico discoveries. Free for research and commercial use. Computational biology findings and open data.",
    url: "https://www.patternripple.com/lab",
    type: "website",
    siteName: "PatternRipple",
  },
  twitter: {
    card: "summary_large_image",
    title: "Research Lab - Open Datasets & In Silico Research",
    description: "Free public domain datasets and computational discoveries. Open research for scientists and developers.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLdWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "PatternRipple Research Lab",
  url: "https://www.patternripple.com/lab",
  description: "Public domain datasets and in silico discoveries",
};

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "ResearchProject",
  name: "PatternRipple Research Lab",
  url: "https://www.patternripple.com/lab",
  description: "Open research providing public domain datasets and computational discoveries",
  provider: {
    "@type": "Organization",
    name: "PatternRipple",
    url: "https://www.patternripple.com",
  },
};

export default function ResearchLabPage() {
  return (
    <div className="min-h-screen bg-[#111] text-gray-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
      />
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
        <section>
          <h2 className="text-2xl font-light text-gray-100 mb-6">In Silico Discoveries</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* LAZ-1011 & LAZ-1123 Discovery */}
            <Link href="/lab/lazarus-001" className="bg-[#1e1e1e] ring-1 ring-gray-700 rounded-2xl p-6 shadow-md hover:shadow-xl hover:ring-accent transition-all group">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-light text-gray-100 group-hover:text-accent transition-colors">
                  Lazarus-001
                </h3>
                <span className="bg-green-500/10 border border-green-500/30 rounded px-2 py-1 text-xs text-green-400">
                  PUBLIC DOMAIN
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                LAZ-1011 & LAZ-1123: High-Fsp3 antimicrobial scaffolds for MDR pathogen treatment
              </p>
              <div className="space-y-1 text-xs text-gray-500 mb-4">
                <p>• Efflux pump evasion (Fsp3 0.80)</p>
                <p>• Quorum sensing inhibition</p>
                <p>• 2 lead compounds + Markush family</p>
              </div>
              <div className="flex items-center text-accent text-sm font-semibold">
                View Discovery
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>

          <h2 className="text-2xl font-light text-gray-100 mb-6">Datasets</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Scaffold-Target Enrichment Analysis */}
            <a href="/scaffold-enrichment/" className="bg-[#1e1e1e] ring-1 ring-gray-700 rounded-2xl p-6 shadow-md hover:shadow-xl hover:ring-accent transition-all group">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-light text-gray-100 group-hover:text-accent transition-colors">
                  Scaffold-Target Enrichment Analysis
                </h3>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                Statistical analysis of 85,000+ ChEMBL compounds revealing which molecular scaffolds are enriched in specific protein families. Found 456 significant associations with enrichments up to 57×.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-blue-500/10 border border-blue-500/30 rounded px-2 py-1 text-xs text-blue-400">
                  Data Science
                </span>
                <span className="bg-purple-500/10 border border-purple-500/30 rounded px-2 py-1 text-xs text-purple-400">
                  Cheminformatics
                </span>
                <span className="bg-green-500/10 border border-green-500/30 rounded px-2 py-1 text-xs text-green-400">
                  Public Domain
                </span>
                <span className="bg-pink-500/10 border border-pink-500/30 rounded px-2 py-1 text-xs text-pink-400">
                  Statistical Analysis
                </span>
              </div>
              <div className="flex items-center text-accent text-sm font-semibold">
                View Dashboard
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
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
