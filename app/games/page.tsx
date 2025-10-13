"use client";

import Link from "next/link";

type Game = {
  slug: string;
  title: string;
  description: string;
  href: string;
  badge?: string;
};

const games: Game[] = [
  {
    slug: "bubble",
    title: "Bubble Pop",
    description:
      "Pop as many bubbles as you can in 30 seconds. Smaller bubbles pay more.",
    href: "/bubble.html",
    badge: "New",
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-thin tracking-wide text-gray-900 mb-3">
            Games
          </h1>
          <p className="text-gray-600">
            Quick, lightweight browser games hosted on PatternRipple.
          </p>
          <div className="mt-4">
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-purple-600 underline underline-offset-4"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((g) => (
            <article
              key={g.slug}
              className="bg-white rounded-xl shadow-lg ring-4 ring-amber-400 overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-1"
            >
              {g.badge && (
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold py-2 text-center tracking-wider">
                  {g.badge}
                </div>
              )}
              <div className="h-48 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                <span className="text-3xl">🎮</span>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-light text-gray-900 mb-2">{g.title}</h2>
                <p className="text-gray-600 text-sm mb-4">{g.description}</p>
                <Link
                  href={g.href}
                  prefetch={false}
                  className="block w-full bg-gray-900 text-white text-center py-3 rounded-lg hover:bg-purple-600 transition-colors duration-300"
                >
                  Play
                </Link>
              </div>
            </article>
          ))}
        </div>

      
      </main>

      <footer className="bg-gray-900 text-gray-400 mt-20">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-sm">
          <p>&copy; 2025 PatternRipple. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
