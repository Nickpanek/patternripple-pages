"use client";

import Link from "next/link";
import Head from "next/head";

export default function HomePage() {
  const siteTitle = "PatternRipple - Creative Tools and Utilities";
  const siteDescription =
    "PatternRipple hosts browser-based creative tools and utilities. Visit the Lab to try free prototypes and apps.";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
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
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Link href="/" className="inline-block" aria-label="PatternRipple home">
            <h1 className="text-5xl font-thin tracking-wide text-gray-900 mb-4">PatternRipple</h1>
          </Link>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Visit the Lab to try free tools and prototypes. Paid apps arrive as they are ready.
          </p>
        </div>
      </header>

      {/* Top Nav */}
      <nav
        className="bg-white/50 backdrop-blur-sm border-b border-gray-100 sticky top-14 z-40"
        aria-label="Primary"
      >
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2 justify-center items-center">
            <Link href="/lab" className="text-gray-700 hover:text-purple-600 font-medium px-3">
              Lab
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/about" className="text-gray-700 hover:text-purple-600 font-medium px-3">
              About
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/blog" className="text-gray-700 hover:text-purple-600 font-medium px-3">
              Blog
            </Link>
            {/* removed games and pattern catalog links */}
          </div>
        </div>
      </nav>

      {/* Stats */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3">
        <div className="max-w-6xl mx-auto px-4 flex justify-center items-center gap-8 text-sm">
          <span>🧪 Visit the Lab for free tools and prototypes</span>
          {/* removed counts for patterns and any games mention */}
        </div>
      </div>

      {/* Intro card - trimmed to avoid pattern or game links */}
      <section className="max-w-6xl mx-auto px-4 mt-10">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-light text-gray-900">
            Tools that respect your time and data
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Simple browser utilities. No subscriptions. Clear licensing.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/lab"
              className="inline-block bg-gray-900 text-white px-5 py-3 rounded-lg hover:bg-purple-600 transition-colors"
            >
              Explore the Lab
            </Link>
            {/* removed See Games button */}
          </div>
        </div>
      </section>

      {/* removed product grid and product links */}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 mt-20">
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
                <li><Link href="/lab" className="hover:text-white">Lab</Link></li>
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><a href="mailto:nick@patternripple.com" className="hover:text-white">Contact</a></li>
                {/* removed Collections and any pattern catalog links */}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-medium mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/licenses" className="hover:text-white">License Agreement</Link></li>
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
