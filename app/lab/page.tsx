import Link from "next/link";
import type { Metadata } from "next";

// SEO
export const metadata: Metadata = {
  title: "PatternRipple Lab - Free tools and prototypes",
  description:
    "Free in-browser tools and prototypes. Seamless pattern creator, tile checker, audio processor, slideshow maker, and the cqs-rs browser demo.",
  alternates: { canonical: "https://www.patternripple.com/lab" },
  openGraph: {
    title: "PatternRipple Lab - Free tools and prototypes",
    description:
      "Try the seamless pattern creator, tile checker, audio processor, slideshow maker, and the cqs-rs browser demo.",
    url: "https://www.patternripple.com/lab",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PatternRipple Lab - Free tools and prototypes",
    description: "Hands-on browser tools. No install.",
  },
};

type Tool = {
  slug: string;
  title: string;
  href: string;
  summary: string;
  badge?: string;
};

const tools: Tool[] = [
  {
    slug: "cqs-rs-browser-simulator",
    title: "cqs-rs Browser Demo",
    href: "/cqs_rs_docs.html",
    summary:
      "Run small quantum-circuit programs in the browser. JSON editor, shots control, and inline results for a demo subset of the Rust simulator.",
    badge: "Updated",
  },
  {
    slug: "audio-looper-panek",
    title: "Audio Looper",
    href: "/audio-looper-panek.html",
    summary:
      "Loop audio directly in your browser with adjustable start and end points, tempo control, and panning. Ideal for musicians and producers testing loops or stems.",
    badge: "New",
  },
  {
    slug: "seamless-pattern-creator",
    title: "Seamless Pattern Creator",
    href: "/seamless-pattern-creator.html",
    summary:
      "Build seamless tiles directly in your browser. Offset and wrap artwork, preview as repeating tiles, and export your final pattern image.",
    badge: "New",
  },

  {
    slug: "seamless-pattern-checker",
    title: "Seamless Pattern Checker",
    href: "/pattern-checker.html",
    summary:
      "Load an image and preview it as tiles. Set rows and columns, toggle gaps to spot seams, or load from a URL.",
    badge: "Free",
  },
  {
    slug: "audio-processor",
    title: "Audio Processor - Fade plus Normalize",
    href: "/audio-processor.html",
    summary:
      "Browser based fades and normalize using Web Audio. Works offline in the tab. Export WAV or MP3.",
    badge: "No upload",
  },
  {
    slug: "property-slideshow-maker",
    title: "Property Slideshow Maker",
    href: "/property-slideshow-maker.html",
    summary:
      "Build quick listing videos. Choose aspect ratio, add address, price, details, color, and logo. Export WebM, GIF, or frames ZIP.",
    badge: "For agents",
  },
];

// JSON-LD
const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: tools.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `https://www.patternripple.com${t.href}`,
    name: t.title,
  })),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "PatternRipple Lab",
  url: "https://www.patternripple.com/lab",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.patternripple.com/search?q={query}",
    "query-input": "required name=query",
  },
};

export default function LabPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      {/* Hero */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-thin tracking-wide text-gray-900 mb-3">
            PatternRipple Lab
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Free browser tools and prototypes. Files stay local where possible.
          </p>
          <div className="mt-5 flex justify-center gap-3">
            <Link
              href="/games"
              className="inline-block bg-gray-900 text-white px-5 py-3 rounded-lg hover:bg-purple-600 transition-colors"
            >
              See Games
            </Link>
            <Link
              href="/"
              className="inline-block bg-white border border-gray-300 text-gray-900 px-5 py-3 rounded-lg hover:border-purple-500 hover:text-purple-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Tools grid */}
      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <article
              key={tool.slug}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all ring-1 ring-gray-200"
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-light text-gray-900">
                    <Link href={tool.href} className="hover:text-purple-700">
                      {tool.title}
                    </Link>
                  </h2>
                  {tool.badge ? (
                    <span className="ml-3 text-xs font-semibold tracking-wide bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full">
                      {tool.badge}
                    </span>
                  ) : null}
                </div>

                <p className="mt-3 text-gray-700 text-sm flex-1">{tool.summary}</p>

                <div className="mt-5">
                  <Link
                    href={tool.href}
                    className="inline-flex items-center justify-center w-full bg-gray-900 text-white px-4 py-2.5 rounded-lg hover:bg-purple-600 transition-colors"
                    prefetch={false}
                    title={`Open ${tool.title}`}
                  >
                    Open tool
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Notes */}
        <section className="mt-12 text-sm text-gray-600">
          <p>
            Want a feature added - open a GitHub issue or email nick@patternripple.com.
          </p>
        </section>
      </main>
    </div>
  );
}
