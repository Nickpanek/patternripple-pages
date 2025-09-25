"use client";

import NextHead from "next/head";
import Link from "next/link";

export const dynamic = "force-static";

const title = "Free Assets From Nick (PatternRipple) on Pixabay";
const description =
  "Nick from PatternRipple shares thousands of free creative assets on Pixabay — including royalty-free music, illustrations, vectors, 3D models, and themed collections like Halloween and Embroidery Designs.";
const slug = "free-assets-on-pixabay";
const canonical = `https://patternripple.com/blog/${slug}`;
const publishedTime = "2025-09-25T12:00:00-05:00";
const modifiedTime = "2025-09-25T12:00:00-05:00";
const readingTime = "3 min read";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: title,
  description,
  datePublished: publishedTime,
  dateModified: modifiedTime,
  author: [{ "@type": "Person", name: "Nick Panek" }],
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

export default function FreeAssetsPost() {
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
                Hey friends — quick heads-up: I (Nick from PatternRipple) make a
                lot of free creative assets available on{" "}
                <a
                  href="https://pixabay.com/users/nickpanek-38266323/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4"
                >
                  Pixabay
                </a>{" "}
                under my profile <strong>nickpanek</strong>.
              </p>

              <h2>What You’ll Find</h2>
              <ul>
                <li>
                  <strong>Music tracks:</strong> royalty-free instrumentals in
                  metal, rock, funk, jazz, and more.
                </li>
                <li>
                  <strong>Images:</strong> illustrations, vectors, and a few
                  videos and GIFs for seasonal or themed use.
                </li>
                <li>
                  <strong>3D models:</strong> downloadable assets to drop into
                  renders or motion work.
                </li>
              </ul>

              <h2>Featured Collections</h2>
              <ul>
                <li>Halloween Assets – spooky audio loops and visuals.</li>
                <li>
                  Embroidery Designs – digital stitch-style graphics, a natural
                  fit with PatternRipple’s faux embroidery vibes.
                </li>
                <li>Romantic Book Covers – soft, atmospheric stock imagery.</li>
                <li>
                  Catholic – themed visuals for liturgical seasons and projects.
                </li>
              </ul>

              <h2>Fast Ways To Use These</h2>
              <p>
                Filter by <em>Music</em> to find background tracks, or dive into
                <em>Collections</em> for matched sets. Everything is free under
                the Pixabay License — always check the specific asset page for
                details before commercial use.
              </p>
            </div>

            {/* CTA row */}
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="https://pixabay.com/users/nickpanek-38266323/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-purple-600 text-white px-5 py-3 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Visit My Pixabay Profile
              </a>
              <Link
                href="/collections"
                className="inline-flex items-center gap-2 bg-white text-gray-700 px-5 py-3 rounded-lg border shadow hover:shadow-md transition-shadow"
              >
                Explore PatternRipple Collections
              </Link>
            </div>
          </article>
        </main>
      </div>
    </>
  );
}
