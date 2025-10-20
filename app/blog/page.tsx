Paste this over your blog page. It removes the “Daily Drops” post from the listing and strips all “daily drops/patterns” mentions from titles/descriptions.

import NextHead from "next/head";
import Link from "next/link";
import path from "path";
import { promises as fs } from "fs";

type PostMeta = {
  title: string;
  slug: string;
  description?: string;
  published: string; // ISO 8601
  modified?: string; // ISO 8601
  tags?: string[];
};

function toAbsolute(url: string) {
  return `https://www.patternripple.com${url}`;
}

function isDailyDrops(p: PostMeta) {
  const inTitle = /daily\s*drops?/i.test(p.title ?? "");
  const inSlug = /daily-?drops?/i.test(p.slug ?? "");
  const inTags = Array.isArray(p.tags) && p.tags.some((t) => /daily|drops?/i.test(t));
  return inTitle || inSlug || inTags;
}

async function loadPosts(): Promise<PostMeta[]> {
  const blogDir = path.join(process.cwd(), "app", "blog");
  const entries = await fs.readdir(blogDir, { withFileTypes: true });

  const jsonFiles = entries
    .filter((e) => e.isFile() && e.name.endsWith(".json"))
    .map((e) => path.join(blogDir, e.name));

  const posts: PostMeta[] = [];
  for (const file of jsonFiles) {
    try {
      const raw = await fs.readFile(file, "utf8");
      const data = JSON.parse(raw);
      if (data?.title && data?.slug && data?.published) {
        posts.push({
          title: data.title,
          slug: data.slug,
          description: data.description ?? "",
          published: data.published,
          modified: data.modified ?? data.published,
          tags: Array.isArray(data.tags) ? data.tags : [],
        });
      }
    } catch {
      // ignore malformed json
    }
  }

  // Remove any "Daily Drops" posts
  const filtered = posts.filter((p) => !isDailyDrops(p));

  // Sort by published desc
  filtered.sort(
    (a, b) =>
      new Date(b.published).getTime() - new Date(a.published).getTime()
  );

  return filtered;
}

export const dynamic = "force-static";

export default async function BlogPage() {
  const posts = await loadPosts();

  const pageTitle = "PatternRipple Blog | Software notes and updates";
  const pageDesc =
    "Short posts on tool updates, release notes, and build tips for browser based software. No subscriptions.";
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
              Software notes, tool updates, and simple release logs.
            </p>
          </div>
        </header>

        {/* List */}
        <main className="max-w-4xl mx-auto px-4 py-16">
          {posts.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-600">
              No posts yet. Check back soon.
            </div>
          ) : (
            <ul className="space-y-8">
              {posts.map((post) => (
                <li
                  key={post.slug}
                  className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <article itemScope itemType="https://schema.org/BlogPosting">
                    <header className="mb-3">
                      <h2 className="text-2xl font-light text-gray-900" itemProp="headline">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="hover:underline"
                        >
                          {post.title}
                        </Link>
                      </h2>
                      <time
                        className="text-sm text-gray-500"
                        dateTime={post.published}
                        suppressHydrationWarning
                        itemProp="datePublished"
                      >
                        {new Date(post.published).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </header>

                    <p className="text-gray-700" itemProp="description">
                      {(post.description || "").slice(0, 180)}
                      {post.description && post.description.length > 180 ? "..." : ""}
                      {" "}
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-purple-700 hover:text-purple-800 underline underline-offset-4"
                      >
                        Read more
                      </Link>
                    </p>

                    <meta itemProp="url" content={toAbsolute(`/blog/${post.slug}`)} />
                    {post.modified && (
                      <meta itemProp="dateModified" content={post.modified} />
                    )}
                  </article>
                </li>
              ))}
            </ul>
          )}
        </main>
      </div>
    </>
  );
}