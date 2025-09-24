// app/collections/camo/page.tsx
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { products } from "../../data/products";
import { filterByCollection, countAvailable } from "../../lib/collections";

export default function CamoCollectionPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Handles category as string or string[]
  const camoProducts = useMemo(() => filterByCollection(products, "camo"), []);
  const availableCount = useMemo(() => countAvailable(products, "camo"), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-900 to-emerald-950">
      <header className="bg-black/80 backdrop-blur-sm border-b border-emerald-900 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-thin tracking-wide text-white mb-4">
            Camo Collection
          </h1>
          <p className="text-lg text-gray-300">
            Tactical and modern camouflage patterns built for bold apparel and gear
          </p>
        </div>
      </header>

      <div className="bg-gradient-to-r from-emerald-700 to-stone-900 text-white py-3">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm">
          {availableCount} Exclusive Camo Patterns Available
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/collections" className="inline-flex items-center text-emerald-400 hover:text-emerald-300">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Collections
          </Link>
        </div>

        {camoProducts.length === 0 ? (
          <div className="text-center text-gray-400 py-24">
            <p>No camo patterns available right now.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {camoProducts.map((product) => (
              <article
                key={product.sku}
                className={`bg-stone-900 rounded-xl overflow-hidden transition-all duration-300 ${
                  hoveredCard === product.sku
                    ? "shadow-2xl -translate-y-1 ring-4 ring-emerald-600"
                    : "shadow-lg ring-4 ring-emerald-900"
                }`}
                onMouseEnter={() => setHoveredCard(product.sku)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {product.exclusive && (
                  <div className="bg-gradient-to-r from-emerald-700 to-stone-900 text-white text-xs font-bold py-2 text-center tracking-wider">
                    EXCLUSIVE PATTERN
                  </div>
                )}

                <div className="h-64 bg-gradient-to-br from-stone-800 to-emerald-950 overflow-hidden">
                  <img
                    src={product.thumbnail as string}
                    alt={product.title as string}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-light text-white mb-2">
                    {product.title}
                  </h2>
                  <p className="text-gray-400 text-sm mb-4">{product.subtitle}</p>

                  <div className="flex justify-between items-center pb-4 mb-4 border-b border-stone-800">
                    <span className="text-2xl font-light text-white">${product.price}</span>
                    <span className={`text-sm ${product.available ? "text-green-500" : "text-gray-500"}`}>
                      {product.available ? "Available" : "Sold"}
                    </span>
                  </div>

                  <Link
                    href={`/p/${product.slug}`}
                    className="block w-full bg-emerald-700 text-white text-center py-3 rounded-lg hover:bg-emerald-600 transition-colors duration-300"
                  >
                    View Pattern
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
