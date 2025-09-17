import Link from 'next/link';
import { products } from './products';

export default function HomePage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">PatternRipple</h1>
        <p className="text-xl text-gray-600">Exclusive Digital Patterns for Designers</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link 
            key={product.sku}
            href={`/p/${product.slug}`}
            className="group block"
          >
            <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              {/* Placeholder image until you add real thumbnails */}
              <div className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                <span className="text-4xl">🎨</span>
              </div>
              
              <div className="p-4">
                <h2 className="font-semibold text-lg mb-2 group-hover:text-blue-600">
                  {product.title}
                </h2>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">{product.price}</span>
                  {product.exclusive && (
                    <span className="bg-gold-100 text-gold-800 text-xs px-2 py-1 rounded">
                      EXCLUSIVE
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          <p>No products available yet. Check back soon!</p>
        </div>
      )}
    </main>
  );
}
