"use client";

import Link from 'next/link';
import { useState } from 'react';

const products = [
  {
    slug: "vibrant-wildflower-faux-embroidery-rose",
    title: "Vibrant Wildflower Faux Embroidery",
    subtitle: "Dusty Rose Collection",
    price: 125,
    sku: "PR-flo-20250916-001",
    stripePriceId: "price_1S7wFfBB8R6OUfKVYDvR9B5T",
    thumbnail: "https://files.patternripple.com/PR-flo-20250916-001-thumb.jpg",
    exclusive: true,
    available: true
  },
  {
    slug: "gilded-floral-faux-embroidery-emerald",
    title: "Gilded Floral Faux Embroidery on Emerald",
    subtitle: "Botanical Collection",
    price: 125,
    sku: "PR-flo-20250918-001",
    stripePriceId: "price_1S8q3ZBB8R6OUfKVMNkqQFb7", // ADD YOUR STRIPE PRICE ID HERE
    thumbnail: "https://files.patternripple.com/PR-flo-20250918-001-thumb.jpg",
    exclusive: true,
    available: true
  }
];

export default function HomePage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Hero Section */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-thin tracking-wide text-gray-900 mb-4">
            PatternRipple
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Exclusive digital patterns that no one else will have.
            <span className="block mt-2 text-purple-600 font-medium">
              Once sold, it's yours forever.
            </span>
          </p>
        </div>
      </header>

      {/* Products Grid */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <article 
              key={product.sku}
              className={`bg-white rounded-xl overflow-hidden transition-all duration-300 ${
                hoveredCard === product.sku 
                  ? 'shadow-2xl transform -translate-y-1 ring-4 ring-purple-400' 
                  : 'shadow-lg ring-4 ring-amber-400'
              }`}
              onMouseEnter={() => setHoveredCard(product.sku)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Exclusive Badge */}
              {product.exclusive && (
                <div className="bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-xs font-bold py-2 text-center tracking-wider">
                  EXCLUSIVE PATTERN
                </div>
              )}
              
              {/* Pattern Preview Area */}
              <div className="h-64 bg-gradient-to-br from-purple-100 to-pink-100 overflow-hidden">
                <img 
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Product Info */}
              <div className="p-6">
                <h2 className="text-xl font-light text-gray-900 mb-2">
                  {product.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  {product.subtitle}
                </p>
                
                <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-100">
                  <span className="text-2xl font-light">${product.price}</span>
                  <span className="text-green-600 text-sm">Available</span>
                </div>
                
                <Link 
                  href={`/p/${product.slug}`}
                  className="block w-full bg-gray-900 text-white text-center py-3 rounded-lg hover:bg-purple-600 transition-colors duration-300"
                >
                  View Pattern
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* VIP Section */}
        <section className="mt-16 bg-white rounded-xl p-12 shadow-xl text-center">
          <h2 className="text-3xl font-light text-gray-900 mb-4">
            More Exclusive Patterns Coming Daily
          </h2>
          <p className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto">
            Join our VIP list to get notified the moment new exclusive patterns drop.
            Once they're sold, they're gone forever.
          </p>
          <button className="bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 transition-colors">
            Join VIP List →
          </button>
        </section>
      </main>
    </div>
  );
}
