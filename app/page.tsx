import Link from 'next/link';

const products = [
  {
    slug: "vibrant-wildflower-faux-embroidery-rose",
    title: "Vibrant Wildflower Faux Embroidery",
    subtitle: "Dusty Rose Collection",
    price: 125,
    sku: "PR-flo-20250916-001",
    stripePriceId: "price_1S7wFfBB8R6OUfKVYDvR9B5T", // USE YOUR WORKING TEST PRICE ID
    thumbnail: null, // We'll use a gradient for now
    exclusive: true,
    available: true
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            PatternRipple
          </h1>
          <p className="text-lg text-gray-600">
            Exclusive digital patterns that no one else will have.
            <span className="block text-purple-600 font-semibold mt-1">
              Once sold, it's yours forever.
            </span>
          </p>
        </div>
      </header>

      {/* Products Section */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.sku} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* Badge */}
              {product.exclusive && (
                <div className="bg-purple-600 text-white text-xs font-bold px-3 py-1 text-center">
                  EXCLUSIVE
                </div>
              )}
              
              {/* Image placeholder */}
              <div className="h-64 bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center">
                <span className="text-6xl">🌸</span>
              </div>
              
              {/* Product Info */}
              <div className="p-4">
                <h2 className="font-bold text-lg mb-1">{product.title}</h2>
                <p className="text-gray-600 text-sm mb-3">{product.subtitle}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold">${product.price}</span>
                  <span className="text-green-600 text-sm">
                    {product.available ? 'Available' : 'Sold'}
                  </span>
                </div>
                
                <Link 
                  href={`/p/${product.slug}`}
                  className="block w-full bg-purple-600 text-white text-center py-2 rounded hover:bg-purple-700 transition-colors"
                >
                  View Pattern
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* VIP Section */}
        <section className="mt-16 text-center bg-white rounded-lg p-8 shadow-md">
          <h2 className="text-2xl font-bold mb-4">More Exclusive Patterns Coming Daily</h2>
          <p className="text-gray-600 mb-6">
            Join our VIP list to get notified the moment new exclusive patterns drop. 
            Once they're sold, they're gone forever.
          </p>
          <button className="bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700 transition-colors">
            Join VIP List →
          </button>
        </section>
      </main>
    </div>
  );
}
