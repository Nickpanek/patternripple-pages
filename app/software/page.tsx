import Link from "next/link";
import type { Metadata } from "next";
import TranslateWidget from "@/components/TranslateWidget";

// ─── SEO / AEO Metadata ──────────────────────────────────────────────────────
export const metadata: Metadata = {
  title:
    "Free Browser-Based Creative Software & Tools | PatternRipple",
  description:
    "Free browser-based creative tools: seamless pattern creator, pattern repeat engine with vector design, colorway generator, PNG-to-SVG converter, pattern tile checker, audio looper, audio fade/normalize processor, and real estate slideshow maker. No installation, no account, works offline. All file processing stays in your browser.",
  keywords:
    "free browser tools, pattern creator, pattern repeat engine, colorway generator, png to svg, vector converter, seamless patterns, paper.js, audio looper, audio processor, audio fade normalize, video slideshow maker, creative tools, design software, free design tools, web-based tools, offline tools, no signup, no install, textile design, fabric pattern, surface design",
  alternates: {
    canonical: "https://www.patternripple.com/software",
    languages: { "x-default": "https://www.patternripple.com/software" },
  },
  openGraph: {
    title: "Free Creative Software & Browser Tools | PatternRipple",
    description:
      "8 free browser-based creative tools: pattern creator, pattern repeat engine, colorway generator, PNG→SVG converter, pattern checker, audio looper, audio processor, and real estate slideshow maker. No install, works offline.",
    url: "https://www.patternripple.com/software",
    type: "website",
    siteName: "PatternRipple",
    images: [
      {
        url: "https://www.patternripple.com/og-pattern-creator.png",
        width: 1200,
        height: 630,
        alt: "PatternRipple Free Creative Software Tools",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Creative Software — Pattern, Audio & Video Tools | PatternRipple",
    description:
      "8 free browser-based tools: pattern creator, pattern repeat engine, colorway generator, PNG→SVG, audio looper, audio processor, property slideshow. No signup, no install.",
    images: ["https://www.patternripple.com/og-pattern-creator.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "google-site-verification": "c8a0e8691aa34d7b8ed3aeedec565474",
  },
};

// ─── Tool data ────────────────────────────────────────────────────────────────
type Tool = {
  slug: string;
  title: string;
  href: string;
  summary: string;
  badge?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  faqQ?: string;
  faqA?: string;
};

const tools: Tool[] = [
  {
    slug: "colorway-generator",
    title: "Colorway Generator",
    href: "/colorway-generator.html",
    summary:
      "Upload a pattern image, pick from 8 preset hues (Red, Blue, Yellow, Orange, Green, Purple, Teal, Pink), and export one recolored PNG per selection as a ZIP. Preserves light/dark structure via HSL hue-shift. Grays and whites stay neutral.",
    badge: "Design",
    faqQ: "What does the Colorway Generator do?",
    faqA:
      "The Colorway Generator lets you upload a pattern image and instantly recolor it into up to 8 preset hues. Each colorway is exported as a separate PNG in a single ZIP download. All processing happens in your browser.",
  },
  {
    slug: "seamless-pattern-creator",
    title: "Seamless Pattern Creator",
    href: "/seamless-pattern-creator.html",
    summary:
      "Build seamless tiles in your browser. Offset and wrap artwork, preview as repeating tiles, and export the final image.",
    badge: "Design",
    faqQ: "How do I create a seamless repeating pattern?",
    faqA:
      "Use the Seamless Pattern Creator to upload artwork, adjust offset/wrap settings, preview tiling in real time, and export the seamless tile as a PNG. No installation or account required.",
  },
  {
    slug: "pattern-repeat-engine",
    title: "Pattern Repeat Engine",
    href: "/pattern-repeat-engine.html",
    summary:
      "Generate seamless pattern tiles with built-in vector motif creation using Paper.js. Upload images or design custom shapes, control spacing and rotation, and export optimized tiles for textile printing.",
    badge: "Design",
    faqQ: "What is the Pattern Repeat Engine?",
    faqA:
      "The Pattern Repeat Engine lets you create seamless pattern tiles with advanced controls. Upload an image or generate custom vector shapes with Paper.js, adjust scale, spacing, rotation, and stagger, then export a perfect 1000×1000px tile optimized for Spoonflower Basic Repeat.",
  },
  {
    slug: "png2svg",
    title: "PNG2SVG - Fabric Design Vectorizer",
    href: "/png2svg.html",
    summary:
      "Convert 1024×1024 px PNG designs to vector SVG for professional fabric printing. Optimized for artistic patterns. All processing happens in your browser.",
    badge: "Design",
    faqQ: "How do I convert a PNG pattern to SVG?",
    faqA:
      "Upload a 1024×1024 px PNG to the PNG2SVG tool. It vectorizes the design in your browser and downloads a high-fidelity SVG ready for fabric printing — no account or software installation needed.",
  },
  {
    slug: "seamless-pattern-checker",
    title: "Seamless Pattern Checker — SmoothSnap v1",
    href: "/pattern-checker-smoothsnap.html",
    summary:
      "Upgraded checker with smooth snapping and refined controls. Preview tiles, tune rows and columns, toggle gaps, and spot seams fast.",
    badge: "Design",
    secondaryHref: "/pattern-checker.html",
    secondaryLabel: "v0",
    faqQ: "How can I check if my pattern tiles seamlessly?",
    faqA:
      "Upload your pattern image to the Seamless Pattern Checker. It tiles the image in a live grid so you can instantly spot seams or gaps. Adjust rows, columns, and gap size to test different tiling configurations.",
  },
  {
    slug: "audio-looper-panek",
    title: "Audio Looper — Desktop Edition",
    href: "/audio-looper-panek.html",
    summary:
      "Desktop edition. Loop audio with adjustable start/end points, tempo control, and panning. Good for testing loops or stems.",
    badge: "Audio",
    secondaryHref: "https://www.patternripple.com/audio-loop-creator-mobile.html",
    secondaryLabel: "Open mobile tool",
    faqQ: "How do I create a seamless audio loop?",
    faqA:
      "Load any audio file into the Audio Looper. Use the waveform editor to set precise loop in/out points, adjust tempo, and add panning. The tool uses beat detection and zero-crossing alignment to produce smooth loops. Export as WAV or MP3.",
  },
  {
    slug: "audio-processor",
    title: "Audio Processor — Fade + Normalize",
    href: "/audio-processor.html",
    summary:
      "Browser-based fades and normalize using Web Audio. Works offline in the tab. Export WAV or MP3.",
    badge: "Audio",
    faqQ: "How do I add a fade and normalize audio online?",
    faqA:
      "Upload your audio file to the Audio Processor. Set fade-in/fade-out durations, enable normalization, and export to WAV or MP3. All processing is done locally in your browser — no file uploads to any server.",
  },
  {
    slug: "property-slideshow-maker",
    title: "Property Slideshow Maker",
    href: "/property-slideshow-maker.html",
    summary:
      "Build quick listing videos. Choose aspect ratio, add address, price, details, color, and logo. Export WebM, GIF, or frames ZIP.",
    badge: "Video",
    faqQ: "How do I make a real estate listing slideshow video?",
    faqA:
      "Upload your property photos to the Property Slideshow Maker, fill in address, price, beds/baths/sqft, and agent details, then choose an aspect ratio and brand color. Export as WebM video, animated GIF, or a ZIP of individual frames — no watermarks.",
  },
];

const order: Record<string, number> = {
  "colorway-generator": 5,
  "seamless-pattern-creator": 10,
  "pattern-repeat-engine": 12,
  "png2svg": 15,
  "seamless-pattern-checker": 20,
  "audio-looper-panek": 30,
  "audio-processor": 40,
  "property-slideshow-maker": 50,
};

const sortedTools = [...tools].sort(
  (a, b) => (order[a.slug] ?? 999) - (order[b.slug] ?? 999)
);

// ─── JSON-LD Structured Data ──────────────────────────────────────────────────
const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "PatternRipple Free Browser Tools",
  description:
    "Free browser-based creative tools for designers, musicians, and real estate professionals.",
  url: "https://www.patternripple.com/software",
  numberOfItems: sortedTools.length,
  itemListElement: sortedTools.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `https://www.patternripple.com${t.href}`,
    name: t.title,
    description: t.summary,
  })),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "PatternRipple",
  url: "https://www.patternripple.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.patternripple.com/search?q={query}",
    "query-input": "required name=query",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.patternripple.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Software",
      item: "https://www.patternripple.com/software",
    },
  ],
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PatternRipple",
  url: "https://www.patternripple.com",
  logo: "https://www.patternripple.com/og-pattern-creator.png",
  author: {
    "@type": "Person",
    name: "Nick Panek",
    url: "https://heylink.me/nickpanek/",
  },
  knowsAbout: [
    "Pattern Design",
    "Textile Design",
    "Audio Production",
    "Real Estate Marketing",
    "Browser-Based Tools",
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Are the PatternRipple tools really free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All tools on the PatternRipple software page are completely free to use with no account, subscription, or watermarks.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to install anything to use these tools?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. All PatternRipple tools run entirely in your web browser. No installation, plugin, or account is required.",
      },
    },
    {
      "@type": "Question",
      name: "Do my files get uploaded to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. All file processing (images, audio, video) happens locally inside your browser tab. Nothing is sent to any server.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use the tools offline?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most tools work offline once the page has loaded. The Audio Processor and Seamless Pattern Creator are fully offline-capable.",
      },
    },
    ...sortedTools
      .filter((t) => t.faqQ && t.faqA)
      .map((t) => ({
        "@type": "Question",
        name: t.faqQ!,
        acceptedAnswer: { "@type": "Answer", text: t.faqA! },
      })),
  ],
};

