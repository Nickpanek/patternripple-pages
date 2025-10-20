// app/collections/page.tsx
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "PatternRipple Collections - Spoonflower Designs by Nick Panek",
  description:
    "I used to sell patterns here. You can now find my latest fabric and wallpaper designs on Spoonflower.",
  alternates: { canonical: "https://www.patternripple.com/collections" },
  openGraph: {
    title: "PatternRipple Collections - Spoonflower Designs by Nick Panek",
    description:
      "Browse my current fabric and wallpaper designs on Spoonflower.",
    url: "https://www.patternripple.com/collections",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PatternRipple Collections - Spoonflower Designs by Nick Panek",
    description: "See my Spoonflower shop for all current designs.",
  },
};

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-thin tracking-wide text-gray-900 mb-4">
            PatternRipple Collections
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            I used to sell patterns here, but everything has been moved to my
            Spoonflower shop where you can order fabric, wallpaper, and decor.
            I’m still a one-person team making creative tools, but my artwork
            continues there.
          </p>

          <div className="mt-8">
            <a
              href="https://www.spoonflower.com/profiles/nickpanek?sub_action=shop&utm_medium=social&utm_source=heylink.me"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-purple-600 text-white text-lg font-medium px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Visit My Spoonflower Shop →
            </a>
          </div>

          <div className="mt-6">
            <Link
              href="/lab"
              className="inline-block text-gray-700 underline hover:text-purple-700 text-sm"
            >
              Back to the Lab
            </Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center text-gray-500 text-sm px-4">
          <p>This page now points to my external shop.</p>
          <p className="mt-2">No tracking. No subscriptions. Just links.</p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center text-sm py-6">
        <p>&copy; 2025 PatternRipple. All rights reserved.</p>
      </footer>
    </div>
  );
}