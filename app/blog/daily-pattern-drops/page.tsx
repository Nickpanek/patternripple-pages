// app/blog/daily-pattern-drops/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Daily Pattern Drops - Archived - PatternRipple",
  description:
    "This post is archived. Browse the Lab and current fabric and wallpaper designs on Spoonflower.",
  alternates: { canonical: "https://www.patternripple.com/blog/daily-pattern-drops" },
  openGraph: {
    title: "Daily Pattern Drops - Archived",
    description:
      "This post is archived. Visit the Lab for tools and Spoonflower for current designs.",
    url: "https://www.patternripple.com/blog/daily-pattern-drops",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily Pattern Drops - Archived",
    description:
      "This post is archived. Visit the Lab and my Spoonflower shop.",
  },
};

export default function DailyPatternDropsArchived() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
          Daily Pattern Drops - Archived
        </h1>
        <p className="mt-4 text-gray-700">
          This post has been archived to keep things tidy.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link
            href="/lab"
            className="block rounded-lg border border-gray-200 bg-white p-5 hover:shadow-sm"
          >
            <h2 className="font-medium text-gray-900">PatternRipple Lab</h2>
            <p className="mt-1 text-sm text-gray-600">
              Free web tools and experiments.
            </p>
          </Link>

          <a
            href="https://www.spoonflower.com/profiles/patternripple"
            className="block rounded-lg border border-gray-200 bg-white p-5 hover:shadow-sm"
            rel="noopener noreferrer"
            target="_blank"
          >
            <h2 className="font-medium text-gray-900">Spoonflower Shop</h2>
            <p className="mt-1 text-sm text-gray-600">
              Current fabric and wallpaper designs.
            </p>
          </a>
        </div>

        <div className="mt-10">
          <Link
            href="/blog"
            className="text-sm text-blue-700 hover:underline"
          >
            Back to Blog
          </Link>
        </div>
      </section>
    </main>
  );
}