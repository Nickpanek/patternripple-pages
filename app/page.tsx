"use client";

import Link from "next/link";
import { useState } from "react";

type Product = {
  slug: string;
  title: string;
  subtitle: string;
  price: number;
  sku: string;
  stripePriceId: string;
  thumbnail: string;
  exclusive: boolean;
  available: boolean;
};

const products: Product[] = [
  {
    slug: "pr-geo-20250919-001",
    title: "Atomic Matchstick Geometric",
    subtitle: "Mid-Century Collection",
    price: 125,
    sku: "PR-geo-20250919-001",
    stripePriceId: "price_1S91pvBB8R6OUfKVfz51JXSY", // ADD AFTER CREATING IN STRIPE
    thumbnail: "https://files.patternripple.com/PR-geo-20250919-001-thumb.jpg",
    exclusive: true,
    available: true,
  },
  {
    slug: "gilded-stripe-circles-olive-geometric",
    title: "Gilded Stripe Circles on Olive",
    subtitle: "Geometric Collection",
    price: 125,
    sku: "PR-geo-20250921-001",
    stripePriceId: "price_1S9mssBB8R6OUfKVZYZoIF7e", // ADD AFTER CREATING IN STRIPE
    thumbnail: "https://files.patternripple.com/gilded-stripe-circles-olive-geometric-thumb.jpg",
    exclusive: true,
    available: true,
  },
   {
    slug: "pastel-doodle-easter-eggs-pink",
    title: "Pastel Doodle Easter Eggs on Pink",
    subtitle: "Easter Collection",
    price: 125,
    sku: "PR-sea-20250921-001",
    stripePriceId: "price_1S9mKjBB8R6OUfKVRjVFkwn1", // ADD AFTER CREATING IN STRIPE
    thumbnail: "https://files.patternripple.com/pastel-doodle-easter-eggs-pink-thumb.jpg",
    exclusive: true,
    available: true,
  },
  {
    slug: "monochrome-labyrinth-geometric-pattern",
    title: "Monochrome Labyrinth Geometric Pattern",
    subtitle: "OP Art Collection",
    price: 125,
    sku: "PR-geo-20250921-001",
    stripePriceId: "price_1S9lZWBB8R6OUfKVC6pTDVfr", // ADD AFTER CREATING IN STRIPE
    thumbnail: "https://files.patternripple.com/monochrome-labyrinth-geometric-pattern-thumb.jpg",
    exclusive: true,
    available: true,
  },
  {
  slug: "pr-sea-20250919-002",  // lowercase 'pr'
  title: "Autumn UFO Landing Faux Embroidery",
  subtitle: "Autumn Collection",
  price: 125,
  sku: "PR-sea-20250919-002",  // uppercase 'PR' 
  stripePriceId: "price_1S9F4UBB8R6OUfKV1SqJ3VWd",  // PASTE STRIPE ID
  thumbnail: "https://files.patternripple.com/PR-sea-20250919-002-thumb.jpg",
  exclusive: true,
  available: true
},
    {
  slug: "pr-hor-20250919-001",  // lowercase 'pr'
  title: "Impasto Skulls in Crimson",
  subtitle: "Horror Collection",
  price: 125,
  sku: "PR-hor-20250919-001",  // uppercase 'PR' 
  stripePriceId: "price_1S9FdNBB8R6OUfKVd4lb36fk",  // PASTE STRIPE ID
  thumbnail: "https://files.patternripple.com/PR-hor-20250919-001-thumb.jpg",
  exclusive: true,
  available: true
},
  {
  slug: "pr-flo-20250919-007",  // lowercase 'pr'
  title: "Vibrant Impasto Floral",
  subtitle: "Floral Collection",
  price: 125,
  sku: "PR-flo-20250919-007",  // uppercase 'PR' 
  stripePriceId: "price_1S9FzSBB8R6OUfKVq5fzIpQw",  // PASTE STRIPE ID
  thumbnail: "https://files.patternripple.com/PR-flo-20250919-007-thumb.jpg",
  exclusive: true,
  available: true
},
  {
  slug: "pr-sea-20250919-001",  // lowercase 'pr'
  title: "Winter Village Faux Embroidery on Navy",
  subtitle: "Christmas Collection",
  price: 125,
  sku: "PR-sea-20250919-001",  // uppercase 'PR' 
  stripePriceId: "price_1S9ELeBB8R6OUfKV0i5vtwZO",  // PASTE STRIPE ID
  thumbnail: "https://files.patternripple.com/PR-sea-20250919-001-thumb.jpg",
  exclusive: true,
  available: true
},
  {
    slug: "vibrant-wildflower-faux-embroidery-rose",
    title: "Vibrant Wildflower Faux Embroidery",
    subtitle: "Dusty Rose Collection",
    price: 125,
    sku: "PR-flo-20250916-001",
    stripePriceId: "price_1S7wFfBB8R6OUfKVYDvR9B5T",
    thumbnail: "https://files.patternripple.com/PR-flo-20250916-001-thumb.jpg",
    exclusive: true,
    available: true,
  },
  {
    slug: "pr-flo-20250918-001",
    title: "Gilded Floral Faux Embroidery on Emerald",
    subtitle: "Botanical Collection",
    price: 125,
    sku: "PR-flo-20250918-001",
    stripePriceId: "price_1S8q3ZBB8R6OUfKVMNkqQFb7", // ADD YOUR STRIPE PRICE ID HERE
    thumbnail: "https://files.patternripple.com/PR-flo-20250918-001-thumb.jpg",
    exclusive: true,
    available: true,
  },
  {
    slug: "carved-stone-architectural-grid-neutral",
    title: "Carved Stone Architectural Grid",
    subtitle: "Architecture Collection",
    price: 125,
    sku: "PR-arc-20250921-001",
    stripePriceId: "price_1S9maXBB8R6OUfKV4YShXYMt", // ADD YOUR STRIPE PRICE ID HERE
    thumbnail: "https://files.patternripple.com/carved-stone-architectural-grid-neutral-thumb.jpg",
    exclusive: true,
    available: true,
  },
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
              Once sold, it&apos;s yours forever.
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
                  ? "shadow-2xl -translate-y-1 ring-4 ring-purple-400"
                  : "shadow-lg ring-4 ring-amber-400"
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

        {/* VIP Section */}
        <section className="mt-16 bg-white rounded-xl p-12 shadow-xl text-center">
          <h2 className="text-3xl font-light text-gray-900 mb-4">
            More Exclusive Patterns Coming Daily
          </h2>
          <p className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto">
            Join our VIP list to get notified the moment new exclusive patterns
            drop. Once they&apos;re sold, they&apos;re gone forever.
          </p>
          <button className="bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 transition-colors">
            Join VIP List →
          </button>
        </section>
      </main>
    </div>
  );
}
