"use client";

import Link from "next/link";
import NextHead from "next/head";

type PostMeta = {
  title: string;
  slug: string;
  date: string; // ISO 8601
  excerpt: string;
};

const posts: PostMeta[] = [
  {
    title: "Daily Pattern Drops at PatternRipple",
    slug: "daily-pattern-drops",
    date: "2025-09-25",
    excerpt:
      "Welcome to PatternRipple! I’m thrilled to announce that starting today, I’ll be releasing a new digital pattern every single day. Whether you’re a designer, crafter, or creator, you can count on fresh inspiration delivered daily.",
  },
  // Add more posts here as you publish them
];

function toAbsolute(url: string) {
  return `https://patternripple.com${url}`;
}

export const dynamic = "force-static";

export default function BlogPage() {
  const pageTitle = "PatternRipple Blog | Daily patterns and design notes";
  const pageDesc =
    "Short reads about pattern design, licensing clarity, and daily drops from PatternRipple. Skim titles and first lines, then dive into any full post.";
  const pageUrl = toAbsolute("/blog");

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: posts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: toAbsolute(`/blog/${p.slug}`),
      name: p.title,
    })),
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "PatternRipple Blog",
    description: pageDesc,
    url: pageUrl,
  };

  return (
    <>
      <NextHead>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
        />
      </NextHead>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
        {/* Hero */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-thin tracking-wide text-gray-900 mb-4">
              PatternRipple Blog
            </h1>
            <p className="text-lg text-gray-600">
              Design insights, pattern trends, and creative inspiration
            </p>
          </div>
        </header>

        {/* List */}
        <main className="max-w-4xl mx-auto px-4 py-16">
          <ul className="space-y-8">
            {posts.map((post) => (
              <li
                key={post.slug}
                className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <article>
                  <header className="mb-3">
                    <h2 className="text-2xl font-light text-gray-900">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:underline"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <time
                      className="text-sm text-gray-500"
                      dateTime={post.date}
                      suppressHydrationWarning
                    >
                      {new Date(post.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </header>

                  <p className="text-gray-700">
                    {post.excerpt}{" "}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-purple-700 hover:text-purple-800 underline underline-offset-4"
                    >
                      Read more
                    </Link>
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </>
  );
}
