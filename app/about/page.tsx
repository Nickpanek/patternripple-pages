import Link from "next/link";
import type { Metadata } from "next";

// SEO
export const metadata: Metadata = {
  title: "About PatternRipple | Nick Panek",
  description:
    "PatternRipple by Nick Panek – creative tools, free lab projects, and digital assets. No subscriptions ever. Build smarter, faster, and freely.",
  alternates: { canonical: "https://www.patternripple.com/about" },
  openGraph: {
    title: "About PatternRipple | Nick Panek",
    description:
      "Learn about PatternRipple, created by Nick Panek. Free creative tools, pattern lab, and time-saving digital resources.",
    url: "https://www.patternripple.com/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About PatternRipple | Nick Panek",
    description:
      "Free creative tools built by Nick Panek. No subscriptions ever.",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Hero */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-thin tracking-wide text-gray-900 mb-3">
            PatternRipple
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            I used to sell patterns on this site. I’m now building software that
            will never have a subscription. It’s just me here—a one-man team—and
            I’ll squash bugs as fast as I can. Files stay local where possible.
          </p>

          <div className="mt-6 flex justify-center gap-3">
            <Link
              href="/"
              className="inline-block bg-white border border-gray-300 text-gray-900 px-5 py-3 rounded-lg hover:border-purple-500 hover:text-purple-700 transition-colors"
            >
              Back to Home
            </Link>
            <Link
              href="/lab"
              className="inline-block bg-gray-900 text-white px-5 py-3 rounded-lg hover:bg-purple-600 transition-colors"
            >
              Visit the Lab
            </Link>
          </div>
        </div>
      </header>

      {/* About Section */}
      <main className="max-w-4xl mx-auto px-4 py-14 text-gray-800">
        <section className="prose prose-gray max-w-none">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            About PatternRipple
          </h2>
          <p>
            I’m Nick Panek, the creator of PatternRipple. This started as a place
            to share my seamless patterns, but it’s evolved into a hub for creative
            tools and digital resources that save time and cut wasted effort.
          </p>
          <p>
            Every tool I build comes from real workflow problems I’ve solved for
            myself—and now I share them with anyone who wants to work smarter.
          </p>
          <p>
            All PatternRipple Lab tools are free and will always stay free. Every
            update keeps a link to the previous version, so if something changes and
            you prefer an older release, you can keep using it. I never delete old
            versions. Your workflow, your choice.
          </p>
          <p>
            In the future, I’ll also release paid tools—but never subscription-based.
            No monthly fees, no SaaS lock-ins. That subscription plague is exactly
            why I started building my own tools in the first place. You buy it once,
            you own it.
          </p>
          <p>
            I also share free assets for gamers, content creators, authors, and
            haunted house designers—resources built to inspire creativity across
            different projects. I still sell fabric and wallpaper designs, and if one
            of my free tools helps you out, you can buy me a coffee as a thank-you.
          </p>
          <p>
            Explore everything I make and share here:{" "}
            <a
              href="https://heylink.me/nickpanek/"
              className="text-purple-700 underline hover:text-purple-800"
              target="_blank"
              rel="noopener noreferrer"
            >
              heylink.me/nickpanek
            </a>
          </p>
        </section>

        {/* Footer Contact */}
        <section className="mt-10 text-sm text-gray-600">
          <p>
            Found a bug or have feedback? Email{" "}
            <a
              href="mailto:nick@patternripple.com"
              className="underline hover:text-purple-700"
            >
              nick@patternripple.com
            </a>.
          </p>
        </section>
      </main>
    </div>
  );
}
