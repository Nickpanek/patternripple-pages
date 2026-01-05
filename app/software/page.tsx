import Link from "next/link";
import type { Metadata } from "next";

// SEO
export const metadata: Metadata = {
  title: "Free Software & Browser Tools - Pattern Creator, Audio Tools & More | PatternRipple",
  description:
    "Free browser-based creative software and tools. Seamless pattern creator, pattern tile checker, audio looper, audio processor, property slideshow maker, video tools, and quantum circuit simulator. No installation required, works offline.",
  keywords: "free software, browser tools, pattern creator, seamless patterns, audio looper, audio tools, video maker, creative tools, design software, free design tools, web-based tools, offline tools",
  alternates: { canonical: "https://www.patternripple.com/software" },
  openGraph: {
    title: "Free Creative Software & Browser Tools | PatternRipple",
    description:
      "Free pattern creator, audio tools, video maker, and more. Browser-based creative software. No installation, works offline.",
    url: "https://www.patternripple.com/software",
    type: "website",
    siteName: "PatternRipple",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Creative Software - Pattern, Audio, Video Tools",
    description: "Browser-based creative tools. Pattern creator, audio looper, video maker. Free, no install.",
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

type Tool = {
  slug: string;
  title: string;
  href: string;
  summary: string;
  badge?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

const tools: Tool[] = [
  {
    slug: "seamless-pattern-creator",
    title: "Seamless Pattern Creator",
    href: "/seamless-pattern-creator.html",
    summary:
      "Build seamless tiles in your browser. Offset and wrap artwork, preview as repeating tiles, and export the final image.",
    badge: "Design",
  },
  {
    slug: "seamless-pattern-checker",
    title: "Seamless Pattern Checker - SmoothSnap v1",
    href: "/pattern-checker-smoothsnap.html",
    summary:
      "Upgraded checker with smooth snapping and refined controls. Preview tiles, tune rows and columns, toggle gaps, and spot seams fast.",
    badge: "Design",
    secondaryHref: "/pattern-checker.html",
    secondaryLabel: "v0",
  },
  {
    slug: "panek-video-program",
    title: "Panek Video Program",
    href: "/panekvideo/",
    summary:
      "Desktop app (Linux/macOS) that turns one image and one audio file into a 1920×1080 MP4. Fast rendering, native dialogs, perfect for YouTube and social media.",
    badge: "Video",
    secondaryHref: "https://github.com/Nickpanek/panek-video-program",
    secondaryLabel: "View on GitHub",
  },
  {
    slug: "audio-looper-panek",
    title: "Audio Looper - Desktop Edition",
    href: "/audio-looper-panek.html",
    summary:
      "Desktop edition. Loop audio with adjustable start/end points, tempo control, and panning. Good for testing loops or stems.",
    badge: "Audio",
    secondaryHref: "https://www.patternripple.com/audio-loop-creator-mobile.html",
    secondaryLabel: "Open mobile tool",
  },
  {
    slug: "audio-processor",
    title: "Audio Processor - Fade plus Normalize",
    href: "/audio-processor.html",
    summary:
      "Browser based fades and normalize using Web Audio. Works offline in the tab. Export WAV or MP3.",
    badge: "Audio",
  },
  {
    slug: "property-slideshow-maker",
    title: "Property Slideshow Maker",
    href: "/property-slideshow-maker.html",
    summary:
      "Build quick listing videos. Choose aspect ratio, add address, price, details, color, and logo. Export WebM, GIF, or frames ZIP.",
    badge: "Video",
  },
  {
    slug: "cqs-rs-browser-simulator",
    title: "cqs-rs Browser Demo",
    href: "/cqs_rs_docs.html",
    summary:
      "Run small quantum circuit programs in the browser. JSON editor, shots control, and inline results for a demo subset of the Rust simulator.",
    badge: "Experimental",
  },
];

const order: Record<string, number> = {
  "seamless-pattern-creator": 10,
  "seamless-pattern-checker": 20,
  "audio-looper-panek": 30,
  "audio-processor": 40,
  "property-slideshow-maker": 50,
  "cqs-rs-browser-simulator": 90,
};

const sortedTools = [...tools].sort(
  (a, b) => (order[a.slug] ?? 999) - (order[b.slug] ?? 999)
);

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: sortedTools.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `https://www.patternripple.com${t.href}`,
    name: t.title,
  })),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "PatternRipple Software",
  url: "https://www.patternripple.com/software",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.patternripple.com/search?q={query}",
    "query-input": "required name=query",
  },
};

export default function SoftwarePage() {
  return (
    <div className="min-h-screen bg-[#111] text-gray-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      {/* Hero */}
      <header className="bg-[#1a1a1a]/80 backdrop-blur-sm border-b border-gray-700 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-thin tracking-wide text-gray-100 mb-3">
            PatternRipple Software
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Free browser tools and prototypes. Files stay local where possible. These will act as beta versions of apps and software.
          </p>
          <div className="mt-5 flex justify-center gap-3">
            <Link
              href="/"
              className="inline-block border border-accent text-accent px-5 py-3 rounded-lg hover:bg-accent hover:text-white transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Tools grid */}
      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedTools.map((tool) => (
            <article
              key={tool.slug}
              className="bg-[#1e1e1e] rounded-2xl shadow-md hover:shadow-xl transition-all ring-1 ring-gray-700"
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-light text-gray-100">
                    <Link href={tool.href} className="hover:text-accent">
                      {tool.title}
                    </Link>
                  </h2>
                  {tool.badge ? (
                    <span className="ml-3 text-xs font-semibold tracking-wide bg-accent/20 text-accent px-2.5 py-1 rounded-full">
                      {tool.badge}
                    </span>
                  ) : null}
                </div>

                <p className="mt-3 text-gray-400 text-sm flex-1">{tool.summary}</p>

                <div className="mt-5 grid gap-2">
                  <Link
                    href={tool.href}
                    className="inline-flex items-center justify-center w-full bg-accent text-white px-4 py-2.5 rounded-lg hover:bg-accent/90 transition-colors"
                    prefetch={false}
                    title={`Open ${tool.title}`}
                  >
                    Open tool
                  </Link>

                  {tool.secondaryHref && tool.secondaryLabel ? (
                    tool.slug === "seamless-pattern-checker" ? (
                      <a
                        href={tool.secondaryHref}
                        className="text-sm text-gray-500 hover:text-gray-300 underline text-center"
                        title={tool.secondaryLabel}
                      >
                        {tool.secondaryLabel} version
                      </a>
                    ) : (
                      <a
                        href={tool.secondaryHref}
                        className="inline-flex items-center justify-center w-full border border-accent text-accent bg-transparent px-4 py-2.5 rounded-lg hover:bg-accent hover:text-white transition-colors"
                        title={tool.secondaryLabel}
                      >
                        {tool.secondaryLabel}
                      </a>
                    )
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Notes */}
        <section className="mt-12 text-sm text-gray-500">
          <p>
            Feature requests and bugs - email{" "}
            <a href="mailto:nick@patternripple.com" className="underline hover:text-accent">
              nick@patternripple.com
            </a>.
          </p>
        </section>
      </main>
    </div>
  );
}
