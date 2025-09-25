"use client";

import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Hero Section */}
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

      <main className="max-w-4xl mx-auto px-4 py-20 space-y-12">
        {/* First Blog Post */}
        <article className="bg-white rounded-xl shadow-md p-10">
          <h2 className="text-3xl font-light text-gray-900 mb-6">
            Daily Pattern Drops at PatternRipple
          </h2>

          <div className="prose prose-lg max-w-none text-gray-700">
            <p>
              Welcome to PatternRipple! I’m thrilled to announce that starting today, I’ll
              be releasing a <strong>new digital pattern every single day</strong>. Whether you’re a
              designer, crafter, or creator, you can count on fresh inspiration delivered daily.
            </p>

            <h3>How Daily Pattern Drops Work</h3>
            <ul>
              <li>High-quality previews and mockups to showcase the design.</li>
              <li>Clear descriptions so you know exactly what makes each pattern unique.</li>
              <li>Transparent pricing and licensing info for confidence in your purchase.</li>
            </ul>

            <h3>Built on Trust and Transparency</h3>
            <p>
              PatternRipple is about more than just patterns — it’s a commitment to clarity and quality.
              Explore these key resources:
            </p>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/terms">Terms</Link></li>
              <li><Link href="/privacy">Privacy</Link></li>
              <li><Link href="/licenses">Licenses</Link></li>
            </ul>

            <h3>Explore Our Pattern Collections</h3>
            <p>
              PatternRipple offers a wide range of curated <Link href="/collections">pattern collections</Link>, each with its own unique style and mood. Categories include Abstract, Faux Embroidery, Geometric, Groovy & Psychedelic, Patchwork Quilt, Seasonal, Cute Animals, Horror, Architecture, Old West, Preppy & Posh, UFO & Cryptids, and more.
            </p>

            <h3>Why PatternRipple?</h3>
            <ul>
              <li>Daily updates — a new design every day.</li>
              <li>Creative variety — from playful and bold to timeless and minimal.</li>
              <li>Designed with care — each pattern crafted for beauty and versatility.</li>
            </ul>

            <h3>Stay Inspired Every Day</h3>
            <p>
              PatternRipple is your go-to hub for fresh <strong>digital patterns</strong>, textures, and design assets. Add us to your bookmarks and check back daily for the latest releases. Tomorrow’s drop is already lined up — don’t miss it!
            </p>
          </div>
        </article>
      </main>
    </div>
  );
}
