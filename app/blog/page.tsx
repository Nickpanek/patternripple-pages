// app/blog/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog - PatternRipple",
  description:
    "News and updates. Older posts may be archived. Visit the Lab and Spoonflower for current work.",
  alternates: { canonical: "https://www.patternripple.com/blog" },
  openGraph: {
    title: "Blog - PatternRipple",
    description:
      "News and updates. Visit the Lab and Spoonflower for current work.",
    url: "https://www.patternripple.com/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - PatternRipple",
    description:
      "News and updates. Visit the Lab and Spoonflower for current work.",
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
            Updates and notes. For tools, visit the Lab. For fabric and wallpaper, visit Spoonflower.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              href="/lab"
              className="rounded-md bg-gray-900 px-4 py-2 text-white hover:bg-gray-800"
            >
              Go to Lab
            </Link>
            <a
              href="https://www.spoonflower.com/profiles/nickpanek"
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
          {/* New SmoothSnap blog entry */}
          <li className="rounded-lg border border-gray-200 bg-white p-5">
            <h2 className="text-xl font-medium text-gray-900">
              SmoothSnap Pattern Checker - Verify Seamless Repeats Fast
            </h2>
            <p className="mt-1 text-gray-700">
              Learn how to preview and verify seamless pattern repeats using SmoothSnap. 
              Upload your PNG, JPG, or WebP files, adjust grid and gap settings, and spot seams before printing.
            </p>
            <div className="mt-3">
              <Link
                href="/blog/smoothsnap-pattern-checker"
                className="text-blue-700 hover:underline"
              >
                Read post
              </Link>
            </div>
          </li>

          {/* Add more posts here as you publish new entries */}
        </ul>
      </section>
    </main>
  );
}