// ─── Page Component ───────────────────────────────────────────────────────────
export default function SoftwarePage() {
  const designTools = sortedTools.filter((t) => t.badge === "Design");
  const audioTools = sortedTools.filter((t) => t.badge === "Audio");
  const videoTools = sortedTools.filter((t) => t.badge === "Video");

  return (
    <div className="min-h-screen bg-[#111] text-gray-200">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <header className="bg-[#1a1a1a]/80 backdrop-blur-sm border-b border-gray-700 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          {/* Breadcrumb — visible for AEO / assistive tech */}
          <nav aria-label="Breadcrumb" className="text-xs text-gray-500 mb-4">
            <ol className="inline-flex gap-1">
              <li>
                <Link href="/" className="hover:text-accent underline">
                  PatternRipple
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li aria-current="page" className="text-gray-400">
                Software
              </li>
            </ol>
          </nav>

          <h1 className="text-5xl font-thin tracking-wide text-gray-100 mb-3">
            PatternRipple Software
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Free browser tools for creative work — patterns, audio, and video.
            Files stay local. No account required. Works offline.
          </p>
          <div className="mt-5 flex justify-center gap-3 flex-wrap">
            <Link
              href="/colorway-generator.html"
              className="inline-block bg-accent text-[#0e0e0e] font-semibold px-5 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              New: Colorway Generator
            </Link>
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

        {/* Design Tools */}
        <section aria-labelledby="design-tools-heading" className="mb-10">
          <h2 id="design-tools-heading" className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
            Design Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {designTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>

        {/* Audio Tools */}
        <section aria-labelledby="audio-tools-heading" className="mb-10">
          <h2 id="audio-tools-heading" className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
            Audio Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {audioTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>

        {/* Video Tools */}
        <section aria-labelledby="video-tools-heading" className="mb-10">
          <h2 id="video-tools-heading" className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
            Video Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>

        {/* AEO — Quick-answer FAQ visible section */}
        <section
          aria-labelledby="faq-heading"
          className="mt-4 mb-8 border border-gray-700 rounded-2xl p-6 bg-[#181818]"
        >
          <h2 id="faq-heading" className="text-base font-semibold text-gray-200 mb-4">
            Frequently Asked Questions
          </h2>
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="font-medium text-gray-300">
                Are these tools free?
              </dt>
              <dd className="mt-1 text-gray-400">
                Yes — 100% free, no account, no watermarks.
              </dd>
            </div>
            <div>
              <dt className="font-medium text-gray-300">
                Do I need to install anything?
              </dt>
              <dd className="mt-1 text-gray-400">
                No installation. Everything runs directly in your browser tab.
              </dd>
            </div>
            <div>
              <dt className="font-medium text-gray-300">
                Are my files uploaded anywhere?
              </dt>
              <dd className="mt-1 text-gray-400">
                No. All processing happens locally in your browser — your files
                never leave your device.
              </dd>
            </div>
            <div>
              <dt className="font-medium text-gray-300">
                Do the tools work offline?
              </dt>
              <dd className="mt-1 text-gray-400">
                Most tools work offline once the page has loaded. Useful for
                bandwidth-limited environments.
              </dd>
            </div>
          </dl>
        </section>

        {/* Notes */}
        <section className="mt-4 text-sm text-gray-500">
          <p>
            Feature requests and bugs — email{" "}
            <a
              href="mailto:nick@patternripple.com"
              className="underline hover:text-accent"
            >
              nick@patternripple.com
            </a>
            .
          </p>
        </section>
      </main>

      {/* Translation widget — fixed bottom-right */}
      <TranslateWidget />
    </div>
  );
}

// ─── Tool Card sub-component ──────────────────────────────────────────────────
function ToolCard({ tool }: { tool: Tool }) {
  return (
    <article
      className="bg-[#1e1e1e] rounded-2xl shadow-md hover:shadow-xl transition-all ring-1 ring-gray-700"
      itemScope
      itemType="https://schema.org/SoftwareApplication"
    >
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-center justify-between">
          <h3
            className="text-xl font-light text-gray-100"
            itemProp="name"
          >
            <Link href={tool.href} className="hover:text-accent">
              {tool.title}
            </Link>
          </h3>
          {tool.badge ? (
            <span className="ml-3 text-xs font-semibold tracking-wide bg-accent/20 text-accent px-2.5 py-1 rounded-full">
              {tool.badge}
            </span>
          ) : null}
        </div>

        <p className="mt-3 text-gray-400 text-sm flex-1" itemProp="description">
          {tool.summary}
        </p>

        <meta itemProp="applicationCategory" content={`${tool.badge}Application`} />
        <meta itemProp="operatingSystem" content="Any" />
        <meta itemProp="price" content="0" />
        <meta itemProp="priceCurrency" content="USD" />

        <div className="mt-5 grid gap-2">
          <Link
            href={tool.href}
            className="inline-flex items-center justify-center w-full bg-accent text-white px-4 py-2.5 rounded-lg hover:bg-accent/90 transition-colors"
            prefetch={false}
            title={`Open ${tool.title}`}
            itemProp="url"
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
  );
}
