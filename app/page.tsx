"use client";

import Link from "next/link";
import Head from "next/head";

export default function HomePage() {
  const siteTitle = "PatternRipple - Free Browser Tools, Open Source Research & HTML5 Games";
  const siteDescription =
    "Discover free browser-based creative tools, public domain antimicrobial drug research (LAZ-1011 & LAZ-1123), scaffold enrichment analysis datasets, and HTML5 games. No subscriptions, no data collection. Open source software and CC0-licensed scientific discoveries for drug discovery, AI training, and creative work.";

  const jsonLdWebsite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://www.patternripple.com/",
    name: "PatternRipple",
    description: "Free browser tools, public domain drug research, and open source games",
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
    description: "Open platform for free creative tools, public domain scientific research, and browser-based games",
    sameAs: ["https://heylink.me/nickpanek/"],
    knowsAbout: [
      "Drug Discovery",
      "Antimicrobial Resistance",
      "Molecular Scaffolds",
      "ChEMBL Database",
      "Browser-Based Tools",
      "Pattern Design",
      "Audio Processing",
      "HTML5 Games",
      "Open Source Software",
      "Public Domain Research"
    ]
  };

  const jsonLdResearch = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: "LAZ-1011 & LAZ-1123: Public Domain Antimicrobial Drug Candidates",
    description: "First public domain in silico antimicrobial drug discovery featuring high Fsp3 bis-dioxolane scaffolds with efflux pump evasion and quorum sensing inhibition capabilities",
    author: {
      "@type": "Organization",
      name: "PatternRipple Research Lab"
    },
    license: "https://creativecommons.org/publicdomain/zero/1.0/",
    keywords: "antimicrobial resistance, drug discovery, public domain, efflux pump evasion, quorum sensing inhibition, MDR pathogens, ChEMBL, molecular scaffolds",
    url: "https://www.patternripple.com/lab/lazarus-001"
  };

  const jsonLdDataset = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Scaffold-Target Enrichment Analysis - 85,717 ChEMBL Compounds",
    description: "Public domain dataset analyzing 456 molecular scaffolds significantly enriched in specific protein families, derived from 85,717 ChEMBL compounds with statistical validation",
    license: "https://creativecommons.org/publicdomain/zero/1.0/",
    creator: {
      "@type": "Organization",
      name: "PatternRipple Research Lab"
    },
    keywords: "molecular scaffolds, drug discovery, ChEMBL, protein targets, scaffold hopping, AI training data, machine learning",
    distribution: {
      "@type": "DataDownload",
      contentUrl: "https://www.patternripple.com/scaffold-enrichment/",
      encodingFormat: "text/html"
    }
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
    description: "Free browser-based tools for seamless pattern creation, audio looping, video slideshows, and photo compression. No installation required."
  };

  return (
    <div className="min-h-screen bg-[#111] text-gray-200">
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        <meta name="keywords" content="free browser tools, antimicrobial drug discovery, public domain research, LAZ-1011, LAZ-1123, scaffold enrichment, ChEMBL, pattern creator, audio looper, HTML5 games, open source, CC0 license, drug discovery, AI training data, molecular scaffolds, seamless patterns, no subscription tools" />
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdResearch) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdDataset) }}
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
            Free browser tools, public domain drug discovery research, and HTML5 games. No subscriptions, no data collection, always open source.
          </p>
        </div>
      </header>

      {/* Highlight banner */}
      <div className="bg-accent text-black py-3">
        <div className="max-w-6xl mx-auto px-4 flex justify-center items-center gap-8 text-sm font-medium">
          <span>🧬 NEW: LAZ-1011 & LAZ-1123 Antimicrobial Research</span>
          <span>📊 NEW: Scaffold Enrichment Dataset (85,717 compounds)</span>
        </div>
      </div>

      {/* Main Content Sections */}
      <main className="max-w-6xl mx-auto px-4 mt-10 space-y-8">

        {/* Research Lab Section */}
        <section className="bg-[#1e1e1e] rounded-2xl shadow-lg p-6 md:p-8 ring-1 ring-gray-700">
          <h2 className="text-2xl md:text-3xl font-light text-gray-100 mb-4">
            🧬 Research Lab - Public Domain Drug Discovery
          </h2>
          <p className="text-gray-400 leading-relaxed mb-6">
            Open source scientific research and datasets released under CC0 license. Free for commercial use, AI training, and academic research.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#252525] p-5 rounded-lg border border-gray-700">
              <h3 className="text-xl font-medium text-gray-100 mb-2">LAZ-1011 & LAZ-1123 Discovery</h3>
              <p className="text-sm text-gray-400 mb-4">
                First public domain antimicrobial drug candidates targeting MDR pathogens. High Fsp3 bis-dioxolane scaffolds with efflux pump evasion and quorum sensing inhibition.
              </p>
              <ul className="text-sm text-gray-400 space-y-1 mb-4">
                <li>✓ Efflux pump evasion capability</li>
                <li>✓ Quorum sensing inhibition</li>
                <li>✓ Complete Markush family defined</li>
                <li>✓ Full PDF reports available</li>
              </ul>
              <Link
                href="/lab/lazarus-001"
                className="inline-block bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors text-sm"
              >
                View Research →
              </Link>
            </div>

            <div className="bg-[#252525] p-5 rounded-lg border border-gray-700">
              <h3 className="text-xl font-medium text-gray-100 mb-2">Scaffold Enrichment Analysis</h3>
              <p className="text-sm text-gray-400 mb-4">
                Interactive dataset analyzing 85,717 ChEMBL compounds. 456 molecular scaffolds significantly enriched (3-57×) in specific protein families.
              </p>
              <ul className="text-sm text-gray-400 space-y-1 mb-4">
                <li>✓ Statistical validation (Fisher's exact test)</li>
                <li>✓ Filterable by target family</li>
                <li>✓ Ideal for AI/ML training data</li>
                <li>✓ Scaffold hopping resource</li>
              </ul>
              <Link
                href="/scaffold-enrichment/"
                className="inline-block bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors text-sm"
              >
                Explore Dataset →
              </Link>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href="/lab"
              className="inline-block bg-gray-700 text-white px-5 py-3 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Visit Research Lab
            </Link>
          </div>
        </section>

        {/* Software Section */}
        <section className="bg-[#1e1e1e] rounded-2xl shadow-lg p-6 md:p-8 ring-1 ring-gray-700">
          <h2 className="text-2xl md:text-3xl font-light text-gray-100 mb-4">
            🛠️ Free Browser Tools
          </h2>
          <p className="text-gray-400 leading-relaxed mb-6">
            Simple, privacy-focused browser utilities. No installation, no subscriptions, no data collection. Works 100% in your browser.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-[#252525] p-4 rounded-lg border border-gray-700">
              <h3 className="text-lg font-medium text-gray-100 mb-2">Pattern Design</h3>
              <p className="text-sm text-gray-400">
                Create seamless tile patterns with offset/wrap tools and live preview.
              </p>
            </div>

            <div className="bg-[#252525] p-4 rounded-lg border border-gray-700">
              <h3 className="text-lg font-medium text-gray-100 mb-2">Audio Tools</h3>
              <p className="text-sm text-gray-400">
                Loop audio with tempo control, add fades, normalize, and export in multiple formats.
              </p>
            </div>

            <div className="bg-[#252525] p-4 rounded-lg border border-gray-700">
              <h3 className="text-lg font-medium text-gray-100 mb-2">Video & Photo</h3>
              <p className="text-sm text-gray-400">
                Create property slideshows, compress photos, all processed locally in browser.
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

        {/* Games Section */}
        <section className="bg-[#1e1e1e] rounded-2xl shadow-lg p-6 md:p-8 ring-1 ring-gray-700">
          <h2 className="text-2xl md:text-3xl font-light text-gray-100 mb-4">
            🎮 HTML5 Games
          </h2>
          <p className="text-gray-400 leading-relaxed mb-6">
            Browser-based games with no installation required. Featuring slot machines with bonus rounds, background music, and PWA support.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-[#252525] p-5 rounded-lg border border-gray-700">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-medium text-gray-100">Tacticool Patches Slot</h3>
                <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded">PWA</span>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                Airsoft-themed slot machine with custom embroidered patch designs, cascading reels, and free spins bonus rounds.
              </p>
            </div>

            <div className="bg-[#252525] p-5 rounded-lg border border-gray-700">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-medium text-gray-100">Old West Slots</h3>
                <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">NEW</span>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                Wild West themed slot with 5-second GIF animations, bonus rounds, authentic imagery, and background music.
              </p>
            </div>
          </div>

          <Link
            href="/games"
            className="inline-block bg-accent text-white px-5 py-3 rounded-lg hover:bg-accent/90 transition-colors"
          >
            Play Games
          </Link>
        </section>

        {/* Philosophy Section */}
        <section className="bg-[#1e1e1e] rounded-2xl shadow-lg p-6 md:p-8 ring-1 ring-gray-700">
          <h2 className="text-2xl md:text-3xl font-light text-gray-100 mb-4">
            Our Philosophy
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h3 className="text-gray-100 font-medium mb-2">🔒 Privacy First</h3>
              <p className="text-gray-400">
                All tools run in your browser. No data collection, no tracking, no servers processing your files.
              </p>
            </div>
            <div>
              <h3 className="text-gray-100 font-medium mb-2">💰 No Subscriptions</h3>
              <p className="text-gray-400">
                Everything is free forever. No paywalls, no feature limitations, no upsells.
              </p>
            </div>
            <div>
              <h3 className="text-gray-100 font-medium mb-2">📖 Open Source</h3>
              <p className="text-gray-400">
                Research and datasets released under CC0. Free for commercial use, AI training, and academic research.
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
                Free browser tools, public domain drug discovery research, and HTML5 games. Built with privacy and open science in mind.
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
            <p>&copy; 2026 PatternRipple. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
