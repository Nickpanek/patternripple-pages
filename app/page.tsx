"use client";

import Link from "next/link";
import Head from "next/head";

export default function HomePage() {
  const siteTitle = "PatternRipple - Browser Software for Creators";
  const siteDescription =
    "Browser-based creative software and tools for designers and creators. Pattern creator, audio looper, video tools, and more. No data collection, everything runs in your browser.";

  const jsonLdWebsite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://www.patternripple.com/",
    name: "PatternRipple",
    description: "Browser software for creators",
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
    description: "Browser-based creative software for designers, artists, and creators",
    sameAs: ["https://heylink.me/nickpanek/"],
    knowsAbout: [
      "Browser-Based Tools",
      "Pattern Design",
      "Audio Processing",
      "Video Production",
      "Creative Software",
      "Open Source Software"
    ]
  };

  const jsonLdSoftware = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "PatternRipple Creative Tools Suite",
    applicationCategory: "DesignApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    },
    description: "Browser-based tools for seamless pattern creation, audio looping, video slideshows, and photo compression. No installation required."
  };

  return (
    <div className="min-h-screen bg-[#111] text-gray-200">
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        <meta name="keywords" content="free browser tools, pattern creator, audio looper, seamless patterns, creative software, design tools, no subscription tools, creator tools, audio tools, video maker, browser software" />
        <link rel="canonical" href="https://www.patternripple.com/" />

        {/* Open Graph */}
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.patternripple.com/" />
        <meta property="og:image" content="https://www.patternripple.com/og-cover.png" />
        <meta property="og:site_name" content="PatternRipple" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={siteDescription} />
        <meta name="twitter:image" content="https://www.patternripple.com/og-cover.png" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftware) }}
        />
      </Head>

      {/* Hero */}
      <header className="bg-[#1a1a1a]/80 backdrop-blur-sm border-b border-gray-700 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-thin tracking-wide text-gray-100 mb-4">PatternRipple</h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Browser software for creators. No data collection, no installation required.
          </p>
        </div>
      </header>

      {/* Main Content Sections */}
      <main className="max-w-6xl mx-auto px-4 mt-10 space-y-8">

        {/* Software Section */}
        <section className="bg-[#1e1e1e] rounded-2xl shadow-lg p-6 md:p-8 ring-1 ring-gray-700">
          <h2 className="text-2xl md:text-3xl font-light text-gray-100 mb-4">
            🛠️ Creative Software
          </h2>
          <p className="text-gray-400 leading-relaxed mb-6">
            Browser-based tools built for designers, artists, and creators. Privacy-first, no installation required. Works 100% in your browser.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-[#252525] p-4 rounded-lg border border-gray-700">
              <h3 className="text-lg font-medium text-gray-100 mb-2">Pattern Design</h3>
              <p className="text-sm text-gray-400">
                Create seamless tile patterns with offset/wrap tools and live preview. Export for fabric, wallpaper, and digital use.
              </p>
            </div>

            <div className="bg-[#252525] p-4 rounded-lg border border-gray-700">
              <h3 className="text-lg font-medium text-gray-100 mb-2">Audio Tools</h3>
              <p className="text-sm text-gray-400">
                Loop audio with tempo control, add fades, normalize, and export in multiple formats. Perfect for music and sound design.
              </p>
            </div>

            <div className="bg-[#252525] p-4 rounded-lg border border-gray-700">
              <h3 className="text-lg font-medium text-gray-100 mb-2">Video & Photo</h3>
              <p className="text-sm text-gray-400">
                Create property slideshows, compress photos, and produce listing videos. All processed locally in your browser.
              </p>
            </div>
          </div>

          <Link
            href="/software"
            className="inline-block bg-accent text-white px-5 py-3 rounded-lg hover:bg-accent/90 transition-colors"
          >
            Explore All Tools
          </Link>
        </section>

        {/* Philosophy Section */}
        <section className="bg-[#1e1e1e] rounded-2xl shadow-lg p-6 md:p-8 ring-1 ring-gray-700">
          <h2 className="text-2xl md:text-3xl font-light text-gray-100 mb-4">
            Built for Creators
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h3 className="text-gray-100 font-medium mb-2">🔒 Privacy First</h3>
              <p className="text-gray-400">
                All tools run in your browser. No data collection, no tracking, no servers processing your files.
              </p>
            </div>
            <div>
              <h3 className="text-gray-100 font-medium mb-2">💰 No SaaS</h3>
              <p className="text-gray-400">
                No recurring fees, no paywalls, no upsells. Just tools that work.
              </p>
            </div>
            <div>
              <h3 className="text-gray-100 font-medium mb-2">⚡ Works Offline</h3>
              <p className="text-gray-400">
                No internet required once loaded. Tools run entirely in your browser without any server dependency.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-gray-400 mt-20">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-medium mb-4">PatternRipple</h3>
              <p className="text-sm">
                Browser software for creators. Built with privacy and simplicity in mind.
              </p>
            </div>
            <div>
              <h3 className="text-white font-medium mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/software" className="hover:text-accent">Software</Link></li>
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
            <p>&copy; 2026 PatternRipple. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
