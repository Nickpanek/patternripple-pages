Paste this over that post. It keeps the same slug for SEO, marks the post as archived, removes pattern sales CTAs, and points people to your Lab and Spoonflower.

"use client";

import NextHead from "next/head";
import Link from "next/link";

export const dynamic = "force-static";

// keep the same slug so old links still work
const title = "About the old Daily Pattern Drops";
const description =
  "This post is archived. I used to do daily pattern drops here. I am now focused on browser software with no subscriptions. Bugs will be fixed fast. If you want fabric or wallpaper, visit my Spoonflower shop.";
const slug = "daily-pattern-drops";
const canonical = `https://patternripple.com/blog/${slug}`;
const publishedTime = "2025-09-25T09:00:00-05:00";
const modifiedTime = new Date().toISOString();
const readingTime = "1 min read";

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
              <p className="text-sm uppercase tracking-wide text-gray-600 mb-6">
                Archived notice
              </p>

              <p>
                I used to run daily pattern drops here. I am transitioning the site to
                software that runs in your browser. No subscriptions ever. I am a one person
                team and I will try to squash bugs fast.
              </p>

              <h2>Where to find the patterns now</h2>
              <p>
                If you are looking for fabric or wallpaper prints, please use my Spoonflower shop:
              </p>
              <p>
                <a
                  href="https://www.spoonflower.com/profiles/nickpanek?sub_action=shop&utm_medium=social&utm_source=heylink.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Visit Spoonflower
                </a>
              </p>

              <h2>What I am building now</h2>
              <p>
                Free and paid tools that run locally in the browser where possible. Start here:
                <Link href="/lab" className="underline underline-offset-4 ml-1">
                  PatternRipple Lab
                </Link>
                .
              </p>

              <h2>Policies</h2>
              <ul>
                <li>
                  <Link href="/terms" className="underline underline-offset-4">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="underline underline-offset-4">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/licenses" className="underline underline-offset-4">
                    License
                  </Link>
                </li>
              </ul>
            </div>

            {/* CTA row - updated for the pivot */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/lab"
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-3 rounded-lg hover:bg-purple-600 transition-colors"
              >
                Open the Lab
              </Link>
              <a
                href="https://www.spoonflower.com/profiles/nickpanek?sub_action=shop&utm_medium=social&utm_source=heylink.me"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-gray-700 px-5 py-3 rounded-lg border shadow hover:shadow-md transition-shadow"
              >
                Spoonflower shop
              </a>
            </div>
          </article>
        </main>
      </div>
    </>
  );
}