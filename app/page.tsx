import Link from 'next/link';

const products = [
  {
    slug: "vibrant-wildflower-faux-embroidery-rose",
    title: "Vibrant Wildflower Faux Embroidery",
    subtitle: "Dusty Rose Collection",
    price: 125,
    sku: "PR-flo-20250916-001",
    stripePriceId: "price_YOUR_LIVE_PRICE_ID", // UPDATE THIS
    thumbnail: "https://files.patternripple.com/thumbnails/PR-flo-20250916-001-thumb.jpg",
    exclusive: true,
    available: true
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-light tracking-tight text-gray-900 mb-4">
            PatternRipple
          </h1>
          <p className="text-xl text-gray-700 font-light max-w-2xl mx-auto">
            Exclusive digital patterns that no one else will have.{' '}
            <span className="block mt-2 text-purple-600 font-medium">
              Once sold, it's yours forever.
            </span>
          </p>
        </div>
      </header>

      {/* Products Grid */}
      <main className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <article 
              key={product.sku} 
              className="group relative bg-white rounded-2xl p-1 shadow-[0_0_0_3px_rgba(251,191,36,0.5)] hover:shadow-[0_0_0_3px_rgba(147,51,234,0.5)] transition-all duration-300"
            >
              <div className="rounded-xl overflow-hidden bg-white">
                {/* Exclusive Badge */}
                {product.exclusive && (
                  <div className="bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-xs font-bold py-2 text-center tracking-wider">
                    EXCLUSIVE
                  </div>
                )}
                
                {/* Pattern Preview */}
                <div className="aspect-square bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center text-8xl">
                  🌸
                </div>
                
                {/* Product Info */}
                <div className="p-6 space-y-4">
                  <div>
                    <h2 className="font-light text-2xl text-gray-900 leading-tight">
                      {product.title}
                    </h2>
                    <p className="text-gray-600 mt-1 font-light">
                      {product.subtitle}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <span className="text-3xl font-light">${product.price}</span>
                    <span className="text-sm text-emerald-600 font-medium">
                      Available
                    </span>
                  </div>
                  
                  <Link 
                    href={`/p/${product.slug}`}
                    className="block w-full bg-gradient-to-r from-gray-900 to-gray-700 text-white text-center py-3 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300 font-light tracking-wide"
                  >
                    View Pattern
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* VIP Section */}
        <section className="mt-24 bg-white rounded-2xl p-12 shadow-xl text-center">
          <h2 className="text-3xl font-light text-gray-900 mb-4">
            More Exclusive Patterns Coming Daily
          </h2>
          <p className="text-gray-600 mb-8 font-light text-lg max-w-2xl mx-auto">
            Join our VIP list to get notified the moment new exclusive patterns drop.{' '}
            Once they're sold, they're gone forever.
          </p>
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300 font-light tracking-wide text-lg">
            Join VIP List →
          </button>
        </section>
      </main>
    </div>
  );
}
