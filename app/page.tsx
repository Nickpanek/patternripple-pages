"use client";

import Link from "next/link";
import Head from "next/head";

export default function HomePage() {
  const siteTitle = "PatternRipple - Creative Tools and Utilities";
  const siteDescription =
    "PatternRipple hosts browser-based creative tools and utilities. Visit Software to try free prototypes and apps.";

  const jsonLdWebsite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://www.patternripple.com/",
    name: "PatternRipple",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.patternripple.com/search?q={query}",
      "query-input": "required name=query"
    }
  };

  const jsonLdOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PatternRipple",
    url: "https://www.patternripple.com/",
    logo: "https://www.patternripple.com/icon-512.png",
    sameAs: ["https://heylink.me/nickpanek/"]
  };

  return (
    <div className="min-h-screen bg-[#111] text-gray-200">
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        <link rel="canonical" href="https://www.patternripple.com/" />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.patternripple.com/" />
        <meta property="og:image" content="https://www.patternripple.com/og-cover.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={siteDescription} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
      </Head>

      {/* Hero */}
      <header className="bg-[#1a1a1a]/80 backdrop-blur-sm border-b border-gray-700 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-thin tracking-wide text-gray-100 mb-4">PatternRipple</h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Visit Software to try free tools and prototypes. Research datasets and discoveries in the Lab.
          </p>
        </div>
      </header>

      {/* Highlight banner */}
      <div className="bg-accent text-black py-3">
        <div className="max-w-6xl mx-auto px-4 flex justify-center items-center gap-8 text-sm font-medium">
          🧪 Visit Software for free tools and prototypes
        </div>
      </div>

      {/* Intro card */}
      <section className="max-w-6xl mx-auto px-4 mt-10">
        <div className="bg-[#1e1e1e] rounded-2xl shadow-lg p-6 md:p-8 ring-1 ring-gray-700">
          <h2 className="text-2xl md:text-3xl font-light text-gray-100">
            Tools that respect your time and data
          </h2>
          <p className="mt-3 text-gray-400 leading-relaxed">
            Simple browser utilities. No subscriptions. Clear licensing.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/software"
              className="inline-block bg-accent text-white px-5 py-3 rounded-lg hover:bg-accent/90 transition-colors"
            >
              Explore Software
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-gray-400 mt-20">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-medium mb-4">PatternRipple</h3>
              <p className="text-sm">
                Creative tools and browser apps with a focus on speed and privacy.
              </p>
            </div>
            <div>
              <h3 className="text-white font-medium mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/lab" className="hover:text-accent">Research Lab</Link></li>
                <li><Link href="/software" className="hover:text-accent">Software</Link></li>
                <li><Link href="/games" className="hover:text-accent">Games</Link></li>
                <li><Link href="/about" className="hover:text-accent">About</Link></li>
                <li><a href="mailto:nick@patternripple.com" className="hover:text-accent">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-medium mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/terms" className="hover:text-accent">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-accent">Privacy Policy</Link></li>
                <li><Link href="/licenses" className="hover:text-accent">License Agreement</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2025 PatternRipple. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
