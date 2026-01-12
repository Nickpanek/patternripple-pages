import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

// SEO
export const metadata: Metadata = {
  title: "Free Games - Slot Machines, Bubble Pop, Chess & More | PatternRipple",
  description: "Play FREE browser games online! Tacticool Patches Slot Machine, Old West Slots, Bubble Pop, Dystopian Chess, and more. No download, no signup, instant play on desktop and mobile.",
  keywords: "free slot machine, old west slots, free browser games, HTML5 games, online games, slot machine game, bubble pop game, chess game, airsoft games, casual games, no download games, instant play games, mobile games, free games, wild west games",
  alternates: { canonical: "https://www.patternripple.com/games" },
  openGraph: {
    title: "Free Games - Slot Machines & More | PatternRipple",
    description: "FREE slot machines, Bubble Pop, Chess, and more. Instant play, no downloads or signups.",
    url: "https://www.patternripple.com/games",
    type: "website",
    siteName: "PatternRipple",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Browser Games - Slot Machines & More",
    description: "Tacticool Patches Slot, Old West Slots, Bubble Pop, Dystopian Chess. Free games, no download.",
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

type Game = {
  slug: string;
  title: string;
  description: string;
  href: string;
  badge?: string;
  previewImage?: string;
};

const games: Game[] = [
  {
    slug: "tacticool-patches-slot",
    title: "Tacticool Patches Slot Machine",
    description:
      "FREE slot machine featuring custom embroidered airsoft & milsim patch designs! Cascading reels, free spins bonus, background music, and fullscreen mode. Play instantly in your browser.",
    href: "/paintball-slot/index.html",
    badge: "Featured",
    previewImage: "/paintball-slot/tacticalgif.gif",
  },
  {
    slug: "old-west-slots",
    title: "Old West Slots",
    description:
      "Step into the Wild West with this classic slot machine! Features authentic Old West imagery, exciting bonus rounds, background music, and smooth animations. Can you strike gold?",
    href: "/old-west-slots/index.html",
    badge: "New",
    previewImage: "/old-west-slots/preview.gif",
  },
  {
    slug: "bubble",
    title: "Bubble Pop",
    description:
      "Pop as many bubbles as you can in 30 seconds. Smaller bubbles pay more.",
    href: "/bubble.html",
  },
  {
    slug: "dystopian-chess",
    title: "Dystopian Chess",
    description:
      "A bleak experiment in self-conflict. Designed to be played against yourself — the next stage of dystopia. Even if you win, the game does not end, because bureaucracy never dies, not because I'm too lazy to fix the code.",
    href: "/dystopian-chess.html",
    badge: "Experimental",
  },
];

export default function GamesPage() {
  return (
    <div className="min-h-screen bg-[#111] text-gray-200">
      {/* Hero */}
      <header className="bg-[#1a1a1a]/80 backdrop-blur-sm border-b border-gray-700 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-thin tracking-wide text-gray-100 mb-3">
            Games
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Free browser-based HTML5 games. Play instantly, no downloads or accounts needed.
          </p>
          <div className="mt-5">
            <Link
              href="/"
              className="inline-block border border-accent text-accent px-5 py-3 rounded-lg hover:bg-accent hover:text-white transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Games grid */}
      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <article
              key={game.slug}
              className="bg-[#1e1e1e] rounded-2xl shadow-md hover:shadow-xl transition-all ring-1 ring-gray-700"
            >
              <div className="p-6 flex flex-col h-full">
                {game.previewImage && (
                  <div className="mb-4 rounded-lg overflow-hidden bg-black">
                    <Image
                      src={game.previewImage}
                      alt={`${game.title} preview`}
                      width={640}
                      height={360}
                      className="w-full h-auto"
                      unoptimized
                    />
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-light text-gray-100">
                    <Link href={game.href} className="hover:text-accent">
                      {game.title}
                    </Link>
                  </h2>
                  {game.badge ? (
                    <span className="ml-3 text-xs font-semibold tracking-wide bg-accent/20 text-accent px-2.5 py-1 rounded-full">
                      {game.badge}
                    </span>
                  ) : null}
                </div>

                <p className="mt-3 text-gray-400 text-sm flex-1">{game.description}</p>

                <div className="mt-5">
                  <Link
                    href={game.href}
                    className="inline-flex items-center justify-center w-full bg-accent text-white px-4 py-2.5 rounded-lg hover:bg-accent/90 transition-colors"
                    prefetch={false}
                    title={`Play ${game.title}`}
                  >
                    Play Game
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Contact */}
        <section className="mt-12 text-sm text-gray-500">
          <p>
            Have a game suggestion?{" "}
            <a href="mailto:nick@patternripple.com" className="underline hover:text-accent">
              nick@patternripple.com
            </a>
          </p>
        </section>
      </main>
    </div>
  );
}
