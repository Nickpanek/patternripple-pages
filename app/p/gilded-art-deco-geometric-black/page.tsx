"use client";

import Link from "next/link";
import { useState } from "react";

// Full products array - same as your homepage
const products = [
  {
    slug: "mid-century-abstract-pebbles-black-orange",
    title: "Mid-Century Abstract Pebbles in Black and Orange",
    subtitle: "Abstract Collection",
    price: 125,
    sku: "PR-abs-20250922-011",
    stripePriceId: "price_1SA9SUBB8R6OUfKV2Q1ewLS4",
    thumbnail: "https://files.patternripple.com/mid-century-abstract-pebbles-black-orange-thumb.jpg",
    exclusive: true,
    available: true,
    category: "abstract"
  },
  {
    slug: "pr-geo-20250919-001",
    title: "Atomic Matchstick Geometric",
    subtitle: "Mid-Century Collection",
    price: 125,
    sku: "PR-geo-20250919-001",
    stripePriceId: "price_1S91pvBB8R6OUfKVfz51JXSY",
    thumbnail: "https://files.patternripple.com/PR-geo-20250919-001-thumb.jpg",
    exclusive: true,
    available: true,
    category: "geometric"
  },
  {
    slug: "japandi-brushstrokes-plum-mauve",
    title: "Japandi Brushstrokes in Plum and Mauve",
    subtitle: "Geometric Collection",
    price: 125,
    sku: "PR-abs-20250921-019",
    stripePriceId: "price_1S9wwJBB8R6OUfKVmseB0xm4",
    thumbnail: "https://files.patternripple.com/japandi-brushstrokes-plum-mauve-thumb.jpg",
    exclusive: true,
    available: true,
    category: "geometric"
  },
  {
    slug: "gilded-stripe-circles-olive-geometric",
    title: "Gilded Stripe Circles on Olive",
    subtitle: "Geometric Collection",
    price: 125,
    sku: "PR-geo-20250921-001",
    stripePriceId: "price_1S9mssBB8R6OUfKVZYZoIF7e",
    thumbnail: "https://files.patternripple.com/gilded-stripe-circles-olive-geometric-thumb.jpg",
    exclusive: true,
    available: true,
    category: "geometric"
  },
  {
    slug: "op-art-tunnel-illusion-black-white",
    title: "Op Art Tunnel Illusion in Monochrome",
    subtitle: "Op Art Collection",
    price: 125,
    sku: "PR-geo-20250921-008",
    stripePriceId: "price_1S9wTvBB8R6OUfKV2jsZV0sK",
    thumbnail: "https://files.patternripple.com/op-art-tunnel-illusion-black-white-thumb.jpg",
    exclusive: true,
    available: true,
    category: "geometric"
  },
  {
    slug: "gilded-art-deco-geometric-black",
    title: "Gilded Art Deco Geometric in Black",
    subtitle: "Geometric Collection",
    price: 125,
    sku: "PR-geo-20250921-002",
    stripePriceId: "price_1S9nUoBB8R6OUfKV75USAunw",
    thumbnail: "https://files.patternripple.com/gilded-art-deco-geometric-black-thumb.jpg",
    exclusive: true,
    available: true,
    category: "geometric"
  },
  {
    slug: "painterly-woven-stripes-indigo",
    title: "Painterly Woven Stripes in Indigo",
    subtitle: "Geometric Collection",
    price: 125,
    sku: "PR-geo-20250921-010",
    stripePriceId: "price_1S9ppGBB8R6OUfKVTfctJrtG",
    thumbnail: "https://files.patternripple.com/painterly-woven-stripes-indigo-thumb.jpg",
    exclusive: true,
    available: true,
    category: "geometric"
  },
  {
    slug: "monochrome-labyrinth-geometric-pattern",
    title: "Monochrome Labyrinth Geometric Pattern",
    subtitle: "OP Art Collection",
    price: 125,
    sku: "PR-geo-20250921-001",
    stripePriceId: "price_1S9lZWBB8R6OUfKVC6pTDVfr",
    thumbnail: "https://files.patternripple.com/monochrome-labyrinth-geometric-pattern-thumb.jpg",
    exclusive: true,
    available: true,
    category: "geometric"
  },
  {
    slug: "mid-century-modern-stripes",
    title: "Mid-Century Modernist Stripes",
    subtitle: "Geometric Collection",
    price: 125,
    sku: "PR-geo-20250921-004",
    stripePriceId: "price_1S9o6MBB8R6OUfKVwq0mmUyi",
    thumbnail: "https://files.patternripple.com/mid-century-modern-stripes-thumb.jpg",
    exclusive: true,
    available: true,
    category: "geometric"
  },
  {
    slug: "carved-stone-architectural-grid-neutral",
    title: "Carved Stone Architectural Grid",
    subtitle: "Architecture Collection",
    price: 125,
    sku: "PR-arc-20250921-001",
    stripePriceId: "price_1S9maXBB8R6OUfKV4YShXYMt",
    thumbnail: "https://files.patternripple.com/carved-stone-architectural-grid-neutral-thumb.jpg",
    exclusive: true,
    available: true,
    category: "geometric"
  }
];

export default function GeometricCollectionPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  // Filter only geometric patterns
  const geometricProducts = products.filter(p => p.category === "geometric");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-thin tracking-wide text-gray-900 mb-4">
            Geometric Collection
          </h1>
          <p className="text-lg text-gray-600">
            Modern geometric patterns including Art Deco, Op Art, and contemporary designs
          </p>
        </div>
      </header>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm">
          {geometricProducts.length} Exclusive Geometric Patterns Available
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/collections" className="inline-flex items-center text-purple-600 hover:text-purple-700">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Collections
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {geometricProducts.map((product) => (
            <article
              key={product.sku}
              className={`bg-white rounded-xl overflow-hidden transition-all duration-300 ${
                hoveredCard === product.sku
                  ? "shadow-2xl -translate-y-1 ring-4 ring-purple-400"
                  : "shadow-lg ring-4 ring-blue-400"
              }`}
              onMouseEnter={() => setHoveredCard(product.sku)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {product.exclusive && (
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold py-2 text-center tracking-wider">
                  EXCLUSIVE PATTERN
                </div>
              )}

              <div className="h-64 bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <h2 className="text-xl font-light text-gray-900 mb-2">
                  {product.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4">{product.subtitle}</p>

                <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-100">
                  <span className="text-2xl font-light">${product.price}</span>
                  <span className="text-green-600 text-sm">
                    {product.available ? "Available" : "Sold"}
                  </span>
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
      </main>
    </div>
  );
}
