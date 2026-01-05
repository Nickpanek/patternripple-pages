import Link from "next/link";
import type { Metadata } from "next";

// SEO
export const metadata: Metadata = {
  title: "About PatternRipple - Free Creative Software by Nick Panek | No Subscriptions",
  description:
    "PatternRipple by Nick Panek offers free creative software, browser tools, research datasets, and HTML5 games. No subscriptions, no SaaS traps. One-time purchases only. Files stay local, privacy-focused tools for designers, developers, and creators.",
  keywords: "Nick Panek, PatternRipple, about, creative software, no subscriptions, one-time purchase, privacy-focused tools, indie developer, free tools, research lab, browser games",
  alternates: { canonical: "https://www.patternripple.com/about" },
  openGraph: {
    title: "About PatternRipple | Free Creative Tools by Nick Panek",
    description:
      "Free creative software, research data, and games. No subscriptions ever. Built by Nick Panek.",
    url: "https://www.patternripple.com/about",
    type: "website",
    siteName: "PatternRipple",
  },
  twitter: {
    card: "summary_large_image",
    title: "About PatternRipple - No Subscriptions, Free Tools",
    description:
      "Free creative software and tools by Nick Panek. No subscriptions ever.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#111] text-gray-200">
      {/* Hero */}
      <header className="bg-[#1a1a1a]/80 backdrop-blur-sm border-b border-gray-700 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-thin tracking-wide text-gray-100 mb-3">
            PatternRipple
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            I used to sell patterns on this site. I’m now building software that
            will never have a subscription. It’s just me here—a one-man team—and
            I’ll squash bugs as fast as I can. Files stay local where possible.
          </p>

          <div className="mt-6 flex justify-center gap-3">
            <Link
              href="/"
              className="inline-block border border-accent text-accent px-5 py-3 rounded-lg hover:bg-accent hover:text-white transition-colors"
            >
              Back to Home
            </Link>
            <Link
              href="/software"
              className="inline-block bg-accent text-white px-5 py-3 rounded-lg hover:bg-accent/90 transition-colors"
            >
              Visit Software
            </Link>
          </div>
        </div>
      </header>

      {/* About Section */}
      <main className="max-w-4xl mx-auto px-4 py-14 text-gray-200">
        <section className="prose prose-invert prose-gray max-w-none space-y-8">
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">
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
            All tools listed in the <strong>Software section are free</strong> and will
            always stay free. They're prototypes and experiments designed to run
            in your browser, no account needed.
          </p>

          <p>
            The <strong>Research Lab</strong> hosts public domain datasets and in silico
            discoveries—freely available for research and commercial use.
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
              className="text-accent underline hover:text-accent/80"
              target="_blank"
              rel="noopener noreferrer"
            >
              heylink.me/nickpanek
            </a>
          </p>
        </section>

        {/* Footer Contact */}
        <section className="mt-10 text-sm text-gray-500">
          <p>
            Found a bug or have feedback? Email{" "}
            <a
              href="mailto:nick@patternripple.com"
              className="underline hover:text-accent"
            >
              nick@patternripple.com
            </a>.
          </p>
        </section>
      </main>
    </div>
  );
}
