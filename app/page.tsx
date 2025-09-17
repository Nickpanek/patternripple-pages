import Link from 'next/link';

// Temporarily hardcode your products until Sanity is connected
const products = [
  {
    slug: "vibrant-wildflower-faux-embroidery-rose",
    title: "Vibrant Wildflower Faux Embroidery",
    subtitle: "Dusty Rose Collection",
    price: 125,
    sku: "PR-flo-20250916-001",
    stripePriceId: "price_1S7wFfBB8R6OUfKVYDvR9B5T",
    // Point to your R2 bucket via the worker
    thumbnail: "https://files.patternripple.com/thumbnails/PR-flo-20250916-001-thumb.jpg",
    exclusive: true,
    soldOut: false
  },
  // Add more as you create them
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-5xl sm:text-7xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              PatternRipple
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-2xl mx-auto">
              Exclusive digital patterns that no one else will have. 
              <span className="block mt-2 text-lg text-purple-600 font-semibold">
                Once sold, it's yours forever.
              </span>
            </p>
          </div>
        </div>
      </header>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link 
              key={product.sku}
              href={`/p/${product.slug}`}
              className="group relative"
            >
              <article className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                {/* Exclusive Badge */}
                {product.exclusive && !product.soldOut && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-gradient-to-r from-gold-400 to-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      EXCLUSIVE
                    </span>
                  </div>
                )}
                
                {/* Sold Out Overlay */}
                {product.soldOut && (
                  <div className="absolute inset-0 z-20 bg-black/60 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold rotate-12 border-4 border-white px-6 py-2">
                      SOLD
                    </span>
                  </div>
                )}

                {/* Pattern Image */}
                <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 relative overflow-hidden">
                  {product.thumbnail.startsWith('http') ? (
                    <img 
                      src={product.thumbnail} 
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    // Fallback gradient with pattern icon
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-6xl opacity-50">✨</span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h2 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                    {product.title}
                  </h2>
                  {product.subtitle && (
                    <p className="text-sm text-gray-500 mb-3">{product.subtitle}</p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                    <span className={`text-sm font-medium ${
                      product.soldOut ? 'text-red-500' : 'text-green-600'
                    }`}>
                      {product.soldOut ? 'Sold Out' : 'Available'}
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🎨</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Launching Soon!
            </h2>
            <p className="text-gray-600">
              Our exclusive patterns are being prepared. Check back tomorrow!
            </p>
          </div>
        )}

        {/* Coming Soon Section */}
        <section className="mt-20 text-center py-12 border-t border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            More Exclusive Patterns Coming Daily
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Join our VIP list to get notified the moment new exclusive patterns drop. 
            Once they're sold, they're gone forever.
          </p>
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-8 rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105">
            Join VIP List → 
          </button>
        </section>
      </main>
    </div>
  );
}
