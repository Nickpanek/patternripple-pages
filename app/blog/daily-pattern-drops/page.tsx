"use client";

import NextHead from "next/head";
import Link from "next/link";

export const dynamic = "force-static";

const title = "Daily Pattern Drops at PatternRipple";
const description =
  "PatternRipple is live with a new digital pattern every day. Learn how daily drops work, where to find licensing, terms, and privacy details, and explore our collections.";
const slug = "daily-pattern-drops";
const canonical = `https://patternripple.com/blog/${slug}`;
const publishedTime = "2025-09-25T09:00:00-05:00";
const modifiedTime = "2025-09-25T09:00:00-05:00"; // update if you revise
const readingTime = "2 min read";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: title,
  description,
  datePublished: publishedTime,
  dateModified: modifiedTime,
  author: [{ "@type": "Organization", name: "PatternRipple" }],
  publisher: {
    "@type": "Organization",
    name: "PatternRipple",
    logo: {
      "@type": "ImageObject",
      url: "https://patternripple.com/android-chrome-512x512.png",
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": canonical,
  },
  url: canonical,
};

export default function DailyPatternDropsPost() {
  return (
    <>
      <NextHead>
        <title>{title} | PatternRipple</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={`${title} | PatternRipple`} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <meta property="article:published_time" content={publishedTime} />
        <meta property="article:modified_time" content={modifiedTime} />
        <meta name="twitter:card" content="summary_large_image" />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </NextHead>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div className="max-w-3xl mx-auto px-4 py-10">
            <nav className="text-sm text-gray-500 mb-4">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <span className="mx-1">/</span>
              <Link href="/blog" className="hover:underline">
                Blog
              </Link>
              <span className="mx-1">/</span>
              <span className="text-gray-700">{title}</span>
            </nav>

            <h1 className="text-4xl font-light tracking-wide text-gray-900">
              {title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-600">
              <time dateTime={publishedTime} suppressHydrationWarning>
                {new Date(publishedTime).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span aria-hidden="true">•</span>
              <span>{readingTime}</span>
            </div>
          </div>
        </header>

        {/* Body */}
        <main className="max-w-3xl mx-auto px-4 py-12">
          <article className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 md:p-10">
            <div className="prose prose-lg max-w-none text-gray-800">
              <p>
                Welcome to PatternRipple! I’m thrilled to announce that starting
                today, I’ll be releasing a <strong>new digital pattern every single day</strong>.
                Whether you’re a designer, crafter, or creator, you can count on
                fresh inspiration delivered daily.
              </p>

              <h2>How Daily Pattern Drops Work</h2>
              <ul>
                <li>
                  <strong>High quality previews and mockups</strong> to showcase
                  each design in real use.
                </li>
                <li>
                  <strong>Clear descriptions</strong> so you know exactly what
                  makes every pattern unique.
                </li>
                <li>
                  <strong>Transparent pricing and licensing info</strong> so you
                  can confidently use the designs in your projects.
                </li>
              </ul>
              <p>
                All patterns are easy to browse, purchase, and download
                instantly, making PatternRipple a simple and reliable source for
                digital design assets.
              </p>

              <h2>Built on Trust and Transparency</h2>
              <p>
                PatternRipple is more than just patterns. It’s a commitment to
                clarity and quality. Explore these key resources:
              </p>
              <ul>
                <li>
                  <Link href="/about" className="underline underline-offset-4">
                    About
                  </Link>{" "}
                  - the story and mission behind PatternRipple.
                </li>
                <li>
                  <Link href="/terms" className="underline underline-offset-4">
                    Terms
                  </Link>{" "}
                  - straightforward usage guidelines.
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="underline underline-offset-4"
                  >
                    Privacy
                  </Link>{" "}
                  - how your information is handled safely.
                </li>
                <li>
                  <Link
                    href="/licenses"
                    className="underline underline-offset-4"
                  >
                    Licenses
                  </Link>{" "}
                  - detailed permissions for personal and commercial use.
                </li>
              </ul>

              <h2>Explore Our Pattern Collections</h2>
              <p>
                PatternRipple offers a wide range of curated{" "}
                <Link
                  href="/collections"
                  className="underline underline-offset-4"
                >
                  pattern collections
                </Link>
                , each with its own style and mood. You’ll find Abstract, Faux
                Embroidery, Geometric, Groovy and Psychedelic, Patchwork Quilt,
                Seasonal, Cute Animals, Horror, Architecture, Old West, Preppy
                and Posh, UFO and Cryptids, and more.
              </p>

              <h2>Why PatternRipple?</h2>
              <ul>
                <li>
                  <strong>Daily updates</strong> - a brand new design every day.
                </li>
                <li>
                  <strong>Creative variety</strong> - from playful and bold to
                  timeless and minimal.
                </li>
                <li>
                  <strong>Designed with care</strong> - crafted to be striking
                  and versatile.
                </li>
              </ul>

              <h2>Stay Inspired Every Day</h2>
              <p>
                PatternRipple is your hub for fresh{" "}
                <strong>digital patterns</strong>, textures, and design assets.
                Add us to your bookmarks and check back daily for the latest
                releases. Tomorrow’s drop is already lined up.
              </p>
            </div>

            {/* CTA row */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-purple-600 text-white px-5 py-3 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Browse Patterns
              </Link>
              <Link
                href="/collections"
                className="inline-flex items-center gap-2 bg-white text-gray-700 px-5 py-3 rounded-lg border shadow hover:shadow-md transition-shadow"
              >
                Explore Collections
              </Link>
            </div>
          </article>
        </main>
      </div>
    </>
  );
}
