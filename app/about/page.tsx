export default function AboutPage() {
return (
<div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
{/* Hero Section */}
<header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 py-16">
<div className="max-w-4xl mx-auto px-4 text-center">
<h1 className="text-4xl font-thin tracking-wide text-gray-900 mb-4">
About PatternRipple
</h1>
<p className="text-lg text-gray-600">
Where exclusivity meets creativity
</p>
</div>
</header>

```
  <main className="max-w-4xl mx-auto px-4 py-12">
    <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 space-y-8">
      {/* Mission */}
      <section>
        <h2 className="text-2xl font-light text-gray-900 mb-4">Our Mission</h2>
        <p className="text-gray-700 leading-relaxed">
          PatternRipple was born from a simple belief: designers deserve patterns that are truly their own. 
          In a world of endless duplicates and overused designs, we offer something different – genuine exclusivity. 
          When you purchase a pattern from PatternRipple, it becomes yours alone. No other designer will ever have it.
        </p>
      </section>

      {/* Our Process */}
      <section>
        <h2 className="text-2xl font-light text-gray-900 mb-4">Our Creative Process</h2>
        <p className="text-gray-700 leading-relaxed">
          We blend traditional design principles with modern tools to create our exclusive patterns. 
          Our process combines hand-crafted elements, digital artistry, and yes – we also harness AI 
          as one of many tools in our creative toolkit, just as designers use Photoshop or Illustrator. 
          Whether it's generating initial concepts, refining details, or exploring color variations, 
          we use whatever tools help us deliver the most stunning, unique patterns. The result? 
          Designs that are meticulously curated, professionally finished, and completely exclusive to you.
        </p>
      </section>

      {/* How It Works */}
      <section>
        <h2 className="text-2xl font-light text-gray-900 mb-4">How It Works</h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
              1
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Browse Our Exclusive Collection</h3>
              <p className="text-gray-700">
                Each pattern is created with meticulous attention to detail and offered only once.
              </p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
              2
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Purchase With Confidence</h3>
              <p className="text-gray-700">
                Secure checkout via Stripe. Instant download of your high-resolution pattern files.
              </p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
              3
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Own It Forever</h3>
              <p className="text-gray-700">
                Full commercial rights included. Use your exclusive pattern for any project, anywhere, forever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section>
        <h2 className="text-2xl font-light text-gray-900 mb-4">What's Included</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">📁 High-Resolution Files</h3>
            <p className="text-sm text-gray-600">
              6000x6000px seamless patterns in PNG format
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">🏆 Certificate of Exclusivity</h3>
            <p className="text-sm text-gray-600">
              Proof of your exclusive ownership
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">💼 Commercial Rights</h3>
            <p className="text-sm text-gray-600">
              Use for unlimited commercial projects
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">♾️ Lifetime Ownership</h3>
            <p className="text-sm text-gray-600">
              No subscriptions, no recurring fees
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="border-t pt-8">
        <h2 className="text-2xl font-light text-gray-900 mb-4">Get In Touch</h2>
        <p className="text-gray-700 mb-4">
          Have questions about our patterns or the exclusivity guarantee? We'd love to hear from you.
        </p>
        <a 
          href="mailto:nick@patternripple.com" 
          className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Contact Us
        </a>
      </section>
    </div>
  </main>
</div>


);
}
