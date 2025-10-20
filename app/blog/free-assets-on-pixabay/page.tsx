// app/blog/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog - PatternRipple",
  description:
    "News and updates from PatternRipple Labs. Visit the Lab for free tools or Spoonflower for current fabric and wallpaper designs.",
  alternates: { canonical: "https://www.patternripple.com/blog" },
  openGraph: {
    title: "Blog - PatternRipple",
    description:
      "Latest updates from PatternRipple Labs. Visit the Lab for free tools or Spoonflower for designs.",
    url: "https://www.patternripple.com/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - PatternRipple",
    description:
      "News and updates from PatternRipple Labs. Visit the Lab for tools or Spoonflower for fabric and wallpaper.",
  },
};

export default function BlogIndex() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900">
            Blog
          </h1>
          <p className="mt-3 text-gray-700">
            Updates and notes from PatternRipple Labs. For design tools, visit the Lab.  
            For fabric and wallpaper, visit Spoonflower.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              href="/lab"
              className="rounded-md bg-gray-900 px-4 py-2 text-white hover:bg-gray-800"
            >
              Go to Lab
            </Link>
            <a
              href="https://www.spoonflower.com/profiles/patternripple"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 hover:bg-gray-50"
            >
              Spoonflower Shop
            </a>
          </div>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <ul className="space-y-6">
          {/* New blog entry */}
          <li className="rounded-lg border border-gray-200 bg-white p-5">
            <h2 className="text-xl font-medium text-gray-900">
              Cloudflare Build Fix and Deployment Notes
            </h2>
            <p className="mt-1 text-gray-700">
              A detailed breakdown of recent build issues on Cloudflare Pages and how they were resolved.
              Includes steps for maintaining compatibility with Next.js 14 and switching to OpenNext.
            </p>
            <div className="mt-3">
              <Link
                href="/blog/cloudflare-build-fix"
                className="text-blue-700 hover:underline"
              >
                Read post
              </Link>
            </div>
          </li>

          {/* Archived older post */}
          <li className="rounded-lg border border-gray-200 bg-white p-5">
            <h2 className="text-xl font-medium text-gray-900">
              Daily Pattern Drops - Archived
            </h2>
            <p className="mt-1 text-gray-700">
              This entry is archived and now points to the Lab and Spoonflower.
            </p>
            <div className="mt-3">
              <Link
                href="/blog/daily-pattern-drops"
                className="text-blue-700 hover:underline"
              >
                View entry
              </Link>
            </div>
          </li>
        </ul>
      </section>
    </main>
  );
}