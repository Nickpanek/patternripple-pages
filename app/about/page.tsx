export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Hero */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-thin tracking-wide text-gray-900 mb-4">
            About PatternRipple
          </h1>
          <p className="text-lg text-gray-600">
            Exclusive patterns, practical tools, and a working lab
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 space-y-8">
          {/* What we do */}
          <section>
            <h2 className="text-2xl font-light text-gray-900 mb-4">What we do</h2>
            <p className="text-gray-700 leading-relaxed">
              PatternRipple sells one-of-one seamless designs. When you buy a pattern here, it is pulled from circulation and no one else can buy it. You get a clean license, clear terms, and files that are ready for production.
            </p>
          </section>

          {/* Why you see tools and extras */}
          <section>
            <h2 className="text-2xl font-light text-gray-900 mb-4">Why you see tools and extras</h2>
            <p className="text-gray-700 leading-relaxed">
              You will find utilities, small apps, and even simple games across the site. They help creatives get work done fast and they show patterns in context. They also bring new people in without ads.
            </p>
            <div className="mt-4 grid md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-1">Property slideshow maker</h3>
                <p className="text-sm text-gray-600">Share rooms and finishes. Useful for agents and designers.</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-1">Small web games</h3>
                <p className="text-sm text-gray-600">Fast loading pages that test motion, color, and usability.</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-1">More experiments</h3>
                <p className="text-sm text-gray-600">If a tool helps buyers or shows patterns better, it ships.</p>
              </div>
            </div>
          </section>

          {/* Lab and experiments */}
          <section>
            <h2 className="text-2xl font-light text-gray-900 mb-4">Lab</h2>
            <p className="text-gray-700 leading-relaxed">
              PatternRipple also runs as a lab. This is where new software and odd ideas live while they grow into real tools. One example is the quantum computer simulator we are building. Expect more experiments that blend graphics, sound, and code.
            </p>
          </section>

          {/* Custom services */}
          <section>
            <h2 className="text-2xl font-light text-gray-900 mb-4">Custom services</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-1">Logos and brand kits</h3>
                <p className="text-sm text-gray-600">Clean marks, lockups, color, and type systems.</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-1">Animated logo loops</h3>
                <p className="text-sm text-gray-600">Short loops for sites, socials, and lower thirds.</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-1">Jingles and idents</h3>
                <p className="text-sm text-gray-600">Royalty friendly audio sized for intros and stingers.</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-1">Custom stock video</h3>
                <p className="text-sm text-gray-600">Footage and loops built to your spec and timing.</p>
              </div>
            </div>
          </section>

          {/* Process */}
          <section>
            <h2 className="text-2xl font-light text-gray-900 mb-4">How we create</h2>
            <p className="text-gray-700 leading-relaxed">
              We sketch, iterate digitally, and use software to check tiling, scale, and print safety. AI is used as a utility like any editor to draft or explore color, then each design is finished by hand. If a design reads like embroidery, we label it as faux embroidery to keep listings honest.
            </p>
          </section>

          {/* How it works */}
          <section>
            <h2 className="text-2xl font-light text-gray-900 mb-4">How it works</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Pick a pattern</h3>
                  <p className="text-gray-700">Each listing is one-of-one. When it sells, it is gone.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Checkout</h3>
                  <p className="text-gray-700">Stripe payment. Files deliver right away.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Use it</h3>
                  <p className="text-gray-700">Commercial use is included. No renewals or subscriptions.</p>
                </div>
              </div>
            </div>
          </section>

          {/* What you get */}
          <section>
            <h2 className="text-2xl font-light text-gray-900 mb-4">What you get</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">📁 High-resolution files</h3>
                <p className="text-sm text-gray-600">6000x6000 px seamless PNG. Print ready.</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">🏆 Certificate of exclusivity</h3>
                <p className="text-sm text-gray-600">Dated proof that the design is yours only.</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">💼 Commercial rights</h3>
                <p className="text-sm text-gray-600">Unlimited use in your projects and client work.</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">♾️ Lifetime ownership</h3>
                <p className="text-sm text-gray-600">One payment. No recurring fees.</p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="border-t pt-8">
            <h2 className="text-2xl font-light text-gray-900 mb-4">Contact</h2>
            <p className="text-gray-700 mb-4">
              Need a custom service, a lab experiment, or a license read? Send a note.
            </p>
            <a
              href="mailto:nick@patternripple.com"
              className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email us
            </a>
          </section>
        </div>
      </main>
    </div>
  );
}